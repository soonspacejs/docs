---
sidebarDepth: 2
---

# plugin-pathfinding

![beta](https://img.shields.io/npm/v/@soonspacejs/plugin-pathfinding/latest.svg)

路径寻找

## 样例

<Docs-Iframe src="plugin/pathfinding.html" />

## 安装

```bash
npm install @soonspacejs/plugin-pathfinding
# or
yarn add @soonspacejs/plugin-pathfinding
```

## 使用方法

```js {2,10}
import SoonSpace from 'soonspacejs';
import PathfindingPlugin from '@soonspacejs/plugin-pathfinding';

const ssp = new SoonSpace({
  el: '#view',
  options: {},
  events: {},
});

const pathfinding = ssp.registerPlugin(PathfindingPlugin, 'pathfinding');
consolo.log(pathfinding);
```

## 方法

coding...
