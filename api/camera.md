# 相机

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
function setCameraViewpoint(viewpointData: CameraViewpointData): void;
```

### 用法

```js
ssp.setCameraViewpoint(cameraViewpointData);
```

### 参数：

#### viewpointData

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

<!-- flyMainViewpoint -->

## flyMainViewpoint

相机飞向主场景视角

### 定义：

```ts
function flyMainViewpoint(
  viewpoint: FlyToViewpoint = 'frontTop',
  options: FlyToObjOptions = {}
): Promise<[AnimationReturn<Position>, AnimationReturn<Rotation>]>;
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
- **默认值:** `frontTop`

<!-- flyToObj -->

## flyToObj

相机飞向对象

### 定义：

```ts
interface FlyToObjOptions extends AnimationOptions {
  padding?: number;
}

function flyToObj(
  object: BaseObject3D | BaseMesh,
  viewpoint: FlyToViewpoint = 'frontTop',
  options: FlyToObjOptions = {}
): Promise<[AnimationReturn<Position>, AnimationReturn<Rotation>]>;
```

### 用法：

```js
ssp
  .flyToObj(
    // object
    sbm,
    // viewpoint
    'top',
    // option
    {
      padding: 100,
      duration: 1000,
    }
  )
  .then((object) => console.log('flyToObj done', object))
  .catch((err) => console.error(err));
```

### 参数：

#### object

- **描述:** 相机飞向的空间对象
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** [BaseObject3D](../sceneObject/BaseObject3D.html) | [BaseMesh](../sceneObject/BaseMesh.html)

#### viewpoint

- **描述:** 相机朝向物体对象的视角面，[可选枚举](../../guide/controls/viewpoints.html)。
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** [FlyToViewpoint](../guide/types.html#flyToViewpoint)
- **默认值:** `frontTop`

#### option

- **描述:** 可配置项
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** FlyToObjOptions

##### FlyToObjOptions

<Docs-Table
    :data="[
      { prop: 'padding', desc: '视角后飞向的偏移量', type: 'number', require: false, default: '0' },
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

## flyTo

相机飞向固定位置

### 定义：

```ts
function flyTo(
  position: Position,
  rotation: FlyToViewpoint | Rotation | Euler = 'frontTop',
  options?: AnimationOptions
): Promise<[AnimationReturn<Position>, AnimationReturn<Rotation>]>;
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
- **类型:** [Viewpoint](../guide/types.html#Viewpoint) | [Rotation](../guide/types.html#rotation)
- **默认值:** `frontTop`

#### option

- **描述:** 可配置项
- **类型:** [AnimationOptions](./animation.html#animationoptions)
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **默认值:** `{}`

<!-- surroundOnTarget -->

## surroundOnTarget

围绕一个目标点旋转

### 定义：

```ts
function surroundOnTarget(
  target: Position,
  options: SurroundOptions = {}
): Promise<void>;
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
      angle: 360,
      speed: 2,
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
      { prop: 'angle', desc: '旋转角度', type: 'number', require: false, default: '360' },
      {
        prop: 'speed', desc: '旋转速度', type: 'number', require: false, default: '1'
      }
    ]"
/>

<!-- surroundOnObject -->

## surroundOnObject

围绕一个目标对象旋转

### 定义：

```ts
function surroundOnTarget(
  position: Position,
  rotation: FlyToViewpoint | Rotation = 'frontTop',
  options?: AnimationOptions
): Promise<[AnimationReturn<Position>, AnimationReturn<Rotation>]>;
```

### 用法：

```js
ssp
  .surroundOnTarget(
    // object
    ssp.getSbmById('xxx'),
    // option
    {
      angle: 360,
      speed: 2,
    }
  )
  .then(() => console.log('surroundOnTarget done'))
  .catch((err) => console.error(err));
```

### 参数：

#### object

- **描述:** 目标对象
- **必填:** <Base-RequireIcon :isRequire="true"/>
- **类型:** [BaseObject3D](../sceneObject/BaseObject3D.html) | [BaseMesh](../sceneObject/BaseMesh.html)

#### options

- **描述:** 可配置项
- **必填:** <Base-RequireIcon :isRequire="false"/>
- **类型:** [SurroundOptions](#surroundoptions)
- **默认值:** `{}`
