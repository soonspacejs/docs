# 拓扑路径

### 样例：

<Docs-Iframe src="topology/loadGml.html" />

## createTopology

创建 `topology` 对象。

### 定义：

```ts
interface TopologyEffectInfo {
  // 
  renderLink?: boolean
  linkWidth?: number
  linkColor?: IColor | IColor[]
  // 
  renderNode?: boolean
  nodeColor?: IColor
  nodeRadius?: number
  // 
  imgUrl?: LinkInfo['imgUrl']
  animation?: LinkInfo['animation']
}

type TopologyType = 'line' | 'network';

interface TopologyNodeInfo {
  id: BaseObject3DInfo['id'];
  name?: BaseObject3DInfo['name'];
  position: Position;
  graphs?: TopologyNodeGraph[];
}

interface TopologyNodeGraph {
  targetNodeId: string
  linkInfo: {
    id: string
    name: string
  }
  passable: number
  length?: number
}

interface TopologyInfo extends BaseObject3DInfo, TopologyEffectInfo {
  type: TopologyType;
  nodes: TopologyNodeInfo[];
}

function createTopology(topologyInfo: TopologyInfo): Topology;
```

### 用法：

```js
const topology = ssp.createTopology({
  id: 'topology_1',
  name: 'topology_1_name',
  type: 'line',
  nodes: [
    {
      id: 'node1',
      position: { x: 0, y: 1, z: 0 },
    },
    {
      id: 'node2',
      position: { x: 0, y: 1, z: 100 },
    },
    {
      id: 'node1',
      position: { x: 100, y: 1, z: 100 },
    },
    {
      id: 'node1',
      position: { x: 100, y: 1, z: -100 },
    },
  ],
  renderNode: true,
});
```

### 参数：

#### topologyInfo

- **描述:** 实例路径对象所需信息
- **类型:** TopologyInfo
- **必填:** <Base-RequireIcon :isRequire="true"/>

##### TopologyInfo

<Docs-Table
    :data="[
      { prop: 'id', desc: '唯一ID', type: 'string | number', require: true, default: '' },
      { prop: 'name', desc: '名称', type: 'string', require: false, default: '' },
      { prop: 'nodes', desc: '节点坐标集合', type: 'TopologyNodeInfo[]', require: true, default: '', link: '#topologynodeinfo' },
      { prop: 'type', desc: '路径类型', type: 'line | network', require: true, default: '' },
      { prop: 'renderLink', desc: '是否渲染连接线', type: 'boolean', require: false, default: 'true' },
      { prop: 'linkWidth', desc: '线宽', type: 'number', require: false, default: '20' },
      { prop: 'linkColor', desc: '连接线颜色', type: 'IColor ｜ IColor[]', require: false, default: '0x00ff00', link: '../guide/types.html#icolor' },
      { prop: 'renderNode', desc: '是否渲染节点', type: 'boolean', require: false, default: 'true' },
      { prop: 'nodeColor', desc: '节点颜色', type: 'IColor', require: false, default: '0x0000ff', link: '../guide/types.html#icolor' },
      { prop: 'nodeRadius', desc: '节点半径', type: 'numbers', require: false, default: '10' },
      { prop: 'imgUrl', desc: '非纯色线时使用的图片资源路径', type: 'string', require: false, default: 'null' },
      { prop: 'animation', desc: '非纯色线时的流动动画', type: 'boolean | AnimationOptions', require: false, default: 'false', link: './animation.html#animationoptions'},
      { prop: 'level', desc: '显示层级范围', type: 'Level', require: false, default: '{ max: null, min: null }', link: '../guide/types.html#level' },
      { prop: 'visible', desc: '是否可见', type: 'boolean', require: false, default: 'true' },
      { prop: 'position', desc: '位置坐标', type: 'Position', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types.html#position' },
      { prop: 'rotation', desc: '旋转弧度', type: 'Rotation', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types.html#rotation' },
      { prop: 'scale', desc: '缩放比例', type: 'Scale', require: false, default: '{ x: 1, y: 1, z: 1 }', link: '../guide/types.html#scale' },
      { prop: 'userData', desc: '用户数据', type: 'any', require: false, default: '{}' },
    ]"
/>

`linkColor` 为数组时，有效长度是 4 个，分别对应 `passable` 的四个状态时路径颜色；为单个颜色时，表示所有路径颜色。

##### TopologyNodeInfo

<Docs-Table
    :data="[
      { prop: 'id', desc: '节点唯一ID', type: 'string | number', require: true, default: '' },
      { prop: 'name', desc: '节点名称', type: 'string', require: false, default: '' },
      { prop: 'position', desc: '节点坐标', type: 'Position', require: true, default: '', link: '../guide/types.html#position' },
      { prop: 'graphs', desc: '网结构信息', type: 'TopologyNodeGraph[]', require: false, default: '', link: '#topologynodegraph' },
    ]"
/>

##### TopologyNodeGraph

<Docs-Table
    :data="[
      { prop: 'targetNodeId', desc: '目标 node ID', type: 'string | number', require: true, default: '' },
      { prop: 'linkInfo', desc: '路径信息', type: '{ id: string, name: string }', require: true, default: '' },
      { prop: 'passable', desc: '路径通行许可', type: '0 | 1 | 2 | 3', require: true, default: '' },
      { prop: 'length', desc: '起始点到目标点距离', type: 'number', require: false, default: '' },
    ]"
/>

`passable` 的枚举含义分别为：双向通行（0）｜ 单向正向通行（1）｜ 单向方向通向（2）｜ 禁止通行（3）


## getShortestPath

获取最短路径

### 定义：

```ts
interface ShortestPathInfo extends BaseObject3DInfo, TopologyEffectInfo {
  start: Position;
  end: Position;
}

function getShortestPath(
  topology: Topology,
  info: ShortestPathInfo
): Topology | null;
```

### 用法：

```js
const shortestTopology = ssp.getShortestPath(topologyFromOther, {
  start: { x: 0, y: 0, z: 0 },
  end: { x: 100, y: 0, z: 300 },
  id: 'shortestPath',
  linkColor: 'red',
  nodeColor: 'orange',
  imgUrl: '../../asstes/img/topology/arrow.png',
  animation: true,
});
```

### 参数：

#### topology

- **描述:** 拓扑路径对象，一般是从 gml 文件加载的拓扑路径图
- **类型:** `Topology`
- **必填:** <Base-RequireIcon :isRequire="true"/>

#### info

- **描述:** 最短路径信息
- **类型:** `ShortestPathInfo`
- **必填:** <Base-RequireIcon :isRequire="true"/>

<Docs-Table
    :data="[
      { prop: 'start', desc: '路径的起始点', type: 'Position', require: true, default: '', link: '../guide/types.html#position' },
      { prop: 'end', desc: '路径的结束点', type: 'Position', require: true, default: '', link: '../guide/types.html#position' },
    ]"
/>

部分配置参考 [TopologyInfo](#topologyinfo-2)

## getTopologyById

通过 `id` 查找

### 定义：

```ts
function getTopologyById(id: TopologyInfo['id']): Topology | null;
```

### 用法：

```js
const topology = ssp.getTopologyById('xxx');
```

## getTopologyByName

通过 `name` 查找

### 定义：

```ts
function getTopologyByName(name: string): Topology[];
```

### 用法：

```js
const topologyList = ssp.getTopologyByName('xxx');
```

## getAllTopology

获取所有 `Topology` 对象

### 定义：

```ts
function getAllTopology(): Topology[];
```

### 用法：

```js
const allTopologyList = ssp.getAllTopology();
```

## getTopologyByUserDataProperty

通过 `userData` 属性查找

### 定义：

```ts
function getTopologyByUserDataProperty(
  propNameOrFindFunc: string | UserDataPropertyFindFunc,
  value?: any
): Topology[];
```

### 用法：

```js
const topologyList = ssp.getTopologyByUserDataProperty('propKey'， 'propVal')
// or
const topologyList = ssp.getTopologyByUserDataProperty(item => item['itemPropKey'] === 'itemPropVal')
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
topology.userData = {
  people: {
    name: 'xiaoming',
    age: 18,
  },
};
const topologyList = ssp.getTopologyByUserDataProperty(
  (userData) => userData?.people?.name === 'xiaoming'
);
```

:::

## removeTopologyById

通过 `id` 移除

### 定义：

```ts
function removeTopologyById(id: TopologyInfo['id']): boolean;
```

### 用法：

```js
ssp.removeTopologyById('xxx');
```

## createTopologyToGroup

创建 `topology` 到一个组内。

### 定义：

```ts
function createTopologyToGroup(
  groupInfo: GroupInfo,
  topologyInfoList: TopologyInfo[]
): Group;
```

### 用法：

```js
ssp.createTopologyToGroup(
  // groupInfo
  {
    id: 'firstTopologyGroup',
    name: 'name_firstTopologyGroup',
    // ...
  },
  // topologyInfoList
  [topologyInfo1, topologyInfo2, topologyInfo3]
);
```

### 参数

#### groupInfo

- **描述:** 实例组对象所需信息
- **类型:** [GroupInfo](./sbm.html#groupinfo)
- **必填:** <Base-RequireIcon :isRequire="true"/>

#### topologyInfoList

- **描述:** `topologyInfo` 集合
- **类型:** [TopologyInfo](#topologyinfo)[]
- **必填:** <Base-RequireIcon :isRequire="true"/>

## createTopologyFromGml

创建 Topology 组，从 gml 文件资源。

### 定义：

```ts
interface TopologyInfoForGml extends BaseObject3DInfo {
  url: string;
  id: BaseObject3DInfo['id'];
  name?: BaseObject3DInfo['name'];
  linkWidth?: number;
  linkColor?: IColor;
  renderNode?: boolean;
  nodeColor?: IColor;
}

function createTopologyFromGml(
  topologyInfo: TopologyInfoForGml
): Promise<Topology>;
```

### 用法：

```js
ssp
  .createTopologyFromGml({
    url: './tuobutujinzui.gml',
    id: 'gml_for_topology',
    name: 'gml_for_topology_name',
    linkWidth: 100,
    linkColor: 'blue',
    renderNode: true,
    nodeColor: 'green',
  })
  .then((topology) => {
    console.log(topology);
  });
```

### 参数

#### topologyInfo

- **描述:** `topologyInfo` 对象
- **类型:** [TopologyInfoForGml](#topologyinfoforgml)
- **必填:** <Base-RequireIcon :isRequire="true"/>

##### TopologyInfoForGml

<Docs-Table
    :data="[
      { prop: 'url', desc: 'gml 资源路径', type: 'string', require: false, default: '' },
      { prop: 'id', desc: '路径对象唯一ID', type: 'string', require: false, default: '' },
      { prop: 'name', desc: '路径对象名称', type: 'string', require: false, default: '' },
      { prop: 'linkWidth', desc: '路径线宽', type: 'number', require: false, default: '20' },
      { prop: 'linkColor', desc: '路径线颜色', type: 'IColor', require: false, default: '0x00ff00', link: '../guide/types.html#icolor' },
      { prop: 'renderNode', desc: '是否渲染路径节点', type: 'boolean', require: false, default: 'true' },
      { prop: 'nodeColor', desc: '节点颜色', type: 'IColor', require: false, default: '0x0000ff', link: '../guide/types.html#icolor' }
    ]"
/>

## createGroupForTopology

为 `topology` 提前创建一个空组。
::: tip 使用场景
与 `createTopologyToGroup` 不同，有些时候可能你还没有具体的 `topologyInfo` 数据，但你想提前创建一个批量管理的空组，当有数据时再使用 [addTopologyForGroup](#addtopologyforgroup) 插入。
:::

### 定义：

```ts
function createGroupForTopology(groupInfo: GroupInfo): Group;
```

### 用法：

```js
ssp.createGroupForTopology({
  id: 'firstTopologyGroup',
  name: 'name_firstTopologyGroup',
  // ...
});
```

### 参数

#### groupInfo

- **描述:** 实例组对象所需信息
- **类型:** [GroupInfo](./sbm.html#groupinfo)
- **必填:** <Base-RequireIcon :isRequire="true"/>

## addTopologyForGroup

向一个已经存在的组内添加 `topology` 对象。

### 定义：

```ts
function addTopologyForGroup(
  groupId: GroupInfo['id'],
  topologyInfoList: TopologyInfo[]
): Group | null;
```

### 用法：

```js
ssp.addTopologyForGroup(
  // groupId
  'firstTopologyGroup',
  // topologyInfoList
  [topologyInfo4, topologyInfo5],
  // onProgress
  (progress) => console.log('进度信息：', progress)
);
```

### 参数

#### groupId

- **描述:** 组 `id`
- **类型:** [groupId](./sbm.html#groupinfo)[‘id’]
- **必填:** <Base-RequireIcon :isRequire="true"/>

#### topologyInfoList

- **描述:** `topologyInfo` 集合
- **类型:** [topologyinfo](#topologyinfo)[]
- **必填:** <Base-RequireIcon :isRequire="true"/>

## getTopologyGroupById

通过 `id` 查找 `topology` 组

### 定义：

```ts
function getTopologyGroupById(id: GroupInfo['id']): Group | null;
```

### 用法：

```js
const group = ssp.getTopologyGroupById('firstTopologyGroup');
```

## getTopologyGroupByName

通过 `name` 查找 `topology` 组

### 定义：

```ts
function getTopologyGroupByName(name: string): Group[];
```

### 用法：

```js
const groupList = ssp.getTopologyGroupByName('name_firstTopologyGroup');
```

## removeTopologyGroupById

通过 `id` 移除 `topology` 组

### 定义：

```ts
function removeTopologyGroupById(id: GroupInfo['id']): boolean;
```

### 用法：

```js
const isRemoveSuccess = ssp.removeTopologyGroupById('firstTopologyGroup');
```

## clearTopology

清除当前场景内所有 `topology` 对象。

### 定义：

```ts
function clearTopology(): void;
```

### 用法：

```js
ssp.clearTopology();
```

## showAllTopology

显示当前场景内所有 `topology` 对象。

### 定义：

```ts
function showAllTopology(): void;
```

### 用法：

```js
ssp.showAllTopology();
```

## hideAllTopology

隐藏当前场景内所有 `topology` 对象。

### 定义：

```ts
function hideAllTopology(): void;
```

### 用法：

```js
ssp.hideAllTopology();
```
