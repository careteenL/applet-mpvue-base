import Vue from 'vue';
import App from './App';
import store from './store/index.js';
import ObjToStr from '@/scripts/objToStr';
import Storage from '@script/storage';
import paramStore from '@mix/param-store';
// import loading from '@mix/loading';
import VDialog from '@com/v-dialog/index.js'; // main.js全局注册

import './styles/reset.scss';
import './styles/var.scss';
import './styles/common.scss';

Vue.config.productionTip = false;
App.mpType = 'app';

Vue.prototype.$store = store;
Vue.prototype.$storage = Storage;

Vue.prototype.showToast = msg => {
    wx.showToast({
        title: msg,
        icon: 'none',
        duration: 2000
    });
};

Vue.prototype.wxPromise = (api, params = {}) => {
    return new Promise((resolve, reject) => {
        params.success = res => {
            resolve(res);
        };
        params.fail = error => {
            reject(error);
        };
        wx[api](params);
    });
};

Vue.prototype.wxNav = (page, params) => {
    wx.navigateTo({
        url: `/pages/${page}/main?` + ObjToStr(params)
    });
};

Vue.mixin(paramStore);
// Vue.mixin(loading);
Vue.use(VDialog);

const app = new Vue(App);
app.$mount();
