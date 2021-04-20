# 拓扑路径

### 样例：

<Docs-Iframe src="topology/loadGml.html" />

## createTopology

创建 `topology` 对象。

### 定义：

```ts
interface TopologyNodeInfo {
  id: string | number;
  name?: string;
  position: Position;
}

interface TopologyLinkInfo {
  id: string | number;
  name?: string;
  pointAIndex: number;
  pointBIndex: number;
}

interface TopologyInfo extends BaseObject3DInfo {
  nodes: TopologyNodeInfo[];
  links?: TopologyLinkInfo[];
  linkWidth?: number;
  //
  renderNode?: boolean;
  nodeColor?: IColor | IColor[];
  //
  renderCircle?: boolean;
  //
  renderLink?: boolean;
  linkColor?: IColor | IColor[];
  imgUrl?: string;
  animation?: boolean | AnimationOptions;
}

function createTopology(topologyInfo: TopologyInfo): Topology;
```

### 用法：

```js
const t = ssp.createTopology({
  id: 'topology_1',
  name: 'topology_1_name',
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
  renderCircle: true,
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
      { prop: 'nodes', desc: '节点坐标集合', type: 'TopologyNodeInfo[]', require: true, default: '', link: '#/topologynodeinfo' },
      { prop: 'links', desc: '连接线集合', type: 'TopologyLinkInfo[]', require: false, default: '', link: '#twowayslink' },
      { prop: 'linkWidth', desc: '线宽', type: 'number', require: false, default: '20' },
      { prop: 'renderNode', desc: '是否渲染节点', type: 'boolean', require: false, default: 'true' },
      { prop: 'nodeColor', desc: '节点颜色', type: 'IColor ｜ IColor[]', require: false, default: '0x0000ff', link: '../guide/types.html#icolor' },
      { prop: 'renderCircle', desc: '是否渲染线段连接处的补全圆', type: 'boolean', require: false, default: 'true' },
      { prop: 'renderLink', desc: '是否渲染连接线', type: 'boolean', require: false, default: 'true' },
      { prop: 'linkColor', desc: '连接线颜色', type: 'IColor ｜ IColor[]', require: false, default: '0x00ff00', link: '../guide/types.html#icolor' },
      { prop: 'imgUrl', desc: '非纯色线时使用的图片资源路径', type: 'string', require: false, default: 'null' },
      { prop: 'animation', desc: '非纯色线时的流动动画', type: 'boolean | AnimationOptions', require: false, default: 'false', link: './animation.html#animationoptions'},
      { prop: 'level', desc: '显示层级范围', type: 'Level', require: false, default: '{ max: null, min: null }', link: '../guide/types.html#level' },
      { prop: 'position', desc: '位置坐标', type: 'Position', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types.html#position' },
      { prop: 'rotation', desc: '旋转弧度', type: 'Rotation', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types.html#rotation' },
      { prop: 'scale', desc: '缩放比例', type: 'Scale', require: false, default: '{ x: 1, y: 1, z: 1 }', link: '../guide/types.html#scale' },
      { prop: 'userData', desc: '用户数据', type: 'any', require: false, default: '{}' },
    ]"
/>

##### TopologyNodeInfo

<Docs-Table
    :data="[
      { prop: 'id', desc: '节点唯一ID', type: 'string | number', require: true, default: '' },
      { prop: 'name', desc: '节点名称', type: 'string', require: false, default: '' },
      { prop: 'position', desc: '节点坐标', type: 'Position', require: true, default: '', link: '../guide/types.html#position' },
    ]"
/>

##### TopologyLinkInfo

<Docs-Table
    :data="[
      { prop: 'id', desc: '连线唯一ID', type: 'string | number', require: true, default: '' },
      { prop: 'name', desc: '连线名称', type: 'string', require: false, default: '' },
      { prop: 'pointAIndex', desc: '连接线一端位置坐标在 nodes 内的索引', type: 'number', require: true, default: '' },
      { prop: 'pointBIndex', desc: '连接线另一端位置坐标在 nodes 内的索引', type: 'number', require: true, default: '' },
    ]"
/>

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
interface TopologyInfoForGml {
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
