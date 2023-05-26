# 场景操作

## setBackgroundColor

设置背景色

### 样例：

<Docs-Iframe src="sceneTool/backgroundColor.html" />

### 定义：

```ts
function setBackgroundColor(color: IColor): void;
```

### 用法：

```js
ssp.setBackgroundColor(0xff0000);
```

### 参数：

#### color

- **类型:** [IColor](../guide/types.html#icolor)
- **描述:** 颜色值
- **必填:** <Base-RequireIcon />

## setBackgroundColorAlpha

设置背景色（不透明度）

### 定义：

```ts
function setBackgroundColorAlpha(color: IColor, alpha?: number): void;
```

### 用法：

```js
ssp.setBackgroundColorAlpha(0xff0000, 0.5);
```

### 参数：

#### color

- **类型:** [IColor](../guide/types.html#icolor)
- **描述:** 颜色值
- **必填:** <Base-RequireIcon />

#### alpha

- **类型:** number
- **描述:** 不透明度
- **必填:** <Base-RequireIcon :isRequire="false" />，默认值为 1

## setBackgroundImage

设置背景图

### 样例：

<Docs-Iframe src="sceneTool/backgroundImage.html" />

### 定义：

```ts
function setBackgroundImage(imgUrl: string): Promise<void>;
```

### 用法：

```js
await ssp.setBackgroundImage('http://xx.com/xx.png');

console.log('背景图替换成功');
```

### 参数：

#### imgUrl

- **类型:** string
- **描述:** 图片路径
- **必填:** <Base-RequireIcon />

## setSphereSkyBackground

设置球体天空盒，球体天空盒的图片资源是一张全景图。( [HDR 天空盒模版资源下载](https://polyhaven.com/hdris) ) )

### 样例：

<Docs-Iframe src="sceneTool/sphereSkyBox.html" />

### 定义：

```ts
function setSphereSkyBackground(imgUrl: string): Promise<void>;
```

### 用法：

```js
await ssp.setSphereSkyBackground('http://xx.com/xx.png');

console.log('球体天空盒替换成功');
```

### 参数：

#### imgUrl

- **类型:** string
- **描述:** 图片路径。
- **必填:** <Base-RequireIcon />

## setSkyBackground

设置天空盒 ( [天空盒模版资源下载](../resource/skyBox.zip) )

### 样例：

<Docs-Iframe src="sceneTool/skyBox.html" />

### 定义：

```ts
function setSkyBackground(dirPath: string, fileNames: string[]): Promise<void>;
```

### 用法：

```js
await ssp.setSkyBackground(
  // 文件夹路径
  'http://www.xwbuilders.com:9018/soonspacejs/skybox/sunny/',
  // 有序的图片名集合
  ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']
);

console.log('天空盒替换成功');
```

### 参数：

#### dirPath

- **类型:** string
- **描述:** 图片文件夹路径。
- **必填:** <Base-RequireIcon />

#### fileNames

- **类型:** string[]
- **描述:** 六张图片的名称集合。
- **必填:** <Base-RequireIcon />

::: tip 提示
参数 `fileNames` 内的图片是有严格顺序的。依次为：

- 以空间坐标系为参考
  <br>
  x 轴正向（px）、x 轴负向（nx）、y 轴正向（py）、y 轴负向（ny）、z 轴正向（pz）、z 轴负向（nz）。
  <br>
  p -> positive、 n -> negative
- 以立方体盒子的六个面为参考
  <br>
  右（right）、左（left）、上（top）、下（bottom）、前（front）、后（back）。
  :::

## setColorSpace

设置场景的色彩空间

### 版本：

`v2.3.14`

### 样例：

<Docs-Iframe src="sceneTool/colorSpace.html" />

### 定义：

```ts
type ColorSpace = 'Linear' | 'sRGB'

setColorSpace(colorSpace: ColorSpace): void
```

### 用法：

```js
ssp.setColorSpace('Linear');
```

#### colorSpace

- **类型:** `ColorSpace`
- **描述:** 色彩值
- **必填:** <Base-RequireIcon :isRequire="false" />，默认值为 `sRGB`

## setToneMapping

设置场景色调

### 样例：

<Docs-Iframe src="sceneTool/toneMapping.html" />

### 定义：

```ts
interface ToneMappingOptions {
  type?: 'None' | 'Linear' | 'Reinhard' | 'Cineon' | 'ACESFilmic';
  exposure?: number;
}

setToneMapping(options?: ToneMappingOptions): void
```

### 用法：

```js
ssp.setToneMapping({ type: 'ACESFilmic', exposure: 0.8 });
```

#### options

- **类型:** `ToneMappingOptions`
- **描述:** 配置选项
- **必填:** <Base-RequireIcon :isRequire="false" />

##### ToneMappingOptions

<Docs-Table
:data="[
{ prop: 'type', desc: '色调类型', type: 'ToneMappingOptions[type]', require: false, default: 'ACESFilmic' },
{ prop: 'exposure', desc: '曝光度', type: 'number', require: false, default: 0.5 },
]"
/>

## setSky

设置天空

### 版本：

`v2.3.14`

### 样例：

<Docs-Iframe src="sceneTool/sky.html" />

### 定义：

```ts
interface SkyOptions {
  enabled?: boolean;
  position?: Position;
  scalar?: number;
  turbidity?: number;
  rayleigh?: number;
  elevation?: number;
  azimuth?: number;
  exposure?: number;
}

function setSky(options?: SkyOptions): Sky | undefined;
```

### 用法：

```js
ssp.setSky({
  enabled: true,
  position: { x: 0, y: 0, z: 0 },
  scalar: 450000,
  turbidity: 10,
  rayleigh: 3,
  elevation: 2,
  azimuth: 180,
  exposure: 0.5,
});
```

#### options

- **类型:** `SkyOptions`
- **描述:** 配置选项
- **必填:** <Base-RequireIcon :isRequire="false" />

##### SkyOptions

<Docs-Table
    :data="[
      { prop: 'enabled', desc: '是否开启天空', type: 'boolean', require: false, default: 'true' },
      { prop: 'position', desc: '天空位置', type: 'Position', require: false, default: { x: 0, y: 0, z: 0 }, link: '../guide/types.html#position' },
      { prop: 'scalar', desc: '天空范围', type: 'number', require: false, default: 450000 },
      { prop: 'turbidity', desc: '太阳浑浊度', type: 'number', require: false, default: 10 },
      { prop: 'rayleigh', desc: '太阳雷利值', type: 'number', require: false, default: 3 },
      { prop: 'elevation', desc: '太阳海拔', type: 'number', require: false, default: 2 },
      { prop: 'azimuth', desc: '太阳方位', type: 'number', require: false, default: 180 },
      { prop: 'exposure', desc: '曝光度', type: 'number', require: false, default: 0.5 },
    ]"
/>

## setSSR

设置空间反射

### 样例：

<Docs-Iframe src="sceneTool/SSR.html" />

### 定义：

```ts
interface SSROptions {
  enabled?: boolean;
  intensity?: number;
  exponent?: number;
  distance?: number;
  fade?: number;
  roughnessFade?: number;
  thickness?: number;
  ior?: number;
  maxRoughness?: number;
  maxDepthDifference?: number;
  blend?: number;
  correction?: number;
  correctionRadius?: number;
  blur?: number;
  blurKernel?: number;
  blurSharpness?: number;
  jitter?: number;
  jitterRoughness?: number;
  steps?: number;
  refineSteps?: number;
  missedRays?: boolean;
  useNormalMap?: boolean;
  useRoughnessMap?: boolean;
  resolutionScale?: number;
  velocityResolutionScale?: number;
}

function setSSR(options?: SSROptions): void;
```

### 用法：

```js
ssp.setSSR({
  enabled: true,
  intensity: 1,
  thickness: 5,
  distance: 10,
  steps: 10,
  refineSteps: 8,
  maxRoughness: 0.1,
  blend: 1,
  maxDepthDifference: 40,
  blur: 1,
  fade: 0.1,
  jitter: 0,
});
```

### 参数:

#### options

- **类型:** `SSROptions`
- **描述:** 配置选项
- **必填:** <Base-RequireIcon :isRequire="false" />

##### SSROptions

<Docs-Table
    :data="[
      { prop: 'enabled', desc: '是否开启', type: 'boolean', require: false, default: 'true' },
      { prop: 'intensity', desc: '强度', type: 'number', require: false, default: '1' },
      { prop: 'exponent', desc: '增强指数', type: 'number', require: false, default: '1.75' },
      { prop: 'distance', desc: '反射到达的最远距离', type: 'number', require: false, default: '20' },
      { prop: 'fade', desc: '淡出的距离', type: 'number', require: false, default: '0' },
      { prop: 'roughnessFade', desc: '粗糙点的反射强度', type: 'number', require: false, default: '1' },
      { prop: 'thickness', desc: '反射浓度', type: 'number', require: false, default: '3.5' },
      { prop: 'ior', desc: '折射率', type: 'number', require: false, default: '1.75' },
      { prop: 'maxRoughness', desc: '材质的最大粗糙度', type: 'number', require: false, default: '0.1' },
      { prop: 'maxDepthDifference', desc: '最大深度差', type: 'number', require: false, default: '20' },
      { prop: 'blend', desc: '混合度[0-1]', type: 'number', require: false, default: '0.95' },
      { prop: 'correction', desc: '像素校正', type: 'number', require: false, default: '1' },
      { prop: 'correctionRadius', desc: '像素校正半径', type: 'number', require: false, default: '1' },
      { prop: 'blur', desc: '模糊', type: 'number', require: false, default: '1' },
      { prop: 'blurKernel', desc: '模糊滤镜大小', type: 'number', require: false, default: '1' },
      { prop: 'blurSharpness', desc: '模糊指数', type: 'number', require: false, default: '10' },
      { prop: 'jitter', desc: '反射抖动', type: 'number', require: false, default: '0' },
      { prop: 'jitterRoughness', desc: '反射抖动的材质粗糙度', type: 'number', require: false, default: '2' },
      { prop: 'steps', desc: '查找的反射相交步数', type: 'number', require: false, default: '20' },
      { prop: 'refineSteps', desc: '精确查找', type: 'number', require: false, default: '10' },
      { prop: 'missedRays', desc: '查找不到时，拉伸反射', type: 'boolean', require: false, default: 'false' },
      { prop: 'useNormalMap', desc: '是否计算法线贴图', type: 'boolean', require: false, default: 'true' },
      { prop: 'useRoughnessMap', desc: '是否计算粗糙贴图', type: 'boolean', require: false, default: 'true' },
      { prop: 'resolutionScale', desc: '分辨率', type: 'number', require: false, default: '1' },
      { prop: 'velocityResolutionScale', desc: '速度分辨率', type: 'number', require: false, default: '1' },
    ]"
/>

## setBloom

设置泛光

### 样例：

<Docs-Iframe src="sceneTool/bloom.html" />

### 定义：

```ts
interface BloomOptions {
  enabled?: boolean;
  mipmapBlur?: boolean;
  radius?: number;
  intensity?: number;
  threshold?: number;
  smoothing?: number;
  scalar?: number;
  opacity?: number;
  selection?: Object3D[];
}

function setBloom(options?: BloomOptions): void;
```

### 用法：

```js
ssp.setBloom({
  enabled: true,
  threshold: 0.1,
  intensity: 2,
  radius: 0.1,
  opacity: 1,
});
```

### 参数:

#### options

- **类型:** `BloomOptions`
- **描述:** 配置选项
- **必填:** <Base-RequireIcon :isRequire="false" />

##### BloomOptions

<Docs-Table
    :data="[
      { prop: 'enabled', desc: '是否开启', type: 'boolean', require: false, default: 'true' },
      { prop: 'mipmapBlur', desc: '是否开启 mipmap 模糊', type: 'boolean', require: false, default: 'true' },
      { prop: 'radius', desc: 'mipmap 模糊半径', type: 'number', require: false, default: '0.85' },
      { prop: 'intensity', desc: '泛光强度', type: 'number', require: false, default: '3' },
      { prop: 'threshold', desc: '泛光阈值（颜色）', type: 'number', require: false, default: '1' },
      { prop: 'smoothing', desc: '泛光的平滑度', type: 'number', require: false, default: '0' },
      { prop: 'scalar', desc: '配合 `selection` 使用，选中的材质颜色会乘以 `scalar` 使色值超出 `threshold`', type: 'number', require: false, default: '2' },
      { prop: 'opacity', desc: '泛光的不透明度', type: 'number', require: false, default: '1' },
      { prop: 'selection', desc: '选中的泛光对象', type: 'Object3D[]', require: false, default: '[]' },
    ]"
/>

## setSSAO

设置环境光遮蔽

### 样例：

<Docs-Iframe src="sceneTool/SSAO.html" />

### 定义：

```ts
interface SSAOOptions {
  enabled?: boolean;
  aoRadius?: number;
  distanceFalloff?: number;
  intensity?: number;
  aoSamples?: number;
  denoiseSamples?: number;
  denoiseRadius?: number;
  color?: IColor;
}

setSSAO(options?: SSAOOptions): void
```

### 用法：

```js
ssp.setSSAO({
  enabled: true,
  aoSamples: 8,
  intensity: 3,
});
```

### 参数:

#### options

- **类型:** `SSAOOptions`
- **描述:** 配置选项
- **必填:** <Base-RequireIcon :isRequire="false" />

##### SSAOOptions

<Docs-Table
    :data="[
      { prop: 'enabled', desc: '是否开启', type: 'boolean', require: false, default: 'true' },
      { prop: 'aoRadius', desc: 'AO 半径', type: 'number', require: false, default: '5' },
      { prop: 'aoSamples', desc: 'AO 采样数量', type: 'number', require: false, default: '16' },
      { prop: 'denoiseSamples', desc: '降噪采样数量', type: 'number', require: false, default: '4' },
      { prop: 'denoiseRadius', desc: '降噪采样半径', type: 'number', require: false, default: '12' },
      { prop: 'distanceFalloff', desc: '遮挡阴影的消失距离，通常是半径的1/5', type: 'number', require: false, default: '1' },
      { prop: 'intensity', desc: 'AO 强度', type: 'number', require: false, default: '5' },
      { prop: 'color', desc: 'AO 颜色', type: 'IColor', require: false, default: '#333' },
    ]"
/>

_推荐配置表_
| 质量 | aoSamples | denoiseSamples | denoiseRadius | 适用终端
|:---:|:---:|:---:|:---:|:---:|
| 高性能模式 (不稳定，有部分噪点) | 8 | 4 | 12 | 移动端，集成显卡，笔记本 |
| 低 (暂时稳定，有低频噪点) | 16 | 4 | 12 | 高端移动机型，集成显卡，笔记本 |
| 中等 (暂时稳定，几乎没有噪点) | 16 | 8 | 12 | 高端移动机型，笔记本，桌面设备 |
| 高 (更清晰的 AO，几乎没有噪点) | 64 | 8 | 6 | 桌面端，独立显卡 |
| 极高 (没有噪点) | 64 | 16 | 6 | 桌面端，独立显卡 |

## setEnvironment

设置场景环境反射

### 版本：

`v2.3.12`

### 样例：

<Docs-Iframe src="sceneTool/environment.html" />

### 定义：

```ts
interface GetTextureOptions {
  path?: string;
  file: string | string[];
}

interface EnvironmentOptions extends GetTextureOptions {
  background?: boolean;
}

setEnvironment(options?: EnvironmentOptions): Promise<THREE.Texture>
```

### 用法：

```js
/**
 * 设置默认环境
 */
ssp.setEnvironment();

// or
ssp.setEnvironment({ file: './xxx.hdr', background: true });

// or
ssp.setEnvironment({
  path: './imgs/',
  file: ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'],
  background: true,
});
```

### 参数:

#### options

- **类型:** `EnvironmentOptions`
- **描述:** 配置选项
- **必填:** <Base-RequireIcon :isRequire="false" />

##### EnvironmentOptions

<Docs-Table
    :data="[
      { prop: 'path', desc: '基础路径', type: 'string', require: false, default: '' },
      { prop: 'file', desc: '文件路径', type: 'string | string[]', require: true, default: '' },
      { prop: 'background', desc: '是否同步至背景', type: 'boolean', require: false, default: false },
    ]"
/>

## openSceneFog

开启场景雾化

### 样例：

<Docs-Iframe src="sceneTool/fog.html" />

### 定义:

```ts
interface FogOptions {
  color?: IColor;
  near?: number;
  far?: number;
}

function openSceneFog(options?: FogOptions): void;
```

### 用法:

```js
ssp.openSceneFog({ color: '0xcce0ff', near: 1, far: 1000 });
```

### 参数:

#### options

- **类型:** [FogOptions](#fogoptions)
- **描述:** 配置选项
- **必填:** <Base-RequireIcon :isRequire="false" />

##### FogOptions

<Docs-Table
    :data="[
      { prop: 'color', desc: '颜色', type: 'IColor', require: false, default: '0xcce0ff', link: '../guide/types.html#icolor'},
      { prop: 'near', desc: '起始位置(距离相机)', type: 'number', require: false, default: 500 },
      { prop: 'far', desc: '结束位置(距离相机)', type: 'number', require: false, default: 50000 },
    ]"
/>

## closeSceneFog

关闭场景雾化

### 定义:

```ts
function closeSceneFog(): void;
```

### 用法:

```js
ssp.closeSceneFog();
```

## screenshot

截取场景快照

### 定义:

```ts
function screenshot(): Promise<Blob | null>;
```

### 用法:

```js
ssp.screenshot().then((blob) => {
  const newImg = document.createElement('img');
  const url = URL.createObjectURL(blob);

  newImg.onload = () => {
    URL.revokeObjectURL(url);
  };

  newImg.src = url;
});
```

## getObjectLabelPos

获取对象的标签位置坐标

### 定义:

```ts
interface LabelOptions {
  mode?: 'scene' | 'screen';
  extendScale?: number;
}

function getObjectLabelPos(
  object: BaseObject3D,
  viewpoint?: FlyToViewpoint;
  options?: LabelOptions
): Position;
```

### 用法:

```js
ssp.getObjectLabelPos(object, 'front', { mode: 'scene', extendScale: 1.6 });
```

### 参数:

#### object

- **类型:** BaseObject3D
- **描述:** 模型对象
- **必填:** <Base-RequireIcon />

#### viewpoint

- **类型:** [FlyToViewpoint](../guide/types.html#flytoviewpoint)
- **描述:** 相对模型视角枚举
- **必填:** <Base-RequireIcon :isRequire="false"/>

#### options

- **类型:** LabelOptions
- **描述:** 配置选项
- **必填:** <Base-RequireIcon :isRequire="false" />

#### LabelOptions

<Docs-Table
    :data="[
      { prop: 'mode', desc: '相对于谁', type: 'scene | screen', require: false, default: 'scene'},
      { prop: 'extendScale', desc: '延伸比例', type: 'number', require: false, default: 1.6 },
    ]"
/>

## getOffsetByPosition

通过空间坐标点获取屏幕坐标点

### 定义:

```ts
function getOffsetByPosition(position: Position): { left: number; top: number };
```

### 用法:

```js
ssp.getOffsetByPosition({ x: 100, y: 200, z: 300 });
```

### 参数:

#### position

- **类型:** [Position](../guide/types.html#position)
- **描述:** 空间坐标
- **必填:** <Base-RequireIcon />

## getPositionByOffset

通过屏幕坐标点获取空间坐标点

### 定义:

```ts
function getPositionByOffset(offset: OffsetPoint, z?: number): Vector3;
```

### 用法:

```js
ssp.getPositionByOffset({ offsetX: 10, offsetY: 10 });
```

### 参数:

#### offset

- **类型:** [OffsetPoint](../guide/types.html#offsetpoint)
- **描述:** 偏移量
- **必填:** <Base-RequireIcon />

#### z

- **类型:** number
- **描述:** z 轴, 默认值 0.1
- **必填:** <Base-RequireIcon :isRequire="false" />

## addObject

添加对象

### 定义:

```ts
function addObject(object: Object3D, parent?: Object3D): void;
```

### 用法:

```js
ssp.addObject(object);

// or

const group = ssp.createGroup({
  id: 'group',
});

ssp.addObject(object, group);
```

### 参数:

#### object

- **类型:** Object3D
- **描述:** 要添加的空间对象
- **必填:** <Base-RequireIcon />

#### parent

- **类型:** Object3D
- **描述:** 被添加对象的父级, 默认为整个场景
- **必填:** <Base-RequireIcon :isRequire="false" />

## removeObject

移除对象

### 定义:

```ts
function removeObject(object: Object3D): void;
```

### 用法:

```js
ssp.removeObject(object);

// or

const model = ssp.getObjectById('xxx_model');

ssp.removeObject(model);
```

### 参数:

#### object

- **类型:** Object3D
- **描述:** 要移除的空间对象
- **必填:** <Base-RequireIcon />

## setHoverEnabled

设置开启鼠标悬浮

### 定义:

```ts
function setHoverEnabled(enabled: boolean): void;
```

### 用法:

```js
ssp.setHoverEnabled(true);
```

### 参数:

#### object

- **类型:** boolean
- **描述:** 是否开启
- **必填:** <Base-RequireIcon />

## render

手动渲染一次场景

### 定义:

```ts
function render(fn?: () => void): Promise<void>;
```

### 用法:

```js
// 用法一
model.position.x = 1000;
ssp.render().then(() => {
  console.log('场景渲染完成');
});

// 用法二
ssp
  .render(() => {
    model.position.x = 1000;
  })
  .then(() => {
    console.log('场景渲染完成');
  });

// 用法三
ssp
  .render(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        model.position.x = 1000;
        resolve();
      }, 3000);
    });
  })
  .then(() => {
    console.log('场景渲染完成');
  });
```

### 参数:

#### fn

- **类型:** () => void
- **描述:** 在渲染之前执行
- **必填:** <Base-RequireIcon :isRequire="false"/>

::: tip 提示
fn 函数可以返回一个 Promise, 场景会在 fn 返回结果之后渲染
:::

## clearObject

清除除灯光外所有对象

### 定义:

```ts
function clearObject(): void;
```

### 用法:

```js
ssp.clearObject();
```

## clearSignals

清除事件信号监听

### 定义:

```ts
function clearSignals(): void;
```

### 用法:

```js
ssp.clearSignals();
```

## clear

清除所有对象

### 定义:

```ts
function clear(): void;
```

### 用法:

```js
ssp.clear();
```

## dispose

销毁场景

### 定义:

```ts
function dispose(): void;
```

### 用法:

```js
ssp.dispose();
```

:::tip 提示
`dispose` 常用于 react、vue 等组件的生命周期卸载阶段

例如在 react 中

```js
useEffect(() => {
  const ssp = new SoonSpace({
    ...
  })

  return () => {
    ssp.dispose()
  };
}, []);
```

:::
