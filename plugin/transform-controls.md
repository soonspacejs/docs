---
sidebarDepth: 2
---

# transform-controls
![beta](https://img.shields.io/npm/v/@soonspacejs/plugin-transform-controls/next.svg)
<br>
空间对象操作（移动、旋转、缩放）控制器插件。

## 安装
```bash
npm install @soonspacejs/plugin-transform-controls@next -S
# or
yarn add @soonspacejs/plugin-transform-controls@next -S
```

## 使用方法
```js {2,11}
import SoonSpace from 'soonspacejs'
import TransformControlsPlugin from '@soonspacejs/plugin-transform-controls'

const ssp = new SoonSpace({
  el: '#view',
  options: {},
  event: {}
})

const transformControls = ssp.registerPlugin(TransformControlsPlugin, 'transformControls')
consolo.log(transformControls)
```

## 方法
### start
开启控制器。
#### 定义
```ts
interface StartOptions {
  mode?: 'translate' | 'rotate' | 'scale';
  onUpdate?: (object: Object3D) => void;
  onClose?: () => void;
}

function start(options: StartOptions) => Promise<Vector3>
```
#### 用法
```js
transformControls.start(
  // object
  sbmObject,
  // options
  {
    object: sbmObject,
    mode: 'translate',
    onUpdate: (object) => { console.log('updated object', object) },
    onClose: () => {}
  }
)
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
        prop: 'onClose', desc: '控制器关闭时触发函数', type: '() => void', require: false, default: ''
      }
    ]"
/>

### changeMode
切换控制器模式。
#### 用法
```js
patrolControls.changeMode('rotate')
```
#### 参数
- mode: 'translate' | 'rotate' | 'scale'

### close
关闭控制器。
#### 用法
```js
transformControls.close()
```
