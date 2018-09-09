<template>
  <div class="wrap fxyjpt" :class="{'max': maxContent}">
    <div class="p-left">
      <i class="fa fa-reorder" @click="maxContent=!maxContent"></i>
      <ul class="aside-nav">
        <li v-for="(item1,index) in navData" :key="'lay1'+index">
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
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Fxyjpt',
    components: {
      // 
    },
    props: {
      navData: {
        default: []
      }
    },
    data () {
      return {
        maxContent: false,
        navOption: {
          openIndex_1: '',
          activeIndex_1: '',
          activeIndex_2: ''
        }
      };
    },
    mounted: function () {
      // 
    },
    methods: {
      clkNavItem: function (arr) {
        var current = arr[arr.length - 1];
        var first = arr.length > 1 ? arr[0] : {};

        if (current.children && current.children.length > 0) {
          // 开启子节点
          this.navOption.openIndex_1 = this.navOption.openIndex_1 === current.id ? '' : current.id;
          this.navOption.activeIndex_2 = '';
        } else if (current.permValue) {
          // step1 - 跳转
          this.$root.toPage('', current.permValue);
          // step2 - 激活当前
          this.navOption.activeIndex_2 = current.id;
          // step3 - 激活最上层
          this.navOption.activeIndex_1 = first.id;
        }
      }
    }
  };
</script>

<style lang="scss">
  .fxyjpt {
    .wrap-tab {
      font-size: 14px;
      padding-left: 35px!important;
      background-color: #ccc!important;

      .active {
        border: 0!important;
        border-radius: 0!important;
      }
    }
  }
</style>
<style scoped lang="scss">
  .wrap {
    overflow: hidden;
    background-color: #222d32;

    >.p-left {
      position: relative;
      float: left;
      padding-top: 20px;
      padding-bottom: 20px;
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
        right: -35px;
        width: 35px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        font-size: 14px;
        color: #fff;
        background-color: var(--theme);
        filter: sepia(30%);
        z-index: 1;
        cursor: pointer;
      }
      .fa-reorder:hover {
        filter: sepia(0%);
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
      border-color: var(--theme);
    }  
  }
</style>