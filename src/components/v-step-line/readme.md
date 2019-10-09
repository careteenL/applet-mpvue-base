## v-step-line

### 使用指南

> 文本

```html
v-step-line(
    v-for="(item, index) of actions"
    :key="index")
    p(slot="title") 提现成功
    div(slot="content")
        p.action__info 泰禾昌平拾景园188.88元现金到账
        p.action__time 2019.01.01 20:23:08
```

> 变量需要 scope

```html
v-step-line(
    v-for="(item, index) of actions"
    :key="index"
    :scope="item"
    )
    p(slot="title") {{scope.title}}
    div(slot="content")
        p.action__info {{scope.action}}
        p.action__time {{scope.time}}
```

### 方法

todo

### Options

todo
