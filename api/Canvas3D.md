# 空间画布对象

## createCanvas3D

创建 `Canvas3D` 对象。

### 样例：

<Docs-Iframe src="canvas3D/gradient.html" />

### 定义：

```ts
interface GradientTextureOptions {
  colors: IColor[];
  stops?: number[];
  size?: number;
}

interface PointInfo extends BaseMeshInfo {
  radius?: number;
  color?: IColor;
  opacity?: number;
  gradient?: GradientTextureOptions;
}

interface LineInfo extends BaseMeshInfo {
  points: Position[];
  width?: number;
  color?: IColor;
  opacity?: number;
  gradient?: GradientTextureOptions;
}

interface PolygonInfo extends BaseMeshInfo {
  yHeight: number;
  points: PlaneIVector2[];
  color?: IColor;
  opacity?: number;
  gradient?: GradientTextureOptions;
}

interface CircleInfo extends BaseMeshInfo {
  radius?: number;
  color?: IColor;
  opacity?: number;
  gradient?: GradientTextureOptions;
}

interface Canvas3DInfo extends BaseObject3DInfo {
  points?: PointInfo[];
  lines?: LineInfo[];
  polygons?: PolygonInfo[];
  circles?: CircleInfo[];
}

function createCanvas3D(canvas3DInfo: Canvas3DInfo): Canvas3D;
```

### 用法：

```js
ssp
  .createCanvas3D({
    id: 'xx',
    name: 'xx',
    level: {
      max: 1000,
      min: null,
    },
    points: [],
    lines: [],
    polygons: [],
    circles: [],
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 2, y: 2, z: 2 },
    userData: {},
  })
  .then((Canvas3D) => console.log(Canvas3D))
  .catch((err) => console.error(err));
```

### 参数：

#### canvas3DInfo

- **描述:** 动画到达目标
- **类型:** Canvas3DInfo
- **必填:** <Base-RequireIcon :isRequire="true"/>ss

##### Canvas3DInfo

<Docs-Table
    :data="[
      { prop: 'id', desc: '唯一ID', type: 'string | number', require: true, default: '' },
      { prop: 'name', desc: '名称', type: 'string', require: false, default: '' },
      { prop: 'level', desc: '显示层级范围', type: 'Level', require: false, default: '{ max: null, min: null }', link: '../guide/types.html#level' },
      { prop: 'points', desc: '点信息集合', type: 'PointInfo[]', require: false, default: '[]', link: '#pointinfo' },
      { prop: 'lines', desc: '线信息集合', type: 'LineInfo[]', require: false, default: '[]', link: '#lineinfo' },
      { prop: 'polygons', desc: '面信息集合', type: 'Polygons[]', require: false, default: '[]', link: '#polygoninfo' },
      { prop: 'circles', desc: '圆信息集合', type: 'CircleInfo[]', require: false, default: '[]', link: '#circleinfo' },
      { prop: 'position', desc: '位置坐标', type: 'Position', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types.html#position' },
      { prop: 'rotation', desc: '旋转弧度', type: 'Rotation', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types.html#rotation' },
      { prop: 'scale', desc: '缩放比例', type: 'Scale', require: false, default: '{ x: 1, y: 1, z: 1 }', link: '../guide/types.html#scale' },
      { prop: 'userData', desc: '用户数据', type: 'any', require: false, default: '{}' }
    ]"
/>

##### PointInfo

<Docs-Table
    :data="[
      { prop: 'id', desc: '点唯一ID', type: 'string | number', require: true, default: '' },
      { prop: 'name', desc: '点名称', type: 'string', require: false, default: '' },
      { prop: 'radius', desc: '点半径', type: 'number', require: false, default: '10' },
      { prop: 'color', desc: '点颜色', type: 'IColor', require: false, default: '0xffffff', link: '../guide/types.html#icolor' },
      { prop: 'gradient', desc: '点颜色渐变', type: 'GradientTextureOptions', require: false, default: '', link: '#gradienttextureoptions' },
      { prop: 'opacity', desc: '点不透明度', type: 'number', require: false, default: '1' },
      { prop: 'level', desc: '显示层级范围', type: 'Level', require: false, default: '{ max: null, min: null }', link: '../guide/types.html#level' },
      { prop: 'position', desc: '位置坐标', type: 'Position', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types.html#position' },
      { prop: 'rotation', desc: '旋转弧度', type: 'Rotation', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types.html#rotation' },
      { prop: 'scale', desc: '缩放比例', type: 'Scale', require: false, default: '{ x: 1, y: 1, z: 1 }', link: '../guide/types.html#scale' },
      { prop: 'userData', desc: '用户数据', type: 'any', require: false, default: '{}' }
    ]"
/>

##### LineInfo

<Docs-Table
    :data="[
      { prop: 'id', desc: '线唯一ID', type: 'string | number', require: true, default: '' },
      { prop: 'name', desc: '线名称', type: 'string', require: false, default: '' },
      { prop: 'points', desc: '组成面的点坐标集合', type: 'Position[]', require: true, default: '', link: '../guide/types.html#position' },
      { prop: 'width', desc: '线宽', type: 'number', require: false, default: '20' },
      { prop: 'color', desc: '线颜色', type: 'IColor', require: false, default: '0xffffff', link: '../guide/types.html#icolor' },
      { prop: 'gradient', desc: '线颜色渐变', type: 'GradientTextureOptions', require: false, default: '', link: '#gradienttextureoptions' },
      { prop: 'opacity', desc: '线不透明度', type: 'number', require: false, default: '1' },
      { prop: 'level', desc: '显示层级范围', type: 'Level', require: false, default: '{ max: null, min: null }', link: '../guide/types.html#level' },
      { prop: 'position', desc: '位置坐标', type: 'Position', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types.html#position' },
      { prop: 'rotation', desc: '旋转弧度', type: 'Rotation', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types.html#rotation' },
      { prop: 'scale', desc: '缩放比例', type: 'Scale', require: false, default: '{ x: 1, y: 1, z: 1 }', link: '../guide/types.html#scale' },
      { prop: 'userData', desc: '用户数据', type: 'any', require: false, default: '{}' }
    ]"
/>

##### PolygonInfo

<Docs-Table
    :data="[
      { prop: 'id', desc: '面唯一ID', type: 'string | number', require: true, default: '' },
      { prop: 'name', desc: '面名称', type: 'string', require: false, default: '' },
      { prop: 'yHeight', desc: '面空间高度', type: 'number', require: true, default: '' },
      { prop: 'points', desc: '组成面的点坐标集合', type: 'PlaneIVector2[]', require: true, default: '', link: '../guide/types.html#planeivector2' },
      { prop: 'color', desc: '面颜色', type: 'IColor', require: false, default: '0xffffff', link: '../guide/types.html#icolor' },
      { prop: 'gradient', desc: '面颜色渐变', type: 'GradientTextureOptions', require: false, default: '', link: '#gradienttextureoptions' },
      { prop: 'opacity', desc: '面不透明度', type: 'number', require: false, default: '1' },
      { prop: 'level', desc: '显示层级范围', type: 'Level', require: false, default: '{ max: null, min: null }', link: '../guide/types.html#level' },
      { prop: 'position', desc: '位置坐标', type: 'Position', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types.html#position' },
      { prop: 'rotation', desc: '旋转弧度', type: 'Rotation', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types.html#rotation' },
      { prop: 'scale', desc: '缩放比例', type: 'Scale', require: false, default: '{ x: 1, y: 1, z: 1 }', link: '../guide/types.html#scale' },
      { prop: 'userData', desc: '用户数据', type: 'any', require: false, default: '{}' }
    ]"
/>

##### CircleInfo

<Docs-Table
    :data="[
      { prop: 'id', desc: '圆唯一ID', type: 'string | number', require: true, default: '' },
      { prop: 'name', desc: '圆名称', type: 'string', require: false, default: '' },
      { prop: 'radius', desc: '圆半径', type: 'number', require: false, default: '10' },
      { prop: 'color', desc: '圆颜色', type: 'IColor', require: false, default: '0xffffff', link: '../guide/types.html#icolor' },
      { prop: 'gradient', desc: '圆颜色渐变', type: 'GradientTextureOptions', require: false, default: '', link: '#gradienttextureoptions' },
      { prop: 'opacity', desc: '圆不透明度', type: 'number', require: false, default: '1' },
      { prop: 'level', desc: '显示层级范围', type: 'Level', require: false, default: '{ max: null, min: null }', link: '../guide/types.html#level' },
      { prop: 'position', desc: '位置坐标', type: 'Position', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types.html#position' },
      { prop: 'rotation', desc: '旋转弧度', type: 'Rotation', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types.html#rotation' },
      { prop: 'scale', desc: '缩放比例', type: 'Scale', require: false, default: '{ x: 1, y: 1, z: 1 }', link: '../guide/types.html#scale' },
      { prop: 'userData', desc: '用户数据', type: 'any', require: false, default: '{}' }
    ]"
/>

##### GradientTextureOptions

<Docs-Table
    :data="[
      { prop: 'colors', desc: '渐变色列表', type: 'IColor[]', require: true, default: '', link: '../guide/types.html#icolor' },
      { prop: 'stops', desc: '渐变色偏移，与 color 对应，值为0 ~ 1之间', type: 'number[]', require: false, default: '根据 color 均匀分布' },
      { prop: 'size', desc: '渐变贴图的大小', type: 'numbert', require: false, default: '1024' },
    ]"
/>

## getCanvas3DById

通过 `id` 查找

### 定义：

```ts
function getCanvas3DById(id: Canvas3DInfo['id']): Canvas3D | null;
```

### 用法：

```js
const Canvas3D = ssp.getCanvas3DById('xxx');
```

## getCanvas3DByName

通过 `name` 查找

### 定义：

```ts
function getCanvas3DByName(name: string): Canvas3D[];
```

### 用法：

```js
const Canvas3DList = ssp.getCanvas3DByName('xxx');
```

## getAllCanvas3D

获取所有 `Canvas3D` 对象

### 定义：

```ts
function getAllCanvas3D(): Canvas3D[];
```

### 用法：

```js
const allCanvas3DList = ssp.getAllCanvas3D();
```

## getCanvas3DByUserDataProperty

通过 `userData` 属性查找

### 定义：

```ts
function getCanvas3DByUserDataProperty(
  propNameOrFindFunc: string | UserDataPropertyFindFunc,
  value?: any
): Canvas3D[];
```

### 用法：

```js
const Canvas3DList = ssp.getCanvas3DByUserDataProperty('propKey'， 'propVal')
// or
const Canvas3DList = ssp.getCanvas3DByUserDataProperty(item => item['itemPropKey'] === 'itemPropVal')
```

### 参数：

#### propNameOrFindFunc

- **描述:** `userData` 内属性名 或 `find` 函数
- **类型:** string | function
- **必填:** <Base-RequireIcon :isRequire="true"/>

#### propValue

- **描述:** `userData` 内属性值。
- **类型:** any
- **必填:** <Base-RequireIcon :isRequire="false"/>

::: tip find 函数使用场景

```js
Canvas3D.userData = {
  people: {
    name: 'xiaoming',
    age: 18,
  },
};
const Canvas3DList = ssp.getCanvas3DByUserDataProperty(
  (userData) => userData?.people?.name === 'xiaoming'
);
```

:::

## removeCanvas3DById

通过 `id` 移除

### 定义：

```ts
function removeCanvas3DById(id: Canvas3DInfo['id']): boolean;
```

### 用法：

```js
ssp.removeCanvas3DById('xxx');
```

## createCanvas3DToGroup

创建 `Canvas3D` 到一个组内。

### 定义：

```ts
function createCanvas3DToGroup(
  groupInfo: GroupInfo,
  canvas3DInfoList: Canvas3DInfo[]
): Group;
```

### 用法：

```js
ssp
  .createCanvas3DToGroup(
    // groupInfo
    {
      id: 'firstCanvas3DGroup',
      name: 'name_firstCanvas3DGroup',
      // ...
    },
    // canvas3DInfoList
    [Canvas3DInfo1, Canvas3DInfo2, Canvas3DInfo3]
  )
  .then((group) => console.log(group));
```

### 参数

#### groupInfo

- **描述:** 实例组对象所需信息
- **类型:** [GroupInfo](./sbm.html#groupinfo)
- **必填:** <Base-RequireIcon :isRequire="true"/>

#### canvas3DInfoList

- **描述:** `Canvas3DInfo` 集合
- **类型:** [Canvas3Dinfo](#Canvas3Dinfo)[]
- **必填:** <Base-RequireIcon :isRequire="true"/>

## createGroupForCanvas3D

为 `Canvas3D` 提前创建一个空组。
::: tip 使用场景
与 `createCanvas3DToGroup` 不同，有些时候可能你还没有具体的 `Canvas3DInfo` 数据，但你想提前创建一个批量管理的空组，当有数据时再使用 [addCanvas3DForGroup](#addCanvas3Dforgroup) 插入。
:::

### 定义：

```ts
function createGroupForCanvas3D(groupInfo: GroupInfo): Group;
```

### 用法：

```js
ssp.createGroupForCanvas3D({
  id: 'firstCanvas3DGroup',
  name: 'name_firstCanvas3DGroup',
  // ...
});
```

### 参数

#### groupInfo

- **描述:** 实例组对象所需信息
- **类型:** [GroupInfo](./sbm.html#groupinfo)
- **必填:** <Base-RequireIcon :isRequire="true"/>

## addCanvas3DForGroup

向一个已经存在的组内添加 `Canvas3D` 对象。

### 定义：

```ts
function addCanvas3DForGroup(
  groupId: GroupInfo['id'],
  canvas3DInfoList: Canvas3DInfo[]
): Group | null;
```

### 用法：

```js
ssp
  .addCanvas3DForGroup(
    // groupId
    'firstCanvas3DGroup',
    // canvas3DInfoList
    [Canvas3DInfo4, Canvas3DInfo5],
    // onProgress
    (progress) => console.log('进度信息：', progress)
  )
  .then((group) => console.log(group));
```

### 参数

#### groupId

- **描述:** 组 `id`
- **类型:** [groupId](./sbm.html#groupinfo)[‘id’]
- **必填:** <Base-RequireIcon :isRequire="true"/>

#### canvas3DInfoList

- **描述:** `Canvas3DInfo` 集合
- **类型:** [Canvas3Dinfo](#Canvas3Dinfo)[]
- **必填:** <Base-RequireIcon :isRequire="true"/>

## getCanvas3DGroupById

通过 `id` 查找 `Canvas3D` 组

### 定义：

```ts
function getCanvas3DGroupById(id: GroupInfo['id']): Group | null;
```

### 用法：

```js
const group = ssp.getCanvas3DGroupById('firstCanvas3DGroup');
```

## getCanvas3DGroupByName

通过 `name` 查找 `Canvas3D` 组

### 定义：

```ts
function getCanvas3DGroupByName(name: string): Group[];
```

### 用法：

```js
const groupList = ssp.getCanvas3DGroupByName('name_firstCanvas3DGroup');
```

## getAllCanvas3DGroup

获取所有 `Canvas3D` 对象组

### 定义：

```ts
function getAllCanvas3DGroup(): Group[];
```

### 用法：

```js
const allCanvas3DGroupList = ssp.getAllCanvas3DGroup();
```

## removeCanvas3DGroupById

通过 `id` 移除 `Canvas3D` 组

### 定义：

```ts
function removeCanvas3DGroupById(id: GroupInfo['id']): boolean;
```

### 用法：

```js
const isRemoveSuccess = ssp.removeCanvas3DGroupById('firstCanvas3DGroup');
```

## clearCanvas3D

清除当前场景内所有 `Canvas3D` 对象。

### 定义：

```ts
function clearCanvas3D(): void;
```

### 用法：

```js
ssp.clearCanvas3D();
```

## showAllCanvas3D

显示当前场景内所有 `Canvas3D` 对象。

### 定义：

```ts
function showAllCanvas3D(): void;
```

### 用法：

```js
ssp.showAllCanvas3D();
```

## hideAllCanvas3D

隐藏当前场景内所有 `Canvas3D` 对象。

### 定义：

```ts
function hideAllCanvas3D(): void;
```

### 用法：

```js
ssp.hideAllCanvas3D();
```
