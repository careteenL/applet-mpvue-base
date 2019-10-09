<template>
  <div class="v-select"
    :style="{'top': top, 'display': showSelect? 'block' : 'none'} "
  >
    <div :class="{'v-select__mask':showSelect}" @click.stop="maskClick" catchtouchmove="true"></div>
    <div
        :class="{'v-select__content--show':showSelect, 'v-select__content': true}"
        >
        <div class="v-select__item"
            :class="{'v-select__item--active':selectValue == index}"
            v-for="(item, index) in selectArr"
            :key="index"
            @tap.stop="selectClick(item,index)"
            >{{item.label}}</div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            selectValue: '',
            valueArrayChange: true,
            selectArr: [],
            showSelect: false
        };
    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        /* 数据 */
        valueArray: {
            type: Array,
            default: () => []
        },
        /* 默认值 */
        valueDefault: {
            type: String || Number,
            default: ''
        },
        top: {
            type: String || Number,
            default: 0
        }
    },
    watch: {
        valueArray(oldVal, newVal) {
            this.valueArrayChange = true;
        }
    },
    methods: {
        initSelect(valueArray) {
            this.selectArr = valueArray;
            this.selectArr.find((d, index) => {
                if (d.value === this.valueDefault) {
                    this.selectValue = index;
                }
            });
        },
        show() {
            setTimeout(() => {
                if (this.valueArrayChange) {
                    this.initSelect(this.valueArray);
                    this.showSelect = true;
                    this.valueArrayChange = false;
                } else {
                    this.showSelect = true;
                }
            }, 0);
        },
        hide() {
            this.showSelect = false;
        },
        maskClick() {
            this.showSelect = false;
            this._emit('onCancel');
        },
        selectClick(item, index) {
            this.selectValue = index;
            this.showSelect = false;
            this._emit('onConfirm');
        },

        _ensureValue() {
            if (!this.selectValue) {
                this.selectValue = 0;
            }
        },
        _emit(evt) {
            this._ensureValue();
            this.$emit(evt, {
                index: this.selectValue,
                label: this.selectArr[this.selectValue].label,
                value: this.selectArr[this.selectValue].value
            });
        }
    }
};
</script>
<style lang="scss">
@import '@/styles/common.scss';

.v-select {
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: none;

    &__mask {
        position: absolute;
        z-index: 1000;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: rgba(34, 34, 51, 0.2);
    }
    &__content {
        position: absolute;
        top: 0;
        left: 0;
        padding-bottom: 40rpx;
        padding-top: 50rpx;
        width: 100%;
        transition: all 0.3s ease;
        transform: translateY(-100%);
        box-sizing: border-box;
        background-color: #fff;
        display: none;
        z-index: 3000;

        &--show {
            display: block;
            transform: translateY(0);
        }
    }
    &__item {
        margin-bottom: 40rpx;
        font-size: 28rpx;
        text-align: center;
        color: rgba(85, 85, 102, 1);
        line-height: 42rpx;
        &--active {
            color: rgba(51, 119, 255, 1);
        }
    }
}
</style>
