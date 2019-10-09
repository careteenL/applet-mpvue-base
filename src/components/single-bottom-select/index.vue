<template lang="pug">
    div
        div.single-select(@click="tapSelect")
            span.label(:class='{showing: showing, selected: value != -1}') {{fixLabel || labelTxt}}
                i.icon
        v-picker(ref="vPicker"
            :comfirmTxt="comfirmTxt"
            :valueArray="options"
            :valueDefault="value"
            @onChange="onChange"
            @onConfirm="onConfirm"
            @onCancel="onCancel")
</template>
<script>
import VPicker from '@com/v-picker';
export default {
    name: 'single-bottom-select',
    components: {
        VPicker
    },
    props: {
        value: Number,
        comfirmTxt: {
            type: String,
            default: ''
        },
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
                this.$refs.vPicker.hide()
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
        this.$refs.vPicker.pickerCancel()
    },
    onUnload() {
        this.showing = false
        this.$refs.vPicker.pickerCancel()
    },
    methods: {
        tapSelect() {
            if (this.showing) {
                this.$refs.vPicker.hide(); // 隐藏
                this.showing = false
            } else {
                this.$refs.vPicker.show(); // 弹起
                this.showing = true
                this.$emit('onshow', this.id)
            }
        },
        onConfirm(res) {
            // this.$refs.vPicker.hide();
            this.showing = false
            this.selectItem = res;
            this.$emit('input', res.value)
        },
        onCancel() {
            this.showing = false
            // this.$refs.vPicker.hide();
        },
        onChange(res) {
            // this.selectItem = res;
            // this.$emit('input', res.value)
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
