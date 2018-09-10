<template>
  <div class="wrap index" @click="optionMenu.show=false">
    <header>
      <a class="logo">监管系统</a>
      <nav>
        <a v-for="(item,index) in navData" :key="'nav_'+index" :class="{'active': active===index}" v-text="item.name" @click="clkNav(index,item)"></a>
      </nav>
      <nav class="l-r">
        <a><i class="fa fa-bell-o"></i></a>
        <a @click.stop="optionMenu.show=!optionMenu.show">
          <i class="fa fa-user"></i>
        </a>
        <a><i class="fa fa-cogs"></i></a>
      </nav>
      <cmp-menu v-bind="optionMenu" @cbkClkItem="callbackMenu"></cmp-menu>
    </header>
    <router-view :navData="leftNavData"></router-view>
  </div>
</template>

<script>
  import {Menu} from 'web-base-ui';
  import {getUserInfo, ajaxLoginout, ajaxGetAllDivisionTree} from '../../data/ajax.js';

  export default {
    name: 'Index',
    components: {
      'cmpMenu': Menu
    },
    data () {
      return {
        active: '',
        navData: getUserInfo().permissions || [],
        leftNavData: [],
        optionMenu: {
          show: false,
          data: ['密码修改', '退出登录'],
          result: []
        }
      };
    },
    mounted: function () {
      var _this = this;

      // 默认进入home页面
      this.clkNav(0, this.navData[0]);
      // 获取福建全省数据
      ajaxGetAllDivisionTree(function (data) {
        if (data.code === 0) {
          _this.$root.divisionTree = data.ret;
        } else {
          _this.$tip({ show: true, text: data.msg, theme: 'danger' });
        }
      });
    },
    methods: {
      clkNav: function (index, item) {
        this.active = index;
        this.leftNavData = item.children;
        this.$root.toPage('', item.permValue);
      },
      callbackMenu: function (data) {
        console.log('===callbackMenu====');
        console.log(data);
        if (data[0] === '密码修改') {
          this.$root.toPage('', 3);
        } else if (data[0] === '退出登录') {
          ajaxLoginout();
          this.$root.toPage('', 0);
        }
      }
    }
  };
</script>

<style lang="scss">
  
</style>
<style scoped lang="scss">
  .wrap.index {
    background-color: #fff;
    
    >header {
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      color: #fff;
      background-color: var(--theme);
      user-select: none;

      .logo {
        float: left;
        width: 230px;
        font-size: 20px;
        font-weight: 700;
        text-align: center;
        background-color: var(--theme);
        filter: sepia(30%);
      }

      nav {
        float: left;
        // margin-left: calc(50% - 230px);
        // transform: translateX(-50%);
        a {
          position: relative;
          float: left;
          padding-left: 20px;
          padding-right: 20px;
          cursor: pointer;
        }
        a.active,
        a:not(.logo):hover {
          background-color: var(--theme);
          filter: sepia(50%);
        }
      }

      nav.l-r {
        float: right;
        font-size: 20px;
      }

      .wrap-menu {
        position: absolute;
        top: 50px;
        right: 60px;
        width: 120px;
        color: #666;
        font-size: 16px;
        text-align: center;
        z-index: 1112;
      }
    }
  }

  // 笔记本尺寸 1366 * 768
  @media screen and (max-width: 1366px) {}
</style>
