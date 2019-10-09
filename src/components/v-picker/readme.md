## v-picker

### 使用指南

> 默认单项选择器

```html
v-picker(ref="vPicker"
    comfirmTxt="选择项目"
    :valueArray="array"
    :valueDefault="2"
    @onChange="onChange"
    @onConfirm="onConfirm"
    @onCancel="onCancel")
```

```javascript
// this.$refs.vPicker.show(); // 弹起

return {
    array: [
        { label: "中国", value: 1 },
        { label: "美国", value: 2 },
        { label: "日本", value: 3 },
        { label: "俄罗斯", value: 4 }
    ]
};
```

> 日期选择器

```html
v-picker(
    ref="vPicker"
    mode="date"
    comfirmTxt="选择时间"
    :valueDefault="[1991,1,2]" // 默认选中今天
    @onConfirm="onConfirm"
    @onCancel="onCancel")
```

> 从上方弹出的选择器

```html
v-picker(
    ref="vPicker"
    type="top"
    mode="date"
    comfirmTxt="选择时间"
    :valueDefault="[1991,1,2]" // 默认选中今天
    @onConfirm="onConfirm"
    @onCancel="onCancel")
```

### 方法

todo

### Options

todo
