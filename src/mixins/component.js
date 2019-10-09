export default {
    data() {
        return {
            hasNext: true,
            totalPage: 0,
            pageSize: 3,
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
    methods: {
        // async getList() { // 组件实现请求分页列表数据并返回
        //     const resData = await API.getAccountList({pageNo: this.pageNo})
        //     return resData
        // },
        scrolltolower() {
            if (this.pageNo < this.totalPage) {
                this.pageNo++;
                this.updateList(true)
            }
        },
        async updateList(add) {
            if (!add) {
                this.pageNo = 1
            }
            const resData = await this.getList()
            wx.stopPullDownRefresh()
            if (!add) {
                this.dataList = []
            }
            this.hasNext = resData.hasNext
            this.totalPage = resData.totalPage
            this.totalCount = resData.totalCount
            resData.list = resData.list.filter(item => item !== null)
            this.dataList = this.dataList.concat(resData.list)
        }
    }
}
