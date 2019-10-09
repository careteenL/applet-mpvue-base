import request from './request';
import { baseUrl, loginUrl } from './env';

const R = {};
['get', 'post', 'delete'].forEach(method => {
    R[method] = function({url, originRes, loading = false}) {
        return function(params, header) {
            return request[method]({url: `${url}`, params, header, originRes, loading});
        };
    };
});
export default {
    // 图片验证码url
    getImgCodeUrl: R.get({url: `${loginUrl}/imgcode/getCaptchaBase64`, originRes: true, loading: false}),

    // 获取验证码
    getMobileCaptcha: R.get({url: `${loginUrl}/captcha/secure/getMobileCaptcha`, originRes: true}),
    // 根据验证码登录
    loginByCaptcha: R.get({
        url: `${loginUrl}/login/secure/loginByCaptcha`,
        originRes: true
    }),
    // 联系用户（生成虚拟号）
    visualPhone: R.post({
        url: `${baseUrl}/mini/program/broker/bind`,
        originRes: true
    }),

    // 检测经纪人手机号是否在房销宝内注册
    checkTelephone: R.post({url: `${baseUrl}/mini/program/broker/check`, originRes: true}),

    // 获取经纪人信息
    getBrokerInfo: R.get({url: `${baseUrl}/mini/program/broker/info`}),

    // 获取头像图片
    getBrokerImage: R.get({url: `${baseUrl}/image/getImage`, originRes: true}),

    // 获取线索
    getClue: R.get({url: `${baseUrl}/mini/program/broker/clue`, originRes: true, loading: true})
};
