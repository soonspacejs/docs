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
    y: 0,
    z: 0
  },
  maxPosition: {
    x: 200,
    y: 0,
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
      y: 100,
      radius: 100,
      value: Math.floor(Math.random() * 100)
    },
    {
      x: 200,
      y: 50,
      radius: 50,
      value: Math.floor(Math.random() * 100)
    },
    {
      x: 100,
      y: 50,
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
