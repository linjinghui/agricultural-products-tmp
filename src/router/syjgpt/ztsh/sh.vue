<template>
  <div class="wrap sh">
    <table class="wrap-scztxx" v-if="type==='sh'||type==='ck'">
      <thead>
        <tr><td colspan="4">生产主体基本信息</td></tr>
      </thead>
      <tbody>
        <tr>
          <td>主体名称：</td><td v-text="data.entName"></td>
          <td>主体代码：</td><td v-text="data.entUnicode"></td>
        </tr>
        <tr :style="{'color': data.entStatus===3&&'red'}">
          <td>经营场所：</td><td v-text="data.busiPlace"></td>
          <td>经营范围：</td><td v-text="data.busiScope"></td>
        </tr>
        <tr>
          <td>经营起止时间：</td><td v-text="data.busiStartDate+'-'+data.busiEndDate"></td>
          <td>产业类型：</td><td v-text="data.entIndustrySub"></td>
        </tr>
        <!-- <tr>
          <td>生产规模：</td><td>1</td>
          <td></td><td></td>
        </tr> -->
        <tr>
          <td>法定代表人：</td><td v-text="data.legal"></td>
          <td>法定代表人证件类型：</td><td v-text="data.licType==='01'?'身份证':data.principalLicType==='02'?'港澳通行证':data.principalLicType==='03'?'签证':data.principalLicType==='04'?'护照':''"></td>
        </tr>
        <tr>
          <td>法定代表人证件号码：</td><td v-text="data.licNo"></td>
          <td></td><td></td>
        </tr>
        <tr>
          <td>负责人姓名：</td><td v-text="data.principalName"></td>
          <td>负责人证件类型：</td><td v-text="data.principalLicType==='01'?'身份证':data.principalLicType==='02'?'港澳通行证':data.principalLicType==='03'?'签证':data.principalLicType==='04'?'护照':''"></td>
        </tr>
        <tr>
          <td>负责人证件号码：</td><td v-text="data.principalLicNo"></td>
          <td>负责人手机：</td><td v-text="data.principalMobile"></td>
        </tr>
        <tr>
          <td>负责人固定电话：</td><td v-text="data.principalTel"></td>
          <td>负责人传真号码：</td><td v-text="data.principalFax"></td>
        </tr>
        <tr>
          <td>负责人邮箱：</td><td v-text="data.principalFax"></td>
          <td></td><td></td>
        </tr>
        <tr>
          <td>主体性质：</td><td v-text="data.entProperty"></td>
          <td></td><td></td>
        </tr>
        <tr class="img">
          <td>证照图片：</td><td><img height="200" style="cursor:zoom-in" title="放大查看" :src="info._yyzz_" alt="照片载入中..." @click="clkViewImg"></td>
          <td></td><td></td>
        </tr>
        <tr v-if="type==='sh'">
          <td colspan="4" style="text-align:center;">
            <cmp-button theme="line" @click="clkNo">不通过</cmp-button>
            <cmp-button class="theme" @click="clkTgbsh">通过并审核</cmp-button>
          </td>
        </tr>
      </tbody>
    </table>
    <table class="wrap-zx" v-if="data.entStatus===4">
      <tbody>
        <tr><td>注销原因：</td><td>阿达收到奥术大师阿萨德</td></tr>
        <tr><td>注销人员：</td><td>王五</td></tr>
        <tr><td>联系手机：</td><td>15235647895</td></tr>
        <tr><td>注销申请日期：</td><td>2018-06-09</td></tr>
        <tr>
          <td colspan="2" style="text-align:center;">
            <cmp-button theme="line" @click="clkNo">不通过</cmp-button>
            <cmp-button class="theme" @click="clkTgbsh">通过并审核</cmp-button>
          </td>
        </tr>
      </tbody>
    </table>
    <table class="wrap-log" v-if="type==='log'">
      <thead>
        <tr><td>操作名称</td><td>操作用户名</td><td>操作时间</td><td>审批结果</td><td>审批意见</td></tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in logArr" :key="'_lg'+index">
          <td v-text="item.operation"></td>
          <td v-text="item.optUserName"></td>
          <td v-text="item.optTime"></td>
          <td v-text="item.optResult===1?'通过':'不通过'"></td>
          <td v-text="item.optOpinion"></td>
        </tr>
      </tbody>
    </table>
    <cmp-dialog class="class-1" v-model="optionDialog.show" v-bind="optionDialog" @callback="callbackDialog">
      <span slot="title">审批不通过原因</span>
      <div slot="content">
        <p>请选择审批不通过的原因，确定后将会通过短信或邮件的方式通知生产主体</p>
        <div class="wrap-form">
          <div class="form-layer">
            <label class="star"></label>
            <span class="f-dom">
              <cmp-checkbox v-model="btgyy.arr" :val="'营业执照与填写的信息不符'">营业执照与填写的信息不符</cmp-checkbox>
            </span>
          </div>
          <div class="form-layer">
            <label class="star"></label>
            <span class="f-dom">
              <cmp-checkbox v-model="btgyy.arr" :val="'主体名称不完全'">主体名称不完全</cmp-checkbox>
            </span>
          </div>
          <div class="form-layer">
            <label class="star"></label>
            <span class="f-dom">
              <cmp-checkbox v-model="btgyy.arr" :val="'主体代码填写错误'">主体代码填写错误</cmp-checkbox>
            </span>
          </div>
          <div class="form-layer">
            <label class="star"></label>
            <span class="f-dom">
              <cmp-checkbox v-model="btgyy.arr" :val="'其他'">其他</cmp-checkbox>
            </span>
          </div>
          <div class="form-layer other">
            <label class="star"></label>
            <cmp-textarea class="f-dom" v-model="btgyy.other" v-bind="optionTextarea" :disabled="btgyy.arr.indexOf('其他')<0"></cmp-textarea>
            <small class="tip" v-show="btgyy.arr.indexOf('其他')>=0&&btgyy.other.length===0">* 其他原因不能为空</small>
          </div>
        </div>
      </div>
    </cmp-dialog>
  </div>
</template>

<script>
  import {Tab, Button, Dialog, Checkbox, Textarea} from 'web-base-ui';
  import {ajaxGetSpLogList, ajaxDoAuditOperation} from '../../../data/ajax.js';

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
        // sh | log | ck
        default: ''
      },
      data: {
        default: {}
      }
    },
    watch: {
      // 
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
        },
        logArr: []
      };
    },
    mounted: function () {
      this.getLogData();
      console.log(this.data);
    },
    methods: {
      clkViewImg: function () {
        window.open(this.info._yyzz_);
      },
      clkTgbsh: function () {
        var _this = this;

        this.$confirm({
          show: true,
          modal: true,
          heading: '提交复审？',
          content: '提交之后，请在审核查询中查询该主体信息!',
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
              ajaxDoAuditOperation({
                authId: _this.data.authId,
                optResult: 1,
                optOpinion: ''
              }, function (data) {
                if (data.code === 0) {
                  _this.$emit('callback', 'fresh');
                } else {
                  _this.$tip({ show: true, text: data.msg, theme: 'danger' });
                }
              });
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
      getLogData: function () {
        var _this = this;

        ajaxGetSpLogList({
          authId: this.data.authId
        }, function (data) {
          if (data.code === 0) {
            _this.logArr = data.ret;
          } else {
            _this.$tip({ show: true, text: data.msg, theme: 'danger' });
          }
        });
      },
      callbackDialog: function (data) {
        console.log('==========callbackDialog=======');
        console.log(this.btgyy.arr);
        var _this = this;
        var reason = JSON.parse(JSON.stringify(this.btgyy.arr));

        if (this.btgyy.other) {
          reason[reason.length] = this.btgyy.other;
        }
        if (reason.length === 0) {
          this.$tip({ show: true, text: '请选择或者输入不通过的原因！', theme: 'danger' });
        } else if (!this.btgyy.other && this.btgyy.arr.indexOf('其他') >= 0) {
          this.$tip({ show: true, text: '请填写其他原因！', theme: 'danger' });
        } else {
          this.optionDialog.show = false;
          if (data.text === '确定') {
            ajaxDoAuditOperation({
              authId: this.data.authId,
              optResult: 0,
              optOpinion: reason.join('|')
            }, function (data) {
              if (data.code === 0) {
                _this.$emit('callback', 'fresh');
              } else {
                _this.$tip({ show: true, text: data.msg, theme: 'danger' });
              }
            });
          }
        }
      }
    }
  };
</script>

<style lang="scss">
  .wrap {
    // 
  }
</style>
<style scoped lang="scss">
  .wrap {
    padding-top: 20px;

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
<style scoped lang="scss">
  table {
    margin-bottom: 20px;
    width: 100%;
    border: solid 1px #ccc;

    tr {
      height: 34px;
      line-height: 34px;
      border-bottom: solid 1px #ccc;
    }

    td {
      padding-left: 20px;
    }

    .img {
      vertical-align: top;

      img {
        margin-top: 5px;
      }
    }

    .button {
      margin: 20px;
      padding: 0;
      width: 180px;
      height: 36px;
      border-radius: 4px;
    }

    tbody td:nth-child(odd) {
      text-align: right;
      font-weight: 700;
    }
  }

  table.wrap-scztxx {
    thead {
      color: var(--theme);
      font-weight: 700;
      font-size: 18px;
      background-color: #eee;
    }
  }

  table.wrap-zx {
    td:nth-of-type(1) {
      width: 150px;
    }
  } 

  table.wrap-log {
    text-align: center;
    tbody td:nth-child(odd) {
      text-align: center;
      font-weight: unset;
    }
  }
  
</style>