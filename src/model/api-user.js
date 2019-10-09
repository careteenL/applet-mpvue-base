import request from './request';
import { userUrl } from './env';

const R = {};
['get', 'post', 'delete'].forEach(method => {
    R[method] = function({url, header, originRes, loading = false}) {
        return function(params) {
            return request[method]({url: `${userUrl}/${url}`, params, header, originRes, loading});
        };
    };
});
export default {
    getSmsCode: R.get({url: '/captcha/secure/getMobileCaptcha', originRes: true}),
    login: R.post({
        url: '/login/secure/loginByCaptcha',
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        originRes: true,
        loading: true
    })
};
