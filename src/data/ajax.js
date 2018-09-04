import {$http} from './constant.js';

const URL = '/api';

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
    callback(successData.body);
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
    callback(successData.body);
  });
}

// ===================================================[接口开始]===================================================
/**
 * 获取验证码
 */
export function ajaxGetVcode () {
  return URL + '/kaptcha' + '?t=' + new Date().getTime();
}

/**
 * 登录
 * @param {string} pms.account - 账号 
 * @param {string} pms.password - 密码 
 * @param {string} pms.vcode - 验证码 
 * @param {function} callback - 回调函数 
 */
export function ajaxLogin (pms, callback) {
  let params = {
    username: pms.account,
    password: pms.password,
    kaptcha: pms.vcode
  };
  
  $http({
    method: 'POST',
    url: URL + '/login',
    body: params,
    emulateJSON: true
  }).then(function (successData) {
    callback(successData.body);
  });
}

/**
 * 获取产业类型占比数据
 * @param {string} pms.timeType - 时间类型 - 1：今天，2：本月，3：本年度，4：全部
 * @param {function} callback - 回调函数 
 */
export function ajaxGetCylxzb (pms, callback) {
  let params = {
    timeType: pms.timeType
  };
  
  $http({
    method: 'GET',
    url: URL + '/portal/cylxzb',
    params: params
  }).then(function (successData) {
    callback(successData.body);
  });
}

/**
 * 获取赋码数量统计数据
 * @param {string} pms.timeType - 时间类型 - 1：今天，2：本月，3：本年度，4：全部
 * @param {function} callback - 回调函数 
 */
export function ajaxGetFmsltj (pms, callback) {
  let params = {
    timeType: pms.timeType
  };
  
  $http({
    method: 'GET',
    url: URL + '/portal/fmsltj',
    params: params
  }).then(function (successData) {
    callback(successData.body);
  });
}

/**
 * 获取区域销售数据
 * @param {string} pms.timeType - 时间类型 - 1：今天，2：本月，3：本年度，4：全部
 * @param {function} callback - 回调函数 
 */
export function ajaxGetQyxs (pms, callback) {
  let params = {
    timeType: pms.timeType
  };
  
  $http({
    method: 'GET',
    url: URL + '/portal/qyxs',
    params: params
  }).then(function (successData) {
    callback(successData.body);
  });
}

/**
 * 获取区域企业数据
 * @param {string} pms.area - 区域 - 1：今天，2：本月，3：本年度，4：全部
 * @param {string} pms.current - 当前页
 * @param {string} pms.pageSize - 每页显示数量
 * @param {function} callback - 回调函数 
 */
export function ajaxGetEnterpriseByArea (pms, callback) {
  let params = {
    area: pms.area,
    current: pms.current || 1,
    pageSize: pms.pageSize
  };
  
  $http({
    method: 'GET',
    url: URL + '/portal/enterpriseByArea',
    params: params
  }).then(function (successData) {
    callback(successData.body);
  });
}