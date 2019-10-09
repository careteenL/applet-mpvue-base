## 弹层基类

适用于一切带弹层，自带 mask，使用者只关注 slot 内容即可

```html
<v-popup
  :z-index="zIndex"
  :mask="mask"
  :maskClosable="maskClosable"
  v-model="visible"
  @mask-click="maskClick"
  :scope="scope"
  >
  <div>
    自定义
  </div>
</v-popup>
```

注意！由于 mpvue slot 的 bug，需要注意 2 点
1、 slot 中如果含有变量，需要注意 scope hack(参考 v-toast)
2、 slot 中如果含有 slot, 是无法传递的，目前无法解决，只能 copy v-popup 代码自行封装（参考 v-dialog）
