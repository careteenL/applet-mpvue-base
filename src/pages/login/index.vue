<template lang="pug">
div.login-m
    div.login-m-mid
        div.mid-form-box
            input(placeholder="请输入手机号码"
                v-model="inputTelephone"
                type="number"
                maxlength="11"
                focus
                style="width:100%;"
                class="mid-form-box__input"
                placeholder-style="color:#BBBBBB;")
        div.mid-form-box
            input(placeholder="请输入图形验证码"
                v-model="inputImgCode"
                type="text"
                maxlength="8"
                style="width:100%;"
                class="mid-form-box__input"
                placeholder-style="color:#BBBBBB;")
            img.mid-form-box__img(:src="imgCodeUrl"  @tap="getImgCodeUrl")

        div.mid-form-box
            input(placeholder="验证码"
                v-model="inputTextCode"
                type="number"
                maxlength="8"
                class="mid-form-box__input"
                placeholder-style="color:#BBBBBB;")
            div.mid-form-box__text(v-if="countdown <= 0" @tap="submitGetCode" ) 获取验证码
            div.mid-form-box__num(v-if="countdown > 0") {{countdown}}s

    div.login-m-footer
        p.footer-text ※每天验证码发送不能超过10次
        div.login-m-footer__btn(@tap="submitLogin") 登&nbsp;&nbsp;&nbsp;录
    div.icon

    v-dialog(ref="global-v-dialog")

</template>
<script>
import { mapMutations } from 'vuex'
import { wxShenhe } from '@/model/env';
import VDialog from '@com/v-dialog/index.vue'; // 页面定义一次
import API from '@/model/api';

export default {
    data() {
        return {
            inputTelephone: '',
            inputImgCode: '',
            inputTextCode: '',
            countdown: '',
            imgCodeUrl: ''
        };
    },
    components: {
        VDialog
    },
    beforeMount() {
        this.getImgCodeUrl();
    },
    onShow() {
        wx.showLoading();
        // 在登录页统一控制跳转;
        if (
            this.$storage.get('isConsultant') &&
            this.$storage.get('token')
        ) {
            wx.redirectTo({
                url: '/pages/index/main'
            })
        } else {
            wx.hideLoading();
        }
    },
    onUnload() {
        this.inputTelephone = '';
        this.inputImgCode = '';
        this.inputTextCode = '';
        this.countdown = '';
    },
    methods: {
        ...mapMutations('user', ['updateUserInfo']),
        // 登录，输入框check
        loginCheck() {
            if (!this.getTeleCodeCheck()) {
                return false;
            }
            if (this.inputTextCode === '') {
                this.showToast('请输入验证码');
                return false;
            } else {
                return true;
            }
        },
        // 点击获取验证码，输入框check
        getTeleCodeCheck() {
            if (this.inputTelephone === '') {
                this.showToast('请输入手机号码');
            } else if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.inputTelephone)) {
                this.showToast('请输入正确的手机号码');
                return false;
            } else if (this.inputImgCode === '') {
                this.showToast('请输入图形验证码');
                return false;
            } else {
                return true;
            }
        },
        // 刷新图片验证码
        async getImgCodeUrl() {
            const res = await API.getImgCodeUrl({
                t: Math.random()
            });
            this.imgCookie = res.header['Set-Cookie'];
            this.imgCodeUrl = `data:image/png;base64,${
                res.data.data.base64data
            }`;
        },
        // 获取验证码
        async getTeleCode() {
            const res = await API.getMobileCaptcha(
                {
                    mobile: this.inputTelephone,
                    imgcode: this.inputImgCode,
                    type: 2,
                    channel: 4
                },
                {
                    cookie: this.imgCookie
                }
            );
            if (res.data.code == 200 || res.data.code == 56) {
                this.codeInputFocus = true;
                this.showToast('验证码已下发，请注意查收');
                this.countdown = 60;
                this.loopId = setInterval(() => {
                    if (this.countdown == 0) {
                        this.loopId && clearInterval(this.loopId);
                    }
                    this.countdown--;
                }, 1000);
            } else if (res.data.code == 6) {
                this.showToast('请输入正确的图形验证码');
                this.getImgCodeUrl();
            } else {
                this.showToast(res.data.msg);
                this.getImgCodeUrl();
            }
        },
        // 发送手机验证码
        submitGetCode() {
            if (this.getTeleCodeCheck()) {
                this.getTeleCode();
            }
        },
        // 登录请求
        async loginByCaptcha() {
            wx.showLoading();
            // 微信审核放行
            if (wxShenhe.passPhone == this.inputTelephone) {
                if (wxShenhe.passCode != this.inputTextCode) {
                    this.showToast('请输入正确的短信验证码');
                    return;
                }
                wx.hideLoading();
                this.$storage.set('isConsultant', true);
                this.$storage.set('token', wxShenhe.token);
                wx.redirectTo({url: '/pages/index/main'});
                return;
            }
            const parentRes = await API.loginByCaptcha(
                {
                    mobile: this.inputTelephone,
                    captcha: this.inputTextCode,
                    imgcode: this.inputImgCode,
                    channel: 4
                },
                {
                    cookie: this.imgCookie
                }
            );
            if (parentRes.data.code === 200) {
                wx.hideLoading()
                this.updateUserInfo(parentRes.data.data)
                let token = parentRes.data.data.token;
                const res = await API.checkTelephone({
                    brokerTel: this.inputTelephone
                });
                this.$storage.set('isConsultant', true);
                this.$storage.set('token', token);
                if (res.data.code === 0) {
                    wx.redirectTo({url: '/pages/index/main'})
                } else {
                    this.$dialog({
                        message: '当前手机号暂未开通顾问身份，请联系直销同学开通',
                        showConfirmButton: true,
                        confirmButtonText: '我知道了'
                    }).then(() => {
                        console.log('cancel');
                    })
                }
            } else if (parentRes.data.code === 2) {
                wx.hideLoading()
                this.showToast('请输入正确的短信验证码')
            } else if (parentRes.data.code === 6) {
                this.getImgCodeUrl()
                wx.hideLoading()
                this.showToast('请输入正确的图形验证码');
            } else {
                wx.hideLoading()
                this.showToast(parentRes.data.msg)
            }
        },
        async submitLogin() {
            if (this.loginCheck()) {
                // 发送登录请求
                this.loginByCaptcha();
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.login-m{
    background-color: #fff;
    width: 100%;
    height: 100%;
    overflow: hidden;
    &-mid{
        width: 100%;
        margin-top:20rpx;
        overflow: hidden;
        .mid-form-box{
            width:690rpx;
            margin-left:30rpx;
            display: flex;
            justify-content: space-between;
            border-bottom: 1rpx solid rgba(238,238,238,1);
            &__input{
                height:120rpx;
                width: 500rpx;
            }
            &__text{
                margin-top:39rpx;
                width:160rpx;
                height:32rpx;
                font-size:32rpx;
                margin-bottom:26rpx;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(48,48,51,1);
                line-height:32rpx;
            }
            &__img{
                margin-top:20rpx;
                width: 200rpx;
                height: 80rpx;
            }
            &__num {
                margin-top:39rpx;
                color: #ee4433;
            }
            .inputbox{
                display: flex;
                justify-content: space-between;
            }
        }
        .mid-text{
            width:84rpx;
            height:28rpx;
            font-size:28rpx;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(159,159,166,1);
            line-height:28rpx;
        }
    }
    &-footer{
        margin-top:30rpx;
        margin-left:30rpx;
        width:690rpx;
        .footer-text{
            height:24rpx;
            font-size:24rpx;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(159,159,166,1);
            line-height:24rpx;
        }
        &__btn{
            width: 100%;
            height: 80rpx;
            margin-top: 60rpx;
            line-height: 80rpx;
            text-align:center;
            padding: 0;
            margin-bottom: 50rpx;
            font-size: 36rpx;
            color: #ffffff;
            background: rgba(238, 68, 51, 1);
            border-radius: 50rpx;
            border: none;
        }
    }
    .icon{
        position:absolute;
        bottom: 40rpx;
        left: 260rpx;
        width:230rpx;
        height:50rpx;
        content: '';
        background: url(../../imgs/icon-bottom.svg) no-repeat;
        background-size: 230rpx 50rpx;
    }
}

</style>
