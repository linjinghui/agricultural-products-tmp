<template>
  <div class="wrap jypgl">
    <cmp-tab v-bind="optionTab"></cmp-tab>
    <div class="p-l">
      <cmp-tree :treeData="treeData" :activeId="activeId" :autoActiveRoot="autoActiveRoot" @callback="callbackTree"></cmp-tree>
    </div>
    <div class="p-r">
      <header>
        <cmp-input class="f-dom" v-model="query.materialName" placeholder="回车搜索" maxlength="50" @enter="clkSearch"></cmp-input>
        <cmp-button class="theme" @click="clkAdd">添加</cmp-button>
      </header>
      <cmp-table ref="rtable" v-bind="optionTabel">
        <tr slot="head">
          <td @click="clkOrder('materialName')">中文名</td>
          <td @click="clkOrder('enName')">英文名</td>
          <td @click="clkOrder('prohibitUsed')">禁止用途</td>
          <td class="no-order">操作</td>
        </tr>
        <tr slot="body" slot-scope="props">
          <td>{{props.item.materialName}}</td>
          <td>{{props.item.enName||''}}</td>
          <td>{{props.item.prohibitUsed||''}}</td>
          <td>
            <cmp-button theme="line" @click="clkEdit(props.item)">编辑</cmp-button>
            <cmp-button theme="danger" @click="clkDel(props.item)">删除</cmp-button>
          </td>
        </tr>
      </cmp-table>
      <cmp-pagebar-pagesize v-bind="optionPagebarPagesize" @callback="callbackPagebar"></cmp-pagebar-pagesize>
      <cmp-dialog class="class-1" v-model="optionDialog.show" v-bind="optionDialog" @callback="callbackDialog">
        <span slot="title">{{optionDialog.heading}}</span>
        <div slot="content">
          <div class="wrap-form">
            <div class="form-layer">
              <label class="star">中文名：</label>
              <cmp-input class="f-dom" v-model="dialogInfo.materialName" autofocus="true" maxlength="50"></cmp-input>
              <small class="tip">&nbsp;</small>
            </div>
            <div class="form-layer">
              <label>英文名：</label>
              <cmp-input class="f-dom" v-model="dialogInfo.enName" maxlength="100"></cmp-input>
              <small class="tip">&nbsp;</small>
            </div>
            <div class="form-layer">
              <label>禁止用途：</label>
              <cmp-textarea class="f-dom" v-model="dialogInfo.prohibitUsed" v-bind="optionTextarea"></cmp-textarea>
              <!-- <cmp-input class="f-dom" v-model="dialogInfo.prohibitUsed" maxlength="200"></cmp-input> -->
              <small class="tip">&nbsp;</small>
            </div>
          </div>
        </div>
      </cmp-dialog>
    </div>
  </div>
</template>

<script>
  import {Tab, Tree, Table, Button, Dialog, Input, PagebarPagesize, Textarea} from 'web-base-ui';
  import {ajaxGetCategoryTree, ajaxGetPmDataList, ajaxSaveUpdataPm, ajaxDeletePm} from '../../../data/ajax.js';

  export default {
    name: 'Jypgl',
    components: {
      'cmpTab': Tab,
      'cmpTree': Tree,
      'cmpTable': Table,
      'cmpButton': Button,
      'cmpDialog': Dialog,
      'cmpInput': Input,
      'cmpPagebarPagesize': PagebarPagesize,
      'cmpTextarea': Textarea
    },
    props: {
      title: ''
    },
    data () {
      return {
        optionTab: {
          acitve: 0,
          list: [
            {
              name: this.title
            }
          ]
        },
        treeData: '',
        activeId: '',
        // jsTreeIdStr: '_jypId',
        // 当前点击的树节点项
        currentTreeItem: '',
        autoActiveRoot: true,
        query: {},
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
        dialogInfo: {},
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
          'maxlength': '200'
        }
      };
    },
    mounted: function () {
      this.getTreeData();
    },
    methods: {
      getTreeData: function () {
        var _this = this;

        ajaxGetCategoryTree(function (data) {
          if (data.code === 0) {
            _this.treeData = _this.formateDataToPluginData(data.ret);
            // 设置默认激活项
            _this.$nextTick(function () {
              _this.activeId = data.ret[0].id;
            });
          } else {
            _this.$tip({ show: true, text: data.msg, theme: 'danger' });
          }
        });
      },
      callbackTree: function (data) {
        data = data[data.length - 1];
        this.$set(this.query, 'dictCode', data.dictCode);
        this.$set(this.query, 'materialName', '');
        this.clkSearch();
      },
      formateDataToPluginData: function (data) {
        data = JSON.stringify(data);
        data = data.replace(/"dictName"/g, '"text"');
        data = data.replace(/"id":"/g, '"id":"' + this.jsTreeIdStr);
        return JSON.parse(data);
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
      callbackPagebar: function (data) {
        var _this = this;

        this.optionPagebarPagesize.index = data.currentPage;
        this.optionPagebarPagesize.pagesize = data.pagesize;
        ajaxGetPmDataList(Object.assign({
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
      clkDel: function (info) {
        var _this = this;

        this.$confirm({
          show: true,
          modal: true,
          heading: '删除禁用品',
          content: ' 确定删除该禁用品？',
          type: '',
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
              ajaxDeletePm({
                pmId: info.pmId
              }, function (result) {
                if (result.code === 0) {
                  _this.$tip({ show: true, text: '已成功删除！', theme: 'succcess' });
                  _this.clkSearch();
                } else {
                  _this.$tip({ show: true, text: result.msg, theme: 'danger' });
                }
              });
            }
          }
        });
      },
      clkAdd: function () {
        this.dialogInfo = {
          dictCode: this.query.dictCode
        };
        this.optionDialog.heading = '添加禁用品';
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
        this.dialogInfo = JSON.parse(JSON.stringify(info));
        this.dialogInfo.dictCode = this.query.dictCode;
        this.dialogInfo.prohibitUsed = this.dialogInfo.prohibitUsed || '';
        this.optionDialog.heading = '编辑禁用品';
        this.optionDialog.buttons = [{
          text: '取消',
          theme: 'line'
        }, {
          text: '编辑',
          theme: 'primary'
        }];
        this.optionDialog.show = true;
      },
      clkOrder: function (orderBy) {
        this.$refs.rtable.setOrder(this.optionTabel.data, orderBy);
      },
      callbackDialog: function (data) {
        var _this = this;
        
        if (data.text === '添加' || data.text === '编辑') {
          ajaxSaveUpdataPm(this.dialogInfo, function (result) {
            if (result.code === 0) {
              _this.optionDialog.show = false;
              if (data.text === '添加') {
                _this.$tip({ show: true, text: '添加禁用品成功！', theme: 'success' });
              } else if (data.text === '编辑') {
                _this.$tip({ show: true, text: '编辑禁用品成功！', theme: 'success' });
              }
              _this.clkSearch();
            } else {
              _this.$tip({ show: true, text: result.msg, theme: 'danger' });
            }
          });
        }
      }
    }
  };
</script>

<style lang="scss">
  .jypgl {

    >.p-r {

      >header {
        >.input > input {
          border-radius: 4px!important;
        }
      }
      .wrap-dialog >section {
        padding: 0 100px;
      }
    }
  }
</style>
<style scoped lang="scss">
  .jypgl {
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
        padding: 10px;
        border-bottom: solid 1px #ccc;

        >.button {
          padding: 8px 15px;
          width: 100px;
          border-radius: 4px;
        }

        >.input {
          float: right;
          width: 300px;
        }
      }

      >.wrap-table {
        .button {
          margin-right: 10px;
        }
      }

      >.wrapper-pagebar-pagesize {
        margin: 20px;
        width: calc(100% - 40px);
      }

      .wrap-dialog {
        width: 550px;
        height: 460px;
      }
    }
  }

  // 笔记本尺寸 1366 * 768
  @media screen and (max-width: 1366px) {}
</style>
