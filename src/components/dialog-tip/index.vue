<template lang="pug">
    div.mask(v-show="value")
        div.dialog
            img.close(v-if="closable" src="./img/close.png" @tap="hide")
            div.dialog-avatar
                img.dialog-avatar-img(:src="img")
            h3.dialog-title(v-if="!!title") {{title}}
            div.dialog-text(v-html="tip")
            div.dialog-btn(@tap="btnCb")  {{btn}}
</template>
<script>
export default {
    name: 'dialog-tip',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'fail' // fail success
        },
        tip: {
            type: String,
            default: ''
        },
        btn: {
            type: String,
            default: '我知道了'
        },
        btnCb: {
            type: Function,
            default: function() {
                return () => {
                    this.hide();
                };
            }
        },
        maskClosable: {
            type: Boolean,
            default: false
        },
        zIndex: {
            type: Number,
            default: 800
        },
        closable: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: ''
        }
    },

    computed: {
        img() {
            return require(`./img/bg-avatar-${this.type}.png`);
        }
    },

    methods: {
        maskClick() {
            this.maskClosable && this.hide();
        },

        hide() {
            this.$emit('input', false);
        }
    },
    onUnload() {
        this.hide();
    }
};
</script>
<style lang="scss" scoped>
.mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
    z-index: 99999;
    .dialog {
        position: absolute;
        top: 14.26%;
        left: 50%;
        transform: translateX(-270rpx);
        width: 540rpx;
        height: 650rpx;
        border-radius: 10rpx;
        background: #ffffff;
        &-avatar {
            width: 160rpx;
            height: 160rpx;
            margin: 100rpx auto 0;
            &-img {
                width: 100%;
                height: 100%;
            }
        }
        &-title {
            margin-top: 50rpx;
            font-size: 36rpx;
            color: #333;
            line-height: 1.5;
            text-align: center;
        }
        &-text {
            display: block;
            margin-top: 10rpx;
            padding: 0 30rpx;
            color: #999999;
            font-size: 28rpx;
            line-height: 42rpx;
            text-align: center;
        }
        &-btn {
            position: absolute;
            left: 50%;
            transform: translateX(-210rpx);
            bottom: 70rpx;
            width: 420rpx;
            height: 88rpx;
            background:linear-gradient(90deg,rgba(68,153,255,1) 0%,rgba(51,119,255,1) 100%);
            border-radius:8px;
            color: #ffffff;
            line-height: 88rpx;
            font-size: 32rpx;
            text-align: center;
        }

        .close {
            position: absolute;
            right: 30rpx;
            top: 30rpx;
            width: 30rpx;
            height: 30rpx;
        }
    }
}
</style>
