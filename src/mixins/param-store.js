export default {
    data() {
        return {
            projectId: 0
        }
    },
    onShow() {
        // this.projectId = this.getParam('projectId')
    },
    onReady() {
        // this.projectId = this.getParam('projectId')
    },
    methods: {
        getParam(key) {
            const params = this.getParamFromHis()
            if (params && (params[key] || params[key] == 0)) {
                return params[key]
            }
            const paramStore = wx.getStorageSync('PARAM_STORE')
            return paramStore && paramStore[key]
        },
        setParam(key, val) {
            const paramStore = wx.getStorageSync('PARAM_STORE') || {}
            paramStore[key] = val
            wx.setStorageSync('PARAM_STORE', paramStore)
        },
        getParamFromHis() {
            const routerHistory = getCurrentPages();
            return routerHistory && routerHistory[routerHistory.length - 1] && routerHistory[routerHistory.length - 1].options;
        }
    }
}
