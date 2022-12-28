# 辅助器

## addAxesHelper

添加坐标轴辅助器

### 样例：

<Docs-Iframe src="helper/addHelper.html" />

### 定义：

```ts
interface AxesHelperOptions extends BaseHelperOptions {
  axesLength?: number;
}

function addAxesHelper(options: AxesHelperOptions): AxesHelper;
```

### 用法：

```js
ssp.addAxesHelper({
  id: 'test_axesHelper',
  axesLength: 1000,
});
```

### 参数：

#### options

- **描述:** 可配置项
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** AxesHelperOptions

##### AxesHelperOptions

<Docs-Table 
    :data="[
      { prop: 'id', desc: '唯一 ID', type: 'string', require: true, default: '' },
      { prop: 'axesLength', desc: '轴线长度', type: 'number', require: false, default: '1000' },
    ]"
/>

## addGridHelper

添加网格辅助器

### 定义：

```ts
interface GridHelperOptions extends BaseHelperOptions {
  size?: number;
  divisions?: number;
  color?: IColor;
  position?: Position;
  rotation?: Rotation;
  scale?: Scale;
}

function addGridHelper(options: GridHelperOptions): GridHelper;
```

### 用法：

```js
ssp.addGridHelper({
  id: 'test_gridHelper',
  size: 1000,
  divisions: 20,
  color: '#fff',
});
```

#### options

- **描述:** 可配置项
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** GridHelperOptions

##### GridHelperOptions

<Docs-Table 
    :data="[
      { prop: 'id', desc: '唯一 ID', type: 'string', require: true, default: '' },
      { prop: 'size', desc: '网格尺寸', type: 'number', require: false, default: '1000' },
      { prop: 'divisions', desc: '网格横纵向分割格数', type: 'number', require: false, default: '20' },
      { prop: 'color', desc: '网格颜色', type: 'IColor', require: false, default: '#ffffff', link: '../guide/types.html#icolor' },
      { prop: 'position', desc: '空间位置', type: 'Position', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types.html#position' },
      { prop: 'rotation', desc: '空间旋转弧度', type: 'Rotation', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types.html#rotation' },
      { prop: 'scale', desc: '缩放比', type: 'Scale', require: false, default: '{ x: 1, y: 1, z: 1 }', link: '../guide/types.html#scale' },
    ]"
/>

## addPlaneHelper

添加面辅助器

### 定义：

```ts
interface PlaneHelperOptions extends BaseHelperOptions {
  width?: number;
  height?: number;
  color?: IColor;
  opacity?: number;
  position?: Position;
  rotation?: Rotation;
  scale?: Scale;
}

function addPlaneHelper(options: PlaneHelperOptions): BaseMesh;
```

### 用法：

```js
ssp.addPlaneHelper({
  id: 'test_planeHelper',
  width: 500,
  height: 500,
  color: '#00ff00',
  opacity: 0.2,
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
});
```

### 参数：

#### options

- **描述:** 可配置项
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** PlaneHelperOptions

##### PlaneHelperOptions

<Docs-Table 
    :data="[
      { prop: 'id', desc: '唯一 ID', type: 'string', require: true, default: '' },
      { prop: 'width', desc: '宽度', type: 'number', require: false, default: '500' },
      { prop: 'height', desc: '高度', type: 'number', require: false, default: '500' },
      { prop: 'color', desc: '颜色', type: 'IColor', require: false, default: '#00ff00', link: '../guide/types.html#icolor' },
      { prop: 'opacity', desc: '不透明度', type: 'number', require: false, default: '0.2' },
      { prop: 'position', desc: '空间位置', type: 'Position', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types.html#position' },
      { prop: 'rotation', desc: '空间旋转弧度', type: 'Rotation', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types.html#rotation' },
      { prop: 'scale', desc: '缩放比', type: 'Scale', require: false, default: '{ x: 1, y: 1, z: 1 }', link: '../guide/types.html#scale' },
    ]"
/>

## addBoxHelper

添加包围盒辅助器

### 定义：

```ts
interface BoxHelperOptions extends BaseHelperOptions {
  box: Box3;
  color?: IColor;
}

function addBoxHelper(options: BoxHelperOptions): Box3Helper;
```

### 用法：

```js
ssp.addBoxHelper({
  id: 'test_boxHelper',
  box: ssp.getObjectById('xxx_model').getBoundingBox(),
  color: '#00ff00',
});
```

### 参数：

#### options

- **描述:** 可配置项
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** BoxHelperOptions

##### BoxHelperOptions

<Docs-Table 
    :data="[
      { prop: 'id', desc: '唯一 ID', type: 'string', require: true, default: '' },
      { prop: 'box', desc: '包围盒', type: 'string', require: true, default: '' },
      { prop: 'color', desc: '辅助线条颜色', type: 'IColor', require: false, default: '#00ff00', link: '../guide/types.html#icolor' },
    ]"
/>

## addGroundHelper

添加地面辅助器

### 样例：

<Docs-Iframe src="helper/createGround.html" />

### 定义：

```ts
interface GroundHelperOptions extends BaseHelperOptions {
  imgUrl: string;
  width?: number;
  height?: number;
  opacity?: number;
  position?: Position;
  rotation?: Position;
  scale?: Scale;
  repeat?: IVector2;
}

function addGroundHelper(options: GroundHelperOptions): BaseMesh;
```

### 用法：

```js
ssp.addGroundHelper({
  id: 'test_ground'
  imgUrl: 'http://xxx.com/xx.png',
  width: 500,
  height: 500,
  // ...
})
```

### 参数：

#### options

- **描述:** 可配置项
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** GroundHelperOptions

##### GroundHelperOptions

<Docs-Table 
    :data="[
      { prop: 'imgUrl', desc: '生成地面的图片资源路径', type: 'string', require: true, default: '' },
      { prop: 'id', desc: '地面唯一 ID', type: 'string', require: true, default: '' },
      { prop: 'width', desc: '地面长（平面的宽）', type: 'number', require: false, default: '500' },
      { prop: 'height', desc: '地面宽（平面的高）', type: 'number', require: false, default: '500' },
      { prop: 'opacity', desc: '地面不透明度', type: 'number', require: false, default: '1' },
      { prop: 'position', desc: '地面中心点坐标', type: 'Position', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types.html#position' },
      { prop: 'rotation', desc: '地面旋转弧度', type: 'Rotation', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types.html#rotation' },
      { prop: 'scale', desc: '地面缩放比', type: 'Scale', require: false, default: '{ x: 1, y: 1, z: 1 }', link: '../guide/types.html#scale' },
      { prop: 'repeat', desc: '地面在平面内的平铺数', type: 'IVector2', require: false, default: '{ x: 10, y: 10 }', link: '../guide/types.html#ivector2' },
    ]"
/>

## addDirectionalLightHelper

添加平行光辅助器

### 定义：

```ts
interface DirectionalLightHelperOptions extends BaseHelperOptions {
  light: DirectionalLight;
  color?: IColor;
  size?: number;
}

function addDirectionalLightHelper(
  options: DirectionalLightHelperOptions
): THREE.DirectionalLightHelper;
```

### 用法：

```js
const light = ssp.createDirectionalLight({
  id: 'directional_light',
});

ssp.addDirectionalLightHelper({
  id: 'directional_light_helper',
  light,
  color: 'yellow',
});
```

### 参数：

#### options

- **描述:** 配置项
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** `DirectionalLightHelperOptions`

##### DirectionalLightHelperOptions

<Docs-Table 
    :data="[
      { prop: 'id', desc: '唯一 ID', type: 'string', require: true, default: '' },
      { prop: 'light', desc: '平行光对象', type: 'DirectionalLight', require: true, default: '' },
      { prop: 'color', desc: '颜色', type: 'IColor', require: false, default: '平行光的颜色', link: '../guide/types.html#icolor' },
      { prop: 'size', desc: '大小', type: 'number', require: false, default: '50' },
    ]"
/>

## addHemisphereLightHelper

添加半球光辅助器

### 定义：

```ts
interface HemisphereLightHelperOptions extends BaseHelperOptions {
  light: HemisphereLight;
  color?: IColor;
  size?: number;
}

function addHemisphereLightHelper(
  options: HemisphereLightHelperOptions
): THREE.HemisphereLightHelper;
```

### 用法：

```js
const light = ssp.createHemisphereLight({
  id: 'hemisphere_light',
});

ssp.addHemisphereLightHelper({
  id: 'hemisphere_light_helper',
  light,
  color: 'yellow',
});
```

### 参数：

#### options

- **描述:** 配置项
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** `HemisphereLightHelperOptions`

###### HemisphereLightHelperOptions

<Docs-Table 
    :data="[
      { prop: 'id', desc: '唯一 ID', type: 'string', require: true, default: '' },
      { prop: 'light', desc: '半球光对象', type: 'HemisphereLight', require: true, default: '' },
      { prop: 'color', desc: '颜色', type: 'IColor', require: false, default: '半球光的颜色', link: '../guide/types.html#icolor' },
      { prop: 'size', desc: '大小', type: 'number', require: false, default: '20' },
    ]"
/>

## addSpotLightHelper

添加聚光灯辅助器

### 定义：

```ts
interface SpotLightHelperOptions extends BaseHelperOptions {
  light: SpotLight;
  color?: IColor;
}

function addSpotLightHelper(
  options: SpotLightHelperOptions
): THREE.SpotLightHelper;
```

### 用法：

```js
const light = ssp.createSpotLight({
  id: 'spot_light',
});

ssp.addSpotLightHelper({
  id: 'spot_light_helper',
  light,
  color: 'yellow',
});
```

### 参数：

#### options

- **描述:** 配置项
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** `SpotLightHelperOptions`

<Docs-Table 
    :data="[
      { prop: 'id', desc: '唯一 ID', type: 'string', require: true, default: '' },
      { prop: 'light', desc: '聚光灯对象', type: 'SpotLight', require: true, default: '' },
      { prop: 'color', desc: '颜色', type: 'IColor', require: false, default: '聚光灯的颜色', link: '../guide/types.html#icolor' },
    ]"
/>

## addPointLightHelper

添加点光辅助器

### 定义：

```ts
interface PointLightHelperOptions extends BaseHelperOptions {
  light: PointLight;
  color?: IColor;
  size?: number;
}

function addPointLightHelper(
  options: PointLightHelperOptions
): THREE.PointLightHelper;
```

### 用法：

```js
const light = ssp.createPointLight({
  id: 'point_light',
});

ssp.addPointLightHelper({
  id: 'point_light_helper',
  light,
  color: 'yellow',
});
```

### 参数：

#### options

- **描述:** 配置项
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** `PointLightHelperOptions`

###### PointLightHelperOptions

<Docs-Table 
    :data="[
      { prop: 'id', desc: '唯一 ID', type: 'string', require: true, default: '' },
      { prop: 'light', desc: '点光对象', type: 'PointLight', require: true, default: '' },
      { prop: 'color', desc: '颜色', type: 'IColor', require: false, default: '点光的颜色', link: '../guide/types.html#icolor' },
      { prop: 'size', desc: '大小', type: 'number', require: false, default: '20' },
    ]"
/>

## addRectAreaLightHelper

添加矩形区域光辅助器

### 定义：

```ts
interface RectAreaLightHelperOptions extends BaseHelperOptions {
  light: RectAreaLight;
  color?: IColor;
}

function addRectAreaLightHelper(
  options: RectAreaLightHelperOptions
): RectAreaLightHelper;
```

### 用法：

```js
const light = ssp.createRectAreaLight({
  id: 'rect_area_light',
});

ssp.addRectAreaLightHelper({
  id: 'rect_area_light_helper',
  light,
  color: 'yellow',
});
```

### 参数：

#### options

- **描述:** 配置项
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** `RectAreaLightHelperOptions`

###### RectAreaLightHelperOptions

<Docs-Table 
    :data="[
      { prop: 'id', desc: '唯一 ID', type: 'string', require: true, default: '' },
      { prop: 'light', desc: '矩形区域光对象', type: 'RectAreaLight', require: true, default: '' },
      { prop: 'color', desc: '颜色', type: 'IColor', require: false, default: '矩形区域光的颜色', link: '../guide/types.html#icolor' },
    ]"
/>
