import Vue from 'vue';
import VueResource from 'vue-resource';
// import {lsgGetData, lsgDeleteData, ssgGetData, ssgSaveData, ssgDeleteData} from '../../node_modules/web-js-tool/libs/js/util.js';

let _this = new Vue();
let $http = Vue.use(VueResource).http;
const TIMEOUT = 15000;
const ERRORSERVICE = '服务异常，请稍后再试！';

$http.interceptors.push(function (request, next) {
//   let token = lsgGetData(LSTUSERKEY) ? lsgGetData(LSTUSERKEY).token : '';
  // 设置超时
  let timeout = setTimeout(function () {
    request.abort();
    // 请求超时，请稍后再试！
    _this.$tip({ show: true, text: '请求超时，请稍后再试！', theme: 'danger' });
  }, TIMEOUT);

  // 显示加载动画
  _this.$loading({show: true});
  // 设置请求头
  // request.headers.set('Authorization', token);
  // 拦截处理全局ajax回调
  next(function (response) {
    // 隐藏加载动画
    _this.$loading({show: false});
    if (response.status === 404) {
      _this.$tip({ show: true, text: '请求地址不存在：【' + response.url + '】', theme: 'danger' });
    } else if ((response.status === 400 && token.length === 0) || response.status === 401) {
      // 身份认证已失效，请重新登录
      // _this.$tip({ show: true, text: '身份认证已失效，请重新登录！', theme: 'danger' });
    }
    let body = response.body;
    if (typeof body === 'string' && body.indexOf('html') >= 0) {
      window.EVENTBUS.$emit('changeTip', {'display': true, 'theme': 'error', 'content': ERRORSERVICE});
    }
    clearTimeout(timeout);
    return response;
  });
});

export {$http};