---
sidebarDepth: 2
---

# soonmanager-sync
![beta](https://img.shields.io/npm/v/@soonspacejs/plugin-soonmanager-sync/next.svg)
<br>
[空间平台](http://www.xwbuilders.com:9050/#/projectManage/bim)生产的场景加载及数据读取插件。

## 安装
```bash
npm install @soonspacejs/plugin-soonmanager-sync@next -S
# or
yarn add @soonspacejs/plugin-soonmanager-sync@next -S
```

## 使用方法
```js {2,10}
import SoonSpace from 'soonspacejs'
import SoonmanagerSyncPlugin from '@soonspacejs/plugin-soonmanager-sync'

const ssp = new SoonSpace({
  el: '#view',
  options: {},
  event: {}
})

const soonmanagerSync = ssp.registerPlugin(SoonmanagerSyncPlugin, 'soonmanagerSync')
consolo.log(soonmanagerSync)
```

## 方法
完善中...