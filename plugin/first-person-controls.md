---
sidebarDepth: 2
---

# plugin-first-person-controls

![beta](https://img.shields.io/npm/v/@soonspacejs/plugin-first-person-controls/latest.svg)

第一人称漫游控制器。

## 交互提示

默认情况下：

`WASD` 或 :arrow_up: :arrow_left: :arrow_down: :arrow_right: 控制移动
<br>
`IJKL` 或 **鼠标** 控制方向
<br>
`QE` 上下平移
<br>
空格跳跃

可以使用 [keyCodeMap](#keycodemap) 自定义按键

## 样例

<Docs-Iframe src="plugin/firstPersonControls.html" />

## 安装

```bash
npm install @soonspacejs/plugin-first-person-controls -S
# or
yarn add @soonspacejs/plugin-first-person-controls -S
```

## 使用方法

```js {2,10}
import SoonSpace from 'soonspacejs';
import FirstPersonControlsPlugin from '@soonspacejs/plugin-first-person-controls';

const ssp = new SoonSpace({
  el: '#view',
  options: {},
  events: {},
});

const firstPersonControls = ssp.registerPlugin(FirstPersonControlsPlugin, 'firstPersonControls');
consolo.log(firstPersonControls);
```

## 属性

### enabled

是否开启控制

### keyCodeMap

`v2.10.7`

键盘 [code](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_code_values) 映射，可用于自定义键位

#### 用法

```js
const { keyCodeMap } = firstPersonControls;
keyCodeMap.moveLeft = [];
keyCodeMap.moveRight = [];
keyCodeMap.rotateLeft = ['ArrowLeft'];
keyCodeMap.rotateRight = ['ArrowRight'];
```

默认值

```js
keyCodeMap = {
  moveForward: ['ArrowUp', 'KeyW'],
  moveBackward: ['ArrowDown', 'KeyS'],
  moveLeft: ['ArrowLeft', 'KeyA'],
  moveRight: ['ArrowRight', 'KeyD'],
  moveUp: ['KeyQ'],
  moveDown: ['KeyE'],
  rotateUp: ['KeyI'],
  rotateDown: ['KeyK'],
  rotateLeft: ['KeyJ'],
  rotateRight: ['KeyL'],
  jump: ['Space'],
};
```

### rotationAngle <Base-Deprecated />

可旋转弧度范围。

- 类型：`{ max: number, min: number }`
- 默认值：`{ max: Math.PI, min: 0 }`

::: warning 弃用警告
请使用 [controls](../api/controls.html) 的 `minPolarAngle` 和 `maxPolarAngle` 属性替代
:::

### moveSpeed

移动速度。

- 类型：`number`
- 默认值：`1`

### eyeHeight

模拟眼睛高度。

- 类型：`number`
- 默认值：`50`

### kneeHeight

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

### enableGravity

开启重力检测。

- 类型：`boolean`
- 默认值：`true`

## 方法

### start

开始漫游。

#### 定义

```ts
interface StartOptions {
  position?: Position | null;
  rotation?: Rotation | null;
  moveSpeed?: number;
  eyeHeight?: number;
  kneeHeight?: number;
  jumpHeight?: number;
  enableClash?: boolean;
  enableGravity?: boolean;
  /**
   * 模型对象的搜索半径的系数
   * @remarks
   * 搜索半径是 clashCheckDistance 的多少倍
   */
  searchRadiusFactor?: number;
  /**
   * 碰撞距离
   */
  clashDistance?: number;
  /**
   * 碰撞检测距离
   */
  clashCheckDistance?: number;
  /**
   * 重力速度
   */
  gravitySpeed?: number;

  /**
   * 重力搜索系数
   * @remarks
   * 重力搜索系数 表示 向下搜索多少个 eyeHeight 的深度
   */
  gravitySearchFactor?: number;

  /**
   * 碰撞对象过滤器
   * @remarks
   * 会在遍历对象时逐个调用该方法
   *
   * @param obj - Object3D 对象
   * @returns true：表示检测该对象的碰撞；false | null | undefined | void：表示不检测该对象的碰撞；
   */
  clashFilter?: ClashFilter;

  /**
   * 碰撞检测的层级
   */
  clashLayers?: number[];

  /**
   * 反向旋转
   */
  reverseRotate?: boolean | null;

  /**
   * 是否开启旋转
   */
  rotate?: boolean | null;

  /**
   * 旋转速度
   */
  rotateSpeed?: number;
  /**
   * 是否开启水平方向的旋转
   */
  horizontalRotate?: boolean | null;
  /**
   * 是否开启垂直方向旋转
   */
  verticalRotate?: boolean | null;
  /**
   * 开启双击前进
   */
  dblClickForward?: boolean;
}

/**
 * 碰撞对象过滤器
 * @remarks
 * 会在遍历对象时逐个调用该方法
 *
 * @param obj - Object3D 对象
 * @returns true：表示检测该对象的碰撞；false | null | undefined | void：表示不检测该对象的碰撞；
 */
type ClashFilter = ( obj: Object3D ) => ( boolean | null | undefined | void )

function start(options: StartOptions) => void
```

#### 用法

```js
firstPersonControls.start({
  position: { x: 37, y: 5, z: 4 },
  rotation: { x: 0, y: Math.PI, z: 0 },
  eyeHeight: 1.5,
  kneeHeight: 0.5,
  jumpHeight: 1,
  moveSpeed: 0.4,
  gravitySpeed: 0.5,
  enableClash: true,
  clashCheckDistance: 5,
  searchRadiusFactor: 1,
  clashDistance: 0.1,
  enableGravity: true,
  rotateSpeed: 0.5,
  horizontalRotate: true,
  verticalRotate: true,
  dblClickForward: true,
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
        prop: 'position', desc: '起始相机位置', type: 'Position', require: false, default: '', link: '../guide/types.html#position'
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
        prop: 'kneeHeight', desc: '模拟膝盖高度', type: 'number', require: false, default: '50'
      },
      {
        prop: 'jumpHeight', desc: '跳跃高度', type: 'number', require: false, default: '110'
      },
      {
        prop: 'enableClash', desc: '开启碰撞检测', type: 'boolean', require: false, default: 'true'
      },
      {
        prop: 'enableGravity', desc: '开启重力检测', type: 'boolean', require: false, default: 'true'
      },
      {
        prop: 'searchRadiusFactor', desc: '模型对象的搜索半径的系数；搜索半径是 clashCheckDistance 的多少倍', type: 'number', require: false, default: '3'
      },
      {
        prop: 'clashDistance', desc: '碰撞距离', type: 'number', require: false, default: '50'
      },
      {
        prop: 'clashCheckDistance', desc: '碰撞检测距离', type: 'number', require: false, default: '200'
      },
      {
        prop: 'gravitySpeed', desc: '重力速度', type: 'number', require: false, default: '10'
      },
      {
        prop: 'gravitySearchFactor', desc: '重力搜索系数，表示 向下搜索多少个 eyeHeight 的深度', type: 'number', require: false, default: '3'
      },
      {
        prop: 'clashFilter', desc: '碰撞对象过滤器，会在遍历对象时逐个调用该方法', type: 'ClashFilter', require: false, default: 'undefined'
      },
      {
        prop: 'clashLayers', desc: '碰撞检测的层级', type: 'number[]', require: false, default: '[0]'
      },
      {
        prop: 'rotate', desc: '是否开启旋转', type: 'boolean | null', require: false, default: 'true'
      },
      {
        prop: 'rotateSpeed', desc: '旋转速度', type: 'number', require: false, default: '1'
      },
      {
        prop: 'reverseRotate', desc: '反向旋转', type: 'boolean | null', require: false, default: 'false'
      },
      {
        prop: 'horizontalRotate', desc: '是否开启水平方向的旋转', type: 'boolean | null', require: false, default: 'true'
      },
      {
        prop: 'verticalRotate', desc: '是否开启垂直方向旋转', type: 'boolean | null', require: false, default: 'true'
      },
      {
        prop: 'dblClickForward', desc: '是否开启双击前进', type: 'boolean', require: false, default: 'false'
      },
    ]"
/>

### stop

停止漫游。

#### 用法

```js
firstPersonControls.stop();
```

### setOptions

设置选项。可用于漫游时动态更改一些配置

#### 类型

```ts
setOptions ( options: StartOptions ): void
```
