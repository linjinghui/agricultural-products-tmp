import {$http} from './constant.js';

const URL = '/api';

// ===================================================[DEMO]===================================================
/**
 * demo-get
 * @param {string} pms.name - 名字
 * @param {function} callback - 回调函数
 */
export function ajaxGet (pms, callback) {
  let params = {
    name: pms.name
  };

  $http({
    method: 'GET',
    url: URL + '/portal/widget',
    params: params
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * demo-post
 * @param {string} pms.name - 名字
 * @param {function} callback - 回调函数
 */
export function ajaxPost (pms, callback) {
  let params = {
    name: pms.name
  };

  $http({
    method: 'POST',
    url: URL + '/portal/widget',
    body: params,
    emulateJSON: true
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

// ===================================================[接口开始]===================================================
/**
 * 获取主体性质统计数据列表
 * @param {string} pms
 * @param {function} callback - 回调函数
 */
export function ajaxStaEntProperty (pms, callback) {
  let params = pms;

  $http({
    method: 'GET',
    url: URL + '/analyze_sta/staEntProperty',
    params: params
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 导出主体性质统计数据excel
 * @param {string} pms
 * @param {function} callback - 回调函数
 */
export function ajaxExportStaEntProperty (pms) {
  // let params = pms;

  window.location.href = URL + '/analyze_sta/exportStaEntProperty';
  /* $http({
    method: 'GET',
    url: URL + '/analyze_sta/exportStaEntProperty',
    params: params
  });*/
}
