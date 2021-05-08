---
sidebarDepth: 2
---

# heat-map

![beta](https://img.shields.io/npm/v/@soonspacejs/plugin-heat-map/latest.svg)

热力图插件。

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
interface CreateParam {
  id: string;
  name?: string;
  yAxisHeight: number;
  data: CreateParamData[];
  max?: number;
  min?: number;
}

interface CreateParamData {
  position: Position;
  radius: number;
  value: number;
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
  data: [
    {
      position: { x: 200, y: 10000, z: 100 },
      radius: 100,
      value: 100,
    },
    {
      position: { x: 100, y: 20000, z: 100 },
      radius: 20,
      value: 50,
    },
  ],
});
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
        prop: 'yAxisHeight', desc: '空间高度', type: 'number', require: true, default: ''
      },
      {
        prop: 'data', desc: '热力图数据', type: 'CreateParamData[]', require: true, default: '', link: '#createparamdata'
      },
      {
        prop: 'max', desc: '数据中单点值大于等于该值时，以最深热力颜色展示', type: 'number', require: false, default: '100'
      },
      {
        prop: 'min', desc: '数据中单点值小于等于该值时，以最浅热力颜色展示', type: 'number', require: false, default: '1'
      },
    ]"
/>

##### CreateParamData

<br>
<Docs-Table 
    :data="[
      {
        prop: 'position', desc: '热力点空间坐标', type: 'Position', require: true, default: '', link: '../guide/types.html#position'
      },
      {
        prop: 'radius', desc: '热力点半径', type: 'number', require: true, default: ''
      },
      {
        prop: 'value', desc: '热力值', type: 'number', require: true, default: ''
      }
    ]"
/>

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

#### 参数：

- name: string

### remove

#### 参数：

- id: string
