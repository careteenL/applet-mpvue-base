## v-cell

### 使用指南

```html
<v-cell-group>
    <!-- icon font -->
    <v-cell icon="e8ab" iconColor="red" title="我的优惠"  value="文案" link="/pages/mine/main"></v-cell>

    <v-cell title="关于我们"></v-cell>

    <!-- img icon-->
    <v-cell :icon="iconBuy" iconWidth="36rpx" iconHeight="34rpx" title="我的申购" :showTip="showBugTip" link="/"></v-cell>
</v-cell-group>
```

```
data() {
    return {
        iconBuy: require('./img/icon-discount.png')
        ...
    }
}
```

### 方法

todo

### Options

todo
