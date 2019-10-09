# 卡片

## Effect Picture

TODO add

## Usage

html

```pug
v-data-card(
    title="核心数据"
    :items="coreItems"
    v-model='defaultDate.dimId'
    :dimensions="dimensions"
    :data="cardData"
    @ondimchange="onDimChange"
)
```

js
```js
import VDataCard from '@com/v-data-card';
export default {
  // ...
  components: {
    VDataCard
  },
  // ...
}
```
