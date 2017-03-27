# new_storage

# 引用

```html
<script type="text/javascript" src="storage.js"></script>
```

#本地存储API调用示例

```js
var storage = new Storage();

// 存储 'username' 的值为 'zhang'
storage.set('username', 'zhang');

// 存储 'username' 的值为 'zhang' 有效期为3秒
storage.set('username', 'zhang', 3000);

// 获取 'username'
storage.get('username');
//> 'zhang'

// 移除 'username' 字段
storage.remove('username');

// 清除所有本地存储
storage.clear();

//获取本地存储 length
storage.length();

// 存储对象
storage.set('user', { name: 'zhang', likes: 'javascript' });

// 获取存储的对象
var user = store.get('user');
// >{ name: 'marcus', likes: 'javascript' }


//获取所有用storage存储的数据。
storage.getAll();

//获取storage存储数据的length
storage.length();


```
