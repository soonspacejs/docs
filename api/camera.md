# 相机

`v2.10.x` 版本之后，相机所有的方法都基于 [controls](./controls) 实现。

## setCamera

设置相机类型以及视角数据

### 样例：

<Docs-Iframe src="camera/cameraType.html" />

### 定义：

```ts
type CameraType = 'perspective' | 'orthographic';

function setCamera(cameraType: CameraType, viewpoint?: CameraViewpointData, enableTransition?: boolean): Promise<void>;
```

### 用法：

```js
ssp.setCamera('orthographic');

// 设置正交相机，并且设置视角数据
ssp.setCamera(
  'orthographic',
  {
    position: {
      x: 100,
      y: 100,
      z: 100,
    },
    target: {
      x: 0,
      y: 0,
      z: 0,
    },
    zoom: 1,
  },
  true
);
```

### 参数：

#### cameraType

- **描述:** 要设置的相机类型。perspective 表示透视相机，orthographic 表示正交相机。
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** CameraType

剩余两个参数与 [setCameraViewpoint](#setcameraviewpoint) 一致，只是 `viewpoint` 为可选参数。

<!-- getCameraViewpoint -->

## getCameraViewpoint

获取当前相机视角数据

### 定义：

```ts
function getCameraViewpoint(): CameraViewpointData;
```

### 用法：

```js
const cameraViewpointData = ssp.getCameraViewpoint();
console.log('cameraViewpointData', cameraViewpointData);
```

<!-- setCameraViewpoint -->

## setCameraViewpoint

设置当前相机视角数据，数据由 `getCameraViewpoint` 获取。

### 定义：

```ts
// v2.9.x
function setCameraViewpoint(data: CameraViewpointData): void;

// v2.10.x
function setCameraViewpoint(
  data: CameraViewpointData | CameraViewpointDataLegacy,
  enableTransition?: boolean
): Promise<void>;
```

### 用法

```js
// v2.9.x
ssp.setCameraViewpoint({
  position: {
    x: 100,
    y: 100,
    z: 100,
  },
  rotation: {
    x: 0,
    y: Math.PI / 2,
    z: 0,
  },
});

// v2.10.x
await ssp.setCameraViewpoint(
  {
    position: {
      x: 100,
      y: 100,
      z: 100,
    },
    target: {
      x: 0,
      y: 0,
      z: 0,
    },
    zoom: 1,
  },
  true
);
```

### 参数：

#### data

- **描述:** 由 `getCameraViewpoint` 获取到的相机视角数据。
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** [CameraViewpointData](../guide/types#cameraviewpointdata) | CameraViewpointDataLegacy

##### CameraViewpointDataLegacy

<Docs-Table
    :data="[
      { prop: 'position', desc: '相机位置', type: 'Position', require: true, default: '', link: '../guide/types#position' },
      { prop: 'rotation', desc: '相机旋转弧度', type: 'Rotation', require: true, default: '', link: '../guide/types#rotation' },
    ]"
/>

`v2.10.x` 版本之后数据格式发生变化，但也兼容了旧版的 `rotation` 参数

##### CameraViewpointData

<Docs-Table
    :data="[
      { prop: 'position', desc: '相机位置', type: 'Position', require: true, default: '', link: '../guide/types#position' },
      { prop: 'target', desc: '相机朝向位置', type: 'Position', require: true, default: '', link: '../guide/types#position' },
      { prop: 'zoom', desc: '相机焦距', type: 'number', require: true, default: '' },
    ]"
/>

#### enableTransition

- **描述:** 是否开启过渡效果，默认值为 `false`
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** `boolean`

::: tip 提示
也可以直接使用 [setLookAt](../api/controls.md#setlookat) 方法
:::

<!-- flyMainViewpoint -->

## flyMainViewpoint

相机飞向主场景视角

### 定义：

```ts
function flyMainViewpoint(viewpoint: FlyToViewpoint = 'frontTop', options: FlyToObjOptions = {}): Promise<void>;
```

### 用法：

```js
ssp
  .flyMainViewpoint('top')
  .then((object) => console.log('flyMainViewpoint done', object))
  .catch((err) => console.error(err));
```

### 参数：

#### viewpoint

- **描述:** 相机朝向主场景的视角面
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** [FlyToViewpoint](../guide/types#flyToViewpoint)
- **默认值:** `frontTop`

#### options

- **描述:** 可配置参数
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** [FlyToObjOptions](#flytoobjoptions)

<!-- flyToObj -->

## flyToObj

相机飞向对象

### 样例：

<Docs-Iframe src="camera/viewpointEnum.html" />

### 定义：

```ts
interface FlyToObjOptions extends AnimationOptions {
  padding?: number | string;
}

function flyToObj(
  object: BaseObject3D | BaseMesh,
  viewpoint: FlyToViewpoint | Rotation | Euler = 'frontTop',
  options: FlyToObjOptions = {}
): Promise<void>;
```

`v2.10.x` 版本之后更新了类型

```ts
interface FlyToObjOptions {
  enableTransition?: boolean;
  padding?: number | string;
  minPadding?: number;
  viewpointSpace?: 'world' | 'local';
}

function flyToObj(object: Object3D | Box3, viewpoint?: FlyToViewpoint, options?: FlyToObjOptions): Promise<void>;
```

### 用法：

```js
// v2.9.x
ssp
  .flyToObj(
    // object
    sbm,
    // viewpoint
    'top',
    // option
    {
      padding: '30%',
      duration: 1000,
    }
  )
  .then((object) => console.log('flyToObj done', object))
  .catch((err) => console.error(err));

// v2.10.x
ssp.flyToObj(sbm, 'left', { padding: '30%', enableTransition: false });
```

### 参数：

#### object

- **描述:** 相机飞向的空间对象
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** `Object3D` | `Box3`

#### viewpoint

- **描述:** 相机朝向对象的视口面。
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** [FlyToViewpoint](../guide/types#flytoviewpoint)
- **默认值:** `frontTop`

#### option

- **描述:** 可配置项
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** FlyToObjOptions

##### FlyToObjOptions

`v2.9.x`
<Docs-Table
    :data="[
      { prop: 'padding', desc: '视角后飞向的偏移量', type: 'number | string', require: false, default: '30%' },
      {
        prop: 'duration', desc: '补间执行时长（ms）', type: 'number', require: false, default: '1000'
      },
      {
        prop: 'delay', desc: '补间开始前延时（ms）', type: 'number', require: false, default: '0'
      },
      {
        prop: 'repeat', desc: '循环', type: 'number | boolean', require: false, default: 'false'
      }
    ]"
/>

`v2.10.x`
<Docs-Table
    :data="[
      { prop: 'enableTransition', desc: '是否开启过渡效果', type: 'boolean', require: false, default: 'true' },
      { prop: 'padding', desc: '视角后飞向的偏移量', type: 'number | string', require: false, default: '30%' },
      { prop: 'minPadding', desc: '计算的最小偏移量，防止飞向空节点时相机锁死', type: 'number', require: false, default: '1' },
      { prop: 'viewpointSpace', desc: '`viewpoint` 相对于场景或对象，默认相对于场景', type: 'world | local', require: false, default: 'world' },
    ]"
/>

::: tip 提示
内部是调用 `controls.fitToBox` 方法
:::

<!-- flyTo -->

## flyTo

相机飞向固定位置

### 样例：

<Docs-Iframe src="camera/flyTo.html" />

### 定义：

```ts
function flyTo(
  position: Position,
  rotation: FlyToViewpoint | Rotation | Euler = 'frontTop',
  options?: AnimationOptions
): Promise<void>;
```

`v2.10.x` 版本之后更新了类型

```ts
interface FlyToOptions {
  enableTransition?: boolean;
}

function flyTo(
  position: Position,
  rotation: FlyToViewpoint | Rotation | Euler = 'frontTop',
  options?: FlyToOptions
): Promise<void>;
```

### 用法：

```js

// v2.9.x
ssp.flyTo(
  // position
  {
    x: 0,
    y: 1000,
    z: 1000
  },
  // rotation
  {
    x: 0,
    y: 0,
    z: 0
  },
  // option
  {
    duration: 1000
  }
)
  .then(res => console.log(res)
  .catch(err => console.error(err))

// v2.10.x
await ssp.flyTo(
   // position
  {
    x: 0,
    y: 1000,
    z: 1000
  },
  // rotation
  {
    x: 0,
    y: 0,
    z: 0
  },
   // option
  {
    enableTransition: true
  }
)
```

### 参数：

#### position

- **描述:** 相机飞向的坐标点
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** [Position](../guide/types#position)

#### rotation

- **描述:** 相机的旋转弧度
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** [FlyToViewpoint](../guide/types#flytoviewpoint) | [Rotation](../guide/types#rotation)
- **默认值:** `frontTop`

#### options

`v2.9.x`

- **描述:** 可配置项
- **类型:** [AnimationOptions](./animation#animationoptions)
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **默认值:** `{}`

`v2.10.x`

- **描述:** 可配置项
- **类型:** `FlyToOptions`
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **默认值:** `{ enableTransition: true }`

::: warning 注意
`flyTo` 以向后兼容保留，你也可以使用 [setCameraViewpoint](#setcameraviewpoint) 替代
:::

<!-- surroundOnTarget -->

## surroundOnTarget

围绕一个目标点旋转

### 样例：

<Docs-Iframe src="camera/surround.html" />

### 定义：

```ts
interface SurroundOptions {
  duration?: number;
  startAngle?: number;
  endAngle?: number;
  end?: number;
  onStart?: (tween: Tween<{ radian: number }>) => void;
}

function surroundOnTarget(target: Position, options: SurroundOptions = {}): Promise<void>;
```

### 用法：

```js
ssp
  .surroundOnTarget(
    // target
    {
      x: 0,
      y: 0,
      z: 0,
    },
    // option
    {
      startAngle: 0,
      endAngle: 360,
      duration: 2000,
      onStart: (tween) => {
        console.log('旋转动画对象', tween);
      },
    }
  )
  .then(() => console.log('surroundOnTarget done'))
  .catch((err) => console.error(err));
```

### 参数：

#### target

- **描述:** 目标点
- **类型:** [Position](../guide/types#position)
- **必填:** <Base-RequireIcon :isRequire="true"/>

#### options

- **描述:** 可配置项
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** SurroundOptions
- **默认值:** `{}`

##### SurroundOptions

<Docs-Table
    :data="[
      { prop: 'startAngle', desc: '起始旋转角度', type: 'number', require: false, default: '0' },
      { prop: 'endAngle', desc: '结束旋转角度', type: 'number', require: false, default: '360' },
      { prop: 'duration', desc: '旋转动画过渡时间', type: 'number', require: false, default: '3000' },
      { prop: 'onStart', desc: '旋转开始回调函数', type: 'function(tween){}', require: false, default: '' },
    ]"
/>

<!-- surroundOnObject -->

## surroundOnObject

围绕一个目标对象旋转

### 定义：

```ts
function surroundOnObject(object: BaseObject3D | BaseMesh, options: SurroundOptions = {}): Promise<void>;
```

### 用法：

```js
ssp
  .surroundOnObject(
    // object
    ssp.getObjectById('xxx'),
    // option
    {
      startAngle: 0,
      endAngle: 360,
      duration: 2000,
      onStart: (tween) => {
        console.log('旋转动画对象', tween);
      },
    }
  )
  .then(() => console.log('surroundOnObject done'))
  .catch((err) => console.error(err));
```

### 参数：

#### object

- **描述:** 目标对象
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** `Object3D`

#### options

- **描述:** 可配置项
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** [SurroundOptions](#surroundoptions)
- **默认值:** `{}`
