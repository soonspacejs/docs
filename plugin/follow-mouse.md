---
sidebarDepth: 2
---

# follow-mouse

![beta](https://img.shields.io/npm/v/@soonspacejs/plugin-follow-mouse/latest.svg)

空间中摆放模型时，模型跟随鼠标插件。

## 交互提示

鼠标左键单击摆放模型
<br>
鼠标左键双击摆放模型并结束摆放
<br>
回车键结束摆放
<br>
鼠标右键单击或 `delete` 删除上一次摆放
<br>
`esc` 清空并取消摆放

## 样例

<Docs-Iframe src="plugin/followMouse.html" />

## 安装

```bash
npm install @soonspacejs/plugin-follow-mouse -S
# or
yarn add @soonspacejs/plugin-follow-mouse -S
```

## 使用方法

```js {2,10}
import SoonSpace from 'soonspacejs';
import FollowMousePlugin from '@soonspacejs/plugin-follow-mouse';

const ssp = new SoonSpace({
  el: '#view',
  options: {},
  event: {},
});

const followMousePlugin = ssp.registerPlugin(
  FollowMousePlugin,
  'followMousePlugin'
);
consolo.log(followMousePlugin);
```

## 方法

### start

开始让模型跟随鼠标。

#### 定义

```ts
interface StartOptions {
  openHelper?: boolean
  helperColor?: IColor
  offset?: Position
  onPlace?: <ObjectType = Object3D>(object: ObjectType) => void
  onDone?: <ObjectType = Object3D>(objects: ObjectType[]) => void
  onBack?: <ObjectType = Object3D>(object: ObjectType) => void
  onCancel?: () => void
}

function start(model: Sbm | Model, options: StartOptions = {}) => void
```

#### 用法

```js
followMousePlugin.start(
  // model
  sbmObject,
  // options
  {
    openHelper: true,
    helperColor: 0xffff00,
    offsetY: {
      x: 2,
      y: 2,
      z: 2
    },
    onPlace(model) {
      console.log('onPlace', model);
    },
    onBack(model) {
      console.log('onBack', model);
    },
    onDone(modelList) {
      console.log('onDone', modelList);
    },
    onCancel() {
      console.log('onCancel');
    },
  }
);
```

#### 参数

##### model

- **描述:** 跟随鼠标的模型对象
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** `Sbm ｜ Model`

##### options

- **描述:** 可配置项
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** `StartOptions`

###### StartOptions

<br>
<Docs-Table 
    :data="[
      {
        prop: 'openHelper', desc: '是否显示包围盒辅助器', type: 'boolean', require: false, default: 'true'
      },
      {
        prop: 'helperColor', desc: '包围盒辅助器颜色', type: 'IColor', require: false, default: '0xffff00', link: '../guide/types.html#icolor'
      },
      {
        prop: 'offset', desc: '模型移动时取点的偏移量', type: 'Position', require: false, default: '', link: '../guide/types.html#position'
      },
      {
        prop: 'onPlace', desc: '放置模型时回调函数', type: '(model) => {}', require: false, default: ''
      },
      {
        prop: 'onBack', desc: '取消上一次放置时回调函数', type: '(model) => {}', require: false, default: ''
      },
      {
        prop: 'onDone', desc: '完成时回调函数', type: '(modelList) => {}', require: false, default: ''
      },
      {
        prop: 'onCancel', desc: '取消时回调函数', type: '() => {}', require: false, default: ''
      },
    ]"
/>
