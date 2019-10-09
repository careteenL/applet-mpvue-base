import Vue from 'vue';
// import VueDialog from './index.vue';

// function createInstance(selector) {
//     // selectComponent mpvue不支持啊
//     const query = wx.createSelectorQuery();
//
//     return query.select(selector);
// }

let dialog;

const dftOptions = {
    value: true, // 直接显示，不必调用show()
    visible: true,
    callback(action) {
        dialog[action === 'confirm' ? 'resolve' : 'reject'](action);
    }
};

function Dialog(options) {
    if (!this) {
        return;
    }
    // const dialog = createInstance(options.selector);

    dialog = this.$root.$refs['global-v-dialog'];
    if (!dialog) {
        console.warn(
            `在当前页面未找到 v-dialog 节点，请确认已声明ref=global-v-dialog`
        );
        return;
    }

    return new Promise((resolve, reject) => {
        if (!options.scope) {
            options.scope = { ...options };
        }
        Object.assign(dialog, {
            resolve,
            reject,
            ...dftOptions,
            ...options
        });
    });
}
// 不生效。。。
// Dialog.install = () => {
//     Vue.component(VueDialog.name, VueDialog);
// };
Vue.prototype.$dialog = Dialog;

export default Dialog;
