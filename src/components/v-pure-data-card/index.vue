<template lang="pug">
    div.v-pure-data-card
        div.item(
            v-for="(item, index) in cardData"
            :key="index"
            :style="{ width: columnPercent }"
            :class="{ 'item-one': isOne, 'two-line': is2line }"
        )
            p.item__row(
                v-for="(iitem, iindex) in item"
                :key="iindex"
            ) {{iitem}}
</template>

<script>
export default {
    name: 'v-pure-data-card',
    props: {
        cardData: {
            type: Array,
            default: _ => [
                ['8777', 'ahhhh:222', 'asdasdasd'],
                ['8777', 'ahhhh:222', 'asdasdasd'],
                ['8777', 'ahhhh:222', 'asdasdasd']
            ]
        }
    },
    data() {
        return {

        }
    },
    computed: {
        columnPercent() {
            let ret = Number(100 / this.cardData.length).toFixed()
            return `${ret}%`
        },
        isOne() {
            return this.cardData.length === 1
        },
        is2line() {
            return this.cardData[0].length === 2
        }
    }
}
</script>

<style lang="scss" scoped>
    .v-pure-data-card {
        box-sizing: border-box;
        margin: 20rpx 20rpx 0 20rpx;
        background-color: #fff;
        border-radius: 6rpx;
        height: 220rpx;
        width: 710rpx;
        background-image:url(../../imgs/bg-pure-data-card.svg);
        background-size: contain;
        background-repeat: no-repeat;
        background-position: top left;
        .item {
            display: inline-block;
            text-align: center;
            margin: 43rpx 0;
            &__row {
                height: 36rpx;
                font-size: 24rpx;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: #A0A0AC;
                line-height: 36rpx;
                text-align: center;
                &:first-child {
                    font-family: Helvetica-Bold;
                    font-size: 36rpx;
                    color: #222233;
                    font-weight: bold;
                    height: 54rpx;
                    line-height: 54rpx;
                }
                &:nth-child(2) {
                    color: #555566;
                }
            }
            &.two-line {
                margin-top: 65rpx;
            }
            &.item-one {
                .item__row {
                    &:first-child {
                        font-size: 72rpx;
                        height: 72rpx;
                        line-height: 72rpx;
                    }
                    &:nth-child(2) {
                        color: #222233;
                    }
                }
            }
        }
    }
</style>
