/*
README.md
配合 v-input 组件的inputError参数 做input的输入校验
inputError为true则触发v-input组件错误提示
按如下格式构造fields数组作为form校验的规则， 数组顺序即为校验字段的顺序
rules数组里单个校验key可以分别为 required（是否必须）, not (不能为某值) , type (类型 目前支持 mobile idcard email url) , reg (自定义正则), func(自定义校验函数)
msg为单项校验不合格时的toast提示文案
<script>
import validate from '@/mixins/validate';
export default {
    data() {
        return {
            form: {
                applyProjectId: -1,
                applyId: '',
                applierName: '',
                applierIdCard: '',
                agreeStatement: false
            },
            inputError: {
                applyProjectId: false,
                applyId: false,
                applierName: false,
                applierIdCard: false
            }
        }
    },
    mixins: [validate],
    onShow() {
        console.log(this.getQuery());
    },
    methods: {
        onTapSearch() {
            const fields = [
                {
                    key: 'applyProjectId',
                    val: this.form.applyProjectId,
                    rules: [
                        {
                            not: -1,
                            msg: '请选择申购项目'
                        }
                    ]
                },
                {
                    val: this.form.applyId,
                    key: 'applyId',
                    rules: [
                        {
                            required: true,
                            msg: '申购编码不能为空'
                        },
                        {
                            reg: /^\d{13}$/,
                            msg: '请填写正确的申请编码'
                        }
                    ]
                },
                {
                    val: this.form.applierName,
                    key: 'applierName',
                    rules: [
                        {
                            required: true,
                            msg: '申请人姓名不能为空'
                        }
                    ]
                },
                {
                    val: this.form.applierIdCard,
                    key: 'applierIdCard',
                    rules: [
                        {
                            required: true,
                            msg: '证件号码不能为空'
                        },
                        {
                            type: 'idcard',
                            msg: '请填写正确的证件号码'
                        }
                    ]
                },
                {
                    val: this.form.agreeStatement,
                    rules: [
                        {
                            not: false,
                            msg: '未同意服务协议'
                        }
                    ]
                }
            ];
            this.validate(fields).then(suc => {
                this.getQualVerifyRes();
            })
                .catch(err => {
                    console.log(err);
                })
        }
    }
}
</script>
*/
const validateIdentityCard = (id) => {
    const city = {
        11: '北京',
        12: '天津',
        13: '河北',
        14: '山西',
        15: '内蒙古',
        21: '辽宁',
        22: '吉林',
        23: '黑龙江 ',
        31: '上海',
        32: '江苏',
        33: '浙江',
        34: '安徽',
        35: '福建',
        36: '江西',
        37: '山东',
        41: '河南',
        42: '湖北 ',
        43: '湖南',
        44: '广东',
        45: '广西',
        46: '海南',
        50: '重庆',
        51: '四川',
        52: '贵州',
        53: '云南',
        54: '西藏 ',
        61: '陕西',
        62: '甘肃',
        63: '青海',
        64: '宁夏',
        65: '新疆',
        71: '台湾',
        81: '香港',
        82: '澳门',
        91: '国外 '
    };
    let tip = '';
    let pass = true;
    // 验证身份证格式（6个地区编码，8位出生日期，3位顺序号，1位校验位）
    if (
        !id ||
        !/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(
            id
        )
    ) {
        tip = '身份证号格式错误';
        pass = false;
    } else if (!city[id.substr(0, 2)]) {
        tip = '地址编码错误';
        pass = false;
    } else {
        // 18位身份证需要验证最后一位校验位
        if (id.length == 18) {
            id = id.split('');
            // ∑(ai×Wi)(mod 11)
            // 加权因子
            const factor = [
                7,
                9,
                10,
                5,
                8,
                4,
                2,
                1,
                6,
                3,
                7,
                9,
                10,
                5,
                8,
                4,
                2
            ];
            // 校验位
            const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            let sum = 0;
            let ai = 0;
            let wi = 0;
            for (var i = 0; i < 17; i++) {
                ai = id[i];
                wi = factor[i];
                sum += ai * wi;
            }
            if (parity[sum % 11] != id[17]) {
                tip = '校验位错误';
                pass = false;
            }
        }
    }
    console.log(tip);
    return pass;
}
const TYPES = {
    mobile: {
        reg: /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/
    },
    idcard: {
        func: validateIdentityCard
    },
    url: {
        reg: /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i // eslint-disable-line
    },
    email: {
        reg: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
    }
};
export default {
    data() {
        return {
            inputError: {}
        };
    },
    methods: {
        validate(fields) {
            return new Promise((resolve, reject) => {
                if (!fields || fields.length == 0) {
                    resolve('no field to validate');
                }
                fields.forEach(item => {
                    if (item.key) {
                        this.$set(this.inputError, item.key, false);
                    }
                    item.rules &&
                        item.rules.forEach(rule => {
                            if (
                                rule.required &&
                                (item.val == '' || !item.val)
                            ) { // 是否不能为空
                                if (item.key) {
                                    this.inputError[item.key] = true;
                                }
                                wx.showToast({ title: rule.msg, icon: 'none' });
                                reject(rule.msg);
                                throw rule.msg;
                            } else if (
                                rule.type &&
                                TYPES[rule.type] &&
                                TYPES[rule.type].reg &&
                                !TYPES[rule.type].reg.test(item.val)
                            ) { // 预定义正则是否通过
                                if (item.key) {
                                    this.inputError[item.key] = true;
                                }
                                wx.showToast({ title: rule.msg, icon: 'none' });
                                reject(rule.msg);
                                throw rule.msg;
                            } else if (
                                rule.type &&
                                TYPES[rule.type] &&
                                TYPES[rule.type].func &&
                                !TYPES[rule.type].func(item.val)
                            ) { // 预定义方法是否通过
                                if (item.key) {
                                    this.inputError[item.key] = true;
                                }
                                wx.showToast({ title: rule.msg, icon: 'none' });
                                reject(rule.msg);
                                throw rule.msg;
                            } else if (rule.reg && !rule.reg.test(item.val)) { // 自定义正则是否通过
                                if (item.key) {
                                    this.inputError[item.key] = true;
                                }
                                wx.showToast({ title: rule.msg, icon: 'none' });
                                reject(rule.msg);
                                throw rule.msg;
                            } else if (
                                (rule.not || rule.not == 0) &&
                                rule.not == item.val
                            ) { // 是否不能为某值
                                if (item.key) {
                                    this.inputError[item.key] = true;
                                }
                                wx.showToast({ title: rule.msg, icon: 'none' });
                                reject(rule.msg);
                                throw rule.msg;
                            } else if (rule.func && !rule.func(item.val)) { // 自定义校验方法是否通过
                                if (item.key) {
                                    this.inputError[item.key] = true;
                                }
                                wx.showToast({ title: rule.msg, icon: 'none' });
                                reject(rule.msg);
                                throw rule.msg;
                            }
                        });
                    if (item.key) {
                        this.inputError[item.key] = false;
                    }
                });
                resolve(true);
            });
        },
        resetInputError() {
            if (this.inputError && this.inputError !== {}) {
                Object.keys(this.inputError).forEach(item => {
                    this.inputError[item] = false;
                });
            }
        }
    }
};
