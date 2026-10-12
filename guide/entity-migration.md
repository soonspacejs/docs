# How to：从原生对象自动合批迁移到 Entity

::: warning 3.0 alpha 破坏性迁移
本指南对应已发布的 `3.0.0-alpha.0`。SDK 和 CPS 插件已移除 `setAutoInstancing`、`getAutoInstancingStats`、`AutoInstancingOptions`、`AutoInstancingStats` 及加载选项 `autoInstancing`。升级依赖不会把 Object3D 自动转换为 Entity，原有调用必须删除并按业务路径迁移。固定版本与配套依赖见 [安装说明](./index#install)。
:::

你将把业务身份、变换和显隐交给 Entity，把 geometry / material 交给资源层，同时保留确实需要的原生 Object3D 路径。

## 先确认哪些对象需要迁移

| 业务对象 | 建议入口 |
| --- | --- |
| 静态 GLB / glTF 模型，需要重复展示或合批 | `ssp.models.load()` + `ssp.entities.add()`。 |
| 不带模型的楼栋、楼层、业务分组 | 无 `model` 的 Entity，使用 `parent` 建立逻辑层级。 |
| 自绘静态 Mesh | 将不可变几何、材质和相对矩阵注册为 `ModelPart`。 |
| 需要跟随 Entity 的线条或特殊原生对象 | `entity.attachObject3D()`，保留外部所有权。 |
| GIS / tiles、POI 或既有动画管线 | 继续使用原生 Scene / Group 或已有插件入口；不要为了合批把它们统一塞入 Entity 模型资源。 |

CPS 有新的 [loadEntityScene](../plugin/cps-soonmanager#loadentityscene) 包入口，但尚未完整迁移旧接口的独立语义文件、work-ID、POI、GIS 和全部场景设置。BIMEditor 的拖拽、撤销、导出等业务也需要单独接入。

## 1. 保留逻辑树，不把源树挂回 Scene

```text
业务 ID、父子关系、编辑草稿
            ↓
       Entity 逻辑树
            ↓ 显式通知，提交快照
       渲染适配与资源引用
            ↓
Scene：实例批次 / BatchedMesh / 独立 Mesh / 必要原生附件
```

EntityCollection 是一个集合，内部 Entity 可形成多棵逻辑树。Entity 不是 Object3D，也不需要为每个业务节点创建 Scene 中的 Group。Scene 只保留实际渲染对象和必要容器。

子 Entity 的局部变换相对于父 Entity。资源内部 Mesh 的相对矩阵只记录一次：

```text
渲染部件矩阵 = Entity 世界矩阵 × 资源部件相对矩阵
Entity 世界矩阵 = 父 Entity 世界矩阵 × 本地已提交变换
层级显隐 = 父 Entity 层级显隐 && 本地已提交 visible
模型显隐 = 层级显隐 && 本地已提交 contentVisible && 部件初始显隐
```

`visible` 影响整棵子树，`contentVisible` 只隐藏本 Entity 的模型和附件，两者均通过 `notifyChange('visibility')` 提交。`getBounds(entity)` 默认包含后代及隐藏内容，查询自身内容可传 `{ includeDescendants: false }`。

迁移源树时，不能既把节点矩阵提交给 Entity，又重复烘焙进资源部件或附件根节点。CPS 内置适配负责移除这项重复变换，并剥离静态语义空壳；依赖骨骼、LOD、CSS 或自定义回调的原生渲染上下文不强行扁平化。

## 2. 将旧通知替换为 Entity 通知

旧原生对象路径仍然有效：

```ts
mesh.position.x = 1;
ssp.signals.objectChanged.dispatch(mesh);
```

迁移后的 Entity 路径：

```ts
entity.position.x = 1;
entity.notifyChange('transform');
entity.visible = false;
entity.notifyChange('visibility');
ssp.flushUpdates();
```

不要混用两套协议：

- `objectChanged`、`geometryChanged`、`materialChanged` 通知原生 Object3D / 材质子系统并请求绘制，不能提交 Entity 草稿，也不再维护旧自动合批代理。
- Entity 不轮询草稿，也没有 `syncMode: 'safe'` 的直接赋值兜底。仅调用 `render()` 不会提交未通知字段。
- 通知在调用时复制对应字段。通知之后继续修改草稿，不会改变先前已提交的快照。
- 多个同步变更可放进 `ssp.entities.batch(() => { ... })`；它合并渲染请求，不是事务，不回滚异常，也不能使用 async 回调或在内部 `flushUpdates()`。

因此，上层编辑命令应在一次实际业务变更结束后通知相应 Entity，而不是每帧通知全部对象。修改父节点时，SDK 会传播到受影响的后代；修改整棵树的根节点仍可能更新整棵树。

## 3. 将资源释放责任改为引用管理

```ts
const resource = await ssp.models.load('/models/building.glb');
try {
  ssp.entities.add({ id: 'building-a', model: resource });
  ssp.entities.add({ id: 'building-b', model: resource, position: [20, 0, 0] });
} finally {
  resource.release();
}
```

每个 Entity 保留自己的引用。释放业务手里的句柄不会让仍在使用它的 Entity 失效。成功以 `ownership: 'transfer'` 注册的 geometry / material / texture 不再允许外部修改或销毁；修改资产应加载或注册新资源，再调用 `entity.replaceModel()`。

原生对象需要离场但暂时不能销毁时，3.0 alpha 提供：

```ts
ssp.removeObject(sourceObject, { dispose: false });
```

它同时注销旧缓存和拾取列表，不只是执行 `removeFromParent()`。资源仍归原持有方负责；此方法本身不会创建 ModelResource、提取 Mesh 或转移所有权。标准 `removeObject(object)` 默认仍会销毁资源，不能用于已经成功转交给 SDK 的资源图。

外部附件仍由外部持有：移除 Entity 或 `detachObject3D()` 只卸载附件，不替你销毁其 geometry、material、texture。详细规则见 [模型资源与生命周期](../api/model-resources)。

### 清空原生对象与 Entity 是两个范围

`ssp.clear()`、`clearObject()`、`clearModel()` 等既有方法清理原生 Object3D 缓存，不清空 EntityCollection。普通 Entity 子树使用 `entities.remove(root)`，多个根可在同步 `entities.batch()` 中移除；调用方仍需释放自己持有的 lease。CPS 会话优先调用返回的 `scene.dispose()`，同时清理工厂附件和会话资源，不能只删除其根 Entity。

应用重置但继续使用 SoonSpace 时，需要分别清理自己拥有的原生对象、Entity 子树及 CPS 会话，不能将原生 `clear()` 当作两者的全局重置。结束整个 SDK 实例时使用 `ssp.dispose()`，它销毁两条路径；外部附件资源仍按其所有者规则处理。

## 4. 接入 Entity 身份的拾取和选择

内部批次的 `instanceId` / `batchId` 是渲染槽位，不应保存成业务 ID。使用 `ssp.pickEntities(raycaster)` 得到 `hit.entity` 和可选的 `partIndex`；原生附件命中保留原 Object3D，并附加 Entity 身份。

将屏幕坐标转成 Raycaster 后再查询；需要立即查询刚提交的状态时先 `flushUpdates()`。完整示例见 [包围盒与拾取](../api/entities#包围盒与拾取)。不要把旧 `modelClick`、`getObjectById` 或 `flyToObj` 当成已经自动支持 Entity：Entity 用 `entities.getById` 查找，聚焦用 `getBounds()` 配合 `controls.fitToBox()`。

首期 `entities.setSelection()` 使用线框覆盖层，支持分组后代，不等同于旧 Object3D 的后处理描边。应用需要接入自己的输入事件、选择状态和生命周期清理。

## 5. 验证迁移结果

先迁移一个可独立卸载的模型子树，逐项核对：

1. ID 在当前 EntityCollection 内唯一，父子节点在同一 collection、同一 owner，不能形成循环。
2. 嵌套移动、旋转、非均匀缩放和父级隐藏都正确，源矩阵未重复应用。
3. 未通知的草稿不会影响当前绘制；立即查询前同步了已通知内容。
4. 合批开关、隐藏或删除成员后，拾取仍返回同一业务 Entity。
5. 加载失败、取消、后到的旧请求不会覆盖当前资源；卸载后资源和外部附件释放责任正确。
6. Scene 中没有仅为保留业务层级而创建的空壳，旧缓存和旧拾取列表不再引用迁移后的源对象。
7. 分别测静止重绘和连续相机运动的 CPU / GPU 耗时，不把静止帧命令缓存的结果当成运动帧保证。

统计与合批边界见 [性能](../api/performance#entity-rendering)。Entity 的 `independentObjects` 只统计模型渲染路径中的独立对象，不包含全部原生附件，不能直接当成 Scene 总数或整帧 draw calls。

## 常见迁移问题

| 问题 | 处理方式 |
| --- | --- |
| 子模型偏移或缩放重复 | 分开检查 Entity 节点变换与资源部件相对矩阵，去掉重复应用。 |
| 原生 Mesh 材质修改不生效 | 不修改已转交资源；新建资源并替换 Entity 模型。原生附件则按其自己的所有权规则操作。 |
| 半透明对象排序不一致 | `transparentBatch: 'sorted'` 只保证批次内部排序，不保证跨批次逐对象交错；精确顺序敏感内容保留独立路径。 |
| `getObjectById` 找不到业务对象 | Entity 不在旧对象缓存中，用 `ssp.entities.getById(id)`。 |
| 切换场景后仍触发回调 | 保存并移除对应 signal slot，不用 `clearSignals()` 清理单个功能。 |

相关参考：[Entity API](../api/entities)、[模型资源](../api/model-resources)、[signals](../api/signals#entity-notifications)、[CPS 插件](../plugin/cps-soonmanager#loadentityscene)。
