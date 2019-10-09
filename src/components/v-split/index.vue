<template>
<div class="v-split">
    <div class="v-split-content flex">
        <i class="v-split--left"></i>
        <span v-if="icon">
            <img class="icon" :src="icon" :style="{'width':iconWidth, 'height':iconHeight}" />
        </span>
        <span v-else class="v-split__txt ">{{txt}}</span>
        <i class="v-split--right "></i>

    </div>
    <p class="v-split__more-txt" v-if="iconTxt" v-html="iconTxt"></p>
</div>
</template>

<script>
export default {
    name: 'v-split',
    props: {
        txt: {
            type: String,
            default: '你到达了内容的尽头'
        },

        // 带icon
        icon: String,
        iconTxt: String,
        iconWidth: {
            type: String,
            default: '130rpx'
        },
        iconHeight: {
            type: String,
            default: '130rpx'
        }
        // 带icon end
    }
};
</script>

<style lang="scss">
@import '@/styles/common.scss';

.v-split {
    margin: 0 auto;

    .v-split-content {
        justify-content: center;
        align-items: center;
    }

    &__txt {
        margin: 0 10px;
        font-size: 14px;
        color: rgb(159, 159, 166);
        line-height: 21px;
        text-align: center;
    }

    &--right,
    &--left {
        display: block;
        width: 55px;
        height: 0;
        @include m-r1bt(#e5e5e5);
    }

    &__more-txt {
        text-align: center;
        margin-top: 10px;
        font-size: 14px;
        color: rgb(159, 159, 166);
    }

    .icon {
        margin: 0 22px;
    }
}
</style>
