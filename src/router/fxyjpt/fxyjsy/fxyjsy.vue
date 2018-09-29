<template>
<div class="wrap">
  <div class="clearfix" v-for="(nav, index) in navData" :key="index"
    @mouseenter="active = index" @mouseleave="active = 0">
    <template v-if="nav.children">
      <div class="nav clearfix">
        <div class="left" :class="{'active': active == index}">
          <div class="wrap2">
            <div class="title">
              {{nav.name}}
            </div>
          </div>
        </div>
        <div class="item" v-for="(item, index) in nav.children" :key="index"
          @click="go(item)">
          {{item.name}}
        </div>
      </div>
    </template>
  </div>
</div>
</template>

<script>
export default {
  props: {
    navData: {
      default () {
        return [];
      }
    }
  },
  data () {
    return {
      active: 0
    };
  },
  methods: {
    go (item) {
      this.$root.toPage('', item.permValue);
    }
  },
  created () {
    for (const nav of this.navData) {
      if (!nav.children && nav.permValue !== 'stat:fxyjsy') {
        nav.children = [nav];
      }
    }
  }
};
</script>

<style scoped lang="scss">
.wrap{
  .nav{
    padding: 30px 0px 50px 100px;
    position: relative;
    border-bottom: 1px solid #787771;
  }
  .left{
    font-size: 20px;
    position: absolute;
    top: 0;
    bottom: -1px;
    left: 0;
    width: 80px;
    background: #223233;
    color: white;
    .wrap2{
      width: 100%;
      height: 100%;
      position: relative;
    }
    .title{
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      padding: 0 30px;
      transform: translateY(-60%);
    }
  }
  .left.active{
    background: #4C5755;
    bottom: 0;
  }
  .right{
    float: right;
    width: calc(100% - 80px);
  }
  .item{
    background: url('./item_bg.png') no-repeat center;
    background-size: contain;
    width: 160px;
    height: 150px;
    line-height: 150px;
    text-align: center;
    float: left;
    margin-top: 20px;
    margin-left: 20px;
    cursor: pointer;
    color: white;
  }
}
</style>
