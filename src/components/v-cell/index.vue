<template>
<div :class="[
      'cell',
      {'cell--clickable': !!link || clickable || showArrow}
    ]" @tap="onClick">
      <div v-if="!!title" class="cell__title">
            <span v-text="title" />
            <div v-if="label" v-text="label" class="cell__label" />
      </div>
      <div v-if="!!value" :class="['cell__value', { alone: !title }]">
            <span v-text="value" />
      </div>
      <div v-if="!!logo" :class="['cell__logo', { alone: !title }]">
            <img :src="logo">
      </div>
      <slot name="right-icon">
            <i v-if="!!link || showArrow" class="cell__right-icon"></i>
      </slot>
      <slot name="extra" />
</div>
</template>

<script>
export default {
    name: 'v-scell',

    props: {
        label: String,
        link: String,
        showArrow: {
            type: Boolean,
            default: true
        },
        showTip: String,
        clickable: Boolean,
        title: [String, Number],
        value: [String, Number],
        logo: {
            type: String,
            default: ''
        },
        border: {
            type: Boolean,
            default: true
        }
    },

    methods: {
        onClick(e) {
            this.$emit('tap', e);
            if (this.link) {
                wx.navigateTo({
                    url: this.link
                });
            }
        }
    }
};
</script>

<style src="./index.scss" lang="scss" scoped>
</style>
