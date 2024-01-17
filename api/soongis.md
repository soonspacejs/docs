# SoonGIS

在 `v2.11.x` 之后，SoonSpace 已经支持了 [SoonGIS](https://www.npmjs.com/package/soongis) 地图功能。

与 SooGIS 结合使用有以下限制：

- `el` 配置项被禁用，使用 SoonGIS 中的 canvas 作为容器。
- 背景相关的配置项被禁用，背景使用 SoonGIS 的底图作为背景。
- SoonSpace [控制器](./controls) 和 [相机](./camera) 的功能将失效，相机相关的控制使用 SoonGIS 控制器。
- [PoiNode 对象](./poiNode) 未完全兼容，目前只支持 `2D` 类型。

## 样例

<Docs-Iframe src="soongis/get-started.html" />

<Docs-Iframe src="soongis/trips.html" />

## 安装

```bash
npm install maplibre-gl soongis
```

::: tip 提示
soongis 依赖于 [maplibre-gl](https://www.npmjs.com/package/maplibre-gl)，请确保已安装 maplibre-gl。
:::

## 使用方法

```js
import SoonGIS from 'soongis';
import SoonSpace from 'soonspacejs';

const soongis = new SoonGIS({
  // 容器 id
  container: 'map',
  center: [120.16071664690207, 30.189586637919618],
  zoom: 18,
  pitch: 60,
  maxPitch: 85,
  antialias: true,
  style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
});

// maplibre-gl 实例
const { map } = soongis;

const ssp = new SoonSpace({
  soongis,
});

// SoonGIS 管理器，设置场景坐标...
const { soongisManager } = ssp;
```

::: info SoonGIS 选项
SoonGIS 支持所有 maplibre-gl 选项，包括 `container`、`center`、`zoom`、`pitch`、`maxPitch`、`antialias`、`style`、`hash`、`interactive`、`preserveDrawingBuffer`、`localIdeographFontFamily`、`transformRequest`、`attributionControl`、`customAttribution`、`logoPosition`、`logo`、`renderWorldCopies`、`failIfMajorPerformanceCaveat`、`maxTileCacheSize`。

具体请查阅 [maplibre-gl 文档](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.Map/)。
:::

## SOONSPACE_LAYER_ID

<Base-Tag title="readonly" />

```js
ssp.soongisManager.SOONSPACE_LAYER_ID;
```

SoonGIS 管理器会将 SoonSpace 作为一个图层，并将其 id 设为 `SOONSPACE_LAYER_ID`。

你可以通过 `map.getLayer(SOONSPACE_LAYER_ID)` 获取 SoonSpace 图层，并对其进行操作。

## fromPositionToCoordinate

从笛卡尔坐标 `position` 转换为经纬度 `coordinate`。

### 类型

```ts
type Coordinate = {
  /**
   * 经度
   */
  longitude: number;
  /**
   * 纬度
   */
  latitude: number;
  /**
   * 高程
   */
  altitude: number;
};

function fromPositionToCoordinate(position: IVector3): Coordinate | null;
```

### 用法

```js
const position = {
  x: 0,
  // y 值会直接设置为 coordinate.altitude
  y: 0,
  z: 0,
};
const coordinate = ssp.soongisManager.fromPositionToCoordinate(position);
```

## fromCoordinateToPosition

从经纬度 `coordinate` 转换为笛卡尔坐标 `position`。

### 类型

```ts
function fromCoordinateToPosition(coordinate: Coordinate): Vector3 | null;
```

### 用法

```js
const center = [120.16071664690207, 30.189586637919618];

const position = ssp.soongisManager.fromCoordinateToPosition({
  longitude: center[0],
  latitude: center[1],
  // 高程会直接设置为 position.y 值
  altitude: 0,
});

// 将模型设置到指定位置
const model = ssp.loadModel({
  id: 'xx',
  url: 'xxx',
  position,
});
```

更多功能正在完善中...
