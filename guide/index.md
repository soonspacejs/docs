# 介绍

![version](https://img.shields.io/npm/v/soonspacejs)

![downloads](https://img.shields.io/npm/dm/soonspacejs)

**SoonSpace.js** 是 [杭州迅维智能科技有限公司](http://www.xwbuilders.com) 面向客户与内部项目的 web 端 `BIM` 开发包。

本文档适用于 `SoonSpace.js 2.x+` 版本，当前大版本使用 `TypeScript` 重构，在 `TypeScript` 开发环境下类型明确。同时在`设计结构`、`性能`与`插件化`方面做了优化。

## Install

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

## 做什么?

- 服务于 [SoonBuilder](http://www.xwbuilders.com/?page_id=1101&lang=zh) 的模型格式 `.sbm` 加载。
- 基于 [threejs](https://threejs.org/) 封装，简化在业务层的开发使用，将 `WebGL 3D` 技术推向各行业。

## 兼容性

PC: 不支持 `IE` 任何版本。
<br>
Mobile: 暂无不支持的浏览器（测试场景不全面）。

## CDN

ES 模块：

[https://unpkg.com/soonspacejs/dist/index.esm.js](https://unpkg.com/soonspacejs/dist/index.esm.js)

::: tip 提示
在 HTML 中直接使用 `soonspacejs` 时需要指定 `three` 依赖地址

用法请参考 [在 html 中使用](./start#在-html-中使用)
:::
