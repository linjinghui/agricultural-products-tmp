<template>
  <div class="wrap center-hv">
    <div class="form" style="border: solid 1px;">
      <p class="title">福建省农产品质量安全追溯监管信息平台</p>
      <p class="subTitle">监管人员登录</p>
      
    </div>
  </div>
</template>

<script>
  // import {InputIcon, Button} from 'web-base-ui';
  // import {ajaxLoginPortalByAccount, ajaxLoginPortalByToken, ajaxGetVerCode} from '../../data/ajax.js';
  
  export default {
    name: 'Login',
    components: {
      // cmpButton: Button
    },
    data () {
      return {
        // 
      };
    },
    mounted: function () {
      // this.$loading({
      //   // 显示、隐藏
      //   show: true,
      //   // 遮罩层
      //   modal: false
      // });
      this.$prompt({
        // 显示、隐藏
        show: true,
        // 遮罩层
        modal: false
      });
    },
    methods: {
      // 
    }
  };
</script>

<style lang="scss"></style>
<style scoped lang="scss">
// 1920*1080
  .wrap {
    max-width: 1500px;
    max-height: 800px;
    width:80%;
    height: 90%;
    border-radius: 5px;
    background-color: #f3f3f3;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: right;
    background-image: url('./images/background.jpg');
    image-rendering: -webkit-optimize-contrast;

    >.form {
      >.title {
        font-weight: 700;
        font-size: 26px;
        color: #2b2b2b;
      }

      >.subTitle {
        font-size: 20px;
        color: #00a459;
      }
    } 
  }

</style>
