import Mock from 'mockjs';

Mock.setup({
  // 表示响应时间介于 1000 和 3000 毫秒之间，默认值是'10-100'。
  timeout: '100-1000'
});

let demo = {
  'msg': 'im msg',
  'code': 200,
  'ret': '',
  'success': true
}

// ===================[生产主体监管相关接口 v]===================

// 获取生产主体巡查数据列表
Mock.mock(/(\/admin_ent_main_info\/select_ent_main_list)/, {
  'msg': 'im msg',
  'code': 0,
  'ret': {
    'list|20': [
      { 
        'entId': '@id', 
        'entName': '@name', 
        // 经营场所
        'busiPlace': '@string',
        // 行政区划 
        'adminDivision': '@name', 
        // 产业类型，多个以英文逗号分隔
        'entIndustrySub': '@name', 
        // 主体性质
        'entProperty': '@name',
        'createTime': new Date().getTime(), 
        // 企业状态：0正常、4注销、5禁用，其他状态预留
        'entStatus|1': [0, 4, 5]
      }
    ],
    'totalSize': '221'
  },
  'success': true
});

// ===================[服务推送相关接口 v]===================

// 获取栏目设置数据列表
Mock.mock(/(\/news_column\/getAllList)/, {
  'msg': 'im msg',
  'code': 0,
  'ret': {
    'list|20': [
      { 
        'columnId': '@id', 
        'columnName': '@name', 
        // 是否启用，1是0否
        'inuseFlg|1': [0, 1],
        'createTime': new Date().getTime()
      }
    ],
    'totalSize': '221'
  },
  'success': true
});

// 编辑|保存栏目数据
Mock.mock(/(\/news_column\/saveOrUpdate)/, {
  'msg': 'im msg',
  'code': 0,
  'ret': true,
  'success': true
});

// 删除栏目数据
Mock.mock(/(\/news_column\/delete)/, {
  'msg': 'im msg',
  'code': 0,
  'ret': true,
  'success': true
});

// 设置栏目状态
Mock.mock(/(\/news_column\/setUseFlg)/, {
  'msg': 'im msg',
  'code': 0,
  'ret': true,
  'success': true
});



// 获取产业类型占比数据
Mock.mock(/(\/portal\/cylxzb)/, {
  'msg': 'im msg',
  'code': 0,
  'ret': [
    { 'id': '1', 'value': '@natural(10, 1000)', 'name': '水果' },
    { 'id': '2', 'value': '@natural(10, 1000)', 'name': '蔬菜' },
    { 'id': '3', 'value': '@natural(10, 1000)', 'name': '茶叶' },
    { 'id': '4', 'value': '@natural(10, 1000)', 'name': '食用菌' },
    { 'id': '5', 'value': '@natural(10, 1000)', 'name': '中草药' },
    { 'id': '6', 'value': '@natural(10, 1000)', 'name': '牲畜' },
    { 'id': '7', 'value': '@natural(10, 1000)', 'name': '家禽' },
    { 'id': '8', 'value': '@natural(10, 1000)', 'name': '屠宰及肉类加工' }
  ],
  'success': true
});

// 获取赋码数量统计数据
Mock.mock(/(\/portal\/fmsltj)/, {
  'msg': 'im msg',
  'code': 0,
  'ret': [
    { 'id': '1', 'value': '@natural(10, 1000)', 'name': '水果' },
    { 'id': '2', 'value': '@natural(10, 1000)', 'name': '蔬菜' },
    { 'id': '3', 'value': '@natural(10, 1000)', 'name': '茶叶' },
    { 'id': '4', 'value': '@natural(10, 1000)', 'name': '食用菌' },
    { 'id': '5', 'value': '@natural(10, 1000)', 'name': '中草药' },
    { 'id': '6', 'value': '@natural(10, 1000)', 'name': '牲畜' },
    { 'id': '7', 'value': '@natural(10, 1000)', 'name': '家禽' },
    { 'id': '8', 'value': '@natural(10, 1000)', 'name': '屠宰及肉类加工' }
  ],
  'success': true
});

// 获取区域销售数据
Mock.mock(/(\/portal\/qyxs)/, {
  'msg': 'im msg',
  'code': 0,
  'ret': [
    { 'name': '福州市', 'value': '@natural(10, 1000)' },
    { 'name': '厦门市', 'value': '@natural(10, 1000)' },
    { 'name': '漳州市', 'value': '@natural(10, 1000)' },
    { 'name': '泉州市', 'value': '@natural(10, 1000)' },
    { 'name': '莆田市', 'value': '@natural(10, 1000)' },
    { 'name': '宁德市', 'value': '@natural(10, 1000)' },
    { 'name': '南平市', 'value': '@natural(10, 1000)' },
    { 'name': '三明市', 'value': '@natural(10, 1000)' },
    { 'name': '龙岩市', 'value': '@natural(10, 1000)' },
    { 'name': '平潭', 'value': '@natural(10, 1000)' }
  ],
  'success': true
});

// 获取区域企业数据
Mock.mock(/(\/portal\/enterpriseByArea)/, {
  'msg': 'im msg',
  'code': 0,
  'ret': {
    'list|20-100': [
      { 'enterName': '@name', 'xzqh': '@natural(0, 100)', 'xxwzd': '@natural(0, 100)' + '%', 'xsl': '@natural(0, 10000)', 'fmsl': '@natural(0, 100)' }
    ],
    'totalSize': '221'
  },
  'success': true
});

// 获取生产主体数量统计
Mock.mock(/(\/portal\/scztSltj)/, {
  'msg': 'im msg',
  'code': 0,
  'ret': [
    { 'name': '福州', 'value': '@natural(10, 1000)' },
    { 'name': '厦门', 'value': '@natural(10, 1000)' },
    { 'name': '漳州', 'value': '@natural(10, 1000)' },
    { 'name': '泉州', 'value': '@natural(10, 1000)' },
    { 'name': '莆田', 'value': '@natural(10, 1000)' },
    { 'name': '宁德', 'value': '@natural(10, 1000)' },
    { 'name': '南平', 'value': '@natural(10, 1000)' },
    { 'name': '三明', 'value': '@natural(10, 1000)' },
    { 'name': '龙岩', 'value': '@natural(10, 1000)' }
  ],
  'success': true
});

// 获取区域产量数据
Mock.mock(/(\/portal\/qycl)/, {
  'msg': 'im msg',
  'code': 0,
  'ret': [
    { 'name': '福州市', 'value': '@natural(10, 1000)' },
    { 'name': '厦门市', 'value': '@natural(10, 1000)' },
    { 'name': '漳州市', 'value': '@natural(10, 1000)' },
    { 'name': '泉州市', 'value': '@natural(10, 1000)' },
    { 'name': '莆田市', 'value': '@natural(10, 1000)' },
    { 'name': '宁德市', 'value': '@natural(10, 1000)' },
    { 'name': '南平市', 'value': '@natural(10, 1000)' },
    { 'name': '三明市', 'value': '@natural(10, 1000)' },
    { 'name': '龙岩市', 'value': '@natural(10, 1000)' },
    { 'name': '平潭', 'value': '@natural(10, 1000)' }
  ],
  'success': true
});

// 获取区域看板数据
Mock.mock(/(\/portal\/areaKbData)/, {
  'msg': 'im msg',
  'code': 0,
  'ret': [
    { 'name': '福州市', 'qysl': '@natural(10, 1000)', 'qyxzsl': '@natural(10, 1000)', 'zzcyl': '@natural(10, 1000)', 'xmycl': '@natural(10, 1000)' },
    { 'name': '厦门市', 'qysl': '@natural(10, 1000)', 'qyxzsl': '@natural(10, 1000)', 'zzcyl': '@natural(10, 1000)', 'xmycl': '@natural(10, 1000)' },
    { 'name': '漳州市', 'qysl': '@natural(10, 1000)', 'qyxzsl': '@natural(10, 1000)', 'zzcyl': '@natural(10, 1000)', 'xmycl': '@natural(10, 1000)' },
    { 'name': '泉州市', 'qysl': '@natural(10, 1000)', 'qyxzsl': '@natural(10, 1000)', 'zzcyl': '@natural(10, 1000)', 'xmycl': '@natural(10, 1000)' },
    { 'name': '莆田市', 'qysl': '@natural(10, 1000)', 'qyxzsl': '@natural(10, 1000)', 'zzcyl': '@natural(10, 1000)', 'xmycl': '@natural(10, 1000)' },
    { 'name': '宁德市', 'qysl': '@natural(10, 1000)', 'qyxzsl': '@natural(10, 1000)', 'zzcyl': '@natural(10, 1000)', 'xmycl': '@natural(10, 1000)' },
    { 'name': '南平市', 'qysl': '@natural(10, 1000)', 'qyxzsl': '@natural(10, 1000)', 'zzcyl': '@natural(10, 1000)', 'xmycl': '@natural(10, 1000)' },
    { 'name': '三明市', 'qysl': '@natural(10, 1000)', 'qyxzsl': '@natural(10, 1000)', 'zzcyl': '@natural(10, 1000)', 'xmycl': '@natural(10, 1000)' },
    { 'name': '龙岩市', 'qysl': '@natural(10, 1000)', 'qyxzsl': '@natural(10, 1000)', 'zzcyl': '@natural(10, 1000)', 'xmycl': '@natural(10, 1000)' }
  ],
  'success': true
});

// 获取待审核数据列表
Mock.mock(/(\/portal\/getDshData)/, {
  'msg': 'im msg',
  'code': 0,
  'ret': {
    'list|20': [
      { '_ztmc_': '@name', '_ztdm_': '@id', '_jycs_': '@name', '_fddbr_': '@name', '_cylx_': '@name', '_ztxz_': '@name', '_fzrxm_': '@name', '_dlzh_': '@name', '_sczttjsj_': '2018-11-11', '_sfyzsj_': '2018-05-11' }
    ],
    'totalSize': '221'
  },
  'success': true
});

// 获取待审核数据详情
Mock.mock(/(\/portal\/getDshInfo)/, {
  'msg': 'im msg',
  'code': 0,
  'ret': { '_ztmc_': '@name', '_ztdm_': '@id', '_jycs_': '@name', '_fddbr_': '@name', '_cylx_': '@name', '_ztxz_': '@name', '_fzrxm_': '@name', '_dlzh_': '@name', '_sczttjsj_': '2018-11-11', '_sfyzsj_': '2018-05-11', 
  '_yyzz_|1': [
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536301473555&di=3657403f86f1b858272e494400e8451c&imgtype=0&src=http%3A%2F%2Fimage.cn.made-in-china.com%2F43f34j01LEztnoDKJQis%2F3.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536301423486&di=c0106e403d721e2ca3f1a14822679326&imgtype=0&src=http%3A%2F%2Fimage10.71.net%2Fimage10%2F48%2F30%2F15%2F31%2Ff2286738-c165-4777-8585-d5167d07e027.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536301538656&di=4c5c41d7a0dc024e6fd032068351ffc9&imgtype=0&src=http%3A%2F%2Fdocs.ebdoor.com%2FImage%2FCompanyCertificate%2F20%2F203414.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536301571537&di=0b6badcc18a466bb6a345b01d52c21bf&imgtype=0&src=http%3A%2F%2Fwww.fzjlbj.com%2Fupload%2F201406%2F05%2F201406051528269687.jpg'
  ], '_jjqzsj_|1': ['2016-05-11 至 2035-05-11', '2006-11-11 至 2039-01-01', '2008-05-11 至 2055-05-11'], '_fddbrzjhm_': '@id' },
  'success': true
});

// 获取历史审核数据列表
Mock.mock(/(\/portal\/getLsshData)/, {
  'msg': 'im msg',
  'code': 0,
  'ret': {
    'list|20': [
      { '_ztmc_': '@name', '_ztdm_': '@id', '_jycs_': '@name', '_fddbr_': '@name', '_cylx_': '@name', '_ztxz_': '@name', '_shzt_|1': ['通过', '不通过'], '_sczttjsj_': '2018-11-11', '_shjssj_': '2018-05-11' }
    ],
    'totalSize': '221'
  },
  'success': true
});

// 获取待审核和历史审核数据列表
Mock.mock(/(\/portal\/getDshShcxData)/, {
  'msg': 'im msg',
  'code': 0,
  'ret': {
    'list|20': [
      { '_ztmc_': '@name', '_ztdm_': '@id', '_jycs_': '@name', '_fddbr_': '@name', '_cylx_': '@name', '_ztxz_': '@name', '_shzt_|1': ['待审核', '通过', '未通过', '县级审核', '市级审核'], '_sczttjsj_': '2018-11-11', '_shjssj_': '2018-05-11' }
    ],
    'totalSize': '221'
  },
  'success': true
});

// 获取地区机构数据列表
Mock.mock(/(\/portal\/getJgData)/, {
  'msg': 'im msg',
  'code': 0,
  'ret|5-30': [
    { '_ssxzqh_': '@name', '_jgmc_': '@name', '_jgbm_': '@code' }
  ],
  'success': true
});

// 获取地区用户数据列表
Mock.mock(/(\/portal\/getUserData)/, {
  'msg': 'im msg',
  'code': 0,
  'ret|5-20': [
    { '_xm_': '@name', '_xb_|1': ['男', '女'], '_szdw_': '@address', '_zw_|1': ['部长', '处长', '科长'], '_sjh_': /^1\d{10}/, '_yhlb_|1': ['行政主管用户', '检测用户', '执法用户', '系统管理员'], '_zt_|1': [0, 1] }
  ],
  'success': true
});

// 获取角色数据列表
Mock.mock(/(\/portal\/getJsData)/, {
  'msg': 'im msg',
  'code': 0,
  'ret|5-20': [
    { '_jsmc_': '@name', '_bz_': '@string' }
  ],
  'success': true
});