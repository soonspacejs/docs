# 性能

## setAutoInstancing

`v2.12.0` 版本新增

`setAutoInstancing` 允许您启用或禁用自动实例化。

当启用时，引擎将自动实例化您的模型。当禁用时，您的模型将不会被实例化。

默认不启用。

### 定义：

```ts
setAutoInstancing(enable: boolean): void;
```

### 用法：

```js
ssp.setAutoInstancing(true);
```

::: tip 提示
当场景中有大量重复模型时，启用自动实例化可以提高性能。
:::
