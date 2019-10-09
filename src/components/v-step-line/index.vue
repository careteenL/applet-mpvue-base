<template lang="pug">
    div.step-line
        div.step-line__line
        div.step-line__list
            div.step-line__point.flex
                i.icon
                p.title.cell
                    slot(name="title")
                    p.aaa gaaga
            div.step-line__content
                slot(name="content")
</template>

<script>
export default {
    name: 'v-step-line',
    props: {
        // fix: mpvue scope bug
        scope: {
            type: Object,
            default() {
                return {};
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.step-line {
    position: relative;
    padding-bottom: 30rpx;

    &:last-child {
        padding-bottom: 0;

        .step-line__line {
            height: 0;
        }
    }

    &__line {
        position: absolute;
        width: 2rpx;
        background-color: rgba(229, 229, 229, 1);
        height: 100%;
        top: 16rpx;
        left: 10rpx;
    }
    &__list {
        color: #666;
        font-size: 14rpx;
        line-height: 22rpx;
        word-break: break-all;
    }
    &__point {
        margin-left: 4rpx;
        color: rgba(229, 229, 229, 1);
        font-size: 12rpx;
        text-align: left;
        align-items: center;

        .icon {
            position: relative;
            display: inline-block;
            width: 14rpx;
            height: 14rpx;
            background: rgba(229, 229, 229, 1);
            border: 2rpx solid rgba(255, 255, 255, 1);
            border-radius: 100%;
            box-sizing: border-box;
            z-index: 9;
        }
        .title {
            margin-left: 20rpx;
            font-size: 28rpx;
            color: rgba(102, 102, 102, 1);
            line-height: 42rpx;
        }
        .aaa {
            height: 100rpx;
        }
    }

    &__content {
        margin-top: 4rpx;
        margin-left: 40rpx;
        text-align: left;
        font-size: 24rpx;
        color: rgba(153, 153, 153, 1);
        line-height: 36rpx;
    }
}
</style>
