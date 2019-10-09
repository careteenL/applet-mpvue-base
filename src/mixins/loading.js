export default {
    data() {
        return {
            dataFetched: false
        }
    },
    watch: {
        dataFetched(next, prev) {
            if (next) {
                wx.hideLoading()
            }
        }
    },
    onUnload() {
        this.dataFetched = false
    }
}
