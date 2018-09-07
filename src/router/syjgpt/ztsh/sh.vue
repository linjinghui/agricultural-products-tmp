<template>
  <div class="wrap">
    <div class="wrap-form horiz">
      <div class="form-layer">
        <label class="star">主体名称:</label>
        <span class="f-dom" v-text="info._ztmc_"></span>
      </div>
      <div class="form-layer">
        <label class="star">主体代码:</label>
        <span class="f-dom" v-text="info._ztdm_"></span>
      </div>
      <div class="form-layer">
        <label class="star">经营场所:</label>
        <span class="f-dom" v-text="info._jycs_"></span>
      </div>
      <div class="form-layer">
        <label class="star">经营起止时间:</label>
        <span class="f-dom" v-text="info._jjqzsj_"></span>
      </div>
      <div class="form-layer">
        <label class="star">产业类型:</label>
        <span class="f-dom" v-text="info._cylx_"></span>
      </div>
      <div class="form-layer">
        <label class="star">法定代表人:</label>
        <span class="f-dom" v-text="info._fddbr_"></span>
      </div>
      <div class="form-layer">
        <label class="star">法定代表人证件类型:</label>
        <span class="f-dom">身份证</span>
      </div>
      <div class="form-layer">
        <label class="star">法定代表人证件号码:</label>
        <span class="f-dom" v-text="info._fddbrzjhm_"></span>
      </div>
      <div class="form-layer">
        <label class="star">主体性质:</label>
        <span class="f-dom" v-text="info._ztxz_"></span>
      </div>
      <div class="form-layer">
        <label class="star">负责人姓名:</label>
        <span class="f-dom" v-text="info._fzrxm_"></span>
      </div>
      <div class="form-layer">
        <label class="star">登录账号:</label>
        <span class="f-dom" v-text="info._dlzh_"></span>
      </div>
      <div class="form-layer">
        <label class="star" style="vertical-align:top;">营业执照:</label>
        <span class="f-dom">
          <img height="200" style="cursor:zoom-in" title="放大查看" :src="info._yyzz_" alt="照片载入中..." @click="clkViewImg">
        </span>
      </div>
      <div class="form-layer wrap-button" v-show="type==='sh'">
        <cmp-button theme="line" @click="clkNo">不通过</cmp-button>
        <cmp-button @click="clkTgbsh">通过并审核</cmp-button>
      </div>
    </div>
    <div style="padding-top:20px;border-top: solid 1px #ccc;" class="wrap-form horiz" v-show="type==='ck'">
      <div class="form-layer">
        <label class="star">生产主体提交时间:</label>
        <span class="f-dom">2018-05-01</span>
      </div>
      <div class="form-layer">
        <label class="star">身份验证时间:</label>
        <span class="f-dom">2018-05-02</span>
      </div>
      <div class="form-layer">
        <label class="star">验证失败原因:</label>
        <span class="f-dom">法人身份证号填写错误</span>
      </div>
      <div class="form-layer">
        <label class="star">县级审核时间:</label>
        <span class="f-dom">2018-05-03</span>
      </div>
      <div class="form-layer">
        <label class="star">审核失败原因:</label>
        <span class="f-dom">主体信息与所上传的营业执照图片不符</span>
      </div>
      <div class="form-layer">
        <label class="star">市级审核时间:</label>
        <span class="f-dom">2018-05-13</span>
      </div>
      <div class="form-layer">
        <label class="star">审核失败原因:</label>
        <span class="f-dom">主体信息与所上传的营业执照图片不符</span>
      </div>
    </div>
    <cmp-dialog class="class-1" v-model="optionDialog.show" v-bind="optionDialog" @callback="callbackDialog">
      <span slot="title">审批不通过原因</span>
      <div slot="content">
        <p>请选择审批不通过的原因，确定后将会通过短信或邮件的方式通知生产主体</p>
        <div class="wrap-form">
          <div class="form-layer">
            <label class="star"></label>
            <span class="f-dom">
              <cmp-checkbox v-model="btgyy.arr" :val="1">营业执照与填写的信息不符</cmp-checkbox>
            </span>
          </div>
          <div class="form-layer">
            <label class="star"></label>
            <span class="f-dom">
              <cmp-checkbox v-model="btgyy.arr" :val="2">主体名称不完全</cmp-checkbox>
            </span>
          </div>
          <div class="form-layer">
            <label class="star"></label>
            <span class="f-dom">
              <cmp-checkbox v-model="btgyy.arr" :val="3">主体代码填写错误</cmp-checkbox>
            </span>
          </div>
          <div class="form-layer">
            <label class="star"></label>
            <span class="f-dom">
              <cmp-checkbox v-model="btgyy.arr" :val="4">其他</cmp-checkbox>
            </span>
          </div>
          <div class="form-layer other">
            <label class="star"></label>
            <cmp-textarea class="f-dom" v-model="btgyy.other" v-bind="optionTextarea" :disabled="btgyy.arr.indexOf(4)<0"></cmp-textarea>
            <small class="tip" v-show="btgyy.arr.indexOf(4)>=0&&btgyy.other.length===0">* 其他原因不能为空</small>
          </div>
        </div>
      </div>
    </cmp-dialog>
  </div>
</template>

<script>
  import {Tab, Button, Dialog, Checkbox, Textarea} from 'web-base-ui';
  import {ajaxGetDshInfo} from '../../../data/ajax.js';

  export default {
    name: 'Sh',
    components: {
      'cmpTab': Tab,
      'cmpButton': Button,
      'cmpDialog': Dialog,
      'cmpCheckbox': Checkbox,
      'cmpTextarea': Textarea
    },
    props: {
      type: {
        // sh | ck
        default: 'sh'
      }
    },
    data () {
      return {
        info: {},
        optionDialog: {
          show: false,
          modal: true,
          stl: {
            header: {
              // left|center
              'text-align': 'left'
            },
            footer: {
              // left|center|right
              'text-align': 'right'
            }
          },
          buttons: [{
            text: '取消',
            theme: 'line'
          }, {
            text: '确定',
            theme: 'primary'
          }]
        },
        optionTextarea: {
          'placeholder': '请输入其他原因',
          'rows': '3',
          'maxlength': '500'
        },
        btgyy: {
          arr: [],
          other: ''
        }
      };
    },
    mounted: function () {
      this.getDetailData();
    },
    methods: {
      clkViewImg: function () {
        window.open(this.info._yyzz_);
      },
      clkTgbsh: function () {
        var _this = this;

        this.$confirm({
          show: true,
          modal: false,
          heading: '提交至市级审核？',
          content: '提交之后，该主体信息将转入到历史审核界面中',
          type: '',
          stl: {
            header: {
              'text-align': 'center'
            },
            section: {
              'text-align': 'center'
            },
            footer: {
              'text-align': 'center'
            }
          },
          buttons: [{
            text: '取消',
            theme: 'line'
          }, {
            text: '确定',
            theme: 'primary'
          }],
          callback: function (data) {
            console.log('==========提交至市级审核？=======');
            console.log(data);
            _this.$confirm({ show: false });
            if (data.text === '确定') {
              _this.$emit('callback');
            }
          }
        });
      },
      clkNo: function () {
        this.btgyy = {
          arr: [],
          other: ''
        };
        this.optionDialog.show = true;
      },
      getDetailData: function () {
        var _this = this;

        ajaxGetDshInfo({}, function (data) {
          if (data.code === 0) {
            _this.info = data.ret;
          } else {
            _this.$tip({ show: true, text: data.msg, theme: 'danger' });
          }
        });
      },
      callbackDialog: function (data) {
        console.log('==========callbackDialog=======');
        this.optionDialog.show = false;
        if (data.text === '确定') {
          this.$emit('callback');
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
    padding-top: 20px;

    >.wrap-form.horiz {
      width: 680px;

      >.form-layer {

        >label {
          margin-right: 30px;
          width: 200px;
        }

        >.f-dom {
          width: calc(100% - 200px - 30px - 10px);
        }
      }

      >.form-layer.wrap-button {
        width: 100%;
        text-align:center;

        >.button {
          margin-left: 20px;
          width: 180px;
          height: 36px;
          border-radius: 4px;
        }
      }
    }
    .wrap-dialog {
      width: 720px;
      height: 400px;

      .wrap-form {
        margin-top: 20px;

        >.form-layer {
          padding-left: 20px;

          >label {
            // display: none;
          }
        }
      }
    }
  }

  // 笔记本尺寸 1366 * 768
  @media screen and (max-width: 1366px) {}
</style>
