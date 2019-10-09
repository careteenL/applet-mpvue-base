<template>
  <div :class="['v-cell-group', 'v-hairline', { 'v-hairline--top-bottom': border }]">
    <slot />
  </div>
</template>

<script>
export default {
    name: 'v-cell-group',

    props: {
        border: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style scoped lang="scss">
.v-cell-group {
    background-color: #fff;
}
</style>
