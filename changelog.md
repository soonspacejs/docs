# 更新日志

## 3.0.0-alpha.0（2026-10-12，alpha 预览）

### 破坏性变更

- 完全移除 SDK 与 CPS 插件的旧 AutoInstancing 引擎、控制方法、选项和统计，原生 Object3D 保留但不自动转换，迁移步骤见 [Entity 迁移指南](./guide/entity-migration)。
- 配套 `@soonspacejs/*` 插件需要使用同版 alpha，Three.js 等依赖要求和固定安装组合见 [安装说明](./guide/#install)，稳定标签仍为 `2.16.8`。

### Entity 与资源

- 新增逻辑 Entity 树与显式变更通知，支持嵌套变换、子树显隐、自身内容显隐、选择、拾取和包围盒，渲染树只保留绘制对象及必要容器。
- 共享静态模型资源按兼容性使用 InstancedMesh、BatchedMesh 或独立 Mesh，提供加载取消、资源替换和 lease 生命周期，不轮询未通知的编辑草稿。
- CPS 新增完整包和已解码树的 Entity 导入入口，支持树内受支持的静态语义内容，但不等价替换 GIS、POI、自定义属性及全部旧场景业务。

### 加载与通知

- glTF 标准依赖按来源隔离请求头和凭据，其他来源不继承 SDK 鉴权，带凭据的可信来源依赖拒绝重定向，宿主解码器和自定义 handler 仍由宿主管理请求策略。
- 原生 `ssp.signals` 保留场景、输入、对象和渲染通知，Entity 草稿通过 `notifyChange` 提交，具体边界见 [Signals 文档](./api/signals)。

### 安装与类型

- 核心与插件的类型声明补齐内部依赖并保留共享 SDK 类型身份，安装包按严格类型检查验收，不依赖关闭库声明检查。
- Flow 统一提供原生动画播放器供 CPS 与流程节点共用，不再要求安装与 prerelease 范围冲突的旧解析器，见 [Flow 文档](./plugin/flow)。
- Recast 配套依赖升级到官方 `0.43.1`，保留外部 NavMesh/Crowd 类型身份；Three.js 固定验收组合见安装说明。

### 升级

使用固定版本安装 alpha，稳定版标签保持不变：

```bash
npm install soonspacejs@3.0.0-alpha.0
```

完整依赖与插件版本见 [安装说明](./guide/#install)，接口仍可能发生破坏性变更，不承诺固定场景或设备的帧率提升。

## 2.16.6（2026-09-04）

### Signals 依赖

- `@robotlegsjs/signals` 已升级到 `2.1.0`，并由 `soonspacejs` 声明为运行时依赖。通过 npm、pnpm 或 Yarn 安装 SoonSpace 时会自动安装；仅使用 `ssp.signals` 不需要在业务项目中手动添加依赖。
- SDK 构建会将 `@robotlegsjs/signals` 保留为外部模块，由 Vite、Webpack 等构建工具正常解析；直接使用浏览器原生 ES modules 时，需要在 import map 中配置该模块。
- [事件与变更通知文档](./api/signals) 现在包含全部内置信号、回调参数、动态对象事件、监听清理、高频事件注意事项和自动合批同步规则。

### 升级

```bash
npm install soonspacejs@2.16.6
```

如果项目使用 `@soonspacejs/*` 插件，请将 SoonSpace 和插件统一升级到 `2.16.6`。

## 2.16.5（2026-09-03）

### 自动合批

- 同一帧内多次请求渲染时，待注册根节点的兜底重试会合并到下一次实际渲染前执行，避免 `requestSync` 在高频 GIS 或流式加载场景中反复立即扫描。
- `syncMode: 'signal'` 的待注册根节点只由对应变更通知唤醒；普通重绘不会为它执行 `safe` 模式的兜底重试。

### 升级

```bash
npm install soonspacejs@2.16.5
```

如果项目使用 `@soonspacejs/*` 插件，请将 SoonSpace 和插件统一升级到 `2.16.5`。

## 2.16.4（2026-09-03）

### 自动合批与变更通知

- `AutoInstancingOptions` 新增 `syncMode`。默认 `safe` 保持每帧全量兜底同步，兼容直接修改 Three.js 对象的既有代码；`signal` 仅同步显式通知的对象，适合由编辑器统一覆盖对象变更路径的大场景。
- 新增 [变更通知（signals）](./api/signals) 说明。使用 `signal` 模式时，直接修改对象、geometry、材质或场景树后，应发送对应的 `objectChanged`、`geometryChanged`、`materialChanged`、`objectAdded` 或 `objectRemoved` 通知。

### 模型

- `Model` 现在保留加载资源的 `url`，克隆模型时也会保留该路径。

### 升级

```bash
npm install soonspacejs@2.16.4
```

如果项目使用 `@soonspacejs/*` 插件，请将 SoonSpace 和插件统一升级到 `2.16.4`。

## 2.16.3（2026-08-28）

### CPS 场景加载

- `ITreeData` 新增 `twinsIdentifier` 字段。加载树节点时，非空的 `twinsIdentifier` 会加入场景对象的 `extraIds`，可以继续通过现有的 `getObjectById` 查询链路获取对应对象。
- `twinsIdentifier` 为 `null` 或空字符串时不会写入 `extraIds`，原有 `id`、`sid` 的顺序和行为保持不变。

### 升级

```bash
npm install soonspacejs@2.16.3
```

如果项目使用 `@soonspacejs/*` 插件，请将 SoonSpace 和插件统一升级到 `2.16.3`。

## 2.16.2（2026-08-28）

### 性能与兼容性

- 开启 `transparentSinglePass` 后，独立透明 Mesh 和已有 `InstancedMesh` 代理也会使用单遍绘制，减少双面透明材质的 draw call，同时保持源材质不变。
- 未标记的普通可见透明 Mesh 仍保持独立代理，由 Three.js 继续执行全局透明排序；运行时材质变化会同步到内部代理材质，关闭自动合批时会正确释放代理资源。

### 升级

```bash
npm install soonspacejs@2.16.2
```

如果项目使用 `@soonspacejs/*` 插件，请将 SoonSpace 和插件统一升级到 `2.16.2`。

## 2.16.1（2026-08-27）

### 性能

- 大场景自动合批现在会根据对象特征选择 `InstancedMesh`、静态合并 Mesh 或 `BatchedMesh`，保留原始 Model 层级、查询、显隐、事件和拾取 API。
- 自动合批的材质检查增加缓存，静态场景使用代理渲染路径，避免在每个缓存帧重复扫描完整源场景。
- 在鼎创财富中心测试场景中，50,470 个源渲染对象合并为 2,260 个代理渲染对象，Draw Calls 降至 2,275；稳定帧耗时 p50 为 23.3ms，p95 为 25.6ms。
- 场景对象统计改为增量计算，并将界面刷新合并到每帧一次，减少批量加载时的主线程和 DOM 开销。

### 稳定性与兼容性

- 自动合批支持运行时材质颜色、可见性和渲染状态变化；自定义 Shader、渲染回调、负缩放、LOD、骨骼和 morph 对象会自动回退到安全渲染路径。
- 合批对象的射线命中、描边选择和包围盒会映射回源对象，`flyToObj`、对象查询和业务 ID 的使用方式保持不变。
- BVH 分片计算增加每帧时间预算，同一 Geometry 会复用在途任务；Worker 任务按 Viewport 隔离，并在销毁时正确结束 Promise。
- `render()` 在 Viewport 销毁时会结算待处理请求，避免页面切换期间出现永久 pending。

### CPS 场景加载

- `plugin-cps-soonmanager` 会为兼容的语义辅助 Mesh 启用内部合批标记，同时保持 `userData` 和序列化结果不受污染。
- 场景加载期间可以暂停中间帧，完成后一次性恢复渲染，减少大量对象逐步加入时的重复绘制。
- 修复不完整十六进制颜色产生的 Three.js 警告，并将无效语义形状日志汇总输出。
- 新增大场景模型与 Mesh 统计页，可按模型和内部 Mesh 数量排序查看。

### 升级

```bash
npm install soonspacejs@2.16.1
```

如果项目使用 `@soonspacejs/*` 插件，请将 SoonSpace 和插件统一升级到 `2.16.1`。
