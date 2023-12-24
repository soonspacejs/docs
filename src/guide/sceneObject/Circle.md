---
sidebarDepth: 2
---
# Circle

该对象继承自 [`BaseMesh`](./BaseMesh)对象。

## 方法

### setOptions
设置配置参数

#### 定义
```ts
type SetOptionsCircleInfo = Omit<CircleInfo, 'id'>

function setOptions(param: SetOptionsCircleInfo): void
```

#### 使用
```js
line.setOptions({
  radius = 500,
  color: 'red'
})
```
