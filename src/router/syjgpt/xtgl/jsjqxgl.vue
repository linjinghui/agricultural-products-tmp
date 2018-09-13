<template>
  <div class="wrap jsjqxgl">
    <cmp-tab v-bind="optionTab"></cmp-tab>
    <ul class="p-l">
      <cmp-button class="theme" @click="clkAdd">添加</cmp-button>
      <li v-for="(item,index) in jsData" :key="'_js_'+index" :class="{'active': active===index}" @click="clkItem(index,item)">
        <span v-text="item.name"></span>
        <i class="fa fa-edit" @click="clkEdit(item)"></i>
        <i class="fa fa-trash-o" @click="clkDel(item)"></i>
      </li>
    </ul>
    <div class="p-r">
      <cmp-tree ref="jtree" :treeData="treeData" :isCheckBox="checkbox" :undetermined="undetermined" :isWholerow="wholerow" @checkBoxCallback="checkCallback"></cmp-tree>
      <footer>
        <cmp-button theme="line" @click="clkReset">重置</cmp-button>
        <cmp-button class="theme" @click="clkSave">保存</cmp-button>
      </footer>
    </div>
    <cmp-dialog v-model="optionDialog.show" v-bind="optionDialog" @callback="callbackDialog">
      <span slot="title">{{optionDialog.heading}}</span>
      <div slot="content">
        <div class="wrap-form horiz">
          <div class="form-layer">
            <label class="star">角色名称：</label>
            <cmp-input class="f-dom" autofocus="true" v-model="currentJsInfo.name" maxlength="50"></cmp-input>
          </div>
          <div class="form-layer">
            <label class="star">备注：</label>
            <cmp-textarea class="f-dom" v-model="currentJsInfo._bz_" v-bind="optionTextarea"></cmp-textarea>
          </div>
        </div>
      </div>
    </cmp-dialog>
  </div>
</template>

<script>
  import {Tab, Tree, Button, Dialog, Input, Textarea} from 'web-base-ui';
  import {ajaxRoleDataList, ajaxDeleteRole, ajaxSaveUpdateRole, ajaxGetAllPermissionTreeData, ajaxGetPermissionTreeByRoleId, ajaxSetPermission} from '../../../data/ajax.js';

  export default {
    name: 'Jsjqxgl',
    components: {
      'cmpTab': Tab,
      'cmpTree': Tree,
      'cmpButton': Button,
      'cmpDialog': Dialog,
      'cmpInput': Input,
      'cmpTextarea': Textarea
    },
    data () {
      return {
        active: '',
        jsData: [],
        optionTab: {
          acitve: 0,
          list: [
            {
              name: '角色及权限管理'
            }
          ]
        },
        treeData: '',
        checkbox: true,
        wholerow: false,
        undetermined: true,
        jsTreeIdStr: '_navs',
        currentJsInfo: {},
        optionDialog: {
          heading: '',
          show: false,
          modal: true,
          stl: {},
          buttons: []
        },
        optionTextarea: {
          'placeholder': '',
          'rows': '3',
          'maxlength': '500'
        },
        permissionIds: []
      };
    },
    mounted: function () {
      var _this = this;
      
      // 获取角色列表
      this.getJslist(function () {
        // 获取所有的权限树
        _this.getAllPermissionTreeData(function () {
          // 自动点击第一个角色
          _this.clkItem(0, _this.jsData[0]);
        });
      });
    },
    methods: {
      getAllPermissionTreeData: function (callback) {
        var _this = this;

        ajaxGetAllPermissionTreeData(function (result) {
          if (result.code === 0) {
            _this.treeData = _this.formateDataToPluginData(result.ret || []);
            // 打开全部子节点
            setTimeout(function () { 
              _this.getTree().open_all();
              callback && callback();
            }, 100);
          } else {
            _this.$tip({ show: true, text: result.msg, theme: 'danger' });
          }
        });
      },
      formateDataToPluginData: function (data) {
        data = JSON.stringify(data);
        data = data.replace(/"name"/g, '"text"');
        data = data.replace(/"id":"/g, '"id":"' + this.jsTreeIdStr);
        return JSON.parse(data);
      },
      clkItem: function (index, info) {
        var _this = this;

        this.active = index;
        // 清除所有选中项
        this.getTree().uncheck_all();
        ajaxGetPermissionTreeByRoleId({
          roleId: info.id
        }, function (result) {
          if (result.code === 0) {
            _this.currentJsInfo.permission = result.ret;
            // 设置选中的权限项
            setTimeout(function () {
              _this.utlSetPermission(result.ret);
            }, 0);
          } else {
            _this.$tip({ show: true, text: result.msg, theme: 'danger' });
          }
        });
      },
      clkAdd: function () {
        this.currentJsInfo = {};
        this.optionDialog.heading = '添加角色';
        this.optionDialog.buttons = [{
          text: '取消',
          theme: 'line'
        }, {
          text: '添加',
          theme: 'primary'
        }];
        this.optionDialog.show = true;
      },
      clkEdit: function (info) {
        this.currentJsInfo = JSON.parse(JSON.stringify(info));
        this.optionDialog.heading = '编辑角色';
        this.optionDialog.buttons = [{
          text: '取消',
          theme: 'line'
        }, {
          text: '确定',
          theme: 'primary'
        }];
        this.optionDialog.show = true;
      },
      clkDel: function (info) {
        var _this = this;

        this.$confirm({
          show: true,
          modal: true,
          heading: '删除角色',
          content: ' 确定删除该角色信息？',
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
              ajaxDeleteRole({
                id: info.id
              }, function (result) {
                if (result.code === 0) {
                  _this.$tip({ show: true, text: '删除角色成功！', theme: 'success' });
                  _this.getJslist();
                } else {
                  _this.$tip({ show: true, text: result.msg, theme: 'danger' });
                }
              });
            }
          }
        });
      },
      clkSave: function () {
        var _this = this;

        ajaxSetPermission({
          roleId: this.jsData[this.active].id,
          permIds: this.permissionIds
        }, function (result) {
          if (result.code === 0) {
            _this.$tip({ show: true, text: '角色权限保存成功！', theme: 'success' });
          } else {
            _this.$tip({ show: true, text: result.msg, theme: 'danger' });
          }
        });
      },
      clkReset: function () {
        var _this = this;

        this.getTree().uncheck_all();
        // 还原原来的权限项
        setTimeout(function () {
          _this.utlSetPermission(_this.currentJsInfo.permission);
        }, 0);
      },
      getJslist: function (callback) {
        var _this = this;

        ajaxRoleDataList(function (data) {
          if (data.code === 0) {
            _this.jsData = [];
            _this.$nextTick(function () {
              _this.jsData = data.ret;
              callback && callback();
            });
          } else {
            _this.$tip({ show: true, text: data.msg, theme: 'danger' });
          }
        });
      },
      getTree: function () {
        var $jtree = this.$refs.jtree;

        return $jtree.getTreeDom().jstree(true) || {};
      },
      checkCallback: function (data) {
        console.log('=====checkCallback====');
        console.log(data);
        this.permissionIds = [];
        data.forEach(item => {
          this.permissionIds[this.permissionIds.length] = item.id;
        });
        console.log(this.permissionIds);
      },
      callbackDialog: function (data) {
        var _this = this;

        this.optionDialog.show = false;
        if (data.text === '添加' || data.text === '确定') {
          ajaxSaveUpdateRole(this.currentJsInfo, function (result) {
            if (result.code === 0) {              
              _this.$tip({ show: true, text: data.text === '添加' ? '添加角色成功！' : '编辑角色成功！', theme: 'success' });
              _this.getJslist();
            } else {
              _this.$tip({ show: true, text: result.msg, theme: 'danger' });
            }
          });
        }
      },
      utlSetPermission: function (data) {
        // this.getTree().check_node('1010');
        var _this = this;
        var fec = function (item) {
          // 最后一级才进行勾选操作
          // console.log(item.id + ':' + (item.id + '').length);
          if (item.perm && ((item.id + '').length > 4 || !item.children || item.children.length === 0)) {
            _this.getTree().check_node(item.id);
          }
          if (item.children && item.children.length > 0) {
            item.children.forEach(item1 => {
              fec(item1);
            });
          }
        };

        data.forEach(item => {
          fec(item);
        });
      }
    }
  };
</script>

<style lang="scss">
  .wrap.jsjqxgl {

    >.p-r {
      
      .vtree {
        // width: 1500px;
        padding-bottom: 50px;
        [aria-level="1"] {
          border-bottom: solid 1px #ccc;
        }
        [aria-level="1"]:last-of-type {
          border-bottom: 0;
        }
        [aria-level="2"] {
          display: inline-block;
          width: 200px;
          vertical-align: top;
        }
        .jstree-clicked {
          box-shadow: none;
          background-color: transparent!important;
        }
      }

      .wrap-dialog >section {
        padding: 0 100px;
      }
    }

    .wrap-dialog >section {
      padding: 0 50px;
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
      
      > .button {
        margin-bottom: 10px;
        width: 80px;
        border-radius: 4px;
      }

      > li {
        height: 40px;
        line-height: 40px;
        border-top: solid 1px #ccc;
        >span {
          float: left;
          width: calc(100% - 30px - 30px);
          overflow: hidden;
        }
        >.fa {
          float: right;
          width: 30px;
          height: 100%;
          line-height: 40px;
          text-align: center;
          color: #666;
          cursor: pointer;
        }
        >.fa:hover {
          color: inherit;
        }
      }
      > li:hover {
        background-color: #e3edf3;
      }
      > li.active {
        background-color: #cbe3f3;
      }
    }
    >.p-r {
      float: left;
      width: calc(100% - 240px);
      min-height: 550px;
      border-left: solid 1px #ccc;
      // overflow-x: scroll;

      >header {
        text-align: right;
        border-bottom: solid 1px #ccc;

        >.button {
          margin: 10px;
          width: 100px;
          border-radius: 4px;
        }
      }

      footer {
        position: fixed;
        bottom: 20px;
        right: 20px;
        text-align: right;
        background-color: #fff;
        .button {
          margin-left: 10px;
        }
      }
    }

    .wrap-dialog {
      width: 500px;
      height: 300px;
    }
  }

  // 笔记本尺寸 1366 * 768
  @media screen and (max-width: 1366px) {}
</style>
