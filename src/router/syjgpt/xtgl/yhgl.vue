<template>
  <div class="wrap yhgl">
    <cmp-tab v-bind="optionTab"></cmp-tab>
    <div class="p-l">
      <cmp-tree :treeData="treeData" :activeId="activeId" @callback="callbackTree"></cmp-tree>
    </div>
    <div class="p-r">
      <header>
        <cmp-button class="theme" v-if="currentTreeItem.deptId" @click="clkAdd">添加</cmp-button>
      </header>
      <cmp-table v-bind="optionTabel">
        <tr slot="head">
          <td>姓名</td><td>性别</td><td>所在单位</td><td>手机号</td><td>所属角色</td><td>所属乡镇</td><td>操作</td>
        </tr>
        <tr slot="body" slot-scope="props">
          <td>{{props.item.realName}}</td>
          <td>{{props.item.sex===1?'男':props.item.sex===2?'女':''}}</td>
          <td>{{props.item.deptName}}</td>
          <td>{{props.item.mobile}}</td>
          <td>{{props.item.roleNames}}</td>
          <td>{{props.item.townDivisionName}}</td>
          <td>
            <!-- props.item.userStatus 用户状态0正常，2禁用 -->
            <!-- primary|success|info|warning|danger|line -->
            <cmp-button theme="line" @click="clkEdit(props.item)">修改</cmp-button>
            <cmp-button v-if="props.item.userStatus===0" theme="warning" @click="clkJy(props.item)">禁用</cmp-button>
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
              <cmp-input class="f-dom" autofocus="true" v-model="currentUserInfo.realName" maxlength="50"></cmp-input>
            </div>
            <div class="form-layer">
              <label class="star">性别：</label>
              <span class="f-dom">
                <cmp-radio v-model="currentUserInfo.sex" val="1">男</cmp-radio>
                <cmp-radio v-model="currentUserInfo.sex" val="2">女</cmp-radio>
              </span>
            </div>
            <!-- <div class="form-layer">
              <label class="star">职务：</label>
              <cmp-drop-menu class="f-dom" v-bind="optionZwDropMenu" v-model="optionZwDropMenu.result" @cbkClkItem="cbkClkZw"></cmp-drop-menu>
            </div>             -->
            <div class="form-layer">
              <label class="star">手机号：</label>
              <cmp-input class="f-dom" v-model="currentUserInfo.mobile" maxlength="50"></cmp-input>
            </div>
            <!-- <div class="form-layer">
              <label class="star">所在单位：</label>
              <cmp-input class="f-dom" v-model="currentUserInfo.deptName" maxlength="100"></cmp-input>
            </div> -->
            <div class="form-layer">
              <label class="star">角色：</label>
              <cmp-drop-menu class="f-dom" v-bind="optionRoleDropMenu" v-model="optionRoleDropMenu.result" @cbkClkItem="cbkClkRole">
                <span slot="line" slot-scope="props">{{props.item.name}}</span>
              </cmp-drop-menu>
            </div>
            <div class="form-layer">
              <label class="star">所属乡镇：</label>
              <cmp-drop-menu class="f-dom" v-bind="optionXiang" v-model="optionXiang.result" @cbkClkItem="cbkClkXiang">
                <span slot="line" slot-scope="props">{{props.item.division}}</span>
              </cmp-drop-menu>
            </div>
            <div class="form-layer">
              <label class="star">登录账号：</label>
              <cmp-input class="f-dom" v-model="currentUserInfo.username" maxlength="100"></cmp-input>
            </div>
            <div class="form-layer">
              <label class="star">密码：</label>
              <cmp-input class="f-dom" v-model="currentUserInfo.password" maxlength="100"></cmp-input>
            </div>
          </div>
        </div>
      </cmp-dialog>
    </div>
  </div>
</template>

<script>
  import {Tab, Tree, Table, Button, Dialog, Input, Radio, DropMenu} from 'web-base-ui';
  import {ajaxRoleDataList, ajaxGetOrgJgTree, ajaxGetChildDivision, ajaxGetUserDataList, ajaxSaveUpdataUser, ajaxChangeUserStatus, ajaxDeleteUser, ajaxGetUserInfo} from '../../../data/ajax.js';
  // import {getZoomLevel} from '../../../tool/tool.js';

  export default {
    name: 'Yhgl',
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
        optionRoleDropMenu: {
          placeholder: '请选择内容',
          show: true,
          multi: true,
          data: [],
          result: []
        },
        optionXiang: {
          placeholder: '选择乡镇',
          show: true,
          data: [],
          result: []
        }
      };
    },
    mounted: function () {
      this.getTreeData();
      // 获取角色列表
      this.getJslist();
    },
    methods: {
      getTreeData: function () {
        var _this = this;

        ajaxGetOrgJgTree(function (data) {
          if (data.code === 0) {
            _this.treeData = _this.formateDataToPluginData(_this.utlDoTreeData(data.ret));
            // 设置默认激活项
            _this.$nextTick(function () {
              _this.activeId = _this.jsTreeIdStr + data.ret[0].id;
            });
          } else {
            _this.$tip({ show: true, text: data.msg, theme: 'danger' });
          }
        });
      },
      getJslist: function (callback) {
        var _this = this;

        ajaxRoleDataList(function (data) {
          if (data.code === 0) {
            _this.optionRoleDropMenu.data = data.ret;
          } else {
            _this.$tip({ show: true, text: data.msg, theme: 'danger' });
          }
        });
      },
      callbackTree: function (data) {
        var _this = this;

        this.currentTreeItem = data[data.length - 1];
        ajaxGetUserDataList({
          divCode: this.currentTreeItem.divCode,
          deptId: this.currentTreeItem.deptId
        }, function (result) {
          if (result.code === 0) {
            _this.optionTabel.data = [];
            _this.$nextTick(function () {
              _this.optionTabel.data = result.ret.list;
            });
          } else {
            _this.$tip({ show: true, text: result.msg, theme: 'danger' });
          }
        });
        // 获取乡镇数据
        _this.optionXiang.data = [];
        // if (getZoomLevel(this.currentTreeItem.divCode) === 1) {
        ajaxGetChildDivision({
          code: this.currentTreeItem.divCode || this.currentTreeItem.adminDivision
        }, function (result) {
          _this.$nextTick(function () {
            _this.optionXiang.data = result.ret;
          });
        }); 
        // }
      },
      formateDataToPluginData: function (data) {
        data = JSON.stringify(data);
        data = data.replace(/"division"/g, '"text"').replace(/"deptName"/g, '"text"');
        data = data.replace(/"id":"/g, '"id":"' + this.jsTreeIdStr);
        return JSON.parse(data);
      },
      cbkClkZw: function (data) {
        this.$set(this.currentUserInfo, '_zw_', data);
      },
      cbkClkRole: function (data) {
        this.$set(this.currentUserInfo, 'roleIds', (function () {
          var arr = [];

          data.forEach(item => {
            arr[arr.length] = item.id;
          });
          return arr;
        }()));
      },
      cbkClkXiang: function (data) {
        data = data[0];
        // divCode
        this.$set(this.currentUserInfo, 'townDivision', data.divCode);
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
            if (data.text === '确定') {
              ajaxDeleteUser({
                userId: info.id
              }, function (result) {
                if (result.code === 0) {
                  _this.$tip({ show: true, text: '删除用户成功！', theme: 'success' });
                  _this.callbackTree([_this.currentTreeItem]); 
                } else {
                  _this.$tip({ show: true, text: result.msg, theme: 'danger' });
                }
              });
              _this.callbackTree([_this.currentTreeItem]);
            }
          }
        });
      },
      clkAdd: function () {
        this.currentUserInfo = {
          adminDivision: this.currentTreeItem.divCode || this.currentTreeItem.adminDivision,
          deptId: this.currentTreeItem.deptId,
          sex: '1'
        };
        this.optionZwDropMenu.result = [];
        this.optionRoleDropMenu.result = [];
        this.optionXiang.result = [];
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
            if (data.text === '确定') {
              ajaxChangeUserStatus({
                userId: info.id,
                opt: 2
              }, function (result) {
                if (result.code === 0) {
                  _this.$tip({ show: true, text: '禁用成功！', theme: 'success' });
                  _this.callbackTree([_this.currentTreeItem]); 
                } else {
                  _this.$tip({ show: true, text: result.msg, theme: 'danger' });
                }
              });
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
            if (data.text === '确定') {
              ajaxChangeUserStatus({
                userId: info.id,
                opt: 1
              }, function (result) {
                if (result.code === 0) {
                  _this.$tip({ show: true, text: '启用成功！', theme: 'success' });
                  _this.callbackTree([_this.currentTreeItem]); 
                } else {
                  _this.$tip({ show: true, text: result.msg, theme: 'danger' });
                }
              });
            }
          }
        });
      },
      clkEdit: function (info) {
        var _this = this;
        var _xiang = this.optionXiang.data;
        var _role = this.optionRoleDropMenu.data;

        ajaxGetUserInfo({
          userId: info.id
        }, function (result) {
          if (result.code === 0) {
            let userInfo = result.ret;

            // 计算所属乡镇
            _this.optionXiang.result = (function () {
              let arr = [];

              for (let i = 0;i < _xiang.length;i++) {
                if (_xiang[i].divCode === userInfo.townDivision) {
                  arr = [i];
                  break;
                }
              }
              return arr;
            }());
            // 计算角色
            _this.optionRoleDropMenu.result = (function () {
              let arr = [];

              for (let i = 0;i < userInfo.roles.length;i++) {
                var _roleId = userInfo.roles[i].id;

                for (let j = 0;j < _role.length;j++) {
                  if (_roleId === _role[j].id) {
                    arr.indexOf(j) < 0 && (arr[arr.length] = j);
                    break;
                  }
                }
              }
              return arr;
            }());

            _this.currentUserInfo = result.ret;
            _this.currentUserInfo.sex += '';
            // _this.currentUserInfo.roleIds = userInfo.roles.join(',');
            _this.cbkClkRole(userInfo.roles);
            _this.optionDialog.heading = '编辑用户';
            _this.optionDialog.buttons = [{
              text: '取消',
              theme: 'line'
            }, {
              text: '编辑',
              theme: 'primary'
            }];
            _this.optionDialog.show = true;
          } else {
            _this.$tip({ show: true, text: result.msg, theme: 'danger' });
          }
        });
      },
      callbackDialog: function (data) {
        var _this = this;

        this.optionDialog.show = false;
        if (data.text === '添加' || data.text === '编辑') {
          ajaxSaveUpdataUser(this.currentUserInfo, function (result) {
            if (result.code === 0) {
              _this.$tip({ show: true, text: data.text === '添加' ? '添加用户成功！' : '编辑用户成功！', theme: 'success' });
              _this.callbackTree([_this.currentTreeItem]);
            } else {
              _this.$tip({ show: true, text: result.msg, theme: 'danger' });
            }
          });
        }
      },
      utlDoTreeData: function (treeData) {
        treeData = JSON.parse(JSON.stringify(treeData));
        var fec = function (item) {
          if (item.depts && item.depts.length > 0) {
            item.children = item.depts.concat(item.children || []);
          }
          if (item.children && item.children.length > 0) {
            item.children.forEach(item1 => {
              fec(item1);
            });
          }
        };

        treeData.forEach(item => {
          fec(item);
        });
        return treeData;
      }
    }
  };
</script>

<style lang="scss">
  .wrap.yhgl {

    >.p-r {
      .wrap-table table {
        td:nth-of-type(7) {  
          padding: 0;
          width: 210px;
        }
      }

      .wrap-dialog >section {
        padding: 0 100px;

        .wrap-menu {
          max-height: 200px;
        }
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
        height: 51px;
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
