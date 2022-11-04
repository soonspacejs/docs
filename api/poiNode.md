# PoiNode 对象

## createPoiNode

创建 `poiNode` 对象。可以插入任何 `DOM` 元素，并且保留其交互事件。

### 样例：

<Docs-Iframe src="poiNode/createPoiNode.html" />

### 定义：

```ts
interface PoiNodeInfo extends BaseObject3DInfo {
  type: PoiNodeType;
  element: HTMLElement;
}

function createPoiNode(poiNodeInfo: PoiNodeInfo): PoiNode;
```

### 用法：

```js
const el = document.createElement('div');
el.innerHTML = '一段文字';

ssp.createPoiNode(
  // poiNodeInfo
  {
    type: '3d',
    element: el,
    id: 'xx',
    name: 'xx',
    level: {
      max: 1000,
      min: null,
    },
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 2, y: 2, z: 2 },
    userData: {},
  }
);
```

### 参数：

#### poiNodeInfo

- **描述:** 实例 `PoiNode` 对象所需信息
- **类型:** PoiNodeInfo
- **必填:** <Base-RequireIcon :isRequire="true"/>

##### PoiNodeInfo

<Docs-Table
    :data="[
      { prop: 'type', desc: '展示模式', type: 'PoiNodeType', require: true, default: '', link: '../guide/types.html#poinodetype' },
      { prop: 'element', desc: 'DOM 元素', type: 'HTMLElement', require: true, default: '' },
      { prop: 'id', desc: '唯一ID', type: 'string | number', require: true, default: '' },
      { prop: 'name', desc: '名称', type: 'string', require: false, default: '' },
      { prop: 'level', desc: '显示层级范围', type: 'Level', require: false, default: '{ max: null, min: null }', link: '../guide/types.html#level' },
      { prop: 'visible', desc: '是否可见', type: 'boolean', require: false, default: 'true' },
      { prop: 'position', desc: '位置坐标', type: 'Position', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types.html#position' },
      { prop: 'rotation', desc: '旋转弧度', type: 'Rotation', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types.html#rotation' },
      { prop: 'scale', desc: '缩放比例', type: 'Scale', require: false, default: '{ x: 1, y: 1, z: 1 }', link: '../guide/types.html#scale' },
      { prop: 'userData', desc: '用户数据', type: 'any', require: false, default: '{}' }
    ]"
/>

## getPoiNodeById

通过 `id` 查找

### 定义：

```ts
function getPoiNodeById(id: PoiNodeInfo['id']): PoiNode | null;
```

### 用法：

```js
const poiNode = ssp.getPoiNodeById('xxx');
```

## getPoiNodeByName

通过 `name` 查找

### 定义：

```ts
function getPoiNodeByName(name: string): PoiNode[];
```

### 用法：

```js
const poiNodeList = ssp.getPoiNodeByName('xxx');
```

## getAllPoiNode

获取所有 `PoiNode` 对象

### 定义：

```ts
function getAllPoiNode(): PoiNode[];
```

### 用法：

```js
const allPoiNodeList = ssp.getAllPoiNode();
```

## getPoiNodeByUserDataProperty

通过 `userData` 属性查找

### 定义：

```ts
function getPoiNodeByUserDataProperty(
  propNameOrFindFunc: string | UserDataPropertyFindFunc,
  value?: any
): PoiNode[];
```

### 用法：

```js
const poiNodeList = ssp.getPoiNodeByUserDataProperty('propKey'， 'propVal')
// or
const poiNodeList = ssp.getPoiNodeByUserDataProperty(item => item['itemPropKey'] === 'itemPropVal')
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
poiNode.userData = {
  people: {
    name: 'xiaoming',
    age: 18,
  },
};
const poiNodeList = ssp.getPoiNodeByUserDataProperty(
  (userData) => userData?.people?.name === 'xiaoming'
);
```

:::

## removePoiNodeById

通过 `id` 移除

### 定义：

```ts
function removePoiNodeById(id: PoiNodeInfo['id']): boolean;
```

### 用法：

```js
ssp.removePoiNodeById('xxx');
```

## createPoiNodeToGroup

创建 `poiNode` 到一个组内。

### 定义：

```ts
function createPoiNodeToGroup(
  groupInfo: GroupInfo,
  poiNodeInfoList: PoiNodeInfo[]
): Group;
```

### 用法：

```js
ssp.createPoiNodeToGroup(
  // groupInfo
  {
    id: 'firstPoiNodeGroup',
    name: 'name_firstPoiNodeGroup',
    // ...
  },
  // poiNodeInfoList
  [poiNodeInfo1, poiNodeInfo2, poiNodeInfo3]
);
```

### 参数

#### groupInfo

- **描述:** 实例组对象所需信息
- **类型:** [GroupInfo](./sbm.html#groupinfo)
- **必填:** <Base-RequireIcon :isRequire="true"/>

#### poiNodeInfoList

- **描述:** `poiNodeInfo` 集合
- **类型:** [poiNodeinfo](#poiNodeinfo)[]
- **必填:** <Base-RequireIcon :isRequire="true"/>

## createGroupForPoiNode

为 `poiNode` 提前创建一个空组。
::: tip 使用场景
与 `createPoiNodeToGroup` 不同，有些时候可能你还没有具体的 `poiNodeInfo` 数据，但你想提前创建一个批量管理的空组，当有数据时再使用 [addPoiNodeForGroup](#addpoiNodeforgroup) 插入。
:::

### 定义：

```ts
function createGroupForPoiNode(groupInfo: GroupInfo): Group;
```

### 用法：

```js
ssp.createGroupForPoiNode({
  id: 'firstPoiNodeGroup',
  name: 'name_firstPoiNodeGroup',
  // ...
});
```

### 参数

#### groupInfo

- **描述:** 实例组对象所需信息
- **类型:** [GroupInfo](./sbm.html#groupinfo)
- **必填:** <Base-RequireIcon :isRequire="true"/>

## addPoiNodeForGroup

向一个已经存在的组内添加 `poiNode` 对象。

### 定义：

```ts
function addPoiNodeForGroup(
  groupId: GroupInfo['id'],
  poiNodeInfoList: PoiNodeInfo[]
): Group | null;
```

### 用法：

```js
ssp.addPoiNodeForGroup(
  // groupId
  'firstPoiNodeGroup',
  // poiNodeInfoList
  [poiNodeInfo4, poiNodeInfo5],
  // onProgress
  (progress) => console.log('进度信息：', progress)
);
```

### 参数

#### groupId

- **描述:** 组 `id`
- **类型:** [GroupInfo](./sbm.html#groupinfo)[‘id’]
- **必填:** <Base-RequireIcon :isRequire="true"/>

#### poiNodeInfoList

- **描述:** `poiNodeInfo` 集合
- **类型:** [poiNodeinfo](#poiNodeinfo)[]
- **必填:** <Base-RequireIcon :isRequire="true"/>

## getPoiNodeGroupById

通过 `id` 查找 `poiNode` 组

### 定义：

```ts
function getPoiNodeGroupById(id: GroupInfo['id']): Group | null;
```

### 用法：

```js
const group = ssp.getPoiNodeGroupById('firstPoiNodeGroup');
```

## getPoiNodeGroupByName

通过 `name` 查找 `poiNode` 组

### 定义：

```ts
function getPoiNodeGroupByName(name: string): Group[];
```

### 用法：

```js
const groupList = ssp.getPoiNodeGroupByName('name_firstPoiNodeGroup');
```

## getAllPoiNodeGroup

获取所有 `PoiNode` 对象组

### 定义：

```ts
function getAllPoiNodeGroup(): Group[];
```

### 用法：

```js
const allPoiNodeGroupList = ssp.getAllPoiNodeGroup();
```

## removePoiNodeGroupById

通过 `id` 移除 `poiNode` 组

### 定义：

```ts
function removePoiNodeGroupById(id: GroupInfo['id']): boolean;
```

### 用法：

```js
const isRemoveSuccess = ssp.removePoiNodeGroupById('firstPoiNodeGroup');
```

## clearPoiNode

清除当前场景内所有 `poiNode` 对象。

### 定义：

```ts
function clearPoiNode(): void;
```

### 用法：

```js
ssp.clearPoiNode();
```

## showAllPoiNode

显示当前场景内所有 `poiNode` 对象。

### 定义：

```ts
function showAllPoiNode(): void;
```

### 用法：

```js
ssp.showAllPoiNode();
```

## hideAllPoiNode

隐藏当前场景内所有 `poiNode` 对象。

### 定义：

```ts
function hideAllPoiNode(): void;
```

### 用法：

```js
ssp.hideAllPoiNode();
```
