## v-select

### 使用指南

> 默认单项选择器

```html
v-select(ref="vSelect"
    top="44px"
    :valueArray="array"
    :valueDefault="2"
    @onConfirm="onConfirm"
    @onCancel="onCancel")
```

```javascript
// this.$refs.vSelect.show(); // 弹起
// this.$refs.vSelect.hide(); // 收起

return {
    array: [
        { label: "中国", value: 1 },
        { label: "美国", value: 2 },
        { label: "日本", value: 3 },
        { label: "俄罗斯", value: 4 }
    ]
};
```

### 方法

todo

### Options

todo
