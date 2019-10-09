<template>
    <div class="v-dialog">
        <div class="v-popup"
          :style="{'z-index': zIndex}"
          :class="{'v-popup_mask': mask}"
          v-show="visible"
          >
          <div class="v-popup-mask" @touchmove.prevent @click="maskClick">
            <slot name="mask"></slot>
          </div>
          <div class="v-popup-container v-popup-center" @touchmove.prevent>
            <div class="v-popup-content">
                <div class="v-dialog-center" >
                    <div v-if="scope.title" v-text="scope.title" :class="['v-dialog__header', {'no-message': !scope.message}]" />
                    <div class="v-dialog__content" v-if="scope.message ">
                        <div v-if="scope.message" :class="['v-dialog__message', { 'no-title': !scope.title }]"><span  v-html="scope.message"></span></div>
                    </div>
                    <div class="v-dialog__content" v-else>
                        <slot></slot>
                    </div>
                    <div class="v-hairline v-hairline--top flex" :class="['v-dialog__footer', { 'buttons': scope.showCancelButton && scope.showConfirmButton }]">
                        <div
                          v-if="scope.showConfirmButton"
                          :class="['v-dialog__footer--button btn-confirm cell v-hairline ', { 'right-border': scope.showCancelButton && scope.showConfirmButton }]"
                          :style="{color: scope.confirmButtonColor}"
                          @tap="handleAction('confirm')"
                        >
                          {{ scope.confirmButtonText }}
                        </div>
                        <div
                          v-if="scope.showCancelButton"
                          class="v-dialog__footer--button btn-cancel cell "
                          :style="{color: scope.cancelButtonColor}"
                          @tap="handleAction('cancel')"
                        >
                          {{ scope.cancelButtonText }}
                        </div>
                    </div>

                </div>

            </div>
          </div>
        </div>
    </div>
</template>
<script>
// import VPopup from '../v-popup';
import visibilityMixin from '../mixins/visibility';
import popupMixin from '../mixins/popup';

export default {
    name: 'v-dialog',
    mixins: [visibilityMixin, popupMixin],
    props: {
        mask: {
            type: Boolean,
            default: true
        },
        // mpvue slot作用域有bug
        // https://github.com/Meituan-Dianping/mpvue/issues/526
        scope: {
            type: Object,
            default: function() {
                return {
                    title: '',
                    message: '',
                    confirmButtonText: String,
                    confirmButtonColor: String,
                    cancelButtonText: String,
                    cancelButtonColor: String,
                    showCancelButton: Boolean,
                    showConfirmButton: Boolean
                };
            }
        },
        beforeClose: {
            type: Function,
            default: function() {}
        },
        className: [String, Object, Array],
        callback: {
            type: Function,
            default: function() {}
        },
        zIndex: {
            type: Number,
            default: 800
        }
    },

    methods: {
        maskClick() {
            this.maskClosable && this.hide();
        },

        handleAction(action) {
            if (this.beforeClose) {
                this.beforeClose(action, state => {
                    if (state !== false) {
                        this.onClose(action);
                    }
                });
            } else {
                this.onClose(action);
            }
        },

        onClose(action) {
            this.value = false;
            this.$emit('input', false);
            this.$emit(action);
            this.callback && this.callback(action);
        }
    },
    // components: {
    //     VPopup
    // },
    onUnload() {
        this.visible = false
    }
};
</script>

<style lang="scss" scoped>
@import '@/styles/common.scss';

.v-dialog-center {
    width: 270px;
    font-size: 16px;
    overflow: hidden;
    background-color: #fff;
    border-radius: 11px;
}
.v-dialog {
    &__header {
        padding: 20px 20px 0;
        text-align: center;
        color: rgba(48, 48, 51, 1);
        line-height: 24px;
        text-align: center;

        &.no-message {
            margin-bottom: 20px;
        }
    }

    &__message {
        padding: 5px 20px 15px;
        line-height: 18px;
        font-size: 12px;
        text-align: center;
        background: rgba(255, 255, 255, 1);
        color: rgba(159, 159, 166, 1);
    }
    .no-title {
        font-size: 28rpx;
        line-height: 42rpx;
        font-weight:400;
        font-family:PingFangSC-Regular;
        color:rgba(48,48,51,1);
        padding: 33rpx 40rpx;
    }

    &__footer {
        overflow: hidden;
        user-select: none;
        @include m-r1bt(rgb(229,229,229));

        &--button {
            text-align: center;
            font-size: 16px;
            line-height: 44px;
            font-weight: 400;
            border-radius: 0;
            outline: none;
            color: rgb(255, 34, 34);

            &.right-border {
                @include m-r1br(rgb(229,229,229));
            }
        }
    }
}

.v-popup {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    pointer-events: none;
}
.v-popup_mask {
    pointer-events: auto;
    .v-popup-mask {
        display: block;
    }
}
.v-popup-mask,
.v-popup-container {
    position: absolute;
    width: 100%;
    height: 100%;
}
.v-popup-mask {
    display: none;
    overflow: hidden;
    background-color: rgb(37, 38, 45);
    opacity: 0.4;
    pointer-events: auto;
    // fix some android webview opacity render bug
    &::before {
        content: '.';
        display: block;
        width: 1px;
        height: 1px;
        background-color: rgba(0, 0, 0, 0.1);
        margin-left: -10px;
    }
}
.v-popup-container {
    transform: translate(100%, 100%);
}
.v-popup-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    transform: translate(-100%, -100%);
    pointer-events: auto;
}
.v-popup-center {
    .v-popup-content {
        top: -50%;
        left: -50%;
        width: auto;
        max-width: 100%;
        transform: translate(0, 0);
    }
}

.v-popup-center {
    .v-popup-content {
        transform: translate(-50%, -50%);
    }
}
</style>
