# 类型定义

这里会集中详细介绍 `SoonSpace.js` 内部的基础接口和类型定义，这些 **接口和类型** 会在后续的文档字段类型描述时使用。

类型定义使用 `TypeScript` [Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)、[Literal Types](https://www.typescriptlang.org/docs/handbook/literal-types.html) 特性方式展示。
<br>
如下：
<br>
`IVector2` 表示该接口必须具有 `x、y` 俩个属性，属性类型为 `number`;
<br>
`IVector3` 表示从接口 `IVector2` 继承属性名定义后，扩展 `z` 属性，属性类型为 `number`;
<br>
`IColor` 定义该值类型应该为 `string` 或者 `number`;
<br>
`AxisEnum` 定义该值类型为 `string`，且具体可选枚举为 `x | y | z`。
<br>
...

## IVector2

二维向量

```ts
interface IVector2 {
  x: number;
  y: number;
}
```

## PlaneIVector2

平面二维向量

```ts
interface PlaneIVector2 {
  x: number;
  z: number;
}
```

## IVector3

三维向量

```ts
interface IVector3 extends IVector2 {
  z: number;
}
```

## Position

空间坐标点

```ts
interface Position extends IVector3 {}
```

## Rotation

旋转弧度

```ts
interface Rotation extends IVector3 {}
```

## Scale

空间缩放比

```ts
interface Scale extends IVector3 {}
```

## Level

物体可视层级范围

```ts
interface Level {
  max: number | null;
  min: number | null;
}
```

## ScaleFixed

缩放比例固定

支持 Poi、PoiNode

```ts
interface ScaleFixed {
  originScale: number;
  fixedScale: number;
  distance: number;
}
```

## OffsetPoint

偏移量

```ts
interface OffsetPoint {
  offsetX: number;
  offsetY: number;
}
```

## AxisType

空间轴类型

```ts
type AxisType = 'x' | 'y' | 'z';
```

## SceneEventType

场景触发事件类型

```ts
type SceneEventType = 'hover' | 'click' | 'rightClick' | 'dblClick';
```

## PoiType

Poi 展示类型

```ts
type PoiType = '2d' | '2D' | '2.5d' | '2.5D' | '3d' | '3D';
```

## PoiNodeType

PoiNode 展示模式类型

```ts
type PoiNodeType = PoiType;
```

## IColor

颜色

```ts
import type { ColorRepresentation } from 'three';

type IColor = ColorRepresentation;
```

## CameraViewpointData

相机视角数据

```ts
interface CameraViewpointData {
  position: Position;
  target: Position;
  zoom: number;
}
```

## FlyToViewpoint

飞向视角枚举

```ts
type FlyToViewpoint =
  | 'current'
  | 'top'
  | 'bottom'
  | 'front'
  | 'back'
  | 'left'
  | 'right'
  | 'frontTop'
  | 'backTop'
  | 'leftTop'
  | 'rightTop'
  | 'leftFrontTop'
  | 'rightFrontTop'
  | 'leftBackTop'
  | 'rightBackTop';
```

## BaseObjectInfo

基础对象创建时的参入参数（BaseMesh、Point 等等）

```ts
interface BaseObjectInfo {
  id: string | number;
  name?: string;

  //
  level?: Level;
  visible?: boolean;

  //
  position?: Position;
  rotation?: Rotation;
  scale?: Scale;

  //
  userData?: any;
}
```

## BaseObject3DInfo

基础 3D 对象创建时的参入参数（BaseObject3D、Poi、PoiNode 等等）

```ts
interface BaseObject3DInfo extends BaseObjectInfo {
  //
  onLoad?: ((object: Object3D) => void) | null;

  //
  onClick?: ((object: Object3D) => void) | null;
  onDblClick?: ((object: Object3D) => void) | null;
  onRightClick?: ((object: Object3D) => void) | null;
}
```

## BaseSelectOptions

选中模型的基础参数

```ts
interface BaseSelectOptions {
  color?: IColor;
  opacity?: number;
}
```

## BaseHelperOptions

helper 的基础参数

```ts
interface BaseHelperOptions {
  id: string | number;
}
```

## Interpolate

线性插值

```ts
interface Interpolate {
  t: number;
}
```
