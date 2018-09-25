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
// ===================[全局数据]===================

// // 将文件上传提交到服务
// Mock.mock(/(\/base_attachment\/uploadFile)/, {
//   'msg': 'im msg',
//   'code': 0,
//   'ret': {
//     'fileName': 'QQ图片20180919190924.png',
//     'fileSize': 334789,
//     'downloadUrl': 'http://wifino1.yourslink.com:10202/attachFiles/20180923/1/52A1152DEEEA4F691F5020873E03DB04.png',
//     'attachId': 1098
//   },
//   'success': true
// });


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

// // 获取栏目设置数据列表
// Mock.mock(/(\/news_column\/getAllList)/, {
//   'msg': 'im msg',
//   'code': 0,
//   'ret': {
//     'list|20': [
//       { 
//         'columnId': '@id', 
//         'columnName': '@name', 
//         // 是否启用，1是0否
//         'inuseFlg|1': [0, 1],
//         'createTime': new Date().getTime()
//       }
//     ],
//     'totalSize': '221'
//   },
//   'success': true
// });

// // 编辑|保存栏目数据
// Mock.mock(/(\/news_column\/saveOrUpdate)/, {
//   'msg': 'im msg',
//   'code': 0,
//   'ret': true,
//   'success': true
// });

// // 删除栏目数据
// Mock.mock(/(\/news_column\/delete)/, {
//   'msg': 'im msg',
//   'code': 0,
//   'ret': true,
//   'success': true
// });

// // 设置栏目状态
// Mock.mock(/(\/news_column\/setUseFlg)/, {
//   'msg': 'im msg',
//   'code': 0,
//   'ret': true,
//   'success': true
// });

// // 获取阅读信息列表
// Mock.mock(/(\/news_article\/getReadList)/, {
//   'msg': 'im msg',
//   'code': 0,
//   'ret': {
//     'list|20': [
//       { 
//         // 信息ID
//         'recId': '@id',
//         // 栏目名称
//         'columnName': '@name', 
//         // 信息标题
//         'title': '@string', 
//         // 信息发布时间
//         'createTime': new Date().getTime(),
//         // 发布人ID
//         'userId': '@id',
//         // 发布人姓名
//         'userName': '@name'
//       }
//     ],
//     'totalSize': '221'
//   },
//   'success': true
// });

// // 查看信息详情
// Mock.mock(/(\/news_article\/getArticleInfo)/, {
//   'msg': 'im msg',
//   'code': 0,
//   'ret': {
//     'recId': '@id',
//     'columnId': '@id',
//     'columnName': '@name',
//     'title': '@string',
//     'userId': '@id',
//     'userName': '@name',
//     'divCode': '350102',
//     // 是否有附件 1有
//     'attachFlg|1': [0, 1],
//     // 文章的发布状态：0草稿、1发布、2撤回、3删除
//     'status|1': [0, 1, 2, 3],
//     'content|1': ['<div>DIV内容展示</div><p style="color:red;">P原数展示</p>', '<p data-role="original-title" style="">原标题：丰收节，看习近平如何谋划这篇大文章</p><p>央视网消息：9月23日，中华大地亿万农民迎来首个“中国农民丰收节”。就在前两天，21日中共中央政治局就实施乡村振兴战略进行第八次集体学习时，中共中央总书记习近平代表党中央，向全国亿万农民致以节日的问候和良好的祝愿。22日的《新闻联播》原声播发了习近平总书记的问候和祝愿。</p><p>秋分时节，五谷丰登、瓜果飘香，举办中国农民丰收节正当其时。习近平指出，设立中国农民丰收节，是党中央研究决定的，进一步彰显了“三农”工作重中之重的基础地位，是一件影响深远的大事。</p><p>这个节日的设立，是习近平总书记主持召开中央政治局常委会会议审议通过，并由国务院批复同意的。由中央政治局常委会专门审议一个节日的设立，并不多见。这充分体现了以习近平同志为核心的党中央对“三农”工作的高度重视，对广大农民的深切关怀。</p><p>今年两会期间，习近平总书记就强调，实施乡村振兴战略是一篇大文章，要统筹谋划，科学推进。如何调动起亿万农民的积极性、主动性、创造性？如何提升亿万农民的荣誉感、幸福感、获得感？如何加快推进农业农村现代化？如何通过振兴乡村，开启城乡融合发展和现代化建设新局面？央视网和您一起，在总书记的“三农”金句中寻找实施乡村振兴战略的答案。 </p><p>新时代“三农”工作总抓手 </p><p>乡村振兴战略是党的十九大提出的一项重大战略，是关系全面建设社会主义现代化国家的全局性、历史性任务，是新时代“三农”工作总抓手。</p><p>——2018年9月21日，习近平主持中共中央政治局第八次集体学习时的讲话</p><p>乡村振兴不是坐享其成，等不来、也送不来，要靠广大农民奋斗。</p><p>——2018年4月24日至28日，习近平在湖北考察时的讲话</p><p>加快构建现代农业产业体系、生产体系、经营体系，把政府主导和农民主体有机统一起来，充分尊重农民意愿，激发农民内在活力，教育引导广大农民用自己的辛勤劳动实现乡村振兴。</p><p>——2018年4月24日至28日，习近平在湖北考察时的讲话</p><p>全面建成小康社会，城市和乡村都要发展好。乡村振兴，关键是产业要振兴。</p><p>——2018年4月11日至13日，习近平在海南考察时的讲话</p><p>实施乡村振兴战略。农业农村农民问题是关系国计民生的根本性问题，必须始终把解决好“三农”问题作为全党工作重中之重。</p><p>——2017年10月18日，习近平在中国共产党第十九次全国代表大会上的报告 </p><p>让亿万农民有更多实实在在的获得感、幸福感、安全感 </p><p>增强群众获得感和适应发展阶段的关系，要围绕农民群众最关心最直接最现实的利益问题，加快补齐农村发展和民生短板，让亿万农民有更多实实在在的获得感、幸福感、安全感，同时要形成可持续发展的长效机制，坚持尽力而为、量力而行，不能提脱离实际的目标，更不能搞形式主义和“形象工程”。</p><p>农业农村工作，说一千、道一万，增加农民收入是关键。要加快构建促进农民持续较快增收的长效政策机制，让广大农民都尽快富裕起来。</p><p>——2018年6月12日至14日，习近平在山东考察时的讲话</p><p>要鼓励和扶持农民群众立足本地资源发展特色农业、乡村旅游、庭院经济，多渠道增加农民收入。</p><p>——2018年4月11日至13日，习近平在海南考察时的讲话</p><p>促进农村一二三产业融合发展，支持和鼓励农民就业创业，拓宽增收渠道。</p><p>——2017年10月18日，习近平在中国共产党第十九次全国代表大会上的报告</p><p>增加农民收入，要构建长效政策机制，通过发展农村经济、组织农民外出务工经商、增加农民财产性收入等多种途径，不断缩小城乡居民收入差距，让广大农民尽快富裕起来。</p><p>——2016年4月25日，习近平在安徽凤阳县小岗村主持召开农村改革座谈会上的讲话</p><p>中国要强农业必须强，中国要美农村必须美，中国要富农民必须富。要坚持把解决好“三农”问题作为全党工作重中之重，加大推进新形势下农村改革力度，加强城乡统筹，全面落实强农惠农富农政策，促进农业基础稳固、农村和谐稳定、农民安居乐业。</p><p>——2016年4月25日，习近平在安徽凤阳县小岗村主持召开农村改革座谈会上的讲话 </p><p>加快推进农业农村现代化 </p><p>农业农村现代化是实施乡村振兴战略的总目标，坚持农业农村优先发展是总方针，产业兴旺、生态宜居、乡风文明、治理有效、生活富裕是总要求，建立健全城乡融合发展体制机制和政策体系是制度保障。</p><p>要在资金投入、要素配置、公共服务、干部配备等方面采取有力举措，加快补齐农业农村发展短板，不断缩小城乡差距，让农业成为有奔头的产业，让农民成为有吸引力的职业，让农村成为安居乐业的家园。</p><p>要让精英人才到乡村的舞台上大施拳脚，让农民企业家在农村壮大发展。城镇化、逆城镇化两个方面都要致力推动。城镇化进程中农村也不能衰落，要相得益彰、相辅相成。</p><p>——2018年3月7日，习近平参加十三届全国人大一次会议广东代表团审议时的讲话</p><p>将来还要引进职业农民，让大学生甚至是海归人才主动回乡务农，使得农业成为有奔头的产业。</p><p>——2018年3月8日，习近平参加十三届全国人大一次会议山东代表团审议时的讲话</p><p>要推进农业供给侧结构性改革，提高农业综合效益和竞争力。要以科技为支撑走内涵式现代农业发展道路，实现藏粮于地、藏粮于技。</p><p>——2016年3月8日，习近平参加十二届全国人大四次会议湖南代表团审议时的讲话</p><p>要加大强农惠农富农力度，推进农业现代化，多渠道增加农民收入，提高社会主义新农村建设水平，让农业农村成为可以进一步大有作为的广阔天地。</p><p>——2016年2月1日至3日，习近平春节前夕赴江西看望慰问广大干部群众时的讲话</p><p>要促进城乡区域协调发展，促进新型工业化、信息化、城镇化、农业现代化同步发展，在加强薄弱领域中增强发展后劲，着力形成平衡发展结构，不断增强发展整体性。</p><p>——2016年1月4日至6日，习近平在重庆调研时的讲话 </p><p>人才振兴是乡村振兴的基础 </p><p>实施乡村振兴战略，各级党委和党组织必须加强领导，汇聚起全党上下、社会各方的强大力量。</p><p>要充分发挥好乡村党组织的作用，把乡村党组织建设好，把领导班子建设强。人才振兴是乡村振兴的基础，要创新乡村人才工作体制机制，充分激发乡村现有人才活力，把更多城市人才引向乡村创新创业。</p><p>农村基层党组织要成为带领农民群众共同致富的主心骨和坚强战斗堡垒。</p><p>——2018年4月11日至13日，习近平在海南考察时的讲话</p><p>要推动乡村组织振兴，打造千千万万个坚强的农村基层党组织，培养千千万万名优秀的农村基层党组织书记，深化村民自治实践，发展农民合作经济组织，建立健全党委领导、政府负责、社会协同、公众参与、法治保障的现代乡村社会治理体制，确保乡村社会充满活力、安定有序。</p><p>——2018年3月8日，习近平参加十三届全国人大一次会议山东代表团审议时的讲话</p><p>村第一书记和驻村工作队，要真抓实干、坚持不懈，真正把让人民群众过上好日子作为自己的奋斗目标。</p><p>——2018年2月10日至13日，习近平春节前夕赴四川看望慰问各族干部群众时的讲话</p><p>农村要发展好，很重要的一点就是要有好班子和好带头人，希望大家在十九大精神指引下把村两委班子建设得更强。</p><p>——2017年12月12日至13日，习近平在江苏徐州考察时的讲话</p><p>加强农村基层基础工作，健全自治、法治、德治相结合的乡村治理体系。培养造就一支懂农业、爱农村、爱农民的“三农”工作队伍。</p><p>——2017年10月18日，习近平在中国共产党第十九次全国代表大会上的报告</p><p>（整理/田宏）<a href="//www.sohu.com/?strategyid=00001 " target="_blank" title="点击进入搜狐首页" id="backsohucom" style="white-space: nowrap;"><span class="backword"><i class="backsohu"></i>返回搜狐，查看更多</span></a></p><p data-role="editor-name" style="display: block;">责任编辑：<span>朱鹏英 UN603</span></p>']
//   },
//   'success': true
// });

// // 获取有发布权限的栏目列表
// Mock.mock(/(\/news_column\/getColumnList)/, {
//   'msg': 'im msg',
//   'code': 0,
//   'ret|10-24': [
//     {
//       'columnId': '@id',
//       'columnName': '@name'
//     }
//   ],
//   'success': true
// });

// // 获取用户自己发布的文章列表
// Mock.mock(/(\/news_article\/getMyPublishList)/, {
//   'msg': 'im msg',
//   'code': 0,
//   'ret': {
//     'list|20': [
//       { 
//         // 信息ID
//         'recId': '@id',
//         // 栏目名称
//         'columnName': '@name', 
//         // 信息标题
//         'title': '@string', 
//         // 信息发布时间
//         'createTime': new Date().getTime(),
//         // 发布人ID
//         'userId': '@id',
//         // 发布人姓名
//         'userName': '@name',
//         // 0草稿、1发布、2撤回、3删除
//         'status|1': [1, 2]
//       }
//     ],
//     'totalSize': '221'
//   },
//   'success': true
// });

// // 发布信息
// Mock.mock(/(\/news_article\/saveOrUpdate)/, {
//   'msg': 'im msg',
//   'code': 0,
//   'ret': true,
//   'success': true
// });

// // 设置文章状态操作
// Mock.mock(/(\/news_article\/setArticleStatus)/, {
//   'msg': 'im msg',
//   'code': 0,
//   'ret': true,
//   'success': true
// });

// // 获取监管信息列表
// Mock.mock(/(\/news_article\/getAdminList)/, {
//   'msg': 'im msg',
//   'code': 0,
//   'ret': {
//     'list|20': [
//       { 
//         // 信息ID
//         'recId': '@id',
//         // 栏目名称
//         'columnName': '@name', 
//         // 信息标题
//         'title': '@string', 
//         // 信息发布时间
//         'createTime': new Date().getTime(),
//         // 发布人ID
//         'userId': '@id',
//         // 发布人姓名
//         'userName': '@name',
//         // 0草稿、1发布、2撤回、3删除
//         'status|1': [1, 2]
//       }
//     ],
//     'totalSize': '221'
//   },
//   'success': true
// });






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