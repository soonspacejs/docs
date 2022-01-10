# 通用模型

::: tip 支持格式
支持的格式有 `gltf (glb)、fbx`
:::

## loadModel

加载 `model` 模型。

### 样例：

<Docs-Iframe src="model/loadGltf.html" />

### 定义：

```ts
interface ModelInfo extends BaseObject3DInfo, ObjectEvents<Model> {
  url: string;
}

function loadModel(modelInfo: ModelInfo): Promise<Model>;
```

### 用法：

```js
ssp
  .loadModel(
    // modelInfo
    {
      id: 'xx',
      name: 'xx',
      url: 'xx/x.fbx',
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
  .then((model) => console.log(model))
  .catch((err) => console.error(err));
```

### 参数：

#### modelInfo

- **描述:** 实例 `Model` 对象所需信息
- **类型:** ModelInfo
- **必填:** <Base-RequireIcon :isRequire="true"/>

##### ModelInfo

<Docs-Table
    :data="[
      { prop: 'id', desc: '唯一ID', type: 'string | number', require: true, default: '' },
      { prop: 'name', desc: '名称', type: 'string', require: false, default: '' },
      { prop: 'url', desc: '资源路径', type: 'string', require: true, default: '' },
      { prop: 'level', desc: '显示层级范围', type: 'Level', require: false, default: '{ max: null, min: null }', link: '../guide/types.html#level' },
      { prop: 'position', desc: '位置坐标', type: 'Position', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types.html#position' },
      { prop: 'rotation', desc: '旋转弧度', type: 'Rotation', require: false, default: '{ x: 0, y: 0, z: 0 }', link: '../guide/types.html#rotation' },
      { prop: 'scale', desc: '缩放比例', type: 'Scale', require: false, default: '{ x: 1, y: 1, z: 1 }', link: '../guide/types.html#scale' },
      { prop: 'userData', desc: '用户数据', type: 'any', require: false, default: '{}' },
      { prop: 'onClick', desc: '左键单击事件', type: '(object: Model) =&gt; void', require: false, default: 'null' },
      { prop: 'onDblClick', desc: '左键双击事件', type: '(object: Model) =&gt; void', require: false, default: 'null' },
      { prop: 'onRightClick', desc: '右键单击事件', type: '(object: Model) =&gt; void', require: false, default: 'null' },
      { prop: 'onLoad', desc: '加载完成事件', type: '(object: Model) =&gt; void', require: false, default: 'null' },
    ]"
/>

## cloneModel

克隆 Model 模型

### 定义:

```ts
interface CloneModelInfo extends Omit<ModelInfo, 'url'> {}

function cloneModel(
  model: Model,
  modelInfo: CloneModelInfo,
  parent?: BaseObject3D | null
): Promise<Model>;
```

### 用法:

```js
const clonedModel = await ssp.cloneModel(model, {
  id: 'clone_model',
  position: {
    x: 100,
    y: 0,
    z: 0,
  },
});
```

### 参数:

#### model

- **描述:** Model 对象
- **类型:** `Model`
- **必填:** <Base-RequireIcon />

#### modelInfo

同 [ModelInfo](#modelinfo), 但不需要字段 `url`。

#### parent

- **描述:** 将 `Model` 克隆到的 `parent` 下
- **类型:** `Model`
- **必填:** <Base-RequireIcon :isRequire="false" />

## getModelById

通过 `id` 查找

### 定义：

```ts
function getModelById(id: ModelInfo['id']): Model | null;
```

### 用法：

```js
const model = ssp.getModelById('xxx');
```

## getModelByName

通过 `name` 查找

### 定义：

```ts
function getModelByName(name: string): Model[];
```

### 用法：

```js
const modelList = ssp.getModelByName('xxx');
```

## getAllModel

获取所有 `Model` 对象

### 定义：

```ts
function getAllModel(): Model[];
```

### 用法：

```js
const allModelList = ssp.getAllModel();
```

## getModelByUserDataProperty

通过 `userData` 属性查找

### 定义：

```ts
function getModelByUserDataProperty(
  propNameOrFindFunc: string | UserDataPropertyFindFunc,
  value?: any
): Model[];
```

### 用法：

```js
const modelList = ssp.getModelByUserDataProperty('propKey'， 'propVal')
// or
const modelList = ssp.getModelByUserDataProperty(item => item['itemPropKey'] === 'itemPropVal')
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
model.userData = {
  people: {
    name: 'xiaoming',
    age: 18,
  },
};
const modelList = ssp.getModelByUserDataProperty(
  (userData) => userData?.people?.name === 'xiaoming'
);
```

:::

## removeModelById

通过 `id` 移除

### 定义：

```ts
function removeModelById(id: ModelInfo['id']): boolean;
```

### 用法：

```js
ssp.removeModelById('xxx');
```

## loadModelToGroup

加载 `model` 到一个组内。

### 定义：

```ts
function loadModelToGroup(
  groupInfo: GroupInfo,
  modelInfoList: ModelInfo[]
): Promise<Group>;
```

### 用法：

```js
ssp
  .loadModelToGroup(
    // groupInfo
    {
      id: 'firstModelGroup',
      name: 'name_firstModelGroup',
      // ...
    },
    // modelInfoList
    [modelInfo1, modelInfo2, modelInfo3]
  )
  .then((group) => console.log(group));
```

### 参数

#### groupInfo

- **描述:** 实例组对象所需信息
- **类型:** [GroupInfo](./sbm.html#groupinfo)
- **必填:** <Base-RequireIcon :isRequire="true"/>

#### modelInfoList

- **描述:** `modelInfo` 集合
- **类型:** [modelinfo](#modelinfo)[]
- **必填:** <Base-RequireIcon :isRequire="true"/>

## createGroupForModel

为 `model` 提前创建一个空组。
::: tip 使用场景
与 `loadModelToGroup` 不同，有些时候可能你还没有具体的 `modelInfo` 数据，但你想提前创建一个批量管理的空组，当有数据时再使用 [addModelForGroup](#addmodelforgroup) 插入。
:::

### 定义：

```ts
function createGroupForModel(groupInfo: GroupInfo): Group;
```

### 用法：

```js
ssp.createGroupForModel({
  id: 'firstModelGroup',
  name: 'name_firstModelGroup',
  // ...
});
```

### 参数

#### groupInfo

- **描述:** 实例组对象所需信息
- **类型:** [GroupInfo](./sbm.html#groupinfo)
- **必填:** <Base-RequireIcon :isRequire="true"/>

## addModelForGroup

向一个已经存在的组内添加 `model` 对象。

### 定义：

```ts
function addModelForGroup(
  groupId: GroupInfo['id'],
  modelInfoList: ModelInfo[]
): Promise<Group | null>;
```

### 用法：

```js
ssp
  .addModelForGroup(
    // groupId
    'firstModelGroup',
    // modelInfoList
    [modelInfo4, modelInfo5],
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

#### modelInfoList

- **描述:** `modelInfo` 集合
- **类型:** [modelinfo](#modelinfo)[]
- **必填:** <Base-RequireIcon :isRequire="true"/>

## getModelGroupById

通过 `id` 查找 `model` 组

### 定义：

```ts
function getModelGroupById(id: GroupInfo['id']): Group | null;
```

### 用法：

```js
const group = ssp.getModelGroupById('firstModelGroup');
```

## getModelGroupByName

通过 `name` 查找 `model` 组

### 定义：

```ts
function getModelGroupByName(name: string): Group[];
```

### 用法：

```js
const groupList = ssp.getModelGroupByName('name_firstModelGroup');
```

## getAllModelGroup

获取所有 `Model` 对象组

### 定义：

```ts
function getAllModelGroup(): Group[];
```

### 用法：

```js
const allModelGroupList = ssp.getAllModelGroup();
```

## removeModelGroupById

通过 `id` 移除 `model` 组

### 定义：

```ts
function removeModelGroupById(id: GroupInfo['id']): boolean;
```

### 用法：

```js
const isRemoveSuccess = ssp.removeModelGroupById('firstModelGroup');
```

## clearModel

清除当前场景内所有 `model` 对象。

### 定义：

```ts
function clearModel(): void;
```

### 用法：

```js
ssp.clearModel();
```

## showAllModel

显示当前场景内所有 `model` 对象。

### 定义：

```ts
function showAllModel(): void;
```

### 用法：

```js
ssp.showAllModel();
```

## hideAllModel

隐藏当前场景内所有 `model` 对象。

### 定义：

```ts
function hideAllModel(): void;
```

### 用法：

```js
ssp.hideAllModel();
```

## playModelAnimation

播放模型动画。

### 定义：

```ts
interface ModelAnimationFindFunc {
  (
    animation: AnimationClip,
    index: number,
    animations: AnimationClip[]
  ): boolean;
}

function playModelAnimation(
  model: Model,
  animation: number | AnimationClip | ModelAnimationFindFunc
): AnimationAction | undefined;
```

### 用法：

```js
const model = ssp.getModelById('xxxx');

// number
ssp.playModelAnimation(model, 0);
// or AnimationClip
ssp.playModelAnimation(model, model.animations[0]);
// or ModelAnimationFindFunc
ssp.playModelAnimation(model, (itemAnimation) => itemAnimation.name === 'run');
```

### 参数：

#### model

- **描述:** 模型对象
- **类型:** [Model](../sceneObject/Model.html)
- **必填:** <Base-RequireIcon :isRequire="true"/>

#### animation

- **描述:** 动画信息
- **类型:** number | [AnimationClip](https://threejs.org/docs/index.html?q=AnimationClip#api/en/animation/AnimationClip) | ModelAnimationFindFunc
- **必填:** <Base-RequireIcon :isRequire="true"/>

## stopModelAnimation

停止模型动画。

### 定义：

```ts
function stopModelAnimation(
  model: Model,
  animation: number | AnimationClip | ModelAnimationFindFunc
): void;
```

### 用法：

```js
const model = ssp.getModelById('xxxx');

// number
ssp.stopModelAnimation(model, 0);
// or AnimationClip
ssp.stopModelAnimation(model, model.animations[0]);
// or ModelAnimationFindFunc
ssp.stopModelAnimation(model, (itemAnimation) => itemAnimation.name === 'run');
```

### 参数：

#### model

- **描述:** 模型对象
- **类型:** [Model](../sceneObject/Model.html)
- **必填:** <Base-RequireIcon :isRequire="true"/>

#### animation

- **描述:** 动画信息
- **类型:** number | [AnimationClip](https://threejs.org/docs/index.html?q=AnimationClip#api/en/animation/AnimationClip) | ModelAnimationFindFunc
- **必填:** <Base-RequireIcon :isRequire="true"/>

## setModelDracoDecoderPath

设置模型的 DRACO 解压库路径

### 定义：

```ts
function setModelDracoDecoderPath(path: string): void;
```

### 用法：

```js
ssp.setModelDracoDecoderPath('/examples/js/libs/draco/');
```
