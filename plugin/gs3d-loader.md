---
outline: 3
---

# plugin-gs3d-loader

加载 Gaussian Splatting 场景。插件基于 `@mkkellogg/gaussian-splats-3d` 的 `DropInViewer`，支持单场景和多场景加载。

## 安装

```bash
npm install @soonspacejs/plugin-gs3d-loader -S
```

## 使用方法

```ts
import SoonSpace from 'soonspacejs'
import GS3DLoaderPlugin from '@soonspacejs/plugin-gs3d-loader'

const ssp = new SoonSpace({
  el: '#view',
  options: {},
  events: {},
})

const loader = ssp.registerPlugin(
  GS3DLoaderPlugin,
  'gs3dLoader'
)
const viewer = await loader.load('/models/site.splat')

ssp.addObject(viewer)
await ssp.render()
```

`load` 和 `loads` 只返回 `DropInViewer`，不会自动加入 SoonSpace 场景。

## API

### load

```ts
load(
  path: string,
  option?: SceneOption,
  viewer?: DropInViewer
): Promise<DropInViewer>
```

加载单个 `.splat`、`.ksplat`、`.ply` 或 `.spz` 场景。未传 `viewer` 时会调用 `createViewer()` 创建实例。

### loads

```ts
loads(
  options: ScenesOption[],
  viewer?: DropInViewer,
  showLoadingUI?: boolean,
  onProgress?: (
    totalPercent: number,
    percentLabel: string,
    loaderStatus: LoaderStatus
  ) => void
): Promise<DropInViewer>
```

一次加载多个 Gaussian Splatting 场景。加载完成后，插件会把每个 splat 场景绕 Z 轴旋转 `Math.PI`，使其匹配 SoonSpace 坐标方向。

### createViewer

```ts
createViewer(option?: Record<string, any>): DropInViewer
```

创建可挂入 Three.js 场景的 `DropInViewer`。插件默认使用以下配置：

```ts
{
  sharedMemoryForWorkers: false,
  gpuAcceleratedSort: false,
  halfPrecisionCovariancesOnGPU: true,
  dynamicScene: true,
}
```

传入的 `option` 会覆盖默认值。

## 参数结构

::: warning 非命名导出
`SceneOption`、`ScenesOption`、`LoaderStatus` 和 `SceneFormat` 出现在插件源码的方法签名中，但当前包入口只导出默认插件类，不能从包根路径命名导入这些类型。下面的结构用于说明入参；需要类型时可使用 `Parameters<GS3DLoaderPlugin['load']>` 等 TypeScript 工具类型推导。
:::

### SceneOption

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `splatAlphaRemovalThreshold` | `number` | Alpha 剔除阈值，范围 `0` 到 `255`。 |
| `position` | `number[]` | 场景位置。 |
| `rotation` | `number[]` | 场景旋转。 |
| `scale` | `number[]` | 场景缩放。 |
| `showLoadingUI` | `boolean` | 是否显示加载 UI。 |
| `headers` | `Headers` | 请求头。 |
| `onProgress` | `(percent, label, status) => void` | 单场景加载进度。 |

`ScenesOption` 在以上字段之外增加必填的 `path`，并可通过内部 `format` 数值指定 Splat、KSplat、Ply 或 Spz。通常可省略该字段，让加载器按资源识别。

`LoaderStatus` 包含 `Downloading`、`Processing` 和 `Done`。

## 释放资源

```ts
ssp.removeObject(viewer)
await viewer.dispose()
```
