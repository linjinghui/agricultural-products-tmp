import {$http} from './constant.js';
import {ssgGetData, ssgSaveData, ssgDeleteData} from 'web-js-tool';

const USER_KEY = '_current_login_user_';
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
 * 获取当前登录用户信息
 */
export function getUserInfo () {
  return ssgGetData(USER_KEY);
}

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
    let data = successData.body;
    callback && callback(data);
    if (data.code === 0) {
      ssgSaveData(USER_KEY, data.ret);
    }
  });
}

/**
 * 退出登录
 */
export function ajaxLoginout (callback) {
  ssgDeleteData(USER_KEY);
  $http({
    method: 'GET',
    url: URL + '/logout'
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

// ===================[全局参数数据获取]===================

/**
 * 获取行政区划数据 - 福建全省
 * @param {function} callback - 回调函数 
 */
export function ajaxGetAllDivisionTree (callback) {
  $http({
    method: 'GET',
    url: URL + '/sys_department/getAllDivisionTree'
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 根据父行政区划获取子行政区划列表
 * @param {obj} pms.code - 当前区域编码 
 * @param {function} callback - 回调函数 
 */
export function ajaxGetChildDivision (pms, callback) {
  let params = {
    parentCode: pms.code || ''
  };

  $http({
    method: 'GET',
    url: URL + '/sys_department/getChildDivision',
    params: params
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

// ===================[待审批相关接口]===================

/**
 * 获取待审核数据列表
 * @param {string} pms
 * @param {function} callback - 回调函数 
 */
export function ajaxGetDshDataList (pms, callback) {
  let params = pms;
  
  $http({
    method: 'GET',
    url: URL + '/ent_approve_operation/selectMyAuditList',
    params: params
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 获取审批日志列表
 * @param {string} pms.authId - 
 * @param {function} callback - 回调函数 
 */
export function ajaxGetSpLogList (pms, callback) {
  let params = {
    authId: pms.authId
  };
  
  $http({
    method: 'GET',
    url: URL + '/ent_approve_operation/getAllInfo',
    params: params
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 执行审批操作 - 待审批
 * @param {string} pms.authId - ID 
 * @param {string} pms.optResult - 审批结果optResult 0不通过 1通过 
 * @param {string} pms.optOpinion - 审批意见 
 * @param {function} callback - 回调函数 
 */
export function ajaxDoAuditOperation (pms, callback) {
  let userInfo = getUserInfo().user;
  let optLevel = userInfo.adminDivision + '';
  
  console.log(userInfo);
  if (optLevel.substr(optLevel.length - 4, optLevel.length) === '0000') {
    optLevel = 2;
  } else if (optLevel.substr(optLevel.length - 2, optLevel.length) === '00') {
    optLevel = 2;
  } else {
    optLevel = 1;
  }
  let params = {
    authId: pms.authId,
    optLevel: optLevel,
    optResult: pms.optResult,
    optOpinion: pms.optOpinion
  };
  
  $http({
    method: 'POST',
    url: URL + '/ent_approve_operation/doAuditOperation',
    body: params,
    emulateJSON: true
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 获取已审批数据列表
 * @param {string} pms
 * @param {function} callback - 回调函数 
 */
export function ajaxGetYshDataList (pms, callback) {
  let params = pms;
  
  $http({
    method: 'GET',
    url: URL + '/ent_approve_operation/selectPublicAuditList',
    params: params
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}




// ===================================================[虚拟数据接口]===================================================

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
    callback && callback(successData.body);
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
    callback && callback(successData.body);
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
    callback && callback(successData.body);
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
    callback && callback(successData.body);
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
    callback && callback(successData.body);
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
    callback && callback(successData.body);
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
    callback && callback(successData.body);
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
    callback && callback(successData.body);
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
    callback && callback(successData.body);
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
    callback && callback(successData.body);
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
    callback && callback(successData.body);
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
    callback && callback(successData.body);
  });
}

/**
 * 获取地区机构数据列表
 * @param {string} pms
 * @param {function} callback - 回调函数 
 */
export function ajaxGetJgData (pms, callback) {
  let params = {
    area: pms.area
  };
  
  $http({
    method: 'GET',
    url: URL + '/portal/getJgData',
    params: params
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 获取地区用户数据列表
 * @param {string} pms
 * @param {function} callback - 回调函数 
 */
export function ajaxGetUserData (pms, callback) {
  let params = {
    area: pms.area
  };
  
  $http({
    method: 'GET',
    url: URL + '/portal/getUserData',
    params: params
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 获取角色数据列表
 * @param {string} pms
 * @param {function} callback - 回调函数 
 */
export function ajaxGetJsData (pms, callback) {
  let params = {
    area: pms.area
  };
  
  $http({
    method: 'GET',
    url: URL + '/portal/getJsData',
    params: params
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}