---
outline: 3
---

# plugin-sbmz-loader

加载由 `metadata.json` 描述的一组 SBM/SBMX 模型，并把它们放入同一个 SoonSpace `Group`。

## 安装

```bash
npm install @soonspacejs/plugin-sbmz-loader -S
```

## 使用方法

```ts
import SoonSpace from 'soonspacejs'
import SbmzLoaderPlugin from '@soonspacejs/plugin-sbmz-loader'

const ssp = new SoonSpace({
  el: '#view',
  options: {},
  events: {},
})
const loader = ssp.registerPlugin(
  SbmzLoaderPlugin,
  'sbmzLoader'
)

await loader.load('/models/site')

console.log(loader.modelData)
console.log(loader.modelList)
```

目录中需要存在 `/models/site/metadata.json`，模型 URL 会按 `${path}/${item.path}` 拼接。

## API

### load

```ts
load(path: string): Promise<void>
```

加载元数据，创建 ID 为 `${path}_group` 的 Group，并并行加载全部模型。

### 公开属性

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `modelData` | `SbmzModelData[]` | `metadata.json.items` 原始模型描述。 |
| `modelList` | `Model[]` | 加载完成后的模型列表。 |

### SbmzModelData

```ts
interface SbmzModelData {
  matrix: number[]
  name: string
  path: string
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
}
```

当前加载逻辑使用 `name`、`path`、`position`、`rotation` 和 `scale`；`matrix` 会保留在 `modelData` 中，但不会直接应用到模型。
