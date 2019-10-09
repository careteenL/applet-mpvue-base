/**
 * @desc 格式化时间
 * @param {Date} date
 * @param {String} pattern
 * @return {String}
 */
export const format = (date, pattern) => {
    const SIGN_REGEXP = /([yMdhsm])(\1*)/g
    const DEFAULT_PATTERN = 'yyyy-MM-dd'
    const padding = (s, len) => {
        len = len - (s + '').length
        for (var i = 0; i < len; i++) {
            s = '0' + s
        }
        return s
    };
    pattern = pattern || DEFAULT_PATTERN
    return pattern.replace(SIGN_REGEXP, function($0) {
        switch ($0.charAt(0)) {
            case 'y': return padding(date.getFullYear(), $0.length)
            case 'M': return padding(date.getMonth() + 1, $0.length)
            case 'd': return padding(date.getDate(), $0.length)
            case 'w': return date.getDay() + 1
            case 'h': return padding(date.getHours(), $0.length)
            case 'm': return padding(date.getMinutes(), $0.length)
            case 's': return padding(date.getSeconds(), $0.length)
        }
    })
}

/**
 * @desc 时间范围时间戳 => 开始结束时间距离今天的天数
 */
export const calcRange = (timestampRange) => {
    let dateRange = timestampRange.split(',')
    let today = time2Datetime(new Date())
    let start = time2Datetime(new Date(parseInt(dateRange[0], 10)))
    let end = time2Datetime(new Date(parseInt(dateRange[1], 10)))
    return {
        start: Math.floor((today - start) / (1000 * 60 * 60 * 24)),
        end: Math.floor((today - end) / (1000 * 60 * 60 * 24))
    }
}

/**
 * @desc 获取两个日期相差天数
 * @param {String|Date} firstDate
 * @param {String|Date} secondDate
 * @param {Number} ret 单位：天
 */
export const diffWithDay = (firstDate, secondDate) => {
    if (typeof firstDate === 'string') {
        firstDate = new Date(firstDate.split(' ')[0])
    }
    if (typeof secondDate === 'string') {
        secondDate = new Date(secondDate.split(' ')[0])
    }
    firstDate = firstDate.getTime()
    secondDate = secondDate.getTime()
    if (isNaN(firstDate) || isNaN(secondDate)) {
        throw Error('Invalid Date')
    }
    return Math.abs(firstDate - secondDate) / 1000 / 60 / 60 / 24
}

function time2Datetime(time) {
    let year = time.getFullYear()
    let month = time.getMonth()
    let day = time.getDate()
    return new Date(year, month, day)
}

/**
 * @desc 获取某一天零点时间
 * @param {String|Date} date
 * @param {Number} 时间戳
 */
export const getDateAtZero = (date) => {
    date = new Date(date)
    let times = date.getTime()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    let dayTime = times - hour * 3600 * 1000 - minute * 60 * 1000 - second * 1000
    return dayTime
}

export default {
    format
}
