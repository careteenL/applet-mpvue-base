<template>
<div class="no-data">
    <p class="p1"></p>
    <img :src="icon" class="no-data__img">
    <p class="p2"></p>
    <p class="no-data__text">{{nodataText.text1}}</p>
    <p class="no-data__text">{{nodataText.text2}}</p>
</div>
</template>
<script>
export default {
    props: {
        nodataText: {},
        icon: {
            type: String,
            default: `https://t1.focus-res.cn/activity/activity-wp-agent/static/img/cards-list/bg-card-nodata@2x.png`
        }
    }
};
</script>
<style lang="scss" scoped>
.no-data {
    .p1,.p2{
        width:100rpx;
        height:2rpx;
        background:rgba(159,159,166,1);
        border-radius:1rpx;
        position:absolute;
        top: 50%;
        transform: translate(-50%,-50%);
    }
    .p1{
        left: 30%;
    }
    .p2{
        left: 70%;
    }
    &__img {
        display: block;
        width: 130rpx;
        height: 130rpx;
        position:absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    &__text {
        width:364rpx;
        position:absolute;
        top: 58%;
        left: 50%;
        transform: translate(-50%,-50%);
        height:28rpx;
        font-size:28rpx;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(159,159,166,1);
        line-height:28rpx;
        margin: 30rpx auto 468rpx;
    }
}
</style>
