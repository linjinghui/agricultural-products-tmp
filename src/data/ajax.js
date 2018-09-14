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
  
  if (optLevel.substr(optLevel.length - 4, optLevel.length) === '0000') {
    optLevel = 3;
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

// ===================[系统管理相关接口]===================

/**
 * 获取组织机构树
 * @param {function} callback - 回调函数 
 */
export function ajaxGetOrgJgTree (callback) {  
  $http({
    method: 'GET',
    url: URL + '/sys_department/getDeptTree'
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 获取机构列表
 * @param {string} pms.adminDivision - 行政区划 
 * @param {function} callback - 回调函数 
 */
export function ajaxGetJgDataList (pms, callback) {
  let params = {
    adminDivision: pms.adminDivision
  };
  
  $http({
    method: 'GET',
    url: URL + '/sys_department/getDeptList',
    params: params
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 保存|编辑机构信息
 * @param {string} pms - 机构信息对象 
 * @param {function} callback - 回调函数 
 */
export function ajaxSaveUpdataJg (pms, callback) {
  let params = {
    deptId: pms.deptId || '',
    deptName: pms.deptName,
    deptCode: pms.deptCode,
    adminDivision: pms.adminDivision,
    parentId: pms.parentId
  };
  
  $http({
    method: 'POST',
    url: URL + '/sys_department/saveOrUpdate',
    body: params,
    emulateJSON: true
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 删除机构信息
 * @param {string} pms.deptId - 机构ID 
 * @param {function} callback - 回调函数 
 */
export function ajaxDelJg (pms, callback) {
  let params = {
    deptId: pms.deptId
  };
  
  $http({
    method: 'GET',
    url: URL + '/sys_department/delete',
    params: params
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 获取用户列表
 * @param {string} pms.divCode - 行政区划divCode 
 * @param {string} pms.deptId - 机构记录ID 
 * @param {function} callback - 回调函数 
 */
export function ajaxGetUserDataList (pms, callback) {
  let params = {
    divCode: pms.divCode || '',
    deptId: pms.deptId || '',
    page: 1,
    size: 10000
  };
  
  $http({
    method: 'GET',
    url: URL + '/sys_user/getDeptTreeUser',
    params: params
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 获取用户详细信息
 * @param {string} pms.userId - 用户id 
 * @param {function} callback - 回调函数 
 */
export function ajaxGetUserInfo (pms, callback) {
  let params = {
    userId: pms.userId
  };
  
  $http({
    method: 'GET',
    url: URL + '/sys_user/getUserInfo',
    params: params
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 保存|编辑用户信息
 * @param {string} pms - 用户信息对象 
 * @param {function} callback - 回调函数 
 */
export function ajaxSaveUpdataUser (pms, callback) {
  let params = {
    id: pms.id || '',
    username: pms.userName || '',
    realName: pms.realName || '',
    password: pms.password || '',
    mobile: pms.mobile || '',
    sex: pms.sex,
    adminDivision: pms.adminDivision || '',
    townDivision: pms.townDivision || '',
    deptId: pms.deptId || '',
    roleIds: pms.roleIds && pms.roleIds.join(',') || ''
  };
  
  $http({
    method: 'POST',
    url: URL + '/sys_user/saveOrUpdate',
    body: params,
    emulateJSON: true
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 禁用|启用 用户
 * @param {string} pms.userId - 用户id 
 * @param {string} pms.opt - 1启用，2禁用
 * @param {function} callback - 回调函数 
 */
export function ajaxChangeUserStatus (pms, callback) {
  let params = {
    userId: pms.userId,
    opt: pms.opt
  };
  
  $http({
    method: 'GET',
    url: URL + '/sys_user/changeUserStatus',
    params: params
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 删除 用户
 * @param {string} pms.userId - 用户id
 * @param {function} callback - 回调函数 
 */
export function ajaxDeleteUser (pms, callback) {
  let params = {
    userId: pms.userId
  };
  
  $http({
    method: 'GET',
    url: URL + '/sys_user/delete',
    params: params
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 获取角色列表
 * @param {function} callback - 回调函数 
 */
export function ajaxRoleDataList (callback) {
  $http({
    method: 'GET',
    url: URL + '/sys_role/getAllInfo'
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 删除角色
 * @param {number} pms.id - 角色ID
 * @param {function} callback - 回调函数 
 */
export function ajaxDeleteRole (pms, callback) {
  let params = {
    id: pms.id
  };

  $http({
    method: 'GET',
    url: URL + '/sys_role/delete',
    params: params
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 新增角色
 * @param {number} pms.id - 角色ID
 * @param {string} pms.name - 角色名称
 * @param {function} callback - 回调函数 
 */
export function ajaxSaveUpdateRole (pms, callback) {
  let params = {
    id: pms.id || '',
    name: pms.name
  };

  $http({
    method: 'GET',
    url: URL + '/sys_role/save',
    params: params
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 获取完整的权限列表
 * @param {number} pms.id - 角色ID
 * @param {string} pms.name - 角色名称
 * @param {function} callback - 回调函数 
 */
export function ajaxGetAllPermissionTreeData (callback) {
  $http({
    method: 'GET',
    url: URL + '/sys_permission/getUserPermissionList'
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 根据角色ID获取角色权限列表
 * @param {number} pms.roleId - 角色ID
 * @param {function} callback - 回调函数 
 */
export function ajaxGetPermissionTreeByRoleId (pms, callback) {
  let params = {
    roleId: pms.roleId
  };

  $http({
    method: 'GET',
    url: URL + '/sys_permission/getRolePermissionTree',
    params: params
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 设置角色权限列表
 * @param {number} pms.roleId - 角色ID
 * @param {array} pms.permIds - 权限ID列表
 * @param {function} callback - 回调函数 
 */
export function ajaxSetPermission (pms, callback) {
  let params = {
    roleId: pms.roleId,
    permIds: pms.permIds && pms.permIds.join(',') || ''
  };

  $http({
    method: 'POST',
    url: URL + '/sys_permission/setRolePermission',
    body: params,
    emulateJSON: true
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