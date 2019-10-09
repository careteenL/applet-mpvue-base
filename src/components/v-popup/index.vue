<template>
  <div class="v-popup"
    :style="{'z-index': zIndex}"
    :class="{'v-popup_mask': mask}"
    v-show="visible"
    >
    <div class="v-popup-mask" @touchmove.prevent @click="maskClick">
      <slot name="mask"></slot>
    </div>
    <div class="v-popup-container" @touchmove.prevent
        :class="'v-popup-' + position">
      <div class="v-popup-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script >
import visibilityMixin from '../mixins/visibility';
import popupMixin from '../mixins/popup';
export default {
    name: 'v-popup',
    mixins: [visibilityMixin, popupMixin],
    props: {
        mask: {
            type: Boolean,
            default: true
        },
        position: {
            type: String,
            default: 'center'
        },

        // mpvue slot作用域有bug
        // https://github.com/Meituan-Dianping/mpvue/issues/526
        scope: {
            type: Object,
            default: function() {
                return {};
            }
        },

        beforeClose: Function,
        callback: Function
    },

    methods: {
        maskClick(e) {
            this.$emit('mask-click');
            if (this.maskClosable) {
                this.hide();
            }
        }
    }
};
</script>

<style lang="scss" scoped >
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
.v-popup-center,
.v-popup-right,
.v-popup-left {
    .v-popup-content {
        top: -50%;
        left: -50%;
        width: auto;
        max-width: 100%;
        transform: translate(0, 0);
    }
}
.v-popup-right,
.v-popup-left {
    .v-popup-content {
        height: 100%;
        top: -100%;
    }
}
.v-popup-center {
    .v-popup-content {
        transform: translate(-50%, -50%);
    }
}
.v-popup-top {
    .v-popup-content {
        top: -100%;
        left: -100%;
        transform: translate(0, 0);
    }
}
.v-popup-right {
    .v-popup-content {
        top: -100%;
        right: 100%;
    }
}
.v-popup-left {
    .v-popup-content {
        left: -100%;
    }
}
</style>
