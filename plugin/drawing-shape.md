---
sidebarDepth: 2
---

# plugin-drawing-shape

![beta](https://img.shields.io/npm/v/@soonspacejs/plugin-drawing-shape/latest.svg)

绘制基础图形。

## 样例

<Docs-Iframe src="plugin/drawingShape.html" />

## 安装

```bash
npm install @soonspacejs/plugin-drawing-shape -S
# or
yarn add @soonspacejs/plugin-drawing-shape -S
```

## 使用方法

```js {2,10}
import SoonSpace from 'soonspacejs';
import DrawingShapePlugin from '@soonspacejs/plugin-drawing-shape';

const ssp = new SoonSpace({
  el: '#view',
  options: {},
  events: {},
});

const drawingShapePlugin = ssp.registerPlugin(
  DrawingShapePlugin,
  'drawingShapePlugin'
);
consolo.log(drawingShapePlugin);
```

## 方法

### drawingPoint
绘制点

#### 交互
鼠标 **左键单击** 确定位置并结束绘制，鼠标 **右键单击** 或按键 **Esc** 取消绘制。

#### 定义
```ts
type DrawingPointInfo = Omit<PointInfo, 'id'>

interface DrawingPointEvents {
  onCancel?: () => void
}

function drawingPoint(options: DrawingPointInfo, events?: DrawingPointEvents): Promise<Omit<PointInfo, 'id'>>
```

#### 用法
```js
drawingShapePlugin.drawingPoint(
  // options
  {
    color: 'red',
    opacity: 0.5
  },
  // events
  {
    onCancel() {
      console.log('drawPoint onCancel')
    }
  }
)
  .then(res => console.log('drawPoint done', res))
```

#### 参数:
##### options

- **描述:** 点参数配置
- **类型:** `DrawingPointInfo`
- **必填:** <Base-RequireIcon />

`DrawingPointInfo` 字段属性（接口类型）继承于 [PointInfo](../api/Canvas3D.html#pointinfo)，但不需要 `id` 字段。

##### events

- **描述:** 事件回填
- **类型:** [DrawingPointEvents](#drawingpointevents)
- **必填:** <Base-RequireIcon :isRequire="false" />

###### DrawingPointEvents
<Docs-Table 
    :data="[
      {
        prop: 'onCancel', desc: '取消时回调函数', type: '() => void', require: false, default: 'null'
      },
    ]"
/>

### drawingLine
绘制线

#### 交互
鼠标 **左键单击** 确定位置，鼠标 **左键双击** 确定位置并结束绘制，鼠标 **右键单击** 或按键 **Del** 取消上一步绘制，鼠标 **右键双击** 或按键 **Esc** 取消绘制。

#### 定义
```ts
type DrawingLineInfo = Omit<LineInfo, 'id' | 'points'>

interface DrawingLineEvents {
  onCancel?: () => void
  onCancelPrev?: () => void
}

function drawingLine(options: DrawingLineInfo, events?: DrawingLineEvents): Promise<Omit<LineInfo, 'id'>>
```

#### 用法
```js
drawingShapePlugin.drawingLine(
  // options
  {
    color: 'red',
    opacity: 0.5
  },
  // events
  {
    onCancel() {
      console.log('drawingLine onCancel')
    },
    onCancelPrev() {
      console.log('drawingLine onCancelPrev')
    },
  }
)
  .then(res => console.log('drawingLine done', res))
```

#### 参数:
##### options

- **描述:** 线参数配置
- **类型:** `DrawingLineInfo`
- **必填:** <Base-RequireIcon />

`DrawingLineInfo` 字段属性（接口类型）继承于 [LineInfo](../api/Canvas3D.html#lineinfo)，但不需要 `id`、`points` 字段。

##### events

- **描述:** 事件回填
- **类型:** [DrawingLineEvents](#drawinglineevents)
- **必填:** <Base-RequireIcon :isRequire="false" />

###### DrawingLineEvents
<Docs-Table 
    :data="[
      {
        prop: 'onCancel', desc: '取消时回调函数', type: '() => void', require: false, default: 'null'
      },
      {
        prop: 'onCancelPrev', desc: '取消上一步时回调函数', type: '() => void', require: false, default: 'null'
      },
    ]"
/>

### drawingPolygon
绘制面

#### 交互
鼠标 **左键单击** 确定位置，鼠标 **左键双击** 确定位置并结束绘制，鼠标 **右键单击** 或按键 **Del** 取消上一步绘制，鼠标 **右键双击** 或按键 **Esc** 取消绘制。

#### 定义
```ts
type DrawingPolygonInfo = Omit<PolygonInfo, 'id' | 'points' | 'yHeight'>

interface DrawingPolygonEvents {
  onCancel?: () => void
  onCancelPrev?: () => void
}

function drawingPolygon(options: DrawingPolygonInfo, events?: DrawingPolygonEvents): Promise<Omit<PolygonInfo, 'id'>>
```

#### 用法
```js
drawingShapePlugin.drawingPolygon(
  // options
  {
    yHeight: 200,
    color: 'blue',
    opacity: 0.1
  },
  // events
  {
    onCancel() {
      console.log('drawingPolygon onCancel')
    },
    onCancelPrev() {
      console.log('drawingPolygon onCancelPrev')
    },
  }
)
  .then(res => console.log('drawingPolygon done', res))
```

#### 参数:
##### options

- **描述:** 面参数配置
- **类型:** `DrawingPolygonInfo`
- **必填:** <Base-RequireIcon />

`DrawingPolygonInfo` 字段属性（接口类型）继承于 [PolygonInfo](../api/Canvas3D.html#polygoninfo)，但不需要 `id`、`points`、`yHeight` 字段。

##### events

- **描述:** 事件回填
- **类型:** [DrawingPolygonEvents](#drawingpolygonevents)
- **必填:** <Base-RequireIcon :isRequire="false" />

###### DrawingPolygonEvents
<Docs-Table 
    :data="[
      {
        prop: 'onCancel', desc: '取消时回调函数', type: '() => void', require: false, default: 'null'
      },
      {
        prop: 'onCancelPrev', desc: '取消上一步时回调函数', type: '() => void', require: false, default: 'null'
      },
    ]"
/>

### drawingCircle
绘制圆

#### 交互
鼠标 **左键单击** 确定圆心位置，移动鼠标设置半径，再次鼠标 **左键单击** 完成绘制， **右键单击** 或按键 **Esc** 取消绘制。

#### 定义
```ts
type DrawingCircleInfo = Omit<CircleInfo, 'id' ｜ 'radius'>

interface DrawingCircleEvents {
  onCancel?: () => void
}

function drawingCircle(options: DrawingCircleInfo, events?: DrawingCircleEvents): Promise<Omit<CircleInfo, 'id'>>
```

#### 用法
```js
drawingShapePlugin.drawingCircle(
  // options
  {
    color: 'blue',
    opacity: 0.5
  },
  // events
  {
    onCancel() {
      console.log('drawingCircle onCancel')
    }
  }
)
  .then(res => console.log('drawingCircle done', res))
```

#### 参数:
##### options

- **描述:** 圆参数配置
- **类型:** `DrawingCircleInfo`
- **必填:** <Base-RequireIcon />

`DrawingCircleInfo` 字段属性（接口类型）继承于 [CircleInfo](../api/Canvas3D.html#circleinfo)，但不需要 `id`、`radius` 字段。

##### events

- **描述:** 事件回填
- **类型:** [DrawingCircleEvents](#drawingcircleevents)
- **必填:** <Base-RequireIcon :isRequire="false" />

###### DrawingCircleEvents
<Docs-Table 
    :data="[
      {
        prop: 'onCancel', desc: '取消时回调函数', type: '() => void', require: false, default: 'null'
      },
    ]"
/>

### clearDrawingCanvas3D
清空绘制画布

#### 定义
```ts
function clearDrawingCanvas3D(): void
```

#### 用法
```js
drawingShapePlugin.clearDrawingCanvas3D()
```
