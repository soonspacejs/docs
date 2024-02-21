---
outline: 3
---

# plugin-effect

![beta](https://img.shields.io/npm/v/@soonspacejs/plugin-effect/latest.svg)

特效。

## 样例

<Docs-Iframe src="plugin/effect.html" />

## 安装

```bash
npm install @soonspacejs/plugin-effect -S
# or
yarn add @soonspacejs/plugin-effect -S
```

## 使用方法

```js {2,10}
import SoonSpace from 'soonspacejs';
import EffectPlugin from '@soonspacejs/plugin-effect';

const ssp = new SoonSpace({
  el: '#view',
  options: {},
  events: {},
});

const effectPlugin = ssp.registerPlugin(EffectPlugin, 'effectPlugin');
```

## 属性

### weatherPresetImgs

天气效果预设图片

#### 雨滴图片

```js
effectPlugin.weatherPresetImgs.rain;
```

#### 下雪图片

```js
effectPlugin.weatherPresetImgs.snow;
```

## 方法

### createFlame

创建火焰

#### 定义

```ts
type PluginObjectInfo = BaseObject3DInfo;

interface FlameOptions extends PluginObjectInfo {
  magnitude?: number;
  gain?: number;
  imgUrl?: string;
}

function createFlame(options: FlameOptions): PluginObject;
```

#### 使用

```js
effectPlugin.createFlame({
  id: 'testFlame',
  position: {
    x: 0,
    y: 50,
    z: 0,
  },
});
```

#### 参数

##### options

- **描述:** 配置
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** `FlameOptions`

##### FlameOptions

<Docs-Table 
    :data="[
      {
        prop: 'magnitude', desc: '火焰量级', type: 'number', require: false, default: '1.3'
      },
      {
        prop: 'gain', desc: '火焰增益', type: 'number', require: false, default: '0.5'
      },
      {
        prop: 'imgUrl', desc: '火焰图片', type: 'string', require: false, default: '内置图片'
      }
    ]"
/>

其他配置参考 [BaseObject3DInfo](../guide/types.md#baseobject3dinfo)

### createSmoke

创建烟雾

#### 定义

```ts
interface SmokeOptions extends PluginObjectInfo {
  imgUrl?: string;
  count?: number;
  maxAge?: number;
  size?: number;
  acceleration?: number;
  velocity?: IVector3;
  color?: IColor[];
}

function createSmoke(options: SmokeOptions): PluginObject;
```

#### 用法

```js
effectPlugin.createSmoke({
  id: 'testSmoke',
  name: 'testSmoke',
  position: {
    x: -300,
    y: 0,
    z: 300,
  },
});
```

#### 参数

##### options

- **描述:** 配置
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** `SmokeOptions`

##### SmokeOptions

<Docs-Table 
    :data="[
      {
        prop: 'imgUrl', desc: '烟雾图片', type: 'string', require: false, default: '内置图片'
      },
       {
        prop: 'count', desc: '烟雾粒子的数量', type: 'number', require: false, default: '1000'
      },
      {
        prop: 'maxAge', desc: '烟雾粒子的显示时间（秒）', type: 'number', require: false, default: '4'
      },
      {
        prop: 'size', desc: '烟雾粒子的大小', type: 'number', require: false, default: '200'
      },
      {
        prop: 'acceleration', desc: '烟雾粒子的加速度', type: 'number', require: false, default: '10'
      },
      {
        prop: 'velocity', desc: '烟雾粒子的扩散方向', type: 'IVector3', link: '../guide/types#ivector3' ,require: false, default: '{ x: 100, y: 100, z: 100 }'
      },
       {
        prop: 'color', desc: '烟雾粒子的颜色', type: 'IColor[]', link: '../guide/types#icolor' ,require: false, default: '[0x333333, 0x111111]'
      },
    ]"
/>

其他配置参考 [BaseObject3DInfo](../guide/types.md#baseobject3dinfo)

### createWater

创建水面

#### 定义

```ts
interface WaterOptions extends ShaderMaterialParameters {
  /**
   * 水面的多边形区域
   */
  polygon: IVector3[];
  /**
   * 水面的高度
   * 默认为第一个顶点的 y 值
   */
  height?: number;
  /**
   * 太阳的照射的方向
   */
  sunDirection?: Vector3;
  /**
   * 太阳的颜色
   */
  sunColor?: ColorRepresentation;
  /**
   * 水的颜色
   */
  waterColor?: ColorRepresentation;
  /**
   * 水波的强度
   */
  distortionScale?: number;
  /**
   * 透明度
   */
  alpha?: number;
  /**
   * 速度
   */
  speed?: number;
  /**
   * 水面法线纹理
   */
  waterNormals?: string | Texture;
  fog?: boolean;
  eye?: Vector3;
  clipBias?: number;
  textureWidth?: number;
  textureHeight?: number;
}
interface CreateWaterOptions extends PluginObjectInfo, Omit<WaterOptions, 'userData'> {
  /**
   * 是否开启水的动画
   * 如果开启，则会一直触发场景渲染
   * 如果关闭，则不会主动触发场景渲染，但在渲染渲染时仍会有动画效果，只是不会主动触发场景渲染
   */
  animation?: boolean;
}

function createWater(options: CreateWaterOptions): PluginObject;
```

#### 用法

```js
effectPlugin.createWater({
  id: 'water',
  position: { x: 0, y: 0.1, z: 0 },
  polygon: [
    { x: 0, y: 50, z: 0 },
    { x: 0, y: 1, z: 1000 },
    { x: 1500, y: 0, z: 1000 },
    { x: 1000, y: 0, z: 0 },
  ],
  waterColor: '#ff6600',
});
```

其他配置参考 [BaseObject3DInfo](../guide/types.md#baseobject3dinfo)

### createContactShadows

创建接触阴影

#### 样例

<Docs-Iframe src="plugin/contactShadows.html" />

#### 定义

```ts
interface ContactShadowsOptions extends Omit<PluginObjectInfo, 'scale'> {
  opacity?: number;
  width?: number;
  height?: number;
  blur?: number;
  far?: number;
  resolution?: number;
  frames?: number;
  scale?: number | [x: number, y: number];
  darkness?: number;
}

function createContactShadows(options: ContactShadowsOptions): PluginObject;
```

#### 用法

```js
effectPlugin.createContactShadows({
  id: 'shadows',
  position: { x: 0, y: -0.1, z: 0 },
  opacity: 1,
  scale: [100, 100],
  blur: 2,
  far: 1,
  resolution: 1024,
  frames: 10,
  darkness: 2,
});
```

#### 参数

##### options

- **描述:** 配置
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** `ContactShadowsOptions`

##### ContactShadowsOptions

<Docs-Table 
    :data="[
      {
        prop: 'opacity', desc: '不透明度', type: 'number', require: false, default: '1'
      },
      {
        prop: 'width', desc: '平面宽度', type: 'number', require: false, default: '1'
      },
      {
        prop: 'height', desc: '平面高度', type: 'number', require: false, default: '1'
      },
      {
        prop: 'blur', desc: '模糊', type: 'number', require: false, default: '1'
      },
      {
        prop: 'far', desc: '向上取样的阴影距离', type: 'number', require: false, default: '10'
      },
      {
        prop: 'resolution', desc: '阴影平面的分辨率', type: 'number', require: false, default: '512'
      },
      {
        prop: 'frames', desc: '阴影的渲染帧数', type: 'number', require: false, default: 'Infinity'
      },
      {
        prop: 'scale', desc: '用于乘以宽高', type: 'number | [x: number, y: number]', require: false, default: '10'
      },
      {
        prop: 'darkness', desc: '阴影的黑暗系数', type: 'number', require: false, default: '1'
      },
    ]"
/>

其他配置参考 [BaseObject3DInfo](../guide/types.md#baseobject3dinfo)

### openWeather

开启天气效果

#### 样例

<Docs-Iframe src="plugin/weatherEffect.html" />

#### 定义

```ts
interface WeatherOptions {
  imgUrl?: string;
  color?: IColor;
  size?: number;
  opacity?: number;
  count?: number;
  range?: number;
  velocityX?: [number, number];
  velocityY?: [number, number];
}

function openWeather(options?: WeatherOptions): void;
```

#### 用法

```js
effectPlugin.openWeather({
  imgUrl: effectPlugin.weatherPresetImgs.snow,
  count: 500,
  color: 0xffffff,
  size: 1.4,
  opacity: 0.8,
  velocityX: [-0.01, 0.01],
  velocityY: [0.2, 0.3],
});
```

#### 参数

##### options

- **描述:** 配置
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** `WeatherOptions`

##### WeatherOptions

<Docs-Table 
    :data="[
      {
        prop: 'imgUrl', desc: '粒子贴图', type: 'string', require: false, default: '内置雨滴图',
      },
      {
         prop: 'color', desc: '粒子颜色', type: 'IColor', link: '../guide/types#icolor', require: false, default: '0xffffff',
      },
      {
        prop: 'size', desc: '粒子大小', type: 'number', require: false, default: '1',
      },
      {
        prop: 'opacity', desc: '粒子不透明度', type: 'number', require: false, default: '0.9',
      },
      {
        prop: 'count', desc: '粒子数量', type: 'number', require: false, default: '500',
      },
      {
        prop: 'range', desc: '生成范围', type: 'number', require: false, default: '100',
      },
      {
        prop: 'velocityX', desc: '左右浮动的随机范围', type: '[number, number]', require: false, default: '[-0.02, 0.02]',
      },
      {
        prop: 'velocityY', desc: '下降速度的随机范围', type: '[number, number]', require: false, default: '[0.4, 0.8]',
      },
    ]"
/>

::: tip 提示
重复调用 `openWeather` 方法自动会将之前的天气效果关闭。

关闭天气需要使用 `closeWeather` 方法
:::

### closeWeather

关闭天气效果

#### 定义

```ts
function closeWeather(): void;
```

#### 用法

```js
effectPlugin.closeWeather();
```

### createSparkles

创建星星

#### 样例

<Docs-Iframe src="plugin/sparkles.html" />

#### 定义

```ts
interface SparklesOptions extends PluginObjectInfo {
  count?: number;
  speed?: number | Float32Array;
  opacity?: number | Float32Array;
  color?: IColor | Float32Array;
  size?: number | Float32Array;
  scalar?: number | [number, number, number] | IVector3;
  noise?: number | [number, number, number] | IVector3 | Float32Array;
}

function createSparkles(options: SparklesOptions): PluginObject;
```

#### 用法

```js
effectPlugin.createSparkles({
  id: 'testSparkles',
  position: {
    x: 0,
    y: 2,
    z: 0,
  },
  count: 100,
  scalar: 8,
  size: 2,
  speed: 0.8,
  opacity: 0.5,
  noise: 1,
  color: '#ff0',
});
```

#### 参数

##### options

- **描述:** 配置
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** `SparklesOptions`

##### SparklesOptions

<Docs-Table 
    :data="[
      {
        prop: 'count', desc: '粒子的数量', type: 'number', require: false, default: '100',
      },
      {
         prop: 'speed', desc: '粒子的速度', type: 'number | Float32Array', require: false, default: '1',
      },
      {
        prop: 'opacity', desc: '粒子的不透明度', type: 'number | Float32Array', require: false, default: '1',
      },
      {
         prop: 'color', desc: '粒子颜色', type: 'IColor | Float32Array', link: '../guide/types#icolor', require: false, default: '0xffffff',
      },
      {
        prop: 'size', desc: '粒子大小', type: 'number', require: false, default: '2',
      },
      {
        prop: 'scalar', desc: '粒子扩散范围', type: 'number | [number, number, number] | IVector3', require: false, default: '8',
      },
       {
        prop: 'noise', desc: '粒子运动系数', type: 'number | [number, number, number] | IVector3 | Float32Array', require: false, default: '1',
      },
    ]"
/>

其他配置参考 [BaseObject3DInfo](../guide/types.md#baseobject3dinfo)

### createParticleCluster

创建粒子簇

#### 样例

<Docs-Iframe src="plugin/particle.html" />

#### 定义

```ts
function createParticleCluster(options: ParticleClusterOptions): ParticleCluster;
```

参数类型：

```ts
/**
 * 粒子簇特征
 */
export interface ParticleClusterFeature {
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
  /**
   * 实心因子
   *
   * @defaultValue 0.7
   */
  solid?: number;
  /**
   * 空心因子
   *
   * @defaultValue 0
   */
  hollow?: number;
  /**
   * 中心点的密度
   * @remarks
   * 单位空间中有多少个点
   *
   * @defaultValue 1
   */
  density?: number;
  /**
   * 粒子云的形状
   */
  shape?: ParticleClusterShape;
  /**
   * 密度梯度函数
   */
  densityGradient?: GetGradientValue;
  valueGradient?: GetGradientValue;
  /**
   * 映射区间
   * @remarks
   * x 为最小值，y 为最大值
   *
   * @defaultValue {x:0,y:100}
   */
  clim?: IVector2;
  /**
   * 生成粒子时使用的距离步长
   * @remarks
   * 这个也会影响粒子的密度 和 粒子个数；
   * 建议所有粒子的步长一样；
   *
   * @defaultValue 3
   */
  step?: number;
}

/**
 * 粒子簇特性点
 */
export type ParticleClusterFeaturePoint<IVec extends IVector> = ParticleClusterFeature & IVec;
/**
 * 很多点粒子族
 */
export interface CreatePointParticleClusterDataArrOptions<IVec extends IVector> extends ParticleClusterFeature {
  points: ParticleClusterFeaturePoint<IVec>[];
}

export interface CreateLineParticleClusterDataArrOptions<IVec extends IVector>
  extends CreatePointParticleClusterDataArrOptions<IVec> {
  radiusGradient?: GetLineGradientValue;
  lineDensityGradient?: GetLineGradientValue;
  lineValueGradient?: GetLineGradientValue;
  lineStep?: number;
}

/**
 * 很多点粒子族
 */
export interface CreatePointParticleClusterDataArrOptions<IVec extends IVector> extends ParticleClusterFeature {
  points: ParticleClusterFeaturePoint<IVec>[];
}

/**
 * ParticleClusterGeometry 的选项
 */
export type ParticleClusterGeometryOptions = CreatePointParticleClusterDataArrOptions<IVector3> &
  CreateLineParticleClusterDataArrOptions<IVector3> &
  CreateHeatParticleClusterDataArrOptions<IVector3> &
  Omit<ClusterGeometryOptions, 'clusters'> & {
    clusterType?: ClusterType;
  };
export type ParticleClusterOptions = ParticleClusterGeometryOptions & PointsMaterialParameters;
```

ParticleCluster

```ts
export declare class ParticleCluster extends Points {
  readonly isParticleCluster = true;
  constructor(options?: ParticleClusterOptions);
  get options(): ParticleClusterGeometryOptions;
  set options(value: ParticleClusterGeometryOptions);
  setOptions(options: ParticleClusterGeometryOptions): void;
  addPoint(
    point: ParticleClusterFeaturePoint<IVector3>[] | ParticleClusterFeaturePoint<IVector3>,
    options?: Omit<ParticleClusterGeometryOptions, 'points'>
  ): void;
  convertPoints(points: ParticleClusterFeaturePoint<IVector3>[]): ParticleClusterFeatureVector<IVector3>[];
}
```

#### 用法

```js
// 创建粒子簇
const particle = effectPlugin.createParticleCluster({
  points: [
    { x: 0, y: 0, z: 0, value: 80, radius: 100 },
    { x: 0, y: 50, z: 0, value: 20, radius: 40 },
  ],
  clim: { x: 0, y: 50 },
  gradient: [
    [0, '#ff0000ff'],
    [0.4, '#00ff00aa'],
    [0.9, '#0000ff77'],
  ],
  size: 0.01,
  opacity: 0.3,
  clusterType: ClusterType.Point,
});

// 继承添加点
particle.addPoint([
  { x: 30, y: 0, z: 0, value: 40, radius: 60 },
  { x: 0, y: 20, z: 10, value: 30, radius: 40 },
]);
```

### createPointsWave

创建粒子波浪

#### 样例

<Docs-Iframe src="plugin/createPointsWave.html" />

#### 定义

```ts
interface PointsWaveOptions extends PluginObjectInfo {
  xAxisCount?: number;
  zAxisCount?: number;
  showDistance?: number;
  separation?: number;
  size?: number;
  maxFluctua?: number;
  color?: IColor;
  opacity?: number;
}

function createPointsWave(options: PointsWaveOptions): PluginObject;
```

#### 用法

```js
const pointsWave = effectPlugin.createPointsWave({
  id: 'pointsWave',
  position: {
    x: 0,
    y: -20,
    z: 0,
  },
  xAxisCount: 100,
  zAxisCount: 100,
  showDistance: 0,
  separation: 20,
  size: 5,
  maxFluctua: 0.1,
  color: '#485c7c',
  opacity: 1,
});
```

#### 参数

##### options

- **描述:** 配置
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** `PointsWaveOptions`

##### PointsWaveOptions

<Docs-Table 
    :data="[
      {
        prop: 'xAxisCount', desc: 'x轴粒子数量', type: 'number', require: false, default: '100'
      },
      {
        prop: 'xAxisCount', desc: 'y轴粒子数量', type: 'number', require: false, default: '100'
      },
      {
        prop: 'showDistance', desc: '开始显示粒子的距离', type: 'number', require: false, default: '0'
      },
      {
        prop: 'separation', desc: '分隔距离', type: 'number', require: false, default: '20'
      },
      {
        prop: 'size', desc: '大小', type: 'number', require: false, default: '5'
      },
      {
        prop: 'maxFluctua', desc: '最大波动系数', type: 'number', require: false, default: '0.1'
      },
      {
         prop: 'color', desc: '颜色', type: 'IColor', link: '../guide/types#icolor', require: false, default: '#485c7c',
      },
      {
        prop: 'opacity', desc: '不透明度', type: 'number', require: false, default: '1'
      },
    ]"
/>

其他配置参考 [BaseObject3DInfo](../guide/types.md#baseobject3dinfo)

### createBuilds

创建建筑

#### 样例

同上

#### 定义

```ts
interface BuildsOptions extends PluginObjectInfo {
  buildWidth?: number;
  buildHeigh?: number;
  buildDepth?: number;
  count?: number;
  gapX?: number;
  gapZ?: number;
  showDistance?: number;
  randShift?: number;
  color?: IColor;
}

function createBuilds(options: BuildsOptions): PluginObject;
```

#### 用法

```js
const builds = effectPlugin.createBuilds({
  id: 'builds',
  position: {
    x: 0,
    y: -50,
    z: 0,
  },
  buildWidth: 100,
  buildDepth: 100,
  buildHeigh: 200,
  count: 12,
  gapX: 2,
  gapZ: 2,
  showDistance: 1000,
  randShift: 0.5,
  color: '#485c7c',
});
```

#### 参数

##### options

- **描述:** 配置
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** `BuildsOptions`

##### BuildsOptions

<Docs-Table 
    :data="[
      {
        prop: 'buildWidth', desc: '建筑宽度（x）', type: 'number', require: false, default: '100'
      },
      {
        prop: 'buildDepth', desc: '建筑深度（z）', type: 'number', require: false, default: '100'
      },
      {
        prop: 'buildHeigh', desc: '建筑高度（y）', type: 'number', require: false, default: '200'
      },
      {
        prop: 'count', desc: '数量（实际数量为count平方）', type: 'number', require: false, default: '12'
      },
      {
        prop: 'gapX', desc: 'x轴间隔（配合randShift）', type: 'number', require: false, default: '2'
      },
      {
        prop: 'gapZ', desc: 'z轴间隔（配合randShift）', type: 'number', require: false, default: '2'
      },
      {
        prop: 'showDistance', desc: '开始显示建筑的距离', type: 'number', require: false, default: '1000'
      },
      {
        prop: 'randShift', desc: '随机分布系数', type: 'number', require: false, default: '0.5'
      },
      {
         prop: 'color', desc: '颜色', type: 'IColor', link: '../guide/types#icolor', require: false, default: '#485c7c',
      }
    ]"
/>

其他配置参考 [BaseObject3DInfo](../guide/types.md#baseobject3dinfo)

### removeEffect <Base-Deprecated />

删除效果

#### 定义

```ts
function removeEffect(id: PluginObjectInfo['id']): boolean;
```

#### 用法

```js
effectPlugin.removeEffect('test');
```

:::warning 弃用警告
请使用 [`removeObjectById`](../api/object#removeobjectbyid) 替代
:::
