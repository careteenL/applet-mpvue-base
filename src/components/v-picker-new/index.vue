<template>
<div class="com-v-picker" :class="{'show': showPicker}" catchtouchmove="true">
    <!-- <div class="picker-mask" :class="{'ease-out': maskOut}" @click="cancel"></div> -->
    <div class="picker-mask" @click="cancel"></div>

    <!-- <div class="picker-box" :class="{'hide': maskOut}"> -->
    <div class="picker-box">
        <template v-if="mode === 'selector'">
            <div class="picker-header">
                <span class="picker-header-option picker-header-cancel"
                    @click="cancel">取消</span>
            </div>

            <div class="picker-selector">
                <scroll-view class="picker-selector-sv" :class="{'scroll-mode': selectorOptions && selectorOptions.length > 5}" scroll-y="true">
                    <ul class="picker-selector-list">
                        <li class="picker-selector-list-option"
                            :class="{'active': option.val === pickerDefault}"
                            v-for="option in selectorOptions"
                            :key="option.val"
                            @click="selectorChange(option.val)">{{ option.label }}</li>
                    </ul>
                </scroll-view>
            </div>
        </template>

        <template v-else-if="mode === 'selectorCombine'">
            <swiper class="picker-date-combine"
                :current="combineCurrentPos"
                @change="selectorCombineChange">
                <swiper-item catchtouchmove="true">
                    <div class="picker-header">
                        <span class="picker-header-option picker-header-cancel"
                            @click="cancel">取消</span>
                    </div>

                    <div class="picker-selector">
                        <scroll-view class="picker-selector-sv scroll-mode" scroll-y="true">
                            <ul class="picker-selector-list">
                                <li class="picker-selector-list-option"
                                    :class="{'active': option.val === selectorCombineState.firstVal}"
                                    v-for="option in selectorOptions"
                                    :key="option.val"
                                    @click="selectorChange(option)">{{ option.label }}</li>
                            </ul>
                        </scroll-view>
                    </div>
                </swiper-item>
                <swiper-item catchtouchmove="true">
                    <div class="picker-header selector-combine">
                        <span class="picker-header-option picker-header-cancel"
                            @click="selectorCombineJump(0)">{{ selectorOptions.length && selectorOptions[selectorCombineState.firstVal] ? selectorOptions[selectorCombineState.firstVal].label : '' }}</span>
                    </div>

                    <div class="picker-selector">
                        <scroll-view class="picker-selector-sv scroll-mode" scroll-y="true">
                            <ul class="picker-selector-list">
                                <li class="picker-selector-list-option"
                                    :class="{'active': option.val === selectorCombineState.subVal}"
                                    v-for="option in selectorSubOptions"
                                    :key="option.val"
                                    @click="selectorChange(option.val)">{{ option.label }}</li>
                            </ul>
                        </scroll-view>
                    </div>
                </swiper-item>
            </swiper>
        </template>

        <template v-else-if="mode === 'dateRange'">
            <div class="picker-header date-range">
                <span class="picker-header-option picker-header-cancel"
                    @click="cancel">取消</span>
                <span class="picker-header-tip" v-if="enableDays > 0">
                    <i class="picker-header-tip__icon"></i>
                    <span class="picker-header-tip__con">{{enableTipCur}}</span>
                </span>
                <span class="picker-header-option picker-header-confirm"
                    @click="confirm('date')">确定</span>
            </div>

            <div class="picker-date-range">
                <div class="range-header">
                    <div class="flex">
                        <div class="range-header-input"
                            :class="{'active': datePickerActive === 's'}"
                            @click="setDatePickerVal('s')">{{ dateStart }}</div>
                        <p class="range-header-link cell">-</p>
                        <div class="range-header-input"
                            :class="{'active': datePickerActive === 'e'}"
                            @click="setDatePickerVal('e')">{{ dateEnd }}</div>
                    </div>
                </div>

                <div class="picker-date">
                    <picker-view class="picker-date-list" :value="datePickerArr"
                        @change="datePickerChange"
                        indicator-class="picker-date-list-indicator">
                        <block>
                            <picker-view-column>
                                <div class="picker-date-list-item" v-for="(item,index) in date.year" :key="index">{{item.label}}</div>
                            </picker-view-column>
                            <picker-view-column>
                                <div class="picker-date-list-item" v-for="(item,index) in date.month" :key="index">{{item.label}}</div>
                            </picker-view-column>
                            <picker-view-column>
                                <div class="picker-date-list-item" v-for="(item,index) in date.day" :key="index">{{item.label}}</div>
                            </picker-view-column>
                        </block>
                    </picker-view>
                </div>
            </div>
        </template>

        <template v-else-if="mode === 'dateCombine'">
            <swiper class="picker-date-combine"
                :current="combineCurrentPos"
                @change="dateCombineChange">
                <swiper-item class="picker-date-combine-selector"
                    catchtouchmove="true">
                    <div class="picker-header">
                        <span class="picker-header-option picker-header-cancel"
                            @click="cancel">取消</span>
                    </div>

                    <div class="picker-selector">
                        <scroll-view class="picker-selector-sv scroll-mode" scroll-y="true">
                            <ul class="picker-selector-list">
                                <li class="picker-selector-list-option"
                                    :class="{'active': option.val === pickerDefault}"
                                    v-for="option in dateRange"
                                    :key="option.val"
                                    @click="selectorChange(option.val)">{{ option.label }}</li>
                                <li class="picker-selector-list-option"
                                    :class="{'active': dateRangeCustomVal === pickerDefault}"
                                    @click="selectorChange(dateRangeCustomVal)">{{ dateRangeCustomLabel }}</li>
                            </ul>
                        </scroll-view>
                    </div>
                </swiper-item>
                <swiper-item class="picker-date-combine-range" catchtouchmove="true">
                    <div class="picker-header date-combine">
                        <span class="picker-header-option picker-header-cancel"
                            @click="dateCombineJump(0)"></span>
                        <span class="picker-header-tip" v-if="enableDays > 0">
                            <i class="picker-header-tip__icon"></i>
                            <span class="picker-header-tip__con">{{enableTipCur}}</span>
                        </span>
                        <span class="picker-header-option picker-header-confirm"
                            @click="confirm('date')">确定</span>
                    </div>

                    <div class="picker-date-range">
                        <div class="range-header">
                            <div class="flex">
                                <div class="range-header-input"
                                    :class="{'active': datePickerActive === 's'}"
                                    @click="setDatePickerVal('s')">{{ dateStart }}</div>
                                <p class="range-header-link cell">-</p>
                                <div class="range-header-input"
                                    :class="{'active': datePickerActive === 'e'}"
                                    @click="setDatePickerVal('e')">{{ dateEnd }}</div>
                            </div>
                        </div>

                        <div class="picker-date">
                            <picker-view class="picker-date-list" :value="datePickerArr"
                                @change="datePickerChange"
                                indicator-class="picker-date-list-indicator">
                                <block>
                                    <picker-view-column>
                                        <div class="picker-date-list-item" v-for="(item,index) in date.year" :key="index">{{item.label}}</div>
                                    </picker-view-column>
                                    <picker-view-column>
                                        <div class="picker-date-list-item" v-for="(item,index) in date.month" :key="index">{{item.label}}</div>
                                    </picker-view-column>
                                    <picker-view-column>
                                        <div class="picker-date-list-item" v-for="(item,index) in date.day" :key="index">{{item.label}}</div>
                                    </picker-view-column>
                                </block>
                            </picker-view>
                        </div>
                    </div>
                </swiper-item>
            </swiper>
        </template>
    </div>
</div>
</template>

<script>
// import { timeFormat } from '@utils'
import { format, getDateAtZero } from '@script/date'
const StartYear = 2018

export default {
    props: {
        mode: {
            type: String,
            default: 'selector'
        },
        // selector selectorCombine选项
        selectorOptions: {
            type: Array,
            default: () => []
        },
        pickerDefault: {
            type: [String, Number],
            default: ''
        },
        enableDays: {
            type: Number,
            default: 0
        },
        enableTip: {
            type: String,
            default: ''
        },
        dateRange: {
            type: Array,
            default: _ => ([
                { label: '近7日', val: 7 },
                { label: '近14日', val: 14 },
                { label: '近30日', val: 30 }
            ])
        }
    },

    data() {
        return {
            showPicker: false,
            result: '',
            date: {
                year: [],
                month: [],
                day: []
            },
            datePickerActive: 's',
            datePickerArr: [0, 0, 0],
            dateStartTime: new Date(),
            dateEndTime: new Date(),
            // dateRange: [
            //     {
            //         label: '近7日',
            //         val: 7
            //     }, {
            //         label: '近30日',
            //         val: 30
            //     }
            // ],
            dateRangeCustomVal: '',
            combineCurrentPos: 0, // dateCombine selectorCombine 当前所在位置
            selectorSubOptions: [], // selectorCombine 二级选项
            selectorCombineState: {
                firstVal: 0,
                subVal: 0
            }
            // maskOut: false
        }
    },

    onShow() {
        this.cancel();
    },

    computed: {
        // 开始时间格式化 YYYY-MM-DD
        dateStart() {
            return this.formatDate(this.dateStartTime)
        },

        // 结束时间格式化 YYYY-MM-DD
        dateEnd() {
            return this.formatDate(this.dateEndTime)
        },

        // 时间范围输出
        datePickerValStr() {
            return `${this.dateStartTime.getTime()},${this.dateEndTime.getTime()}`
        },

        dateRangeCustomLabel() {
            if (this.dateRangeCustomVal.indexOf(',') > 0) {
                let dateArr = this.dateRangeCustomVal.split(',')
                return `${this.formatDate(new Date(parseInt(dateArr[0], 10)), 'yyyy-MM-dd')} 至 ${this.formatDate(new Date(parseInt(dateArr[1], 10)), 'yyyy-MM-dd')}`
            } else {
                return '自定义'
            }
        },
        enableTipCur() {
            if (this.enableTip !== '') return this.enableTip
            return `目前只支持查询${this.enableDays / 30}个月以内数据`
        }
        // enableDays2Month() {
        //     return `${this.enableDays / 30}个月`
        // }
    },

    methods: {
        show() {
            if (this.mode === 'selector') {
                console.log('selctor', this.selectorOptions)
            } else if (this.mode === 'selectorCombine') {
                if (!this.pickerDefault) {
                    this.selectorCombineState.firstVal = 0
                    this.selectorCombineState.subVal = 0
                } else {
                    let selectorArr = this.pickerDefault.split(',')
                    this.selectorCombineState.firstVal = parseInt(selectorArr[0], 10)
                    this.selectorCombineState.subVal = parseInt(selectorArr[1], 10)
                }
                if (this.selectorOptions[this.selectorCombineState.firstVal]) {
                    this.selectorSubOptions = this.selectorOptions[this.selectorCombineState.firstVal].sub
                    this.selectorCombineJump(1)
                } else {
                    this.selectorCombineJump(0)
                }
            } else if (this.mode === 'dateRange') {
                this.datePickerActive = 's'
                this.initDatePicker()
                if (!this.pickerDefault) {
                    this.setDefaultRange()
                } else {
                    let dateArr = this.pickerDefault.split(',')
                    this.dateStartTime = new Date(parseInt(dateArr[0], 10))
                    this.dateStartTime = new Date(getDateAtZero(this.dateStartTime))
                    this.dateEndTime = new Date(parseInt(dateArr[1], 10))
                }
                setTimeout(() => {
                    this.setDatePickerVal('s', true)
                }, 200)
            } else if (this.mode === 'dateCombine') {
                this.dateCombineJump(0)
                if (typeof (this.pickerDefault) === 'number') {
                    this.dateRangeCustomVal = ''
                } else {
                    this.dateRangeCustomVal = this.pickerDefault
                }
                this.datePickerActive = 's'
                this.initDatePicker()
                if (typeof (this.pickerDefault) === 'number' || (this.pickerDefault + '').indexOf(',') === -1) {
                    this.setDefaultRange()
                } else {
                    let dateArr = this.pickerDefault.split(',')
                    this.dateStartTime = new Date(parseInt(dateArr[0], 10))
                    this.dateStartTime = new Date(getDateAtZero(this.dateStartTime))
                    this.dateEndTime = new Date(parseInt(dateArr[1], 10))
                }
                setTimeout(() => {
                    this.setDatePickerVal('s', true)
                }, 200)
            }
            this.showPicker = true;
        },

        cancel() {
            // this.maskOut = true
            this.showPicker = false
            this.$emit('cancel')
            if (/date/.test(this.mode)) {
                this.resetDatePicker()
            }
            // setTimeout(() => {
            //     this.maskOut = false
            // }, 350)
        },

        diffDays(prev, next) {
            if (prev instanceof Date && next instanceof Date) {
                const diffMs = Math.abs(next - prev)
                const diffD = Math.ceil(diffMs / 86400000)
                if (prev < next) {
                    return diffD
                } else {
                    return -diffD
                }
            }
            return 0
        },

        // v-picker 最终输出
        confirm(resultType) {
            if (resultType === 'date') {
                // 选择时间范围
                if (this.dateStartTime.getTime() > this.dateEndTime.getTime()) {
                    wx.showToast({
                        title: '开始时间应早于结束时间',
                        icon: 'none',
                        duration: 2000
                    })
                    return
                } else if (this.dateEndTime.getTime() > (new Date()).getTime()) {
                    wx.showToast({
                        title: '请勿选择未来的时间段',
                        icon: 'none',
                        duration: 2000
                    })
                    return
                } else if (this.enableDays > 0 && this.diffDays(new Date(this.dateStartTime), new Date()) > this.enableDays) {
                    wx.showToast({
                        title: this.enableTipCur,
                        icon: 'none',
                        duration: 2000
                    })
                    return
                } else {
                    // dateRange 输出 时间范围
                    this.result = this.datePickerValStr
                }
            }

            // this.maskOut = true
            this.showPicker = false
            this.$emit('confirm', this.result)
            if (/date/.test(this.mode)) {
                this.resetDatePicker()
            }
            // setTimeout(() => {
            //     this.maskOut = false
            // }, 350)
        },

        // selector 选定
        selectorChange(val) {
            if (this.mode === 'selectorCombine') {
                // selectorCombine
                if (val.sub) {
                    // 一级选项
                    if (this.selectorCombineState.firstVal !== val.val) {
                        this.selectorCombineState.firstVal = val.val
                        this.selectorCombineState.subVal = 0
                    }
                    this.selectorSubOptions = val.sub
                    // selectorCombine 打开下级目录
                    this.selectorCombineJump(1)
                } else {
                    // 二级选项
                    this.selectorCombineState.subVal = val
                    this.result = this.selectorCombineState.firstVal + ',' + this.selectorCombineState.subVal
                    this.confirm()
                }
            } else if (typeof val === 'number') {
                this.result = val
                this.confirm()
            } else {
                // dateCombine 打开下级目录
                this.dateCombineJump(1)
            }
        },

        // 时间选择器 - 初始化
        initDatePicker() {
            this.datePickerArr = [0, 0, 0]
            this.datePickerActive = 's'
            this.changeFlag = false
            for (let i = StartYear; i <= new Date().getFullYear(); i++) {
                this.date.year.push({
                    val: i,
                    label: i + '年'
                });
            }

            for (let i = 1; i <= 12; i++) {
                this.date.month.push({
                    val: i,
                    label: i + '月'
                });
            }

            for (let i = 1; i <= 31; i++) {
                this.date.day.push({
                    val: i,
                    label: i + '日'
                });
            }
        },

        // 时间选择器 - 重置
        resetDatePicker() {
            this.datePickerArr = [0, 0, 0]
            this.datePickerActive = 's'
            this.changeFlag = false
            this.date = {
                year: [],
                month: [],
                day: []
            }
        },

        // 时间选择器 - 根据 dateStart dateEnd 设置年月日
        setDatePickerVal(pos, force) {
            if (this.datePickerActive !== pos || force) {
                this.datePickerActive = pos
                const date = pos === 's' ? this.dateStart : this.dateEnd
                let dateArr = date.split('-')
                let pickerVal = [0, 0, 0]
                let dateKey = ['year', 'month', 'day']
                let i = 0
                for (i = 0; i < 3; i++) {
                    pickerVal[i] = parseInt(dateArr[i], 10) - this.date[dateKey[i]][0].val
                }
                this.datePickerArr = pickerVal
            }
        },

        // 时间选择器 - changeHandler
        // 1. 根据年月调整天选项
        // 2. 输出 dateStartTime dateEndTime
        datePickerChange(res) {
            this.datePickerArr = [res.mp.detail.value[0], res.mp.detail.value[1], res.mp.detail.value[2]]
            const year = this.datePickerArr[0] + StartYear
            const month = this.datePickerArr[1] + 1;
            const day = this.datePickerArr[2] + 1;
            let dayLen = this.date.day.length;

            if (month === 2) {
                if (year % 4 === 0) {
                    // 闰年闰月29
                    if (dayLen < 29) {
                        this.date.day.push({
                            val: 29,
                            label: '29日'
                        })
                    } else {
                        this.date.day.splice(29)
                    }
                } else if (dayLen > 28) {
                    // 平年闰月28
                    this.date.day.splice(28)
                }
            } else {
                const month31Day = [1, 3, 5, 7, 8, 10, 12]
                if (month31Day.indexOf(month) >= 0) {
                    if (dayLen < 31) {
                        let supplement = [];
                        while (dayLen < 31) {
                            dayLen++;
                            supplement.push({
                                val: dayLen,
                                label: dayLen + '日'
                            })
                        }
                        this.date.day = this.date.day.concat(supplement)
                    }
                } else {
                    if (this.date.day.length > 30) {
                        this.date.day.splice(30)
                    } else {
                        let supplement = [];
                        while (dayLen < 30) {
                            dayLen++;
                            supplement.push({
                                val: dayLen,
                                label: dayLen + '日'
                            })
                        }
                        this.date.day = this.date.day.concat(supplement)
                    }
                }
            }
            let pickerDateVal = new Date()
            pickerDateVal.setFullYear(year, month - 1, day)
            if (this.datePickerActive === 's') {
                this.dateStartTime = pickerDateVal
                this.dateStartTime = new Date(getDateAtZero(this.dateStartTime))
            } else {
                this.dateEndTime = pickerDateVal
            }
        },

        // 时间选择器 默认自定义选择30天前至今
        setDefaultRange() {
            this.dateStartTime = new Date(new Date() - 1000 * 60 * 60 * 24 * 30)
            // this.dateStart = this.formatDate(this.dateStartTime)
            this.dateEndTime = new Date()
        },

        formatDate(date) {
            return format(date, 'yyyy-MM-dd')
        },

        // dateCombine 切换上/下一级
        dateCombineJump(target) {
            this.combineCurrentPos = target
        },

        // dateCombine 上/下一级切换Handler
        dateCombineChange(e) {
            this.combineCurrentPos = e.target.current
        },

        // dateCombine 切换上/下一级
        selectorCombineJump(target) {
            this.combineCurrentPos = target
        },

        // dateCombine 上/下一级切换Handler
        selectorCombineChange(e) {
            this.combineCurrentPos = e.target.current
        }
    }
}
</script>

<style lang="scss">
@import '@/styles/common.scss';

.com-v-picker {
    display: none;

    .picker-mask {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 2000;
        opacity: 1;

        &.ease-out {
            transition: opacity 0.3s ease;
            opacity: 0;
        }
    }

    .picker-box {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: center;
        background-color: #fff;
        border-top-left-radius: 20rpx;
        border-top-right-radius: 20rpx;
        z-index: 2020;
        animation: ani-picker-show 0.3s forwards;

        &.hide {
            display: none;
        }

        .picker-header {
            position: relative;
            height: 100rpx;

            &:not(.date-range):not(.date-combine) {
                @include m-r1bb(#e5e5e5);

                &::after {
                    left: 30rpx;
                    right: 30rpx;
                }
            }

            &-option {
                position: absolute;
                top: 0;
                width: 116rpx;
                height: 100rpx;
                line-height: 100rpx;
                font-size: 28rpx;

                &.picker-header-cancel {
                    left: 0;
                    color: #a0a0ac;
                }

                &.picker-header-confirm {
                    right: 0;
                    color: #526cfe;
                }
            }

            .picker-header-tip {
                position: relative;
                font-size: 22rpx;
                color: #A0A0AC;
                height: 100rpx;
                line-height: 100rpx;
                font-weight: 400;
                vertical-align: middle;

                &__icon {
                    position: absolute;
                    top: 50%;
                    left: 0;
                    transform: translate(0, -50%);
                    display: inline-block;
                    width: 22rpx;
                    height: 22rpx;
                    background: url('~static/img/icon-tip.svg') no-repeat;
                    background-size: 22rpx 22rpx;
                }

                &__con {
                    margin-left: 26rpx;
                }
            }

            &.date-range {
                margin-top: 20rpx;
            }

            &.date-combine {
                margin-top: 20rpx;

                .picker-header-option {
                    &.picker-header-cancel {
                        font-size: 32rpx;

                        @include icon-font2018('\e911', 28rpx);
                    }
                }
            }

            &.selector-combine {
                .picker-header-option {
                    &.picker-header-cancel {
                        padding-left: 30rpx;
                        width: auto;

                        @include icon-font2018('\e911', 28rpx);

                        &::before {
                            margin-right: 5rpx;
                        }
                    }
                }
            }
        }

        .picker-selector {
            position: relative;

            &::before {
                content: '';
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 30rpx;
                background: linear-gradient(to bottom, #fff, rgba(255, 255, 255, 0));
                z-index: 20;
            }

            &::after {
                content: '';
                display: block;
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 30rpx;
                background: linear-gradient(to top, #fff, rgba(255, 255, 255, 0));
                z-index: 20;
            }

            &-sv {
                &.scroll-mode {
                    height: 470rpx;
                    position: relative;

                    ::-webkit-scrollbar {
                        z-index: 40;
                    }
                }

                .picker-selector-list {
                    padding: 30rpx;
                    // width: 100%;
                    // position: absolute;
                    // top: 50%;
                    // left: 0;
                    // transform: translate(0, -50%);

                    &-option {
                        padding: 20rpx 0;
                        line-height: 42rpx;
                        font-size: 28rpx;
                        color: #6d6d73;

                        &.active {
                            color: #526cfe;
                        }
                    }
                }
            }
        }

        .picker-date-range {
            .range-header {
                margin: 0 30rpx;
                padding-bottom: 30rpx;

                &-input {
                    width: 326rpx;
                    height: 60rpx;
                    line-height: 60rpx;
                    text-align: center;
                    font-size: 28rpx;
                    color: #9f9fa6;
                    border-radius: 8rpx;

                    @include m-r1b(#e5e5e5, 8rpx);

                    &.active {
                        @include m-r1b(#526cfe);

                        color: #526cfe;
                    }
                }

                &-link {
                    height: 60rpx;
                    line-height: 60rpx;
                    text-align: center;
                    font-size: 28rpx;
                    color: #9f9fa6;
                }

                @include m-r1bb(#e5e5e5);
            }

            .picker-date {
                padding: 50rpx 0;

                .picker-date-list {
                    width: 100%;
                    height: 300rpx;

                    &-item {
                        height: 60rpx;
                        line-height: 60rpx;
                        font-size: 28rpx;
                        color: #6d6d73;
                    }

                    &-indicator {
                        height: 60rpx;
                        line-height: 60rpx;
                    }
                }
            }
        }

        .picker-date-combine {
            height: 610rpx;
        }
    }

    &.show {
        display: block;
    }

    @keyframes ani-picker-show {
        0% {
            transform: translateY(100rpx);
        }
        100% {
            transform: translateY(0);
        }
    }
}
</style>
