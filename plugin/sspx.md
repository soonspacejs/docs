---
outline: 3
---

# plugin-sspx

![beta](https://img.shields.io/npm/v/@soonspacejs/plugin-sspx/latest.svg)

`soonspacejs` 实例存储容器。

## 安装
```bash
npm install @soonspacejs/plugin-sspx -S
# or
yarn add @soonspacejs/plugin-sspx -S
```

## 使用方法
```js {2,10-18}
import SoonSpace from 'soonspacejs';
import Sspx from '@soonspacejs/plugin-sspx';

const ssp = new SoonSpace({
  el: '#view',
  options: {},
  events: {},
});

// 保存实例对象
Sspx.add('firstSsp', ssp)

// 获取实例对象
const ssp = Sspx.get('firstSsp')
console.log('firstSsp', ssp)

// 移除实例对象
Sspx.remove('firstSsp')
```

## 方法

### add
添加一个实例到容器

### get
获取已保存实例

### remove
移除已保存实例

## 源代码
```ts
import SoonSpace from 'soonspacejs'

const Sspx = {

  store: new Map<string, SoonSpace>(),

  add(name: string, ssp: SoonSpace): void {
    this.store.set(name, ssp)
  },

  get(name: string): SoonSpace | undefined {
    return this.store.get(name)
  },

  remove(name: string): boolean {
    return this.store.delete(name)
  }

}

export default Sspx
```
