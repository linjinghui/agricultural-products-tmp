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
 * @param {string} pms.area - 区域 - 1：福州市，2：宁德市，3：莆田市，4：泉州市。。。
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

/**
 * 获取生产主体数量统计
 * @param {string} pms.timeType - 时间类型 - 1：今天，2：本月，3：本年度，4：全部
 * @param {function} callback - 回调函数 
 */
export function ajaxGetScztSltj (pms, callback) {
  let params = {
    timeType: pms.timeType
  };
  
  $http({
    method: 'GET',
    url: URL + '/portal/scztSltj',
    params: params
  }).then(function (successData) {
    callback(successData.body);
  });
}

/**
 * 获取区域产量数据
 * @param {string} pms.timeType - 时间类型 - 1：今天，2：本月，3：本年度，4：全部
 * @param {function} callback - 回调函数 
 */
export function ajaxGetQycl (pms, callback) {
  let params = {
    timeType: pms.timeType
  };
  
  $http({
    method: 'GET',
    url: URL + '/portal/qycl',
    params: params
  }).then(function (successData) {
    callback(successData.body);
  });
}

/**
 * 获取区域看板数据
 * @param {string} pms.area - 区域 - 1：福州市，2：宁德市，3：莆田市，4：泉州市。。。
 * @param {function} callback - 回调函数 
 */
export function ajaxGetAreaKbData (pms, callback) {
  let params = {
    area: pms.area
  };
  
  $http({
    method: 'GET',
    url: URL + '/portal/areaKbData',
    params: params
  }).then(function (successData) {
    callback(successData.body);
  });
}

/**
 * 获取待审核数据列表
 * @param {string} pms
 * @param {function} callback - 回调函数 
 */
export function ajaxGetDshData (pms, callback) {
  let params = {
    area: pms.area
  };
  
  $http({
    method: 'GET',
    url: URL + '/portal/getDshData',
    params: params
  }).then(function (successData) {
    callback(successData.body);
  });
}

/**
 * 获取待审核数据详情
 * @param {string} pms
 * @param {function} callback - 回调函数 
 */
export function ajaxGetDshInfo (pms, callback) {
  let params = {
    area: pms.area
  };
  
  $http({
    method: 'GET',
    url: URL + '/portal/getDshInfo',
    params: params
  }).then(function (successData) {
    callback(successData.body);
  });
}

/**
 * 获取历史审核数据列表
 * @param {string} pms
 * @param {function} callback - 回调函数 
 */
export function ajaxGetLsshData (pms, callback) {
  let params = {
    area: pms.area
  };
  
  $http({
    method: 'GET',
    url: URL + '/portal/getLsshData',
    params: params
  }).then(function (successData) {
    callback(successData.body);
  });
}

/**
 * 获取历史审核数据列表
 * @param {string} pms
 * @param {function} callback - 回调函数 
 */
export function ajaxGetShcxData (pms, callback) {
  let params = {
    area: pms.area
  };
  
  $http({
    method: 'GET',
    url: URL + '/portal/getShcxData',
    params: params
  }).then(function (successData) {
    callback(successData.body);
  });
}

/**
 * 获取待审核和历史审核数据列表
 * @param {string} pms
 * @param {function} callback - 回调函数 
 */
export function ajaxGetDshShcxData (pms, callback) {
  let params = {
    area: pms.area
  };
  
  $http({
    method: 'GET',
    url: URL + '/portal/getDshShcxData',
    params: params
  }).then(function (successData) {
    callback(successData.body);
  });
}