function az(str) {
    str = str.toString()
    return str.length >= 2 ? str : `0${str}`
}
export default function dateToStr(sub, date, time) {
    date = date instanceof Date ? date : new Date()
    if (typeof sub == 'number') {
        date = new Date(date.getTime() + sub * 86400000)
        date.setHours(0, 0, 0, 0)
    }
    if (time) {
        return `${date.getFullYear()}-${az(date.getMonth() + 1)}-${az(date.getDate())} ${time}`
    }
    return `${date.getFullYear()}-${az(date.getMonth() + 1)}-${az(date.getDate())} ${az(date.getHours())}:${az(date.getMinutes())}:${az(date.getSeconds())}`
}
