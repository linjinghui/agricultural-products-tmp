<template>
  <div class="wrap">
    <cmp-tab v-bind="optionTab"></cmp-tab>
    <div class="p-l">
      <cmp-tree :treeData="treeData" :activeId="activeId" :autoActiveRoot="autoActiveRoot" @callback="callbackTree"></cmp-tree>
    </div>
    <div class="p-r">
      <header>
        <cmp-button class="theme" @click="clkAdd">添加</cmp-button>
      </header>
      <cmp-table v-bind="optionTabel">
        <tr slot="head">
          <td>姓名</td><td>性别</td><td>所在单位</td><td>职务</td><td>手机号</td><td>用户类别</td><td>操作</td>
        </tr>
        <tr slot="body" slot-scope="props">
          <td>{{props.item._xm_}}</td><td>{{props.item._xb_}}</td><td>{{props.item._szdw_}}</td><td>{{props.item._zw_}}</td><td>{{props.item._sjh_}}</td><td>{{props.item._yhlb_}}</td>
          <td>
            <!-- primary|success|info|warning|danger|line -->
            <cmp-button theme="line" @click="clkEdit(props.item)">修改</cmp-button>
            <cmp-button v-if="props.item._zt_===1" theme="warning" @click="clkJy(props.item)">禁用</cmp-button>
            <cmp-button v-else @click="clkQy(props.item)">启用</cmp-button>
            <cmp-button theme="danger" @click="clkDel(props.item)">删除</cmp-button></td>
        </tr>
      </cmp-table>
      <cmp-dialog class="class-1" v-model="optionDialog.show" v-bind="optionDialog" @callback="callbackDialog">
        <span slot="title">{{optionDialog.heading}}</span>
        <div slot="content">
          <div class="wrap-form horiz">
            <div class="form-layer">
              <label class="star">姓名：</label>
              <cmp-input class="f-dom" autofocus="true" v-model="currentUserInfo._xm_" maxlength="50"></cmp-input>
            </div>
            <div class="form-layer">
              <label class="star">性别：</label>
              <span class="f-dom">
                <cmp-radio v-model="currentUserInfo._xb_" val="男">男</cmp-radio>
                <cmp-radio v-model="currentUserInfo._xb_" val="女">女</cmp-radio>
              </span>
            </div>
            <div class="form-layer">
              <label class="star">职务：</label>
              <cmp-drop-menu class="f-dom" v-bind="optionZwDropMenu" v-model="optionZwDropMenu.result" @cbkClkItem="cbkClkZw"></cmp-drop-menu>
            </div>            
            <div class="form-layer">
              <label class="star">手机号：</label>
              <cmp-input class="f-dom" v-model="currentUserInfo._sjh_" maxlength="50"></cmp-input>
            </div>
            <div class="form-layer">
              <label class="star">所在单位：</label>
              <cmp-input class="f-dom" v-model="currentUserInfo._szdw_" maxlength="100"></cmp-input>
            </div>
            <div class="form-layer">
              <label class="star">用户类别：</label>
              <cmp-drop-menu class="f-dom" v-bind="optionYhlbDropMenu" v-model="optionYhlbDropMenu.result" @cbkClkItem="cbkClkYhlb"></cmp-drop-menu>
            </div>
            <div class="form-layer">
              <label class="star">登录账号：</label>
              <cmp-input class="f-dom" v-model="currentUserInfo._dlzh_" maxlength="100"></cmp-input>
            </div>
            <div class="form-layer">
              <label class="star">密码：</label>
              <cmp-input class="f-dom" v-model="currentUserInfo._mm_" maxlength="100"></cmp-input>
            </div>
          </div>
        </div>
      </cmp-dialog>
    </div>
  </div>
</template>

<script>
  import {Tab, Tree, Table, Button, Dialog, Input, Radio, DropMenu} from 'web-base-ui';
  import geoinfoFjXian from '../../../../static/geoinfo-fj-xian.js';
  import {ajaxGetUserData} from '../../../data/ajax.js';

  export default {
    name: 'Jsgl',
    components: {
      'cmpTab': Tab,
      'cmpTree': Tree,
      'cmpTable': Table,
      'cmpButton': Button,
      'cmpDialog': Dialog,
      'cmpInput': Input,
      'cmpRadio': Radio,
      'cmpDropMenu': DropMenu
    },
    data () {
      return {
        optionTab: {
          acitve: 0,
          list: [
            {
              name: '用户管理'
            }
          ]
        },
        treeData: '',
        activeId: '',
        jsTreeIdStr: '_fjId',
        // 当前点击的树节点项
        currentTreeItem: '',
        autoActiveRoot: true,
        optionTabel: {
          data: []
        },
        currentUserInfo: {},
        optionDialog: {
          heading: '',
          show: false,
          modal: true,
          stl: {},
          buttons: []
        },
        optionZwDropMenu: {
          placeholder: '请选择内容',
          show: true,
          data: ['部长', '科长', '处长'],
          result: []
        },
        optionYhlbDropMenu: {
          placeholder: '请选择内容',
          show: true,
          data: ['行政主管用户', '检测用户', '执法用户', '系统管理员'],
          result: []
        }
      };
    },
    mounted: function () {
      var _this = this;

      this.treeData = this.formateDataToPluginData(geoinfoFjXian);
      // 设置默认激活项
      this.$nextTick(function () {
        _this.activeId = _this.jsTreeIdStr + '_0';
      });
    },
    methods: {
      testEachGeoinfo: function () {
        var arr = geoinfoFjXian;
      
        arr.forEach((element, index) => {
          element.id = '_' + index;
          element.child.forEach((element2, index2) => {
            element2.id = '_' + index + '_' + index2;
          });
        });
        console.log(arr);
        console.log(JSON.stringify(arr));
      },
      callbackTree: function (data) {
        console.log('======callbackTree=======');
        console.log(data);
        var _this = this;

        this.currentTreeItem = data[data.length - 1];
        ajaxGetUserData({}, function (data) {
          if (data.code === 0) {
            _this.optionTabel.data = [];
            _this.$nextTick(function () {
              _this.optionTabel.data = data.ret;
            });
          } else {
            _this.$tip({ show: true, text: data.msg, theme: 'danger' });
          }
        });
      },
      formateDataToPluginData: function (data) {
        data = JSON.stringify(data);
        data = data.replace(/"child"/g, '"children"');
        data = data.replace(/"id":"/g, '"id":"' + this.jsTreeIdStr);
        return JSON.parse(data);
      },
      cbkClkZw: function (data) {
        this.$set(this.currentUserInfo, '_zw_', data);
      },
      cbkClkYhlb: function (data) {
        this.$set(this.currentUserInfo, '_yhlb_', data);
      },
      clkDel: function (info) {
        var _this = this;

        this.$confirm({
          show: true,
          modal: true,
          heading: '删除用户',
          content: ' 确定删除该用户信息？',
          type: 'warning',
          buttons1: [],
          buttons: [{
            text: '取消',
            theme: 'line'
          }, {
            text: '确定',
            theme: 'primary'
          }],
          callback: function (data) {
            _this.$confirm({ show: false });
            console.log('======confirm callback=====');
            if (data.text === '确定') {
              _this.callbackTree([_this.currentTreeItem]);
            }
          }
        });
      },
      clkAdd: function () {
        this.currentUserInfo = {};
        this.optionZwDropMenu.result = [];
        this.optionYhlbDropMenu.result = [];
        this.optionDialog.heading = '添加用户';
        this.optionDialog.buttons = [{
          text: '取消',
          theme: 'line'
        }, {
          text: '添加',
          theme: 'primary'
        }];
        this.optionDialog.show = true;
      },
      clkJy: function (info) {
        var _this = this;

        this.$confirm({
          show: true,
          modal: true,
          heading: '禁用用户',
          content: ' 确定禁用该用户？',
          type: 'warning',
          buttons1: [],
          buttons: [{
            text: '取消',
            theme: 'line'
          }, {
            text: '确定',
            theme: 'primary'
          }],
          callback: function (data) {
            _this.$confirm({ show: false });
            console.log('======confirm callback=====');
            if (data.text === '确定') {
              _this.$tip({ show: true, text: '禁用成功！', theme: 'success' });
              _this.callbackTree([_this.currentTreeItem]);
            }
          }
        });
      },
      clkQy: function (info) {
        var _this = this;

        this.$confirm({
          show: true,
          modal: true,
          heading: '启用用户',
          content: ' 确定启用该用户？',
          type: 'warning',
          buttons1: [],
          buttons: [{
            text: '取消',
            theme: 'line'
          }, {
            text: '确定',
            theme: 'primary'
          }],
          callback: function (data) {
            _this.$confirm({ show: false });
            console.log('======confirm callback=====');
            if (data.text === '确定') {
              _this.$tip({ show: true, text: '启用成功！', theme: 'success' });
              _this.callbackTree([_this.currentTreeItem]);
            }
          }
        });
      },
      clkEdit: function (info) {
        this.currentUserInfo = info;
        this.optionDialog.heading = '编辑用户';
        this.optionDialog.buttons = [{
          text: '取消',
          theme: 'line'
        }, {
          text: '编辑',
          theme: 'primary'
        }];
        this.optionDialog.show = true;
      },
      callbackDialog: function (data) {
        this.optionDialog.show = false;
        if (data.text === '添加') {
          this.$tip({ show: true, text: '添加用户成功！', theme: 'success' });
          this.callbackTree([this.currentTreeItem]);
        } else if (data.text === '编辑') {
          this.$tip({ show: true, text: '编辑用户成功！', theme: 'success' });
          this.callbackTree([this.currentTreeItem]);
        }
      }
    }
  };
</script>

<style lang="scss">
  .wrap {

    >.p-r {
      .wrap-table table {
        td:nth-of-type(7) {  
          padding: 0;
          width: 210px;
        }
      }

      .wrap-dialog >section {
        padding: 0 100px;
      }
    }
  }
</style>
<style scoped lang="scss">
  .wrap {
    background-color: transparent;
    
    >.p-l {
      float: left;
      padding: 20px;
      width: 240px;
    }
    >.p-r {
      float: left;
      width: calc(100% - 240px);
      min-height: 550px;
      border-left: solid 1px #ccc;

      >header {
        text-align: right;
        border-bottom: solid 1px #ccc;

        >.button {
          margin: 10px;
          width: 100px;
          border-radius: 4px;
        }
      }

      >.wrap-table {
        .button {
          margin-left: 5px;
        }
      }

      .wrap-dialog {
        width: 600px;
        height: 550px;
      }
    }
  }

  // 笔记本尺寸 1366 * 768
  @media screen and (max-width: 1366px) {}
</style>
