export default function objToStr(obj) {
    var res = [];
    for (var o in obj) {
        if (obj.hasOwnProperty(o)) {
            res.push(o + '=' + obj[o]);
        }
    }
    return res.join('&');
}
