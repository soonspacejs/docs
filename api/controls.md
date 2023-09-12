# 控制器（新版）

`v2.10.0-rc.0` 之后发布了全新的控制器，增加了属性配置、方法、事件等。

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
