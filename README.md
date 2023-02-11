---
home: true
heroImage: ./logo/logo.png
actionText: 开始学习 →
actionLink: /guide/
features:
  - title: 快速开发
    details: 基于 WebGL 开发，快速上手开发具有 3D 空间能力的项目。
  - title: 专注业务
    details: 提供简明易懂的 API，可以让开发者无需关注 WebGL 技术体系，更专注于业务开发。
  - title: 高扩展
    details: 功能稳定，同时插件可扩展性强，持续推进性能优化。
footer: 浙ICP备16043491号 | © Copyright 2018 xwbuilders - All rights reserved.
---

### Install

```bash
# 安装
npm install three soonspacejs
# 或者
yarn add three soonspacejs
```

如果你在使用 `typescript` 需要额外安装 [threejs](https://threejs.org/) 的声明文件

```bash
# 安装
npm install @types/three
# 或者
yarn add @types/three
```

### CDN

ES 模块：

[https://unpkg.com/soonspacejs/dist/index.esm.js](https://unpkg.com/soonspacejs/dist/index.esm.js)

::: tip 提示
在 HTML 中直接使用 `soonspacejs` 时需要指定 `three` 依赖地址

用法请参考 [在 html 中使用](./guide/start.html#在-html-中使用)
:::
