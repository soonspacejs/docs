# Sbm 模型

::: warning 警告
`v2.5.0` 之后 `Sbm` 相关的 API 已经合并到 `Model`

您可以使用 `Model` 的相关方法替代 `Sbm`

后续 `Sbm` 的相关方法将会被废弃
:::

## loadSbm <Base-Deprecated />

加载 `Sbm` 模型。

### 样例：

<Docs-Iframe src="model/loadSbm.html" />

### 定义：

```ts
interface SbmInfo extends BaseObject3DInfo, ObjectEvents<Sbm> {
  url: string;
}

function loadSbm(sbmInfo: SbmInfo, onProgress?: ModelLoadingProgressCallback): Promise<Sbm>;
```

### 用法：

```js
ssp
  .loadSbm(
    // sbmInfo
    {
      id: 'xx',
      name: 'xx',
      url: 'xx/x.sbm',
      level: {
        max: 1000,
        min: null,
      },
      position: { x: 1000, y: 0, z: 1000 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 2, y: 2, z: 2 },
      onClick(e) {
        /**
         * 对象的独立事件触发后，默认不传播（类似 DOM 的事件冒泡）到全局事件，
         * 调用 eventPropagation 方法通知事件继续传播到全局。
         *
         * warn：
         *  在 **非箭头函数** 中参数 e 与 this 的指向都是当前模型对象，
         *  在 *箭头函数** 参数 e 依然是模型对象，但 this 指向会发生改变。
         */
        this.eventPropagation();

        console.log('模型自身的点击事件触发', this);
      },
      onDblClick: (e) => {
        /**
         * 这里模拟在 **箭头函数** 中
         */
        e.eventPropagation();

        console.log('模型自身的双击事件触发', e);
      },
      userData: {},
    }
  )
  .then((sbm) => console.log(sbm))
  .catch((err) => console.error(err));
```

### 参数：

#### sbmInfo

- **描述:** 实例 `Sbm` 对象所需信息
- **类型:** SbmInfo
- **必填:** <Base-RequireIcon :isRequire="true"/>

##### SbmInfo

<Docs-Table
    :data="[
      { prop: 'id', desc: '唯一ID', type: 'string | number', require: true, default: '' },
      { prop: 'name', desc: '名称', type: 'string', require: false, default: '' },
      { prop: 'url', desc: '资源路径', type: 'string', require: true, default: '' },
      { prop: 'level', desc: '显示层级范围', type: 'Level', require: false, default: '{ max: null, min: null }', link: '../guide/types#level' },
      { prop: 'visible', desc: '是否可见', type: 'boolean', require: false, default: 'true' },
      { prop: 'position', desc: '位置坐标', type: 'Position', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types#position' },
      { prop: 'rotation', desc: '旋转弧度', type: 'Rotation', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types#rotation' },
      { prop: 'scale', desc: '缩放比例', type: 'Scale', require: false, default: '{ x: 1, y: 1, z: 1 }', link: '../guide/types#scale' },
      { prop: 'userData', desc: '用户数据', type: 'any', require: false, default: '{}' },
      { prop: 'onClick', desc: '左键单击事件', type: '(object: Sbm) =&gt; void', require: false, default: 'null' },
      { prop: 'onDblClick', desc: '左键双击事件', type: '(object: Sbm) =&gt; void', require: false, default: 'null' },
      { prop: 'onRightClick', desc: '右键单击事件', type: '(object: Sbm) =&gt; void', require: false, default: 'null' },
      { prop: 'onLoad', desc: '加载完成事件', type: '(object: Sbm) =&gt; void', require: false, default: 'null' },
    ]"
/>

#### onProgress

- **描述:** 模型加载时进度回调函数，回填参数包含如下字段。
- **类型:** (progress: [ModelLoadingProgress](#modelloadingprogress)) => void
- **必填:** <Base-RequireIcon :isRequire="false"/>

##### ModelLoadingProgress

<Base-Table
    :head="[
      { title: '字段名', key: 'prop' },
      { title: '描述', key: 'desc' },
      { title: '类型', key: 'type' },
    ]"
    :data="[
      { prop: 'total', desc: '需要加载总数', type: 'number' },
      { prop: 'loaded', desc: '已加载完成数量', type: 'number' },
      { prop: 'timeStamp', desc: '单步消耗时长', type: 'number' },
    ]"
/>

## parseSbm <Base-Deprecated />

解析 Sbm 模型

### 定义:

```ts
function parseSbm(data: ArrayBuffer, sbmInfo: SbmInfo, onProgress?: ModelLoadingProgressCallback): Promise<Sbm>;
```

### 用法：

```js
const sbm = await ssp.parseSbm(new ArrayBuffer(8), sbmInfo, () => {});
```

### 参数：

#### data

- **描述:** 模型数据
- **类型:** `ArrayBuffer`
- **必填:** <Base-RequireIcon />

#### sbmInfo

[同上](#sbminfo)

#### onProgress

[同上](#onprogress)

## cloneSbm <Base-Deprecated />

克隆 Sbm 模型

### 定义:

```ts
interface CloneSbmInfo extends Omit<SbmInfo, 'url'> {}

function cloneSbm(model: Sbm, cloneSbmInfo: CloneSbmInfo, parent?: BaseObject3D | null): Promise<Sbm>;
```

### 用法:

```js
const clonedSbm = await ssp.cloneSbm(sbm, {
  id: 'clone_sbm',
  position: {
    x: 100,
    y: 0,
    z: 0,
  },
});
```

### 参数:

#### model

- **描述:** Sbm 对象
- **类型:** `Sbm`
- **必填:** <Base-RequireIcon />

#### sbmInfo

同 [SbmInfo](#sbminfo), 但不需要字段 `url`。

#### parent

- **描述:** 将 `Sbm` 克隆到的 `parent` 下
- **类型:** `Sbm`
- **必填:** <Base-RequireIcon :isRequire="false" />

## getSbmById <Base-Deprecated />

通过 `id` 查找

### 定义：

```ts
function getSbmById(id: SbmInfo['id']): Sbm | null;
```

### 用法：

```js
const sbm = ssp.getSbmById('xxx');
```

:::warning 弃用警告
请使用 [`getObjectById`](./object#getobjectbyid) 替代
:::

## getSbmByName <Base-Deprecated />

通过 `name` 查找

### 定义：

```ts
function getSbmByName(name: string): Sbm[];
```

### 用法：

```js
const sbmList = ssp.getSbmByName('xxx');
```

:::warning 弃用警告
请使用 [`getObjectByName`](./object#getobjectbyname) 替代
:::

## getAllSbm <Base-Deprecated />

获取所有 `Sbm` 对象

### 定义：

```ts
function getAllSbm(): Sbm[];
```

### 用法：

```js
const allSbmList = ssp.getAllSbm();
```

## getSbmByUserDataProperty <Base-Deprecated />

通过 `userData` 属性查找

### 定义：

```ts
function getSbmByUserDataProperty(propNameOrFindFunc: string | UserDataPropertyFindFunc, value?: any): Sbm[];
```

### 用法：

```js
const sbmList = ssp.getSbmByUserDataProperty('propKey'， 'propVal')
// or
const sbmList = ssp.getSbmByUserDataProperty(item => item['itemPropKey'] === 'itemPropVal')
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
sbm.userData = {
  people: {
    name: 'xiaoming',
    age: 18,
  },
};
const sbmList = ssp.getSbmByUserDataProperty((userData) => userData?.people?.name === 'xiaoming');
```

:::

:::warning 弃用警告
请使用 [`getObjectByUserDataProperty`](./object#getobjectbyuserdataproperty) 替代
:::

## removeSbmById <Base-Deprecated />

通过 `id` 移除

### 定义：

```ts
function removeSbmById(id: SbmInfo['id']): boolean;
```

### 用法：

```js
ssp.removeSbmById('xxx');
```

:::warning 弃用警告
请使用 [`removeObjectById`](./object#removeobjectbyid) 替代
:::

## loadSbmToGroup <Base-Deprecated />

加载 `Sbm` 到一个组内。

### 定义：

```ts
function loadSbmToGroup(
  groupInfo: GroupInfo,
  sbmInfoList: SbmInfo[],
  onProgress?: GroupProgressCallback
): Promise<Group>;
```

### 用法：

```js
ssp
  .loadSbmToGroup(
    // groupInfo
    {
      id: 'firstSbmGroup',
      name: 'name_firstSbmGroup',
      // ...
    },
    // sbmInfoList
    [sbmInfo1, sbmInfo2, sbmInfo3]
  )
  .then((group) => console.log(group));
```

### 参数

#### groupInfo

- **描述:** 实例组对象所需信息
- **类型:** GroupInfo
- **必填:** <Base-RequireIcon :isRequire="true"/>

##### GroupInfo

<Docs-Table
    :data="[
      { prop: 'id', desc: '组唯一ID', type: 'string | number', require: true, default: '' },
      { prop: 'name', desc: '组名称', type: 'string', require: false, default: '' },
      { prop: 'level', desc: '显示层级范围', type: 'Level', require: false, default: '{ max: null, min: null }', link: '../guide/types#level' },
      { prop: 'position', desc: '位置坐标', type: 'Position', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types#position' },
      { prop: 'rotation', desc: '旋转弧度', type: 'Rotation', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types#rotation' },
      { prop: 'scale', desc: '缩放比例', type: 'Scale', require: false, default: '{ x: 1, y: 1, z: 1 }', link: '../guide/types#scale' },
      { prop: 'userData', desc: '用户数据', type: 'any', require: false, default: '{}' },
    ]"
/>

#### sbmInfoList

- **描述:** `sbmInfo` 集合
- **类型:** [sbminfo](#sbminfo)[]
- **必填:** <Base-RequireIcon :isRequire="true"/>

#### onProgress

- **描述:** 模型加载到组内时进度回调函数，回填参数包含如下字段。
- **类型:** (groupProgress: [GroupProgress](#groupprogress)) => void
- **必填:** <Base-RequireIcon :isRequire="false"/>

##### GroupProgress

<Base-Table
    :head="[
      { title: '字段名', key: 'prop' },
      { title: '描述', key: 'desc' },
      { title: '类型', key: 'type' },
    ]"
    :data="[
      { prop: 'modelTotal', desc: '需要加载的模型总数 (sbmInfoList长度) ', type: 'number' },
      { prop: 'loadingModelIndex', desc: '当前正在加载的模型索引', type: 'number' },
      { prop: 'current', desc: '当前在在加载模型的详细进度', type: 'ModelLoadingProgress', link: '#modelloadingprogress' },
    ]"
/>

## createGroupForSbm <Base-Deprecated />

为 `Sbm` 提前创建一个空组。

::: tip 使用场景
与 `loadSbmToGroup` 不同，有些时候可能你还没有具体的 `sbmInfo` 数据，但你想提前创建一个批量管理的空组，当有数据时再使用 [addSbmForGroup](#addsbmforgroup) 插入。
:::

### 定义：

```ts
function createGroupForSbm(groupInfo: GroupInfo): Group;
```

### 用法：

```js
ssp.createGroupForSbm({
  id: 'firstSbmGroup',
  name: 'name_firstSbmGroup',
  // ...
});
```

### 参数

#### groupInfo

- **描述:** 实例组对象所需信息
- **类型:** [GroupInfo](#groupunfo)
- **必填:** <Base-RequireIcon :isRequire="true"/>

:::warning 弃用警告
请使用 [`createGroup`](../guide/objectGroup#creategroup) 替代
:::

## addSbmForGroup <Base-Deprecated />

向一个已经存在的组内添加 `Sbm` 对象。

### 定义：

```ts
function addSbmForGroup(
  groupId: GroupInfo['id'],
  sbmInfoList: SbmInfo[],
  onProgress?: GroupProgressCallback
): Promise<Group | null>;
```

### 用法：

```js
ssp
  .addSbmForGroup(
    // groupId
    'firstSbmGroup',
    // sbmInfoList
    [sbmInfo4, sbmInfo5]
    // onProgress
  )
  .then((group) => console.log(group));
```

### 参数

#### groupId

- **描述:** 组 `id`
- **类型:** [groupId](#groupinfo)[‘id’]
- **必填:** <Base-RequireIcon :isRequire="true"/>

#### sbmInfoList

- **类型:** [sbminfo](#sbminfo)[]
- **描述:** `sbmInfo` 集合
- **必填:** <Base-RequireIcon :isRequire="true"/>

#### onProgress

- **描述:** 模型加载到组内时进度回调函数，回填参数包含如下字段。
- **类型:** [GroupProgressCallback](#groupprogresscallback)
- **必填:** <Base-RequireIcon :isRequire="false"/>

## createSbmGroupFromXml <Base-Deprecated />

创建 Sbm 组，从 xml 文件资源

### 定义:

```ts
function createSbmGroupFromXml(groupInfo: GroupInfo, url: string): Promise<Group>;
```

### 用法:

```js
const group = await ssp.createSbmGroupFromXml(
  // groupInfo
  {
    id: 'firstSbmGroup',
    name: 'name_firstSbmGroup',
    // ...
  },
  // url
  'xxx.xml'
);
```

### 参数:

#### groupInfo

[同上](#groupinfo)

#### url

- **描述:** xml 文件的 `url` 地址
- **类型:** `string`
- **必填:** <Base-RequireIcon />

## getSbmGroupById <Base-Deprecated />

通过 `id` 查找 `Sbm` 组

### 定义：

```ts
function getSbmGroupById(id: GroupInfo['id']): Group | null;
```

### 用法：

```js
const group = ssp.getSbmGroupById('firstSbmGroup');
```

:::warning 弃用警告
请使用 [`getObjectById`](./object#getobjectbyid) 替代
:::

## getSbmGroupByName <Base-Deprecated />

通过 `name` 查找 `Sbm` 组

### 定义：

```ts
function getSbmGroupByName(name: string): Group[];
```

### 用法：

```js
const groupList = ssp.getSbmGroupByName('name_firstSbmGroup');
```

:::warning 弃用警告
请使用 [`getObjectByName`](./object#getobjectbyname) 替代
:::

## getAllSbmGroup <Base-Deprecated />

获取所有 `Sbm` 对象组

### 定义：

```ts
function getAllSbmGroup(): Group[];
```

### 用法：

```js
const allSbmGroupList = ssp.getAllSbmGroup();
```

:::warning 弃用警告
请使用 [`getAllGroup`](../guide/objectGroup#getallgroup) 替代
:::

## removeSbmGroupById <Base-Deprecated />

通过 `id` 移除 `Sbm` 组

### 定义：

```ts
function removeSbmGroupById(id: GroupInfo['id']): boolean;
```

### 用法：

```js
const isRemoveSuccess = ssp.removeSbmGroupById('firstSbmGroup');
```

:::warning 弃用警告
请使用 [`removeObjectById`](./object#removeobjectbyid) 替代
:::

## clearSbm <Base-Deprecated />

清除当前场景内所有 `Sbm` 对象。

### 定义：

```ts
function clearSbm(): void;
```

### 用法：

```js
ssp.clearSbm();
```

:::warning 弃用警告
请使用 [`clearModel`](./model#clearmodel) 替代
:::

## showAllSbm <Base-Deprecated />

显示当前场景内所有 `Sbm` 对象。

### 定义：

```ts
function showAllSbm(): void;
```

### 用法：

```js
ssp.showAllSbm();
```

:::warning 弃用警告
请使用 [`showAllModel`](./model#showallmodel) 替代
:::

## hideAllSbm <Base-Deprecated />

隐藏当前场景内所有 `Sbm` 对象。

### 定义：

```ts
function hideAllSbm(): void;
```

### 用法：

```js
ssp.hideAllSbm();
```

:::warning 弃用警告
请使用 [`hideAllModel`](./model#hideallmodel) 替代
:::

## getSbmModelMaps <Base-Deprecated />

获取 Sbm 模型缓存

### 定义:

```ts
function getSbmModelMaps(): Map<string, Sbm>;
```

### 用法：

```js
const sbmMaps = ssp.getSbmModelMaps();
```

## setSbmModelMaps <Base-Deprecated />

设置 Sbm 模型缓存

### 定义:

```ts
function setSbmModelMaps(maps: Map<string, Sbm>): void;
```

### 用法：

```js
const maps = new Map();

ssp.setSbmModelMaps(maps);
```
