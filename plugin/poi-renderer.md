---
outline: 3
---

# plugin-poi-renderer

把自定义 HTML、视频或键值面板渲染为 SoonSpace `PoiNode`。

## 安装

```bash
npm install @soonspacejs/plugin-poi-renderer -S
```

## 使用方法

```ts
import SoonSpace from 'soonspacejs'
import PoiRendererPlugin from '@soonspacejs/plugin-poi-renderer'

const ssp = new SoonSpace({
  el: '#view',
  options: {},
  events: {},
})
const renderer = ssp.registerPlugin(
  PoiRendererPlugin,
  'poiRenderer'
)

const panel = renderer.renderPanel({
  id: 'device-panel',
  position: { x: 0, y: 5, z: 0 },
  dataSource: [
    { label: '温度', value: '24 ℃' },
    { label: '状态', value: '正常' },
  ],
  style: {
    width: '240px',
    padding: '12px',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
})

await ssp.render()
```

## API

### renderCustom

```ts
renderCustom(options: PoiNodeCustomOptions): PoiNode
```

创建指定 `tagName` 的 HTMLElement，应用 CSS，设置可选的 `innerHTML`，再调用 `ssp.createPoiNode()`。

```ts
const poi = renderer.renderCustom({
  id: 'custom-poi',
  tagName: 'button',
  innerHTML: '打开设备',
  style: {
    padding: '8px 12px',
    borderRadius: '4px',
  },
})
```

### renderVideo

```ts
renderVideo(options: PoiNodeVideoOptions): PoiNode
```

创建带控制条、静音播放的 `<video>` PoiNode。

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `src` | `string` | - | 视频 URL。 |
| `style` | `CSS.Properties` | `DefaultStyle` | 视频元素样式。 |
| `isLoop` | `boolean` | `true` | 是否循环。 |
| `autoPlay` | `boolean` | `true` | 是否自动播放。浏览器仍可能按自身策略阻止自动播放。 |

### renderPanel

```ts
renderPanel(options: PoiNodePanelOptions): PoiNode
```

把 `dataSource` 渲染成由 label/value 组成的多行面板。可分别通过 `style`、`rowStyle`、`labelStyle` 和 `valueStyle` 控制样式。

### batchRender

```ts
batchRender(options: PoiNodeBatchOptions): void
```

按 `dataSource` 批量渲染 `PANEL` 或 `VIDEO`。再次调用前，插件会删除上一次批量渲染记录中的 PoiNode。

```ts
renderer.batchRender({
  dataSource: [
    {
      id: 'camera-1',
      width: 320,
      height: 180,
      dataSource: [],
      fileUrl: '/video/camera-1.mp4',
      contentType: PoiContentTypeEnum.VIDEO,
      style: '{}',
    },
  ],
})
```

## 类型

### PoiNodeCustomOptions

```ts
interface PoiNodeCustomOptions extends PoiNodeBaseOption {
  tagName: keyof HTMLElementTagNameMap
  style?: CSS.Properties
  innerHTML?: string
}
```

### PoiNodePanelOptions

```ts
interface PoiNodePanelDataSource {
  label: string
  value: string
}

interface PoiNodePanelOptions extends PoiNodeBaseOption {
  dataSource: PoiNodePanelDataSource[]
  style?: CSS.Properties
  rowStyle?: CSS.Properties
  labelStyle?: CSS.Properties
  valueStyle?: CSS.Properties
}
```

### PoiNodeData

```ts
interface PoiNodeData extends PoiNodeBaseOption {
  pid?: string
  width: number
  height: number
  dataSource: PoiNodePanelDataSource[]
  fileUrl?: string
  contentType: PoiContentTypeEnum
  style: string
}
```

`pid` 存在时，插件会把新 PoiNode 加到对应的父对象。`PoiContentTypeEnum` 当前包含 `PANEL`、`VIDEO` 和 `VIDEO_STREAM`，但 `batchRender` 只实现了 `PANEL` 与 `VIDEO`。

::: warning 内容安全
`renderCustom` 会直接写入 `innerHTML`，`renderPanel` 也不会转义 label/value。不要把未经清洗的外部内容传给这两个 API。`batchRender` 的 PANEL `style` 还必须是包含 `panel.bodyStyle`、`rowStyle`、`labelStyle` 和 `valueStyle` 的合法 JSON 字符串。
:::

## DefaultStyle

```ts
{
  width: '400px',
  height: '300px',
  backgroundColor: 'black',
}
```
