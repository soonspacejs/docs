# 变更通知（signals）

`ssp.signals` 是 SoonSpace 的事件通知入口。通常应优先调用 SoonSpace 提供的对象、材质和场景 API；这些 API 会自行发送通知。只有业务直接修改 Three.js 对象或直接调整场景树时，才需要手动调用 `dispatch`。

## 监听与移除

每个 signal 均支持 `add`、`addOnce`、`remove` 和 `dispatch`。保留监听函数引用，才能在不再使用时精确移除自己的监听。

```js
const onSceneRendered = () => {
  console.log('场景已绘制');
};

ssp.signals.sceneRendered.add(onSceneRendered);

// 页面或功能销毁时移除自己的监听。
ssp.signals.sceneRendered.remove(onSceneRendered);
```

不要把 `ssp.clearSignals()` 当作单个功能的清理手段：它会移除当前 SoonSpace 实例上所有 signal 的监听。

## 自动合批的变更通知

启用 [自动合批](./performance#setautoinstancing) 且 `syncMode: 'signal'` 时，SoonSpace 不会在每帧扫描整个源对象树。直接修改 Three.js 对象后，必须发送与变更类型对应的通知；未通知时，内部代理可能继续显示旧的变换、可见性或材质状态。

| 直接操作 | 通知方式 |
| --- | --- |
| 修改对象的位置、旋转、缩放、可见性、图层或渲染状态 | `ssp.signals.objectChanged.dispatch(object3D)` |
| 批量修改对象 | `ssp.signals.objectChanged.dispatch([objectA, objectB])` |
| 使用 `parent.add(child)` 加入子树 | `ssp.signals.objectAdded.dispatch(child)` |
| 使用 `child.removeFromParent()` 移除子树 | `ssp.signals.objectRemoved.dispatch(child)` |
| 替换或修改 `mesh.geometry` | `ssp.signals.geometryChanged.dispatch(mesh)` |
| 修改已在使用的材质属性 | `ssp.signals.materialChanged.dispatch(material)` |
| 替换 `mesh.material` 引用 | `ssp.signals.materialChanged.dispatch()` |

```js
// 变换或显隐
mesh.position.x = 1;
mesh.visible = false;
ssp.signals.objectChanged.dispatch(mesh);

// 替换 geometry
mesh.geometry = nextGeometry;
ssp.signals.geometryChanged.dispatch(mesh);

// 修改已有材质
mesh.material.opacity = 0.5;
ssp.signals.materialChanged.dispatch(mesh.material);
```

不传目标对象或材质时，自动合批会回退为相关根节点的完整同步。例如，直接替换材质引用后无法仅靠新材质定位旧批次，应调用 `ssp.signals.materialChanged.dispatch()`。

::: warning 注意
`signals` 不会拦截 `object3D.position.x = 1` 这类 Three.js 原生赋值。`syncMode: 'safe'` 会用全量检查兼容这类代码；选择 `syncMode: 'signal'` 前，应确认所有直接变更路径都能发送通知。
:::
