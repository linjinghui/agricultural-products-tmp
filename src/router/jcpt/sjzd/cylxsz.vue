<template>
  <div class="wrap cylxsz">
    <cmp-tab v-bind="optionTab"></cmp-tab>
    <div class="p-l">
      <cmp-tree :treeData="treeData" :activeId="activeId" :autoActiveRoot="autoActiveRoot" @callback="callbackTree"></cmp-tree>
    </div>
    <div class="p-r">
      <header>
        <cmp-button theme="line" @click="clkAdd">添加</cmp-button>
      </header>
      <div class="wrap-form horiz">
        <div class="form-layer">
          <label class="star">名称:</label>
          <cmp-input class="f-dom" v-model="zdInfo.dictName" maxlength="50"></cmp-input>
        </div>
        <div class="form-layer">
          <label class="star">英文名称:</label>
          <cmp-input class="f-dom" v-model="zdInfo.dictValue" maxlength="50"></cmp-input>
        </div>
        <!-- <div class="form-layer">
          <label>排序:</label> {{zdInfo.order}}
        </div> -->
        <div class="form-layer" v-if="commitType===3">
          <label class="star">生产规模:</label>
          <cmp-input class="f-dom" v-model="zdInfo.scaleUnit" maxlength="50"></cmp-input>
        </div>
        <div class="form-layer" v-if="commitType===3">
          <label class="star">收获/产出计量单位:</label>
          <cmp-input class="f-dom" v-model="zdInfo.saleUnit" maxlength="50"></cmp-input>
        </div>
        <div class="form-layer" v-if="commitType===3">
          <label class="star">食用农产品类别编码:</label>
          <cmp-input class="f-dom" v-model="zdInfo.categoryCode" maxlength="50"></cmp-input>
        </div>
        <div class="form-layer" style="text-align:center;" v-if="commitType>1">
          <cmp-button class="theme save" @click="clkSave">保存</cmp-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Tab, Tree, Button, Input, Textarea} from 'web-base-ui';
  import {ajaxGetIndustryTree, ajaxGetIndustryInfo} from '../../../data/ajax.js';

  export default {
    name: 'Cylxsz',
    components: {
      'cmpTab': Tab,
      'cmpTree': Tree,
      'cmpButton': Button,
      'cmpInput': Input,
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
        jsTreeIdStr: '_jypId',
        // 当前点击的树节点项
        currentTreeItem: '',
        zdInfo: {},
        autoActiveRoot: true,
        optionTextarea: {
          'placeholder': '',
          'rows': '3',
          'maxlength': '200'
        }
      };
    },
    watch: {
      zdInfo: function (val) {
        console.log(val);
      }
    },
    computed: {
      // commitType: function () {
      //   return this.currentTreeItem.length;
      // }
    },
    mounted: function () {
      this.getTreeData();
    },
    methods: {
      getTreeData: function () {
        var _this = this;

        ajaxGetIndustryTree(function (data) {
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
        this.commitType = data.length;
        data = data[data.length - 1];
        this.currentTreeItem = data;
        if (this.commitType >= 3) {
          this.getZdInfoData(data);
        } else {
          this.zdInfo = data;
          this.zdInfo.dictName = data.text;
        }
      },
      formateDataToPluginData: function (data) {
        data = JSON.stringify(data);
        data = data.replace(/"dictName"/g, '"text"');
        data = data.replace(/"id":"/g, '"id":"' + this.jsTreeIdStr);
        return JSON.parse(data);
      },
      getZdInfoData: function (info) {
        var _this = this;

        ajaxGetIndustryInfo({
          dictId: info.dictId
        }, function (result) {
          if (result.code === 0) {
            _this.zdInfo = result.ret;
          } else {
            _this.$tip({ show: true, text: result.msg, theme: 'danger' });
          }
        });
      },
      clkDel: function (info) {
        // 
      },
      clkAdd: function () {
        this.zdInfo = {};
      },
      clkSave: function () {
        // 
      }
    }
  };
</script>

<style lang="scss">
  .cylxsz {

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
  .cylxsz {
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

      >.wrap-form {
        padding: 40px 240px;

        >.form-layer > label {
          width: 140px;
        }

        >.form-layer > .f-dom {
          width: calc(100% - 140px - 5px - 10px);
        }

        .save {
          padding: 8px 15px;
          width: 100px;
          border-radius: 4px;
        }
      }
    }
  }

  // 笔记本尺寸 1366 * 768
  @media screen and (max-width: 1366px) {}
</style>
