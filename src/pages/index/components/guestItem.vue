<template lang="pug">
div.guestItem
    div.guestTop
        div.itemName {{info.itemName}}
        div.itemState(v-if="info.isCalled === 0") 未拨打
        div.itemStateCalled(v-if="info.isCalled === 1") 已拨打
    div.guestMid
        div.userMsg
            span.userName {{info.userName}}
            span.userPhone {{info.userPhone}}
        div.call(@click="$emit('call', info)")
    div.guestBottom
        div.msgFrom 来自{{info.itemFrom}}
        div.msgDate 产生时间: {{info.itemDate}}
</template>
<script>

export default {
    name: 'guestItem',
    data() {
        return {
            value: 0
        }
    },
    props: {
        info: Object
    },
    methods: {
    },
    computed: {
    }
};
</script>
<style lang="scss" scoped>
.guestItem{
    margin-top: 30rpx;
    background:rgba(255,255,255,1);
    border-radius:8rpx;
    .guestTop{
        display:flex;
        justify-content: space-between;
        height:68rpx;
        border-bottom: 1rpx solid #eee;
        .itemName{
            margin-left:20rpx;
            margin-top:16rpx;
            height:36rpx;
            font-size:24rpx;
            font-family:PingFang-SC-Regular;
            font-weight:400;
            color:rgba(48,48,51,1);
            line-height:36rpx;
        }
        .itemState{
            margin-top:12rpx;
            margin-right:20rpx;
            height:36rpx;
            font-size:24rpx;
            font-family:PingFang-SC-Regular;
            font-weight:400;
            color:rgba(255,34,34,1);
            line-height:36rpx;
        }
        .itemStateCalled{
            margin-top:12rpx;
            margin-right:20rpx;
            height:36rpx;
            font-size:24rpx;
            font-family:PingFang-SC-Regular;
            font-weight:400;
            line-height:36rpx;
            color:rgba(109,109,115,1);
        }
    }
    .guestMid{
        height: 110rpx;
        border-bottom: 1rpx solid #eee;
        display:flex;
        justify-content: space-between;
        position:relative;
        .userMsg{
            margin-top:30rpx;
            margin-left:20rpx;
            .userName{
                display: inline-block;
                margin-right: 15rpx;
            }
        }
        .call{
            position:absolute;
            top: 30rpx;
            right: 20rpx;
            width:50rpx;
            height:50rpx;
            content: '';
            background: url(../../../imgs/icon-call.svg) no-repeat;
            background-size: 50rpx 50rpx;
        }
    }
    .guestBottom{
        height: 68rpx;
        border-bottom: 1rpx solid #eee;
        display:flex;
        justify-content: space-between;
        position:relative;
        .msgFrom{
            height:36rpx;
            margin-left: 20rpx;
            margin-top:16rpx;
            font-size:24rpx;
            font-family:PingFang-SC-Regular;
            font-weight:400;
            color:rgba(159,159,166,1);
            line-height:36rpx;
        }
        .msgDate{
            height:36rpx;
            font-size:24rpx;
            margin-right: 20rpx;
            margin-top:16rpx;
            font-family:PingFang-SC-Regular;
            font-weight:400;
            color:rgba(159,159,166,1);
            line-height:36rpx;
        }
    }
}
</style>
