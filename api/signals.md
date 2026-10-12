# 事件与变更通知（signals）

`ssp.signals` 是 SoonSpace 的统一信号入口，既可以监听场景事件，也可以在直接修改 Three.js 对象后通知 SoonSpace 刷新渲染状态。

本页描述 3.0 alpha 的原生 signals 与 Entity 通知边界。`@robotlegsjs/signals` 是 SDK 的运行时依赖，版本约束为 `^2.1.0`；包管理器会自动安装，仅使用 `ssp.signals` 不需要手动添加。SDK 构建保留它为外部模块，由业务构建工具解析。如果业务代码直接 `import { Signal } from '@robotlegsjs/signals'` 创建自己的信号，应把它声明为业务项目的直接依赖。浏览器原生 ES modules 需要额外配置其 import map，不能只加载 SDK 文件。

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

::: tip beforeRender 与提交顺序
实际绘制时先派发 `beforeRender`，再提交已明确通知的 Entity 更新，最后绘制。监听中修改 Entity 时仍需调用 `notifyChange`；新增监听不会触发完整源树同步，也不会自动读取草稿。原生对象修改按下面的 signals 协议请求绘制。
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
  currentTarget: THREE.Mesh;
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
  type: SceneEventType; // 导出的参数类型；sceneClick 当前派发 click。
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
| `objectAdded` | `THREE.Object3D` 或无参数 | 对象或子树已加入场景，通知原生子系统并请求绘制。 |
| `objectRemoved` | `THREE.Object3D` 或无参数 | 对象或子树已从场景移除，通知原生子系统并请求绘制。 |
| `objectChanged` | `THREE.Object3D \| THREE.Object3D[]` 或无参数 | 原生对象的变换、显隐、图层或渲染状态变化，请求绘制。 |
| `geometryChanged` | `THREE.Object3D \| THREE.Object3D[]` 或无参数 | 原生 Mesh 的 geometry 被替换或修改，更新统计并请求绘制。 |
| `materialAdded` | `THREE.Material \| THREE.Material[]` 或无参数 | 原生路径加入材质后的通知，并请求绘制。 |
| `materialChanged` | `THREE.Material \| THREE.Material[]` 或无参数 | 原生材质属性或引用变化的通知，并请求绘制。 |
| `materialRemoved` | `THREE.Material \| THREE.Material[]` 或无参数 | 原生路径移除材质后的通知，并请求绘制。 |

调用 SoonSpace 的高层对象、材质和场景 API 时，SDK 会在对应路径发送必要通知。只有业务绕过这些 API，直接修改 Three.js 对象或场景树时，才需要手动 `dispatch`。

### 描边与插件业务信号

| Signal | 回调参数 | 说明 |
| --- | --- | --- |
| `outlineChange` | `{ objects: THREE.Object3D[]; options?: EdgeSelectOptions }` | `edgeShow` 或 `unEdgeShow` 更新描边对象后。 |
| `thingModelPropsChange` | `{ propKey: string }` | `plugin-flow` 的物模型属性变更通知。 |
| `propertiesChanged` | `{ value; property; target; source }` | `plugin-cps-soonmanager` 的自定义属性变更通知；具体字段由插件数据结构决定。 |

`thingModelPropsChange` 和 `propertiesChanged` 是插件协作信号。只有在使用对应插件并理解其数据协议时，才应由业务主动派发。

## 原生对象的变更通知

直接操作原生 Three.js 对象后，发送对应通知以更新原生子系统并请求绘制。这些 signal 不负责 Entity 资源合批，也不扫描源树创建代理。原生 geometry / material 修改仍需遵循 Three.js 的 `needsUpdate`、包围盒和 BVH 等更新要求，发送 signal 不代替它们。

```js
mesh.position.x = 1;
mesh.visible = false;
ssp.signals.objectChanged.dispatch(mesh);

mesh.geometry = nextGeometry;
ssp.signals.geometryChanged.dispatch(mesh);

mesh.material.opacity = 0.5;
mesh.material.transparent = true;
ssp.signals.materialChanged.dispatch(mesh.material);
```

直接调整场景树不能替代 SoonSpace 的对象缓存注册与卸载。需要 SDK 管理身份及拾取时，优先使用 `addObject` / `removeObject`；仅发送 `objectAdded` / `objectRemoved` 不保证完成全部缓存操作。3.0 alpha 不再提供 `safe` / `signal` 自动合批同步模式，旧规则见 [2.x 历史参考](./performance-2.x)。

<span id="entity-notifications"></span>

## Entity 通知与原生 signals 的区别

::: warning 不混用更新对象
以下规则适用于 3.0 alpha。`ssp.signals` 仍服务于原生对象和输入渲染事件，Entity 使用自己的显式通知。
:::

| 更新对象 | 入口 | 提交内容 |
| --- | --- | --- |
| 原生 Object3D | `ssp.signals.objectChanged.dispatch(object)` | 通知原生子系统并请求绘制，不提交 Entity。 |
| Entity 的 position / quaternion / scale 草稿 | `entity.notifyChange('transform')` | 在调用时捕获 TRS 快照，不顺带提交显隐。 |
| Entity 的 visible / contentVisible 草稿 | `entity.notifyChange('visibility')` | 在调用时同时捕获两个字段，不顺带提交变换。 |
| Entity 模型资源 | `entity.replaceModel(resourceOrURL)` | 异步准备候选，成功后排队提交模型引用。 |

```ts
entity.position.x = 1;
entity.notifyChange('transform');
entity.visible = false;
entity.notifyChange('visibility');
ssp.flushUpdates();
```

`objectChanged.dispatch(entity)` 不会提交 Entity 草稿，`render()` 也不会代替通知。Entity 没有 safe 模式的全量直接赋值兜底；父级的已提交变化由 SDK 传播到受影响后代。已转交的几何和材质不可通过旧 `geometryChanged` / `materialChanged` 通知继续外部修改，应注册或加载新资源再替换模型。

`ssp.signals` 仍可用于订阅场景、相机、输入和渲染事件，但旧 `modelClick` 不会自动转换成 Entity 命中。需要 Entity 身份时，由输入位置构造 Raycaster，再调用 `ssp.pickEntities()`。详见 [Entity API](./entities#包围盒与拾取) 与 [迁移指南](../guide/entity-migration)。

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
