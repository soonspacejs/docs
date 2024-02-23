# 通用对象

`v2.4.3` 之后，统一了对象的检索和删除方法

## getObjectById

通过 `id` 查找

### 定义：

```ts
function getObjectById<T extends Object3D = BaseObject3D>(id: BaseObject3DInfo['id']): T | null;
```

### 用法：

```js
const object = ssp.getObjectById('object_id');
```

## getObjectByName

通过 `name` 查找

### 定义：

```ts
function getObjectByName<T extends Object3D = BaseObject3D>(name: string): T[];
```

### 用法：

```js
const objectList = ssp.getObjectByName('object_name');
```

## getObjectByUserDataProperty

通过 `userData` 属性查找

### 定义：

```ts
function getObjectByUserDataProperty<T extends Object3D = BaseObject3D>(
  property: string | UserDataPropertyFindFunc,
  value: any
): T[];
```

### 用法：

```js
const objectList = ssp.getObjectByUserDataProperty('propKey'， 'propVal')
// or
const objectList = ssp.getObjectByUserDataProperty(item => item['itemPropKey'] === 'itemPropVal')
```

### 参数：

#### propNameOrFindFunc

- **描述:** `userData` 内属性名 或 `find` 函数
- **类型:** string | function
- **必填:** <Base-RequireIcon :isRequire="true"/>

#### propValue

- **描述:** `userData` 内属性值。
- **类型:** any
- **必填:** <Base-RequireIcon :isRequire="false"/>

::: tip find 函数使用场景

```js
object.userData = {
  people: {
    name: 'xiaoming',
    age: 18,
  },
};
const objectList = ssp.getObjectByUserDataProperty((userData) => userData.people?.name === 'xiaoming');
```

:::

## removeObjectById

通过 `id` 移除

### 定义：

```ts
function removeObjectById(id: BaseObject3DInfo['id']): boolean;
```

### 用法：

```js
ssp.removeObjectById('object_id');
```

## addObject

添加对象

### 定义:

```ts
function addObject(object: Object3D, parent?: Object3D | null): void;
```

### 用法:

```js
ssp.addObject(object);

// or

const group = ssp.createGroup({
  id: 'group',
});

ssp.addObject(object, group);
```

### 参数:

#### object

- **类型:** Object3D
- **描述:** 要添加的空间对象
- **必填:** <Base-RequireIcon />

#### parent

- **类型:** Object3D
- **描述:** 被添加对象的父级, 默认为整个场景
- **必填:** <Base-RequireIcon :isRequire="false" />

## attachObject

类似 `addObject`，但会保持对象的世界坐标、旋转、缩放不变

### 定义:

```ts
function attachObject(object: Object3D, parent?: Object3D | null): void;
```

### 用法:

```js
ssp.attachObject(object);

// or

const group = ssp.createGroup({
  id: 'group',
});

ssp.attachObject(object, group);
```

### 参数:

#### object

- **类型:** Object3D
- **描述:** 要添加的空间对象
- **必填:** <Base-RequireIcon />

#### parent

- **类型:** Object3D
- **描述:** 被添加对象的父级, 默认为整个场景
- **必填:** <Base-RequireIcon :isRequire="false" />

## removeObject

移除对象

### 定义:

```ts
function removeObject(object: Object3D): void;
```

### 用法:

```js
ssp.removeObject(object);

// or

const model = ssp.getObjectById('xxx_model');

ssp.removeObject(model);
```

### 参数:

#### object

- **类型:** Object3D
- **描述:** 要移除的空间对象
- **必填:** <Base-RequireIcon />
