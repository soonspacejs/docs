# 模型操作

### 样例：

::: warning 注意
效果不可叠加使用。使用一个效果前，必须先清除上一次效果。
:::

<Docs-Iframe src="modelTool/selectModel.html" />

## edgeShow

显示模型轮廓

### 定义:

```ts
interface EdgeSelectOptions {
  color?: IColor;
  hideColor?: IColor;
  edgeThickness?: number;
  edgeStrength?: number;
}
function edgeShow(object: BaseObject3D | BaseObject3D[], options?: EdgeSelectOptions): Promise<void>;
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
      { prop: 'color', desc: '轮廓颜色', type: 'IColor', require: false, default: '#fff', link: '../guide/types#icolor'},
      { prop: 'hideColor', desc: '被遮挡时的轮廓颜色', type: 'IColor', require: false, default: '#999', link: '../guide/types#icolor' },
      { prop: 'edgeThickness', desc: '轮廓浓度', type: 'number', require: false, default: 3 },
      { prop: 'edgeStrength', desc: '轮廓厚度', type: 'number', require: false, default: 10 },
    ]"
/>

## unEdgeShow

取消模型轮廓

### 定义:

```ts
function unEdgeShow(objects?: BaseObject3D | BaseObject3D[]): Promise<void | void[]>;
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
interface StrokeSelectOptions extends BaseSelectOptions {
  isOpacityShow?: boolean;
  edgeColor?: IColor;
  edgeOpacity?: number;
  modelCache?: boolean;
  firstChild?: boolean;
}

function strokeShow(object: BaseObject3D | BaseObject3D[], options?: StrokeSelectOptions): Promise<void | void[]>;
```

### 用法:

```js
const models = ssp.getAllModel();
ssp.strokeShow(models, {
  edgeOpacity: 0.5,
  isOpacityShow: false,
  firstChild: true,
});
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

[继承自 BaseSelectOptions](../guide/types#baseselectoptions)

<Docs-Table
    :data="[
      { prop: 'isOpacityShow', desc: '是否透明', type: 'boolean', require: false, default: true },
      { prop: 'color', desc: '颜色', type: 'IColor', require: false, default: '0x46ebf7' , link: '../guide/types#icolor'},
      { prop: 'opacity', desc: '透明度', type: 'number', require: false, default: 0.2 },
      { prop: 'edgeColor', desc: '边缘颜色', type: 'IColor', require: false, default: '0x00eeff', link: '../guide/types#icolor' },
      { prop: 'edgeOpacity', desc: '边缘透明度', type: 'number', require: false, default: 1 },
      { prop: 'modelCache', desc: '当传入 Model 时是否缓存计算结果', type: 'boolean', require: false, default: true },
      { prop: 'firstChild', desc: '是否只作用第一个子节点', type: 'boolean', require: false, default: false },
    ]"
/>

::: warning 注意
计算边缘线框比较耗时，建议使用默认的 `modelCache` 减少重复计算。

该选项将使用 Model 的 url 作为缓存 key。
:::

::: tip 提示
由于模型可能存在嵌套结构，要独立计算每个 Model 对象本身时需要开启 `firstChild`，否则将包含所有子节点。
:::

## unStrokeShow

取消模型描边

### 定义:

```ts
function unStrokeShow(objects?: BaseObject3D | BaseObject3D[]): Promise<void | void[]>;
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
interface OpacitySelectOptions extends BaseSelectOptions {

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

[继承自 BaseSelectOptions](../guide/types#baseselectoptions)

<Docs-Table
    :data="[
      { prop: 'color', desc: '颜色', type: 'IColor', require: false, default: '0xffffff' , link: '../guide/types#icolor'},
      { prop: 'opacity', desc: '透明度', type: 'number', require: false, default: 0.2 },
    ]"
/>

## unOpacityShow

取消透明显示模型

### 定义:

```ts
function unOpacityShow(objects?: BaseObject3D | BaseObject3D[]): Promise<void | void[]>;
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
interface HighlightSelectOptions extends BaseSelectOptions {}

function highlightShow(object: BaseObject3D | BaseObject3D[], options?: HighlightSelectOptions): Promise<void | void[]>;
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

- **描述:** 配置选项
- **类型:** HighlightSelectOptions
- **必填:** <Base-RequireIcon :isRequire="false" />

#### HighlightSelectOptions

[继承自 BaseSelectOptions](../guide/types#baseselectoptions)

<Docs-Table
    :data="[
      { prop: 'color', desc: '颜色', type: 'IColor', require: false, default: '0xff0000' , link: '../guide/types#icolor'},
      { prop: 'opacity', desc: '透明度', type: 'number', require: false, default: 1 },
    ]"
/>

## unHighlightShow

取消高亮显示模型

### 定义:

```ts
function unHighlightShow(objects?: BaseObject3D | BaseObject3D[]): Promise<void | void[]>;
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
interface EmissiveSelectOptions extends Omit<BaseSelectOptions, 'opacity'> {
  baseColor?: IColor;
  minOpacity?: number;
  maxOpacity?: number;
  duration?: number;
  yoyo?: boolean;
}

function emissiveShow(object: BaseObject3D | BaseObject3D[], options?: EmissiveSelectOptions): Promise<void | void[]>;
```

### 用法:

```js
ssp.emissiveShow(object, { color: '#f00', maxOpacity: 1, minOpacity: 0, baseColor: '#ff8787' });
```

### 参数:

#### object

- **描述:** 模型对象
- **类型:** BaseObject3D | BaseObject3D[]
- **必填:** <Base-RequireIcon />

#### options

- **描述:** 模型对象
- **类型:** EmissiveSelectOptions
- **必填:** <Base-RequireIcon :isRequire="false" />

#### EmissiveSelectOptions

[继承自 BaseSelectOptions](../guide/types#baseselectoptions)

<Docs-Table
    :data="[
      { prop: 'color', desc: '自发光颜色', type: 'IColor', require: false, default: 'red',  link: '../guide/types#icolor'},
      { prop: 'baseColor', desc: '基础颜色', type: 'IColor', require: false, default: '',  link: '../guide/types#icolor'},
      { prop: 'minOpacity', desc: '动画自发光强度最小值', type: 'number', require: false, default: 0 },
      { prop: 'maxOpacity', desc: '动画自发光强度最大值', type: 'number', require: false, default: 1 },
      { prop: 'duration', desc: '动画周期时长(ms)', type: 'number', require: false, default: 1000 },
      { prop: 'yoyo', desc: '反向播放动画', type: 'boolean', require: false, default: 'false' },
    ]"
/>

## unEmissiveShow

取消自发光显示模型

### 定义:

```ts
function unEmissiveShow(objects?: BaseObject3D | BaseObject3D[]): Promise<void | void[]>;
```

### 用法:

```js
ssp.unEmissiveShow();
```

### 参数:

[同 unEdgeShow](#unedgeshow)
