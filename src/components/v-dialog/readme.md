## v-dialog

### 使用指南

> 入口页面中定义一次，页面任意位置 api 方式调用

```javascript
import VDialog from "@com/v-dialog"; // main.js全局注册

Vue.use(VDialog);
```

```javascript
import VDialog from "@com/v-dialog/index.vue"; // 页面定义一次
```

```html
<v-dialog ref="global-v-dialog"></v-dialog>
```

即可在该页面任意位置按如下调用

```
this.$dialog({
    title: '添加成功！',
    message: '请在“个人中心-我的申购”查看进度',
    showConfirmButton: true,
})

this.$dialog({
    title: '添加成功！',
    message: '请在“个人中心-我的申购”查看进度',
    showConfirmButton: true,
    showCancelButton: true,
    cancelButtonText: '立即查看',
    confirmButtonText: '我知道了'
}).then(() => {
    // 点确定后回调
    })
    .catch(() => {
        // 点取消后回调
    });
```

> 页面中直接声明方式

```html
<v-dialog
  v-model="show"
  :scope="config"
  :before-close="beforeClose"></v-dialog>
```

```
data() {
    return {
        show: false,
        config: {
            title: '添加成功！',
            message: '查看进度',
            showConfirmButton: true,
            showCancelButton: true,
            cancelButtonText: '立即查看',
            confirmButtonText: '我知道了'
        }
    }
}
```

注意！因为 mpvue slot 作用域有 bug，故 scope 用来 hack

> slot 自定义内容

```html
<v-dialog
  v-model="show"
  :scope="config"
  :before-close="beforeClose">
    <div>
      内容自定义
    </div>
</v-dialog>
```

### 方法

```
beforeClose(action, done) {
    console.log('beforeClose...');
    if (action === 'confirm') {
        done();
    } else {
        console.log('去往哪');
    }
}
```

### Options

todo
