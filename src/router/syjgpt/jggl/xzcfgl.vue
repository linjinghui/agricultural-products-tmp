<template>
  <div class="wrap xzcf">
    <cmp-tab v-bind="optionTab" @cbk="cbkTab"></cmp-tab>
    <div style="padding: 0 20px;" v-show="optionTab.current.id===1">
      <div class="wrap-form search horiz" :class="{'show': formShow}">
        <!-- <div class="form-layer">
          <label>登记时间:</label>
          <cmp-date-picker class="f-dom" v-model="query.startTime"></cmp-date-picker>
        </div>
        <div class="form-layer" style="width: 185px;">
          <cmp-date-picker style="width: 100%;" class="f-dom" v-model="query.endTime"></cmp-date-picker>
        </div> -->
        <div class="form-layer">
          <label>行政区划:</label>
          <cmp-drop-menu class="f-dom" v-bind="optionCity" v-model="optionCity.result" @cbkClkItem="cbkClkCity">
            <span slot="line" slot-scope="props">{{props.item.division}}</span>
          </cmp-drop-menu>
        </div>
        <div class="form-layer" style="width: 185px;">
          <cmp-drop-menu style="width: 100%;" class="f-dom" v-bind="optionXian" v-model="optionXian.result" @cbkClkItem="cbkClkXian">
            <span slot="line" slot-scope="props">{{props.item.division}}</span>
          </cmp-drop-menu>
        </div>
        <div class="form-layer" style="width: 185px;">
          <cmp-drop-menu style="width: 100%;" class="f-dom" v-bind="optionXiang" v-model="optionXiang.result" @cbkClkItem="cbkClkXiang">
            <span slot="line" slot-scope="props">{{props.item.division}}</span>
          </cmp-drop-menu>
        </div>
        <div class="form-layer">
          <label>主体名称:</label>
          <cmp-input class="f-dom" v-model="query.entName" maxlength="50"></cmp-input>
        </div>
        <div class="form-layer" style="width: 100%;text-align:center;">
          <cmp-button theme="line" @click="clkRest">重置</cmp-button>
          <cmp-button class="theme" @click="clkSearch">搜索</cmp-button>
        </div>
      </div>
      <div class="fgx">
        <i class="cicon-triangle-top triangle center-h" :title="formShow?'隐藏搜索':'展开搜索'" @click="formShow=!formShow"></i>
      </div>
      <cmp-button class="theme btn-add" @click="clkAdd">新建</cmp-button>
      <cmp-table ref="rtable" v-bind="optionTabel">
        <tr slot="head">
          <td @click="clkOrder('entName')">检查主体</td>
          <td @click="clkOrder('title')">检查内容</td>
          <td @click="clkOrder('sendTime')">检查时间</td>
          <td>检查结果</td>
          <td @click="clkOrder('status')">状态</td>
          <td class="no-order">操作</td>
        </tr>
        <tr slot="body" slot-scope="props" @click="clkView(props.item)">
          <td><a class="entName" @click.stop="clkViewZt(props.item)" title="点击查看主体信息">{{props.item.entName}}</a></td>
          <td>{{props.item.title}}</td>
          <td>{{utlFormatDate(props.item.sendTime)}}</td>
          <td></td>
          <td>{{props.item.status===0?'草稿':props.item.status===1?'已发送':props.item.status===2?'已签收':props.item.status===3?'已反馈':props.item.status===4?'已办结':props.item.status===-1?'已撤回':''}}</td>
          <td @click.stop="">
            <cmp-button theme="warning" v-if="props.item.status===1" @click="clkRecover(props.item)">撤回</cmp-button>
            <cmp-button theme="danger" v-if="props.item.status===-1" @click="clkDel(props.item)">删除</cmp-button>
            <cmp-button theme="info" v-if="props.item.status===4" @click="clkView(props.item)">查看</cmp-button>
          </td>
        </tr>
      </cmp-table>
      <cmp-pagebar-pagesize v-bind="optionPagebarPagesize" @callback="callbackPagebar"></cmp-pagebar-pagesize>    
    </div>
    <cmp-view v-if="optionTab.current.id===2" :recId="tableItemInfo.recId" @callback="callbackView"></cmp-view>
    <cmp-sh v-if="optionTab.current.id!==3" v-bind="optionSh" @callback="callbackSh"></cmp-sh>
    <cmp-dialog class="class-1" v-model="optionDialog.show" v-bind="optionDialog" @callback="callbackDialog">
      <span slot="title">{{optionDialog.heading}}</span>
      <div slot="content">
        <div class="wrap-form">
          <div class="form-layer">
            <label class="star">处罚主体：</label>
            <cmp-drop-menu class="f-dom" v-bind="optionZt" v-model="optionZt.result" @cbkClkItem="cbkClkZt">
              <span slot="line" slot-scope="props">{{props.item.entName}}</span>
            </cmp-drop-menu>
            <small class="tip">&nbsp;</small>
          </div>
          <div class="form-layer">
            <label class="star">主要违法事实：</label>
            <cmp-input class="f-dom" v-model="dialogDataInfo.title" maxlength="100"></cmp-input>
            <small class="tip">&nbsp;</small>
          </div>
          <div class="form-layer">
            <label class="star">问题描述：</label>
            <cmp-textarea class="f-dom" v-model="dialogDataInfo.content" v-bind="optionTextarea"></cmp-textarea>
            <small class="tip">&nbsp;</small>
          </div>
        </div>
      </div>
    </cmp-dialog>
  </div>
</template>

<script>
  import {Tab, Input, DropMenu, FlatDatePicker, Button, Table, Dialog, Textarea, PagebarPagesize} from 'web-base-ui';
  import View from './view.vue';
  import Sh from '../ztsh/sh.vue';
  import {dataFormat} from 'web-js-tool';
  import {ajaxGetScztDataList, ajaxGetChildDivision, ajaxGetJgglDataList, ajaxCreateJgglData, ajaxSetJgglStatus} from '../../../data/ajax.js';
  
  export default {
    name: 'Xzcf',
    components: {
      'cmpTab': Tab,
      'cmpInput': Input,
      'cmpDropMenu': DropMenu,
      'cmpDatePicker': FlatDatePicker,
      'cmpButton': Button,
      'cmpTable': Table,
      'cmpDialog': Dialog,
      'cmpTextarea': Textarea,
      'cmpPagebarPagesize': PagebarPagesize,
      'cmpView': View,
      'cmpSh': Sh
    },
    props: {
      title: ''
    },
    data () {
      return {
        sheetType: 2,
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
        tableItemInfo: {},
        optionCity: {
          placeholder: '选择城市',
          show: true,
          data: this.$root.divisionTree,
          result: []
        },
        optionXian: {
          placeholder: '选择区县',
          show: true,
          data: [],
          result: []
        },
        optionXiang: {
          placeholder: '选择乡镇',
          show: true,
          // '福州市', '宁德市', '莆田市', '泉州市', '厦门市', '漳州市', '南平市', '三明市', '龙岩市'
          data: [],
          result: []
        },
        optionZt: {
          placeholder: '选择主体',
          show: true,
          data: [],
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
          pagesize: 10
        },
        optionDialog: {
          heading: '',
          show: false,
          modal: true,
          stl: {},
          buttons: []
        },
        dialogDataInfo: {},
        optionTextarea: {
          'placeholder': '',
          'rows': '3',
          'maxlength': '200'
        },
        optionSh: {
          type: '',
          data: {}
        }
      };
    },
    computed: {
      // 
    },
    mounted: function () {
      var _this = this;

      ajaxGetScztDataList({ page: 1, size: 1000 }, function (result) {
        if (result.code === 0) {
          _this.optionZt.data = result.ret;
        }
      });
    },
    methods: {
      cbkTab: function (data) {
        if (data) {
          this.optionTab.current = data;
        }
      },
      cbkClkCity: function (data) {
        data = data[0];
        this.$set(this.query, 'adminDivisionCity', data.divCode);
        this.optionXian.data = [];
        this.$nextTick(function () {
          this.optionXian.data = data.children;
        });
      },
      cbkClkXian: function (data) {
        var _this = this;

        data = data[0];
        this.$set(this.query, 'adminDivisionCountry', data.divCode);
        ajaxGetChildDivision({
          code: data.divCode
        }, function (_data) {
          _this.optionXiang.data = [];
          _this.$nextTick(function () {
            _this.optionXiang.data = _data.ret;
          });
        });
      },
      cbkClkXiang: function (data) {
        data = data[0];
        this.$set(this.query, 'townDivision', data.divCode);
      },
      cbkClkZt: function (data) {
        data = data[0];
        this.$set(this.dialogDataInfo, 'entId', data.entId);
        this.$set(this.dialogDataInfo, 'entName', data.entName);
      },
      clkRest: function () {
        this.query = {};
        this.optionCity.result = [];
        this.optionXian.result = [];
        this.optionXiang.result = [];
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
      callbackDialog: function (data) {
        var _this = this;
 
        this.optionDialog.show = false;
        if (data.text === '发送') {
          ajaxCreateJgglData(this.dialogDataInfo, function (result) {
            if (result.code === 0) {
              _this.$tip({ show: true, text: '发送问题成功！', theme: 'success' });
              _this.clkSearch();
            } else {
              _this.$tip({ show: true, text: result.msg, theme: 'danger' });
            }
          });
        }
      },
      callbackPagebar: function (data) {
        var _this = this;

        this.optionPagebarPagesize.index = data.currentPage;
        this.optionPagebarPagesize.pagesize = data.pagesize;
        ajaxGetJgglDataList(Object.assign({
          sheetType: this.sheetType,
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
      clkAdd: function () {
        this.dialogDataInfo = {
          sheetType: this.sheetType
        };
        this.optionZt.result = [];
        this.optionDialog.heading = '新建问题';
        this.optionDialog.buttons = [{
          text: '取消',
          theme: 'line'
        }, {
          text: '发送',
          theme: 'primary'
        }];
        this.optionDialog.show = true;
      },
      clkDel: function (info) {
        var _this = this;

        this.$confirm({
          show: true,
          modal: true,
          heading: '删除问题',
          content: ' 确定删除该问题？',
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
              ajaxSetJgglStatus({
                recId: info.recId,
                doType: 2
              }, function (result) {
                if (result.code === 0) {
                  _this.$tip({ show: true, text: '删除问题成功！', theme: 'success' });
                  _this.clkSearch();
                } else {
                  _this.$tip({ show: true, text: result.msg, theme: 'danger' });
                }
              });
            }
          }
        });
      },
      clkRecover: function (info) {
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
                recId: info.recId,
                doType: 1
              }, function (result) {
                if (result.code === 0) {
                  _this.$tip({ show: true, text: '撤回问题成功！', theme: 'success' });
                  _this.clkSearch();
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
                recId: info.recId,
                doType: 3
              }, function (result) {
                if (result.code === 0) {
                  _this.$tip({ show: true, text: '该问题已成功办结！', theme: 'success' });
                  _this.clkSearch();
                } else {
                  _this.$tip({ show: true, text: result.msg, theme: 'danger' });
                }
              });
            }
          }
        });
      },
      clkView: function (data) {
        this.tableItemInfo = data;
        if (this.optionTab.list.length === 1) {
          this.optionTab.list.push({ id: 2, name: '问题详情' });
        }
        this.$set(this.optionTab, 'active', '');
        this.$nextTick(function () { this.$set(this.optionTab, 'active', 1); });
      },
      clkViewZt: function (data) {
        alert('view zt');
        this.tableItemInfo = data;
        if (this.optionTab.list.length === 1) {
          this.optionTab.list.push({ id: 3, name: '主体基本信息' });
        }
        this.$set(this.optionTab, 'active', '');
        this.$nextTick(function () { this.$set(this.optionTab, 'active', 1); });
      },
      clkOrder: function (orderBy) {
        this.$refs.rtable.setOrder(this.optionTabel.data, orderBy);
      },
      utlFormatDate: function (dateLong) {
        return dateLong && dataFormat(new Date(dateLong), ' yyyy-MM-dd hh:mm:ss');
      },
      callbackView: function (data) {
        this.$set(this.optionTab, 'active', '');
        this.$nextTick(function () {
          this.$set(this.optionTab, 'active', 0);
        });
        this.optionTab.list.splice(1, this.optionTab.list.length);
        if (data === 'fresh') {
          // 更新列表
          this.callbackPagebar({
            currentPage: 1,
            pagesize: this.optionPagebarPagesize.pagesize
          });
        }
      },
      callbackSh: function (data) {
        this.$set(this.optionTab, 'active', '');
        this.$nextTick(function () {
          this.$set(this.optionTab, 'active', 0);
        });
        this.optionTab.list.splice(1, this.optionTab.list.length);
      }
    }
  };
</script>

<style lang="scss">
  .wrap.xzcf {
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
  .xzcf {
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

    .btn-add {
      margin: 10px 0;
    }

    .wrapper-pagebar-pagesize {
      margin: 10px 0;
    }

    .wrap-dialog {
      width: 550px;
      height: 460px;
    }

    .wrap-table tbody > tr {
      cursor: pointer;

      .entName {
        color: var(--theme);
        text-decoration: underline;
      }
    }
  }

  // 笔记本尺寸 1366 * 768
  @media screen and (max-width: 1366px) {}
</style>
