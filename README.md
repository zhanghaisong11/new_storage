# new_storage

# 引用

```html
<script type="text/javascript" src="storage.js"></script>
```

#本地存储API调用示例

```js

//创建命名空间
var storage = new Storage('user');

//不传入参数创建命名空间，默认为__storage__
var storage = new Storage();

// 存储 'username' 的值为 'zhang'
storage.set('username', 'zhang');

// 获取 'username'
storage.get('username');
//-> 'zhang'

// 存储 'username' 的值为 'zhang' 有效期为3秒
storage.set('username', 'zhang', 3000);

setTimeout(function() {
  console.log(storage.get('username'));
}, 1000)
// -> "zhang"

setTimeout(function() {
  console.log(storage.get('username'));
}, 4000)
// -> null

// 移除 'username' 字段
storage.remove('username');

// 清除所有该命名空间的本地存储
storage.clear();

// 存储对象
storage.set('user', { name: 'zhang', likes: 'javascript' });

// 获取存储的对象
storage.get('user');
// ->{ name: 'marcus', likes: 'javascript' }

//获取所有的storage存储的数据
storage.getAll();
//->[{key:"username",value:"zhang"},{key:user,value:{ name: 'zhang', likes: 'javascript' }}....]

//获取storage存储所有数据的length
storage.length();


```
