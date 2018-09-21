<template>
  <div id="app">
    <router-view></router-view>
    <loading v-model="optionLoading.show" v-bind="optionLoading"></loading>
    <tip v-model="optionTip.show" v-bind="optionTip"></tip>
    <confirm v-bind="optionConfirm" v-model="optionConfirm.show">
      <span slot="title" v-html="optionConfirm.heading"></span>
      <span slot="content" v-html="optionConfirm.content"></span>
    </confirm>
    <prompt v-bind="optionPrompt" v-model="optionPrompt.show">
      <span slot="title" v-html="optionPrompt.heading"></span>
    </prompt>
  </div>
</template>

<script>
  import Vue from 'vue';

  export default {
    name: 'app',
    data: function () {
      return {
        swidth: document.documentElement.clientWidth || document.body.clientWidth,
        sheight: document.documentElement.clientHeight || document.body.clientHeight,
        optionLoading: {
          show: false,
          text: '请您稍后！',
          modal: false
        },
        optionTip: {
          show: false,
          // left|center
          textAlign: '',
          // primary|success|info|warning|danger|自定义
          theme: 'success'
        },
        optionPrompt: {
          show: false,
          modal: true,
          heading: '标题',
          stl: {
            footer: {
              // left|center|right
              'text-align': 'right'
            }
          },
          buttons: [{
            text: '取消',
            // primary|success|info|warning|danger|#f56c6c
            theme: 'line'
          }, {
            text: '确认',
            theme: 'success'
          }]
        },
        optionConfirm: {
          show: false,
          modal: false,
          heading: '标题',
          content: '文本内容',
          // error|success|warning
          type: 'success',
          stl: {
            header: {
              // left|center
              'text-align': 'center'
            },
            section: {
              // left|center|right
              'text-align': 'center'
            },
            footer: {
              // left|center|right
              'text-align': 'center'
            }
          },
          buttons1: [],
          buttons: [{
            text: '放弃修改',
            // primary|success|info|warning|danger|#f56c6c
            theme: 'line'
          }, {
            text: '修改',
            theme: 'warning'
          }]
        },
        // 福建省区域数据
        divisionTree: [],
        // 产业类型
        cylx: [ 
          {text: '蔬菜', value: 1}, 
          {text: '食用菌', value: 2}, 
          {text: '水果', value: 3}, 
          {text: '茶叶', value: 4}, 
          {text: '中药材', value: 5}, 
          {text: '家畜', value: 6}, 
          {text: '家禽', value: 7}, 
          {text: '蛋', value: 8},
          {text: '奶', value: 9}
        ],
        // 主体性质
        ztxz: [ 
          {text: '省级以上龙头企业', value: 1}, 
          {text: '设区市级龙头企业', value: 2}, 
          {text: '其他生产企业', value: 3}, 
          {text: '示范社', value: 4}, 
          {text: '规范社', value: 5}, 
          {text: '合作社', value: 6}, 
          {text: '家庭农场', value: 7} 
        ]
      };
    },
    mounted: function () {
      let _this = this;

      window.addEventListener('resize', this.winResize);
      Vue.prototype.$loading = function (option) {
        _this.optionLoading = Object.assign(_this.optionLoading, option);
      };
      Vue.prototype.$tip = function (option) {
        _this.optionTip = Object.assign(_this.optionTip, option);
      };
      Vue.prototype.$confirm = function (option) {
        _this.optionConfirm = Object.assign(_this.optionConfirm, option);
      };
      Vue.prototype.$prompt = function (option) {
        _this.optionPrompt = Object.assign(_this.optionPrompt, option);
      };
    },
    watch: {
      //
    },
    methods: {
      toPage: function (path, type) {
        // alert(type);
        if (!path) {
          switch (type) {
            case 0:
              // 登录页
              path = '/#/login';
              break;
            case 1:
              path = '/#/index';
              break;
            case 2:
              // 首页
              path = '/#/home';
              break;
            case 3:
              // 修改密码
              path = '/#/mmxg';
              break;
            case 'admin':
              // ------------溯源监管平台
              path = '/#/syjgpt';
              break;
            case 'admin:ztsh:dsh':
              // -----------------------ztsh--待审核
              path = '/#/dsh';
              break;
            case 'admin:ztsh:lssh':
              // -----------------------ztsh--历史审核
              path = '/#/lssh';
              break;
            case 'admin:ztsh:shcx':
              // -----------------------ztsh--审核查询
              path = '/#/shcx';
              break;
            case 'admin:ztdaxc:zucx':
              // -----------------------ztdaxc--主体巡查
              path = '/#/ztxc';
              break;
            case 'admin:ztdaxc:yjxc':
              // -----------------------ztdaxc--预警巡查
              path = '/#/yjcx';
              break;
            case 'admin:ztdaxc:GISxc':
              // -----------------------ztdaxc--GIS巡查
              path = '/#/giszs';
              break;
            case 'admin:ztdaxc:mcqy':
              // -----------------------ztdaxc--明星企业
              path = '/#/mcqy';
              break;
            case 'admin:ztdaxc:hmdqy':
              // -----------------------ztdaxc--黑名单企业
              path = '/#/hmdqy';
              break;
            case 'admin:scgcxj:cpjbxxxc':
              // -----------------------scgcxj--产品基本信息巡查
              path = '/#/cpjbxxxc';
              break;
            case 'admin:scgcxj:scxkjg':
              // -----------------------scgcxj--生产许可监管
              path = '/#/scxkjg';
              break;
            case 'admin:scgcxj:scjhxc':
              // -----------------------scgcxj--生产计划巡查
              path = '/#/scjhxc';
              break;
            case 'admin:scgcxj:nzjtrpxc':
              // -----------------------scgcxj--农资及投入品巡查
              path = '/#/nzjtrpxc';
              break;
            case 'admin:scgcxj:scgghjxc':
              // -----------------------scgcxj--生产各个环节巡查
              path = '/#/scghjxc';
              break;
            case 'admin:scgcxj:ccpxxxc':
              // -----------------------scgcxj--产成品信息巡查
              path = '/#/ccpxxxc';
              break;
            case 'admin:scgcxj:jcxxxc':
              // -----------------------scgcxj--检测信息巡查
              path = '/#/jcxxxc';
              break;
            case 'admin:fmxxxc:fmxcxx':
              // -----------------------fmxxxc--赋码信息巡查
              path = '/#/fmxxxc';
              break;
            case 'admin:fmxxxc:sslxxc':
              // -----------------------fmxxxc--销售流向巡查
              path = '/#/xslxxc';
              break;
            case 'admin:jggl:xcwt':
              // -----------------------jggl--巡查问题
              path = '/#/xcwt';
              break;
            case 'admin:jggl:ajgl':
              // -----------------------jggl--案件管理
              path = '/#/ajgl';
              break;
            case 'admin:jggl:jypgl':
              // -----------------------jggl--禁用品管理
              path = '/#/jypgl';
              break;
            case 'admin:jggl:hmdgl':
              // -----------------------jggl--黑名单管理
              path = '/#/hmdgl';
              break;
            case 'admin:jggl:xzchgl':
              // -----------------------jggl--行政处罚管理
              path = '/#/xzcfgl';
              break;
            case 'admin:jggl:jdjcgl':
              // -----------------------jggl--监督检查管理
              path = '/#/jdjcgl';
              break;
            case 'admin:fwts:lmsz':
              // -----------------------fwts--栏目设置
              path = '/#/lmsz';
              break;
            case 'admin:fwts:ydxx':
              // -----------------------fwts--阅读信息
              path = '/#/ydxx';
              break;
            case 'admin:fwts:fbxx':
              // -----------------------fwts--发布信息
              path = '/#/fbxx';
              break;
            case 'admin:fwts:xxjg':
              // -----------------------fwts--信息监管
              path = '/#/xxjg';
              break;
            case 'admin:gzjd:jgdlrzcx':
              // -----------------------gzjd--监管登录日志查询
              path = '/#/jgdlrzcx';
              break;
            case 'admin:gzjd:jgczrzcx':
              // -----------------------gzjd--监管操作日志查询
              path = '/#/jgczrzcx';
              break;
            case 'admin:gzjd:scztdlrzcx':
              // -----------------------gzjd--生产主体登录日志查询
              path = '/#/scztdlrzcx';
              break;
            case 'admin:gzjd:scztczrzcx':
              // -----------------------gzjd--生产主体操作日志查询
              path = '/#/scztczrzcx';
              break;
            case 'stat':
              // ------------分析预警平台
              path = '/#/fxyjpt';
              break;
            case 'stat:jcyjpz:fxpz':
              // -----------------------jcyjpz--风险配置
              path = '/#/fxpz';
              break;
            case 'stat:jcyjpz:fxzbyzpz':
              // -----------------------jcyjpz--风险指标阈值配置
              path = '/#/fxzbfzpz';
              break;
            case 'stat:jcyjpz:fxgxrpz':
              // -----------------------jcyjpz--风险干系人配置
              path = '/#/fxgxrpz';
              break;
            case 'stat:fxyjcpz:ksjcfxjc':
              // -----------------------fxyjcgl--快速检测风险监测
              path = '/#/ksjcfxjc';
              break;
            case 'stat:fxyjcpz:qyzzyzjc':
              // -----------------------fxyjcgl--企业种植养殖监测
              path = '/#/qyzzyzjc';
              break;
            case 'stat:fxyjcpz:syycpcljc':
              // -----------------------fxyjcgl--食用农产品产量监测
              path = '/#/syncpcljc';
              break;
            case 'stat:fxyjcpz:syncpcljc':
              // -----------------------fxyjcgl--食用农产品药残风险监测
              path = '/#/syncpycfxjc';
              break;
            case 'stat:fxyjcpz:syncpzlfxjc':
              // -----------------------fxyjcgl--食用农产品质量风险监测
              path = '/#/syncpzlfxjc';
              break;
            case 'stat:fxyjcpz:syxxtxjc':
              // -----------------------fxyjcgl--溯源信息填写监测
              path = '/#/syxxtxjc';
              break;
            case 'stat:sjtj:cpgylfx':
              // -----------------------sjtj--产品供应量分析
              path = '/#/cpgylfx';
              break;
            case 'stat:sjtj:jdjcxxtj':
              // -----------------------sjtj--监督检查信息统计
              path = '/#/jdjcxxtj';
              break;
            case 'stat:sjtj:pthydfx':
              // -----------------------sjtj--平台活跃度分析
              path = '/#/pthydfx';
              break;
            case 'stat:sjtj:xzchxxtj':
              // -----------------------sjtj--行政处罚信息统计
              path = '/#/xzcfxxtj';
              break;
            case 'stat:sjtj:zscxlfx':
              // -----------------------sjtj--追溯查询量分析
              path = '/#/zscxlfx';
              break;
            case 'bases':
              // 基础平台
              path = '/#/jcpt';
              break;
            case 'bases:xtgl:zzjggl':
              // -----------------------xtgl--组织机构管理
              path = '/#/zzjggl';
              break;
            case 'bases:xtgl:yhgl':
              // -----------------------xtgl--用户管理
              path = '/#/yhgl';
              break;
            case 'bases:xtgl:jsjqxgl':
              // -----------------------xtgl--角色及权限管理
              path = '/#/jsjqxgl';
              break;
            default:
              path = '/#/home';
          }
        }
        var search = location.href.split('?');

        if (search.length !== 2) {
          search = '';
        } else {
          search = '?' + search[1];
        }
        window.location.href = location.origin + path + search;
      },
      winResize: function () {
        this.swidth = document.documentElement.clientWidth || document.body.clientWidth;
        this.sheight = document.documentElement.clientHeight || document.body.clientHeight;
      }
    }
  };
</script>

<style type="text/css">
  /* 自定义主体色 */
  #app {
    --theme: #00a65a;
  }
  #app {
    position: relative;
    width: 100%;
    height: 100%;
    min-width: 1350px;
    min-height: 630px;
    overflow: auto;
    background-color: #3d484e;
  }
  .flatpickr-calendar .flatpickr-day.selected,
  .flatpickr-calendar .flatpickr-day.selected:hover {
    background: #00a65a;
    border-color: #00a65a;
  }
  .wrap-confirm > footer > .button:last-of-type {
    background-color: var(--theme)!important;
  }
  .wrap-dialog > footer > .button:last-of-type {
    background-color: var(--theme)!important;
  }
  .wrapper-pagebar-pagesize .pagebar-wrapper span.active {
    background-color: var(--theme)!important;
  }
  .button.theme {
    background-color: var(--theme)!important;
  }
  .wrap-menu > .line:active,
  .wrap-menu > .line.active {
    color: var(--theme)!important;
  }
  .radio > .selected {
    border-color: var(--theme)!important;
    background-color: var(--theme)!important;
  }
 .checkbox > .cicon-tick-cbdr {
    border-color: var(--theme)!important;
    background-color: var(--theme)!important;
  }
  .input > input:not([readonly]):focus {
    border-color: var(--theme)!important;
  }
  .text-area.focus {
    border-color: var(--theme)!important;
  }
</style>

<style lang="scss" class="cssForm">
  // 默认垂直布局
  .wrap-form {

    // 单层
    >.form-layer {

      >label {
        line-height: 30px;
      }

      >.f-dom {
        display: inline-block;
        width: 100%;
      }

      >.tip {
        color: red;
        line-height: 20px;
      }
    }
    
    // 单层水平
    >.form-layer.horiz {
      position: relative;
      
      >label {
        display: inline-block;
        margin-right: 10px;
        width: 100px;
        text-align: right;
      }

      >.f-dom {
        width: calc(100% - 100px - 5px - 10px);
      }
    }
  }

  // 水平布局
  .wrap-form.horiz {

    // 单层
    >.form-layer {
      position: relative;
      margin-bottom: 14px;
      
      >label {
        display: inline-block;
        margin-right: 10px;
        width: 100px;
        text-align: right;
      }

      >.f-dom {
        width: calc(100% - 100px - 5px - 10px);
      }

      >.tip {
        position: absolute;
        top: 0;
        left: calc(100% + 10px);
        line-height: 30px;
        white-space: nowrap;
        word-wrap: break-word;
        word-break: normal;
        z-index: 1;
      }
    }

    // 单层垂直
    >.form-layer.vert {

      >label {
        display: unset;
        margin-right: unset;
        width: unset;
        text-align: unset;
      }

      >.f-dom {
        width: 100%;
      }

      >.tip {
        top: 30px;
      }
    }
  }
</style>

