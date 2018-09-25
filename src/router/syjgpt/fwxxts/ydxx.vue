<template>
  <div class="wrap ydxx">
    <cmp-tab v-bind="optionTab" @cbk="cbkTab"></cmp-tab>
    <div style="padding: 0 20px;" v-show="optionTab.current.id===1">
      <div class="wrap-form search horiz" :class="{'show': formShow}">
        <div class="form-layer">
          <label class="star">栏目:</label>
          <cmp-drop-menu class="f-dom" v-bind="optionLm" v-model="optionLm.result" @cbkClkItem="cbkClkLm">
            <span slot="line" slot-scope="props">{{props.item.columnName}}</span>
          </cmp-drop-menu>
        </div>
        <div class="form-layer">
          <label class="star">发布时间:</label>
          <cmp-date-picker class="f-dom" v-model="query.startTime"></cmp-date-picker>
        </div>
        <div class="form-layer" style="width: 185px;">
          <cmp-date-picker style="width: 100%;" class="f-dom" v-model="query.endTime"></cmp-date-picker>
        </div>
        <div class="form-layer">
          <label class="star">推送信息标题:</label>
          <cmp-input class="f-dom" v-model="query.title" maxlength="50"></cmp-input>
        </div>
        <!-- <div class="form-layer">
          <label class="star">发布人:</label>
          <cmp-input class="f-dom" v-model="query._fbr_" maxlength="50"></cmp-input>
        </div> -->
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
          <td @click="clkOrder('columnName')">栏目</td>
          <td @click="clkOrder('title')">推送信息标题</td>
          <td @click="clkOrder('createTime')">发布时间</td>
          <td class="no-order">操作</td>
        </tr>
        <tr slot="body" slot-scope="props">
          <td>{{props.item.columnName}}</td>
          <td>{{props.item.title}}</td>
          <td>{{utlFormatDate(props.item.createTime)}}</td>
          <td>
            <cmp-button theme="line" @click="clkView(props.item)">查看</cmp-button>
          </td>
        </tr>
      </cmp-table>
      <cmp-pagebar-pagesize v-bind="optionPagebarPagesize" @callback="callbackPagebar"></cmp-pagebar-pagesize>    
    </div>
    <cmp-ckxx v-if="optionTab.current.id===2" :id="tableItemInfo.recId"></cmp-ckxx>
  </div>
</template>

<script>
  import {Tab, Input, DropMenu, FlatDatePicker, Button, Table, PagebarPagesize} from 'web-base-ui';
  import Ckxx from './view.vue';
  import {dataFormat} from 'web-js-tool';
  import {ajaxGetLmszDataList, ajaxGetYdxxDataList} from '../../../data/ajax.js';

  export default {
    name: 'Ydxx',
    components: {
      'cmpTab': Tab,
      'cmpInput': Input,
      'cmpDropMenu': DropMenu,
      'cmpDatePicker': FlatDatePicker,
      'cmpButton': Button,
      'cmpTable': Table,
      'cmpPagebarPagesize': PagebarPagesize,
      'cmpCkxx': Ckxx
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
        tableItemInfo: {},
        optionLm: {
          placeholder: '请选择',
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
          pagesize: 20
        },
        dialogDataInfo: {}
      };
    },
    computed: {
      // 
    },
    mounted: function () {
      var _this = this;

      // 获取栏目列表
      ajaxGetLmszDataList({
        page: 1,
        size: 1000
      }, function (data) {
        if (data.code === 0) {
          _this.optionLm.data = data.ret.list;
        } else {
          _this.$tip({ show: true, text: data.msg, theme: 'danger' });
        }
      });
    },
    methods: {
      cbkTab: function (data) {
        if (data) {
          this.optionTab.current = data;
        }
      },
      cbkClkLm: function (data) {
        data = data[0];
        this.$set(this.query, 'columnId', data.columnId);
      },
      clkRest: function () {
        this.query = {};
        this.optionLm.result = [];
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
        ajaxGetYdxxDataList(Object.assign({
          page: this.optionPagebarPagesize.index,
          size: this.optionPagebarPagesize.pagesize
        }, this.query), function (data) {
          if (data.code === 0) {
            _this.optionTabel.data = data.ret.list;
            _this.optionPagebarPagesize.totalPage = parseInt((data.ret.totalSize - 1) / _this.optionPagebarPagesize.pagesize) + 1;
          } else {
            _this.$tip({ show: true, text: data.msg, theme: 'danger' });
          }
        });
      },
      clkView: function (data) {
        // data.recId
        this.tableItemInfo = data;
        if (this.optionTab.list.length === 1) {
          this.optionTab.list.push({ id: 2, name: '查看信息' });
        }
        this.$set(this.optionTab, 'active', '');
        this.$nextTick(function () { this.$set(this.optionTab, 'active', 1); });
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
  .wrap.ydxx {
    .wrapper-pagebar-pagesize {
      .wrap-menu {
        top: unset!important;
        bottom: calc(100% + 4px)!important;
      }
    }
  }
</style>
<style scoped lang="scss">
  .ydxx {
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

    .wrapper-pagebar-pagesize {
      margin: 10px 0;
    }
  }

  // 笔记本尺寸 1366 * 768
  @media screen and (max-width: 1366px) {}
</style>
