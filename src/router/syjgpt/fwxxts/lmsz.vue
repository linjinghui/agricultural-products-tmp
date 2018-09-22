<template>
  <div class="wrap lmsz">
    <cmp-tab v-bind="optionTab"></cmp-tab>
    <div style="padding: 0 20px;">
      <div class="wrap-form search horiz" :class="{'show': formShow}">
        <div class="form-layer">
          <label class="star">标题:</label>
          <cmp-input class="f-dom" v-model="query.entName" maxlength="50"></cmp-input>
        </div>
        <div class="form-layer">
          <label class="star">创建日期:</label>
          <cmp-date-picker class="f-dom" v-model="query._tjsjstart_"></cmp-date-picker>
        </div>
        <div class="form-layer" style="width: 185px;">
          <cmp-date-picker style="width: 100%;" class="f-dom" v-model="query._tjsjend_"></cmp-date-picker>
        </div>
        <div class="form-layer">
          <label class="star">状态:</label>
          <cmp-drop-menu class="f-dom" v-bind="optionZt" v-model="optionZt.result" @cbkClkItem="cbkClkZt">
            <span slot="line" slot-scope="props">{{props.item.text}}</span>
          </cmp-drop-menu>
        </div>
        <div class="form-layer" style="width: 100%;text-align:center;">
          <cmp-button theme="line" @click="clkRest">重置</cmp-button>
          <cmp-button class="theme" @click="clkSearch">搜索</cmp-button>
        </div>
      </div>
      <div class="fgx">
        <i class="cicon-triangle-top triangle center-h" :title="formShow?'隐藏搜索':'展开搜索'" @click="formShow=!formShow"></i>
      </div>
      <cmp-button class="add theme" @click="clkAdd">添加</cmp-button>
      <cmp-table ref="rtable" v-bind="optionTabel">
        <tr slot="head">
          <td @click="clkOrder('columnName')">标题</td>
          <td @click="clkOrder('createTime')">创建日期</td>
          <td @click="clkOrder('inuseFlg')">状态</td>
          <td class="no-order">操作</td>
        </tr>
        <tr slot="body" slot-scope="props">
          <td>{{props.item.columnName}}</td>
          <td>{{utlFormatDate(props.item.createTime)}}</td>
          <!-- 是否启用，1是0否 -->
          <td>{{props.item.inuseFlg===1?'已开启':'已关闭'}}</td>
          <td>
            <cmp-button theme="line" @click="clkEdit(props.item)">编辑</cmp-button>
            <cmp-button theme="danger" v-if="props.item.inuseFlg===0" @click="clkDelete(props.item)">删除</cmp-button>
            <cmp-button theme="warning" v-if="props.item.inuseFlg===1" @click="clkTurnOff(props.item)">关闭</cmp-button>
            <cmp-button class="theme" v-if="props.item.inuseFlg===0" @click="clkTurnOn(props.item)">开启</cmp-button>
          </td>
        </tr>
      </cmp-table>
      <cmp-pagebar-pagesize v-bind="optionPagebarPagesize" @callback="callbackPagebar"></cmp-pagebar-pagesize>    
    </div>
    <cmp-dialog class="class-1" v-model="optionDialog.show" v-bind="optionDialog" @callback="callbackDialog">
      <span slot="title">{{optionDialog.heading}}</span>
      <div slot="content">
        <div class="wrap-form">
          <div class="form-layer">
            <label class="star">标题：</label>
            <cmp-input class="f-dom" v-model="dialogDataInfo.columnName" maxlength="100"></cmp-input>
            <small class="tip">&nbsp;</small>
          </div>
          <div class="form-layer">
            <label class="star">状态：</label>
            <span class="f-dom">
              <cmp-radio v-model="dialogDataInfo.inuseFlg" val="1">启用</cmp-radio>
              <cmp-radio v-model="dialogDataInfo.inuseFlg" val="0">禁用</cmp-radio>
            </span>
          </div>
        </div>
      </div>
    </cmp-dialog>
  </div>
</template>

<script>
  import {Tab, Input, DropMenu, FlatDatePicker, Button, Table, PagebarPagesize, Dialog, Radio} from 'web-base-ui';
  import {dataFormat} from 'web-js-tool';
  import {ajaxGetLmszDataList, ajaxSaveUpdataLmsz, ajaxDelLmsz, ajaxSetLmFlag} from '../../../data/ajax.js';

  export default {
    name: 'Lmsz',
    components: {
      'cmpTab': Tab,
      'cmpInput': Input,
      'cmpDropMenu': DropMenu,
      'cmpDatePicker': FlatDatePicker,
      'cmpButton': Button,
      'cmpTable': Table,
      'cmpDialog': Dialog,
      'cmpRadio': Radio,
      'cmpPagebarPagesize': PagebarPagesize
    },
    props: {
      title: ''
    },
    data () {
      return {
        optionTab: {
          active: 0,
          close: true,
          current: {},
          list: [
            {
              id: 1,
              name: this.title,
              close: false
            }
          ]
        },
        formShow: true,
        query: {},
        optionZt: {
          placeholder: '请选择',
          show: true,
          data: [
            {text: '全部', value: 1}
          ],
          result: []
        },
        optionTabel: {
          data: [],
          order: true
        },
        optionPagebarPagesize: {
          // 当期页
          index: 1,
          // 总页数
          totalPage: 1,
          pagesizes: [
            10, 20, 30, 40, 50
          ],
          pagesize: 20
        },
        optionDialog: {
          heading: '',
          show: false,
          modal: true,
          stl: {},
          buttons: []
        },
        dialogDataInfo: {}
      };
    },
    computed: {
      // 
    },
    mounted: function () {
      // 
    },
    methods: {
      cbkClkZt: function (data) {
        this.$set(this.query, 'entProperty', data);
      },
      clkRest: function () {
        this.query = {};
        this.clkSearch();
      },
      clkSearch: function () {
        this.optionPagebarPagesize.index = 1;
        if (this.optionPagebarPagesize.index === 1) {
          this.callbackPagebar({
            currentPage: 1,
            pagesize: this.optionPagebarPagesize.pagesize
          });
        } else {
          this.optionPagebarPagesize.index = 1;
        }
      },
      clkAdd: function () {
        this.dialogDataInfo = {
          inuseFlg: '1'
        };
        this.optionDialog.heading = '添加栏目';
        this.optionDialog.buttons = [{
          text: '取消',
          theme: 'line'
        }, {
          text: '添加',
          theme: 'primary'
        }];
        this.optionDialog.show = true;
      },
      callbackPagebar: function (data) {
        var _this = this;

        this.optionPagebarPagesize.index = data.currentPage;
        this.optionPagebarPagesize.pagesize = data.pagesize;
        ajaxGetLmszDataList(Object.assign({
          page: this.optionPagebarPagesize.index,
          size: this.optionPagebarPagesize.pagesize
        }, this.query), function (data) {
          if (data.code === 0) {
            _this.optionTabel.data = data.ret.list;
            _this.optionPagebarPagesize.totalPage = parseInt((data.ret.total - 1) / _this.optionPagebarPagesize.pagesize) + 1;
          } else {
            _this.$tip({ show: true, text: data.msg, theme: 'danger' });
          }
        });
      },
      clkEdit: function (data) {
        this.dialogDataInfo = JSON.parse(JSON.stringify(data));
        this.dialogDataInfo.inuseFlg += '';
        this.optionDialog.heading = '编辑栏目';
        this.optionDialog.buttons = [{
          text: '取消',
          theme: 'line'
        }, {
          text: '编辑',
          theme: 'primary'
        }];
        this.optionDialog.show = true;
      },
      clkDelete: function (data) {
        var _this = this;

        this.$confirm({
          show: true,
          modal: true,
          heading: '删除栏目',
          content: ' 确定删除该栏目？',
          type: 'warning',
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
              ajaxDelLmsz({
                columnId: data.columnId
              }, function (result) {
                if (result.code === 0) {
                  _this.$tip({ show: true, text: '删除栏目成功！', theme: 'success' });
                  _this.clkSearch();
                } else {
                  _this.$tip({ show: true, text: result.msg, theme: 'danger' });
                }
              });
            }
          }
        });
      },
      clkTurnOn: function (data) {
        var _this = this;

        this.$confirm({
          show: true,
          modal: true,
          heading: '开启栏目',
          content: ' 确定开启该栏目？',
          type: 'warning',
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
              ajaxSetLmFlag({
                columnId: data.columnId,
                inuseFlg: 1
              }, function (result) {
                if (result.code === 0) {
                  _this.$tip({ show: true, text: '开启栏目成功！', theme: 'success' });
                  _this.clkSearch();
                } else {
                  _this.$tip({ show: true, text: result.msg, theme: 'danger' });
                }
              });
            }
          }
        });
      },
      clkTurnOff: function (data) {
        var _this = this;

        this.$confirm({
          show: true,
          modal: true,
          heading: '关闭栏目',
          content: ' 确定关闭该栏目？',
          type: 'warning',
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
              ajaxSetLmFlag({
                columnId: data.columnId,
                inuseFlg: 0
              }, function (result) {
                if (result.code === 0) {
                  _this.$tip({ show: true, text: '关闭栏目成功！', theme: 'success' });
                  _this.clkSearch();
                } else {
                  _this.$tip({ show: true, text: result.msg, theme: 'danger' });
                }
              });
            }
          }
        });
      },
      clkOrder: function (orderBy) {
        this.$refs.rtable.setOrder(this.optionTabel.data, orderBy);
      },
      callbackDialog: function (data) {
        var _this = this;

        this.optionDialog.show = false;
        if (data.text === '添加' || data.text === '编辑') {
          ajaxSaveUpdataLmsz(this.dialogDataInfo, function (result) {
            if (result.code === 0) {
              _this.$tip({ show: true, text: data.text === '添加' ? '添加栏目成功！' : '编辑栏目成功！', theme: 'success' });
              _this.clkSearch();
            } else {
              _this.$tip({ show: true, text: result.msg, theme: 'danger' });
            }
          });
        }
      },
      utlFormatDate: function (dateLong) {
        return dataFormat(new Date(dateLong), ' yyyy-MM-dd hh:mm:ss');
      }
    }
  };
</script>

<style lang="scss">
  .wrap.lmsz {
    .wrapper-pagebar-pagesize {
      .wrap-menu {
        top: unset!important;
        bottom: calc(100% + 4px)!important;
      }
    }
    .wrap-dialog >section {
      padding: 0 100px;
    }
  }
</style>
<style scoped lang="scss">
  .lmsz {
    min-height: 500px;
    background-color: transparent;

    .wrap-form.search {
      position: relative;
      padding: 0;
      width: 100%;
      height: 0;
      overflow: hidden;

      >.form-layer {
        display: inline-block;
        width: 300px;
      }
    }
    .wrap-form.search.show {
      padding: 10px;
      height: auto;
      overflow: unset;
    }

    .fgx {
      position: relative;
      // margin-bottom: 20px;
      border-bottom: solid 1px #ccc;
      >.triangle {
        position: absolute!important;
        color: #ccc;
        font-size: 20px;
        bottom: -14px;
        transform: rotate(180deg);
        z-index: 1;
        cursor: pointer;
      }
    }
    .wrap-form.search.show + .fgx {
      >.triangle {
        bottom: -6px;
        transform: rotate(0deg);
      }
    }

    .button.add {
      margin: 10px 0;
    }

    .wrapper-pagebar-pagesize {
      margin: 10px 0;
    }

    .wrap-dialog {
      width: 550px;
      height: 360px;
    }
  }

  // 笔记本尺寸 1366 * 768
  @media screen and (max-width: 1366px) {}
</style>
