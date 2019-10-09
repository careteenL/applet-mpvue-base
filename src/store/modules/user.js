/**
 * @desc 存放用户信息
 */
export default {
    namespaced: true,
    state: {
        userInfo: {}
    },
    mutations: {
        updateUserInfo(state, payload) {
            state.userInfo = payload
        }
    }
}
