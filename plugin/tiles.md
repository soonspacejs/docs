---
outline: 3
---

# plugin-tiles

加载 3D Tiles、量化网格地形、影像/GeoJSON Overlay，并提供贴地 GIS 标绘。

## 安装

```bash
npm install @soonspacejs/plugin-tiles -S
```

## 选择入口

| 入口 | 用途 |
| --- | --- |
| 默认导出 `TilesPlugin` | 兼容旧代码，按 URL 加载和移除普通 3D Tiles。 |
| `TilesRendererManager` | 管理多个普通或 Cesium Ion 3D Tiles，支持共享参考原点。 |
| `TilesRenderer` | 独立控制单个 3D Tiles renderer。 |
| `TerrainTilesRenderer` | 地形、影像、GeoJSON、Cesium Ion 和贴地标绘的完整入口。 |
| `ArcgisTilesRenderer` | 内置 ArcGIS 影像和量化网格地形的快捷 renderer。 |

## TilesPlugin

```ts
import SoonSpace from 'soonspacejs'
import TilesPlugin from '@soonspacejs/plugin-tiles'

const tilesPlugin = ssp.registerPlugin(
  TilesPlugin,
  'tiles'
)

const tiles = await tilesPlugin.loadTiles(
  '/tiles/site/tileset.json'
)

tilesPlugin.removeTiles('/tiles/site/tileset.json')
```

### API

```ts
loadTiles(url: string): Promise<TilesRenderer | undefined>
removeTiles(url: string): boolean
```

`loadTiles` 会共享 LRU、解析和下载队列，设置当前相机，把 `tiles.group` 加入场景，并在 tileset 根节点加载后 resolve。重复 URL 不会再次加载。

这里返回的是底层 `um-3d-tiles-renderer` 实例；本包的命名导出 `TilesRenderer` 是下文介绍的 SoonSpace 封装类。

使用 DRACO、KTX2 或 Meshopt 的 glTF tile 前，应先配置 SoonSpace 对应解码器。

## TilesRendererManager

`TilesRendererManager` 是多 tileset 场景的推荐入口。

```ts
import {
  TilesRendererManager,
} from '@soonspacejs/plugin-tiles'

const manager = new TilesRendererManager(ssp)

manager.setReferenceOrigin({
  lon: 120.12,
  lat: 30.28,
  height: 0,
})

const renderer = await manager.loadTiles({
  url: '/tiles/building/tileset.json',
  placement: {
    lon: 120.121,
    lat: 30.281,
    height: 0,
    up: '+z',
  },
})
```

### API

| API | 返回值 | 说明 |
| --- | --- | --- |
| `referenceOrigin` | `IReferenceOriginOptions \| null` | 当前共享地理原点。 |
| `setReferenceOrigin(origin)` | `void` | 设置共享原点。也支持 `(lon, lat, height?)` 重载。 |
| `clearReferenceOrigin()` | `void` | 清除共享原点。 |
| `loadTiles(options)` | `Promise<TilesRenderer \| undefined>` | 加载 URL 或 Cesium Ion tileset。 |
| `removeTiles(url)` | `boolean` | 移除并释放指定 tileset。 |
| `getTiles(url)` | `TilesRenderer \| undefined` | 获取 renderer。 |
| `getAllTiles()` | `TilesRenderer[]` | 获取全部 renderer。 |
| `clear()` | `void` | 清空全部 tileset。 |
| `invalidate(lon, lat, alt, target?)` | `void` | 使经纬度附近 tile 失效并重新请求。 |
| `applyReferencePlacement(renderer, placement)` | `boolean` | 按参考原点应用位置和 up 轴。 |
| `dispose()` | `void` | 清空 tiles，并移除 `beforeRender`、`cameraObjectChange` 信号。 |

`ReferencePlacementUp` 支持 `+x`、`-x`、`+y`、`-y`、`+z`、`-z`，以及等价的 `x`、`y`、`z`。

## TilesRenderer

```ts
import {
  MaterialType,
  TilesRenderer,
} from '@soonspacejs/plugin-tiles'

const renderer = new TilesRenderer(ssp, {
  url: '/tiles/site/tileset.json',
  autoCenter: true,
  maxDepth: 20,
  errorTarget: 2,
})

renderer.enable()
renderer.materialType = MaterialType.LIGHTING
```

也可以传入 `ICesiumIonOptions`：

```ts
const renderer = new TilesRenderer(ssp, {
  apiToken: 'YOUR_CESIUM_ION_TOKEN',
  assetId: '1234',
  autoRefreshToken: true,
})
```

### ITilesRendererOptions

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `url` | `string` | - | tileset URL。 |
| `reorientation` | `{ lon, lat, height? }` | - | 把指定经纬度移动到场景原点。 |
| `useCustomMaterial` | `boolean` | `false` | 使用自定义材质。 |
| `autoCenter` | `boolean` | `true` | 自动把模型居中。 |
| `maxDepth` | `number` | `20` | 最大遍历深度。 |
| `errorTarget` | `number` | `2` | 屏幕空间误差目标。 |

### API

| API | 说明 |
| --- | --- |
| `materialType` | 读写 `MaterialType.DEFAULT`、`GRADIENT`、`TOPOGRAPHIC_LINES`、`LIGHTING`。 |
| `applyAutoCenter()` | 根据已加载包围盒自动居中。 |
| `enable()` / `disable()` | 加入或移出 SoonSpace 场景。 |
| `invalidate(lon, lat, alt)` | 使目标位置附近 tile 失效，返回取消函数。 |
| `lonLatHeightToPosition(...)` | 经纬高转 Three.js 坐标。 |
| `positionToLonLatHeight(...)` | Three.js 坐标转经纬高。 |
| `dispose()` | 移出场景并释放 tiles 事件和 renderer 资源。 |

## TerrainTilesRenderer

```ts
import {
  OverlayType,
  TerrainTilesRenderer,
  TerrainType,
} from '@soonspacejs/plugin-tiles'

const terrain = new TerrainTilesRenderer(ssp, {
  baseUrl: '/terrain/layer.json',
  imageryUrl: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  reorientation: { lon: 120, lat: 30, height: 0.1 },
  maxDepth: 20,
  errorTarget: 1,
  alphaClipMode: 'alphaTest',
})

terrain.enable()

await terrain.addOverlay({
  id: 'districts',
  type: OverlayType.GEOJSON,
  url: '/geojson/districts.json',
  fillStyle: '#1e88e5',
  fillOpacity: 0.35,
  strokeStyle: '#ffffff',
  strokeWidth: 2,
})
```

### 配置

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `baseUrl` | `string` | 内置地形服务 | 量化网格 `layer.json` 地址。 |
| `imageryUrl` | `string \| false` | OpenStreetMap | 影像模板；`false` 禁用默认影像。 |
| `reorientation` | `IReorientationOptions \| false` | `{ lon: 120, lat: 30 }` | 地理原点重定向。 |
| `useCustomMaterial` | `boolean` | `true` | 使用自定义地形材质。 |
| `maxDepth` | `number` | `20` | 最大遍历深度。 |
| `errorTarget` | `number` | `1` | 屏幕空间误差目标。 |
| `alphaClipMode` | `'alphaTest' \| 'transparent' \| 'alphaToCoverage'` | `'alphaTest'` | GeoJSON mask 裁剪模式。 |

### 地形 API

| API | 说明 |
| --- | --- |
| `setTerrain(config, options?)` | 切换量化网格或 Cesium Ion 地形。 |
| `currentTerrainConfig` | 当前 `ITerrainConfig`。 |
| `isCesiumIon` | 当前是否为 Cesium Ion 地形。 |
| `maxDepth` / `errorTarget` | 读写 tiles 参数并触发渲染。 |
| `showTerrain` | 显示或隐藏地形。 |
| `alphaClipMode` | 修改 GeoJSON mask 的材质裁剪方式。 |
| `addEventLoad(callback)` | 监听 `load-error`，返回失败的 tile、error 和 URL。 |
| `enable()` / `disable()` | 启用或关闭地形渲染。 |
| `invalidate(lon, lat, alt)` | 使目标位置附近 tile 失效。 |
| `dispose()` | 释放地形、overlay、标绘和事件资源。 |

```ts
terrain.setTerrain({
  id: 'cesium-world-terrain',
  type: TerrainType.CESIUM_ION,
  apiToken: 'YOUR_CESIUM_ION_TOKEN',
  assetId: '1',
})
```

## Overlay

### 类型

`OverlayType` 包含：`GEOJSON`、`CESIUM_ION`、`TMS`、`XYZ`、`WMS`、`WMTS`、`URL_TEMPLATE` 和 `PLOT`。`PLOT` 用于资源分类；添加标绘请使用 `groundDecalManager.addPlot()`，不要把它传给 `addOverlay()`。

所有 Overlay 都需要：

```ts
interface IOverlayBaseOptions {
  id: string
  type: OverlayType
  color?: number | string
  opacity?: number
  order?: number
}
```

| 类型 | 额外必填字段 |
| --- | --- |
| `GEOJSON` | `url` 或 `geojson`；可设置 `mode: 'overlay' \| 'mask' \| 'invertMask'` 与 feature 样式。 |
| `CESIUM_ION` | `assetId`、`apiToken`。 |
| `TMS` / `XYZ` | `url`。 |
| `URL_TEMPLATE` | `url`；支持 `{z}`、`{x}`、`{y}`、`{s}`、`{reverseY}` 等模板变量。 |
| `WMS` | `url`、`layer`；可设置 `styles`、`crs`、`format`、`tileDimension`。 |
| `WMTS` | `url`；可设置 `layer`、`dimensions`、`tileMatrixSet`、`style`、`frame`。 |

### TerrainTilesRenderer 快捷方法

| API | 说明 |
| --- | --- |
| `addOverlay(options)` | 按 `options.type` 创建 Overlay。 |
| `removeOverlay(id)` | 移除 Overlay。 |
| `setOverlayVisible(id, visible)` | 设置可见性。 |
| `setOverlayOpacity(id, opacity)` | 设置透明度。 |
| `setOverlayOrder(id, order)` | 设置层级。 |
| `getOverlayOrder(id)` | 获取层级。 |
| `bringOverlayToFront(id)` / `sendOverlayToBack(id)` | 调整顺序。 |
| `updateGeoJSONColor(id, color)` | 更新颜色。 |
| `updateGeoJSONMode(id, mode)` | 更新 overlay/mask 模式。 |
| `updateGeoJSONStrokeStyle/StrokeWidth/FillStyle(id, value)` | 更新默认样式。 |
| `updateGeoJSONDefaultStyle(id, patch)` | 合并 feature 默认样式。 |
| `setGeoJSON(id, geojson)` | 替换 GeoJSON。 |
| `setMergedGeoJSON(id, list, options?)` | 合并并设置多份 GeoJSON。 |
| `getGeoJSONFeatureById(id, featureId)` | 查询 feature。 |
| `updateGeoJSONFeatureStyleById(...)` | 更新单个 feature 样式。 |
| `updateGeoJSONFeatureStylesByIds(...)` | 批量更新 feature 样式。 |
| `normalizeGeoJSON(geojson)` / `mergeGeoJSON(list)` | 规范化或合并 GeoJSON。 |

同一套能力也由公开的 `OverlayManager` 提供。它还包含 `get`、`has`、`getIds`、`count`、`restoreFromResourceManager`、`disposeInstances` 和 `dispose`。

## 地面标绘

`TerrainTilesRenderer.groundDecalManager` 是 `GroundDecalManager` 实例。

```ts
const plotId = terrain.groundDecalManager?.addPlot({
  type: 'point',
  id: 'incident-point',
  points: [[120.12, 30.28]],
  pointStyle: 'circle',
  size: 20,
  strokeColor: '#ffffff',
  strokeWidth: 2,
  strokeOpacity: 100,
  fillColor: '#ff3d00',
  fillOpacity: 80,
  visible: true,
})

if (plotId !== undefined) {
  terrain.flyToPlotById(plotId)
}
```

### PlotAddOptions

`type` 支持 `point`、`line`、`polygon`、`rectangle`、`circle`、`sector`、`text` 和 `arrow`。坐标固定为 `[经度, 纬度]`；描边/填充透明度使用 `0..100`，不是 `0..1`。

| 类型 | 额外字段 |
| --- | --- |
| `point` | `pointStyle: 'circle' \| 'square'` + `size`，或 `pointStyle: 'image'` + `imageWidth`、`imageHeight`、`imageUrl`/`ontologyId`。 |
| `line` | `strokeStyle`、`showArrow`、`startArrowStyle`、`endArrowStyle`。 |
| `polygon` / `rectangle` | 使用公共 points/样式字段。 |
| `circle` | `radius`。 |
| `sector` | `radius`、`startAngle`、`sectorAngle`。 |
| `text` | `content`、`fontColor`、`fontSize`，以及排版/锚点/边框字段。 |
| `arrow` | `arrowType: 'fine' \| 'assaultDirection' \| 'attack' \| 'swallowtailAttack' \| 'curved'`。 |

### GroundDecalManager API

| API | 说明 |
| --- | --- |
| `addPlot(options)` | 添加标绘并返回数字 ID。 |
| `remove(id)` / `clear()` | 删除一个或全部标绘。 |
| `getAllItems()` | 返回全部 `GisPlotBase`。 |
| `getItem(id)` / `getItemDeep(id)` | 获取浅/深快照。 |
| `setStyle(id, patch)` | 更新样式或几何字段。 |
| `setCenter(id, center)` | 修改第一个坐标。 |
| `setCoords(id, coords)` | 替换全部坐标。 |
| `setCoord(id, index, coord)` | 更新单个坐标。 |
| `insertCoord` / `removeCoord` | 插入或删除坐标。 |
| `translateCoords(id, dLon, dLat)` | 平移全部坐标。 |
| `setText(id, text)` | 更新文本标绘。 |
| `setGlobalOpacity(opacity)` | 设置全局透明度。 |
| `getCoordCount(id)` | 返回坐标数。 |
| `findNearestCoord(id, lon, lat)` | 返回最近坐标索引。 |
| `invalidateBoundingBoxes()` | 清除全部包围盒缓存。 |
| `bridge` / `plotSdfPlugin` | 访问内置 `PlotPrimitiveBridge`。 |
| `dispose()` | 释放标绘和桥接器。 |

包还公开 `GisPlotBase` 及八个 `GisPlot*` 子类、箭头几何工具、颜色/透明度工具、`computePlotBoundingBox`、`flyToPlotById`、标绘排序工具和应急资源图标解析函数。完整名称见[包导出 API 索引](../api/package-exports)。

## 生命周期

手动创建的对象必须显式释放：

```ts
terrain.dispose()
manager.dispose()
renderer.dispose()
```

::: warning Controls 监听
`TilesRendererManager`、独立 `TilesRenderer` 和默认 `TilesPlugin` 会注册相机 controls 监听，其中部分回调是匿名函数，当前 `dispose()` 无法移除；默认 `TilesPlugin` 也没有整体 `dispose()`。在同一个 SoonSpace 实例中不要反复创建/销毁这些管理器。优先复用一个实例，并使用其 `clear()`、`removeTiles()` 或 `enable()` / `disable()` 管理资源。
:::

`TilesPlugin.removeTiles()` 只释放指定 URL；需要整体卸载旧插件实例时，应逐个移除其 `tilesMap` 中的 URL。
