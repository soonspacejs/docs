---
outline: 3
---

# plugin-flow

解析并执行 CPS/SoonManager 流程图数据，也可以把鼠标事件、加载事件或属性变化绑定到流程。这个包没有默认插件类，主要导出 `FlowParser`、`ComponentFlowParser`、`Trigger`、`ComponentTrigger` 和流程类型。

## 安装

```bash
npm install @soonspacejs/plugin-flow -S
```

## 执行流程

```ts
import SoonSpace from 'soonspacejs'
import {
  FlowParser,
  NodePropTypeEnum,
  NodeTypeEnum,
  type FlowType,
} from '@soonspacejs/plugin-flow'

const flow: FlowType = {
  id: 'show-model',
  sid: 'show-model',
  name: 'Show model',
  portal: 'start',
  nodes: [
    {
      id: 'start',
      type: NodeTypeEnum.START,
      props: [],
    },
    {
      id: 'model',
      type: NodeTypeEnum.MODEL,
      props: [
        {
          name: 'model',
          type: NodePropTypeEnum.LOCAL,
          value: JSON.stringify('model-id'),
          valueType: 'string',
        },
        {
          name: 'out',
          type: NodePropTypeEnum.WRITE_CTX,
          value: JSON.stringify('selected-model'),
          valueType: 'string',
        },
      ],
    },
    {
      id: 'show',
      type: NodeTypeEnum.SHOW,
      props: [
        {
          name: 'objects',
          type: NodePropTypeEnum.READ_CTX,
          value: JSON.stringify('selected-model'),
          valueType: 'string',
        },
      ],
    },
  ],
  edges: [
    { id: 'e1', source: 'start', target: 'model' },
    { id: 'e2', source: 'model', target: 'show' },
  ],
}

const parser = new FlowParser(ssp, flow)

const target = ssp.getModelById('model-id')
if (target) target.visible = false

parser.parse()
await parser.run()
```

`parse()` 和 `run()` 是两个独立步骤。修改 `flow` 后，应先对旧执行图调用 `stop()` 和 `cleanup()`，再更新 `flow` 并调用 `parse()`。单独再次调用 `parse()` 会直接丢弃旧节点及其恢复回调。

## FlowParser

### 构造函数

```ts
new FlowParser(ssp: SoonSpace, flow: FlowType)
```

### 方法

| API | 返回值 | 说明 |
| --- | --- | --- |
| `parse()` | `void` | 清空当前节点/边并按 `flow` 重新创建执行图。 |
| `run(global?, options?)` | `Promise<void>` | 并行启动参与连接的节点，并等待全部任务 settled。 |
| `debug(global?, time?)` | `Promise<void>` | 在每个节点执行后等待，默认 `1500ms`。 |
| `stop()` | `void` | reject 所有节点的当前任务。 |
| `cleanup()` | `void` | 按执行顺序逆序运行节点清理逻辑。 |
| `dispose()` | `void` | 依次执行 `stop()` 和 `cleanup()`。 |
| `clear()` | `void` | 清空节点、边和映射。 |
| `addNode(node)` | `void` | 添加节点并写入 `nodesMap`。 |
| `addEdge(edge)` | `void` | 添加边并写入 `edgesMap`。 |
| `getNodeById(id)` | `Node \| undefined` | 按 ID 获取节点。 |
| `getEdgeById(id)` | `Edge \| undefined` | 按 ID 获取边。 |
| `getVariableNameById(id)` | `any` | 读取节点名为 `out` 的输出属性。 |

```ts
await parser.run(
  {
    getTarget: async () => ssp.getModelById('model-id'),
  },
  { preload: false }
)
```

`preload: true` 时只执行模型、Mesh、POI、空间、路径、颜色、数字、数据筛选等预加载节点。

## ComponentFlowParser

```ts
new ComponentFlowParser(
  ssp: SoonSpace,
  flow: ComponentFlowType
)
```

它继承 `FlowParser`。`ComponentFlowType` 在 `FlowType` 基础上增加 `editionId: string`。

## Node

`Node` 是所有流程节点的基类。自定义节点可以继承它并实现 `exec()`。

| API | 说明 |
| --- | --- |
| `init()` | 重建上下文和当前执行 Promise。 |
| `readContext(key)` | 读取节点上下文。 |
| `writeContext(key, value)` | 写入节点上下文。 |
| `findProp(name, type)` | 按名称和属性类型查找节点配置。 |
| `waitForPrevNodes()` | 等待全部前置节点。 |
| `mergeContext()` | 合并前置节点上下文。 |
| `exec(global)` | 子类实现的节点行为。 |
| `run(global, options?)` | 执行等待、上下文合并、钩子和 `exec`。 |
| `cleanup()` | 运行并清空 `cleanSets`。 |

可以通过 `node.onBefore`、`node.onAfter`，或 `parser.onNodeBefore`、`parser.onNodeAfter` 监听节点执行。

## 触发器

### Trigger

```ts
const trigger = new Trigger(
  ssp,
  interaction,
  flows,
  {
    onTrigger: (current) => console.log(current.id),
    onError: (error) => console.error(error),
  }
)
```

构造函数会立即根据 `InteractionType` 绑定信号。使用完后必须调用：

```ts
trigger.dispose()
```

`Trigger` 公开 `runFlowByIds()`、`execBehavior()`、`getObsTarget()` 和各类 `init*` 方法。通常由构造函数自动初始化；只有自定义触发流程时才需要直接调用这些低层方法。

### ComponentTrigger

`ComponentTrigger` 面向组件流程，使用 `ComponentFlowParser`，并增加：

| API | 说明 |
| --- | --- |
| `getComponentObsTarget(currentNode?)` | 获取组件交互目标。 |
| `componentThingModelHandler(params)` | 处理物模型属性事件。 |
| `onThingPropChange(newProps)` | 派发 `thingModelPropsChange` 信号。 |

## 流程类型

```ts
type FlowType = {
  id: string
  sid: string
  name: string
  portal: string
  nodes: NodeType[]
  edges: EdgeType[]
}

type NodeType = {
  id: string
  type: NodeTypeEnum
  props: NodePropType[]
}

type EdgeType = {
  id: string
  source: string
  target: string
  sourceHandle?: string | null
}
```

`NodePropTypeEnum` 包含：

- `LOCAL`：读取节点本地配置；
- `READ_CTX`：从流程上下文读取；
- `WRITE_CTX`：写入流程上下文。

`NodeTypeEnum` 当前包含：

`START`、`COLOR`、`NUMBER`、`HIGHLIGHT`、`UN_HIGHLIGHT`、`OPACITY`、`UN_OPACITY`、`EMISSIVE`、`UN_EMISSIVE`、`MESH`、`MESHES`、`MODEL`、`MODELS`、`SHOW`、`HIDE`、`CLIP_ANIMATION`、`UN_CLIP_ANIMATION`、`TWEEN_ANIMATION`、`UN_TWEEN_ANIMATION`、`COMPONENT_TWEEN_ANIMATION`、`UN_COMPONENT_TWEEN_ANIMATION`、`SPACE`、`SPACES`、`PATH`、`PATHS`、`POI`、`POIS`、`FLY_TO`、`TRANSLATE`、`ROTATE`、`SCALE`、`DATA_FILTER`、`DATA_EXTRACTION`、`CONDITION_NODE`、`DELAY`、`USER_DATA_NODE`。

## 交互类型

| 类型 | 值 |
| --- | --- |
| `InteractionType` | `MOUSE_CLICK`、`MOUSE_DB_CLICK`、`MOUSE_RIGHT_CLICK`、`THING_PROP_CHANGE`、`THING_EVENT`、`LOADED`、`MODEL_PROP_CHANGE` |
| `InteractionObsType` | `GLOBAL`、`INSTANCE`、`FAMILY` |
| `InteractionAction` | `FLOW`、`ANIMATION`、`DELAY` |
| `InteractionActionType` | `GLOBAL`、`SELF`、`OTHER` |

::: warning 生命周期
触发器会向 SoonSpace signals 注册监听。页面卸载、场景切换或触发配置失效时，应调用 `dispose()`，避免重复触发。
:::
