# 模型操作

## edgeShow

显示模型轮廓

### 定义:

```ts
interface EdgeSelectOptions {
  color?: IColor;
  hideColor?: IColor;
  edgeThickness?: number;
  edgeStrength?: number;
  pulsePeriod?: number;
}

function edgeShow(
  object: BaseObject3D | BaseObject3D[],
  options?: EdgeSelectOptions
): Promise<void>;
```

### 用法:

```js
ssp.edgeShow(object, {
  color: 0xff6600,
});
```

### 参数:

#### object

- **描述:** 模型对象
- **类型:** BaseObject3D | BaseObject3D[]
- **必填:** <Base-RequireIcon />

#### options

- **描述:** 配置选项
- **类型:** EdgeSelectOptions
- **必填:** <Base-RequireIcon :isRequire="false" />

#### EdgeSelectOptions

<Docs-Table
    :data="[
      { prop: 'color', desc: '轮廓颜色', type: 'IColor', require: false, default: '#fff', link: '../guide/types.html#icolor'},
      { prop: 'hideColor', desc: '被遮挡时的轮廓颜色', type: 'IColor', require: false, default: '#999', link: '../guide/types.html#icolor' },
      { prop: 'edgeThickness', desc: '轮廓浓度', type: 'number', require: false, default: 3 },
      { prop: 'edgeStrength', desc: '轮廓厚度', type: 'number', require: false, default: 10 },
      { prop: 'pulsePeriod', desc: '脉冲周期', type: 'number', require: false, default: 0 },
    ]"
/>

## unEdgeShow

取消模型轮廓

### 定义:

```ts
function unEdgeShow(
  objects?: BaseObject3D | BaseObject3D[]
): Promise<void | void[]>;
```

### 用法:

```js
ssp.unEdgeShow();
```

### 参数:

#### object

- **描述:** 如没有传参, 将取消整个场景内所有模型的轮廓
- **类型:** BaseObject3D | BaseObject3D[]
- **必填:** <Base-RequireIcon :isRequire="false" />

## strokeShow

显示模型描边

### 定义:

```ts
interface StrokeSelectOptions {
  isOpacityShow: boolean;
  color: IColor;
  opacity: number;
  edgeColor: IColor;
  edgeOpacity: number;
}

function strokeShow(
  object: BaseObject3D | BaseObject3D[],
  options?: StrokeSelectOptions
): Promise<void | void[]>;
```

### 用法:

```js
ssp.strokeShow(object);
```

### 参数:

#### object

- **描述:** 模型对象
- **类型:** BaseObject3D | BaseObject3D[]
- **必填:** <Base-RequireIcon />

#### options

- **描述:** 配置选项
- **类型:** StrokeSelectOptions
- **必填:** <Base-RequireIcon :isRequire="false" />

#### StrokeSelectOptions

<Docs-Table
    :data="[
      { prop: 'isOpacityShow', desc: '是否透明', type: 'boolean', require: false, default: true },
      { prop: 'color', desc: '颜色', type: 'IColor', require: false, default: '0x46ebf7' , link: '../guide/types.html#icolor'},
      { prop: 'opacity', desc: '透明度', type: 'number', require: false, default: 0.2 },
      { prop: 'edgeColor', desc: '边缘颜色', type: 'IColor', require: false, default: '0x00eeff', link: '../guide/types.html#icolor' },
      { prop: 'edgeOpacity', desc: '边缘透明度', type: 'number', require: false, default: 1 },
    ]"
/>

## unStrokeShow

取消模型描边

### 定义:

```ts
function unStrokeShow(
  objects?: BaseObject3D | BaseObject3D[]
): Promise<void | void[]>;
```

### 用法:

```js
ssp.unStrokeShow();
```

### 参数:

[同 unEdgeShow](#unedgeshow)

## opacityShow

透明显示模型

### 定义:

```ts
interface OpacitySelectOptions {
    color?: IColor;
    opacity?: number;
}

opacityShow(object: BaseObject3D | BaseObject3D[], options?: OpacitySelectOptions): Promise<void | void[]>;
```

### 用法:

```js
ssp.opacityShow(object, {
  color: 0xff6600,
});
```

### 参数:

#### object

- **描述:** 模型对象
- **类型:** BaseObject3D | BaseObject3D[]
- **必填:** <Base-RequireIcon />

#### options

- **描述:** 配置选项
- **类型:** OpacitySelectOptions
- **必填:** <Base-RequireIcon :isRequire="false" />

#### OpacitySelectOptions

<Docs-Table
    :data="[
      { prop: 'color', desc: '颜色', type: 'IColor', require: false, default: '0x46ebf7' , link: '../guide/types.html#icolor'},
      { prop: 'opacity', desc: '透明度', type: 'number', require: false, default: 0.2 },
    ]"
/>

## unOpacityShow

取消透明显示模型

### 定义:

```ts
function unOpacityShow(
  objects?: BaseObject3D | BaseObject3D[]
): Promise<void | void[]>;
```

### 用法:

```js
ssp.unOpacityShow();
```

### 参数:

[同 unEdgeShow](#unedgeshow)

## highlightShow

高亮显示模型

### 定义:

```ts
interface HighlightSelectOptions extends OpacitySelectOptions {}

function highlightShow(
  object: BaseObject3D | BaseObject3D[],
  options?: HighlightSelectOptions
): Promise<void | void[]>;
```

### 用法:

```js
ssp.highlightShow(object, { color: 0xff6600 });
```

### 参数:

#### object

- **描述:** 模型对象
- **类型:** BaseObject3D | BaseObject3D[]
- **必填:** <Base-RequireIcon />

#### options

- **描述:** options
- **类型:** [继承自 OpacitySelectOptions](#opacityselectoptions)
- **必填:** <Base-RequireIcon :isRequire="false" />

## unHighlightShow

取消高亮显示模型

### 定义:

```ts
function unHighlightShow(
  objects?: BaseObject3D | BaseObject3D[]
): Promise<void | void[]>;
```

### 用法:

```js
ssp.unHighlightShow();
```

### 参数:

[同 unEdgeShow](#unedgeshow)

## emissiveShow

自发光显示模型

### 定义:

```ts
interface EmissiveSelectOptions extends OpacitySelectOptions {
  isAnimation?: boolean;
  minOpacity?: number;
  maxOpacity?: number;
}

function emissiveShow(
  object: BaseObject3D | BaseObject3D[],
  options?: EmissiveSelectOptions
): Promise<void | void[]>;
```

### 用法:

```js
ssp.emissiveShow(object);
```

### 参数:

#### object

- **描述:** 模型对象
- **类型:** BaseObject3D | BaseObject3D[]
- **必填:** <Base-RequireIcon />

#### options

- **描述:** 模型对象
- **类型:** options
- **必填:** <Base-RequireIcon />

#### options

继承自[OpacitySelectOptions](#opacityselectoptions)
<Docs-Table
    :data="[
      { prop: 'isAnimation', desc: '是否启用闪烁动画', type: 'boolean', require: false, default: 'true' },
      { prop: 'minOpacity', desc: '动画透明度初始值', type: 'number', require: false, default: 0 },
      { prop: 'maxOpacity', desc: '动画透明度最终值', type: 'number', require: false, default: 1 },
      { prop: 'color', desc: '颜色', type: 'IColor', require: false, default: 'red',  link: '../guide/types.html#icolor'},
      { prop: 'opacity', desc: '透明度', type: 'number', require: false, default: 0.3 },
    ]"
/>

## unEmissiveShow

取消自发光显示模型

### 定义:

```ts
function unEmissiveShow(
  objects?: BaseObject3D | BaseObject3D[]
): Promise<void | void[]>;
```

### 用法:

```js
ssp.unEmissiveShow();
```

### 参数:

[同 unEdgeShow](#unedgeshow)

## modelClipping

模型切割

### 定义:

```ts
interface ClippingOptions {
  axis: AxisType;
  clipPoint: number;
  isForward: boolean;
}

function modelClipping(model: BaseObject3D, options: ClippingOptions): void;
```

### 用法:

```js
ssp.modelClipping(model, { axis: 'x', clipPoint: 200, isForward: true });
```

#### 参数:

#### model

- **描述:** 模型对象
- **类型:** BaseObject3D
- **必填:** <Base-RequireIcon />

#### options

- **描述:** 配置选项
- **类型:** options
- **必填:** <Base-RequireIcon />

#### options

<Docs-Table
    :data="[
      { prop: 'axis', desc: '要切割的轴', type: 'AxisType', require: false, default: 'x', link: '/guide/types.html#axistype'},
      { prop: 'clipPoint', desc: '切割点, 超出部分会被切除', type: 'number', require: false, default: 0 },
      { prop: 'isForward', desc: '是否正轴, 否则切割负轴', type: 'boolean', require: false, default: 'true' },
    ]"
/>

## changeModelClipping

## removeModelClipping

移除模型切割, 还原模型状态

### 定义:

```ts
function removeModelClipping(model: BaseObject3D, axis: AxisType): void;
```

### 用法:

```js
ssp.removeModelClipping(model, 'x');
```

### 参数:

#### model

- **描述:** 模型对象
- **类型:** BaseObject3D
- **必填:** <Base-RequireIcon />

#### axis

- **描述:** 配置选项
- **类型:** [AxisType](/guide/types.html#axistype)
- **必填:** <Base-RequireIcon />
