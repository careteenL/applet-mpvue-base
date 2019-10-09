let Mock = require('mockjs');
let data = function() {
    return Mock.mock({
        code: 200,
        message: 'success',
        data: {}
    });
};
module.exports = data;
