<template>
  <div class="wrap">
    <cmp-tab v-bind="optionTab"></cmp-tab>
    <div class="p-l">
      <cmp-tree :treeData="treeData" :activeId="activeId" :autoActiveRoot="autoActiveRoot" @callback="callbackTree"></cmp-tree>
    </div>
    <div class="p-r">
      <header>
        <cmp-button @click="clkAdd">添加</cmp-button>
      </header>
      <cmp-table v-bind="optionTabel">
        <tr slot="head">
          <td>所属行政区划</td><td>机构名称</td><td>机构编码</td><td>操作</td>
        </tr>
        <tr slot="body" slot-scope="props">
          <td>{{currentTreeItem.text}}</td><td>{{props.item._jgmc_}}</td><td>{{props.item._jgbm_}}</td>
          <td><cmp-button theme="line" @click="clkView(props.item)">查看</cmp-button><cmp-button @click="clkEdit(props.item)">编辑</cmp-button><cmp-button theme="danger" @click="clkDel(props.item)">删除</cmp-button></td>
        </tr>
      </cmp-table>
      <cmp-dialog class="class-1" v-model="optionDialog.show" v-bind="optionDialog" @callback="callbackDialog">
        <span slot="title">{{optionDialog.heading}}</span>
        <div slot="content">
          <div class="wrap-form">
            <div class="form-layer">
              <label class="star">所属行政区划：</label>
              <span class="f-dom">
                <cmp-input class="f-dom" v-model="currentJgInfo._ssxzqh_" disabled="true" maxlength="50"></cmp-input>
              </span>
            </div>
            <div class="form-layer">
              <label class="star">机构名称：</label>
              <span class="f-dom">
                <cmp-input class="f-dom" v-model="currentJgInfo._jgmc_" maxlength="100"></cmp-input>
              </span>
            </div>
            <div class="form-layer">
              <label class="star">机构编码：</label>
              <span class="f-dom">
                <cmp-input class="f-dom" v-model="currentJgInfo._jgbm_" maxlength="100"></cmp-input>
              </span>
            </div>
          </div>
        </div>
      </cmp-dialog>
    </div>
  </div>
</template>

<script>
  import {Tab, Tree, Table, Button, Dialog, Input} from 'web-base-ui';
  import geoinfoFjXian from '../../../../static/geoinfo-fj-xian.js';
  import {ajaxGetJgData} from '../../../data/ajax.js';

  export default {
    name: 'Zzjggl',
    components: {
      'cmpTab': Tab,
      'cmpTree': Tree,
      'cmpTable': Table,
      'cmpButton': Button,
      'cmpDialog': Dialog,
      'cmpInput': Input
    },
    data () {
      return {
        optionTab: {
          acitve: 0,
          list: [
            {
              name: '组织机构管理'
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
        currentJgInfo: {},
        optionDialog: {
          heading: '',
          show: false,
          modal: true,
          stl: {},
          buttons: []
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
        ajaxGetJgData({}, function (data) {
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
      clkDel: function (info) {
        var _this = this;

        this.$confirm({
          show: true,
          modal: true,
          heading: '删除机构',
          content: ' 确定删除该机构信息？',
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
        this.currentJgInfo = {
          '_ssxzqh_': this.currentTreeItem.text
        };
        this.optionDialog.heading = '添加机构';
        this.optionDialog.buttons = [{
          text: '取消',
          theme: 'line'
        }, {
          text: '添加',
          theme: 'primary'
        }];
        this.optionDialog.show = true;
      },
      clkView: function (info) {
        this.currentJgInfo = info;
        this.currentJgInfo._ssxzqh_ = this.currentTreeItem.text;
        this.optionDialog.heading = '查看机构';
        this.optionDialog.buttons = [];
        this.optionDialog.show = true;
      },
      clkEdit: function (info) {
        this.currentJgInfo = info;
        this.currentJgInfo._ssxzqh_ = this.currentTreeItem.text;
        this.optionDialog.heading = '编辑机构';
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
          this.$tip({ show: true, text: '添加机构成功！', theme: 'success' });
          this.callbackTree([this.currentTreeItem]);
        } else if (data.text === '编辑') {
          this.$tip({ show: true, text: '编辑机构成功！', theme: 'success' });
          this.callbackTree([this.currentTreeItem]);
        }
      }
    }
  };
</script>

<style lang="scss">
  .wrap {

    >.p-r {
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
      width: 300px;
    }
    >.p-r {
      float: left;
      width: calc(100% - 300px);
      min-height: 800px;
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
          margin-right: 10px;
        }
      }

      .wrap-dialog {
        width: 550px;
        height: 360px;
      }
    }
  }

  // 笔记本尺寸 1366 * 768
  @media screen and (max-width: 1366px) {}
</style>
