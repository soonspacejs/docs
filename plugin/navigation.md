---
sidebarDepth: 2
---

# plugin-navigation

<br>
导航插件。

导航插件拥有三个部分的内容，分别为

- 导航相机(多视角跟踪相机) ✅
- 导航地图（将来）
- 导航控制器（将来）

## 安装

```bash
npm install @soonspacejs/plugin-navigation@next -S
# or
yarn add @soonspacejs/plugin-navigation@next -S
```

## 导航相机

### 样例

<Docs-Iframe src="plugin/navigation.html" />

### 使用方法

```typescript
import SoonSpace from "soonspacejs";
import { NavigateCamera } from "@soonspacejs/plugin-navigation";

const ssp = new SoonSpace({
	el: "#view",
	options: {},
	event: {},
});

const navigateCamera = new NavigateCamera(ssp);

navigateCamera.active();
```

### NavigateCamera(ssp, camera?, options?, controls?)

> **camera** 可以在初始化时传入，若不传入，在该类内部会自动创建一个默认的 透视投影相机(Perspective Camera)

> **options** 为初始化设置参数，当调用 **resetOptions** 时会使用默认参数以及 **options** 参数合并后的值。

> **controls** 该类接管相机时，相机的 **controlOptions** 参数，在切换为其他相机时，会还原进入导航相机时的控制器选项

### 参数

#### NavigateCameraOptions 设置参数

<Docs-Table
    :data="[
        {
            prop: 'disabledAnimate', desc: '相机复原动画是否开启', type: 'boolean', require: false, default: 'true'
        },
        {
            prop: 'fixedOrientation', desc: '是否锁定朝向（相当于禁用控制器操作）', type: 'boolean', require: false, default: ' '
        },
        {
            prop: 'autoRestoreOrientation', desc: '在操作后是否自动复原相机位置，传入 number 值时为定时复原，传入 boolean 值则表示立即复原或者不复原', type: 'boolean | number', require: false, default: '1500'
        },
        {
            prop: 'oppositeCamera', desc: '是否反转相机', type: 'boolean', require: false, default: 'false',
        },
        {
            prop: 'oppositeType', desc: '相机反转类型，支持不同轴或者平面反转，默认为基于 y 轴反转', type: '{ x: boolean, y: boolean, z: boolean }', require: false, default: '{ x: false, y: true, z: false }'
        },
        {
            prop: 'vision', desc: '视角设置，支持第一人称、第三人称、俯视角和左视角配置', type: 'NAVIGATE_VISION_TYPE .FIRST_VISION 第一人称\n.THIRD_VISION 第三人称\n.UP_VISION 俯视图\n.LEFT_VISION 左视图', require: false, default: 'THIRD_VISION',
        },
        {
            prop: 'orientationTarget', desc: '朝向目标设置，当设置为 main 时，相机跟踪当前跟踪对象的朝向，其他值类型还有 Vector3(固定朝向某个点)、 Object3D(固定朝向某个模型对象)、Euler(固定朝向某个方向)', type: 'main | Vector3 | Object3D | Euler', require: false, default: 'main'
        },
        {
            prop: 'orientationType', desc: '朝向方式设置，支持相对朝向、绝对朝向和陀螺仪朝向，设置为相对朝向时，相机将跟随目标旋转', type: 'NAVIGATE_ORIENTATION_TYPE .RELATIVE_ORIENTATION 相对朝向\n.FIXED_ORIENTATION 绝对朝向\n.GYRO_ORIENTATION 陀螺仪朝向', require: false, default: 'RELATIVE_ORIENTATION',
        },
        {
            prop: 'distanceToTarget', desc: '相机与跟踪目标之间距离', type: 'number', require: false, default: '1',
        },
        {
            prop: 'rotationToTarget', desc: '相机与跟踪目标之间的夹角向量，当设置为非第三人称时，该参数无效', type: 'Vector3', require: false, default: 'new Vector3(0, -4, 10)',
        },
        {
            prop: 'targetRotationFix', desc: '相机角度修正，支持动态传入方法返回', type: '[number, number, number, EulerOrder] | () =&gt; [number, number, number, EulerOrder]', require: false, default: '[0, 0, 0, `XYZ`]',
        },
        {
            prop: 'isFixRotationRelativeTarget', desc: '是否相对跟踪对象进行角度修正，设置为是时相机以跟踪目标朝向修正，设置为否时相机以自身朝向修正', type: 'boolean', require: false, default: 'true',
        },
        {
            prop: 'targetPositionFix', desc: '相机位置修正，支持动态传入方法返回', type: '[number, number, number] | () =&gt; [number, number, number]', require: false, default: '[0, 0, 0]',
        },
        {
            prop: 'isFixPositionRelativeTarget', desc: '是否相对跟踪对象进行位置修正，设置为是时相机以跟踪对象为原点修正，设置为否时相机自身为原点修正', type: 'boolean', require: false, default: 'false',
        },
        {
            prop: 'enableGyro', desc: '是否启用陀螺仪', type: 'boolean', require: false, default: 'false',
        },
        {
            prop: 'gyroX', desc: '是否应用陀螺仪 X 轴变化', type: 'boolean', require: false, default: 'false',
        },
        {
            prop: 'gyroY', desc: '是否应用陀螺仪 Y 轴变化', type: 'boolean', require: false, default: 'true',
        },
        {
            prop: 'gyroZ', desc: '是否应用陀螺仪 Z 轴变化', type: 'boolean', require: false, default: 'false',
        },
        {
            prop: 'gyroAbsolute', desc: '陀螺仪变化时使用相对值还是绝对值，使用绝对值时会以陀螺仪本身的方位为基准，使用相对值时则以开启陀螺仪时的方位为基准', type: 'boolean', require: false, default: 'true',
        },
        {
            prop: 'onControlStart', desc: '当控制器控制相机时允许外部自定义控制相机，控制开始时触发', type: 'null | ((camera, followTarget) =&gt; void)', require: false, default: 'null',
        },
        {
            prop: 'onControlRender', desc: '当控制器控制相机时允许外部自定义控制相机，控制进行时回调', type: 'null | ((camera, followTarget) =&gt; void)', require: false, default: 'null',
        },
        {
            prop: 'onControlEnd', desc: '当控制器控制相机时允许外部自定义控制相机，控制结束时回调', type: 'null | ((camera, followTarget) =&gt; void)', require: false, default: 'null',
        },
    ]"
/>

#### TS 类型

```typescript
interface NavigateCameraOptions {
	disabledAnimate: boolean;
	fixedOrientation: boolean;
	autoRestoreOrientation: boolean | number;
	oppositeCamera: boolean;
	oppositeType: CameraOppositeType;
	orientationTarget: NavigateOrientationTarget;
	vision: NAVIGATE_VISION_TYPE;
	orientationType: NAVIGATE_ORIENTATION_TYPE;
	distanceToTarget: number;
	rotationToTarget: Vector3;
	isFixRotationRelativeTarget: boolean;
	targetRotationFix: FixEuler;
	isFixPositionRelativeTarget: boolean;
	targetPositionFix: FixVector;
	enableGyro: boolean;
	gyroX: boolean;
	gyroY: boolean;
	gyroZ: boolean;
	gyroAbsolute: boolean;
	onControlStart: null | ControlCallback;
	onControlRender: null | ControlCallback;
	onControlEnd: null | ControlCallback;
}
```

### 方法

#### active () {}

启用导航相机

#### resetOptions () {}

重置相机参数，初始化实例时，可以传入初始配置值

#### setOptions (options: Partial\<NavigateCameraOptions\>) {}: 设置导航相机配置

用此方法设置参数时，不会产生相机复原动画。

#### setCamera (camera: Camera) {}: 设置相机

当导航相机正在使用时，会立即切换到传入的相机，不需要再调用 **active** 方法启用相机

#### restoreOrientation() {} : 主动发起复原相机位置

根据 **disabledAnimate** 是否带有动画恢复

## 俯视图正交相机

导航相机库里提供基于导航相机封装的俯视图正交相机工具，用于实现展示俯视地图全览的相关需求

### 使用方法

```typescript
import SoonSpace from "soonspacejs";
import { NavigateCamera, MapCamera } from "@soonspacejs/plugin-navigation";

const ssp = new SoonSpace({
	el: "#view",
	options: {},
	event: {},
});

const navigateCamera = new NavigateCamera(ssp);

const originCamera = navigateCamera.nativeCamera;

const mapCamera = new MapCamera(ssp);

const minimapCamera = mapCamera.nativeCamera;

function setMapCamera() {
	navigateCamera.setOptions({
		vision: NAVIGATE_VISION_TYPE.UP_VISION,
	});
	navigateCamera.setCamera(minimapCamera);
}
```

### 额外参数

- **MapCamera.zoom** 调整相机地图缩放大小
