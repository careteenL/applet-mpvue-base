export default {
    data() {
        return {
            totalPage: 0,
            pageSize: 10,
            pageNo: 1,
            dataList: [],
            totalCount: 0
        }
    },
    onReady() {
        this.projectId = this.getParam('projectId')
        this.updateList()
    },
    onShow() {
        const projectId = this.getParam('projectId')
        if (projectId != this.projectId) {
            this.projectId = projectId
            this.updateList()
        }
    },
    onReachBottom() {
        if (this.pageNo < this.totalPage) {
            this.pageNo++;
            console.log(this.pageNo)
            this.updateList(true)
        }
    },
    onPullDownRefresh() {
        this.projectId = this.getParam('projectId')
        this.updateList()
    },
    methods: {
        // async getList() { // 组件实现请求分页列表数据并返回
        //     const resData = await API.getAccountList({pageNo: this.pageNo})
        //     return resData
        // },
        async updateList(add) {
            if (!add) {
                this.pageNo = 1
            }
            const resData = await this.getList()
            wx.stopPullDownRefresh()
            if (!add) {
                this.dataList = []
            }
            this.totalPage = resData.totalPage
            this.totalCount = resData.totalCount
            // resData.list = resData.list.filter(item => item !== null)
            this.dataList = this.dataList.concat(resData.list)
        }
    }
}
