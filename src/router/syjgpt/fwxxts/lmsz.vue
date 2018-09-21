<template>
  <div class="wrap dsh">
    <cmp-tab v-bind="optionTab"></cmp-tab>
    <div style="padding: 0 20px;">
      <div class="wrap-form horiz" :class="{'show': formShow}">
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
      <cmp-table ref="rtable" v-bind="optionTabel">
        <tr slot="head">
          <td @click="clkOrder('entName')">标题</td>
          <td @click="clkOrder('busiPlace')">创建日期</td>
          <td @click="clkOrder('entIndustrySub')">状态</td>
          <td class="no-order">操作</td>
        </tr>
        <tr slot="body" slot-scope="props">
          <td>{{props.item.columnName}}</td>
          <td>{{props.item.createTime}}</td>
          <!-- 是否启用，1是0否 -->
          <td>{{props.item.inuseFlg===1?'已开启':'已关闭'}}</td>
          <td>
            <cmp-button theme="line" @click="clkTabelItem(props.item)">编辑</cmp-button>
            <cmp-button theme="warn" v-if="props.item.inuseFlg===0" @click="clkTabelItem(props.item)">删除</cmp-button>
            <cmp-button class="theme" v-if="props.item.inuseFlg===1" @click="clkTabelItem(props.item)">关闭</cmp-button>
            <cmp-button class="theme" v-if="props.item.inuseFlg===0" @click="clkTabelItem(props.item)">开启</cmp-button>
          </td>
        </tr>
      </cmp-table>
      <cmp-pagebar-pagesize v-bind="optionPagebarPagesize" @callback="callbackPagebar"></cmp-pagebar-pagesize>    
    </div>
  </div>
</template>

<script>
  import {Tab, Input, DropMenu, FlatDatePicker, Button, Table, PagebarPagesize} from 'web-base-ui';
  import {dataFormat} from 'web-js-tool';
  import {ajaxGetLmszDataList} from '../../../data/ajax.js';

  export default {
    name: 'Lmsz',
    components: {
      'cmpTab': Tab,
      'cmpInput': Input,
      'cmpDropMenu': DropMenu,
      'cmpDatePicker': FlatDatePicker,
      'cmpButton': Button,
      'cmpTable': Table,
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
        }
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
      clkTabelItem: function (data) {
        this.optionTab.list = [];
        this.$nextTick(function () {
          this.optionTab.list = [{
            id: 1,
            name: '待审核',
            close: false
          }, {
            id: 2,
            name: '审核',
            closeCnt: '1'
          }, {
            id: 3,
            name: '审批日志',
            closeCnt: '1'
          }];
          this.optionSh.data = data;
          this.$set(this.optionTab, 'active', '');
          this.$nextTick(function () { this.$set(this.optionTab, 'active', 1); });
          this.optionSh.type = 'sh';
        });
      },
      clkOrder: function (orderBy) {
        this.$refs.rtable.setOrder(this.optionTabel.data, orderBy);
      },
      utlFormatDate: function (dateLong) {
        return dataFormat(new Date(dateLong), ' yyyy-MM-dd hh:mm:ss');
      }
    }
  };
</script>

<style lang="scss">
  .wrap {
    .wrapper-pagebar-pagesize {
      .wrap-menu {
        top: unset!important;
        bottom: calc(100% + 4px)!important;
      }
    }
  }
</style>
<style scoped lang="scss">
  .dsh {
    min-height: 500px;
    background-color: transparent;

    .wrap-form {
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
    .wrap-form.show {
      padding: 10px;
      height: auto;
      overflow: unset;
    }

    .fgx {
      position: relative;
      margin-bottom: 20px;
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
    .wrap-form.show + .fgx {
      >.triangle {
        bottom: -6px;
        transform: rotate(0deg);
      }
    }

    .wrapper-pagebar-pagesize {
      margin: 10px 0;
    }
  }

  // 笔记本尺寸 1366 * 768
  @media screen and (max-width: 1366px) {}
</style>
