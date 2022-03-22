# 控制器

`soonspacejs` 的控制器是完全通过 **属性配置** 来约定如何工作的，因此用户可以灵活修改配置来自定义控制器特性。

修改配置的方式一共有三种，推荐使用的优先级为：
- 场景初始配置项 [controls](../guide/config.html#controls)。
- Api: [setControlsOptions](#setcontrolsoptions)。
- 手动修改 `ssp.viewport.controls` 对象上的配置属性默认值。

## setControlsOptions
设置控制器配置

### 样例:

<Docs-Iframe src="controls/setOptions.html" />

### 定义:
```ts
interface ControlsOptions {
  enabled?: boolean;
  enabledMousePointInteractive?: boolean;

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
  }

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

function setControlsOptions(options: ControlsOptions): void;
```

### 用法:

```js
ssp.setControlsOptions({
  enableAutoRotate: true,
  ...
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
      { prop: 'enabled', desc: '启用控制器', type: 'boolean', require: false, default: 'true' },
      { prop: 'enabledMousePointInteractive', desc: '开启鼠标点交互', type: 'boolean', require: false, default: 'true' },
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
      { prop: 'rotateTiltRange', desc: '旋转倾斜范围', type: 'object', require: false, default: {  max: Math.PI, min: 0 } },
      { prop: 'enablePan', desc: '开启移动', type: 'boolean', require: false, default: 'true' },
      { prop: 'enablePanX', desc: '开启屏幕水平移动', type: 'boolean', require: false, default: 'true' },
      { prop: 'enablePanY', desc: '开启屏幕垂直移动', type: 'boolean', require: false, default: 'true' },
      { prop: 'enablePanAxisX', desc: '开启空间 X轴 移动', type: 'boolean', require: false, default: 'true' },
      { prop: 'enablePanAxisY', desc: '开启空间 Y轴 移动', type: 'boolean', require: false, default: 'true' },
      { prop: 'enablePanAxisZ', desc: '开启空间 Z轴 移动', type: 'boolean', require: false, default: 'true' },
      { prop: 'enableAutoRotate', desc: '开启自动旋转', type: 'boolean', require: false, default: 'true' },
      { prop: 'panSpeed', desc: '移动速度', type: 'number', require: false, default: '2' },
      { prop: 'autoRotateSpeed', desc: '自动旋转速度', type: 'number', require: false, default: 1 },
      { prop: 'autoRotateClockwise', desc: '自动旋转顺时针', type: 'boolean', require: false, default: 'true' },



    ]"
/>
