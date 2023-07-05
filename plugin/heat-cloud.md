---
sidebarDepth: 2
---

# plugin-heat-cloud

![beta](https://img.shields.io/npm/v/@soonspacejs/plugin-heat-cloud/latest.svg)

热力云

## 安装

```bash
npm install @soonspacejs/plugin-heat-cloud -S
# or
yarn add @soonspacejs/plugin-heat-cloud -S
```

## 使用方法

```ts {2,10}
import SoonSpace from "soonspacejs";
import HeatCloudPlugin from "@soonspacejs/plugin-heat-cloud";

const ssp = new SoonSpace({
  el: "#view",
  options: {},
  events: {},
});

const heatCloudPlugin = ssp.registerPlugin(HeatCloudPlugin, "heatCloudPlugin");
```

## 属性

### defaultGradientVolumeMaterialOptions

用于 `createHeatCloud` 、`createLineHeat` 的默认选项,**可在调用 `createHeatCloud` 、`createLineHeat`前进行修改**

#### 默认值

```ts
defaultGradientVolumeMaterialOptions: GradientVolumeMaterialOptions = {
  fit: VolumeFit.Raw,
  accFactor: 2,
  depthTest: false,
  side: BackSide,
  discardOut: false,
  // 数值的梯度映射纹理
  gradient: createLinearGradientTexture(this.defaultColorGradient),
};
```

#### 使用

修改默认值

```ts{2-6}
const heatCloudPlugin = ssp.registerPlugin(HeatCloudPlugin, "heatCloudPlugin");
heatCloudPlugin.defaultGradientVolumeMaterialOptions = {
  ...heatCloudPlugin.defaultGradientVolumeMaterialOptions,
  fit: VolumeFit.Fit,
  accFactor: 1,
};
```

### defaultColorGradient

用于使用`createLinearGradientTexture` 创建`defaultGradientVolumeMaterialOptions.gradient`,**可在调用 `createHeatCloud` 、`createLineHeat`前进行修改**

::: tip 用于使用 createLinearGradientTexture 创建 defaultGradientVolumeMaterialOptions.gradient

```ts
defaultGradientVolumeMaterialOptions.gradient = createLinearGradientTexture(
  defaultColorGradient
);
```

:::

#### 默认值

```ts
defaultColorGradient: ColorGradient = [
  [0, "rgba(0,255,0,0)"],
  [0.5, "rgba(64,255,255,0.5)"],
  [1, "rgba(255,64,255,1)"],
];
```

#### 使用

修改默认值

```ts
const heatCloudPlugin = ssp.registerPlugin(HeatCloudPlugin, "heatCloudPlugin");
heatCloudPlugin.defaultColorGradient = [
  [0, "rgba(0,255,0,0)"],
  [0.5, "rgba(255,255,64,0.5)"],
  [1, "rgba(255,64,255,1)"],
];
```

## 方法

### createHeatCloud

创建随机热力云

#### 样例

<Docs-Iframe  src="plugin/heatCloud/createHeatCloud.html" />

#### 定义

```ts
createHeatCloud(points: HeatParticleVolumeFeaturePoint[], options?: CreateHeatCloudOptions): VolumeMesh
```

```ts
type HeatParticleVolumeFeaturePoint = HeatParticleVolumeFeature & IVector3;
/**
 * 热力粒子体积特性
 */
interface HeatParticleVolumeFeature extends SphereParticleVolumeFeature {
  /**
   * 值累积函数
   * @remarks
   * 当某一个点处理多个热力球区域内时，需要考虑多个热力球在该点的累积效果，通过该函数来获取最终的累积结果
   * @defaultValue valuesAccumulate_Default
   */
  valuesAccumulate?: HeatValuesAccumulate;
}

interface SphereParticleVolumeFeature extends ParticleVolumeFeature {
  /**
   * 映射区间
   * @remarks
   * x 为最小值，y 为最大值
   *
   * @defaultValue {x:0,y:100}
   */
  clim?: IVector2;
  /**
   * 值梯度函数
   */
  valueGradient?: GetGradientValue;
}
/**
 * 粒子体积特征
 */
interface ParticleVolumeFeature extends VolumeFeature {
  /**
   * 空心因子
   *
   * @defaultValue 0
   */
  hollow?: number;
}
/**
 * 体积特征
 */
interface VolumeFeature {
  /**
   * 半径
   *
   * @defaultValue 10
   */
  radius?: number;
  /**
   * 值
   *
   * @defaultValue 100
   */
  value?: number;
}
/**
 * 热力值累积函数
 * @remarks
 * 当某一个点处理多个热力球区域内时，需要考虑多个热力球在该点的累积效果，通过该函数来获取最终的累积结果
 * @param values - 值的信息列表
 * @param clim - 默认的映射区间
 * @returns 累积后的最终值
 */
type HeatValuesAccumulate = (
  values: HeatAccumulateValue[],
  clim: IVector2
) => number;
type HeatAccumulateValue = Required<
  Omit<SphereParticleVolumeFeature, "valueGradient">
> &
  GradientParams;
/**
 * 值梯度函数
 * @remarks
 * 会通过该函数来获取在中心点及其半径范围内各点处的值
 * @param params - 梯度参数；包含了当前点处的相关信息
 * @returns 返回最终的值
 */
type GetGradientValue = (params: GradientParams) => number;
/**
 * 梯度函数的参数
 */
interface GradientParams {
  /**
   * 梯度的变化比率
   * @remarks
   * 一般是当前点与其所属中心点的距离和中心点半径的比率
   */
  ratio: number;
  /**
   * 当前中心点的半径
   */
  radius: number;
  /**
   * 当前中心点空心比率
   */
  hollow: number;
  /**
   * 根据空间比率计算的空心半径
   */
  hollowRadius: number;
  /**
   * 当前点与其所属中心点的距离
   */
  distance: number;
  /**
   * 值
   */
  value: number;
  /**
   * 值的范围
   */
  clim: IVector2;
  /**
   * 当前点的坐标
   */
  point: Vector3;
}
```

```ts
type CreateHeatCloudOptions = HeatDataOptions & GradientOptions;
```

```ts
/**
 * 创建热力3D数据的选项
 */
interface HeatDataOptions {
  /**
   * 值
   *
   * @defaultValue 100
   */
  value?: number;
  /**
   * 半径
   *
   * @defaultValue 10
   */
  radius?: number;
  /**
   * 空心因子
   *
   * @defaultValue 0
   */
  hollow?: number;
  /**
   * 值累积函数
   * @remarks
   * 当某一个点处理多个热力球区域内时，需要考虑多个热力球在该点的累积效果，通过该函数来获取最终的累积结果
   * @defaultValue valuesAccumulate_Default
   */
  valuesAccumulate?: HeatValuesAccumulate;
  /**
   * 映射区间
   * @remarks
   * x 为最小值，y 为最大值
   *
   * @defaultValue {x:0,y:100}
   */
  clim?: IVector2;
  /**
   * 值梯度函数
   */
  valueGradient?: GetGradientValue;
  /**
   * Data3D 的尺寸
   * @defaultValue 从原点到  points 的AABB包围盒最大点的空间尺寸
   */
  size?: IVector3 | null;
}
```

```ts
type GradientOptions = GradientOptionsOptimizeOptions &
  CreateGradientData3DTextureOptions &
  GradientVolumeMaterialOptions;

/**
 * 优化选项
 */
interface GradientOptionsOptimizeOptions {
  /**
   * 指定优化后的梯度选项的所能达到的最大尺寸
   * @remarks
   * 会对原来的梯度选项进行等比缩放以达到该尺寸；
   *
   * 如果同时指定 maxSize 和 scale ，则优先使用 scale
   * @defaultValue 100
   */
  maxSize?: number;
  /**
   * 缩放系数
   * @remarks
   * 对原梯度选项进行缩放；
   *
   * 优先级高于 maxSize
   */
  scale?: number;
}
interface CreateGradientData3DTextureOptions {
  /**
   * 表示为空的值
   * @remarks
   * 在转换时 IData3D 时，当遇到值为 undefined 或 null 的值时，就会使 voidValue 来替换；
   *
   * IData3D 中，可以通过 undefined 或 null 来表示空，但在将 IData3D 转为 Data3DTexture 时，所有的item都必须是数字，所以这时就需要为空约定一个数字；
   *
   * @defaultValue 0
   */
  voidValue?: number;
  /**
   * 3D数据中包含的数值是否是 uint8 类型的
   * @defaultValue false
   */
  uint8?: boolean;
}
/**
 * 梯度体积材质选项
 */
interface GradientVolumeMaterialOptions
  extends VolumeMaterialOptions<GradientData3DTexture>,
    GradientData3DOptions {
  /**
   * 数值的梯度映射纹理
   */
  gradient?: GradientTextureOptions | null;
}

type GradientTextureOptions = Texture | string | ColorGradient;

/**
 * 颜色断点
 * @remarks
 * number 的范围是 0-1，表示断点的位置；
 *
 * string 表示颜色，支持 css 所支持的所有颜色格式；
 */
type ColorStop = [number, string];
/**
 * 颜色梯度，颜色断点列表
 * @remarks
 * 颜色断点可以不按顺序排列
 */
type ColorGradient = ColorStop[];
/**
 * 体积材质的选项
 */
interface VolumeMaterialOptions<GradientData3DTexture>
  extends Omit<ShaderMaterialParameters, "map" | "opacity"> {
  /**
   * 三维的纹理
   */
  map?: GradientData3DTexture | null;
  /**
   * 渲染体积材质的容器的最小点
   * @remarks
   * 容器的最小点和最大点一般是被设置成 geometry 的AABB包围盒；但也可以不是
   * 总之，体积材质的渲染依托于 geometry 的形状，它不会超出 geometry 的尺寸；
   * 但可以控制容器的最小点和最大点来控制体积材质的渲染尺寸；
   * @defaultValue {x:0,y:0,z:0}
   */
  containerMin?: IVector3 | null;
  /**
   * 渲染体积材质的容器的最大点
   * @remarks
   * 容器的最小点和最大点一般是被设置成 geometry 的AABB包围盒；但也可以不是
   * 总之，体积材质的渲染依托于 geometry 的形状，它不会超出 geometry 的尺寸；
   * 但可以控制容器的最小点和最大点来控制体积材质的渲染尺寸；
   * @defaultValue map尺寸中的最大点
   */
  containerMax?: IVector3 | null;
  /**
   * 体积材质在容器内的填充模式
   * @defaultValue VolumeFit.Fill
   */
  fit?: VolumeFit | null;
  /**
   * Mesh三角形的渲染面
   * @remarks
   * 可设置为前面、后面、或者两面都渲染
   * 如果只渲染前面，进入体积材质内部，体积材质就会消失
   * 如果只渲染后面，体积初遮挡，就会消失
   * 如果两面都渲染，则会隐藏看到容器的面
   */
  side?: Side | undefined;
  /**
   * 透明度
   * @remarks
   * 决定整体的透明度
   * @defaultValue 1
   */
  opacity?: number | null;
  /**
   * 有效透明度的取值范围
   * @remarks
   * 如果最终颜色的透明度小于或等于 alphaRange.x ，则被认为是完全透明
   * 如果最终颜色的透明度在于或等于 alphaRange.y ，则被认为是完全不透明
   * 取值范围应当在 0 - 1
   * @defaultValue {x:0,y:0.95}
   */
  alphaRange?: IVector2 | null;
  /**
   * 是否开启雾化的效果
   * @remarks
   * 开启后的渲染效果会更像雾
   * @defaultValue true
   */
  atomize?: boolean | null;
  /**
   * 体积材质渲染的采样数
   * @remarks
   * 采样数越高，占用的GPU资源就越大；所以该数据设置的适宜最好；
   * @defaultValue 100
   */
  steps?: number | null;
  /**
   * 颜色累积系数
   * @remarks
   * 它是对体积材质进行积分时使用的系数；只在开启雾化效果{@link VolumeMaterial.atomize}时才有效；
   * 值越小，最终呈现出的效果就越雾化；
   * @defaultValue 1
   */
  accFactor?: number | null;
}
/**
 * 梯度 Data3D 选项
 */
interface GradientData3DOptions {
  /**
   * 数值的映射区间
   * @remarks
   * x 为最小值，y 为最大值
   *
   * @defaultValue {x:0,y:100}
   */
  range?: IVector2 | null;
  /**
   * 是否丢弃超出映射范围的数值
   * @remarks
   * 当数值超出映射区间 {@link GradientData3DOptions.range}  时，是否丢弃；
   *
   * 包含左右边界值
   * @defaultValue false
   */
  discardOut?: boolean | null;
  /**
   * 空值的范围
   * @remarks
   * 当数值在此范围中时，会被认为是空的值，渲染时会被丢弃
   *
   * 包含左右边界值
   *
   * @defaultValue {x:-100,y:-1}
   */
  voidRange?: IVector2 | null;
}

/**
 * 体积材质填充模式
 */
declare enum VolumeFit {
  /**
   * 填充
   * @remarks
   * 材质会充满容器
   */
  Fill = 0,
  /**
   * 对齐
   * @remarks
   * 材质会从容器的最小点开始绘制，但不会充满容器
   */
  Align = 1,
  /**
   * 原始
   * @remarks
   * 材质会从容器空间中的坐标原点开始绘制，也不会充满容器
   */
  Raw = 2,
}
```

```ts
/**
 * 体积Mesh
 * @remarks
 * 专用用于体积材质；
 *
 * 体积材质也可以用于普通的 Mesh；但如果使用 VolumeMesh ，则可以减少很多体积材质 和 geometry 同步操作；
 */
declare class VolumeMesh extends Mesh {
  readonly isVolumeMesh = true;
  constructor(material: VolumeMaterial);
  protected _geometry: BufferGeometry;
  /**
   * 是否自动更新材质
   * @remarks
   * 当启动该选项后，在 VolumeMesh 监测到 geometry 变更时，会自动更新体积材质的相关选项，以适应新的 geometry
   * @defaultValue true
   */
  autoUpdateMaterial: boolean;
  material: VolumeMaterial;
  protected _material: VolumeMaterial;
  /**
   * 是否自动更新几何体
   * @remarks
   * 当启动该选项后，在 VolumeMesh 监测到 material 变更时，会自动更新 geometry 的相关选项，以适应新的 体积材质
   * @defaultValue true
   */
  autoUpdateGeometry: boolean;
  /**
   * 更新材质
   * @remarks
   * 更新体积材质的相关选项以使其匹配 geometry
   */
  updateMaterial(): false | undefined;
  /**
   * 更新几何体
   * @remarks
   * 更新 geometry 的相关选项以使其匹配体积材质
   */
  updateGeometry(): false | undefined;
  /**
   * 自动规范化
   * @remarks
   * 开启该选项，设置新的 geometry 时，对 geometry 自动执行规范化操作
   */
  autoNormalize: boolean;
  /**
   * 规范化
   * @remarks
   * 将 geometry 的原点移动到包围盒的最小点处
   */
  normalize(): void;
  /**
   * 将材质空间下的坐标转为 map 空间下的坐标
   * @param coord - 材质空间下的坐标
   * @returns
   */
  toMapPosition(coord: IVector3): Vector3;
  /**
   * 将世界坐标系下的深度转为 material 空间下的深度
   * @param axis - 材质空间下的坐标轴
   * @param depth - 深度
   * @returns
   */
  toMaterialDepth(axis: Axis, depth: number): number;
  /**
   * 将世界坐标系下的深度转为 map 空间下的深度
   * @param axis - map空间下的坐标轴
   * @param depth - 深度
   * @returns
   */
  toMapDepth(axis: Axis, depth: number): number;
  /**
   * 获取3D数据的切片
   * @remarks
   * 切片就是指定轴的指定位置的垂直截面；
   * 轴和深度都是局部坐标系下的
   * @param axis - map空间下的坐标轴
   * @param depth - 世界空间下在轴方向上的坐标值
   * @returns
   */
  getData3DSlice(axis: Axis, depth: number): IData2D<number> | null;
  /**
   * 获取3D数据中指定坐标处的数据项目
   * @param coord - 世界坐标系下的坐标
   * @returns
   */
  getItem(coord: IVector3): number[] | null;
}
/**
 * Data2D 类型
 */
interface IData2D<D = number> {
  data: ArrayLike<D>;
  size: IVector2;
}
```

#### 使用

```ts{23,24-37}
const ssp = new SoonSpace({
  el: "#viewA",
  options: {
    showInfo: true,
    showGrid: false,
    background: {
      color: new Color(0x444444),
    },
  },
  events: {
    selectPosition: console.log,
    modelClick: console.log,
  },
});
const pointCount = 60;
const randomPoints = Array.from({ length: pointCount }, () => ({
  x: Math.random() * 90,
  y: Math.random() * 30,
  z: Math.random() * 60,
  value: Math.random() * 50,
  radius: Math.random() * 30,
}));
// const mesh = heatCloudPlugin.createHeatCloud(randomPoints）;
const mesh = heatCloudPlugin.createHeatCloud(randomPoints, {
  range: { x: 0, y: 50 },
  voidRange: { x: -100, y: -50 },
  size: { x: 90, y: 30, z: 60 },
  steps: 100,
  opacity: 1,
  accFactor: 2,
  depthTest: false,
  // side: BackSide,
  side: FrontSide,

  discardOut: false,
  fit: VolumeFit.Fill,
});
```

#### 参数

#### points

:::tip
`points`中与`options`相同的属性，`points`优先级 **高于** `options`
:::

- **描述:** 热力点
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** `HeatParticleVolumeFeaturePoint[]`

##### HeatParticleVolumeFeaturePoint

<Docs-Table
:data="[
{
prop: 'x', desc: 'x', type: 'number', require: true, default: ''
},
{
prop: 'y', desc: 'y', type: 'number', require: true, default: ''
},
{
prop: 'z', desc: 'z', type: 'number', require: true, default: ''
},
{
prop: 'value', desc: '值', type: 'number', require: false, default: '100'
},
{
prop: 'radius', desc: '半径', type: 'number', require: false, default: '10'
},
{
prop: 'hollow', desc: '空心因子', type: 'number', require: false, default: '0'
},
{
prop: 'clim', desc: '映射区间', type: 'IVector2', require: false, default: '{x:0,y:100}'
},
{
prop: 'valueGradient', desc: '值梯度函数', type: 'GetGradientValue', require: false, default: ''
},
{
prop: 'valuesAccumulate', desc: '热力值累积函数', type: 'HeatValuesAccumulate', require: false, default: '线性累积函数'
},

]"

/>

##### options

- **描述:** 配置
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** `CreateHeatCloudOptions`

<Docs-Table
:data="[
{
prop: 'value', desc: '值', type: 'number', require: false, default: '100'
},
{
prop: 'radius', desc: '半径', type: 'number', require: false, default: '10'
},
{
prop: 'hollow', desc: '空心因子', type: 'number', require: false, default: '0'
},
{
prop: 'clim', desc: '映射区间', type: 'IVector2', require: false, default: '{x:0,y:100}'
},
{
prop: 'valueGradient', desc: '值梯度函数', type: 'GetGradientValue', require: false, default: ''
},
{
prop: 'valuesAccumulate', desc: '热力值累积函数', type: 'HeatValuesAccumulate', require: false, default: '线性累积函数'
},

{
prop: 'maxSize', desc: '优化后的梯度选项的所能达到的最大尺寸', type: 'number', require: false, default: '100'
},
{
prop: 'scale', desc: '缩放系数', type: 'number', require: false, default: ''
},
{
prop: 'voidValue', desc: '空值', type: 'number', require: false, default: '0'
},
{
prop: 'uint8', desc: '是否是 uint8 类型', type: 'boolean', require: false, default: 'false'
},
{
prop: 'gradient', desc: '梯度映射纹理', type: 'GradientTextureOptions', require: false, default: 'gradientTexture 如下 '
},
{
prop: 'map', desc: '三维的纹理', type: 'GradientData3DTexture', require: false, default: ''
},
{
prop: 'containerMin', desc: '体积材质的容器的最小点', type: 'IVector3 | null', require: false, default: '{x:0,y:0,z:0}'
},
{
prop: 'containerMax', desc: '体积材质的容器的最大点', type: 'IVector3 | null', require: false, default: '{x:0,y:0,z:0}'
},
{
prop: 'fit', desc: '填充模式', type: 'VolumeFit', require: false, default: 'VolumeFit.Fill'
},
{
prop: 'side', desc: 'Mesh 三角形的渲染面', type: 'Side | undefined', require: false, default: 'BackSide'
},
{
prop: 'opacity', desc: '透明度', type: 'number | null', require: false, default: '1'
},
{
prop: 'alphaRange', desc: '有效透明度的取值范围', type: 'IVector2 | null', require: false, default: ' {x:0,y:0.95}'
},
{
prop: 'atomize', desc: '是否开启雾化的效果', type: 'boolean', require: false, default: 'true'
},
{
prop: 'steps', desc: '体积材质渲染的采样数', type: 'number | null', require: false, default: '100'
},
{
prop: 'accFactor', desc: '颜色累积系数', type: 'number | null', require: false, default: '1'
},
{
prop: 'range', desc: '数值的映射区间 l', type: 'IVector2 | null', require: false, default: '{x:0,y:100}'
},
{
prop: 'discardOut', desc: '否丢弃超出映射范围的数值', type: 'boolean | null', require: false, default: 'false'
},
{
prop: 'voidRange', desc: '颜色累积系数', type: 'IVector2 | null', require: false, default: '{x:-100,y:-1}'
},
]"

/>

###### gradientTexture

```ts
const defaultColorGradient: ColorGradient = [
  [0, "rgba(0,255,0,0)"],
  [0.5, "rgba(64,255,255,0.5)"],
  [1, "rgba(255,64,255,1)"],
];
const gradientTexture = createLinearGradientTexture(tdefaultColorGradient);
```

### createLineHeat

创建线状热力

#### 样例

<Docs-Iframe  src="plugin/heatCloud/creatLineCloud.html" />

#### 定义

```ts
createLineHeat(points: ParticleVolumeFeaturePoint[], options?: CreatLineHeatOptions): VolumeMesh
```

```ts
type ParticleVolumeFeaturePoint = ParticleVolumeFeature & IVector3;
```

```ts
type CreatLineHeatOptions = LineDataOptions & GradientOptions;

interface LineDataOptions {
  /**
   * 值
   *
   * @defaultValue 100
   */
  value?: number;
  /**
   * 半径
   *
   * @defaultValue 10
   */
  radius?: number;
  /**
   * 空心因子
   *
   * @defaultValue 0
   */
  hollow?: number;

  /**
   * 映射区间
   * @remarks
   * x 为最小值，y 为最大值
   *
   * @defaultValue {x:0,y:100}
   */
  clim?: IVector2;
  /**
   * 值梯度函数
   */
  valueGradient?: GetGradientValue;
  /**
   * Data3D 的尺寸
   * @defaultValue 从原点到  points 的AABB包围盒最大点的空间尺寸
   */
  size?: IVector3 | null;
  /**
   * 半径梯度函数
   * @defaultValue radiusGradient_Default
   */
  radiusGradient?: GetLineGradientValue;
  /**
   * 空心比梯度函数
   * @defaultValue hollowGradient_Default
   */
  hollowGradient?: GetLineGradientValue;
  /**
   * 轴线值梯度函数
   * @defaultValue lineValueGradient_Default
   */
  lineValueGradient?: GetLineGradientValue;
  /**
   * 值累积函数
   * @defaultValue numberValuesAccumulate_Default
   */
  valuesAccumulate?: NumberValuesAccumulate;
}

/**
 * 轴线值梯度函数
 * @remarks
 * 会通过该函数来获取从轴线的起始点到终点之间轴线上各点处的值
 * @param params - 梯度参数；包含了当前点处的相关信息
 * @returns 返回最终的值
 */
type GetLineGradientValue = (params: LineGradientParams) => number;
/**
 * 轴线梯度函数的参数
 */
interface LineGradientParams {
  /**
   * 梯度的变化比率
   * @remarks
   * 一般是当前轴线位置到轴线开始处距离 与 轴线的长度的比率
   */
  ratio: number;
  /**
   * 轴线的长度
   */
  length: number;
  /**
   * 当前点的坐标
   */
  point: Vector3;
  /**
   * 轴线起始点处的半径
   */
  startRadius: number;
  /**
   * 轴线终点处的半径
   */
  endRadius: number;
  /**
   * 轴线终点处的半径相对起始点处的半径的增加量；即 `endRadius - startRadius`
   */
  addedRadius: number;
  /**
   * 选项中默认的半径
   */
  defaultRadius: number;
  /**
   * 当前中心点的半径
   * @remarks
   * 注意：在 `radiusGradient` 中，该值就是 `defaultRadius`；
   */
  radius: number;
  /**
   * 轴线起始点处的值
   */
  startValue: number;
  /**
   * 轴线终点处的值
   */
  endValue: number;
  /**
   * 轴线终点处的值相对起始点处的值的增加量；即 `endValue - startValue`
   */
  addedValue: number;
  /**
   * 选项中默认的值
   */
  defaultValue: number;
  /**
   * 轴线起始点处的空心比率
   */
  startHollow: number;
  /**
   * 轴线终点处的空心比率
   */
  endHollow: number;
  /**
   * 轴线终点处的空心比率相对起始点处的空心比率的增加量；即 `endHollow - startHollow`
   */
  addedHollow: number;
  /**
   * 选项中默认的空心比率
   */
  defaultHollow: number;
}
/**
 * 数值累积函数
 * @remarks
 * 当某一个点处理多个区域数据内时，需要考虑多个数据区域在该点的累积效果，通过该函数来获取最终的累积结果
 * @param values - 值的列表
 * @param clim - 默认的映射区间
 * @returns 累积后的最终值
 */
type NumberValuesAccumulate = (values: number[], clim: IVector2) => number;
```

#### 使用

```ts{20-32}
const ssp = new SoonSpace({
  el: "#viewA",
  options: {
    showInfo: true,
    showGrid: false,
    background: {
      color: new Color(0x444444),
    },
  },
  events: {
    selectPosition: console.log,
    modelClick: console.log,
  },
});

var linePoints = [
  { x: 50, y: 0, z: 50, value: 50, radius: 20 },
  { x: 50, y: 70, z: 50, value: 50, radius: 20 },
];
// const mesh = heatCloudPlugin.createLineHeat(linePoints);
const mesh = heatCloudPlugin.createLineHeat(linePoints, {
  range: { x: 0, y: 50 },
  voidRange: { x: -100, y: -50 },
  size: { x: 90, y: 30, z: 60 },
  steps: 100,
  opacity: 1,
  accFactor: 2,
  depthTest: false,
  side: FrontSide,
  discardOut: false,
  fit: VolumeFit.Fill,
});
```

#### 参数

#### points

:::tip
`points`中与`options`相同的属性，`points`优先级 **高于** `options`
:::

- **描述:** 热力点
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** `ParticleVolumeFeaturePoint[]`

##### ParticleVolumeFeaturePoint

<Docs-Table
:data="[
{
prop: 'x', desc: 'x', type: 'number', require: true, default: ''
},
{
prop: 'y', desc: 'y', type: 'number', require: true, default: ''
},
{
prop: 'z', desc: 'z', type: 'number', require: true, default: ''
},
{
prop: 'value', desc: '值', type: 'number', require: false, default: '100'
},

{
prop: 'hollow', desc: '空心因子', type: 'number', require: false, default: '0'
},
{
prop: 'clim', desc: '映射区间', type: 'IVector2', require: false, default: '{x:0,y:100}'
},
{
prop: 'valueGradient', desc: '值梯度函数', type: 'GetGradientValue', require: false, default: ''
},

]"

/>

##### options

- **描述:** 配置
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** `CreatLineHeatOptions`

<Docs-Table
:data="[
{
prop: 'value', desc: '值', type: 'number', require: false, default: '100'
},
{
prop: 'radius', desc: '半径', type: 'number', require: false, default: '10'
},
{
prop: 'hollow', desc: '空心因子', type: 'number', require: false, default: '0'
},
{
prop: 'clim', desc: '映射区间', type: 'IVector2', require: false, default: '{x:0,y:100}'
},
{
prop: 'valueGradient', desc: '值梯度函数', type: 'GetGradientValue', require: false, default: ''
},
{
prop: 'valuesAccumulate', desc: '热力值累积函数', type: 'HeatValuesAccumulate', require: false, default: '线性累积函数'
},

{
prop: 'radiusGradient', desc: '半径梯度函数', type: 'GetLineGradientValue', require: false, default: '线性累积函数'
},
{
prop: 'hollowGradient', desc: '空心比梯度函数', type: 'GetLineGradientValue', require: false, default: '线性累积函数'
},
{
prop: 'lineValueGradient', desc: '轴线值梯度函数', type: 'GetLineGradientValue', require: false, default: '线性累积函数'
},
{
prop: 'maxSize', desc: '优化后的梯度选项的所能达到的最大尺寸', type: 'number', require: false, default: '100'
},
{
prop: 'scale', desc: '缩放系数', type: 'number', require: false, default: ''
},
{
prop: 'voidValue', desc: '空值', type: 'number', require: false, default: '0'
},
{
prop: 'uint8', desc: '是否是 uint8 类型', type: 'boolean', require: false, default: 'false'
},
{
prop: 'gradient', desc: '梯度映射纹理', type: 'GradientTextureOptions', require: false, default: 'gradientTexture 如下 '
},
{
prop: 'map', desc: '三维的纹理', type: 'GradientData3DTexture', require: false, default: ''
},
{
prop: 'containerMin', desc: '体积材质的容器的最小点', type: 'IVector3 | null', require: false, default: '{x:0,y:0,z:0}'
},
{
prop: 'containerMax', desc: '体积材质的容器的最大点', type: 'IVector3 | null', require: false, default: '{x:0,y:0,z:0}'
},
{
prop: 'fit', desc: '填充模式', type: 'VolumeFit', require: false, default: 'VolumeFit.Fill'
},
{
prop: 'side', desc: 'Mesh 三角形的渲染面', type: 'Side | undefined', require: false, default: 'BackSide'
},
{
prop: 'opacity', desc: '透明度', type: 'number | null', require: false, default: '1'
},
{
prop: 'alphaRange', desc: '有效透明度的取值范围', type: 'IVector2 | null', require: false, default: ' {x:0,y:0.95}'
},
{
prop: 'atomize', desc: '是否开启雾化的效果', type: 'boolean', require: false, default: 'true'
},
{
prop: 'steps', desc: '体积材质渲染的采样数', type: 'number | null', require: false, default: '100'
},
{
prop: 'accFactor', desc: '颜色累积系数', type: 'number | null', require: false, default: '1'
},
{
prop: 'range', desc: '数值的映射区间 l', type: 'IVector2 | null', require: false, default: '{x:0,y:100}'
},
{
prop: 'discardOut', desc: '否丢弃超出映射范围的数值', type: 'boolean | null', require: false, default: 'false'
},
{
prop: 'voidRange', desc: '颜色累积系数', type: 'IVector2 | null', require: false, default: '{x:-100,y:-1}'
},
]"

/>

###### gradientTexture

```ts
const defaultColorGradient: ColorGradient = [
  [0, "rgba(0,255,0,0)"],
  [0.5, "rgba(64,255,255,0.5)"],
  [1, "rgba(255,64,255,1)"],
];
const gradientTexture = createLinearGradientTexture(tdefaultColorGradient);
```

### createImageExtrusion

创建图片挤压

#### 样例

<Docs-Iframe  src="plugin/heatCloud/createImageExtrusion.html" />

#### 定义

```ts
createImageExtrusion(imageUrl: string, options?: CreateImageExtrusionOptions & {
    depth?: number;
}): Promise<VolumeMesh>
```

```ts
type CreateImageExtrusionOptions = VolumeMaterialOptions<ImageData3DTexture> &
  ExtrudeImageOptions;
interface VolumeMaterialOptions<GradientData3DTexture>
  extends Omit<ShaderMaterialParameters, "map" | "opacity"> {
  /**
   * 三维的纹理
   */
  map?: ImageData3DTexture | null;
  /**
   * 渲染体积材质的容器的最小点
   * @remarks
   * 容器的最小点和最大点一般是被设置成 geometry 的AABB包围盒；但也可以不是
   * 总之，体积材质的渲染依托于 geometry 的形状，它不会超出 geometry 的尺寸；
   * 但可以控制容器的最小点和最大点来控制体积材质的渲染尺寸；
   * @defaultValue {x:0,y:0,z:0}
   */
  containerMin?: IVector3 | null;
  /**
   * 渲染体积材质的容器的最大点
   * @remarks
   * 容器的最小点和最大点一般是被设置成 geometry 的AABB包围盒；但也可以不是
   * 总之，体积材质的渲染依托于 geometry 的形状，它不会超出 geometry 的尺寸；
   * 但可以控制容器的最小点和最大点来控制体积材质的渲染尺寸；
   * @defaultValue map尺寸中的最大点
   */
  containerMax?: IVector3 | null;
  /**
   * 体积材质在容器内的填充模式
   * @defaultValue VolumeFit.Fill
   */
  fit?: VolumeFit | null;
  /**
   * Mesh三角形的渲染面
   * @remarks
   * 可设置为前面、后面、或者两面都渲染
   * 如果只渲染前面，进入体积材质内部，体积材质就会消失
   * 如果只渲染后面，体积初遮挡，就会消失
   * 如果两面都渲染，则会隐藏看到容器的面
   */
  side?: Side | undefined;
  /**
   * 透明度
   * @remarks
   * 决定整体的透明度
   * @defaultValue 1
   */
  opacity?: number | null;
  /**
   * 有效透明度的取值范围
   * @remarks
   * 如果最终颜色的透明度小于或等于 alphaRange.x ，则被认为是完全透明
   * 如果最终颜色的透明度在于或等于 alphaRange.y ，则被认为是完全不透明
   * 取值范围应当在 0 - 1
   * @defaultValue {x:0,y:0.95}
   */
  alphaRange?: IVector2 | null;
  /**
   * 是否开启雾化的效果
   * @remarks
   * 开启后的渲染效果会更像雾
   * @defaultValue true
   */
  atomize?: boolean | null;
  /**
   * 体积材质渲染的采样数
   * @remarks
   * 采样数越高，占用的GPU资源就越大；所以该数据设置的适宜最好；
   * @defaultValue 100
   */
  steps?: number | null;
  /**
   * 颜色累积系数
   * @remarks
   * 它是对体积材质进行积分时使用的系数；只在开启雾化效果{@link VolumeMaterial.atomize}时才有效；
   * 值越小，最终呈现出的效果就越雾化；
   * @defaultValue 1
   */
  accFactor?: number | null;
}
/**
 * extrudeImage 的选项
 */
interface ExtrudeImageOptions {
  reverseY?: boolean | null;
  axis?: Axis | null;
  colorSpace?: PredefinedColorSpace | null;
}
type PredefinedColorSpace = "display-p3" | "srgb";
```

#### 使用

```ts{15-20}
const ssp = new SoonSpace({
  el: "#viewA",
  options: {
    showInfo: true,
    showGrid: false,
    background: {
      color: new Color(0x444444),
    },
  },
  events: {
    selectPosition: console.log,
    modelClick: console.log,
  },
});
const mesh = await heatCloudPlugin.createImageExtrusion(imgUrl, {
  side: BackSide,
  depthTest: false,
  accFactor: 2,
  fit: VolumeFit.Raw,
});
```

#### 参数

#### options

- **描述:** 配置
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** `CreateImageExtrusionOptions & { depth?: number }`

<Docs-Table
:data="[
{
prop: 'map', desc: '三维的纹理', type: 'GradientData3DTexture', require: false, default: ''
},
{
prop: 'containerMin', desc: '体积材质的容器的最小点', type: 'IVector3 | null', require: false, default: '{x:0,y:0,z:0}'
},
{
prop: 'containerMax', desc: '体积材质的容器的最大点', type: 'IVector3 | null', require: false, default: '{x:0,y:0,z:0}'
},
{
prop: 'fit', desc: '填充模式', type: 'VolumeFit', require: false, default: 'VolumeFit.Fill'
},
{
prop: 'side', desc: 'Mesh 三角形的渲染面', type: 'Side | undefined', require: false, default: 'BackSide'
},
{
prop: 'opacity', desc: '透明度', type: 'number | null', require: false, default: '1'
},
{
prop: 'alphaRange', desc: '有效透明度的取值范围', type: 'IVector2 | null', require: false, default: ' {x:0,y:0.95}'
},
{
prop: 'atomize', desc: '是否开启雾化的效果', type: 'boolean', require: false, default: 'true'
},
{
prop: 'steps', desc: '体积材质渲染的采样数', type: 'number | null', require: false, default: '100'
},
{
prop: 'accFactor', desc: '颜色累积系数', type: 'number | null', require: false, default: '1'
},
{
prop: 'range', desc: '数值的映射区间 l', type: 'IVector2 | null', require: false, default: '{x:0,y:100}'
},
{
prop: 'discardOut', desc: '否丢弃超出映射范围的数值', type: 'boolean | null', require: false, default: 'false'
},
{
prop: 'voidRange', desc: '颜色累积系数', type: 'IVector2 | null', require: false, default: '{x:-100,y:-1}'
},
{
prop: 'depth', desc: 'depth', type: 'number', require: false, default: '20'
},
]"

/>

### createSliceMesh

创建切片

#### 定义

> `VolumeMaterial` 为 `VolumeMesh` 的材质

```ts
createSliceMesh(material: VolumeMaterial, options?: SliceMaterialOptions & CreateImageData3DTextureFromGradientOptions): SliceMesh | undefined
```

```ts
/**
 * 切片材质的选项
 */
interface SliceMaterialOptions
  extends Omit<ShaderMaterialParameters, "opacity"> {
  /**
   * 三维的纹理
   */
  map?: Texture3D | null;
  /**
   * 透明度
   * @remarks
   * 决定整体的透明度
   * @defaultValue 1
   */
  opacity?: number | null;
  /**
   * 轴
   * @remarks
   * 切片就是垂直于该轴的截面
   *
   * @defaultValue Axis.z
   */
  axis?: Axis | null;
  /**
   * 轴上的坐标值
   * @remarks
   * 会在轴的该位置处获取切片
   * @defaultValue 0
   */
  depth?: number | null;
}

type CreateImageData3DTextureFromGradientOptions = {
  /**
   * 数值的映射区间
   * @remarks
   * x 为最小值，y 为最大值
   *
   * @defaultValue {x:0,y:100}
   */
  range?: IVector2 | null;
  /**
   * 是否丢弃超出映射范围的数值
   * @remarks
   * 当数值超出映射区间 {@link GradientData3DOptions.range}  时，是否丢弃；
   *
   * 包含左右边界值
   * @defaultValue true
   */
  discardOut?: boolean | null;
  /**
   * 空值的范围
   * @remarks
   * 当数值在此范围中时，会被认为是空的值，渲染时会被丢弃
   *
   * 包含左右边界值
   *
   * @defaultValue {x:-100,y:-1}
   */
  voidRange?: IVector2 | null;

  voidColor?: [number, number, number, number];

  gradient: TexImageSource | ColorGradient;
};
type TexImageSource =
  | ImageBitmap
  | ImageData
  | HTMLImageElement
  | HTMLCanvasElement
  | HTMLVideoElement
  | OffscreenCanvas
  | VideoFrame;
```

```ts
/**
 * 呈现3D图像切片的Mesh
 * @remarks
 * 专用于 {@link ./SliceMaterial#SliceMaterial}
 *
 */
declare class SliceMesh extends Mesh {
  readonly isSliceMesh = true;
  constructor(options: SliceMaterialOptions);
  protected _geometry: BufferGeometry;
  material: SliceMaterial;
  protected _material: SliceMaterial;
  /**
   * 是否自动更新几何体
   * @remarks
   * 当启动该选项后，在 SliceMesh 监测到切片尺寸相关的变更时，会自动更新 geometry 的尺寸，以适应切片的尺寸
   * @defaultValue true
   */
  autoUpdateGeometry: boolean;
  /**
   * 更新几何体
   */
  updateGeometry(): false | undefined;
  /**
   * 三维的纹理
   */
  get map(): Texture3D | null;
  set map(value: Texture3D | null);
  /**
   * 轴
   * @remarks
   * 切片就是垂直于该轴的截面
   *
   * @defaultValue Axis.z
   */
  get axis(): Axis;
  set axis(value: Axis);
  /**
   * 轴上的坐标值
   * @remarks
   * 会在轴的该位置处获取切片
   * @defaultValue 0
   */
  get depth(): number;
  set depth(value: number);
  /**
   * 切片的尺寸
   * @remarks
   * 不同轴上的切片的尺寸一般不一样
   */
  get sliceSize(): Vector2;
}
type Texture3D = Data3DTexture | DataArrayTexture;
/**
 * 轴
 */
declare enum Axis {
  x = 0,
  y = 1,
  z = 2,
}
```

#### 使用

```ts{33-36}
const ssp = new SoonSpace({
  el: "#viewA",
  options: {
    showInfo: true,
    showGrid: false,
    background: {
      color: new Color(0x444444),
    },
  },
  events: {
    selectPosition: console.log,
    modelClick: console.log,
  },
});

var linePoints = [
  { x: 50, y: 0, z: 50, value: 50, radius: 20 },
  { x: 50, y: 70, z: 50, value: 50, radius: 20 },
];
// const mesh = heatCloudPlugin.createLineHeat(linePoints);
const mesh = heatCloudPlugin.createLineHeat(linePoints, {
  range: { x: 0, y: 50 },
  voidRange: { x: -100, y: -50 },
  size: { x: 90, y: 30, z: 60 },
  steps: 100,
  opacity: 1,
  accFactor: 2,
  depthTest: false,
  side: FrontSide,
  discardOut: false,
  fit: VolumeFit.Fill,
});
const sliceMesh = heatCloudPlugin.createSliceMesh(mesh.material, {
  depth: 20,
  // opacity: 0.8,
});
sliceMesh.position.set(-500, -500, -500);
```

#### 参数

#### options

- **描述:** 配置
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** `SliceMaterialOptions & CreateImageData3DTextureFromGradientOptions`

<Docs-Table
:data="[
{
prop: 'map', desc: '三维的纹理', type: 'GradientData3DTexture', require: false, default: ''
},
{
prop: 'opacity', desc: '透明度', type: 'number | null', require: false, default: '1'
},
{
prop: 'axis', desc: '切片截面垂直于该轴', type: 'Axis', require: false, default: 'Axis.z'
},
{
prop: 'depth', desc: '轴上的坐标值', type: 'number | null', require: false, default: '0'
},
{
prop: 'range', desc: '数值的映射区间 l', type: 'IVector2 | null', require: false, default: 'VolumeMaterial.range'
},

{
prop: 'discardOut', desc: '否丢弃超出映射范围的数值', type: 'boolean | null', require: false, default: 'VolumeMaterial.discardOut'
},
{
prop: 'voidRange', desc: '颜色累积系数', type: 'IVector2 | null', require: false, default: 'VolumeMaterial.voidRange'
},

{
prop: 'gradient', desc: '梯度映射纹理', type: 'TexImageSource | ColorGradient', require: false, default: 'VolumeMaterial.gradient'
},
{
prop: 'voidColor', desc: '空值颜色', type: '[number, number, number, number]', require: false, default: ''
},

]"

/>

### createImageSlice

创建切片 dom

#### 定义

> `VolumeMaterial` 为 `VolumeMesh` 的材质

```ts
createImageSlice(material: VolumeMaterial, options?: CreateImageData3DTextureFromGradientOptions): ImageData3DTextureSlice | undefined
```

```ts
/**
 * 获取3D图像切片的工具
 * @remarks
 * 提供了用于呈现切片的 canvas 元素；
 * 生成切片图像的url；
 * 获取指定坐标的颜色等等；
 */
export declare class ImageData3DTextureSlice extends ImageData3DSlice {
  readonly isImageData3DTextureSlice = true;
  constructor(texture: IImageData3 | Texture3D);
  /**
   * 设置材质或 IImageData3 类数据
   */
  set texture(texture: IImageData3 | Texture3D);
}
```

#### 使用

```ts{38-40}
const ssp = new SoonSpace({
  el: "#viewA",
  options: {
    showInfo: true,
    showGrid: false,
    background: {
      color: new Color(0x444444),
    },
  },
  events: {
    selectPosition: console.log,
    modelClick: console.log,
  },
});

var linePoints = [
  { x: 50, y: 0, z: 50, value: 50, radius: 20 },
  { x: 50, y: 70, z: 50, value: 50, radius: 20 },
];
// const mesh = heatCloudPlugin.createLineHeat(linePoints);
const mesh = heatCloudPlugin.createLineHeat(linePoints, {
  range: { x: 0, y: 50 },
  voidRange: { x: -100, y: -50 },
  size: { x: 90, y: 30, z: 60 },
  steps: 100,
  opacity: 1,
  accFactor: 2,
  depthTest: false,
  side: FrontSide,
  discardOut: false,
  fit: VolumeFit.Fill,
});
const sliceMesh = heatCloudPlugin.createSliceMesh(mesh.material, {
  depth: 20,
  // opacity: 0.8,
});
sliceMesh.position.set(-500, -500, -500);
const imageSlice = heatCloudPlugin.createImageSlice(mesh.material);
//同步切片的深度
imageSlice.depth = sliceMesh.depth;
document.getElementById(domContainer).appendChild(imageSlice.canvas);
```

#### 参数

#### options

- **描述:** 配置
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** `CreateImageData3DTextureFromGradientOptions`

<Docs-Table
:data="[

{
prop: 'range', desc: '数值的映射区间 l', type: 'IVector2 | null', require: false, default: 'VolumeMaterial.range'
},

{
prop: 'discardOut', desc: '否丢弃超出映射范围的数值', type: 'boolean | null', require: false, default: 'VolumeMaterial.discardOut'
},
{
prop: 'voidRange', desc: '颜色累积系数', type: 'IVector2 | null', require: false, default: 'VolumeMaterial.voidRange'
},

{
prop: 'gradient', desc: '梯度映射纹理', type: 'TexImageSource | ColorGradient', require: false, default: 'VolumeMaterial.gradient'
},
{
prop: 'voidColor', desc: '空值颜色', type: '[number, number, number, number]', require: false, default: ''
},

]"

/>
