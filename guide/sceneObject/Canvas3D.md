---
sidebarDepth: 2
---

# Canvas3D

该对象继承自 [`BaseObject3D`](./BaseObject3D.html)对象。

## 方法

### getPoint
通过 `id` 获取画布内 [点](./point.html) 对象。

#### 定义
```ts
function getPoint(id: string | number): Point | null;
```

#### 使用
```ts
const point = canvas3D.getPoint('xxx');
```

### getLine
通过 `id` 获取画布内 [线](./line.html) 对象。

#### 定义
```ts
function getLine(id: string | number): Line | null;
```

#### 使用
```ts
const line = canvas3D.getLine('xxx');
```

### getPolygon
通过 `id` 获取画布内 [面](./polygon.html) 对象。

#### 定义
```ts
function getPolygon(id: string | number): Polygon | null;
```

#### 使用
```ts
const polygon = canvas3D.getPolygon('xxx');
```

### getCircle
通过 `id` 获取画布内 [圆](./circle.html) 对象。

#### 定义
```ts
function getCircle(id: string | number): Circle | null;
```

#### 使用
```ts
const circle = canvas3D.getCircle('xxx');
```
