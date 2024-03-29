# 灯光

::: tip 提示
v2.4.0 之后内部已经不在创建额外的灯光，控制场景的明亮度推荐使用 [`setToneMapping`](./sceneTool#settonemapping) 控制
:::

### 样例：

<Docs-Iframe src="light/setLight.html" />

## createAmbientLight

创建环境光

### 定义：

```ts
interface BaseLightInfo {
  id: string | number;
  name?: string;
  color?: IColor;
  intensity?: number;
}

interface AmbientLightOptions extends BaseLightInfo {}

function createAmbientLight(options: AmbientLightOptions): THREE.AmbientLight;
```

### 用法：

```js
ssp.createAmbientLight({
  id: 'ambientLight',
  name: 'ambientLight',
});
```

### 参数：

#### options

- **描述:** 环境光配置项
- **必填:** <Base-RequireIcon :isRequire="true" />
- **类型:** AmbientLightOptions

##### AmbientLightOptions

<Docs-Table
    :data="[
      { prop: 'id', desc: '唯一ID', type: 'string | number', require: true, default: '' },
      { prop: 'name', desc: '名称', type: 'string', require: false, default: '' },
      { prop: 'color', desc: '颜色', type: 'IColor', require: false, default: '0x9a9a9a', link: '../guide/types#icolor' },
      { prop: 'intensity', desc: '光照强度', type: 'number', require: false, default: '10' },
    ]"
/>

## setAmbientLight

设置环境光

### 定义：

```ts
function setAmbientLight(options: AmbientLightOptions): boolean;
```

### 用法：

```js
const isUpdated = ssp.setAmbientLight({
  id: 'ambientLight',
  color: 0x8a8a8a,
  intensity: 0.5,
});
if (isUpdated) {
  console.log('环境光配置更新成功');
}
```

::: tip 提示
`setAmbientLight` 与 `createAmbientLight` 的 `options` 完全一致。

`setAmbientLight` 用于更新场景已存在的光的配置，`createAmbientLight` 用于创建一个光。
:::

## createDirectionalLight

创建平行光

### 定义：

```ts
interface ShadowOptions {
  openShadow?: boolean;
  shadowAutoUpdate?: boolean;
  mapSize?: number;
}

interface DirectionalLightOptions extends BaseLightInfo, ShadowOptions {
  position?: Position;
  target?: Position;
}

function createDirectionalLight(
  options: DirectionalLightOptions
): THREE.DirectionalLight;
```

### 用法：

```js
ssp.createDirectionalLight({
  id: 'directionalLight',
  name: 'directionalLight',
});
```

### 参数：

#### options

- **描述:** 平行光配置项
- **必填:** <Base-RequireIcon :isRequire="true" />
- **类型:** DirectionalLightOptions

#### DirectionalLightOptions

<Docs-Table
    :data="[
      { prop: 'id', desc: '唯一ID', type: 'string | number', require: true, default: '' },
      { prop: 'name', desc: '名称', type: 'string', require: false, default: '' },
      { prop: 'color', desc: '颜色', type: 'IColor', require: false, default: '0xffffff', link: '../guide/types#icolor' },
      { prop: 'intensity', desc: '光照强度', type: 'number', require: false, default: '10' },
      { prop: 'position', desc: '光源的位置', type: 'Position', require: false, default: '{ x: 0, y: 1000, z: 0 }', link: '../guide/types#icolor'  },
      { prop: 'target', desc: '光照向的位置', type: 'Position', require: false, default: '{ x: 0, y: -100, z: 0 }', link: '../guide/types#icolor'  },
      { prop: 'openShadow', desc: '是否开启阴影', type: 'boolean', require: false, default: 'false'},
      { prop: 'shadowAutoUpdate', desc: '阴影是否自动更新，如果为 `false` 需要调用 `updateAllShadow` 来更新阴影', type: 'boolean', require: false, default: 'false'},
      { prop: 'mapSize', desc: '阴影的贴图区域大小。值越大，阴影质量越好。但也会增加性能损耗', type: 'number', require: false, default: '4096'},
    ]"
/>

::: tip 提示
开启光源的阴影时，默认是静态的阴影。需要手动调用 [updateAllShadow](#updateallshadow) 来更新阴影。

按需生成阴影，这样可以大大提升开启阴影时的场景性能。
:::

## setDirectionalLight

设置平行光

### 定义：

```ts
function setDirectionalLight(options: DirectionalLightOptions): boolean;
```

### 用法：

```js
const isUpdated = ssp.setDirectionalLight({
  id: 'directionalLight',
  color: 0x8a8a8a,
  intensity: 0.5,
});
if (isUpdated) {
  console.log('平行光配置更新成功');
}
```

## createHemisphereLight

创建半球光

### 定义：

```ts
interface HemisphereLightOptions extends BaseLightInfo {
  skyColor?: IColor;
  groundColor?: IColor;
  position?: Position;
}

function createHemisphereLight(
  options: HemisphereLightOptions
): THREE.HemisphereLight;
```

### 用法：

```js
ssp.createHemisphereLight({
  id: 'hemiLight',
  name: 'hemiLight',
  intensity: 0.1,
});
```

### 参数：

#### options

- **描述:** 半球光配置项
- **必填:** <Base-RequireIcon :isRequire="true" />
- **类型:** HemisphereLightOptions

##### HemisphereLightOptions

<Docs-Table
    :data="[
      { prop: 'id', desc: '唯一ID', type: 'string | number', require: true, default: '' },
      { prop: 'name', desc: '名称', type: 'string', require: false, default: '' },
      { prop: 'intensity', desc: '光照强度', type: 'number', require: false, default: '10' },
      { prop: 'skyColor', desc: '天空颜色', type: 'IColor', require: false, default: '0xffffff', link: '../guide/types#icolor' },
      { prop: 'groundColor', desc: '地面颜色', type: 'IColor', require: false, default: '0xdddddd', link: '../guide/types#icolor' },
      { prop: 'position', desc: '光的朝向位置', type: 'Position', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types#position'  },
    ]"
/>

## setHemisphereLight

设置半球光

### 定义：

```ts
function setHemisphereLight(options: HemisphereLightOptions): boolean;
```

### 用法：

```js
const isUpdated = ssp.setHemisphereLight({
  id: 'hemiLight',
  color: 0x8a8a8a,
  intensity: 0.5,
});
if (isUpdated) {
  console.log('半球光配置更新成功');
}
```

## createSpotLight

创建聚光灯

### 定义：

```ts
interface SpotLightOptions extends BaseLightInfo, ShadowOptions {
  angle?: number;
  position?: Position;
  target?: Position;
}

function createSpotLight(options: SpotLightOptions): THREE.SpotLight;
```

### 用法：

```js
ssp.createSpotLight({
  id: 'spotLight',
  name: 'spotLight',
});
```

### 参数：

#### options

- **描述:** 聚光灯配置项
- **必填:** <Base-RequireIcon :isRequire="true" />
- **类型:** SpotLightOptions

##### SpotLightOptions

<Docs-Table
    :data="[
      { prop: 'id', desc: '唯一ID', type: 'string | number', require: true, default: '' },
      { prop: 'name', desc: '名称', type: 'string', require: false, default: '' },
      { prop: 'color', desc: '颜色', type: 'IColor', require: false, default: '0xffffff', link: '../guide/types#icolor' },
      { prop: 'intensity', desc: '光照强度', type: 'number', require: false, default: '10' },
      { prop: 'angle', desc: '光照方向扩散的角度（最大值为180）', type: 'number', require: false, default: '45' },
      { prop: 'position', desc: '光源的位置', type: 'Position', require: false, default: '{ x: 0, y: 500, z: 0 }', link: '../guide/types#position' },
      { prop: 'target', desc: '光照向的位置', type: 'Position', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types#position' },
      { prop: 'openShadow', desc: '是否开启阴影', type: 'boolean', require: false, default: 'false'},
      { prop: 'shadowAutoUpdate', desc: '阴影是否自动更新，如果为 `false` 需要调用 `updateAllShadow` 来更新阴影', type: 'boolean', require: false, default: 'false'},
      { prop: 'mapSize', desc: '阴影的贴图区域大小。值越大，阴影质量越好。但也会增加性能损耗', type: 'number', require: false, default: '4096'},
    ]"
/>

## setSpotLight

设置半球光

### 定义：

```ts
function setSpotLight(options: SpotLightOptions): boolean;
```

### 用法：

```js
const isUpdated = ssp.setSpotLight({
  id: 'spotLight',
  color: 0x8a8a8a,
  intensity: 0.5,
});
if (isUpdated) {
  console.log('聚光灯配置更新成功');
}
```

## createPointLight

创建点光源

### 定义：

```ts
interface PointLightOptions extends BaseLightInfo, ShadowOptions {
  position?: Position;
  distance?: number;
}

function createPointLight(options: PointLightOptions): THREE.PointLight;
```

### 用法：

```js
ssp.createPointLight({ id: 'pointLight', name: 'pointLight' });
```

### 参数：

#### options

- **描述:** 点光源配置项
- **必填:** <Base-RequireIcon :isRequire="true" />
- **类型:** PointLightOptions

##### PointLightOptions

<Docs-Table
    :data="[
      { prop: 'id', desc: '唯一ID', type: 'string | number', require: true, default: '' },
      { prop: 'name', desc: '名称', type: 'string', require: false, default: '' },
      { prop: 'color', desc: '颜色', type: 'IColor', require: false, default: '0xffffff', link: '../guide/types#icolor' },
      { prop: 'intensity', desc: '光照强度', type: 'number', require: false, default: '10' },
      { prop: 'position', desc: '光源的位置', type: 'Position', require: false, default: '{ x: 0, y: 500, z: 0 }', link: '../guide/types#position' },
      { prop: 'distance', desc: '光照范围', type: 'number', require: false, default: '5000' },
      { prop: 'openShadow', desc: '是否开启阴影', type: 'boolean', require: false, default: 'false'},
      { prop: 'shadowAutoUpdate', desc: '阴影是否自动更新，如果为 `false` 需要调用 `updateAllShadow` 来更新阴影', type: 'boolean', require: false, default: 'false'},
      { prop: 'mapSize', desc: '阴影的贴图区域大小。值越大，阴影质量越好。但也会增加性能损耗', type: 'number', require: false, default: '4096'},
    ]"
/>

## setPointLight

设置点光源

### 定义：

```ts
function setPointLight(options: PointLightOptions): boolean;
```

### 用法：

```js
const isUpdated = ssp.setPointLight({
  id: 'pointLight',
  color: 0x8a8a8a,
  intensity: 0.5,
});
if (isUpdated) {
  console.log('点光源配置更新成功');
}
```

## createRectAreaLight

创建矩形区域光源

### 样例：

<Docs-Iframe src="light/rectAreaLight.html" />

### 定义：

```ts
interface RectAreaLightOptions extends BaseLightInfo {
  position?: Position;
  width?: number;
  height?: number;
}

function createRectAreaLight(
  options: RectAreaLightOptions
): THREE.RectAreaLight;
```

### 用法：

```js
ssp.createRectAreaLight({
  id: 'rectAreaLight',
  name: 'rectAreaLight',
  intensity: 0.8,
  color: 0xffff00,
  width: 20,
  height: 50,
  position: {
    x: 0,
    y: 0,
    z: -10,
  },
});
```

### 参数：

#### options

- **描述:** 矩形区域光源配置项
- **必填:** <Base-RequireIcon :isRequire="true" />
- **类型:** RectAreaLightOptions

##### RectAreaLightOptions

<Docs-Table
    :data="[
      { prop: 'id', desc: '唯一ID', type: 'string | number', require: true, default: '' },
      { prop: 'name', desc: '名称', type: 'string', require: false, default: '' },
      { prop: 'color', desc: '颜色', type: 'IColor', require: false, default: '0xffffff', link: '../guide/types#icolor' },
      { prop: 'intensity', desc: '光照强度', type: 'number', require: false, default: '10' },
      { prop: 'width', desc: '矩形区域的宽度', type: 'number', require: false, default: '10' },
      { prop: 'height', desc: '矩形区域的高度', type: 'number', require: false, default: '10' },
      { prop: 'position', desc: '光源的位置', type: 'Position', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types#position' },
    ]"
/>

## setRectAreaLight

设置矩形区域光源

### 定义：

```ts
function setRectAreaLight(options: RectAreaLightOptions): boolean;
```

### 用法：

```js
const isUpdated = ssp.setRectAreaLight({
  id: 'rectAreaLight',
  color: 0x693333,
  intensity: 2,
  width: 20,
  height: 30,
});
if (isUpdated) {
  console.log('矩形区域光源配置更新成功');
}
```

## getLightById

根据 id 查询 Light 对象

### 定义：

```ts
function getLightById<T extends Light>(id: BaseObject3DInfo['id']): T | null;
```

### 用法：

```js
const pointLight = ssp.getLightById('pointLight');
```

## removeLightById

根据 id 移除 Light 对象

### 定义：

```ts
function removeLightById(id: BaseObject3DInfo['id']): boolean;
```

### 用法：

```js
const isRemoved = ssp.removeLightById('pointLight');
if (isRemoved) {
  console.log('灯光移除成功！！！');
}
```

## clearLight

清空 Light 对象

### 定义：

```ts
function clearLight(): void;
```

### 用法：

```js
ssp.clearLight();
```

## showAllLight

显示所有光

### 定义：

```ts
function showAllLight(): void;
```

### 用法：

```js
ssp.showAllLight();
```

## hideAllLight

隐藏所有光

### 定义：

```ts
function hideAllLight(): void;
```

### 用法：

```js
ssp.hideAllLight();
```

## updateAllShadow

更新所有光源的阴影

### 定义：

```ts
function updateAllShadow(): void;
```

### 用法：

```js
ssp.updateAllShadow();
```
