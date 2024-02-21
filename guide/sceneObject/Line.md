---
outline: 3
---

# Line

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
type SetOptionsLineInfo = Omit<LineInfo, 'id'>

function setOptions(param: SetOptionsLineInfo): void
```

#### 使用
```js
line.setOptions({
  width = 50,
  color: 'red'
})
```
