---
outline: 3
---

# plugin-clipping-controls

![beta](https://img.shields.io/npm/v/@soonspacejs/plugin-clipping-controls/latest.svg)

模型与场景切割。

## 样例

<Docs-Iframe src="plugin/modelClipping.html" />
<Docs-Iframe src="plugin/sceneClipping.html" />

## 安装

```bash
npm install @soonspacejs/plugin-clipping-controls -S
# or
yarn add @soonspacejs/plugin-clipping-controls -S
```

## 使用方法

```js {2,10}
import SoonSpace from 'soonspacejs';
import ClippingControlsPlugin from '@soonspacejs/plugin-clipping-controls';

const ssp = new SoonSpace({
  el: '#view',
  options: {},
  events: {},
});

const clippingControlsPlugin = ssp.registerPlugin(ClippingControlsPlugin, 'clippingControlsPlugin');
consolo.log(clippingControlsPlugin);
```

## 方法

### modelClipping

模型切割

#### 定义

```ts
interface ModelClippingOptions {
  axis: AxisType;
  clipPercent: number;
  isForward?: boolean;
  openHelper?: boolean;
}

function modelClipping(model: BaseObject3D, options: ModelClippingOptions): void;
```

#### 用法

```js
clippingControlsPlugin.modelClipping(model, {
  axis: 'x',
  clipPercent: 50,
  isForward: true,
  openHelper: true,
});

clippingControlsPlugin.modelClipping(model, {
  axis: 'x',
  clipPercent: 50,
  isForward: false,
  openHelper: true,
});
```

::: tip 提示
`axis` 和 `isForward` 组合为一个唯一标识，标识相同时会复用切割状态。

同一个轴线可以同时存在两个切割状态。
:::

#### 参数:

##### object

- **描述:** 模型对象
- **类型:** `BaseObject3D`
- **必填:** <Base-RequireIcon />

##### options

- **描述:** 配置选项
- **类型:** `ModelClippingOptions`
- **必填:** <Base-RequireIcon />

###### ModelClippingOptions

<Docs-Table 
    :data="[
      {
        prop: 'axis', desc: '坐标轴', type: 'AxisType', require: true, default: '', link: '../guide/types#axistype'
      },
      {
        prop: 'clipPercent', desc: '百分比(0 - 100)', type: 'number', require: true, default: ''
      },
      {
        prop: 'isForward', desc: '是否正向切割模型', type: 'boolean', require: false, default: true
      },
      {
        prop: 'openHelper', desc: '是否开启切割辅助面', type: 'boolean', require: false, default: true
      }
    ]"
/>

### removeModelClipping

移除模型切割（还原状态）

#### 定义

```ts
function removeModelClipping(model: BaseObject3D, axis?: AxisType, isForward?: boolean): void;
```

#### 用法

```js
clippingControlsPlugin.removeModelClipping(model, 'x');
```

::: tip 提示
`axis` 和 `isForward` 组合为一个唯一标识，用于还原切割状态。
:::

#### 参数:

##### object

- **描述:** 模型对象
- **类型:** `BaseObject3D`
- **必填:** <Base-RequireIcon />

##### axis

- **描述:** 轴线
- **类型:** [`AxisType`](../guide/types#axistype)
- **必填:** <Base-RequireIcon :isRequire="false" />

##### isForward

- **描述:** 是否正向切割
- **类型:** `boolean`
- **必填:** <Base-RequireIcon :isRequire="false" />
- **默认:** `true`

### sceneClipping

场景切割

#### 定义

```ts
interface SceneClippingOptions {
  axis: AxisType;
  clipPoint: number;
  isForward?: boolean;
  openHelper?: boolean;
}

function sceneClipping(options: SceneClippingOptions): void;
```

#### 用法

```js
clippingControlsPlugin.sceneClipping({ axis: 'x', isForward: true, clipPoint: 500 });
clippingControlsPlugin.sceneClipping({ axis: 'x', isForward: false, clipPoint: 500 });
```

::: tip 提示
`axis` 和 `isForward` 组合为一个唯一标识，标识相同时会复用切割状态。

同一个轴线可以同时存在两个切割状态。
:::

#### 参数:

##### options

- **描述:** 配置选项
- **类型:** `SceneClippingOptions`
- **必填:** <Base-RequireIcon :isRequire="true" />

###### SceneClippingOptions

<Docs-Table 
    :data="[
      {
        prop: 'axis', desc: '坐标轴', type: 'AxisType', require: true, default: '', link: '../guide/types#axistype'
      },
      {
        prop: 'clipPoint', desc: '切割点的位置', type: 'number', require: true, default: ''
      },
      {
        prop: 'isForward', desc: '是否正向切割场景', type: 'boolean', require: false, default: true
      },
      {
        prop: 'openHelper', desc: '是否开启切割辅助面', type: 'boolean', require: false, default: true
      }
    ]"
/>

### removeSceneClipping

移除场景切割（还原状态）

#### 定义

```ts
function removeSceneClipping(axis?: AxisType, isForward?: boolean): void;
```

#### 用法

```js
clippingControlsPlugin.removeSceneClipping('x');
```

::: tip 提示
`axis` 和 `isForward` 组合为一个唯一标识，用于还原切割状态。
:::

#### 参数:

##### axis

- **描述:** 轴线
- **类型:** [`AxisType`](../guide/types#axistype)
- **必填:** <Base-RequireIcon :isRequire="false" />

##### isForward

- **描述:** 是否正向切割
- **类型:** `boolean`
- **必填:** <Base-RequireIcon :isRequire="false" />
- **默认:** `true`
