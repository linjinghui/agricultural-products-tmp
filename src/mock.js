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