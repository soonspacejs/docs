# API

本页的新 Entity 入口对应 `3.0.0-alpha.0` 预览。原生 Object3D API 继续使用；旧 AutoInstancing 已从 3.0 alpha 移除。版本与安装见 [介绍](../guide/)，迁移要求见 [Entity 迁移指南](../guide/entity-migration)。

如果你掌握 [TypeScript](https://www.typescriptlang.org/)，文档中的 `定义：` 部分会更好的帮助你理解 `API` 的使用，它是方法实现的伪代码，用来表明 **传入参数** 和 **返回值** 的类型定义。
<br>
当然如果你不掌握 `TypeScript` 也不会影响阅读文档，`参数：`部分会详细说明每一个字段。

### 基础

- [通用对象](./object)
- [Entity 与 EntityCollection（3.0 alpha）](./entities)
- [模型资源与 lease（3.0 alpha）](./model-resources)
- [Sbm 模型](./sbm)
- [通用模型](./model)
- [Poi 对象](./poi)
- [PoiNode 对象](./poiNode)
- [PoiMesh 对象](./poiMesh)
- [空间画布对象](./canvas3D)
- [拓扑路径](./topology)
- [贴花](./decal)

### 进阶

- [控制器](./controls)
- [模型操作](./modelTool)
- [场景操作](./sceneTool)
- [相机](./camera)
- [灯光](./light)
- [辅助器](./helper)
- [路径动画](./path-animation)

### 高阶

- [补间动画](./animation)
- [插件](./plugin)
- [性能](./performance.md)
- [事件与变更通知（Signals）](./signals)
- [包导出 API 索引](./package-exports)
