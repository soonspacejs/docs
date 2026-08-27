# 性能

## setAutoInstancing

启用或关闭场景的自动合批。该功能通过内部 `InstancedMesh`、静态合并 Mesh 和 `BatchedMesh` 代理减少渲染提交，同时保留原始 `Model`、`Mesh`、UUID、父子关系、`userData`、缓存和拾取结果。

自动合批默认关闭，需要 `three >= 0.185.1`。

### 定义

```ts
interface AutoInstancingOptions {
  minInstances?: number;
  maxInstancesPerBatch?: number;
  dynamicPromotionFrames?: number;
  transparentSinglePass?: boolean;
  skipEmptyTextureUploads?: boolean;
}

setAutoInstancing(
  enabled: boolean,
  root?: Object3D,
  options?: AutoInstancingOptions
): void;
```

### 全局启用

不传 `root` 时，SoonSpace 会处理当前场景的顶层对象，并自动处理之后加入场景的顶层对象。

```js
ssp.setAutoInstancing(true, undefined, {
  minInstances: 2,
  maxInstancesPerBatch: 512,
  dynamicPromotionFrames: 2,
});

// 关闭全部自动合批并移除内部代理
ssp.setAutoInstancing(false);
```

### 指定场景根节点

传入 `root` 时，只处理该节点的子树。`root` 必须已经加入 SoonSpace 场景。

```js
ssp.setAutoInstancing(true, modelRoot, {
  minInstances: 2,
  maxInstancesPerBatch: 512,
});

// 仅关闭该子树
ssp.setAutoInstancing(false, modelRoot);
```

重复启用同一根节点时，会使用新参数重新建立代理。`setAutoInstancing` 保持 `void` 返回；统计信息请使用 [getAutoInstancingStats](#getautoinstancingstats)。

### AutoInstancingOptions

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `minInstances` | `number` | `2` | 同一兼容分组达到该数量后才创建批次。向下取整，最小值为 `1`。 |
| `maxInstancesPerBatch` | `number` | `512` | 一个普通代理批次最多表示多少个源 Mesh。向下取整，且不会小于 `minInstances`。CPS 内部标记的透明语义辅助对象会按兼容组保持单批，因此可能超过该数量。 |
| `dynamicPromotionFrames` | `number` | `2` | 对象连续发生局部变换达到该帧数后，临时提升为独立代理；稳定后可重新进入静态批次。向下取整，最小值为 `1`。 |
| `transparentSinglePass` | `boolean` | `false` | 双面透明 `BatchedMesh` 代理只绘制一次。代理会同步源材质状态，不会持久修改源材质。 |
| `skipEmptyTextureUploads` | `boolean` | `false` | 渲染代理时，临时跳过 `image` 为 `null` 且已标记更新的纹理上传，渲染后恢复纹理版本。 |

::: warning 注意
`transparentSinglePass` 会减少双面透明材质的 draw call，但可能改变前后表面的混合结果。使用前应检查玻璃、水面等透明模型的视觉效果。
:::

## getAutoInstancingStats

读取自动合批的分类和代理统计。

### 定义

```ts
interface AutoInstancingStats {
  active: boolean;
  sourceObjects: number;
  sourceRenderables: number;
  instancedBatches: number;
  instancedObjects: number;
  mergedBatches: number;
  mergedObjects: number;
  batchedBatches: number;
  batchedObjects: number;
  passthroughObjects: number;
  unsupportedObjects: number;
  multiDrawSupported: boolean;
}

getAutoInstancingStats(
  root?: Object3D
): AutoInstancingStats | AutoInstancingStats[] | null;
```

- 传入 `root` 时，返回该根节点的统计；根节点未注册时返回 `null`。
- 不传 `root` 时，返回所有已注册根节点的统计数组。

### 字段说明

| 字段 | 说明 |
| --- | --- |
| `active` | 该根节点是否存在有效代理绑定。 |
| `sourceObjects` | 被跟踪的源场景对象数，包括不参与渲染的层级节点。 |
| `sourceRenderables` | 由代理管线管理的可渲染对象数。 |
| `instancedBatches` / `instancedObjects` | `InstancedMesh` 代理数和对应的源 Mesh 数。 |
| `mergedBatches` / `mergedObjects` | 静态合并代理数和对应的源 Mesh 数。 |
| `batchedBatches` / `batchedObjects` | `BatchedMesh` 代理数和对应的源 Mesh 数。 |
| `passthroughObjects` | 未合入批次、使用独立代理的对象数。 |
| `unsupportedObjects` | 为保持原有行为而继续使用源对象渲染的对象数。 |
| `multiDrawSupported` | 分类时渲染器是否支持 `WEBGL_multi_draw`。 |

### 用法

```js
const stats = ssp.getAutoInstancingStats();
const list = Array.isArray(stats) ? stats : stats ? [stats] : [];

const summary = list.reduce(
  (result, item) => {
    result.sourceRenderables += item.sourceRenderables;
    result.proxyRenderables +=
      item.instancedBatches +
      item.mergedBatches +
      item.batchedBatches +
      item.passthroughObjects;
    return result;
  },
  { sourceRenderables: 0, proxyRenderables: 0 }
);

console.table({
  ...summary,
  drawCalls: ssp.viewport.renderer.info.render.calls,
});
```

## 合批策略

引擎按以下顺序选择代理：

| 策略 | 典型对象 | 条件 |
| --- | --- | --- |
| `InstancedMesh` | 使用同一 geometry、material 和渲染状态的不透明 Mesh | 不依赖 multi-draw。 |
| 静态合并 Mesh | 使用相同材质和兼容小 geometry 的不透明 Mesh | 单个源 geometry 的 position 顶点不超过 `1024`；每个合并块最多 `32` 个对象。 |
| `BatchedMesh` | 其余兼容的小 Mesh，以及 CPS 内部标记的透明语义辅助 Mesh | 需要 `WEBGL_multi_draw`。普通可见透明 Mesh 保持独立代理；CPS 透明兼容组必须能够完整放入一个批次，否则回退。 |
| 独立代理或源对象 | 不能安全合批的对象 | 始终作为兼容回退。 |

批次键会比较完整材质渲染状态、geometry schema、阴影配置、`renderOrder`、layers、视锥裁剪和自定义深度/距离材质。条件不一致的对象不会进入同一批次。

普通可见透明 Mesh 不会自动进入 `BatchedMesh`，继续由 Three.js 按对象执行全局透明排序。完全透明、关闭深度写入且不产生模板效果的辅助对象可以安全合批，并会关闭无意义的逐实例排序。

CPS 插件会通过内部非公开标记允许语义辅助 Mesh 按兼容材质组透明合批。同一兼容组会在 geometry 和内存预算允许时忽略普通的 `maxInstancesPerBatch` 上限并保持单批；不同材质组仍按批次排序，不保证跨批次的逐对象深度交错。如果业务依赖半透明对象之间的精确混合顺序，应关闭该 CPS 场景的自动合批。

CPS 语义和自绘制辅助 Mesh 可以通过每实例颜色保留不同的源材质颜色。除颜色外，材质的可见性、深度、混合、裁剪、模板和着色器状态仍必须完全一致；运行时修改这些状态会让目标对象退出原批次，恢复一致后可重新合批。内部合批标记不会写入源对象的 `userData` 或序列化结果。

下列对象会使用独立代理或源对象渲染：

- `SkinnedMesh`、`LOD`、Light、已有 `BatchedMesh` 和 morph target Mesh；
- 使用自定义 render/shadow callback 或自定义矩阵更新方法的对象；
- 使用 material `onBeforeRender` 的对象；
- 使用自定义 `onBeforeCompile` 或 `customProgramCacheKey` 的显式合批材质；
- 世界矩阵行列式小于或等于 `0` 的对象；
- 静态合并或 `BatchedMesh` 路径中的多材质 Mesh；
- 不兼容的小 geometry schema。大 Mesh 如果共享同一个 geometry，仍可使用 `InstancedMesh`。

::: tip API 兼容
源对象不会从公开场景树和缓存中删除。标准代理交点会映射回源对象，并重新计算源 geometry 对应的 `faceIndex` 和 face 数据。实例或子类自定义的 `raycast` 会直接使用源对象，隐藏对象的碰撞查询也保持 Three.js `Raycaster` 行为。
:::

## 如何判断优化是否生效

页面显示的 object 和 Mesh 数量不会下降，这是为了保留上层对象 API。请比较以下数据：

1. `instancedBatches + mergedBatches + batchedBatches + passthroughObjects`；
2. `ssp.viewport.renderer.info.render.calls`；
3. 预热后的稳定帧耗时 p50 和 p95；
4. 相同相机、分辨率、后处理和设备条件下的 A/B 结果。

首次启用可能包含 geometry 复制、GPU buffer 上传和 shader 编译，不应把首帧作为稳定运行时结果。

```js
async function benchmarkAutoInstancing(enabled, frameCount = 60) {
  ssp.setAutoInstancing(enabled, undefined, {
    minInstances: 2,
    maxInstancesPerBatch: 512,
    dynamicPromotionFrames: 2,
  });

  // 预热
  for (let index = 0; index < 10; index++) await ssp.render();

  const samples = [];
  for (let index = 0; index < frameCount; index++) {
    samples.push(await ssp.render());
  }
  samples.sort((first, second) => first - second);

  const percentile = (value) =>
    samples[Math.min(samples.length - 1, Math.floor(samples.length * value))];

  return {
    enabled,
    p50: percentile(0.5),
    p95: percentile(0.95),
    drawCalls: ssp.viewport.renderer.info.render.calls,
    stats: ssp.getAutoInstancingStats(),
  };
}
```

::: tip 调参建议
先使用默认值。只有在统计显示批次过大、动态对象频繁提升，或者双面透明 draw call 明显偏高时，再调整对应参数。持续移动对象会暂时退出静态批次，对象稳定后会自动恢复可用的合批策略。
:::
