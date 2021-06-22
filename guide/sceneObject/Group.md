# Group

该对象继承自 [`BaseObject3D`](./BaseObject3D.html)对象。

## 方法

### showAllChild

显示所有子级

#### 定义：

```ts
function showAllChild(): void;
```

#### 用法：

```js
group.showAllChild();
```

### hideAllChild

隐藏所有子级

#### 定义：

```ts
function hideAllChild(): void;
```

#### 用法：

```js
group.hideAllChild();
```

::: tip 提示
这个方法与 `group.visible = false` 的区别是，它没有直接操作 Group 对象。

使得你可以精确控制 Group 对象内模型的显示隐藏。
:::
