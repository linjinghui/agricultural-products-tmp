<template>
  <div class="wrap" :class="{'max': maxContent}">
    <div class="p-left">
      <i class="fa fa-reorder" @click="maxContent=!maxContent"></i>
      <ul class="aside-nav">
        <li v-for="(item1,index) in navOption.navData" :key="'lay1'+index">
          <a :class="{'active':navOption.activeIndex_1===item1.id, 'open': navOption.openIndex_1===item1.id}" @click="clkNavItem([item1])">
            <i class="i-l" :class="item1.icon">&nbsp;</i>
            <span>{{item1.name}}</span>
            <i class="i-r arrow fa fa-sort-desc" v-if="item1.children&&item1.children.length>0"></i>
          </a>
          <ul :style="{maxHeight:navOption.openIndex_1===item1.id?item1.children.length*36+'px':'0px'}">
            <li v-for="(item2,index) in item1.children" :key="'lay2'+index">
              <a :class="{'active':navOption.activeIndex_2===item2.id}" @click="clkNavItem([item1,item2])">
                <i class="i-l">&nbsp;</i>
                <span>{{item2.name}}</span>
                <i class="i-r arrow fa fa-sort-desc" v-if="item2.children&&item2.children.length>0"></i>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="p-content">
      <component :is="currentTabComponent"></component>
    </div>
  </div>
</template>

<script>
  // const Dsh = () => import('./ztsh/dsh.vue');
  const Dsh = require('./ztsh/dsh.vue');

  export default {
    name: 'Syjgpt',
    components: {
      // 
    },
    data () {
      return {
        maxContent: false,
        navOption: {
          openIndex_1: '',
          activeIndex_1: '',
          activeIndex_2: '',
          navData: [
            {
              id: '1',
              name: '主体审核',
              icon: 'fa fa-file-excel-o',
              url: '',
              children: [
                {
                  id: '1-1',
                  name: '待审核',
                  icon: '',
                  url: 'https://www.baidu.com?t=1',
                  children: []
                },
                {
                  id: '1-2',
                  name: '历史审核',
                  icon: '',
                  url: 'https://www.baidu.com?t=2',
                  children: []
                }
              ]
            },
            {
              id: '2',
              name: '主体档案巡查',
              icon: 'fa fa-archive',
              children: [
                {
                  id: '2-1',
                  name: '主体巡查',
                  icon: '',
                  url: '',
                  children: []
                },
                {
                  id: '2-2',
                  name: '预警查询',
                  icon: '',
                  url: '',
                  children: []
                },
                {
                  id: '2-3',
                  name: 'GIS展示',
                  icon: '',
                  url: '',
                  children: []
                }
              ]
            },
            {
              id: '4',
              name: '生产过程巡查',
              icon: 'fa fa-archive',
              children: [
                {
                  id: '4-1',
                  name: '产品基本信息巡查',
                  icon: '',
                  children: []
                },
                {
                  id: '4-2',
                  name: '生产许可监管',
                  icon: '',
                  children: []
                },
                {
                  id: '4-3',
                  name: '生产计划巡查',
                  icon: '',
                  children: []
                },
                {
                  id: '4-4',
                  name: '农资及投入品巡查',
                  icon: '',
                  children: []
                },
                {
                  id: '4-5',
                  name: '生产各环节巡查',
                  icon: '',
                  children: []
                },
                {
                  id: '4-6',
                  name: '产成品信息巡查',
                  icon: '',
                  children: []
                },
                {
                  id: '4-7',
                  name: '检测信息巡查',
                  icon: '',
                  children: []
                }
              ]
            },
            {
              id: '5',
              name: '赋码信息巡查',
              icon: 'fa fa-archive',
              children: [
                {
                  id: '5-1',
                  name: '赋码信息巡查',
                  icon: '',
                  children: []
                },
                {
                  id: '5-2',
                  name: '销售流向巡查',
                  icon: '',
                  children: []
                }
              ]
            },
            {
              id: '6',
              name: '监管管理',
              icon: 'fa fa-archive',
              children: [
                {
                  id: '6-1',
                  name: '巡查问题',
                  icon: '',
                  children: []
                },
                {
                  id: '6-2',
                  name: '按键管理',
                  icon: '',
                  children: []
                },
                {
                  id: '6-3',
                  name: '禁用品管理',
                  icon: '',
                  children: []
                },
                {
                  id: '6-4',
                  name: '黑名单管理',
                  icon: '',
                  children: []
                },
                {
                  id: '6-5',
                  name: '行政处罚管理',
                  icon: '',
                  children: []
                },
                {
                  id: '6-6',
                  name: '监督检查管理',
                  icon: '',
                  children: []
                }
              ]
            },
            {
              id: '7',
              name: '服务信息推送',
              icon: 'fa fa-archive',
              children: [
                {
                  id: '7-1',
                  name: '服务信息推送管理',
                  icon: '',
                  children: []
                }
              ]
            },
            {
              id: '8',
              name: '工作监督',
              icon: 'fa fa-archive',
              children: [
                {
                  id: '8-1',
                  name: '监管登录日志查询',
                  icon: '',
                  children: []
                },
                {
                  id: '8-2',
                  name: '监管操作日志查询',
                  icon: '',
                  children: []
                },
                {
                  id: '8-3',
                  name: '生产主体登录日志查询',
                  icon: '',
                  children: []
                },
                {
                  id: '8-4',
                  name: '生产主体操作日志查询',
                  icon: '',
                  children: []
                }
              ]
            },
            {
              id: '9',
              name: '系统管理',
              icon: 'fa fa-cog',
              children: [
                {
                  id: '3-1',
                  name: '组织机构管理',
                  icon: '',
                  url: 'https://www.baidu.com?t=3',
                  children: []
                },
                {
                  id: '3-2',
                  name: '角色管理',
                  icon: '',
                  url: 'https://www.baidu.com?t=4',
                  children: []
                },
                {
                  id: '3-3',
                  name: '角色及权限管理',
                  icon: '',
                  url: 'https://www.baidu.com?t=5',
                  children: []
                }
              ]
            }
          ]
        },
        currentTabComponent: ''
      };
    },
    mounted: function () {
      // const dsh = () => import('./ztsh/dsh.vue');

      console.log('============');
      console.log(Dsh);
      this.currentTabComponent = Dsh;
    },
    methods: {
      clkNavItem: function (arr) {
        var current = arr[arr.length - 1];
        var first = arr.length > 1 ? arr[0] : {};

        // 激活节点
        if (current.url) {
          // step1 - 跳转
          console.log('跳转：' + current.url);
          // step2 - 激活当前
          this.navOption.activeIndex_2 = current.id;
          // step3 - 激活最上层
          this.navOption.activeIndex_1 = first.id;
        } else if (current.children && current.children.length > 0) {
          // 开启子节点
          this.navOption.openIndex_1 = this.navOption.openIndex_1 === current.id ? '' : current.id;
          this.navOption.activeIndex_2 = '';
        }
      }
    }
  };
</script>

<style lang="scss">
  .wrap {}
</style>
<style scoped lang="scss">
  .wrap {
    overflow: hidden;
    background-color: #222d32;

    >.p-left {
      position: relative;
      float: left;
      padding-top: 20px;
      width: 230px;
      height: 100%;
      color: #fff;
      transition: width .3s ease;

      .fa {
        font-size: 18px;
      }

      .fa-reorder {
        position: absolute;
        top: 0;
        right: -30px;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 14px;
        color: #fff;
        background-color: #367fa9;
        z-index: 1;
        cursor: pointer;
      }
      .fa-reorder:hover {
        background-color: #00c1de;
      }
    }
    >.p-content {
      float: left;
      width: calc(100% - 230px);
      background-color: #fff;
      transition: width .3s ease;
    }
  }

  .wrap.max {

    >.p-left {
      width: 58px;

      >.aside-nav > li > a > *,
      >.aside-nav ul {
        display: none;
      }

      >.aside-nav > li > a > .i-l {
        display: unset;
      }
    }

    >.p-content {
      width: calc(100% - 58px);
    }
  }

  // 笔记本尺寸 1366 * 768
  @media screen and (max-width: 1366px) {}
</style>
<style scoped lang="scss" class="nav-css">
  .wrap {
    /* 全局 */
    .aside-nav {
      position: relative;
      width: 100%;
      color: #b8c7ce;
      font-size: 14px;
      user-select: none;
    }
    .aside-nav li > a {
      display: block;
      padding: 12px 5px 12px 15px;
      cursor: pointer;
    }
    .aside-nav li > a > * {
      display: inline-block;
      min-width: 20px;
      min-height: 20px;
      font-style: normal;
      vertical-align: middle;
    }
    .aside-nav li > a > .i-l {
      border: solid 1px transparent;
    }
    .aside-nav li > a > .i-r {
      float: right;
      border: solid 1px transparent;
    }
    .aside-nav li > a > .arrow {
      line-height: 14px;
      text-align: center;
      transform: rotate(90deg);
      transition: transform .4s ease;
    }
    .aside-nav li > a.open > .arrow {
      transform: rotate(0deg);
    }
      
    /* 除了最上层 */
    .aside-nav ul {
      width: 100%;
      overflow: hidden;
      color: #8aa4af;
      /* background-color: #2c3b41; */
      transition: max-height .4s ease;
    }
    .aside-nav ul > li > a {
      padding-top: 7px;
      padding-bottom: 7px;
    }
    .aside-nav ul > li > a.active,
    .aside-nav ul > li > a:hover {
      color: #fff;
    }

    /* 最上层 */
    .aside-nav > li > a {
      border-color: transparent;
      border-left: solid 3px transparent;
    }
    .aside-nav > li > ul > li > a {
      padding-left: 22px;
    }
    .aside-nav > li > ul > li > ul > li > a {
      padding-left: 32px;
    }

    /* theme */
    .aside-nav > li > a.open,
    .aside-nav > li > a:hover {
      color: #fff;
      background-color: #1e282c;
    }
    .aside-nav > li > a.active {
      border-color: #3c8dbc;
    }  
  }
</style>