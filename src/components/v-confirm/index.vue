<template lang="pug">
    div.mask(v-show="value")
        div.dialog
            div.dialog__txt(v-html="txt")
            div.dialog__btns.flex
                div.btn.cell(@tap="cancel")  取消
                div.btn.cell(v-if="btn" @tap="btnCb") {{btn}}
                div.btn.cell(v-else)
                    slot(name="btnOK")
</template>
<script>
export default {
    name: 'dialog-tip',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        txt: {
            type: String,
            default: ''
        },
        btn: {
            type: String,
            default: ''
        },
        btnCb: {
            type: Function,
            default: function() {
                return () => {};
            }
        }
    },

    methods: {
        maskClick() {
            this.maskClosable && this.hide();
        },

        hide() {
            this.$emit('input', false);
        },
        cancel() {
            this.$emit('cancel');
            this.hide();
        }
    },
    onUnload() {
        this.hide();
    }
};
</script>
<style lang="scss" scoped>
@import '@/styles/mixin.scss';

.mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
    z-index: 10;
    .dialog {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -60%);
        width: 600rpx;
        border-radius: 6rpx;
        background: #ffffff;

        &__txt {
            display: block;
            padding: 50rpx 30rpx;
            color: #666;
            font-size: 28rpx;
            line-height: 42rpx;
        }
        &__btns {
            @include m-r1b(rgb(229, 229, 229));

            .btn {
                text-align: center;
                font-size: 16px;
                line-height: 44px;
                font-weight: 400;
                border-radius: 0;
                outline: none;
                color: rgb(255, 34, 34);

                &:first-child {
                    @include m-r1br(rgb(229, 229, 229));
                }
            }
        }
    }
}
</style>
