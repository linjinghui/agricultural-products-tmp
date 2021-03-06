import {$http, $tip} from './constant.js';
import {ssgGetData, ssgSaveData, ssgDeleteData} from 'web-js-tool';

const USER_KEY = '_current_login_user_';
const URL = '/api';
const URLUPFILE = '/upfileapi';
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

// ===================[全局数据]===================

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

/**
 * 将文件上传提交到服务
 * @param {obj} pms.fileName - 文件名 
 * @param {multipartFile} pms.datafile - 文件
 * @param {function} callback - 回调函数 
 */
export function ajaxUploadFile (pms, callback) {
  let formData = new FormData();
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };

  // formData.append('fileName', pms.fileName);
  formData.append('file', pms.datafile);

  if (pms.size > 5 * 1024 * 1024) {
    callback({
      code: 201,
      msg: '图片大小不能超过5M',
      ret: {}
    });
  } else {
    $http({
      method: 'POST',
      headers: config.headers,
      url: URLUPFILE + '/base_attachment/uploadFile?fileName=' + pms.fileName,
      body: formData
    }).then(function (successData) {
      callback(successData.body);
    });
  }
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
    username: pms.username || '',
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

// ===================[生产主体监管相关接口 v]===================

/**
 * 获取生产主体巡查数据列表 - mock
 * @param {string} pms
 * @param {function} callback - 回调函数 
 */
export function ajaxGetScztDataList (pms, callback) {
  let params = pms;
  
  console.log(params);
  $http({
    method: 'GET',
    url: URL + '/admin_ent_main_info/select_ent_main_list',
    params: params
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}


// ===================[服务推送相关接口 v]===================

/**
 * 获取栏目设置数据列表
 * @param {string} pms
 * @param {function} callback - 回调函数 
 */
export function ajaxGetLmszDataList (pms, callback) {
  let params = pms;
  
  $http({
    method: 'GET',
    url: URL + '/news_column/getAllList',
    params: params
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 编辑|保存栏目数据
 * @param {string} pms - 栏目对象 
 * @param {function} callback - 回调函数 
 */
export function ajaxSaveUpdataLmsz (pms, callback) {
  let params = {
    columnId: pms.columnId || '', 
    columnName: pms.columnName,
    inuseFlg: pms.inuseFlg
  };
  
  if (!params.columnName) {
    $tip({ show: true, text: '请输入栏目名称', theme: 'warning' });
  } else {
    $http({
      method: 'POST',
      url: URL + '/news_column/saveOrUpdate',
      body: params,
      emulateJSON: true
    }).then(function (successData) {
      callback && callback(successData.body);
    });
  }
}

/**
 * 删除栏目信息
 * @param {string} pms.columnId - 栏目ID 
 * @param {function} callback - 回调函数 
 */
export function ajaxDelLmsz (pms, callback) {
  let params = {
    columnId: pms.columnId
  };
  
  $http({
    method: 'GET',
    url: URL + '/news_column/delete',
    params: params
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 设置栏目状态
 * @param {string} pms - 栏目对象 
 * @param {string} pms.columnId - 栏目ID 
 * @param {number} pms.inuseFlg - 栏目状态 - 1表示启用，0表示禁用
 * @param {function} callback - 回调函数 
 */
export function ajaxSetLmFlag (pms, callback) {
  let params = {
    columnId: pms.columnId || '',
    inuseFlg: pms.inuseFlg
  };
  
  $http({
    method: 'GET',
    url: URL + '/news_column/setUseFlg',
    params: params
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 获取阅读信息列表
 * @param {string} pms
 * @param {number} pms.columnId
 * @param {string} pms.title
 * @param {long} pms.startTime
 * @param {long} pms.endTime
 * @param {function} callback - 回调函数 
 */
export function ajaxGetYdxxDataList (pms, callback) {
  let params = pms;

  if (params.startTime) {
    params.startTime = new Date(params.startTime.replace(/-/g, '/')).getTime();
  }
  if (params.endTime) {
    params.endTime = new Date(params.endTime.replace(/-/g, '/')).getTime();
  }
  $http({
    method: 'GET',
    url: URL + '/news_article/getReadList',
    params: params
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 查看信息详情
 * @param {string} pms
 * @param {number} pms.recId 文章ID
 * @param {function} callback - 回调函数 
 */
export function ajaxGetYdxxData (pms, callback) {
  let params = {
    recId: pms.recId
  };
  
  $http({
    method: 'GET',
    url: URL + '/news_article/getArticleInfo',
    params: params
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 获取有发布权限的栏目列表
 * @param {string} pms
 * @param {number} pms.recId 文章ID
 * @param {function} callback - 回调函数 
 */
export function ajaxGetCanUseLmDataList (callback) {
  $http({
    method: 'GET',
    url: URL + '/news_column/getColumnList'
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 获取用户自己发布的文章列表
 * @param {string} pms
 * @param {number} pms.columnId
 * @param {string} pms.title
 * @param {long} pms.startTime
 * @param {long} pms.endTime
 * @param {function} callback - 回调函数 
 */
export function ajaxGetMyPublishDataList (pms, callback) {
  let params = pms;
  
  if (params.startTime) {
    params.startTime = new Date(params.startTime.replace(/-/g, '/')).getTime();
  }
  if (params.endTime) {
    params.endTime = new Date(params.endTime.replace(/-/g, '/')).getTime();
  }
  $http({
    method: 'GET',
    url: URL + '/news_article/getMyPublishList',
    params: params
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 发布信息
 * @param {string} pms.recId - 信息ID 
 * @param {string} pms.columnId - 栏目ID 
 * @param {string} pms.title - 标题 
 * @param {string} pms.content - 内容 
 * @param {string} pms.status - 状态 - 0保存草稿、1发布(默认) 
 * @param {function} callback - 回调函数 
 */
export function ajaxPublish (pms, callback) {
  let params = {
    recId: pms.recId || '',
    columnId: pms.columnId,
    title: pms.title,
    content: pms.content,
    status: pms.status,
    fields: pms.fields || []
  };
  
  console.log(params);
  $http({
    method: 'POST',
    url: URL + '/news_article/saveOrUpdate',
    body: params,
    emulateJSON: true
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 设置文章状态操作
 * @param {string} pms.recId - 信息ID 
 * @param {string} pms.setStatus - 状态 - 1撤回、2删除
 * @param {function} callback - 回调函数 
 */
export function ajaxSetStatus (pms, callback) {
  let params = {
    recId: pms.recId || '',
    setStatus: pms.setStatus
  };
  
  $http({
    method: 'POST',
    url: URL + '/news_article/setArticleStatus',
    body: params,
    emulateJSON: true
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 获取监管信息列表
 * @param {string} pms
 * @param {number} pms.columnId
 * @param {string} pms.title
 * @param {long} pms.startTime
 * @param {long} pms.endTime
 * @param {string} pms.adminDivisionCity - 市级区划
 * @param {string} pms.adminDivisionCountry - 县级区划
 * @param {string} pms.townDivision - 乡镇区划
 * @param {function} callback - 回调函数 
 */
export function ajaxGetJgxxDataList (pms, callback) {
  let params = pms;
  
  if (params.startTime) {
    params.startTime = new Date(params.startTime.replace(/-/g, '/')).getTime();
  }
  if (params.endTime) {
    params.endTime = new Date(params.endTime.replace(/-/g, '/')).getTime();
  }
  $http({
    method: 'GET',
    url: URL + '/news_article/getAdminList',
    params: params
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}


// ===================[工作监督相关接口 v]===================

/**
 * 获取监管用户登陆日志
 * @param {string} pms
 * @param {function} callback - 回调函数 
 */
export function ajaxGetJgyhLoginLogList (pms, callback) {
  let params = pms;
  
  if (params.startTime) {
    params.startTime = new Date(params.startTime.replace(/-/g, '/')).getTime();
  }
  if (params.endTime) {
    params.endTime = new Date(params.endTime.replace(/-/g, '/')).getTime();
  }
  $http({
    method: 'GET',
    url: URL + '/sys_admin_login_log/getInfoList',
    params: params
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 获取监管用户操作日志
 * @param {string} pms
 * @param {function} callback - 回调函数 
 */
export function ajaxGetJgyhOptLogList (pms, callback) {
  let params = pms;
  
  if (params.startTime) {
    params.startTime = new Date(params.startTime.replace(/-/g, '/')).getTime();
  }
  if (params.endTime) {
    params.endTime = new Date(params.endTime.replace(/-/g, '/')).getTime();
  }
  $http({
    method: 'GET',
    url: URL + '/sys_admin_opt_log/getOptInfoList',
    params: params
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 获取生产主体登陆日志
 * @param {string} pms
 * @param {function} callback - 回调函数 
 */
export function ajaxGetScztLoginLogList (pms, callback) {
  let params = pms;
  
  if (params.startTime) {
    params.startTime = new Date(params.startTime.replace(/-/g, '/')).getTime();
  }
  if (params.endTime) {
    params.endTime = new Date(params.endTime.replace(/-/g, '/')).getTime();
  }
  $http({
    method: 'GET',
    url: URL + '/ent_sys_login_log/getLogList',
    params: params
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 获取生产主体操作日志
 * @param {string} pms
 * @param {function} callback - 回调函数 
 */
export function ajaxGetScztOptLogList (pms, callback) {
  let params = pms;
  
  if (params.startTime) {
    params.startTime = new Date(params.startTime.replace(/-/g, '/')).getTime();
  }
  if (params.endTime) {
    params.endTime = new Date(params.endTime.replace(/-/g, '/')).getTime();
  }
  $http({
    method: 'GET',
    url: URL + '/ent_sys_opt_log/getLogList',
    params: params
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}


// ===================[禁用品管理相关接口 v]===================

/**
 * 获取农资品分类树
 * @param {string} pms
 * @param {function} callback - 回调函数 
 */
export function ajaxGetCategoryTree (callback) {
  $http({
    method: 'GET',
    url: URL + '/prohibit_material/getCategoryTree'
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 获取禁用品数据列表
 * @param {string} pms
 * @param {function} callback - 回调函数 
 */
export function ajaxGetPmDataList (pms, callback) {
  let params = pms;
  
  $http({
    method: 'GET',
    url: URL + '/prohibit_material/getPMList',
    params: params
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 保存|编辑 禁用品信息
 * @param {string} pms.pmId - ID
 * @param {string} pms.dictCode - 分类
 * @param {string} pms.materialName - 中文名
 * @param {string} pms.enName - 英文名
 * @param {string} pms.prohibitUsed - 禁止用途 
 * @param {function} callback - 回调函数 
 */
export function ajaxSaveUpdataPm (pms, callback) {
  let params = {
    pmId: pms.pmId || '',
    dictCode: pms.dictCode || '',
    materialName: pms.materialName || '',
    enName: pms.enName || '',
    prohibitUsed: pms.prohibitUsed || ''
  };
  
  if (!params.materialName) {
    $tip({ show: true, text: '请输入禁用品中文名', theme: 'warning' });
  } else {
    $http({
      method: 'POST',
      url: URL + '/prohibit_material/saveOrUpdate',
      body: params,
      emulateJSON: true
    }).then(function (successData) {
      callback && callback(successData.body);
    });
  }
}

/**
 * 删除 禁用品信息
 * @param {string} pms.pmId - ID
 * @param {function} callback - 回调函数 
 */
export function ajaxDeletePm (pms, callback) {
  let params = {
    pmId: pms.pmId
  };
  
  $http({
    method: 'POST',
    url: URL + '/prohibit_material/delete',
    body: params,
    emulateJSON: true
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}


// ===================[监管管理相关接口 v]===================

/**
 * 获取监管管理（监管问题处置、行政处罚、监督检查）数据列表
 * @param {number} pms.sheetType - 档案类别 -（1监管问题处置、2行政处罚、3监督检查）
 * @param {function} callback - 回调函数 
 */
export function ajaxGetJgglDataList (pms, callback) {
  let params = pms;

  $http({
    method: 'GET',
    url: URL + '/supervision_sheets/getSheetList',
    params: params
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 获取监管管理（监管问题处置、行政处罚、监督检查）详情
 * @param {number} pms.recId - id
 * @param {function} callback - 回调函数 
 */
export function ajaxGetJgglDataInfo (pms, callback) {
  let params = {
    recId: pms.recId
  };

  $http({
    method: 'GET',
    url: URL + '/supervision_sheets/getContent',
    params: params
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 新建（监管问题处置、行政处罚、监督检查）数据
 * @param {string} pms.sheetType - 档案类别 -（1监管问题处置2行政处罚、3监督检查）
 * @param {string} pms.title - 标题
 * @param {string} pms.content - 详情
 * @param {string} pms.entId - 涉事主体id
 * @param {string} pms.entName - 主体名称 
 * @param {string} pms.deptName - 执行部门 
 * @param {string} pms.attachIds - 附件ID(多个以英文逗号分隔) 
 * @param {function} callback - 回调函数 
 */
export function ajaxCreateJgglData (pms, callback) {
  let params = {
    sheetType: pms.sheetType || '',
    title: pms.title || '',
    content: pms.content || '',
    entId: pms.entId || '',
    entName: pms.entName || '',
    deptName: pms.deptName || '',
    attachIds: pms.attachIds || ''
  };
  
  if (!params.title) {
    $tip({ show: true, text: '请输入标题', theme: 'warning' });
  } else if (!params.content) {
    $tip({ show: true, text: '请输入详情', theme: 'warning' });
  } else if (!params.entId) {
    $tip({ show: true, text: '请选择涉事主体', theme: 'warning' });
  } else {
    $http({
      method: 'POST',
      url: URL + '/supervision_sheets/save',
      body: params,
      emulateJSON: true
    }).then(function (successData) {
      callback && callback(successData.body);
    });
  }
}

/**
 * 撤回、删除、办结（监管问题处置、行政处罚、监督检查）数据
 * @param {string} pms.recId - 档案id
 * @param {string} pms.doType - 操作类别 - 1撤回，2删除，3办结
 * @param {function} callback - 回调函数 
 */
export function ajaxSetJgglStatus (pms, callback) {
  let params = {
    recId: pms.recId,
    doType: pms.doType
  };
  
  $http({
    method: 'POST',
    url: URL + '/supervision_sheets/doAdminOpt',
    body: params,
    emulateJSON: true
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}


// ===================[数据字典相关接口 v]===================

/**
 * 获取产业类型树形数据
 * @param {function} callback - 回调函数 
 */
export function ajaxGetIndustryTree (callback) {
  $http({
    method: 'GET',
    url: URL + '/base_industry_dict/getIndustryTree'
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 获取产业类型详细信息
 * @param {string} pms.dictId - 字典ID
 * @param {function} callback - 回调函数 
 */
export function ajaxGetIndustryInfo (pms, callback) {
  let param = {
    dictId: pms.dictId
  };

  $http({
    method: 'GET',
    url: URL + '/base_industry_dict/getIndustryInfo',
    params: param
  }).then(function (successData) {
    callback && callback(successData.body);
  });
}

/**
 * 新增产业类型数据字典
 * @param {string} pms.commitType - 保存类型 - 1表示非二级节点，2表示二级节点
 * @param {string} pms.dictId - id
 * @param {string} pms.dictName - 名称
 * @param {string} pms.dictCode - 编码（同一parentId下不能重复）
 * @param {string} pms.dictValue - 英文名 
 * @param {string} pms.parentId - 父id 
 * @param {string} pms.categoryCode - 食用农产品类别编码(commitType=2时不能空)
 * @param {string} pms.scaleUnit - 生产规模计量单位(commitType=2时不能空)，多个以竖线分隔
 * @param {string} pms.saleUnit - 产成品的计量单位(commitType=2时不能空) ，多个以竖线分隔 
 * @param {function} callback - 回调函数 
 */
export function ajaxCreateCylxzdData (pms, callback) {
  let params = {
    commitType: pms.commitType || '',
    dictId: pms.dictId || '',
    dictName: pms.dictName || '',
    dictCode: pms.dictCode || '',
    dictValue: pms.dictValue || '',
    parentId: pms.parentId || '',
    categoryCode: pms.categoryCode || '',
    scaleUnit: pms.scaleUnit || '',
    saleUnit: pms.saleUnit || ''
  };
  
  if (params.commitType === 2 && !params.scaleUnit) {
    $tip({ show: true, text: '请输入生产规模计量单位', theme: 'warning' });
  } else if (params.commitType === 2 && !params.saleUnit) {
    $tip({ show: true, text: '请输入产成品的计量单位', theme: 'warning' });
  } else if (params.commitType === 2 && !params.categoryCode) {
    $tip({ show: true, text: '请输入食用农产品类别编码', theme: 'warning' });
  } else {
    $http({
      method: 'POST',
      url: URL + '/base_industry_dict/saveOrUpdate',
      body: params,
      emulateJSON: true
    }).then(function (successData) {
      callback && callback(successData.body);
    });
  }
}

/**
 * 删除产业类型数据字典
 * @param {string} pms.dictId - id
 * @param {function} callback - 回调函数 
 */
export function ajaxDeleteCylxzdData (pms, callback) {
  let params = {
    dictId: pms.dictId || ''
  };
  
  $http({
    method: 'POST',
    url: URL + '/base_industry_dict/delete',
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