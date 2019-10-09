/**
 * @desc 维护开发和测试环境
 * @important 提审前务必保证`env`值为`work`
 *            提审信息为：`xxx功能；审核人员请输入手机号xxx，短信验证码yyy进行登录。`
 * @update 新增域名请务必`在微信后台添加合法域名`
 */
export let env = 'work'; // 'dev' / 'test' / 'work'
export let baseUrl = 'https://fangxiaobao.focus.cn';
export let loginUrl = 'https://login.focus.cn';

switch (env) {
    case 'mock':
        baseUrl = 'http://127.0.0.1:9999';
        loginUrl = 'http://login.focus.cn';
        break;
    case 'dev':
        baseUrl = 'http://fangxiaobao.focus.cn';
        loginUrl = 'http://login.focus.cn';
        break;
    case 'test':
        baseUrl = 'http://fangxiaobao.focus.cn';
        loginUrl = 'http://login.focus.cn';
        break;
}
