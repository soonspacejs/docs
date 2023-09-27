# Topology

该对象继承自 [`BaseObject3D`](./BaseObject3D.html)对象。

## 扩展属性

### nodes

点位信息集合

- **类型：** `TopologyNodeInfo[]`
- **默认值：** `-`

[TopologyNodeInfo](../api/topology.html#createtopology)

### links

连接线信息集合

- **类型：** `TopologyLinkInfo[]`
- **默认值：** `-`

[TopologyLinkInfo](../api/topology.html#topologylinkinfo)

## 方法

### getLength

获取路径的总长度

只适用于 `line`

#### 定义：

```ts
function getLength(): number;
```

#### 用法：

```ts
topology.getLength();
```
