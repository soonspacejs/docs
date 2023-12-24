# Model

该对象继承自 [`BaseObject3D`](./BaseObject3D)对象。

## 扩展属性

### isEventPropagation

事件是否向上冒泡至全局

- **类型：** `boolean`
- **默认值：** `false`

### animations

一组可重用的关键帧轨迹动画

- **类型：** `AnimationClip[]`
- **默认值：** `[]`

#### AnimationClip

[`AnimationClip`](https://threejs.org/docs/index#api/en/animation/AnimationClip)

## 扩展方法

### getBoundingBox

获取模型包围盒

#### 定义：

```ts
function getBoundingBox(): Box3;
```

#### 用法：

```js
const box = model.getBoundingBox();
```

### eventPropagation

设置 `isEventPropagation` 为 `true`

#### 定义：

```ts
function eventPropagation(): void;
```

#### 用法：

```js
model.eventPropagation();
```
