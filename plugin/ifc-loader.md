---
outline: 3
---

# plugin-ifc-loader

加载 IFC 文件并转换为 SoonSpace `Model`。加载完成的模型会自动加入场景。

## 安装

```bash
npm install @soonspacejs/plugin-ifc-loader -S
```

## 使用方法

```ts
import SoonSpace from 'soonspacejs'
import IfcLoaderPlugin from '@soonspacejs/plugin-ifc-loader'

const ssp = new SoonSpace({
  el: '#view',
  options: {},
  events: {},
})
const ifcLoader = ssp.registerPlugin(
  IfcLoaderPlugin,
  'ifcLoader'
)

ifcLoader.setWasmPath('/web-ifc/')

const model = await ifcLoader.load({
  id: 'building-ifc',
  name: 'Building',
  url: '/models/building.ifc',
})

await ssp.flyToObj(model)
```

## API

### setWasmPath

```ts
setWasmPath(path: string): void
```

设置 `web-ifc` WASM 文件所在目录。应在第一次调用 `load` 前设置。

### load

```ts
load(info: ModelInfo): Promise<Model>
```

加载 `info.url` 指向的 IFC 文件，创建 `Model`，把 `format` 固定为 `ifc`，并通过 `ssp.addObject()` 加入场景。

### dispose

```ts
dispose(): void
```

释放底层 IFC 管理器资源。不再使用插件时调用。

::: tip 默认解析配置
插件默认跳过 `IFCSPACE` 可选类别，并启用 `USE_FAST_BOOLS`。
:::
