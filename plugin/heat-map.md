---
sidebarDepth: 2
---

# plugin-heat-map

![beta](https://img.shields.io/npm/v/@soonspacejs/plugin-heat-map/latest.svg)

热力图。

## 样例

<Docs-Iframe src="plugin/heatMap.html" />

## 安装

```bash
npm install @soonspacejs/plugin-heat-map -S
# or
yarn add @soonspacejs/plugin-heat-map -S
```

## 使用方法

```js {2,10}
import SoonSpace from 'soonspacejs';
import HeatMapPlugin from '@soonspacejs/plugin-heat-map';

const ssp = new SoonSpace({
  el: '#view',
  options: {},
  events: {},
});

const heatMap = ssp.registerPlugin(HeatMapPlugin, 'heatMap');
consolo.log(heatMap);
```

## 方法

### create
创建热力图

#### 定义

```ts
interface SceneDataPoint {
  x: number;
  z: number;
  value: number;
  radius: number;
}

interface CreateParam {
  // base
  id: string;
  name?: PluginObject['name'];
  data: SceneDataPoint[];
  // position
  yAxisHeight: number;
  minPosition: PlaneIVector2;
  maxPosition: PlaneIVector2;
  // value
  min?: number;
  max?: number;
  radius?: number;
}

function create(param: CreateParam): PluginObject;
```

#### 用法：

```js
heatMap.create({
  id: 'hm1',
  name: 'hm_name',
  yAxisHeight: 100,
  max: 100,
  min: 1,
  minPosition: {
    x: 0,
    z: 0
  },
  maxPosition: {
    x: 200,
    z: 200
  },
  data: [
    {
      x: 100,
      z: 100,
      radius: 100,
      value: 80
    },
    {
      x: 200,
      z: 50,
      radius: 50,
      value: 80
    },
    {
      x: 100,
      z: 50,
      radius: 50,
      value: 80
    },
  ]
})
```

#### 参数：

##### param

- **描述:** 创建热力图参数
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** `CreateParam`

###### CreateParam

<br>
<Docs-Table 
    :data="[
      {
        prop: 'id', desc: '热力图对象 ID', type: 'string', require: true, default: ''
      },
      {
        prop: 'name', desc: '热力图对象名称', type: 'string', require: false, default: ' '
      },
      {
        prop: 'data', desc: '热力图数据', type: 'DataPoint', require: true, default: '', link: '#scenesatapoint'
      },
      {
        prop: 'max', desc: '数据中单点值大于等于该值时，以最深热力颜色展示', type: 'number', require: false, default: '100'
      },
      {
        prop: 'min', desc: '数据中单点值小于等于该值时，以最浅热力颜色展示', type: 'number', require: false, default: '1'
      },
      {
        prop: 'radius', desc: '热力点半径', type: 'number', require: false, default: '100'
      },
      {
        prop: 'yAxisHeight', desc: '空间高度', type: 'number', require: true, default: ''
      },
      {
        prop: 'minPosition', desc: '热力图绘制区域最小点', type: 'PlaneIVector2', require: true, default: '', link: '../guide/types.html#planeivector2'
      },
      {
        prop: 'maxPosition', desc: '热力图绘制区域最大点', type: 'PlaneIVector2', require: true, default: '', link: '../guide/types.html#planeivector2'
      },
    ]"
/>

##### DataPoint

<br>

<Docs-Table 
    :data="[
      {
        prop: 'x', desc: '点位在空间平面内的水平位置', type: 'number', require: true, default: ''
      },
      {
        prop: 'z', desc: '点位在空间平面内的垂直位置', type: 'number', require: true, default: ''
      },
      {
        prop: 'value', desc: '热力值', type: 'number', require: true, default: ''
      },
      {
        prop: 'radius', desc: '热力点半径', type: 'number', require: false, default: '100'
      },
    ]"
/>

<br>

::: warning 注意
`x`、`z` 的位置需要在 `minPosition` 和 `maxPosition` 之间，否则不会渲染

`radius` 的显示范围会随着画布区域放大与缩小
:::


### setData
设置（重置）数据

#### 定义：
```ts
function setData(id: CreateParam['id'], data: SceneDataPoint[]): PluginObject | void
```

#### 用法：
```js
heatMap.setData(
  'hm1',
  [
    {
      x: 100,
      z: 100,
      radius: 100,
      value: Math.floor(Math.random() * 100)
    },
    {
      x: 200,
      z: 50,
      radius: 50,
      value: Math.floor(Math.random() * 100)
    },
    {
      x: 100,
      z: 50,
      radius: 50,
      value: Math.floor(Math.random() * 100)
    },
  ]
)
```

#### 参数：

##### id
- **描述:** 已创建热力图的 id
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** [CreateParam['id']](#createparam)

##### data
- **描述:** 新点位数据
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** [SceneDataPoint[]](#scenesatapoint)




### createPolygon
创建一个具有多边形边界的热力图。

通过 `points` 选项来设置多边形的顶点的世界坐标。

它会根据你传入的顶点，来创建多边形边界，该多边形边界会以前3个顶点所确定的平面来作为多边形边界的所在平面，对于那些不与该多边形共面的点，会向该平面上投影，然后将最终的投影点作为多边形边界的顶点。

热力图所需的数据点也是世界坐标系下的三维坐标，它会自动将数据点转换成在多边形平面上的投影点并将该投影点作为热力图最终的数据点。


#### 样例

<Docs-Iframe src="plugin/polygonHeatMap.html" />


#### 与`create()`对比
用户在使用热力图时，一般期望的逻辑是：
  - 传给热力图的数据都是世界坐标系下的数据，这样用户不必做数据的转换
  - 可以自定义热力图的边界，因为经常会在不规则的区域内绘制热力图，比如：地铁的站台层、大厅 或 非矩形的房间等。
  - 如果移动了热力图对象，原来的热力点的数据也能下确映射。

在这种场景下，使用 `create()` 创建热力图会有以下缺点：
- 热力图区域只能是 水平的 且是 矩形的，不可以是任意多边形，用户只能手动旋转来让水平的热力图变得倾斜，但这样的话，用户又必须自己将热力点数据从世界坐标系转到 倾斜状态下的局部坐标系。
- 热力图的数据点是 二维局部坐标，用户需要将世界坐标系的点转为二维的 且是 局部的坐标（如果有对热力图对象被移动、旋转或缩放等变换之后）。
- 如果热力图绘制好后，更改了位置、旋转，则用户需要重新将世界坐标系下的热力点针对新的位置和旋转再次进行转换。

`createPolygon()`就是为了解决上述缺点而生，所以 `createPolygon()` 具备以下特点
- 用户可以传递世界坐标系下的三维顶点列表 `points` 来作为热力图的绘制区域，所以热力图区域可以是任意多边形 且 可以是斜着的。
- 热力图的数据点是 三维的世界坐标，用户不需要额外的转换。
- 如果热力图绘制好后，更改了位置、旋转等，原来的热力图数据点不需要专门转换，`createPolygon()` 和 `setDataPolygon()` 会自动进行转换。


#### 定义

```ts
interface ScenePolygonDataPoint {
  x: number;
  y: number;
  z: number;
  value: number;
  radius: number;
}

export interface CreatePolygonParam {
  id: string;
  name?: PluginObject['name'];
  data: ScenePolygonDataPoint[];
  points: IVector3[];
  min?: number;
  max?: number;
  radius?: number;
}

createPolygon ( param: CreatePolygonParam ): PluginObject;
```

#### 用法：

```js
heatMap.createPolygon({
  id: 'hm1',
  name: 'hm_name',
  max: 100,
  min: 1,
  points:[
    {
      x: 0,
      y: 0,
      z: 0,
  },
    {
      x: 0,
      y: 0,
      z: 100,
  },
    {
      x: 0,
      y: 100,
      z: 100,
  },
  ]
  data: [
    {
      x: 100,
      y: 100,
      z: 100,
      radius: 100,
      value: 80
    },
    {
      x: 200,
      y: 200,
      z: 50,
      radius: 50,
      value: 80
    },
    {
      x: 100,
      y: 100,
      z: 50,
      radius: 50,
      value: 80
    },
  ]
})
```

#### 参数：

##### param

- **描述:** 创建热力图参数
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** `CreatePolygonParam`

###### CreateParam

<br>
<Docs-Table 
    :data="[
      {
        prop: 'id', desc: '热力图对象 ID', type: 'string', require: true, default: ''
      },
      {
        prop: 'name', desc: '热力图对象名称', type: 'string', require: false, default: ' '
      },
      {
        prop: 'data', desc: '热力图数据', type: 'ScenePolygonDataPoint[]', require: true, default: '', link: '#scenesatapoint'
      },
      {
        prop: 'max', desc: '数据中单点值大于等于该值时，以最深热力颜色展示', type: 'number', require: false, default: '100'
      },
      {
        prop: 'min', desc: '数据中单点值小于等于该值时，以最浅热力颜色展示', type: 'number', require: false, default: '1'
      },
      {
        prop: 'radius', desc: '热力点半径', type: 'number', require: false, default: '100'
      },
      {
        prop: 'points', desc: '多边形的顶点列表', type: 'IVector3[]', require: true, default: ''
      },
    ]"
/>

##### ScenePolygonDataPoint

<br>

<Docs-Table 
    :data="[
      {
        prop: 'x', desc: '点在世界坐标系下3维坐标的 x', type: 'number', require: true, default: ''
      },
      {
        prop: 'y', desc: '点在世界坐标系下3维坐标的 y', type: 'number', require: true, default: ''
      },
      {
        prop: 'z', desc: '点在世界坐标系下3维坐标的 z', type: 'number', require: true, default: ''
      },
      {
        prop: 'value', desc: '热力值', type: 'number', require: true, default: ''
      },
      {
        prop: 'radius', desc: '热力点半径', type: 'number', require: false, default: '100'
      },
    ]"
/>

<br>

::: warning 注意
如果坐标点在多边形平面的投影点不在多边形区域内的话，就不会渲染该热力点

`radius` 的显示范围会随着画布区域放大与缩小
:::


### setDataPolygon
设置（重置）数据

#### 定义：
```ts
setDataPolygon ( id: CreateParam['id'], data: CreatePolygonParam['data'] ): PluginObject | void
```

#### 用法：
```js
heatMap.setDataPolygon(
  'hm1',
  [
    {
      x: 100,
      y: 100,
      z: 100,
      radius: 100,
      value: Math.floor(Math.random() * 100)
    },
    {
      x: 200,
      y: 200,
      z: 50,
      radius: 50,
      value: Math.floor(Math.random() * 100)
    },
    {
      x: 100,
      y: 100,
      z: 50,
      radius: 50,
      value: Math.floor(Math.random() * 100)
    },
  ]
)
```

#### 参数：

##### id
- **描述:** 已创建热力图的 id
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** [CreateParam['id']](#createparam)

##### data
- **描述:** 新点位数据
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** [ScenePolygonDataPoint[]](#scenesatapoint)


### getById
通过 `id` 创建热力图

#### 用法：
```js
heatMap.getById('hm1');
```

#### 参数：
- id: string

### getByName
通过 `name` 创建热力图

#### 用法：
```js
heatMap.getByName('hm_name');
```

#### 参数：
- name: string

### removeById
通过 `id` 删除热力图

#### 用法：
```js
heatMap.removeById('hm1');
```

#### 参数：
- id: string
