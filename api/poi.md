# Poi 对象

## createPoi

创建 `poi` 对象。

### 样例：

<Docs-Iframe src="poi/createPoi.html" />

<Docs-Iframe src="poi/poiText.html" />

### 定义：

```ts
interface NameCanvasInfo {
  canvasWidth?: number;
  canvasHeight?: number;
  font?: string;
  fillStyle?: CanvasFillStrokeStyles['fillStyle'];
  strokeStyle?: CanvasFillStrokeStyles['strokeStyle'];
  textAlign?: CanvasTextAlign;
  textBaseline?: CanvasTextBaseline;
  backgroundStyle?: CanvasFillStrokeStyles['fillStyle'];
  borderStyle?: CanvasFillStrokeStyles['strokeStyle'];
  borderWidth?: number;
}

interface PoiInfo extends BaseObject3DInfo {
  url: string;
  type?: PoiType;
  namePosition?: IVector3;
  nameScale?: IVector3;
  nameCanvasInfo?: NameCanvasInfo;
  iconScale?: IVector3;
  scaleFixed?: ScaleFixed;
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
    nameCanvasInfo: {
      fillStyle: '#fff',
      strokeStyle: '#000',
    },
    type: '2.5d',
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

// 3d poi
ssp.createPoi({
  id: 'xx',
  name: 'xx',
  nameCanvasInfo: {
    fillStyle: '#fff',
    strokeStyle: '#000',
  },
  type: '3d',
  url: '/xx.png',
});
```

::: tip 提示
2d 不支持 `rotation` 和 `scale` 属性。

2.5d 不支持 `rotation` 属性`。
:::

### 参数：

#### poiInfo

- **描述:** 实例 `Poi` 对象所需信息
- **类型:** poiInfo
- **必填:** <Base-RequireIcon :isRequire="true"/>

##### poiInfo

<Docs-Table
    :data="[
      { prop: 'id', desc: '唯一ID', type: 'string | number', require: true, default: '' },
      { prop: 'name', desc: '名称', type: 'string', require: false, default: '' },
      { prop: 'type', desc: '类型', type: 'PoiType', require: false, default: '2.5d', link: '../guide/types#poitype' },
      { prop: 'namePosition', desc: '展示名称的位置偏移（相对于poi）', type: 'Position', require: false, default: '{ x: 0, y: 10, z: 0 }', link: '../guide/types#position' },
      { prop: 'nameScale', desc: '展示名称的缩放比例', type: 'Scale', require: false, default: '{ x: 16, y: 16, z: 1 }', link: '../guide/types#scale' },
      { prop: 'nameCanvasInfo', desc: '展示名称 canvas 配置', type: 'NameCanvasInfo', require: false, default: '参考下方' },
      { prop: 'iconScale', desc: '图片的缩放比例', type: 'Scale', require: false, default: '{ x: 16, y: 16, z: 1 }', link: '../guide/types#scale' },
      { prop: 'scaleFixed', desc: '相机超过设定距离时的固定缩放比例', type: 'ScaleFixed', require: false, default: '', link: '../guide/types#scalefixed' },
      { prop: 'url', desc: '图片资源路径', type: 'string', require: false, default: '' },
      { prop: 'level', desc: '显示层级范围', type: 'Level', require: false, default: '{ max: null, min: null }', link: '../guide/types#level' },
      { prop: 'visible', desc: '是否可见', type: 'boolean', require: false, default: 'true' },
      { prop: 'position', desc: '位置坐标', type: 'Position', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types#position' },
      { prop: 'rotation', desc: '旋转弧度', type: 'Rotation', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types#rotation' },
      { prop: 'scale', desc: '缩放比例', type: 'Scale', require: false, default: '{ x: 1, y: 1, z: 1 }', link: '../guide/types#scale' },
      { prop: 'userData', desc: '用户数据', type: 'any', require: false, default: '{}' },
      { prop: 'onClick', desc: '左键单击事件', type: '(object: Poi) =&gt; void', require: false, default: 'null' },
      { prop: 'onDblClick', desc: '左键双击事件', type: '(object: Poi) =&gt; void', require: false, default: 'null' },
      { prop: 'onRightClick', desc: '右键单击事件', type: '(object: Poi) =&gt; void', require: false, default: 'null' },
      { prop: 'onLoad', desc: '创建完成事件', type: '(object: Poi) =&gt; void', require: false, default: 'null' },
    ]"
/>

##### nameCanvasInfo

<Docs-Table
    :data="[
      { prop: 'canvasWidth', desc: '画布宽度', type: 'number', require: false, default: '256' },
      { prop: 'canvasHeight', desc: '画布高度', type: 'number', require: false, default: '256' },
      { prop: 'font', desc: '字体', type: 'string', require: false, link: 'https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font', default: '32px Microsoft YaHei' },
      { prop: 'fillStyle', desc: '填充色', type: 'CanvasFillStrokeStyles[fillStyle]', require: false, link: 'https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle', default: '#fff' },
      { prop: 'strokeStyle', desc: '描边色', type: 'CanvasFillStrokeStyles[strokeStyle]', require: false, link: 'https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle',default: '#000' },
      { prop: 'textAlign', desc: '文本对齐', type: 'CanvasTextAlign', require: false, link: 'https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textAlign',default: 'center' },
      { prop: 'textBaseline', desc: '文本基线', type: 'CanvasTextBaseline', require: false, link: 'https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline',default: 'middle' },
      { prop: 'backgroundStyle', desc: '文本背景色', type: 'CanvasFillStrokeStyles[fillStyle]', require: false, link: 'https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle',default: '' },
      { prop: 'borderStyle', desc: '文本边框色', type: 'CanvasFillStrokeStyles[strokeStyle]', require: false, link: 'https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle',default: '' },
      { prop: 'borderWidth', desc: '文本边框宽度', type: 'number', require: false,default: '3' },
    ]"
/>

###### scaleFixed

<Docs-Iframe src="poi/poiScaleFixed.html" />

<Docs-Table
    :data="[
      { prop: 'originScale', desc: '小于 distance 时的 scale', type: 'number', require: true, default: '' },
      { prop: 'fixedScale', desc: '大于 distance 时的固定 scale', type: 'number', require: true, default: '' },
      { prop: 'distance', desc: '距离阈值', type: 'number', require: true, default: '' },
    ]"
/>

::: tip 提示
使用 `scaleFixed` 需要开启 [scaleFixedEnabled](../guide/config#scalefixedenabled) 配置
:::

## getPoiById <Base-Deprecated />

通过 `id` 查找

### 定义：

```ts
function getPoiById(id: PoiInfo['id']): Poi | null;
```

### 用法：

```js
const poi = ssp.getPoiById('xxx');
```

:::warning 弃用警告
请使用 [`getObjectById`](./object#getobjectbyid) 替代
:::

## getPoiByName <Base-Deprecated />

通过 `name` 查找

### 定义：

```ts
function getPoiByName(name: string): Poi[];
```

### 用法：

```js
const poiList = ssp.getPoiByName('xxx');
```

:::warning 弃用警告
请使用 [`getObjectByName`](./object#getobjectbyname) 替代
:::

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

## getPoiByUserDataProperty <Base-Deprecated />

通过 `userData` 属性查找

### 定义：

```ts
function getPoiByUserDataProperty(propNameOrFindFunc: string | UserDataPropertyFindFunc, value?: any): Poi[];
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
const poiList = ssp.getPoiByUserDataProperty((userData) => userData?.people?.name === 'xiaoming');
```

:::

:::warning 弃用警告
请使用 [`getObjectByUserDataProperty`](./object#getobjectbyuserdataproperty) 替代
:::

## removePoiById <Base-Deprecated />

通过 `id` 移除

### 定义：

```ts
function removePoiById(id: PoiInfo['id']): boolean;
```

### 用法：

```js
ssp.removePoiById('xxx');
```

:::warning 弃用警告
请使用 [`removeObjectById`](./object#removeobjectbyid) 替代
:::

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
- **类型:** [GroupInfo](./sbm#groupinfo)
- **必填:** <Base-RequireIcon :isRequire="true"/>

#### poiInfoList

- **描述:** `poiInfo` 集合
- **类型:** [poiinfo](#poiinfo)[]
- **必填:** <Base-RequireIcon :isRequire="true"/>

## createGroupForPoi <Base-Deprecated />

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
- **类型:** [GroupInfo](./sbm#groupinfo)
- **必填:** <Base-RequireIcon :isRequire="true"/>

:::warning 弃用警告
请使用 [`createGroup`](../guide/objectGroup#creategroup) 替代
:::

## addPoiForGroup

向一个已经存在的组内添加 `poi` 对象。

### 定义：

```ts
function addPoiForGroup(groupId: GroupInfo['id'], poiInfoList: PoiInfo[]): Group | null;
```

### 用法：

```js
ssp.addPoiForGroup(
  // groupId
  'firstPoiGroup',
  // poiInfoList
  [poiInfo4, poiInfo5]
);
```

### 参数

#### groupId

- **描述:** 组 `id`
- **类型:** [groupId](./sbm#groupinfo)[‘id’]
- **必填:** <Base-RequireIcon :isRequire="true"/>

#### poiInfoList

- **描述:** `poiInfo` 集合
- **类型:** [poiinfo](#poiinfo)[]
- **必填:** <Base-RequireIcon :isRequire="true"/>

## getPoiGroupById <Base-Deprecated />

通过 `id` 查找 `poi` 组

### 定义：

```ts
function getPoiGroupById(id: GroupInfo['id']): Group | null;
```

### 用法：

```js
const group = ssp.getPoiGroupById('firstPoiGroup');
```

:::warning 弃用警告
请使用 [`getObjectById`](./object#getobjectbyid) 替代
:::

## getPoiGroupByName <Base-Deprecated />

通过 `name` 查找 `poi` 组

### 定义：

```ts
function getPoiGroupByName(name: string): Group[];
```

### 用法：

```js
const groupList = ssp.getPoiGroupByName('name_firstPoiGroup');
```

:::warning 弃用警告
请使用 [`getObjectByName`](./object#getobjectbyname) 替代
:::

## getAllPoiGroup <Base-Deprecated />

获取所有 `Poi` 对象组

### 定义：

```ts
function getAllPoiGroup(): Group[];
```

### 用法：

```js
const allPoiGroupList = ssp.getAllPoiGroup();
```

:::warning 弃用警告
请使用 [`getAllGroup`](../guide/objectGroup#getallgroup) 替代
:::

## removePoiGroupById <Base-Deprecated />

通过 `id` 移除 `poi` 组

### 定义：

```ts
function removePoiGroupById(id: GroupInfo['id']): boolean;
```

### 用法：

```js
const isRemoveSuccess = ssp.removePoiGroupById('firstPoiGroup');
```

:::warning 弃用警告
请使用 [`removeObjectById`](./object#removeobjectbyid) 替代
:::

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
