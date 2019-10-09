<template>
<div class="com-select-group" :class="{'fixed': fixed}">
    <div class="flex">
        <div class="select-item cell"
            v-if="type === typeMap.all || type === typeMap.onlyDate"
            @click="showPicker('datePicker')">
            <span class="select-item-text" :class="{'active': dateActive}">{{ dateValFormat }}</span>
            <i class="select-item-icon"></i>
        </div>
        <div class="select-item cell"
            v-if="type === typeMap.all || type === typeMap.onlyChannel"
            @click="showPicker('channelPicker')">
            <span class="select-item-text" :class="{'active': channelActive}">{{ channelName }}</span>
            <i class="select-item-icon"></i>
        </div>
    </div>

    <v-picker
        :mode="mode"
        :picker-default="channelVal"
        :selector-options="selectorOptions"
        @confirm="pickerChannelConfirm"
        @cancel="pickerChannelCancel"
        ref="channelPicker"></v-picker>

    <v-picker mode="dateCombine"
        :picker-default="dateVal"
        :selector-options="selectorOptions"
        @confirm="pickerDateConfirm"
        @cancel="pickerDateCancel"
        :dateRange="dateRange"
        :enableDays="enableDays"
        :enableTip="enableTip"
        ref="datePicker"></v-picker>
</div>
</template>

<script>
import VPicker from '@com/v-picker-new'
import { format } from '@script/date'

export default {
    name: 'select-group',

    components: {
        VPicker
    },

    props: {
        selectorOptions: {
            type: Array,
            default: () => []
        },

        dateVal: {
            type: [String, Number],
            default: 7
        },

        channelVal: {
            type: [String, Number],
            default: 0
        },
        type: {
            type: String,
            default: 'all'
        },
        mode: {
            type: String,
            default: 'selector'
        },
        enableDays: {
            type: Number,
            default: 90
        },
        enableTip: {
            type: String,
            default: ''
        },
        dateRange: {
            type: Array,
            default: _ => [
                { label: '近7日', val: 7 },
                { label: '近14日', val: 14 },
                { label: '近30日', val: 30 }
            ]
        },
        fixed: { // fixed时其会被chart遮挡 故不可行
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            typeMap: {
                all: 'all',
                onlyDate: 'onlyDate',
                onlyChannel: 'onlyChannel'
            },
            channelActive: false
            // channelVal: 0
            // dateVal: 7
        }
    },

    computed: {
        dateValFormat() {
            if (this.type !== this.typeMap.all && this.type !== this.typeMap.onlyDate) return ''
            if (!isNaN(this.dateVal)) {
                if (this.dateVal <= 1) {
                    return this.dateVal === 0 ? '今日' : '昨日'
                } else {
                    return `近${this.dateVal}日`
                }
            } else if ((this.dateVal + '').indexOf(',')) {
                let dateArr = this.dateVal.split(',')
                return `${format(new Date(parseInt(dateArr[0], 10)), 'MM.dd')}-${format(new Date(parseInt(dateArr[1], 10)), 'MM.dd')}`
            } else {
                return ''
            }
        },

        channelName() {
            if (this.type !== this.typeMap.all && this.type !== this.typeMap.onlyChannel) return ''
            let name = '-'
            if (this.mode === 'selector') {
                if (this.selectorOptions && this.selectorOptions[this.channelVal]) {
                    name = this.selectorOptions[this.channelVal].label
                }
                // if (this.selectorOptions && this.selectorOptions.find(item => item.val === this.channelVal)) {
                //     name = this.selectorOptions.find(item => item.val === this.channelVal).label
                // }
            } else if (this.mode === 'selectorCombine' && typeof this.channelVal === 'string') {
                // TODO 用val值去找代替index
                let channelArr = this.channelVal.split(',')
                if (this.selectorOptions[channelArr[0]] && this.selectorOptions[channelArr[0]].sub[channelArr[1]]) {
                    name = this.selectorOptions[channelArr[0]].sub[channelArr[1]].label
                }
            }
            return name
        },
        dateActive() {
            return this.dateVal !== this.dateRange[0].val
        }
        // channelActive() {
        //     return this.channelVal !== this.selectorOptions[0].val
        // }
    },
    watch: {
        selectorOptions(newV) {
            if (newV.length === 0) return
            this.channelActive = this.channelVal !== newV[0].val
        },
        channelVal(newV) {
            if (this.selectorOptions.length === 0) return
            this.channelActive = this.channelVal !== this.selectorOptions[0].val
        }
    },
    methods: {
        // Picker操作
        showPicker(pickerRef) {
            this.$emit('show')
            this.$refs[pickerRef].show()
        },

        pickerChannelConfirm(result) {
            this.channelVal = result
            this.$emit('confirm', {
                channel: result
            })
        },

        pickerChannelCancel() {
            this.$emit('cancel')
        },

        pickerDateConfirm(result) {
            this.cvHide = false
            this.dateVal = result
            this.$emit('confirm', {
                date: result
            })
        },

        pickerDateCancel() {
            this.$emit('cancel')
        }
    }
}
</script>

<style lang="scss">
@import '@/styles/common.scss';

.com-select-group {
    height: 88rpx;
    background-color: #fff;
    // @include m-r1b(#526cfe, 88rpx);
    &.fixed {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 99999;
    }

    .select-item {
        position: relative;
        text-align: center;
        font-size: 0;
        color: #A0A0AC;

        &-text {
            display: inline-block;
            max-width: 80%;
            height: 88rpx;
            line-height: 88rpx;
            font-size: 28rpx;
            color: #A0A0AC;
            vertical-align: middle;
            @extend %ellipsis-single-line;
            &.active {
                color: #3377FF;
            }
        }

        &-icon {
            display: inline-block;
            margin-left: 10rpx;
            height: 88rpx;
            width: 16rpx;
            background: url('~static/img/icon-triangle.png') no-repeat;
            background-size: 16rpx 12rpx;
            background-position: 0 38rpx;
            vertical-align: middle;
        }

        &.active::after {
            color: #526cfe;
        }

        &:first-child::before {
            content: '';
            display: block;
            width: 1rpx;
            height: 50rpx;
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            background-color: #e0e0ea;
        }
    }
}
</style>
