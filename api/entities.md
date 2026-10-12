---
outline: 3
---

# Entity 与 EntityCollection

::: warning 3.0 alpha 预览
本页对应已发布的 `3.0.0-alpha.0`。旧 AutoInstancing 已移除，接口仍可能发生破坏性变更；固定版本与依赖见 [安装说明](../guide/#install)。
:::

Entity 表示业务对象，不继承 `Object3D`，也不作为逻辑节点挂入 Three.js Scene。一个 Entity 可以没有模型、引用共享模型资源，或携带真正需要独立渲染的 Object3D 附件。渲染层根据资源兼容性创建 InstancedMesh、BatchedMesh 或独立 Mesh。

先阅读 [Entity 入门](../guide/entity)；资源准备见 [模型资源与 lease](./model-resources)，旧接口迁移见 [Entity 迁移说明](../guide/entity-migration)。

## SoonSpace 入口

| 入口 | 说明 |
| --- | --- |
| `ssp.entities` | 当前实例的 `EntityCollection`。 |
| `ssp.models` | 当前实例的 `ModelResources`。 |
| `ssp.materials` | 与 `ssp.models.materials` 相同的材质注册入口。 |
| `ssp.flushUpdates(): void` | 同步提交已排队的 Entity 更新；不立即执行 GPU 绘制。 |
| `ssp.requestRender(): void` | 请求一次绘制；不是同步提交方法。 |
| `ssp.pickEntities(raycaster): EntityHit[]` | 在 collection 拾取结果上额外过滤 Viewport 的全局裁剪面。 |

普通业务使用 `ssp.entities.add()` 创建 Entity，不要自行 `new Entity()`。新增、通知、层级变化、附件操作、选择和合批开关会请求绘制；SoonSpace 在实际绘制前提交更新。若代码紧接着需要读取新包围盒或拾取结果，应先调用 `ssp.flushUpdates()`。

## add

```ts
interface EntityOptions {
  id: string;
  model?: ModelLease;
  parent?: Entity | null;
  owner?: string;
  name?: string;
  position?: readonly [number, number, number];
  quaternion?: readonly [number, number, number, number];
  scale?: readonly [number, number, number];
  visible?: boolean;
  contentVisible?: boolean;
}

// ssp.entities.add(options: EntityOptions): Entity
```

| 参数 | 默认值 | 约束 |
| --- | --- | --- |
| `id` | 必填 | 非空字符串，在整个 collection 内唯一，不是仅在 owner 内唯一。 |
| `model` | 无 | 当前实例创建、尚未释放的 ModelLease；省略时为纯逻辑分组。 |
| `parent` | `null` | 同一 collection 中的有效 Entity。 |
| `owner` | 父 Entity 的 owner；无父级时为 `'application'` | 逻辑归属标识，父子必须相同；不会自动按 owner 创建资源隔离区。 |
| `name` | `''` | 可直接修改的业务名称，不影响合批。 |
| `position` | `[0, 0, 0]` | 相对父级的局部位移。 |
| `quaternion` | `[0, 0, 0, 1]` | `[x, y, z, w]`，提交时归一化；零四元数无效。 |
| `scale` | `[1, 1, 1]` | 局部缩放。 |
| `visible` | `true` | 自身可见性；最终可见性还取决于祖先。 |
| `contentVisible` | `true` | 只控制本 Entity 的模型和附件，不隐藏子 Entity。 |

TRS 中的数值必须有限。创建时会捕获初始 TRS、visible 和 contentVisible 快照，等待提交。`add` 会为模型资源保留独立引用，调用者随后可以释放自己的 lease。

```ts
import SoonSpace from 'soonspacejs';

const ssp = new SoonSpace({ el: '#view' });
const model = await ssp.models.load('/models/chair.glb');
const group = ssp.entities.add({ id: 'room', owner: 'application' });
const chair = ssp.entities.add({
  id: 'chair-1',
  parent: group,
  model,
  position: [2, 0, 0],
});
model.release();
ssp.flushUpdates();
console.log(chair.getWorldMatrix());
```

## Entity 属性与查询

| 成员 | 类型 | 说明 |
| --- | --- | --- |
| `id`、`owner` | 只读 `string` | 创建后不变。 |
| `name` | `string` | 业务元数据，修改不需要 notify。 |
| `position` | `Vector3` | 可修改分量的局部位移草稿；不替换 Vector3 实例。 |
| `quaternion` | `Quaternion` | 局部旋转草稿。 |
| `scale` | `Vector3` | 局部缩放草稿。 |
| `visible` | `boolean` | 自身可见性草稿。 |
| `contentVisible` | `boolean` | 自身模型及附件的可见性草稿，不影响后代。 |
| `parent` | `Entity \| null` | 当前逻辑父级。 |
| `children` | `readonly Entity[]` | 当前直接子级的数组快照，不能通过修改数组改变结构。 |
| `isShowing` | `boolean` | 最近一次提交后的自身与祖先共同可见性，不包含 contentVisible，也不是视锥可见性。 |
| `getWorldMatrix()` | `Matrix4` | 最近一次提交的世界矩阵副本，修改返回值不影响 Entity。 |
| `loadState` | `'idle' \| 'loading' \| 'ready' \| 'error'` | 模型加载/替换状态，见下文。 |
| `loadError` | `unknown` | 最近一次当前替换请求的错误；成功启动新请求时清空。 |

`ssp.entities.roots` 返回所有无父级的 Entity，collection 是森林而非固定单根树。`getById(id)` 返回 Entity 或 `undefined`。这些逻辑结构查询立即反映 `add`、`setParent` 和 `remove`；世界矩阵、最终显隐、包围盒及模型拾取状态则在提交后更新。

## notifyChange：提交草稿快照

```ts
type EntityChange = 'transform' | 'visibility';
// entity.notifyChange(type: EntityChange): void
```

`transform` 一次捕获 position、quaternion、scale；`visibility` 同时捕获 visible 和 contentVisible。同一提交周期里，同一类型以最后一次通知的快照为准。通知之后继续修改草稿，不会进入已捕获快照。

```ts
import type { Entity } from 'soonspacejs';

function move(entity: Entity) {
  entity.position.x = 1;
  entity.notifyChange('transform'); // 捕获 x = 1
  entity.position.x = 9;           // 草稿现在为 9，但未通知
  // 下一次提交仍使用 x = 1。
}
```

修改父级会更新受影响后代的世界矩阵或最终显隐，但只读取后代已提交的局部状态，不会替后代提交未通知的草稿。

```text
部件世界矩阵 = Entity 世界矩阵 × ModelPart.matrix
Entity 世界矩阵 = 父 Entity 世界矩阵 × Entity 已提交局部矩阵
层级显隐 = 父 Entity 层级显隐 && Entity 已提交 visible
模型显隐 = 层级显隐 && Entity 已提交 contentVisible && 部件 visible
```

父级 `visible = false` 会隐藏后代，父级 `contentVisible = false` 只隐藏自己的模型和附件。两者都需要 `notifyChange('visibility')`。附件还保留自身 Object3D 层级的 visible。

Entity 路径不会每帧扫描源 Mesh 查找变化。`ssp.signals.objectChanged` 等旧 Object3D 通知不能代替 `entity.notifyChange()`；二者职责见 [迁移说明](../guide/entity-migration)。

## 层级、批量更新与删除

### setParent

`ssp.entities.setParent(entity, parent: Entity | null): void` 更改逻辑父级，传 `null` 成为根节点。保持已提交局部 TRS，不保持世界位置；重挂后下一次提交重新计算世界矩阵。父子必须属于同一有效 collection、具有相同 owner，不能形成环。

### batch

`ssp.entities.batch(callback: () => void): void` 合并同步操作的绘制请求，支持嵌套。不接受 async callback，不是原子事务：callback 抛错时不会回滚已经完成的操作。batch 期间不能 `flushUpdates()`。

```ts
import type SoonSpace from 'soonspacejs';
import type { Entity } from 'soonspacejs';

function hideAll(ssp: SoonSpace, targets: readonly Entity[]) {
  ssp.entities.batch(() => {
    for (const entity of targets) {
      entity.visible = false;
      entity.notifyChange('visibility');
    }
  });
  ssp.flushUpdates();
}
```

### remove

`ssp.entities.remove(entity): void` 删除整个子树，取消其未完成模型替换，移除绘制映射和选择状态，并在渲染代理清理后释放 Entity 持有的模型引用。非 batch 内调用会同步完成清理；batch 内延后到提交。

删除不会 dispose 外部 Object3D 附件的资源。删除后的 Entity 句柄无效，不能继续通知、查询或重新作为父级；即使新对象重用了相同 ID，也必须使用新句柄。删除一个根节点不会影响其他根节点。

## replaceModel

```ts
// entity.replaceModel(
//   source: ModelLease | string | null,
//   options?: ModelLoadOptions,
// ): Promise<void>
// collection 也提供 replaceModel(entity, source, options)。
```

| source | 行为 |
| --- | --- |
| URL 字符串 | 异步加载候选资源。 |
| ModelLease | 保留当前实例中的资源引用，不转移调用者的 lease。 |
| `null` | 排队清空模型；保留 Entity、子级及附件。 |

加载候选期间旧模型继续显示。Promise 完成表示候选已进入提交队列，不表示已绘制；立即读取新模型包围盒时，先 `await` 再 `ssp.flushUpdates()`。同一 Entity 的后发请求会取消仍在进行的旧请求，旧的晚到结果不能覆盖新请求或复活已删除 Entity。已经成功排队的候选与尚在进行的请求不同：之后的新请求失败，不会自动撤销此前已排队的候选。

首次无模型时为 `idle`；请求期间为 `loading`；候选提交后有模型为 `ready`、无模型为 `idle`；失败为 `error`，旧模型保留。取消以 `AbortError` 拒绝，状态恢复为有可用模型时 `ready`、否则 `idle`，不把取消记作 loadError。

```ts
import type SoonSpace from 'soonspacejs';
import type { Entity } from 'soonspacejs';

async function replace(ssp: SoonSpace, entity: Entity, signal: AbortSignal) {
  try {
    await entity.replaceModel('/models/new-chair.glb', { signal });
    ssp.flushUpdates();
    console.log(entity.loadState, ssp.entities.getBounds(entity));
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') return;
    throw error;
  }
}
```

加载支持范围、取消边界及共享请求行为见 [模型资源](./model-resources#load)。

## Object3D 附件

`entity.attachObject3D(object): void` 接入确实需要独立渲染或运行自身逻辑的对象，例如线条、特殊动态对象。对象必须已脱离原父级，不能被其他 Entity 或运行时重复管理。附件保留自己的局部变换及 visible，通过按需创建的容器继承 Entity 已提交世界矩阵及显隐。

`entity.detachObject3D(object): void` 仅移除该 Entity 的附件；对象不是其附件时抛错。最后一个附件移除时容器也被清理。

::: warning 附件不参与 Entity 合批
附件由外部拥有，Entity 的 detach、remove 和 collection.dispose 不会 dispose 其 Geometry、Material、Texture。直接修改附件后由业务请求绘制；不要把无用的整棵语义源树当作附件带入 Scene。静态 Mesh 应转为模型资源。原有 `ssp.removeObject` 的资源处置规则不能直接套用到共享模型资源。
:::

## 包围盒与拾取

`ssp.entities.getBounds(entity, options?: { includeDescendants?: boolean }): Box3` 返回世界轴对齐包围盒，包含模型和附件，默认包括全部后代。传 `{ includeDescendants: false }` 只查询自身内容。查询不提交 Entity 草稿，也不按 visible 或 contentVisible 过滤；无几何内容时返回空 Box3，使用前可调用 `isEmpty()`。

```ts
interface EntityHit extends THREE.Intersection {
  entity: Entity;
  partIndex?: number;
  attachment?: boolean;
}
```

`ssp.entities.pick(raycaster): EntityHit[]` 或 `ssp.pickEntities(raycaster)` 返回按距离排序的命中。模型命中通过 `entity` 和 `partIndex` 定位逻辑对象及资源部件，附件命中带 `attachment: true`。`hit.object` 是渲染对象，可能代表多个 Entity，不是可任意编辑的源 Mesh。隐藏成员不会返回模型命中；附件还检查其自身祖先链的 visible。两者都过滤材质可见性和材质裁剪面，遵守 `clipIntersection`；`ssp.pickEntities` 还过滤 Viewport 的全局裁剪面。使用 SoonSpace 的剖切功能时，通过 `ssp.pickEntities` 拾取。

Entity 拾取不会自动转换成旧 `modelClick` 事件。业务使用现有输入 signal 取得输入，再构造 Raycaster 并调用上述入口。

下面的函数接收容器内一次点击的浏览器 client 坐标；调用方负责绑定输入，并排除相机拖拽产生的 pointerup：

```ts
import SoonSpace from 'soonspacejs';

export function selectEntityAt(ssp: SoonSpace, clientX: number, clientY: number) {
  const rect = ssp.viewport.interactiveContainer.getBoundingClientRect();
  if (!rect.width || !rect.height) return undefined;
  const { Vector2, Raycaster } = SoonSpace.THREE;
  const pointer = new Vector2(
    (clientX - rect.left) / rect.width * 2 - 1,
    -(clientY - rect.top) / rect.height * 2 + 1
  );
  ssp.flushUpdates();
  const raycaster = new Raycaster();
  raycaster.setFromCamera(pointer, ssp.viewport.camera);
  const hit = ssp.pickEntities(raycaster)[0];
  ssp.entities.setSelection(hit ? [hit.entity] : []);
  return hit;
}
```

## 选择与高亮

`setSelection(entities: readonly Entity[]): void` 设置选择列表，空数组清空；参数必须是有效 Entity。`getSelection(): readonly Entity[]` 返回显式选择项的数组副本。选中父级时，其后代模型也被高亮，但不被添加到显式选择列表。

当前高亮是橙色线框覆盖物，不修改共享材质，也不是后处理轮廓。它跟随已提交的变换和显隐；Object3D 附件不在该模型高亮覆盖范围内。高亮会新增绘制对象及提交，不应视为零开销功能。

## 合批开关与统计

| 方法 | 默认 | 作用 |
| --- | --- | --- |
| `setInstancingEnabled(enabled: boolean)` | `true` | Entity 合批总开关；`false` 时 InstancedMesh 与 BatchedMesh 均回退独立绘制。 |
| `setBatchedEnabled(enabled: boolean)` | `true` | 仅控制 BatchedMesh；关闭时仍可使用不透明重复几何的 InstancedMesh。 |

开关排队重建，不修改 Entity 身份或拾取映射。3.0 alpha 已移除旧 `ssp.setAutoInstancing()`；资源兼容性及透明限制见 [模型资源](./model-resources#合批兼容性)。

`ssp.entities.getStats()` 返回：

| 字段 | 含义 |
| --- | --- |
| `entities` | 当前 Entity 总数，包括纯逻辑分组。 |
| `instancedBatches` | 当前 InstancedMesh 批次数。 |
| `batchedBatches` | 当前 BatchedMesh 批次数。 |
| `independentObjects` | 资源部件回退为独立 Mesh 的数量。 |
| `rebuilds` | 累计兼容组重建次数，不是当前批次数或逐帧计数。 |
| `updatedEntities` | 累计同步节点次数；同一个 Entity 多次更新会重复计数。 |

统计不是 draw calls：`independentObjects` 不包含原生附件，高亮、其他 Scene 内容和多 pass 也可能产生额外提交。读开关或修改后的渲染统计前，先提交更新。

## 销毁边界

正常应用销毁整个实例时调用 `ssp.dispose()`。`ssp.entities.dispose()` 会清空 collection 及 Entity 渲染代理并使所有句柄失效，但不会替调用者释放仍持有的模型 lease，也不替外部 dispose 附件资源。不要在 SoonSpace 继续运行时单独销毁它托管的 collection 或 models；独立构造的高级集成应先销毁 collection，再释放自己的 lease，最后销毁 ModelResources。

`ssp.clear()`、`clearObject()`、`clearModel()` 等原生清理 API 不移除 Entity。清理 Entity 子树用 `entities.remove(root)`；CPS 内容用其会话 `scene.dispose()`，见 [清空范围迁移](../guide/entity-migration#清空原生对象与-entity-是两个范围)。
