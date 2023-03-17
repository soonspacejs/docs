---
sidebarDepth: 2
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

interface FlameInfo extends PluginObjectInfo {
  magnitude?: number;
  gain?: number;
  imgUrl?: string;
}

function createFlame(params: FlameInfo): PluginObject;
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

##### params

- **描述:** 配置
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** `FlameInfo`

##### FlameInfo

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
interface SmokeInfo extends PluginObjectInfo {
  imgUrl?: string;
  count?: number;
  maxAge?: number;
  size?: number;
  acceleration?: number;
  velocity?: IVector3;
  color?: IColor[];
}

function createSmoke(params: SmokeInfo): PluginObject;
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

##### params

- **描述:** 配置
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** `SmokeInfo`

##### SmokeInfo

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
        prop: 'velocity', desc: '烟雾粒子的扩散方向', type: 'IVector3', link: '../guide/types.html#ivector3' ,require: false, default: '{ x: 100, y: 100, z: 100 }'
      },
       {
        prop: 'color', desc: '烟雾粒子的颜色', type: 'IColor[]', link: '../guide/types.html#icolor' ,require: false, default: '[0x333333, 0x111111]'
      },
    ]"
/>

其他配置参考 [BaseObject3DInfo](../guide/types.md#baseobject3dinfo)

### createContactShadows

创建接触阴影

#### 样例

<Docs-Iframe src="plugin/contactShadows.html" />

#### 定义

```ts
interface ContactShadowsInfo extends Omit<PluginObjectInfo, 'scale'> {
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

function createContactShadows(params: ContactShadowsInfo): PluginObject;
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

##### params

- **描述:** 配置
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** `ContactShadowsInfo`

##### ContactShadowsInfo

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
        prop: 'darkness', desc: '阴影的黑暗程度', type: 'number', require: false, default: '1'
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
interface WeatherInfo {
  imgUrl?: string;
  color?: IColor;
  size?: number;
  opacity?: number;
  count?: number;
  range?: number;
  velocityX?: [number, number];
  velocityY?: [number, number];
}

function openWeather(params?: WeatherInfo): void;
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

##### params

- **描述:** 配置
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** `WeatherInfo`

##### WeatherInfo

<Docs-Table 
    :data="[
      {
        prop: 'imgUrl', desc: '粒子贴图', type: 'string', require: false, default: '内置雨滴图',
      },
      {
         prop: 'color', desc: '粒子颜色', type: 'IColor', link: '../guide/types.html#icolor', require: false, default: '0xffffff',
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

### removeEffect

删除效果

#### 定义

```ts
function removeEffect(id: PluginObjectInfo['id']): boolean;
```

#### 用法

```js
effectPlugin.removeEffect('test');
```



### createParticleCluster

创建粒子簇

#### 样例

<Docs-Iframe src="plugin/particle.html" />

#### 定义

```ts
function createParticleCluster ( options: ParticleClusterOptions ):ParticleCluster
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

export interface CreateLineParticleClusterDataArrOptions<IVec extends IVector> extends CreatePointParticleClusterDataArrOptions<IVec> {
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
export type ParticleClusterGeometryOptions = CreatePointParticleClusterDataArrOptions<IVector3> & CreateLineParticleClusterDataArrOptions<IVector3> & CreateHeatParticleClusterDataArrOptions<IVector3> & Omit<ClusterGeometryOptions, "clusters"> & {
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
    addPoint(point: ParticleClusterFeaturePoint<IVector3>[] | ParticleClusterFeaturePoint<IVector3>, options?: Omit<ParticleClusterGeometryOptions, "points">): void;
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
    gradient: [[0, "#ff0000ff"],  [0.4, "#00ff00aa"], [0.9, "#0000ff77"]],
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
