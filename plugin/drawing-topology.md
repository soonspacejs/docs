---
sidebarDepth: 2
---

# plugin-drawing-topology

![beta](https://img.shields.io/npm/v/@soonspacejs/plugin-drawing-topology/latest.svg)

拓扑路径绘制。

## 交互提示

鼠标左键单击连接一个点

鼠标右键单击或 `delete | Backspace` 键删除上一个点

鼠标左键双击或 `return | Enter` 键保存路径并结束绘制

`esc` 键清空路径并结束绘制

## 样例

<Docs-Iframe src="plugin/drawingTopology.html" />

## 安装

```bash
npm install @soonspacejs/plugin-drawing-topology -S
# or
yarn add @soonspacejs/plugin-drawing-topology -S
```

## 使用方法

```js {2,10}
import SoonSpace from 'soonspacejs';
import DrawingTopologyPlugin from '@soonspacejs/plugin-drawing-topology';

const ssp = new SoonSpace({
  el: '#view',
  options: {},
  events: {},
});

const drawingTopologyPlugin = ssp.registerPlugin(
  DrawingTopologyPlugin,
  'drawTopologyPlugin'
);
consolo.log(drawingTopologyPlugin);
```

## 方法

### start

开始绘制拓扑路径

#### 定义

```ts
interface StartOptions extends TopologyInfo {
  onCancel?: () => void;
  onDone?: (nodes: TopologyInnerNodeInfo[]) => void;
}

function start(options: StartOptions): void;
```

#### 用法

```js
drawingTopologyPlugin.start({
  id: 'draing_topology',
  onDone(nodes) {
    console.log('drawEnd', nodes);
  },
  onCancel() {
    console.log('drawCancel');
  },
});
```

#### 参数

##### options
- **描述:** 配置
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** `StartOptions`

###### StartOptions

<Docs-Table 
    :data="[
      {
        prop: 'onDone', desc: '绘制完成的回调函数', type: 'function(nodes: TopologyInnerNodeInfo[]){}', require: false, default: ''
      },
      {
        prop: 'onCancel', desc: '取消绘制的回调函数', type: 'function(){}', require: false, default: ''
      }
    ]"
/>

其他配置参考[这里](../api/topology.html#topologyinfo)