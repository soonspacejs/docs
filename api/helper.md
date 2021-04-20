# 辅助器

## createGround

创建地面

### 样例：

<Docs-Iframe src="helper/createGround.html" />

### 定义：

```ts
function createGround(options: GroundOptions): BaseMesh;
```

### 用法：

```js
ssp.createGround({
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
- **类型:** GroundOptions

##### GroundOptions

<Docs-Table 
    :data="[
      {
        prop: 'imgUrl', desc: '生成地面的图片资源路径', type: 'string', require: true, default: ''
      },
      {
        prop: 'id', desc: '地面唯一 ID', type: 'string', require: true, default: ''
      },
      {
        prop: 'width', desc: '地面长（平面的宽）', type: 'number', require: false, default: '500',
      },
      {
        prop: 'height', desc: '地面宽（平面的高）', type: 'number', require: false, default: '500',
      },
      {
        prop: 'opacity', desc: '地面不透明度', type: 'number', require: false, default: '1',
      },
      {
        prop: 'position', desc: '地面中心点坐标', type: 'Position', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types.html#position'
      },
      {
        prop: 'rotation', desc: '地面旋转弧度', type: 'Rotation', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types.html#rotation'
      },
      {
        prop: 'scale', desc: '地面缩放比', type: 'Scale', require: false, default: '{ x: 1, y: 1, z: 1 }', link: '../guide/types.html#scale'
      },
      {
        prop: 'repeat', desc: '地面在平面内的平铺数', type: 'IVector2', require: false, default: '{ x: 10, y: 10 }', link: '../guide/types.html#ivector2'
      },
    ]"
/>

## addAxesHelper

添加坐标轴辅助器

### 定义：

```ts
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
function addGridHelper(options: GridHelperOptions): GridHelper;
```

### 用法：

```js
ssp.addGridHelper({
  id: 'test_gridHelper'
  size: 1000,
  divisions: 20,
  color: '#fff'
})
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
      { prop: 'color', desc: '网格颜色', type: 'IColor', require: false, default: '#ffffff' },
    ]"
/>

## addPlaneHelper

添加面辅助器

### 定义：

```ts
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
    ]"
/>

## addBoxHelper

添加包围盒辅助器

### 定义：

```ts
function addBoxHelper(options: BoxHelperOptions): Box3Helper;
```

### 用法：

```js
ssp.addBoxHelper({
  id: 'test_boxHelper',
  box: ssp.getSbmById('xxx').getBoundingBox(),
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
