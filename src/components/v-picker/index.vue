<template>
<div class="v-picker">
    <div :class="{'pickerMask':showPicker}" @click="maskClick" catchtouchmove="true"></div>
    <div class="v-picker-content " :class="{'v-picker-view-show':showPicker, 'v-picker-content--top': type=='top'}">
      <div v-if="type=='bottom'" class="v-picker__hd" catchtouchmove="true">
        <div class="v-picker__action">{{comfirmTxt}}</div>
        <div class="v-picker__action" @click="pickerConfirm">确定</div>
      </div>
      <picker-view v-if="mode==='single' && singleArr.length > 0" indicator-class="v-picker__indicator" class="v-picker-view" :value="[pickerValue]" @change="pickerChange" @click="pickerClick">
        <block>
          <picker-view-column>
            <div class="picker-item" v-for="(item,index) in singleArr" :key="index">{{item.label}}</div>
          </picker-view-column>
        </block>
      </picker-view>
      <!-- 日期选择器 -->
      <picker-view v-if="mode==='date'" indicator-class="v-picker__indicator" class="v-picker-view" :value="pickerValue" @change="pickerChange"  @click="pickerClick">
        <block>
            <picker-view-column>
                <div class="picker-item" v-for="(item,index) in dateYearArr" :key="index">{{item.label}}</div>
            </picker-view-column>
            <picker-view-column>
                <div class="picker-item" v-for="(item,index) in dateMonthArr" :key="index">{{item.label}}</div>
            </picker-view-column>
            <picker-view-column>
                <div class="picker-item" v-for="(item,index) in dateDayArr" :key="index">{{item.label}}</div>
            </picker-view-column>
        </block>
      </picker-view>
    </div>
  </div>
</template>

<script>
const StartYear = 2018
export default {
    data() {
        return {
            pickerValue: '',
            valueArrayChange: true,
            singleArr: [],
            dateYearArr: [],
            dateMonthArr: [],
            dateDayArr: [],
            showPicker: false
        };
    },
    props: {
        type: {
            type: String,
            default: 'bottom' // bottom || top
        },
        mode: {
            type: String,
            default: 'single' // single || date
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
        /* 确定文本 */
        comfirmTxt: {
            type: String,
            default: '确定'
        }
    },
    watch: {
        valueArray(oldVal, newVal) {
            this.valueArrayChange = true;
        }
    },
    methods: {
        initPicker(valueArray) {
            if (this.mode === 'single') {
                this.singleArr = valueArray;
                this.singleArr.find((d, index) => {
                    if (d.value === this.valueDefault) {
                        this.pickerValue = index;
                    }
                });
            } else if (this.mode === 'date') {
                const tmp = [];
                this.dateYearArr = []
                this.dateMonthArr = []
                this.dateDayArr = []

                for (let i = StartYear; i <= new Date().getFullYear(); i++) {
                    this.dateYearArr.push({
                        value: i,
                        label: i + '年'
                    });
                    if (i === this.valueDefault[0]) {
                        tmp[0] = i - StartYear;
                    }
                }

                for (let i = 1; i <= 12; i++) {
                    this.dateMonthArr.push({
                        value: i,
                        label: i + '月'
                    });
                    if (i === this.valueDefault[1]) {
                        tmp[1] = i - 1;
                    }
                }
                let dayNum = 31
                if (this.valueDefault.length > 0) {
                    const month31Day = [1, 3, 5, 7, 8, 10, 12]
                    if (this.valueDefault[1] === 2) {
                        if (this.valueDefault[0] % 4 === 0) {
                            dayNum = 29
                        } else {
                            dayNum = 28
                        }
                    } else {
                        if (month31Day.indexOf(this.valueDefault[1]) >= 0) {
                            dayNum = 31
                        } else {
                            dayNum = 30
                        }
                    }
                }
                for (let i = 1; i <= dayNum; i++) {
                    this.dateDayArr.push({
                        value: i,
                        label: i + '日'
                    });
                    if (i === this.valueDefault[2]) {
                        tmp[2] = i - 1;
                    }
                }
                setTimeout(_ => {
                    this.pickerValue = tmp;
                    this._ensureValue();
                }, 200)
            }
        },
        show() {
            setTimeout(() => {
                if (this.valueArrayChange || this.mode === 'date') {
                    this.initPicker(this.valueArray);
                    this.showPicker = true;
                    this.valueArrayChange = false;
                } else {
                    this.showPicker = true;
                }
            }, 0);
        },
        hide() {
            this.showPicker = false;
        },
        maskClick() {
            this.pickerCancel();
        },
        pickerCancel() {
            this.showPicker = false;
            this._emit('onCancel');
        },
        pickerConfirm() {
            this.showPicker = false;
            this._emit('onConfirm');
        },
        showPickerView() {
            this.showPicker = true;
        },
        pickerChange(e) {
            if (this.mode === 'single') {
                this.pickerValue = e.mp.detail.value[0]
            } else if (this.mode === 'date') {
                this.pickerValue = e.mp.detail.value
                const year = this.pickerValue[0] + StartYear
                const month = this.pickerValue[1] + 1
                // const day = this.pickerValue[2] + 1
                let dayLen = this.dateDayArr.length
                if (month === 2) {
                    if (year % 4 === 0) {
                        if (dayLen < 29) { // 闰年闰月29
                            this.dateDayArr.push({
                                value: 29,
                                label: '29日'
                            })
                        } else {
                            this.dateDayArr.splice(29)
                        }
                    } else if (dayLen > 28) { // 平年闰月28
                        this.dateDayArr.splice(28)
                    }
                } else {
                    const month31Day = [1, 3, 5, 7, 8, 10, 12]
                    if (month31Day.indexOf(month) >= 0) {
                        if (dayLen < 31) {
                            let supplement = []
                            while (dayLen < 31) {
                                dayLen++
                                supplement.push({
                                    value: dayLen,
                                    label: dayLen + '日'
                                })
                            }
                            // this.$set(this, 'dateDayArr', this.dateDayArr.concat(supplement))
                            this.dateDayArr = this.dateDayArr.concat(supplement)
                        }
                    } else {
                        if (this.dateDayArr.length > 30) {
                            this.dateDayArr.splice(30)
                        } else {
                            let supplement = []
                            while (dayLen < 30) {
                                dayLen++
                                supplement.push({
                                    value: dayLen,
                                    label: dayLen + '日'
                                })
                            }
                            // this.$set(this, 'dateDayArr', this.dateDayArr.concat(supplement))
                            this.dateDayArr = this.dateDayArr.concat(supplement)
                        }
                    }
                }
            }
            this._emit('onChange');
        },
        pickerClick() {
            if (this.type === 'top') {
                this.pickerConfirm();
            }
        },
        _getLabelAndValue() {
            if (this.mode === 'single') {
                if (this.singleArr.length === 0) { // 容错
                    return {
                        label: '',
                        value: ''
                    }
                }
                return {
                    label: this.singleArr[this.pickerValue].label,
                    value: this.singleArr[this.pickerValue].value
                };
            } else if (this.mode === 'date') {
                return {
                    label: `${this.dateYearArr[this.pickerValue[0]].label}-${
                        this.dateMonthArr[this.pickerValue[1]].label
                    }-${this.dateDayArr[this.pickerValue[2]] ? this.dateDayArr[this.pickerValue[2]].label : ''}`,
                    value: [
                        this.dateYearArr[this.pickerValue[0]].value,
                        this.dateMonthArr[this.pickerValue[1]].value,
                        this.dateDayArr[this.pickerValue[2]] ? this.dateDayArr[this.pickerValue[2]].value : ''
                    ]
                };
            }
        },
        _ensureValue() {
            if (this.mode === 'single') {
                if (!this.pickerValue) {
                    this.pickerValue = 0;
                }
            } else if (this.mode === 'date') {
                if (
                    !(Object.prototype.toString.call(this.pickerValue) === '[object Array]') ||
                    !this.pickerValue.length
                ) {
                    const date = new Date();
                    // 默认今天
                    this.pickerValue = [
                        date.getFullYear() - StartYear,
                        date.getMonth(),
                        date.getDate() - 1
                    ];
                }
                console.log(this.pickerValue)
            }
        },
        _emit(evt) {
            this._ensureValue();
            this.$emit(evt, {
                index: this.pickerValue,
                value: this._getLabelAndValue().value,
                label: this._getLabelAndValue().label
            });
        }
    }
};
</script>
<style lang="scss">
@import '@/styles/common.scss';

$height: 152px;

.pickerMask {
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(34, 34, 51, 0.2);
}
.v-picker-content {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    transition: all 0.3s ease;
    transform: translateY(100%);
    z-index: 3000;

    &--top {
        bottom: auto;
        top: #{-$height};
        transform: translateY(0);

        &.v-picker-view-show {
            transform: translateY(100%);
        }

        .picker-item {
            border: none;
        }
    }
}

.v-picker-view-show {
    transform: translateY(0);
}

.v-picker__hd {
    display: flex;
    padding: 15px;
    background-color: #fff;
    position: relative;
    text-align: center;
    font-size: 14px;
    color: rgba(153, 153, 153, 1);
    border-radius: 10px 10px 0px 0px;

    @include m-r1bb(#e5e5e5);
}

.v-picker__action {
    display: block;
    flex: 1;
    color: rgba(102, 102, 102, 1);
}
.v-picker__action:first-child {
    text-align: left;
    color: #888;
}
.v-picker__action:last-child {
    text-align: right;
}
.picker-item {
    text-align: center;
    line-height: 50px;
    font-size: 14px;
}
.v-picker-view {
    position: relative;
    bottom: 0;
    left: 0;
    width: 100%;
    height: $height;
    background-color: rgba(255, 255, 255, 1);
}
.v-picker__indicator {
    height: 50px;
    color: rgba(102, 102, 102, 1);
}
</style>
