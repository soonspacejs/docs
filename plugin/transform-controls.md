---
outline: 3
---

# plugin-transform-controls

![beta](https://img.shields.io/npm/v/@soonspacejs/plugin-transform-controls/latest.svg)

空间对象操作（移动、旋转、缩放）控制器。

## 样例

<Docs-Iframe src="plugin/transformControls.html" />

## 安装

```bash
npm install @soonspacejs/plugin-transform-controls -S
# or
yarn add @soonspacejs/plugin-transform-controls -S
```

## 使用方法

```js {2,11}
import SoonSpace from 'soonspacejs';
import TransformControlsPlugin from '@soonspacejs/plugin-transform-controls';

const ssp = new SoonSpace({
  el: '#view',
  options: {},
  events: {},
});

const transformControls = ssp.registerPlugin(TransformControlsPlugin, 'transformControls');
consolo.log(transformControls);
```

## 方法

### start

开启控制器。

#### 定义

```ts
interface StartOptions {
  mode?: 'translate' | 'rotate' | 'scale';
  onUpdate?: (object: Object3D) => void;
  onDragStart?: (object: Object3D) => void;
  onDragEnd?: (object: Object3D) => void;
  onClose?: () => void;
}

function start(object: Object3D, options?: StartOptions): TransformControls;
```

#### 用法

```js
const control = transformControls.start(
  // object
  modelObject,
  // options
  {
    mode: 'translate',
    onUpdate: (object) => {
      console.log('updated object', object);
    },
    onClose: () => {},
  }
);
```

#### 参数

##### model

- **描述:** 跟随鼠标的模型对象
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** `Object3D`

##### options

- **描述:** 可配置项
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** `StartOptions`

###### StartOptions

<br>
<Docs-Table 
    :data="[
      {
        prop: 'mode', desc: '操作模式', type: 'translate | rotate | scale', require: false, default: 'translate'
      },
      {
        prop: 'onUpdate', desc: '操作时实时回调函数', type: '(object: Object3D) => void', require: false, default: ''
      },
      {
        prop: 'onDragStart', desc: '操作时开始回调函数', type: '(object: Object3D) => void', require: false, default: ''
      },
      {
        prop: 'onDragEnd', desc: '操作时结束回调函数', type: '(object: Object3D) => void', require: false, default: ''
      },
      {
        prop: 'onClose', desc: '控制器关闭时触发函数', type: '() => void', require: false, default: ''
      }
    ]"
/>

### changeMode

切换控制器模式

默认切换上一个

#### 定义

```ts
function changeMode(control?: TransformControls | undefined, mode?: StartOptions['mode']): void;
```

#### 用法

```js
transformControls.changeMode(control, 'rotate');
```

#### 参数

- control: TransformControls

- mode: 'translate' | 'rotate' | 'scale'

### close

关闭控制器

默认关闭上一个

#### 定义

```ts
function close(control?: TransformControls | undefined): void;
```

#### 用法

```js
transformControls.close(control);
```

### closeAll

关闭所有控制器

#### 用法

```js
transformControls.closeAll();
```
