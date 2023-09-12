# 控制器（新版）

`v2.10.0-rc.0` 之后发布了全新的控制器，增加了属性配置、方法、事件等。

并且重构了相机相关的所有方法。`setCameraViewpoint`、`flyToObj` 等方法内部都是基于控制器的方法实现。

通过 next 标签安装

```bash
npm install soonspacejs@next
```

所有的属性读写、方法调用、事件监听都推荐以下方式。

```js
const { controls } = ssp;

// 修改属性
controls.enabled = true;
controls.minDistance = 3;

// 读取属性
controls.active;

// 方法调用
controls.rotateAzimuthTo(Math.PI / 2, true);

// 事件监听
controls.addEventListener('update', () => {
  console.log('控制器相机发生变化');
});
```

### 样例:

<Docs-Iframe src="controls/basic.html" />

## 术语

### Orbit 旋转

控制器使用球坐标进行轨道旋转。

![fig1](/images/fig1.svg)

### Dolly 和 Zoom

- Dolly 实际上是移动相机来改变帧中图像的组成（移动）。
- Zoom 包括改变镜头焦距。在 three.js 中，Zoom 实际上是改变相机的 FOV，而相机是静止的（不移动）。

![dolly](/images/dolly-zoom.png)

### Truck 和 Pan

- Truck 相机上下左右的平移操作。
- Pan 原地保持不动，只转动镜头。类似第一人称的操作。

![truck](/images/truck-pan.png)

## 属性

<Docs-Table
:data="[
{ prop: 'enabled', desc: '启用控制器', type: 'boolean', require: false, default: 'true' },
{ prop: 'camera', desc: '当前被控制的相机', type: '透视或正交相机', require: false, default: '[内置相机]' },
{ prop: 'active', desc: '当前控制器是否是激活状态', type: 'boolean', require: false, default: '[只读]' },
{ prop: 'currentAction', desc: '当前 `ACTION`', type: 'ACTION', require: false, default: '[只读]' },
{ prop: 'distance', desc: '相机 `position` 与 `target` 的距离', type: 'number', require: false, default: '[只读]' },
{ prop: 'minDistance', desc: 'Dolly 的最小距离，这个值必须大于0', type: 'number', require: false, default: 'Number.EPSILON' },
{ prop: 'maxDistance', desc: 'Dolly 的最大距离', type: 'number', require: false, default: Infinity },
{ prop: 'minZoom', desc: 'Zoom 的最小值', type: 'number', require: false, default: 0.01 },
{ prop: 'maxZoom', desc: 'Zoom 的最大值', type: 'number', require: false, default: Infinity },
{ prop: 'polarAngle', desc: '当前的极角弧度', type: 'number', require: false, default: '[只读]' },
{ prop: 'minPolarAngle', desc: '最小极角弧度', type: 'number', require: false, default: '0' },
{ prop: 'maxPolarAngle', desc: '最大极角弧度', type: 'number', require: false, default: 'Math.PI' },
{ prop: 'azimuthAngle', desc: '当前的方位角弧度', type: 'number', require: false, default: '[只读]' },
{ prop: 'minAzimuthAngle', desc: '最小方位角弧度', type: 'number', require: false, default: '-Infinity' },
{ prop: 'maxAzimuthAngle', desc: '最大方位角弧度', type: 'number', require: false, default: 'Infinity' },
{ prop: 'boundaryFriction', desc: '边界摩擦比', type: 'number', require: false, default: '0' },
{ prop: 'boundaryEnclosesCamera', desc: '相机位置是否应该被封闭在边界内', type: 'boolean', require: false, default: 'false' },
{ prop: 'smoothTime', desc: '到达目标的大概时间，以秒为单位。数值越小，到达目标的速度越快', type: 'number', require: false, default: '0.25' },
{ prop: 'draggingSmoothTime', desc: '操控时的过渡时间', type: 'number', require: false, default: '0.125' },
{ prop: 'maxSpeed', desc: '最大速度', type: 'number', require: false, default: 'Infinity' },
{ prop: 'azimuthRotateSpeed', desc: '方位角旋转速度', type: 'number', require: false, default: '0.5' },
{ prop: 'polarRotateSpeed', desc: '极角旋转速度', type: 'number', require: false, default: '0.5' },
{ prop: 'dollySpeed', desc: '鼠标滚轮时的相机移动速度', type: 'number', require: false, default: '0.2' },
{ prop: 'truckSpeed', desc: '平移速度', type: 'number', require: false, default: '1' },
{ prop: 'verticalDragToForward', desc: '拖拽时是否前后移动，默认为上下', type: 'boolean', require: false, default: 'false' },
{ prop: 'dollyToCursor', desc: '是否以光标点为 Dolly 目标', type: 'boolean', require: false, default: 'false' },
{ prop: 'dollyDragInverted', desc: '当移动或通过拖动 Dolly 时反转方向', type: 'boolean', require: false, default: false },
{ prop: 'interactiveArea', desc: '在domElement中设置拖拽、触摸和滚轮启用区域。每个值都在0到1之间，其中0表示屏幕的左/上，1表示屏幕的右/下', type: 'DOMRect', require: false, default: '' },
{ prop: 'colliderMeshes', desc: '与相机碰撞的场景对象', type: 'Object3D[]', require: false, default: '[]' },
{ prop: 'infinityDolly', desc: '启用无限 Dolly。与minDistance和maxDistance一起使用', type: 'boolean', require: false, default: 'false' },
{ prop: 'restThreshold', desc: '相机减速时rest事件触发的速度', type: 'number', require: false, default: '0.0025' },
]"
/>

- 每当 360 度的旋转被添加到 `azimuthAngle` 时，这是累积的。`360º = 360 * THREE.MathUtils.DEG2RAD = Math.PI * 2`，`720º = Math.PI * 4`。

```js
controls.normalizeRotations();

console.log(controls.azimuthAngle);
```

- 注意 `colliderMeshes` 可能会降低性能。碰撞测试使用来自相机的 4 个光线投射器，因为近平面有 4 个角。
- 如果 Dolly 的距离小于（或大于）minDistance （或 maxDistance ），则 infinityDolly 将保持距离并推动目标（target）位置。

## 事件

`controls` 发出以下事件。

订阅方式：通过 `controls.addEventListener( 'eventname', function )`

如需取消订阅：请使用 `controls.removeEventListener( 'eventname', function )`

| 事件名称            | 触发时机                                                     |
| ------------------- | ------------------------------------------------------------ |
| `'controlstart'`    | 当用户开始通过鼠标或手指操作时                               |
| `'control'`         | 当用户正在操作时                                             |
| `'controlend'`      | 用户结束操作时                                               |
| `'transitionstart'` | 任意过渡开始时，用户操作或方法调用 `enableTransition = true` |
| `'update'`          | 当相机 `position` 发生变化                                   |
| `'wake'`            | 当相机开始移动时                                             |
| `'rest'`            | 当相机将要停止时 由 `restThreshold` 控制                     |
| `'sleep'`           | 当相机结束移动                                               |

- `mouseButtons.wheel` (鼠标滚轮控制)不发出 `controlstart` 和 `controlend`。`mouseButtons.wheel` 在内部使用滚动事件，并且滚动事件间歇性地发生。这意味着无法检测到 start 和 end。

- 由于阻尼，`sleep` 通常会在相机看起来已经停止移动的几秒钟后触发。如果你想在相机停止的时候做一些事情(例如，启用 UI，执行另一个过渡)，你可能想要 rest 事件。这可以使用 `restthreshold` 参数进行微调。

## 用户操作配置

`ACTION` 常量请从 `SoonSpace` 中获取

```js
import SoonSpace from 'soonspacejs';

const { ACTION } = SoonSpace;

controls.mouseButtons.left = ACTION.ROTATE;
controls.mouseButtons.right = ACTION.TRUCK;

controls.touches.one = ACTION.TOUCH_ROTATE;
controls.touches.two = ACTION.TOUCH_DOLLY_TRUCK;
```

表格中 \* 表示默认值

| 鼠标键位              | 行为                                                                                                       |
| --------------------- | ---------------------------------------------------------------------------------------------------------- |
| `mouseButtons.left`   | `ACTION.ROTATE`\* \| `ACTION.TRUCK` \| `ACTION.OFFSET` \| `ACTION.DOLLY` \| `ACTION.ZOOM` \| `ACTION.NONE` |
| `mouseButtons.right`  | `ACTION.ROTATE` \| `ACTION.TRUCK`\* \| `ACTION.OFFSET` \| `ACTION.DOLLY` \| `ACTION.ZOOM` \| `ACTION.NONE` |
| `mouseButtons.wheel`  | `ACTION.ROTATE` \| `ACTION.TRUCK` \| `ACTION.OFFSET` \| `ACTION.DOLLY`\* \| `ACTION.ZOOM` \| `ACTION.NONE` |
| `mouseButtons.middle` | `ACTION.ROTATE` \| `ACTION.TRUCK` \| `ACTION.OFFSET` \| `ACTION.DOLLY`\* \| `ACTION.ZOOM` \| `ACTION.NONE` |

- `mouseButtons.wheel` 的默认行为是：
  - `DOLLY` 用于 `PerspectiveCamera`
  - `ZOOM` 用于 `OrthographicCamera`， 并且无法设置 `DOLLY`.

| 触控操作        | 行为                                                                                                                                                                                                                                                                                                                        |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `touches.one`   | `ACTION.TOUCH_ROTATE`\* \| `ACTION.TOUCH_TRUCK` \| `ACTION.TOUCH_OFFSET` \| `ACTION.DOLLY`                                                                                                                                                                                                                                  | `ACTION.ZOOM` | `ACTION.NONE` |
| `touches.two`   | `ACTION.TOUCH_DOLLY_TRUCK` \| `ACTION.TOUCH_DOLLY_OFFSET` \| `ACTION.TOUCH_DOLLY_ROTATE` \| `ACTION.TOUCH_ZOOM_TRUCK` \| `ACTION.TOUCH_ZOOM_OFFSET` \| `ACTION.TOUCH_ZOOM_ROTATE` \| `ACTION.TOUCH_DOLLY` \| `ACTION.TOUCH_ZOOM` \| `ACTION.TOUCH_ROTATE` \| `ACTION.TOUCH_TRUCK` \| `ACTION.TOUCH_OFFSET` \| `ACTION.NONE` |
| `touches.three` | `ACTION.TOUCH_DOLLY_TRUCK` \| `ACTION.TOUCH_DOLLY_OFFSET` \| `ACTION.TOUCH_DOLLY_ROTATE` \| `ACTION.TOUCH_ZOOM_TRUCK` \| `ACTION.TOUCH_ZOOM_OFFSET` \| `ACTION.TOUCH_ZOOM_ROTATE` \| `ACTION.TOUCH_ROTATE` \| `ACTION.TOUCH_TRUCK` \| `ACTION.TOUCH_OFFSET` \| `ACTION.NONE`                                                |

- `touches.two` 和 `touches.three` 的默认行为分别是：
  - `TOUCH_DOLLY_TRUCK` 用于 `PerspectiveCamera`
  - `TOUCH_ZOOM_TRUCK` 用于 `OrthographicCamera`，并且无法设置 `TOUCH_DOLLY_TRUCK` 和 `TOUCH_DOLLY`

## 方法

coding...

### rotate( azimuthAngle, polarAngle, enableTransition )

### rotatePolarTo( polarAngle, enableTransition )

### rotateTo( azimuthAngle, polarAngle, enableTransition )

### dolly( distance, enableTransition )

### dollyTo( distance, enableTransition )

### dollyInFixed( distance, enableTransition )

### zoom( zoomStep, enableTransition )

### zoomTo( zoom, enableTransition )

### truck( x, y, enableTransition )

### lookInDirectionOf( x, y, z, enableTransition )

### setFocalOffset( x, y, z, enableTransition )

### setOrbitPoint( targetX, targetY, targetZ )

### forward( distance, enableTransition )

### moveTo( x, y, z, enableTransition )

### elevate( height, enableTransition )

### fitToBox( box3OrMesh, enableTransition, { paddingTop, paddingLeft, paddingBottom, paddingRight } )

### fitToSphere( sphereOrMesh, enableTransition )

### setLookAt

#### 定义

```ts
function setLookAt(positionX: number, positionY: number, positionZ: number, targetX: number, targetY: number, targetZ: number, enableTransition?: boolean): Promise<void>;
```

### lerpLookAt( positionAX, positionAY, positionAZ, targetAX, targetAY, targetAZ, positionBX, positionBY, positionBZ, targetBX, targetBY, targetBZ, t, enableTransition )

### setPosition( positionX, positionY, positionZ, enableTransition )

### setTarget( targetX, targetY, targetZ, enableTransition )

### setBoundary( box3? )

### setViewport( vector4? )

### setViewport( x, y, width, height )

### getTarget( out, receiveEndValue )

### getPosition( out, receiveEndValue )

### getSpherical( out, receiveEndValue )

### getFocalOffset( out, receiveEndValue )

### saveState()

### normalizeRotations()

### reset( enableTransition )

### addEventListener( type: string, listener: function )

添加一个事件监听

### removeEventListener( type: string, listener: function )

移除一个事件监听

### removeAllEventListeners( type: string )

移除所有改类型的事件监听
