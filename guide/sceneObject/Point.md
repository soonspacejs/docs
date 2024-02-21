---
outline: 3
---

# Point

该对象继承自 [`BaseMesh`](./BaseMesh)对象。


## 方法

### setOptions
设置配置参数

#### 定义
```ts
type SetOptionsPointInfo = Omit<PointInfo, 'id'>

function setOptions(param: SetOptionsPointInfo): void
```

#### 使用
```js
point.setOptions({
  radius: 50,
  color: 'red'
})
```
