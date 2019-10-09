let modalTimeFlag = 0;

export default {
    get({url, params, header = {}, originRes = false, loading}) {
        return this._req({method: 'GET', url, params, header, originRes, loading});
    },

    post({url, params, header = {}, originRes = false, loading}) {
        return this._req({method: 'POST', url, params, header, originRes, loading});
    },

    delete({url, params, header = {}, originRes = false, loading}) {
        return this._req({method: 'DELETE', url, params, header, originRes, loading});
    },

    _req({method, url, params = {}, header, originRes, loading}) {
        if (loading) {
            wx.showLoading({
                icon: 'none'
            })
        }
        // const token = wx.getStorageSync('token');
        const connect = url.indexOf('?') > -1 ? '&' : '?'
        url = `${url}${connect}`
        // url = `${url}${connect}token=${token}`
        return new Promise((resolve, reject) => {
            wx.getNetworkType({
                success(netRes) {
                    if (
                        netRes.networkType != 'none' &&
                        netRes.networkType != '2g' &&
                        netRes.networkType != 'unknown'
                    ) {
                        wx.request({
                            url: url,
                            data: params,
                            method: method,
                            header: header, // 设置请求的 header
                            // originRes = true时，返回原始的请求数据，包括data/header/statusCode
                            success: res => {
                                let data = res.data;
                                if (loading) {
                                    wx.hideLoading()
                                }
                                if (originRes) {
                                    resolve(res);
                                } else if (+data.code === 0) {
                                    resolve(data.data);
                                } else if (data.code === 1002) {
                                    wx.showToast({
                                        title: data.msg,
                                        icon: 'none',
                                        mask: true,
                                        success() {
                                            setTimeout(() => {
                                                wx.redirectTo({url: '/pages/login/main'})
                                            }, 1500)
                                        }
                                    })
                                } else {
                                    reject(data);
                                }
                            },
                            fail: res => {
                                console.error(url, 'res: ', res);
                                wx.showToast({
                                    title: '网络错误',
                                    icon: 'none'
                                });
                                reject(res);
                            }
                        });
                    } else {
                        wx.hideLoading();
                        const nowTime = new Date().getTime();
                        const timeDiffer = nowTime - modalTimeFlag;
                        modalTimeFlag = nowTime;
                        if (timeDiffer >= 300) {
                            wx.showModal({
                                content:
                                    '网络状态异常，请确认设备网络状态正常后重试',
                                showCancel: true,
                                cancelText: '取消',
                                cancelColor: '#303033',
                                confirmText: '重新加载',
                                confirmColor: '#f22',
                                success(re) {
                                    if (re.confirm) {
                                        const curPage = getCurrentPages()[
                                            getCurrentPages().length - 1
                                        ];
                                        curPage.onLoad();
                                        curPage.onShow();
                                        curPage.onReady();
                                    } else if (re.cancel) {
                                        console.log('cancel reload');
                                        wx.navigateBack({
                                            delta: 1
                                        });
                                    }
                                }
                            });
                        }
                    }
                }
            });
        });
    }
};
