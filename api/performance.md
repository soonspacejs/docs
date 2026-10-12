# 性能

3.0 alpha 使用 Entity 的显式变更与资源合批路径。旧版本的接口和策略保留在 [2.x 自动合批历史参考](./performance-2.x)，不适用于本页示例。

<span id="entity-rendering"></span>

## Entity 渲染与合批

::: warning 3.0 alpha 预览
本页对应已发布的 `3.0.0-alpha.0`。旧 AutoInstancing 引擎、控制方法、选项与统计已移除；Entity 渲染由 `ssp.entities` 管理。原生对象不会自动转换为 Entity。
:::

### 渲染策略与回退

| 策略 | Entity 资源条件 |
| --- | --- |
| InstancedMesh | 兼容的不透明部件共享同一 geometry、material 和渲染状态。 |
| BatchedMesh | 不同兼容 geometry 共享材质，或透明部件显式选择 `transparentBatch: 'sorted'`。 |
| 独立 Mesh | 不满足合批条件，或关闭相应批次功能。 |
| 原生附件 | 真正需要原生渲染的独立内容；不纳入模型合批统计。 |

透明部件默认独立绘制。`transparentBatch: 'sorted'` 仅支持兼容的单面、普通混合、非透射材质；开启后只保证批次内部排序，不保证与其他批次、独立透明对象之间的精确深度交错。双面透明、ShaderMaterial、镜像或剪切变换等保持兼容回退。

普通批次最多 512 个成员，BatchedMesh 还受顶点、索引和几何字节预算限制。旧代理的 `minInstances`、`dynamicPromotionFrames`、静态合并 Mesh 和 CPS 单批兼容组规则，不是 Entity 的参数。部件颜色可以通过线性 RGB `ModelPart.color` 保存，避免仅颜色不同就拆分共享材质；其余渲染状态仍需一致。

部分 drawRange、不能保真复制的 Float16、interleaved 或整数 gpuType 顶点属性不进入 BatchedMesh，保留原生或兼容 InstancedMesh 路径，不能仅为减少批次而改变源几何的绘制内容。

### 控制与统计

```ts
ssp.entities.setInstancingEnabled(true);
ssp.entities.setBatchedEnabled(true);
ssp.flushUpdates();
console.table(ssp.entities.getStats());
```

`setInstancingEnabled(false)` 将 Entity 模型部件改为独立绘制，包含关闭 BatchedMesh；`setBatchedEnabled(false)` 只关闭 BatchedMesh，兼容的不透明重复几何仍可使用 InstancedMesh。两者都不改变业务 Entity 身份，也不用于切换 GIS / tiles 的渲染策略。

`entities.getStats()` 的批次数不等于整帧 draw calls；`independentObjects` 不包含全部原生附件；`updatedEntities` 和 `rebuilds` 是累计更新次数，不是当前对象数。查看 Scene 总量需要单独诊断，不应在每帧 UI 回调中全量遍历场景。

### 每帧仍有哪些工作

- **变更同步**：只处理显式通知及结构、模型更新影响的 Entity 子树。静止且无通知时不扫描全部源对象，也不读取未通知草稿。
- **Scene 遍历与绘制提交**：Three.js 仍需处理实际渲染对象。逻辑 Entity 不应作为空 Object3D 壳挂入 Scene，但必要的渲染容器会保留。
- **批次成员裁剪与排序**：相机或批次状态变化时，BatchedMesh 仍可能处理全部成员；不等同于业务变更扫描。
- **GPU 绘制**：减少提交不等于减少全部三角形、像素覆盖或透明着色成本。

Entity 自建 BatchedMesh 缓存上一次实际渲染调用的绘制命令。相机视图和投影、对象矩阵、成员数据、材质透明 / 线框模式及裁剪排序策略不变时，复用命令，不重复标记间接命令纹理更新。阴影或其他 pass 使用实际相机和材质参与判断；自定义排序和 ArrayCamera 保守绕过缓存。

这是**重复静止重绘**优化，不是连续转动相机的帧率保证。SDK 不会为提高数字而默认关闭透明排序或逐成员裁剪；后者关闭后可能把更多几何交给 GPU。内部缓存类不是新的业务 API，调用方仍只使用 Entity、资源和已提交通知。

### 验证方法

1. 保持模型、视角、分辨率和效果设置一致，预热后对比合批开启 / 关闭。
2. 分开采样固定相机重复重绘、连续相机运动、对象编辑，记录 p50 / p95，不只读取最后一帧。
3. 同时记录 draw calls、三角形、Scene 节点和资源复用情况。条件允许时使用 GPU 计时；CPU 耗时不是 GPU 耗时，也不能直接倒数当作实际 FPS。
4. 检查隐藏、删除、资源替换之后的命中身份，以及场景切换后的资源和附件清理。

`ssp.signals.sceneRendered` 的参数和 `await ssp.render()` 的返回值是 CPU 侧渲染区间耗时，可能受 WebGL 驱动等待影响，不是 GPU 查询结果。固定镜头的暖态结果不能推导不同设备、近景透明叠层或运动视角的性能。

参考：[Entity 入门](../guide/entity)、[迁移指南](../guide/entity-migration)、[Entity API](./entities)、[模型资源](./model-resources)、[Entity 通知](./signals#entity-notifications)。
