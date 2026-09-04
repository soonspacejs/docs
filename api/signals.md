# 事件与变更通知（signals）

`ssp.signals` 是 SoonSpace 的统一信号入口，既可以监听场景事件，也可以在直接修改 Three.js 对象后通知 SoonSpace 刷新渲染状态。

SoonSpace 2.16.6 起将 `@robotlegsjs/signals` 作为运行时依赖。通过 npm、pnpm 或 Yarn 安装 `soonspacejs` 时会自动安装它；仅使用 `ssp.signals` 不需要再手动添加依赖。如果业务代码需要直接 `import { Signal } from '@robotlegsjs/signals'` 创建自己的信号，仍应把它声明为业务项目的直接依赖。

## 基本用法

每个成员都是一个 `Signal` 实例，常用 API 如下：

| API | 说明 |
| --- | --- |
| `add(listener)` | 持续监听，返回当前监听对应的 `ISlot`。 |
| `addOnce(listener)` | 只监听下一次派发，执行后自动移除。 |
| `remove(listener)` | 按同一个函数引用移除监听。 |
| `removeAll()` | 移除当前 signal 的全部监听。 |
| `dispatch(...args)` | 同步调用当前 signal 的监听函数。 |
| `numListeners` | 当前监听函数数量。 |

```js
const onSceneRendered = (frametime) => {
  console.log(`本次渲染耗时：${frametime.toFixed(2)} ms`);
};

ssp.signals.sceneRendered.add(onSceneRendered);

// 页面或功能销毁时，使用同一个函数引用移除监听。
ssp.signals.sceneRendered.remove(onSceneRendered);
```

也可以保留 `add` 返回的 slot，并通过 slot 自行清理：

```js
const slot = ssp.signals.cameraChange.add(() => {
  console.log('相机发生变化');
});

slot.remove();
```

::: danger 不要用 clearSignals 清理单个功能
`ssp.clearSignals()` 会移除当前 SoonSpace 实例上所有 signal 的监听，包括 SDK 内部、插件和其他业务模块注册的监听。功能卸载时应调用对应 signal 的 `remove`，或调用 slot 的 `remove()`；销毁整个实例时使用 `ssp.dispose()`。
:::

## 初始化事件与运行时监听

构造参数中的 `events` 会在 SoonSpace 初始化时注册到同名 signal，适合声明固定的场景交互：

```js
const ssp = new SoonSpace({
  el: '#view',
  events: {
    modelClick(event) {
      console.log(event.target);
    },
  },
});
```

运行时通过 `ssp.signals` 注册更适合需要随组件或功能启停的监听：

```js
const onModelClick = (event) => console.log(event.target);

ssp.signals.modelClick.add(onModelClick);
// 功能卸载时
ssp.signals.modelClick.remove(onModelClick);
```

## 信号清单

### 场景、渲染与相机

| Signal | 回调参数 | 触发时机 |
| --- | --- | --- |
| `windowResize` | 无 | SoonSpace 容器尺寸变化时。 |
| `cameraObjectChange` | 无 | 当前透视或正交相机对象被切换时。 |
| `sceneChanged` | 无 | 场景雾、色彩空间、色调映射等场景状态变化时。 |
| `backgroundChanged` | 无 | 背景色、背景图、天空盒或环境背景变化时。 |
| `beforeRender` | 无 | 每次实际绘制场景前。没有发生绘制时不会触发。 |
| `sceneRendered` | `frametime: number` | 每次实际绘制结束后，参数是本次渲染耗时，单位为毫秒。 |
| `cameraChange` | 无 | 控制器更新相机后。 |
| `tweenUpdate` | 无 | `TWEEN` 在当前动画帧更新后。 |
| `modelAnimation` | 无 | AnimationMixer 中存在动画并完成当前帧更新后。 |
| `getSceneInfo` | `info` | 每个 animation frame 派发一次场景统计。`info` 包含 `objects`、`meshes`、`vertices`、`triangles` 和 `frametime`。 |

`getSceneInfo`、`cameraChange` 和 `mouseMove` 都可能高频触发。监听函数中不要执行同步网络请求、大量 DOM 更新或完整场景遍历；需要更新界面时，可自行节流或合并到一次 `requestAnimationFrame`。

::: warning 自动合批与 beforeRender
启用自动合批后，SoonSpace 会保守地认为额外的 `beforeRender` 监听可能直接修改 Three.js 对象，因此实际绘制前会执行完整源对象同步。使用 `syncMode: 'signal'` 优化大场景时，应避免在 `beforeRender` 中修改场景；改为在业务更新发生时修改对象并发送对应的变更通知。
:::

### 原生输入事件

| Signal | 回调参数 | 说明 |
| --- | --- | --- |
| `click` | `MouseEvent \| TouchEvent` | 左键单击或单指点击。为区分双击，单击会在双击判定窗口后派发。 |
| `dblClick` | `MouseEvent \| TouchEvent` | 鼠标双击或连续两次触摸点击。 |
| `rightClick` | `MouseEvent \| TouchEvent` | 鼠标右键单击；移动端由长按触发。 |
| `mouseDown` | `MouseEvent` | 鼠标按下。 |
| `mouseMove` | `MouseEvent` | 鼠标移动。 |
| `mouseUp` | `MouseEvent` | 鼠标抬起。 |
| `mouseWheel` | `WheelEvent` | 鼠标滚轮。 |
| `keyDown` | `KeyboardEvent` | 键盘按下。 |
| `keyUp` | `KeyboardEvent` | 键盘抬起。 |

`click`、`dblClick` 和 `rightClick` 只表示容器上的原生输入，不包含射线拾取结果。需要获取命中的模型或 Poi 时，应监听下面的对象交互 signal。

### 模型、Poi 与动态对象事件

| Signal | 回调参数 | 说明 |
| --- | --- | --- |
| `modelHover` | `ModelEventParams` | 鼠标首次悬浮到一个 Model。需要先开启 `hoverEnabled`。 |
| `modelUnHover` | `Model` | 鼠标离开上一次悬浮的 Model。 |
| `modelClick` | `ModelEventParams` | 单击 Model。 |
| `modelDblClick` | `ModelEventParams` | 双击 Model。 |
| `modelRightClick` | `ModelEventParams` | 右键单击或长按 Model。 |
| `poiHover` | `PoiEventParams` | 鼠标首次悬浮到一个 Poi。需要先开启 `hoverEnabled`。 |
| `poiUnHover` | `Poi` | 鼠标离开上一次悬浮的 Poi。 |
| `poiClick` | `PoiEventParams` | 单击 Poi。 |
| `poiDblClick` | `PoiEventParams` | 双击 Poi。 |
| `poiRightClick` | `PoiEventParams` | 右键单击或长按 Poi。 |
| `selectPosition` | `THREE.Vector3` | 左键单击并命中对象时，派发第一个交点的世界坐标。 |
| `sceneClick` | `SceneClickParam` | 左键单击且射线未命中任何对象时触发。 |

```ts
interface ModelEventParams {
  target: Model;
  currentTarget: THREE.Object3D;
  intersects: Array<{
    model: Model;
    sourceData: THREE.Intersection;
  }>;
  event: MouseEvent | TouchEvent;
}

interface PoiEventParams {
  target: Poi;
  event: MouseEvent | TouchEvent;
}

interface SceneClickParam {
  type: 'click';
  event: MouseEvent | TouchEvent;
}
```

除了 Model 和 Poi，SoonSpace 会按照对象的 `stype` 懒创建交互 signal，命名规则为首字母小写的 `stype` 加事件名：

```text
${lowercaseFirst(stype)}Hover
${lowercaseFirst(stype)}UnHover
${lowercaseFirst(stype)}Click
${lowercaseFirst(stype)}DblClick
${lowercaseFirst(stype)}RightClick
```

例如 `Canvas3D` 对应 `canvas3DClick`，`Topology` 对应 `topologyClick`。Click、DblClick 和 RightClick 的通用参数结构如下；UnHover 只传离开的源对象：

```ts
interface ObjectEventParams {
  target: BaseObject3D;
  currentTarget: THREE.Object3D;
  intersects: Array<{
    target: BaseObject3D;
    sourceData: THREE.Intersection;
  }>;
  event: MouseEvent | TouchEvent;
}
```

如果对象自身配置了 `onClick`、`onDblClick` 或 `onRightClick`，默认先执行对象回调，并阻止对应的全局 signal。需要继续派发全局 signal 时，在对象回调中调用 `this.eventPropagation()`。

`hover` 是为兼容旧代码保留的 signal；当前默认输入链路不会派发它。请使用 `modelHover`、`poiHover` 或按 `stype` 生成的 Hover signal。

### 对象、Geometry 与材质变更

| Signal | 建议参数 | 说明 |
| --- | --- | --- |
| `objectAdded` | `THREE.Object3D` 或无参数 | 对象或子树已加入场景。无参数表示无法定位目标，需要全量刷新。 |
| `objectRemoved` | `THREE.Object3D` 或无参数 | 对象或子树已从场景移除。无参数表示无法定位目标，需要清理无效根节点并全量刷新。 |
| `objectChanged` | `THREE.Object3D \| THREE.Object3D[]` 或无参数 | 对象的变换、显隐、图层或其他渲染状态变化。无参数表示全量同步。 |
| `geometryChanged` | `THREE.Object3D \| THREE.Object3D[]` 或无参数 | Mesh 的 geometry 被替换或修改。无参数表示全量同步并重算场景统计。 |
| `materialAdded` | `THREE.Material \| THREE.Material[]` 或无参数 | 业务或插件直接加入材质后通知渲染代理。 |
| `materialChanged` | `THREE.Material \| THREE.Material[]` 或无参数 | 已有材质属性变化。无参数表示材质引用可能已替换，需要全量同步。 |
| `materialRemoved` | `THREE.Material \| THREE.Material[]` 或无参数 | 业务或插件直接移除材质后通知渲染代理。 |

调用 SoonSpace 的高层对象、材质和场景 API 时，SDK 会在对应路径发送必要通知。只有业务绕过这些 API，直接修改 Three.js 对象或场景树时，才需要手动 `dispatch`。

### 描边与插件业务信号

| Signal | 回调参数 | 说明 |
| --- | --- | --- |
| `outlineChange` | `{ objects: THREE.Object3D[]; options?: EdgeSelectOptions }` | `edgeShow` 或 `unEdgeShow` 更新描边对象后。 |
| `thingModelPropsChange` | `{ propKey: string }` | `plugin-flow` 的物模型属性变更通知。 |
| `propertiesChanged` | `{ value; property; target; source }` | `plugin-cps-soonmanager` 的自定义属性变更通知；具体字段由插件数据结构决定。 |

`thingModelPropsChange` 和 `propertiesChanged` 是插件协作信号。只有在使用对应插件并理解其数据协议时，才应由业务主动派发。

## 自动合批的变更通知

启用 [自动合批](./performance#setautoinstancing) 且 `syncMode: 'signal'` 时，SoonSpace 不会在每次渲染前扫描整个源对象树。直接修改 Three.js 对象后，必须发送与变更类型对应的通知；未通知时，内部代理可能继续显示旧的变换、可见性、geometry 或材质状态。

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
mesh.material.transparent = true;
ssp.signals.materialChanged.dispatch(mesh.material);
```

有目标参数时，自动合批会尽量只同步受影响对象；不传目标时会回退为相关根节点的完整同步。例如直接替换 `mesh.material` 后，仅传新材质无法定位旧批次，应调用 `ssp.signals.materialChanged.dispatch()`。

变更 signal 只负责把目标标记为待同步，真正的代理重建和 GPU 更新会合并到下一次实际渲染前执行。同一帧内连续派发多次通知不会立即重复完整重建。

`modelAnimation` 和 `tweenUpdate` 没有具体对象参数，自动合批收到它们时会同步相关根节点。对于自行实现的动画，优先在每次业务更新后派发带目标的 `objectChanged`，避免扩大同步范围。

::: warning safe 与 signal
`signals` 不会拦截 `object3D.position.x = 1` 这类 Three.js 原生赋值。`syncMode: 'safe'` 会用全量检查兼容这类代码；选择 `syncMode: 'signal'` 前，应确认所有直接变更路径都能发送通知。仅调用 `ssp.render()` 不会自动补发 `objectChanged`。
:::

## 常见问题

### 为什么监听没有触发？

- Hover 事件需要先调用 `ssp.setHoverEnabled(true)`，或在初始化选项中设置 `hoverEnabled: true`。
- 对象自身的 `onClick`、`onDblClick`、`onRightClick` 默认会阻止全局对象 signal；需要继续传播时调用 `eventPropagation()`。
- `sceneClick` 只在左键单击且射线没有命中对象时触发。
- `sceneRendered` 只在真正发生绘制时触发，不等同于浏览器的每个 animation frame。

### 如何避免重复监听？

不要在 React/Vue 的每次渲染中创建匿名监听。保存函数或 slot，并在组件卸载或功能关闭时移除：

```js
const slot = ssp.signals.modelClick.add(handleModelClick);

// cleanup
slot.remove();
```

### 原生 ES modules 需要额外配置吗？

Vite、Webpack 等构建工具会自动解析 SoonSpace 的运行依赖。直接在浏览器中使用原生 ES modules 时，需要在 import map 中为 `@robotlegsjs/signals` 配置可访问的 ESM 地址；这属于浏览器模块解析要求，不需要在业务代码中创建或传入 Signal。
