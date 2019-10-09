<template lang="pug">
div.listPages
    div.listTop
        img.head(:src="counselmsg.avatar")
        div.counsel
            div.welcomeMsg Hi 你好
            div.counselMsg 置业顾问：{{counselmsg.name}}
        div.exit(@tap="logout")
            p.exitText 退出
    div.listBottom(v-if="dataList.length")
        GuestItem(v-for="(item, index) in dataList" :info="item" :key="index" @call="callCb")
        div.nomoreData(v-if="isLastpage") 暂无更多数据
    no-data(v-else
        :nodataText="nodataText"
        :icon="icon"
        )
    v-dialog(ref="global-v-dialog")
</template>
<script>
import { mapState } from 'vuex'
import GuestItem from './components/guestItem.vue';
import API from '@/model/api';
import { baseUrl } from '@/model/env';
import { format } from '@script/date';
import NoData from '@com/no-data';
import GetListMixin from '@/mixins/page';
import VDialog from '@com/v-dialog/index.vue'; // 页面定义一次

export default {
    mixins: [GetListMixin],

    data() {
        return {
            counselmsg: {
                avatar: '',
                name: '张三'
            },
            dataList: [],
            imageUrlPre: '',
            brokerId: undefined,
            brokerTel: '',
            nodataText: {
                text1: '暂无数据，请联系直销负责人'
            },
            icon: require(`../../imgs/problem.png`),
            totalPage: 0
        };
    },
    computed: {
        ...mapState('user', ['userInfo']),
        isLastpage() {
            return this.pageNo === this.totalPage
        }
    },
    components: {
        GuestItem,
        NoData,
        VDialog
    },
    async onReady() {
        await this.getBrokerInfo()
        this.updateList()
    },
    async onShow() {
        // console.log(1)
    },
    methods: {
        // 获取经纪人信息
        async getBrokerInfo() {
            const res = await API.getBrokerInfo({
                token: this.$storage.get('token')
            })
            this.brokerId = res.brokerId
            this.brokerTel = res.brokerTel
            this.counselmsg.name = res.brokerName
            console.log(res.passPortraitUrl)
            if (res.passPortraitUrl === null || res.passPortraitUrl === '') {
                this.counselmsg.avatar = require(`../../imgs/defaulttouxiang .png`)
            } else {
                this.imageUrlPre = `${baseUrl}/image/getImage?imgKey=`
                this.counselmsg.avatar = this.imageUrlPre + res.passPortraitUrl
            }
        },
        // 获取线索
        async getList() { // 组件实现请求分页列表数据并返回
            const resData = await API.getClue({
                brokerId: this.brokerId,
                pageNo: this.pageNo,
                pageSize: 10
            })
            if (resData.data.code === 0) {
                resData.data.data.list = resData.data.data.list.map(item => {
                    return {
                        itemName: item.houseName,
                        userName: item.customerName,
                        userPhone: item.showMobile,
                        callPhone: item.customerMobile,
                        itemFrom: item.sourceName,
                        isCalled: item.isCalled,
                        houseId: JSON.stringify({'id': item.id, 'type': item.type}),
                        itemDate: format(new Date(item.oriCreateTime * 1000), 'yyyy-MM-dd hh:mm')
                    }
                })
                this.totalPage = resData.data.data.totalPage;
            }
            return resData.data.data
        },
        // 拨打电话
        async callCb(info) {
            const params = await API.visualPhone({
                appId: 13,
                cityId: 1,
                caller: this.brokerTel,
                called: info.callPhone,
                extInfo: info.houseId,
                bindType: 1,
                phoneType: 1
            });
            console.log(params)
            this.$dialog({
                message: '本机号码需与登录号码一致',
                showConfirmButton: true,
                showCancelButton: true,
                cancelButtonText: '拨打',
                confirmButtonText: '取消'
            }).then(() => {
                // 点确定后回调
            })
                .catch(() => {
                    // 点取消后回调
                    wx.makePhoneCall({
                        phoneNumber: params.data.data
                    });
                });
        },
        async logout() {
            this.$dialog({
                message: '确认退出登录吗？',
                showConfirmButton: true,
                showCancelButton: true,
                cancelButtonText: '确定',
                confirmButtonText: '取消'
            }).then(() => {
                // 点确定后回调
            })
                .catch(() => {
                    // 点取消后回调
                    wx.clearStorageSync();
                    setTimeout(() => {
                        wx.redirectTo({url: '/pages/login/main'})
                    });
                });
        }
    }
};
</script>
<style lang="scss" scoped>
.listPages{
    margin-bottom: 50rpx;
    overflow: hidden;
    .listTop{
        width:750rpx;
        height:200rpx;
        background:rgba(255,34,34,1);
        .head{
            width:120rpx;
            height:120rpx;
            margin-top: 40rpx;
            margin-left: 30rpx;
            border-radius: 50%;
            display: inline-block;
        }
        .counsel{
            display: inline-block;
            vertical-align: top;
            margin-top: 40rpx;
            margin-left:30rpx;
            .welcomeMsg{
                height:60rpx;
                margin-top: 4rpx;
                font-size:40rpx;
                font-family:PingFang-SC-Medium;
                font-weight:500;
                color:rgba(255,255,255,1);
                line-height:60rpx;
            }
            .counselMsg{
                height:42rpx;
                margin-top: 10rpx;
                margin-bottom: 4rpx;
                font-size:28rpx;
                font-family:PingFang-SC-Medium;
                font-weight:500;
                color:rgba(255,255,255,1);
                line-height:42rpx;
            }
        }
        .exit{
            position:absolute;
            top: 30rpx;
            right: 30rpx;
            width:126rpx;
            height:48rpx;
            border-radius:30rpx;
            border:1rpx solid rgba(255,255,255,1);
            .exitText{
                position:absolute;
                top: 6rpx;
                left: 58rpx;
                width:48rpx;
                height:36rpx;
                font-size:24rpx;
                font-family:PingFang-SC-Regular;
                font-weight:400;
                color:rgba(255,255,255,1);
                line-height:36rpx;
                &::before{
                    position:absolute;
                    content: '';
                    top: 5rpx;
                    left: -40rpx;
                    width:28rpx;
                    height:28rpx;
                    background: url(../../imgs/icon-exit.svg) no-repeat;
                    background-size: 28rpx 28rpx;
                }
            }
        }
    }
    .listBottom{
        width:690rpx;
        margin-left:30rpx;
    }
    .nomoreData{
        position: relative;
        margin-top: 50rpx;
        margin-bottom: 50rpx;
        margin-left: 266rpx;
        width:168rpx;
        height:28rpx;
        font-size:28rpx;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(159,159,166,1);
        line-height:28rpx;
        &::before{
            content: '';
            position:absolute;
            top: 15rpx;
            left: 190rpx;
            width:100rpx;
            height:2rpx;
            background:rgba(159,159,166,1);
            border-radius:1rpx;
        }
        &::after{
            content: '';
            position:absolute;
            top:15rpx;
            right: 190rpx;
            width:100rpx;
            height:2rpx;
            background:rgba(159,159,166,1);
            border-radius:1rpx;
        }
    }
}
</style>
