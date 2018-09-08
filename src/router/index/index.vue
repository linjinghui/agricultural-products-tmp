<template>
  <div class="wrap" @click="optionMenu.show=false">
    <header>
      <a class="logo">AdminLTE</a>
      <nav>
        <a v-for="(item,index) in navData" :key="'nav_'+index" :class="{'active': active===index}" v-text="item.name" @click="clkNav(index)"></a>
      </nav>
      <nav class="l-r">
        <a><i class="fa fa-bell-o"></i></a>
        <a @click.stop="optionMenu.show=!optionMenu.show">
          <i class="fa fa-user"></i>
          <cmp-menu v-bind="optionMenu" @cbkClkItem="callbackMenu"></cmp-menu>
        </a>
        <a><i class="fa fa-cogs"></i></a>
      </nav>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
  import {Menu} from 'web-base-ui';

  export default {
    name: 'Index',
    components: {
      'cmpMenu': Menu
    },
    data () {
      return {
        active: '',
        navData: [
          {
            name: '首页',
            pathIndex: 2
          },
          {
            name: '溯源监管平台',
            pathIndex: 3
          },
          {
            name: '分析预警平台',
            pathIndex: 4
          },
          {
            name: '基础平台',
            pathIndex: 5
          }
        ],
        optionMenu: {
          show: false,
          data: ['密码修改', '退出登录'],
          result: []
        }
      };
    },
    mounted: function () {
      // 默认进入首页
      this.clkNav(0);
    },
    methods: {
      clkNav: function (index) {
        this.active = index;
        this.$root.toPage('', this.navData[index].pathIndex);
      },
      callbackMenu: function (data) {
        console.log('===callbackMenu====');
        console.log(data);
        if (data[0] === '密码修改') {
          this.$root.toPage('', 6);
        } else if (data[0] === '退出登录') {
          this.$root.toPage('', 0);
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

    >header {
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      color: #fff;
      background-color: #3c8dbc;
      user-select: none;

      .logo {
        float: left;
        width: 230px;
        font-size: 20px;
        font-weight: 700;
        text-align: center;
        background-color: #367fa9;
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
          background-color: #306f94;
        }
      }

      nav.l-r {
        float: right;
        font-size: 20px;
      }

      .wrap-menu {
        position: absolute;
        top: calc(100% + 0px);
        right: 0;
        width: 120px;
        color: #666;
        font-size: 16px;
        text-align: center;
        z-index: 1;
      }
    }
  }

  // 笔记本尺寸 1366 * 768
  @media screen and (max-width: 1366px) {}
</style>
