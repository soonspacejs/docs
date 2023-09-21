# 相机

`v2.10.x` 版本之后，相机所有的方法都基于 [controls](./controls.html) 实现。

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
function setCameraViewpoint(data: CameraViewpointData | CameraViewpointDataLegacy, enableTransition?: boolean): Promise<void>;
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
  },
  true
);
```

### 参数：

#### data

- **描述:** 由 `getCameraViewpoint` 获取到的相机视角数据。
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** CameraViewpointData

##### CameraViewpointData

<Docs-Table
    :data="[
      { prop: 'position', desc: '相机位置', type: 'Position', require: true, default: '', link: '../guide/types.html#position' },
      { prop: 'rotation', desc: '相机旋转弧度', type: 'Rotation', require: true, default: '', link: '../guide/types.html#rotation' },
    ]"
/>

`v2.10.x` 版本之后数据格式发生变化，但也兼容了旧版的 `rotation` 参数

<Docs-Table
    :data="[
      { prop: 'position', desc: '相机位置', type: 'Position', require: true, default: '', link: '../guide/types.html#position' },
      { prop: 'target', desc: '相机朝向位置', type: 'Position', require: true, default: '', link: '../guide/types.html#position' },
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
- **类型:** [FlyToViewpoint](../guide/types.html#flyToViewpoint)
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

function flyToObj(object: BaseObject3D | BaseMesh, viewpoint: FlyToViewpoint | Rotation | Euler = 'frontTop', options: FlyToObjOptions = {}): Promise<void>;
```

`v2.10.x` 版本之后更新了类型

```ts
interface FlyToObjOptions {
  enableTransition?: boolean;
  padding?: number | string;
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

- **描述:** 相机朝向物体对象的视角面，[可选枚举](../../guide/controls/viewpoints.html)。
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** [FlyToViewpoint](../guide/types.html#flytoviewpoint)
- **默认值:** `frontTop`

#### option

- **描述:** 可配置项
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** FlyToObjOptions

##### FlyToObjOptions

`v2.10.x`
<Docs-Table
    :data="[
      { prop: 'padding', desc: '视角后飞向的偏移量', type: 'number | string', require: false, default: '30%' },
      { prop: 'enableTransition', desc: '是否开启过渡效果', type: 'boolean', require: false, default: 'true' },
    ]"
/>
::: tip 提示
内部是调用 `controls.fitToBox` 方法
:::

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

<!-- flyTo -->

## flyTo（废弃） <Base-Deprecated />

相机飞向固定位置

### 样例：

<Docs-Iframe src="camera/flyTo.html" />

### 定义：

```ts
function flyTo(position: Position, rotation: FlyToViewpoint | Rotation | Euler = 'frontTop', options?: AnimationOptions): Promise<void>;
```

### 用法：

```js
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
```

### 参数：

#### position

- **描述:** 相机飞向的坐标点
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** [Position](../guide/types.html#position)

#### rotation

- **描述:** 相机的旋转弧度
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** [FlyToViewpoint](../guide/types.html#flytoviewpoint) | [Rotation](../guide/types.html#rotation)
- **默认值:** `frontTop`

#### option

- **描述:** 可配置项
- **类型:** [AnimationOptions](./animation.html#animationoptions)
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **默认值:** `{}`

::: warning 注意
`flyTo` 在 `v2.10.x` 版本中已废弃，请使用 [setCameraViewpoint](#setcameraviewpoint) 替代
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
- **类型:** [Position](../guide/types.html#position)
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
