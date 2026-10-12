# 介绍

::: raw
![version](https://img.shields.io/npm/v/soonspacejs) ![downloads](https://img.shields.io/npm/dm/soonspacejs)
:::

**SoonSpace.js** 是 [杭州迅维智能科技有限公司](https://www.xwbuilders.com) 面向客户与内部项目的 web 端 `BIM` 开发包。

本文档包含 `SoonSpace.js 3.0 alpha` 的 Entity 预览接口和保留的原生对象 API。已发布版本为 `3.0.0-alpha.0`，仅发布到 `alpha` 标签，稳定版仍为 `2.16.8`。3.0 alpha 移除了旧 AutoInstancing 引擎及控制接口，业务迁移要求见 [迁移指南](./entity-migration)。标记为 2.x 的参考和历史日志不是 alpha API。

## Install

```bash
# 使用固定版本安装 alpha
npm install soonspacejs@3.0.0-alpha.0 three@0.186.1 camera-controls@3.1.2 postprocessing@6.39.5 three-mesh-bvh@0.9.9
```

使用 TypeScript 时安装匹配的 [Three.js](https://threejs.org/) 声明文件：

```bash
npm install -D @types/three@0.186.0
```

以上固定组合对应本次 alpha 的安装验收依赖。源码声明的 peer 最低版本分别为 `three >=0.186.1`、`@types/three >=0.186.0`、`camera-controls >=3.1.2`、`postprocessing >=6.39.5`、`three-mesh-bvh >=0.9.9`，不代表所有更高版本都已验证。使用 `@soonspacejs/*` 插件时也固定为 `3.0.0-alpha.0`；`@alpha` 是会移动的预览标签，不能代替固定版本复现。未指定版本的安装仍跟随稳定版标签，不会自动获得 Entity。

使用 GIS 插件时，`cesium-to-three@0.2.4` 可能额外安装 Three.js `0.183.x`，引发重复实例警告。SDK 工作区已验证下面的 pnpm override 将依赖统一到 `0.186.1`；这不等于完成所有 GIS GPU 场景验收。使用其他包管理器时，应单独验证项目的去重配置。

```json
{
  "pnpm": {
    "overrides": {
      "three": "0.186.1"
    }
  }
}
```

## 做什么？

::: warning 3.0 alpha 是破坏性预览版本
需要业务身份与渲染批次分离、通过显式通知更新静态模型时，阅读 [Entity 入门](./entity)、[迁移指南](./entity-migration) 和 [Entity API](../api/entities)。原生模型、对象、动画、GIS 等路径保留，但不会自动转换为 Entity，也不再由旧 AutoInstancing 代理合批。
:::

- 服务于 [SoonBuilder](https://www.xwbuilders.com) 的模型格式 `.sbm` 加载。
- 基于 [threejs](https://threejs.org/) 封装，简化在业务层的开发使用，将 `WebGL 3D` 技术推向各行业。

## 兼容性

PC: 不支持 `IE` 任何版本。
<br>
Mobile: 暂无不支持的浏览器（测试场景不全面）。

## CDN

下面是稳定版原生对象路径的历史参考。3.0 alpha 使用上面的固定版本包管理器安装，不能用未指定版本的 CDN 地址验证 Entity。

ES 模块：

[https://unpkg.com/soonspacejs/dist/index.esm.js](https://unpkg.com/soonspacejs/dist/index.esm.js)

::: tip 提示
在 HTML 中直接使用 `soonspacejs` 时需要指定 `three`、`three-mesh-bvh` 和 `@robotlegsjs/signals` 等运行依赖地址。

用法请参考 [在 html 中使用](./start#在-html-中使用)
:::
