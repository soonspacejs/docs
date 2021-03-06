# Poi 对象

## createPoi

创建 `poi` 对象。

### 样例：

<Docs-Iframe src="poi/createPoi.html" />

### 定义：

```ts
interface PoiInfo extends BaseObject3DInfo, ObjectEvents<Poi> {
  url: string;
  nameScale?: Scale;
}

function createPoi(poiInfo: PoiInfo): Poi;
```

### 用法：

```js
ssp.createPoi(
  // poiInfo
  {
    id: 'xx',
    name: 'xx',
    url: 'http://xx.com/xx.png',
    level: {
      max: 1000,
      min: null,
    },
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 2, y: 2, z: 2 },
    onClick(e) {
      /**
       * 对象的独立事件触发后，默认不传播（类似 DOM 的事件冒泡）到全局事件，
       * 调用 eventPropagation 方法通知事件继续传播到全局。
       *
       * warn：
       *  在 **非箭头函数** 中参数 e 与 this 的指向都是当前对象对象，
       *  在 *箭头函数** 参数 e 依然是对象对象，但 this 指向会发生改变。
       */
      this.eventPropagation();

      console.log('对象自身的点击事件触发', this);
    },
    onDblClick: (e) => {
      /**
       * 这里模拟在 **箭头函数** 中
       */
      e.eventPropagation();

      console.log('对象自身的双击事件触发', e);
    },
    userData: {},
  }
);
```

### 参数：

#### poiInfo

- **描述:** 实例 `Poi` 对象所需信息
- **类型:** poiInfo
- **必填:** <Base-RequireIcon :isRequire="true"/>

##### c

<Docs-Table
    :data="[
      { prop: 'id', desc: '唯一ID', type: 'string | number', require: true, default: '' },
      { prop: 'name', desc: '名称', type: 'string', require: false, default: '' },
      { prop: 'nameScale', desc: '展示名称的缩放比例', type: 'Scale', require: false, default: '{ x: 16, y: 16, z: 1 }', link: '../guide/types.html#scale' },
      { prop: 'url', desc: '图片资源路径', type: 'string', require: true, default: '' },
      { prop: 'level', desc: '显示层级范围', type: 'Level', require: false, default: '{ max: null, min: null }', link: '../guide/types.html#level' },
      { prop: 'position', desc: '位置坐标', type: 'Position', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types.html#position' },
      { prop: 'rotation', desc: '旋转弧度', type: 'Rotation', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types.html#rotation' },
      { prop: 'scale', desc: '缩放比例', type: 'Scale', require: false, default: '{ x: 1, y: 1, z: 1 }', link: '../guide/types.html#scale' },
      { prop: 'userData', desc: '用户数据', type: 'any', require: false, default: '{}' },
      { prop: 'onClick', desc: '左键单击事件', type: '(object: Poi) =&gt; void', require: false, default: 'null' },
      { prop: 'onDblClick', desc: '左键双击事件', type: '(object: Poi) =&gt; void', require: false, default: 'null' },
      { prop: 'onRightClick', desc: '右键单击事件', type: '(object: Poi) =&gt; void', require: false, default: 'null' },
      { prop: 'onLoad', desc: '创建完成事件', type: '(object: Poi) =&gt; void', require: false, default: 'null' },
    ]"
/>

## getPoiById

通过 `id` 查找

### 定义：

```ts
function getPoiById(id: PoiInfo['id']): Poi | null;
```

### 用法：

```js
const poi = ssp.getPoiById('xxx');
```

## getPoiByName

通过 `name` 查找

### 定义：

```ts
function getPoiByName(name: string): Poi[];
```

### 用法：

```js
const poiList = ssp.getPoiByName('xxx');
```

## getAllPoi

获取所有 `Poi` 对象

### 定义：

```ts
function getAllPoi(): Poi[];
```

### 用法：

```js
const allPoiList = ssp.getAllPoi();
```

## getPoiByUserDataProperty

通过 `userData` 属性查找

### 定义：

```ts
function getPoiByUserDataProperty(
  propNameOrFindFunc: string | UserDataPropertyFindFunc,
  value?: any
): Poi[];
```

### 用法：

```js
const poiList = ssp.getPoiByUserDataProperty('propKey'， 'propVal')
// or
const poiList = ssp.getPoiByUserDataProperty(item => item['itemPropKey'] === 'itemPropVal')
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
poi.userData = {
  people: {
    name: 'xiaoming',
    age: 18,
  },
};
const poiList = ssp.getPoiByUserDataProperty(
  (userData) => userData?.people?.name === 'xiaoming'
);
```

:::

## removePoiById

通过 `id` 移除

### 定义：

```ts
function removePoiById(id: PoiInfo['id']): boolean;
```

### 用法：

```js
ssp.removePoiById('xxx');
```

## createPoiToGroup

创建 `poi` 到一个组内。

### 定义：

```ts
function createPoiToGroup(groupInfo: GroupInfo, poiInfoList: PoiInfo[]): Group;
```

### 用法：

```js
ssp.createPoiToGroup(
  // groupInfo
  {
    id: 'firstPoiGroup',
    name: 'name_firstPoiGroup',
    // ...
  },
  // poiInfoList
  [poiInfo1, poiInfo2, poiInfo3]
);
```

### 参数

#### groupInfo

- **描述:** 实例组对象所需信息
- **类型:** [GroupInfo](./sbm.html#groupinfo)
- **必填:** <Base-RequireIcon :isRequire="true"/>

#### poiInfoList

- **描述:** `poiInfo` 集合
- **类型:** [poiinfo](#poiinfo)[]
- **必填:** <Base-RequireIcon :isRequire="true"/>

## createGroupForPoi

为 `poi` 提前创建一个空组。
::: tip 使用场景
与 `createPoiToGroup` 不同，有些时候可能你还没有具体的 `poiInfo` 数据，但你想提前创建一个批量管理的空组，当有数据时再使用 [addPoiForGroup](#addpoiforgroup) 插入。
:::

### 定义：

```ts
function createGroupForPoi(groupInfo: GroupInfo): Group;
```

### 用法：

```js
ssp.createGroupForPoi({
  id: 'firstPoiGroup',
  name: 'name_firstPoiGroup',
  // ...
});
```

### 参数

#### groupInfo

- **描述:** 实例组对象所需信息
- **类型:** [GroupInfo](./sbm.html#groupinfo)
- **必填:** <Base-RequireIcon :isRequire="true"/>

## addPoiForGroup

向一个已经存在的组内添加 `poi` 对象。

### 定义：

```ts
function addPoiForGroup(
  groupId: GroupInfo['id'],
  poiInfoList: PoiInfo[]
): Group | null;
```

### 用法：

```js
ssp.addPoiForGroup(
  // groupId
  'firstPoiGroup',
  // poiInfoList
  [poiInfo4, poiInfo5],
  // onProgress
  (progress) => console.log('进度信息：', progress)
);
```

### 参数

#### groupId

- **描述:** 组 `id`
- **类型:** [groupId](./sbm.html#groupinfo)[‘id’]
- **必填:** <Base-RequireIcon :isRequire="true"/>

#### poiInfoList

- **描述:** `poiInfo` 集合
- **类型:** [poiinfo](#poiinfo)[]
- **必填:** <Base-RequireIcon :isRequire="true"/>

## getPoiGroupById

通过 `id` 查找 `poi` 组

### 定义：

```ts
function getPoiGroupById(id: GroupInfo['id']): Group | null;
```

### 用法：

```js
const group = ssp.getPoiGroupById('firstPoiGroup');
```

## getPoiGroupByName

通过 `name` 查找 `poi` 组

### 定义：

```ts
function getPoiGroupByName(name: string): Group[];
```

### 用法：

```js
const groupList = ssp.getPoiGroupByName('name_firstPoiGroup');
```

## getAllPoiGroup

获取所有 `Poi` 对象组

### 定义：

```ts
function getAllPoiGroup(): Group[];
```

### 用法：

```js
const allPoiGroupList = ssp.getAllPoiGroup();
```

## removePoiGroupById

通过 `id` 移除 `poi` 组

### 定义：

```ts
function removePoiGroupById(id: GroupInfo['id']): boolean;
```

### 用法：

```js
const isRemoveSuccess = ssp.removePoiGroupById('firstPoiGroup');
```

## clearPoi

清除当前场景内所有 `poi` 对象。

### 定义：

```ts
function clearPoi(): void;
```

### 用法：

```js
ssp.clearPoi();
```

## showAllPoi

显示当前场景内所有 `poi` 对象。

### 定义：

```ts
function showAllPoi(): void;
```

### 用法：

```js
ssp.showAllPoi();
```

## hideAllPoi

隐藏当前场景内所有 `poi` 对象。

### 定义：

```ts
function hideAllPoi(): void;
```

### 用法：

```js
ssp.hideAllPoi();
```
