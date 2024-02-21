---
outline: 3
---

# Polygon

该对象继承自 [`BaseMesh`](./BaseMesh)对象。

## 扩展属性

### points

组成面的点坐标集合

- **类型：** `Position[]`

## 方法

### setOptions
设置配置参数

#### 定义
```ts
type SetOptionsPolygonInfo = Omit<PolygonInfo, 'id'>

function setOptions(param: SetOptionsPolygonInfo): void
```

#### 使用
```js
line.setOptions({
  yHeight = 100,
  color: 'red'
})
```

