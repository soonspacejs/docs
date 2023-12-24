# Poi

该对象继承自 [`BaseObject3D`](./BaseObject3D)对象。

## 扩展属性

### isEventPropagation

事件是否向上冒泡至全局

- **类型：** `boolean`
- **默认值：** `false`

## 扩展方法

### getBoundingBox

获取 `Poi` 包围盒

#### 定义：

```ts
function getBoundingBox(padding?: number): Box3;
```

#### 用法：

```js
const box = poi.getBoundingBox(50);
```

#### 参数：

##### padding

- **描述：** 包围盒的内间距填充
- **类型：** `number`
- **默认值：** `50`

### eventPropagation

设置 `isEventPropagation` 为 `true`

#### 定义：

```ts
function eventPropagation(): void;
```

#### 用法：

```js
poi.eventPropagation();
```
