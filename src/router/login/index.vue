<template>
  <div class="wrap center-hv">
    <div class="form center-v" style="border: solid 0px;">
      <p class="title">福建省农产品质量安全追溯监管信息平台</p>
      <p class="subTitle">监管人员登录</p>
      <div class="wrap-form">
        <div class="form-layer">
          <label class="star">账号: </label>
          <cmp-input class="f-dom" maxlength="50" :autofocus="true" placeholder="请输入登录账号" v-model="account">
            <i class="cicon-tick center-v" slot="right" v-if="accountCheck===true"></i>
          </cmp-input>
          <i class="icon iconfont icon-jinzhi" v-show="accountCheck===false"></i><br>
          <small class="tip">{{accountCheck===false?'请填写账号':''}}&nbsp;</small>
        </div>
        <div class="form-layer">
          <label class="star">密码: </label>
          <cmp-input class="f-dom" :type="pwdType" maxlength="100" placeholder="请输入登录密码" v-model="password">
            <i class="cicon-xxx center-v icon iconfont icon-eye-close" slot="right" @click="changePwdType"></i>
          </cmp-input>
          <i class="icon iconfont icon-jinzhi" v-show="passwordCheck===false"></i><br>
          <small class="tip">{{passwordCheck===false?'请正确填写密码':''}}&nbsp;</small>
          <small class="tip find-pwd">忘记密码?</small>
        </div>
        <div class="form-layer">
          <label class="star">验证码: </label><br>
          <cmp-input class="f-dom ipt-vcode" maxlength="10" placeholder="请输入验证码" v-model="vcode"></cmp-input>
          <img class="vcode" :src="vcodeUrl" width="100" height="32" @click="getVcode">
        </div>
        <div class="form-layer" style="margin-top: 40px;">
          <cmp-button class="login" theme="#00a459" @click="clkLogin">登录</cmp-button>
          <cmp-checkbox class="rememberMe" theme="#00a459" v-model="rememberMe">记住我</cmp-checkbox>
        </div>
      </div>
      <p class="copyright">
        ©2017福建省农业厅版权所有 技术支持： 附件中科中欣智能科技有限公司
      </p>
    </div>
  </div>
</template>

<script>
  import {Input, Button, Checkbox} from 'web-base-ui';
  import {lsgGetData, lsgSaveData} from 'web-js-tool';
  import {ajaxGetVcode, ajaxLogin} from '../../data/ajax.js';
  
  export default {
    name: 'Login',
    components: {
      'cmpInput': Input,
      'cmpButton': Button,
      'cmpCheckbox': Checkbox
    },
    data () {
      return {
        pwdType: 'password',
        rememberMe: false,
        rememberMeKey: 'APT_ACCOUNT_PWD',
        account: '',
        accountCheck: '',
        password: '',
        passwordCheck: '',
        vcode: '',
        vcodeUrl: ''
      };
    },
    mounted: function () {
      // 获取记住的账号密码
      this.getRememberData();
      // 获取验证码
      this.getVcode();
      // this.$loading({
      //   // 显示、隐藏
      //   show: true,
      //   // 遮罩层
      //   modal: false
      // });
      // this.$prompt({
      //   // 显示、隐藏
      //   show: true,
      //   // 遮罩层
      //   modal: false
      // });
    },
    methods: {
      changePwdType: function () {
        this.pwdType = this.pwdType === 'text' ? 'password' : 'text';
      },
      forgetPwd: function () {
        alert('forgePwd');
      },
      clkLogin: function () {
        if (this.rememberMe) {
          // 记住账号密码
          lsgSaveData(this.rememberMeKey, {
            account: this.account,
            password: this.password
          });
        }
        console.log('account:' + this.account + ',password:' + this.password + ',vcode:' + this.vcode);
        // this.$loading({show: true});
        console.log('=========2============');
        console.log(this);
        // 登录
        ajaxLogin({
          account: this.account,
          password: this.password,
          vcode: this.vcode
        }, function (data) {
          // 
        });
      },
      getRememberData: function () {
        var rememberMeData = lsgGetData(this.rememberMeKey);

        if (rememberMeData && rememberMeData.account) {
          this.account = rememberMeData.account;
        }
        if (rememberMeData && rememberMeData.password) {
          this.password = rememberMeData.password;
        }
      },
      getVcode: function () {
        this.vcodeUrl = ajaxGetVcode();
      }
    }
  };
</script>

<style lang="scss">
  .wrap {

    .input {

      input {
        padding-left: 14px!important;
        border-radius: 4px;
      }
    }
    .input.pdrt {
      input {
        padding-right: 60px!important;
      }
      .cicon-cross-crle-chr-cpt {
        right: 40px!important;
      }
    }

    // ::-webkit-input-placeholder {
    //   font-size: 14px;
    // }
  }
</style>
<style scoped lang="scss">
// 1920*1080
  .wrap {
    max-width: 1500px;
    max-height: 800px;
    width: 80%;
    height: 90%;
    border-radius: 5px;
    font-size: 16px;
    background-color: #f3f3f3;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: right;
    background-image: url('./images/background.jpg');
    image-rendering: -webkit-optimize-contrast;

    >.form {
      margin-left: 10%;
      max-width: 690px;
      width: 50%;
      height: 590px;

      >.title {
        font-weight: 700;
        font-size: 30px;
        color: #2b2b2b;
      }

      >.subTitle {
        margin-top: 40px;
        margin-bottom: 20px;
        font-size: 20px;
        color: #00a459;
      }

      >.wrap-form {
        width: 400px;
      }

      .input {
        width: calc(100% - 30px);
        height: 44px;
        border-radius: 4px;
      }

      .ipt-vcode {
        width: calc(100% - 140px);
      }

      .form-layer {
        margin-top: 10px;
      }

      .tip,
      .find-pwd,
      .rememberMe {
        font-size: 12px;
        color: #ed6363;
      }

      .find-pwd {
        color: #666;
      }

      .vcode {
        float:right;
        margin-right:30px;
        width: 100px;
        height: 44px;
        vertical-align: middle;
        cursor: pointer;
      }

      .login {
        width: 130px;
        height: 40px;
        border-radius: 20px;
        font-size: inherit;
      }
      
      .find-pwd,
      .rememberMe {
        float: right;
        margin-right:30px;
        color: #666;
      }

      .cicon-tick {
        width: 30px;
        font-size: 20px;
        color: #4fa5ef;
        background-color: transparent;
      }

      .icon-jinzhi {
        font-size: 20px;
        color: #de2d33;
      }

      .icon-eye-close {
        width: 30px;
        font-size: 22px;
        color: #666;
        background-color: transparent;
        // transform: translateX(-3px);
        cursor: pointer;
      }

      .copyright {
        margin-top: 80px;
        font-size: 12px;
        color: #999;
        user-select: none;
      }
    } 
  }

</style>
