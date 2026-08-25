---
outline: 3
---

# plugin-fds

加载和播放 FDS（Fire Dynamics Simulator）体数据。这个包没有默认插件类，主要入口是 `FdsManager`；底层也导出 `loadFDS`、`FdsMesh` 和 `VolumePoints`。

## 安装

```bash
npm install @soonspacejs/plugin-fds fflate ndarray -S
```

## 快速使用

```ts
import SoonSpace from 'soonspacejs'
import { FdsManager } from '@soonspacejs/plugin-fds'

const ssp = new SoonSpace({
  el: '#view',
  options: {},
  events: {},
})
const fds = new FdsManager(ssp)

await fds.load('/fds/fire.zip', {
  field: 'temperature',
  initialTimeSec: 0,
})

fds.play()
```

不再使用时调用：

```ts
fds.dispose()
```

## FdsManager

### 构造函数

```ts
new FdsManager(
  ssp: SoonSpace,
  options?: IFdsManagerOptions
)
```

```ts
interface IFdsManagerOptions {
  resolveUrl?: (
    path: string,
    source?: IFdsManagerSource
  ) => string
  resolveParent?: (
    source?: IFdsManagerSource
  ) => Object3D | null | undefined
  getSources?: () => Promise<
    IFdsManagerSource[] | null | undefined
  >
  fallbackUrl?: string
}
```

当 `load()` 没有显式输入时，管理器会读取 `getSources()`；没有有效源时再使用 `fallbackUrl`。

### load

```ts
load(
  input?: TFdsManagerLoadInput,
  options?: IFdsManagerLoadOptions
): Promise<VolumePoints[]>
```

`input` 可以是 URL、`IFdsManagerSource`，或两者组成的数组。

```ts
await fds.load(
  [
    {
      id: 'temperature-volume',
      name: 'Temperature',
      url: '/fds/fire.zip',
      order: 1,
    },
    {
      id: 'smoke-volume',
      name: 'Smoke',
      url: '/fds/smoke.zip',
      order: 2,
    },
  ],
  {
    field: 'soot_density',
    clearBeforeLoad: true,
    activeIndex: 1,
  }
)
```

### 加载配置

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `field` | `'temperature' \| 'soot_density' \| 'hrrpuv'` | 自动选择首个存在的字段 | 要读取的数据字段。 |
| `clearBeforeLoad` | `boolean` | `true` | 加载前是否移除当前管理器中的体数据。 |
| `activeIndex` | `number` | `0` | 新数据中的活动体索引。 |
| `initialTimeSec` | `number` | `0` | 初始播放秒数。 |
| `simulationDurationSec` | `number` | 从清单推断 | 数据缺少时长时的覆盖值。 |

`IFdsManagerSource` 还支持 `id`、`sid`、`nodeId`、`name`、`visible`、`order`、`path`/`url`、`parent`、`meshIjk`、`meshXb`、`simulationTime` 和 `initialTimeSec`。

### 状态与播放

| API | 返回值 | 说明 |
| --- | --- | --- |
| `id` | `string` | 当前管理器的只读 ID。 |
| `volumes` | `VolumePoints[]` | 已加载体对象的副本数组。 |
| `activeVolume` | `VolumePoints \| null` | 当前活动体。 |
| `isPlaying` | `boolean` | 是否正在播放。 |
| `getState()` | `IFdsManagerState` | 返回活动体、时间、帧和数据源状态。 |
| `setActiveVolume(target)` | `VolumePoints \| null` | 按索引、ID、SID、URL、名称或对象切换活动体。 |
| `setTime(timeSec, options?)` | `Promise<VolumePoints \| null>` | 跳转到指定秒数；`wait: false` 时异步请求目标帧。 |
| `play(target?)` | `boolean` | 播放指定体或当前活动体。 |
| `pause()` | `boolean` | 暂停播放。 |
| `togglePlay(target?)` | `boolean` | 切换播放状态。 |
| `clear()` | `number` | 移除全部体对象并返回移除数量。 |
| `setOptions(options)` | `this` | 合并管理器配置。 |
| `dispose()` | `void` | 停止播放并释放管理器持有的体对象。 |

### IFdsManagerState

```ts
interface IFdsManagerState {
  activeVolume: VolumePoints | null
  activeIndex: number
  volumes: VolumePoints[]
  count: number
  playing: boolean
  field?: 'temperature' | 'soot_density' | 'hrrpuv'
  source: IFdsManagerSource | null
  currentTimeSec: number
  renderedTimeSec: number
  durationSec: number
  totalFrames: number
  renderedFrameIndex: number
}
```

### 事件

`FdsManager` 继承 Three.js `EventDispatcher`。

```ts
fds.addEventListener('statechange', ({ state }) => {
  console.log(state.currentTimeSec, state.playing)
})
```

| 事件 | 载荷 |
| --- | --- |
| `loaded` | `sources`、`volumes`、`state` |
| `statechange` | `state` |
| `activechange` | `volume`、`state` |
| `clear` | `count`、`state` |
| `error` | `error` |

## 底层 API

### loadFDS

```ts
loadFDS(
  ssp: SoonSpace,
  url: string,
  parent?: Object3D | null,
  options?: TFdsLoadOptions
): Promise<VolumePoints>
```

直接加载单个 FDS ZIP。它按需解码分片、预取当前时间之后的数据，并把 `VolumePoints` 加到 `parent` 或场景。

### FdsMesh

```ts
const mesh = new FdsMesh(
  { x: 100, y: 60, z: 40 },
  {
    minX: 0,
    minY: 0,
    minZ: 0,
    maxX: 10,
    maxY: 6,
    maxZ: 4,
  }
)

mesh.getPositionByCell({ x: 10, y: 5, z: 2 })
mesh.getCellByPosition({ x: 1, y: 2, z: 3 })
```

两个转换方法的空间参数可以是 `'fds'` 或 `'threejs'`，默认使用 `'threejs'`。

### VolumePoints

| API | 说明 |
| --- | --- |
| `updateData(data)` | 更新 3D 纹理中的体素数据。 |
| `updateCamera(cameraPos)` | 同步 shader 的相机位置。 |
| `dispose()` | 释放纹理、材质和几何体。 |

包还导出 `fdsSpaceMatrix`、`threeToFdsSpaceMatrix`、`rainbowCanvasTexture` 和 `sootCanvasTexture`，用于自定义坐标转换与色带。

## 数据包约定

ZIP 中至少需要一个受支持字段目录，以及目录内的 `simulates.json` 和 `slice.json`。`slice.json.frames` 可以为空；存在帧时间映射时会用于把帧索引换算成物理秒数。指定的 `field` 不存在时，`loadFDS` 会抛出错误。
