---
outline: 3
---

# plugin-drag-controls

![beta](https://img.shields.io/npm/v/@soonspacejs/plugin-drag-controls/latest.svg)

模型或对象拖拽。

## 样例

<Docs-Iframe src="plugin/dragControls.html" />

## 安装

```bash
npm install @soonspacejs/plugin-drag-controls
# or
yarn add @soonspacejs/plugin-drag-controls
```

## 使用方法

```js
import SoonSpace from 'soonspacejs';
import DragControlsPlugin from '@soonspacejs/plugin-drag-controls';

const ssp = new SoonSpace({
  el: '#view',
  options: {},
  events: {},
});

const dragControlsPlugin = ssp.registerPlugin(DragControlsPlugin, 'dragControlsPlugin');
consolo.log(dragControlsPlugin);
```

## 方法

### start

开启拖拽

#### 定义

```ts
interface StartOptions {
  dragStart?: (object: Object3D) => void;
  drag?: (object: Object3D) => void;
  dragEnd?: (object: Object3D) => void;
}

function start(objects: Object3D[], options?: StartOptions): void;
```

#### 用法

```js
dragControlsPlugin.start([model1, model2], {
  drag(object) {
    console.log(object);
  },
  dragStart(object) {
    console.log(object);
  },
  dragEnd(object) {
    console.log(object);
  },
});
```

#### 参数:

##### objects

- **描述:** 拖拽的对象数组
- **类型:** `Object3D[]`
- **必填:** <Base-RequireIcon :isRequire="true" />


##### options

- **描述:** 配置选项
- **类型:** `StartOptions`
- **必填:** <Base-RequireIcon :isRequire="false" />

###### StartOptions

<Docs-Table 
    :data="[
      {
        prop: 'dragStart', desc: '拖拽开始事件', type: '(object: Object3D) => void', require: false
      },
      {
        prop: 'drag', desc: '拖拽事件', type: '(object: Object3D) => void', require: false
      },
      {
        prop: 'dragEnd', desc: '拖拽结束事件', type: '(object: Object3D) => void', require: false
      }
    ]"
/>

### stop

结束拖拽

#### 定义

```ts
function stop(): void;
```

#### 用法

```js
dragControlsPlugin.stop();
```
