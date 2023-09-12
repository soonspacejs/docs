# 控制器（废弃）

`soonspacejs` 的控制器是完全通过 **属性配置** 来约定如何工作的，因此用户可以灵活修改配置来自定义控制器特性。

修改配置的方式共有两种

- 场景初始配置项 [controls](../guide/config.html#controls)。
- Api: [setControlsOptions](#setcontrolsoptions)。

::: tip 提示
`v2.5.0` 之后控制器新增了 `type` 属性用于切换不同类型的控制器
:::

## setControlsOptions

设置控制器配置

### 样例:

<Docs-Iframe src="controls/setOptions.html" />

### 定义:

```ts
type FreeControlsType = 'free';

type OrbitControlsType = 'orbit';

interface FreeControlsOptions {
  type: FreeControlsType;

  enabled?: boolean;
  enabledMousePointInteractive?: boolean;

  fallbackInteractivePosition?: Vector3 | null;

  enableZoom?: boolean;
  zoomSpeed?: number;
  zoomMinDistance?: number;
  zoomMaxDistance?: number;
  zoomMinStepDistance?: number;
  zoomMaxStepDistance?: number;

  enableRotate?: boolean;
  enableRotateX?: boolean;
  enableRotateY?: boolean;
  rotateSpeed?: number;
  rotateTiltRange?: {
    max: number;
    min: number;
  };

  enableAutoRotate?: boolean;
  autoRotateSpeed?: number;
  autoRotateClockwise?: boolean;

  enableOutOfScene?: boolean;
  unOffsetOfScene?: number;

  enablePan?: boolean;
  enablePanX?: boolean;
  enablePanY?: boolean;
  enablePanAxisX?: boolean;
  enablePanAxisY?: boolean;
  enablePanAxisZ?: boolean;
  panSpeed?: number;
}

interface OrbitControlsOptions {
  type: OrbitControlsType;

  enableAutoRotate?: boolean;
  autoRotateSpeed?: number;

  dampingFactor?: number;

  enabled?: boolean;
  enableDamping?: boolean;
  enablePan?: boolean;
  enableRotate?: boolean;
  enableZoom?: boolean;

  maxAzimuthAngle?: number;
  maxDistance?: number;
  maxPolarAngle?: number;
  maxZoom?: number;

  minAzimuthAngle?: number;
  minDistance?: number;
  minPolarAngle?: number;
  minZoom?: number;

  panSpeed?: number;
  rotateSpeed?: number;

  screenSpacePanning?: boolean;

  target?: Vector3;

  zoomSpeed?: number;
}

type ControlsOptions = FreeControlsOptions | OrbitControlsOptions;

function setControlsOptions(options: ControlsOptions): void;
```

### 用法:

```js
ssp.setControlsOptions({
  type: 'orbit',
  enableDamping: true,
});
```

### 参数:

#### options

- **描述:** 模型对象
- **类型:** [ControlsOptions](#controlsoptions)
- **必填:** <Base-RequireIcon />

##### ControlsOptions

<Docs-Table
:data="[
{ prop: 'type', desc: '控制器类型', type: 'free | orbit', require: true, default: 'free' },
]"
/>

##### FreeControlsOptions

<Docs-Table
:data="[
{ prop: 'enabled', desc: '启用控制器', type: 'boolean', require: false, default: 'true' },
{ prop: 'enabledMousePointInteractive', desc: '开启鼠标对象相交检测', type: 'boolean', require: false, default: 'true' },
{ prop: 'fallbackInteractivePosition', desc: '开启鼠标对象相交检测时，没有相交对象的备用点', type: 'Vector3', require: false, default: '{x:0,y:0,z:0}' },
{ prop: 'enableZoom', desc: '开启缩放', type: 'boolean', require: false, default: 'true' },
{ prop: 'zoomSpeed', desc: '缩放速度', type: 'number', require: false, default: 1 },
{ prop: 'zoomMinDistance', desc: '缩放最小距离', type: 'number', require: false, default: 50 },
{ prop: 'zoomMaxDistance', desc: '缩放最大距离', type: 'number', require: false, default: 100000 },
{ prop: 'zoomMinStepDistance', desc: '单步缩放最小距离', type: 'number', require: false, default: 5 },
{ prop: 'zoomMaxStepDistance', desc: '单步缩放最大距离', type: 'number', require: false, default: 20000 },
{ prop: 'enableRotate', desc: '开启旋转', type: 'boolean', require: false, default: 'true' },
{ prop: 'enableRotateX', desc: '开启屏幕水平旋转', type: 'boolean', require: false, default: 'true' },
{ prop: 'enableRotateY', desc: '开启屏幕垂直旋转', type: 'boolean', require: false, default: 'true' },
{ prop: 'rotateSpeed', desc: '旋转速度', type: 'number', require: false, default: 1 },
{ prop: 'rotateTiltRange', desc: '旋转倾斜范围', type: 'object', require: false, default: { max: Math.PI, min: 0 } },
{ prop: 'enablePan', desc: '开启移动', type: 'boolean', require: false, default: 'true' },
{ prop: 'enablePanX', desc: '开启屏幕水平移动', type: 'boolean', require: false, default: 'true' },
{ prop: 'enablePanY', desc: '开启屏幕垂直移动', type: 'boolean', require: false, default: 'true' },
{ prop: 'enablePanAxisX', desc: '开启空间 X 轴 移动', type: 'boolean', require: false, default: 'true' },
{ prop: 'enablePanAxisY', desc: '开启空间 Y 轴 移动', type: 'boolean', require: false, default: 'true' },
{ prop: 'enablePanAxisZ', desc: '开启空间 Z 轴 移动', type: 'boolean', require: false, default: 'true' },
{ prop: 'enableAutoRotate', desc: '开启自动旋转', type: 'boolean', require: false, default: 'false' },
{ prop: 'panSpeed', desc: '移动速度', type: 'number', require: false, default: '2' },
{ prop: 'autoRotateSpeed', desc: '自动旋转速度', type: 'number', require: false, default: 1 },
{ prop: 'autoRotateClockwise', desc: '自动旋转顺时针', type: 'boolean', require: false, default: 'true' },
]"

/>

##### OrbitControlsOptions

<Docs-Table
:data="[
{ prop: 'enabled', desc: '启用控制器', type: 'boolean', require: false, default: 'true' },
{ prop: 'enableAutoRotate', desc: '开启自动旋转', type: 'boolean', require: false, default: 'false' },
{ prop: 'autoRotateSpeed', desc: '自动旋转速度', type: 'number', require: false, default: '1' },
{ prop: 'dampingFactor', desc: '阻尼系数', type: 'number', require: false, default: '0.05' },
{ prop: 'enableDamping', desc: '启用阻尼效果', type: 'boolean', require: false, default: 'false' },
{ prop: 'enablePan', desc: '开启移动', type: 'boolean', require: false, default: 'true' },
{ prop: 'enableRotate', desc: '开启旋转', type: 'boolean', require: false, default: 'true' },
{ prop: 'enableZoom', desc: '开启缩放', type: 'boolean', require: false, default: 'true' },
{ prop: 'maxAzimuthAngle', desc: '最大水平角度', type: 'number', require: false, default: 'Infinity' },
{ prop: 'minAzimuthAngle', desc: '最小水平角度', type: 'number', require: false, default: '-Infinity' },
{ prop: 'maxDistance', desc: '最远滚动距离', type: 'number', require: false, default: 'Infinity' },
{ prop: 'minDistance', desc: '最小滚动距离', type: 'number', require: false, default: '0' },
{ prop: 'maxPolarAngle', desc: '最大垂直角度', type: 'number', require: false, default: 'Math.PI' },
{ prop: 'minPolarAngle', desc: '最小垂直角度', type: 'number', require: false, default: '0' },
{ prop: 'maxZoom', desc: '最大缩放距离（适用于正交相机）', type: 'number', require: false, default: 'Infinity' },
{ prop: 'minZoom', desc: '最小缩放距离（适用于正交相机）', type: 'number', require: false, default: '0' },
{ prop: 'panSpeed', desc: '移动速度', type: 'number', require: false, default: '1' },
{ prop: 'rotateSpeed', desc: '旋转速度', type: 'number', require: false, default: '1' },
{ prop: 'zoomSpeed', desc: '缩放速度', type: 'number', require: false, default: '1' },
{ prop: 'screenSpacePanning', desc: '上下拖动时，相机垂直还是相对于 y 轴正交移动', type: 'boolean', require: false, default: 'true' },
{ prop: 'target', desc: '控制器内部维护的相机的朝向点，也可以手动设置。', type: 'Vector3', require: false, default: '{x:0,y:0,z:0}' },
]"
/>

::: warning 注意
在使用 `orbit` 控制器时，相机的 `rotation` 无法直接修改。

请通过设置 `target` 来控制相机的 `rotation`
:::
