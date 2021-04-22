# 灯光

::: tip 提示
`soonspacejs` 内部会在初始化时分别创建一个环境光、平行光、半球光。

`id` 依次是 `defaultAmbientLight`、`defaultDirectionalLight`、`defaultHemiLight`。
:::

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
      { prop: 'color', desc: '颜色', type: 'IColor', require: false, default: '0x9a9a9a', link: '../guide/types.html#icolor' },
      { prop: 'intensity', desc: '光照强度', type: 'number', require: false, default: '1' },
    ]"
/>

## createDirectionalLight

创建平行光

### 定义：

```ts
interface DirectionalLightOptions extends BaseLightInfo {
  position?: Position;
  target?: Position;
  openShadow?: boolean;
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
      { prop: 'color', desc: '颜色', type: 'IColor', require: false, default: '0xffffff', link: '../guide/types.html#icolor' },
      { prop: 'intensity', desc: '光照强度', type: 'number', require: false, default: '1' },
      { prop: 'position', desc: '光源的位置', type: 'Position', require: false, default: '{ x: 0, y: 1000, z: 0 }', link: '../guide/types.html#icolor'  },
      { prop: 'target', desc: '光照向的位置', type: 'Position', require: false, default: '{ x: 0, y: -100, z: 0 }', link: '../guide/types.html#icolor'  },
      { prop: 'openShadow', desc: '是否开启阴影', type: 'boolean', require: false, default: 'false'},
    ]"
/>

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
      { prop: 'intensity', desc: '光照强度', type: 'number', require: false, default: '1' },
      { prop: 'skyColor', desc: '天空颜色', type: 'IColor', require: false, default: '0xffffff', link: '../guide/types.html#icolor' },
      { prop: 'groundColor', desc: '地面颜色', type: 'IColor', require: false, default: '0xdddddd', link: '../guide/types.html#icolor' },
      { prop: 'position', desc: '光的朝向位置', type: 'Position', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types.html#position'  },
    ]"
/>

## createSpotLight

创建聚光灯

### 定义：

```ts
interface SpotLightOptions extends BaseLightInfo {
  angle?: number;
  position?: Position;
  target?: Position;
  openShadow?: boolean;
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
      { prop: 'color', desc: '颜色', type: 'IColor', require: false, default: '0xffffff', link: '../guide/types.html#icolor' },
      { prop: 'intensity', desc: '光照强度', type: 'number', require: false, default: '1' },
      { prop: 'angle', desc: '光照方向扩散的角度（最大值为90）', type: 'number', require: false, default: '45' },
      { prop: 'position', desc: '光源的位置', type: 'Position', require: false, default: '{ x: 0, y: 500, z: 0 }', link: '../guide/types.html#position' },
      { prop: 'target', desc: '光照向的位置', type: 'Position', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types.html#position' },
      { prop: 'openShadow', desc: '是否开启阴影', type: 'boolean', require: false, default: 'false'},
    ]"
/>
