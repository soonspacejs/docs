# 对象分组

`v2.4.0`

使用对象分组将不同对象分组或归类，可以在空间中更便捷地实现批量控制。

### 样例

<Docs-Iframe src="start/objectGroup.html" />

## createGroup

提前创建一个空 `group`。

### 定义：

```ts
type GroupInfo = BaseObject3DInfo;

function createGroup(groupInfo: GroupInfo): Group;
```

### 用法：

```js
ssp.createGroup({
  id: 'group1',
  name: 'group1',
});
```

### 参数

#### groupInfo

- **描述:** 实例组对象所需信息
- **类型:** [GroupInfo](./types.html#baseobject3dinfo)
- **必填:** <Base-RequireIcon :isRequire="true"/>

## getAllGroup

获取所有 `group`

### 定义：

```ts
function getAllGroup(): Group[];
```

### 用法：

```js
const allGroups = ssp.getAllGroup();
```
