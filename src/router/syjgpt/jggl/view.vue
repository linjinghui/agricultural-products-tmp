<template>
  <div class="wrap jggl-view">
    <table>
      <tbody>
        <tr>
          <td>主体名称：</td><td colspan="3">{{info.entName}}</td>
        </tr>
        <tr>
          <td>问题标题：</td><td colspan="3">{{info.title}}</td>
        </tr>
        <tr>
          <td>问题描述：</td><td colspan="3">{{info.content}}</td>
        </tr>
        <tr>
          <td>登记人：</td><td colspan="3">{{info.userName}}</td>
        </tr>
        <tr>
          <td>登记时间：</td><td colspan="3">{{info.sendTime}}</td>
        </tr>
        <tr v-if="info.status===3||info.status===4">
          <td>反馈：</td><td colspan="3">{{info.feedbackDetail}}</td>
        </tr>
        <tr v-if="info.status===3||info.status===4">
          <!-- <td>反馈人：</td><td></td> -->
          <td>反馈时间：</td><td colspan="3">{{info.feedbackTime}}</td>
        </tr>
        <tr v-if="info.status===4">
          <!-- <td>办结人员：</td><td>{{info.principalLicNo}}</td> -->
          <td>办结时间：</td><td colspan="3">{{info.finishTime}}</td>
        </tr>
        <tr>
          <!-- info.status:0草稿，1已发送，2已签收，3已反馈，4办结，-1撤销 -->
          <td colspan="4" style="text-align:center;">
            <cmp-button theme="line" @click="back">返回</cmp-button>
            <cmp-button v-if="info.status===1" theme="warning" @click="clkRecover">撤回</cmp-button>
            <cmp-button v-if="info.status===3" class="theme" @click="clkBj">办结</cmp-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import {Button, Textarea} from 'web-base-ui';
  import {ajaxGetJgglDataInfo, ajaxSetJgglStatus} from '../../../data/ajax.js';

  export default {
    name: 'JgglView',
    components: {
      'cmpButton': Button,
      'cmpTextarea': Textarea
    },
    props: {
      // 诚信（监管问题处置、行政处罚、监督检查）档案ID
      recId: {
        default: ''
      },
      id: {
        default: ''
      }
    },
    watch: {
      recId: function (val) {
        this.getCxDataInfo();
      }
    },
    data () {
      return {
        info: {}
      };
    },
    mounted: function () {
      this.getCxDataInfo();
    },
    methods: {
      back: function (type) {
        this.$emit('callback', type);
      },
      getCxDataInfo: function () {
        var _this = this;

        if (this.recId) {
          this.info = {};
          ajaxGetJgglDataInfo({ recId: this.recId }, function (result) {
            if (result.code === 0) {
              _this.info = result.ret.info;
            } else {
              _this.$tip({ show: true, text: result.msg, theme: 'danger' });
            }
          });
        }
      },
      clkRecover: function () {
        var _this = this;

        this.$confirm({
          show: true,
          modal: true,
          heading: '撤回问题',
          content: ' 确定撤回该问题？',
          type: '',
          buttons: [{
            text: '取消',
            theme: 'line'
          }, {
            text: '确定',
            theme: 'primary'
          }],
          callback: function (data) {
            _this.$confirm({ show: false });
            if (data.text === '确定') {
              ajaxSetJgglStatus({
                recId: _this.info.recId,
                doType: 1
              }, function (result) {
                if (result.code === 0) {
                  _this.$tip({ show: true, text: '撤回问题成功！', theme: 'success' });
                  _this.back('fresh');
                } else {
                  _this.$tip({ show: true, text: result.msg, theme: 'danger' });
                }
              });
            }
          }
        });
      },
      clkBj: function (info) {
        var _this = this;

        this.$confirm({
          show: true,
          modal: true,
          heading: '办结问题',
          content: ' 确定办结该问题？',
          type: '',
          buttons: [{
            text: '取消',
            theme: 'line'
          }, {
            text: '确定',
            theme: 'primary'
          }],
          callback: function (data) {
            _this.$confirm({ show: false });
            if (data.text === '确定') {
              ajaxSetJgglStatus({
                recId: _this.info.recId,
                doType: 3
              }, function (result) {
                if (result.code === 0) {
                  _this.$tip({ show: true, text: '该问题已成功办结！', theme: 'success' });
                  _this.back('fresh');
                } else {
                  _this.$tip({ show: true, text: result.msg, theme: 'danger' });
                }
              });
            }
          }
        });
      }
    }
  };
</script>

<style lang="scss">
  .jggl-view {
    // 
  }
</style>
<style scoped lang="scss">
  .jggl-view {
    padding: 20px;

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

      .button {
        margin: 20px;
        padding: 0;
        width: 180px;
        height: 36px;
        border-radius: 4px;
      }

      tbody td:nth-child(odd) {
        width: 140px;
        text-align: right;
        font-weight: 700;
      }
    }
  }

  // 笔记本尺寸 1366 * 768
  @media screen and (max-width: 1366px) {}
</style>