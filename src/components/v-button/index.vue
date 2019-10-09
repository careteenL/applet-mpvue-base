<template>
    <div :class="classList" @click="onTap">
        <slot></slot>
    </div>
</template>
<script>
// :class="{
//                 'v-button': true,
//                 'inline': inline,
//                 'primary': type == 'primary',
//                 'secondary': type == 'secondary',
//                 'default': type == 'default',
//                 'hollow': type == 'hollow',
//                 'text': type == 'text',
//                 'disable': disable
//             }"
export default {
    name: 'v-button',
    props: {
        type: {
            type: String,
            default: 'primary'
        },
        size: {
            type: String,
            default: 'large'
        },
        disable: {
            type: Boolean,
            default: false
        },
        activeClassName: {
            type: String,
            default: ''
        },
        className: {
            type: String,
            default: ''
        },
        delay: {
            type: Number,
            default: 100 // 默认100ms的点击延迟
        }
    },
    computed: {
        classList() {
            let list = ['v-button'];
            list.push(`v-button__${this.size}`);
            list.push(`v-button__${this.type}`);
            if (this.className) {
                list.push(this.className);
            }
            if (
                this.disable &&
                (this.type == 'primary' || this.type == 'secondary' || this.type == 'special')
            ) {
                list.push('v-button__disable');
            }
            return list;
        }
    },
    methods: {
        onTap(e) {
            if (this.disable) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            if (this.delay != 0) {
                let timer = setTimeout(() => {
                    this.$emit('click', e);
                    clearTimeout(timer);
                    timer = null;
                }, this.delay);
            } else {
                this.$emit('click', e);
            }
        }
    }
};
</script>
<style lang="scss">
@import '@/styles/common.scss';
.v-button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border-radius: 8rpx;
    &__large {
        height: 44px;
        font-size: 18px;
    }
    &__normal {
        height: 40px;
        font-size: 14px;
    }
    &__primary {
        color: #fff;
        background: linear-gradient(90deg,rgba(68,153,255,1) 0%,rgba(51,119,255,1) 100%);;
    }
    &__secondary {
        color: #f22;
        background: rgba(242, 34, 34, 0.1);
    }
    &__special {
        color: #3377FF;
        background:#FFFFFF;
        border-radius:4rpx;
        border:2rpx solid rgba(51,119,255,1);
    }
    &__default {
        color: #7788bb;
        background: #f5f5f6;
    }
    &__hollow {
        color: #37f;
        background: transparent;
        // @include m-r1b(#37f, 4px);
        border: 1rpx solid #37f;
    }
    &__text {
        color: #7788bb;
        background: transparent;
    }
    &__disable {
        color: #fff;
        background: #dddddf;
        border: none;
    }
    &.disablebtn {
        color: #CCCCCD;
        background: #ffffff;
        border: 2rpx solid rgba(221,221,223,1);
    }
    &__tag {
        width: 130rpx;
        height: 50rpx;
        font-size: 22rpx;
        background: transparent;
        color: rgba(238, 68, 51, 1);
        @include m-r1b(rgba(238, 68, 51, 1), 50rpx);
    }

    &__tag_disable {
        width: 130rpx;
        height: 50rpx;
        font-size: 22rpx;
        background: transparent;
        color: rgba(160, 160, 172, 1);
        @include m-r1b(rgba(160, 160, 172, 1), 50rpx);
    }
}
</style>
