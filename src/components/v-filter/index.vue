<template lang="pug">
div.v-filter(catchtouchmove="true" v-show='show')
    div.container
        scroll-view.panel(scroll-y)
            div.group(v-for="(enumItem, enumIndex) in enumData" :key="enumIndex")
                p.title {{enumItem.title}}
                div.options
                    span.item(
                        v-for='(lItem, lIndex) in enumItem.list'
                        :class='{active: enumItem.selected === lItem.value}'
                        :key="lIndex"
                        @click="tapItem(enumIndex, lItem, lIndex)"
                    ) {{lItem.label}}
        div.btn
            v-button(@click="tapConfirm") 确定
</template>

<script>
import VButton from '@com/v-button';
export default {
    name: 'v-filter',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        enumData: {
            type: Object,
            default: _ => ({
                channle: {
                    title: '选择渠道',
                    selected: 1,
                    list: [
                        { label: 'aaa', value: 1 },
                        { label: 'bbb', value: 2 },
                        { label: 'ccc', value: 3 }
                    ]
                },
                channle2: {
                    title: '选择渠道2',
                    selected: 3,
                    list: [
                        { label: 'aaa', value: 1 },
                        { label: 'bbb', value: 2 },
                        { label: 'ccc', value: 3 }
                    ]
                }
            })
        }
    },
    data() {
        return {
            enumDataCur: {}
        }
    },
    watch: {
        enumData(newV) {
            this.enumDataCur = newV
        }
    },
    components: {
        VButton
    },
    methods: {
        tapItem(key, item, index) {
            this.enumData[key].selected = item.value
        },
        tapConfirm() {
            this.$emit('confirm', this.enumData)
        }
    }
}
</script>

<style lang="scss" scoped>
.v-filter {
    position: fixed;
    left: 0;
    // top: 88rpx;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(34,34,51,0.2);
    z-index: 999;
    // border-top: 1rpx solid #eee;
    .container {
        position: absolute;
        left: 0;
        bottom: 0;
        background-color: #fff;
        padding: 20rpx 30rpx 140rpx;
        box-sizing: border-box;
        .panel {
            max-height: 755rpx;
        }
        .group {
            margin-top: 10rpx;
            .title {
                font-size: 28rpx;
                line-height: 1.5;
                color: #556;
                margin-bottom: 10rpx;
            }
            .options {
                .item {
                    box-sizing: border-box;
                    margin-bottom: 20rpx;
                    width: 218rpx;
                    height: 60rpx;
                    display: inline-block;
                    text-align: center;
                    line-height: 60rpx;
                    font-size: 28rpx;
                    color: #9f9fa6;
                    border: 1rpx solid #dddddf;
                    border-radius: 2rpx;
                    &.active {
                        color: #37f;
                        border: 1rpx solid #37f;
                        background-color: rgba(51,119,255,0.1);
                    }
                    &:nth-child(3n-1) {
                        margin: 0 18rpx;
                    }
                }
            }
        }
        .btn {
            font-size: 32rpx;
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            box-sizing: border-box;
            padding: 26rpx 30rpx;
            background-color: #fff;
            border-top: 1rpx solid #eee;
        }
    }
}
</style>
