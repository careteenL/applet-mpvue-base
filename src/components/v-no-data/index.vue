<template lang="pug">
    div.no-data(:style="{paddingTop: mTop, paddingBottom: mBottom}")
        img.icon(:src="icon" :style="{width: size[0] + 'rpx', height: size[1] + 'rpx'}")
        p.txt {{txt}}
</template>
<script>
export default {
    name: 'v-no-data',
    props: {
        txt: {
            type: String,
            default: '暂无数据'
        },
        mTop: {
            type: String,
            default: '228rpx'
        },
        mBottom: {
            type: String,
            default: '0rpx'
        },
        size: { // 宽高
            type: Array,
            default: _ => [420, 130]
        },
        icon: String
    }
}
</script>
<style lang="scss" scoped>
.no-data {
    .icon {
        display: block;
        // width: 420rpx;
        // height: 130rpx;
        margin: 0 auto;
        // position: relative;
        // overflow: visible;
        // &::before, &::after {
        //     position: absolute;
        //     content: "";
        //     top: 57rpx;
        //     width: 100rpx;
        //     height: 2rpx;
        //     border-radius: 1rpx;
        //     background-color: #ededf0;
        // }
        // &::before {
        //     left: -145rpx;
        // }
        // &::after {
        //     right: -145rpx;
        // }
    }
    .txt {
        margin-top: 14rpx;
        text-align: center;
        font-size: 28rpx;
        color: #a0a0ac;
    }
}
</style>
