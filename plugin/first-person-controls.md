---
sidebarDepth: 2
---

# first-person-controls

![beta](https://img.shields.io/npm/v/@soonspacejs/plugin-first-person-controls/next.svg)

第一人称漫游控制器插件。

## 交互提示
`WASD` 或 :arrow_up: :arrow_left: :arrow_down: :arrow_right: ：控制移动
<br>
`UHJK` 或 鼠标 ：控制方向
<br>
空格 ：控制跳跃

<!-- ::: tip 交互提示
键盘 `WASD` 或来**前进、后退和左右移动**，空格跳跃，长按左键同时移动鼠标旋转视角。
::: -->

## 安装

```bash
npm install @soonspacejs/plugin-first-person-controls@next -S
# or
yarn add @soonspacejs/plugin-first-person-controls@next -S
```

## 使用方法

```js {2,10}
import SoonSpace from 'soonspacejs';
import FirstPersonControlsPlugin from '@soonspacejs/plugin-first-person-controls';

const ssp = new SoonSpace({
  el: '#view',
  options: {},
  event: {},
});

const firstPersonControls = ssp.registerPlugin(
  FirstPersonControlsPlugin,
  'firstPersonControls'
);
consolo.log(firstPersonControls);
```

## 属性

### rotationAngle

可旋转弧度范围。

- 类型：`{ max: number, min: number }`
- 默认值：`{ max: Math.PI, min: 0 }`

### moveSpeed

移动速度。

- 类型：`number`
- 默认值：`1`

### eyeHeight

模拟眼睛高度。

- 类型：`number`
- 默认值：`50`

### kneeheight

模拟膝盖高度。

- 类型：`number`
- 默认值：`160`

### jumpHeight

跳跃高度。

- 类型：`number`
- 默认值：`110`

### enableClash

开启碰撞检测。

- 类型：`boolean`
- 默认值：`true`

## 方法

### start

开始漫游。

#### 定义

```ts
interface StartOptions {
  position: Position
  rotation?: Rotation
  moveSpeed?: number
  eyeHeight?: number
  kneeheight?: number
  jumpHeight?: number
  enableClash?: boolean
}

function start(options: StartOptions) => void
```

#### 用法

```js
firstPersonControls.start({
  position: { x: 132, y: 5, z: 91 },
  rotation: { x: 0, y: 0, z: 0 },
  moveSpeed: 1.0,
  eyeHeight: 160,
  kneeheight: 50,
  jumpHeight: 110,
  enableClash: true,
});
```

##### options

- **描述:** 可配置项
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** `StartOptions`

###### StartOptions

<br>
<Docs-Table 
    :data="[
      {
        prop: 'position', desc: '起始相机位置', type: 'Position', require: true, default: '', link: '../guide/types.html#position'
      },
      {
        prop: 'rotation', desc: '起始相机弧度', type: 'Rotation', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types.html#rotation'
      },
      {
        prop: 'moveSpeed', desc: '移动速度', type: 'number', require: false, default: '1'
      },
      {
        prop: 'eyeHeight', desc: '模拟眼睛高度', type: 'number', require: false, default: '160'
      },
      {
        prop: 'kneeheight', desc: '模拟膝盖高度', type: 'number', require: false, default: '50'
      },
      {
        prop: 'jumpHeight', desc: '跳跃高度', type: 'number', require: false, default: '110'
      },
      {
        prop: 'enableClash', desc: '开启碰撞检测', type: 'boolean', require: false, default: 'true'
      },
    ]"
/>

### stop

停止漫游。

#### 用法

```js
firstPersonControls.stop();
```
