/**
 * @desc 将11位手机号中间四位转为*
 * @param {String} tel 11位手机号
 * @return {String}
 * ```js
 * encryptTel('15074806497') // => '150****6497'
 * ```
 */
export const encryptTel = (tel = '') => {
    return String(tel).replace(/^(\d{3})\d*(\d{4})$/, '$1****$2')
}

/**
 * @desc 在`list`中通过`id`找到对应`name`
 * @param {Number|String} type [default: `id`] 唯一标示
 * @param {Number|String} val
 * @param {Number|String} ret [default: `name`] 为 `__all`时返回整项
 * @param {Array} list
 * @return {Any} ret
 */
export const findNameById = ({type = 'id', val, ret = 'name', list}) => {
    let foundItem = list.find(item => item[type] === val)
    if (ret === '__all') return foundItem
    return foundItem ? foundItem[ret] : ''
}

export const rpx2px = (distance) => {
    let result = 0
    if (!isNaN(distance)) {
        result = wx.getSystemInfoSync().windowWidth * distance / 750
    }
    return result;
}

export const isIos = () => {
    const systemInfo = wx.getSystemInfoSync()
    if (systemInfo.system.indexOf('iOS') !== -1) {
        return true
    }
    return false
}

export default {
    encryptTel,
    findNameById
}
