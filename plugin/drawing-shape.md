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

coding...
