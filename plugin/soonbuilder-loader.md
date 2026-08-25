---
outline: 3
---

# plugin-soonbuilder-loader

读取 SoonBuilder 导出的 `FileInfo.xml` 和项目 XML，加载楼层以及 `FACILITY`、`DOOR`、`WINDOW` 类型的子模型。

## 安装

```bash
npm install @soonspacejs/plugin-soonbuilder-loader -S
```

## 使用方法

```ts
import SoonSpace from 'soonspacejs'
import SoonbuilderLoaderPlugin from '@soonspacejs/plugin-soonbuilder-loader'

const ssp = new SoonSpace({
  el: '#view',
  options: {},
  events: {},
})
const loader = ssp.registerPlugin(
  SoonbuilderLoaderPlugin,
  'soonbuilderLoader'
)

await loader.load('/projects/demo', true)

console.log(loader.treeData)
console.log(loader.modelData)
```

## API

### load

```ts
load(path: string, needJoinSuffix?: boolean): Promise<void>
```

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| `path` | - | 项目目录，或完整的 `FileInfo.xml` URL。 |
| `needJoinSuffix` | `false` | 为 `true` 时读取 `${path}/FileInfo.xml`；为 `false` 时直接把 `path` 当作 `FileInfo.xml` URL。 |

插件会按楼层创建 Group，把楼层主模型和可加载的实体子模型加入对应 Group。

## 公开属性

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `fileInfo` | `any` | 解析后的 `FileInfo.xml`。 |
| `sceneInfo` | `any` | 解析后的项目 XML。 |
| `treeData` | `TModelInfo[]` | 按楼层组织的模型树。 |
| `modelData` | `ModelInfo[]` | 按 URL 去重后的模型描述。 |

```ts
interface TModelInfo extends ModelInfo {
  children?: TModelInfo[]
}
```

::: warning URL 约定
`path` 必须以可正确拼接项目文件的目录结尾，或直接传入完整 `FileInfo.xml` URL。相对路径中的反斜杠会转换为正斜杠。
:::
