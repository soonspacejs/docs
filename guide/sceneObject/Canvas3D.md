---
outline: 3
---

# Canvas3D

该对象继承自 [`BaseObject3D`](./BaseObject3D)对象。

## 方法

### createPoint

在画布内创建 [点](./Point) 对象。

#### 定义

```ts
function createPoint(param: PointInfo): Point;
```

#### 使用

```ts
const point = canvas3D.createPoint({ id: 'canvas3D_point' });
```

#### 参数

##### param

- **描述:** 点对象参数
- **类型:** [PointInfo](../../api/canvas3D#pointinfo)
- **必填:** <Base-RequireIcon :isRequire="true"/>

### getPoint

通过 `id` 获取画布内 [点](./point) 对象。

#### 定义

```ts
function getPoint(id: string | number): Point | null;
```

#### 使用

```ts
const point = canvas3D.getPoint('canvas3D_point');
```

### removePoint

通过 `id` 移除画布内 [点](./point) 对象。

#### 定义

```ts
function removePoint(id: PointInfo['id']): void;
```

#### 使用

```ts
canvas3D.removePoint('canvas3D_point');
```

### createLine

在画布内创建 [线](./line) 对象。

#### 定义

```ts
function createLine(param: LineInfo): Line;
```

#### 使用

```ts
const line = canvas3D.createLine({
  id: 'canvas3D_line',
  points: [
    {
      x: 0,
      y: 0,
      z: 100,
    },
    {
      x: 2000,
      y: 0,
      z: 100,
    },
    {
      x: 2000,
      y: 0,
      z: 500,
    },
  ],
});
```

#### 参数

##### param

- **描述:** 线对象参数
- **类型:** [LineInfo](../../api/Canvas3D#lineinfo)
- **必填:** <Base-RequireIcon :isRequire="true"/>

### getLine

通过 `id` 获取画布内 [线](./line) 对象。

#### 定义

```ts
function getLine(id: string | number): Line | null;
```

#### 使用

```ts
const line = canvas3D.getLine('canvas3D_line');
```

### removeLine

通过 `id` 移除画布内 [线](./line) 对象。

#### 定义

```ts
function removeLine(id: LineInfo['id']): void;
```

#### 使用

```ts
canvas3D.removeLine('canvas3D_line');
```

### createPolygon

在画布内创建 [面](./polygon) 对象。

#### 定义

```ts
function createPolygon(param: PolygonInfo): Polygon;
```

#### 使用

```js
const polygon = canvas3D.createPolygon({
  id: 'canvas3D_polygon',
  yHeight: 1,
  points: [
    {
      x: 0,
      z: 300,
    },
    {
      x: 100,
      z: 300,
    },
    {
      x: 100,
      z: 400,
    },
    {
      x: 0,
      z: 400,
    },
  ],
});
```

##### param

- **描述:** 面对象参数
- **类型:** [PolygonInfo](../../api/Canvas3D#polygoninfo)
- **必填:** <Base-RequireIcon :isRequire="true"/>

### getPolygon

通过 `id` 获取画布内 [面](./polygon) 对象。

#### 定义

```ts
function getPolygon(id: string | number): Polygon | null;
```

#### 使用

```ts
const polygon = canvas3D.getPolygon('canvas3D_colygon');
```

### removePolygon

通过 `id` 移除画布内 [面](./polygon) 对象。

#### 定义

```ts
function removePolygon(id: PolygonInfo['id']): void;
```

#### 使用

```ts
canvas3D.removePolygon('canvas3D_colygon');
```

### createCircle

在画布内创建 [圆](./circle) 对象。

#### 定义

```ts
function createCircle(param: CircleInfo): Circle;
```

#### 使用

```ts
const circle = canvas3D.createCircle({ id: 'canvas3D_circle' });
```

##### param

- **描述:** 圆对象参数
- **类型:** [CircleInfo](../../api/Canvas3D#circleinfo)
- **必填:** <Base-RequireIcon :isRequire="true"/>

### getCircle

通过 `id` 获取画布内 [圆](./circle) 对象。

#### 定义

```ts
function getCircle(id: string | number): Circle | null;
```

#### 使用

```ts
const circle = canvas3D.getCircle('canvas3D_circle');
```

### removeCircle

通过 `id` 移除画布内 [圆](./circle) 对象。

#### 定义

```ts
function removeCircle(id: CircleInfo['id']): void;
```

#### 使用

```ts
canvas3D.removeCircle('canvas3D_circle');
```