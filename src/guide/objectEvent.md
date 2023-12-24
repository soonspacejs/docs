# 对象事件

`v2.3.18`

支持了鼠标事件的对象有 `Sbm`、`Model`、`Poi`，除了在创建对象时通过传参的方式绑定对应事件。

我们现在支持了使用 [EventDispatcher](https://github.com/mrdoob/eventdispatcher.js) 的方式来绑定和触发事件。

使用这种方式解决了之前单个对象无法绑定多个事件监听器的问题，并且使用方式也更趋近与原生 `DOM` 事件的使用方式。

`EventDispatcher` 方式支持的对象事件有 `click`、`rightClick`、`dblClick`。

当然你可以定义自己的事件，然后手动调用 [dispatchEvent](#dispatchevent)。

### 样例

<Docs-Iframe src="start/multiEvent.html" />

## addEventListener

增加事件

### 用法：

```ts
const sbmClickHandle = (params) => {
  /**
   * 注意！函数执行完毕，target 会被销毁，所以需要将 target 保存
   */
  const { target } = params;

  setTimeout(() => {
    // 这里的 target 为 null ！！！
    console.log(params.target); // null

    console.log(target); // [[sbm object]]
  });
};

sbm.addEventListener('click', sbmClickHandle);
```

## removeEventListener

移除事件

### 用法：

```js
sbm.removeEventListener('click', sbmClickHandle);
```

## dispatchEvent

派发事件，由内部触发。

### 用法：

```js
sbm.dispatchEvent({ type: 'click' });
```

## hasEventListener

检查事件

### 用法：

```js
const hasEvent = sbm.hasEventListener('click', sbmClickHandle);

if (hasEvent) {
  console.log('sbm 包含该事件处理');
}
```
