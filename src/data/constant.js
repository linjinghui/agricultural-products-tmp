import Vue from 'vue';
import VueResource from 'vue-resource';
// import {lsgGetData, lsgDeleteData, ssgGetData, ssgSaveData, ssgDeleteData} from '../../node_modules/web-js-tool/libs/js/util.js';

let _this = Vue.use(VueResource);
const TIMEOUT = 15000;
const ERRORSERVICE = '服务异常，请稍后再试！';

_this.http.interceptors.push(function (request, next) {
//   let token = lsgGetData(LSTUSERKEY) ? lsgGetData(LSTUSERKEY).token : '';
  // 设置超时
  let timeout = setTimeout(function () {
    request.abort();
    console.log('请求超时！');
    // window.EVENTBUS.$emit('alertTimeout', {'display': true});
  }, TIMEOUT);

  // 显示加载动画
  window.EVENTBUS.$emit('Loading', {'show': true});
  // 设置请求头
  // request.headers.set('Authorization', token);
  // 拦截处理全局ajax回调
  next(function (response) {
    // 隐藏加载动画
    window.EVENTBUS.$emit('Loading', {'show': false});
    if ((response.status === 400 && token.length === 0) || response.status === 401) {
      // 未登录或者身份已失效
      // window.EVENTBUS.$emit('alertTokenError', {
      //   'display': true
      // });
    }
    let body = response.body;
    if (typeof body === 'string' && body.indexOf('html') >= 0) {
      window.EVENTBUS.$emit('changeTip', {'display': true, 'theme': 'error', 'content': ERRORSERVICE});
    }
    clearTimeout(timeout);
    return response;
  });
});

export {_this};