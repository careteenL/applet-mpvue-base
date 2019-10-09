<template lang="pug">
    div.data-card(:class="{'bg': hasBg}")
        div.top
            p.title {{title}}
            div.dims
                span.dim(
                    v-for="(item, index) in dimensions"
                    :key="index"
                    @click="tapDimension(item, index)"
                    :class='{ active: item.id == value }'
                ) {{item.name}}
        div.bottom
            div.item(
                v-for='(iitem, iindex) in items'
                :key="iitem.id"
                :style="{ width: columnPercent }"
                :class="{'align-left': itemAlign === 'left'}"
            )
                h3.row1 {{iitem.value || 0}}
                //- p.row2(@click="handleTapTip(item)") {{iitem}}
                p.row2(@click="handleTapTip(iitem)")
                    span.name {{iitem.name}}
                    i.icon-tip(v-if="iitem.tip")
</template>
<script>
export default {
    name: 'v-data-card',
    props: {
        title: {
            type: String,
            default: '数据总览'
        },
        hasBg: {
            type: Boolean,
            default: true
        },
        itemAlign: {
            type: String,
            default: 'center' // ['center', 'left', 'right']
        },
        // dimensions value 配套组成 上方tab
        dimensions: Object,
        value: Number, // 上方tab选中值

        // items data 配套组成下方展示 TODO 可合并为一个对象数组
        items: Array,
        data: Array,
        column: { // 下方一行展示几个
            type: Number,
            default: 4
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        columnPercent() {
            let ret = Number(100 / this.column).toFixed()
            return `${ret}%`
        }
    },
    methods: {
        tapDimension(item, index) {
            if (!this.disabled) {
                this.$emit('input', item.id)
            }
            this.$emit('ondimchange', item.id)
        },
        handleTapTip(item) {
            if (!item.tip) return
            this.$emit('tapTip', item)
        }
    }
}
</script>
<style lang="scss" scoped>
.data-card {
    box-sizing: border-box;
    margin: 0 20rpx;
    background-color: #fff;
    border-radius: 6rpx;
    // transform: translateY(-94rpx);
    min-height: 290rpx;
    padding-bottom: 38rpx;
    &.bg {
        background-image:url(../../imgs/bg-data-card.svg);
        background-size: contain;
        background-repeat: no-repeat;
    }
    .top {
        margin: 0 30rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 94rpx;
        border-bottom: 1rpx solid #eee;
        .title {
            margin-left: 16rpx;
            text-align: left;
            color: #223;
            position: relative;
            &::before {
                position: absolute;
                content: '';
                left: -16rpx;
                top: 50%;
                transform: translateY(-50%);
                width: 6rpx;
                height: 30rpx;
                background-color: #37f;
                border-radius: 4rpx;
            }
        }
        .dim {
            font-size: 28rpx;
            color: #556;
            margin-left: 40rpx;
        }
        .active {
           color: #37f;
           font-weight: 600;
        }
    }
    .bottom {
        .item {
            display: inline-block;
            // width: 25%;
            text-align: center;
            padding-top: 38rpx;
            &.align-left {
                text-align: left;
                text-indent: 40rpx;
            }
            .row1 {
                font-family: Helvetica-Bold;
                font-size: 36rpx;
                color: #222233;
                font-weight: 600;
                font-weight:bold;
            }
            .row2 {
                margin-top: 10rpx;
                font-size: 24rpx;
                color: #555566;
                font-weight:400;
                .name {
                    vertical-align: middle;
                }
                .icon-tip {
                    vertical-align: middle;
                    margin-left: 8rpx;
                    display: inline-block;
                    width: 26rpx;
                    height: 26rpx;
                    // background: url('~static/img/icon-question.png') no-repeat;
                    background: url(../../imgs/icon-question.png) no-repeat;
                    background-size: 26rpx 26rpx;
                }
            }
        }
    }
}
</style>
