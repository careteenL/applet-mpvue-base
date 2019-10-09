<template lang="pug">
    div.single-select(@click="tapSelect")
        span.label(:class='{showing: showing, selected: value != -1}') {{fixLabel || labelTxt}}
            i.icon
        v-select(ref="vSelect"
            top="88rpx"
            :valueArray="options"
            :valueDefault="value"
            @onConfirm="onConfirm"
            @onCancel="onCancel")
</template>
<script>
import VSelect from '@com/v-select';
export default {
    name: 'single-select',
    components: {
        VSelect
    },
    props: {
        value: Number,
        options: Array,
        fixLabel: {
            type: String,
            default: ''
        },
        sid: Number
    },
    data() {
        return {
            showing: false,
            selectItem: {},
            id: this.sid
        }
    },
    watch: {
        sid(next) {
            if (this.id != next) {
                this.showing = false
                this.$refs.vSelect.hide()
            }
        }
    },
    computed: {
        labelTxt() {
            return this.options.find(item => item.value == this.value).label;
        }
    },
    onHide() {
        this.showing = false
        this.$refs.vSelect.hide()
    },
    onUnload() {
        this.showing = false
        this.$refs.vSelect.hide()
    },
    methods: {
        tapSelect() {
            if (this.showing) {
                this.$refs.vSelect.hide(); // 弹起
                this.showing = false
            } else {
                this.$refs.vSelect.show(); // 弹起
                this.showing = true
                this.$emit('onshow', this.id)
            }
        },
        onConfirm(res) {
            this.showing = false
            this.selectItem = res;
            this.$emit('input', res.value)
        },
        onCancel() {
            this.showing = false
            // this.$refs.vSelect.hide();
        }
    }
}
</script>
<style lang="scss" scoped>
.single-select {
    width: 100%;
}
.label {
    text-align: center;
    font-size: 28rpx;
    color: #a0a0ac;
    line-height: 88rpx;
    .icon {
        vertical-align: middle;
        margin-left: 10rpx;
        display: inline-block;
        width: 0;
        height: 0;
        border-color: #a0a0ac transparent transparent transparent;
        border-style: solid;
        border-width: 12rpx 8rpx 0 8rpx;
    }
}
.selected {
    color: #556;
    .icon {
        border-color: #556 transparent transparent transparent;
        border-style: solid;
        border-width: 12rpx 8rpx 0 8rpx;
    }
}
.showing {
    color: #556;
    .icon {
        border-color: transparent transparent #556 transparent;
        border-style: solid;
        border-width: 0 8rpx 12rpx 8rpx;
    }
    &::after {
        content: '';
        position: fixed;
        top: 87rpx;
        left: 0;
        z-index: 99;
        height: 1rpx;
        width: 100%;
        background-color: #eee;
    }
}
</style>
