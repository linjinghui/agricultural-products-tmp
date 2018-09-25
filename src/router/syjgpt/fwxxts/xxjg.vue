<template>
  <div class="wrap xxJg">
    <cmp-tab v-bind="optionTab"></cmp-tab>
    <div style="padding: 0 20px;">
      <div class="wrap-form search horiz" :class="{'show': formShow}">
        <div class="form-layer">
          <label class="star">栏目:</label>
          <cmp-drop-menu class="f-dom" v-bind="optionLm" v-model="optionLm.result" @cbkClkItem="cbkClkLm">
            <span slot="line" slot-scope="props">{{props.item.columnName}}</span>
          </cmp-drop-menu>
        </div>
        <div class="form-layer">
          <label class="star">推送信息标题:</label>
          <cmp-input class="f-dom" v-model="query.title" maxlength="50"></cmp-input>
        </div>
        <div class="form-layer">
          <label class="star">发布时间:</label>
          <cmp-date-picker class="f-dom" v-model="query.startTime"></cmp-date-picker>
        </div>
        <div class="form-layer" style="width: 185px;">
          <cmp-date-picker style="width: 100%;" class="f-dom" v-model="query.endTime"></cmp-date-picker>
        </div>
        <br>
        <div class="form-layer">
          <label class="star">行政区划:</label>
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
          <td @click="clkOrder('userName')">发布人</td>
          <td class="no-order">操作</td>
        </tr>
        <tr slot="body" slot-scope="props">
          <td>{{props.item.columnName}}</td>
          <td>{{props.item.title}}</td>
          <td>{{utlFormatDate(props.item.createTime)}}</td>
          <td>{{props.item.userName}}</td>
          <td>
            <cmp-button theme="danger" v-if="props.item.status===2" @click="clkDel(props.item)">删除</cmp-button>
            <cmp-button class="theme" v-if="props.item.status===1" @click="clkRecover(props.item)">撤回</cmp-button>
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
  import {ajaxGetLmszDataList, ajaxGetChildDivision, ajaxGetJgxxDataList, ajaxSetStatus} from '../../../data/ajax.js';

  export default {
    name: 'Xxjg',
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
        tableItemInfo: {},
        optionLm: {
          placeholder: '请选择',
          show: true,
          data: [],
          result: []
        },
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
      cbkClkLm: function (data) {
        data = data[0];
        this.$set(this.query, 'columnId', data.columnId);
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
      clkRest: function () {
        this.query = {};
        this.optionLm.result = [];
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
      callbackPagebar: function (data) {
        var _this = this;

        this.optionPagebarPagesize.index = data.currentPage;
        this.optionPagebarPagesize.pagesize = data.pagesize;
        ajaxGetJgxxDataList(Object.assign({
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
      clkDel: function (info) {
        var _this = this;

        this.$confirm({
          show: true,
          modal: true,
          heading: '删除信息',
          content: ' 确定删除该条信息？',
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
              ajaxSetStatus({
                recId: info.recId,
                setStatus: 2
              }, function (result) {
                if (result.code === 0) {
                  _this.$tip({ show: true, text: '删除信息成功！', theme: 'success' });
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
          heading: '撤回信息',
          content: ' 确定撤回该条信息？',
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
              ajaxSetStatus({
                recId: info.recId,
                setStatus: 1
              }, function (result) {
                if (result.code === 0) {
                  _this.$tip({ show: true, text: '撤回信息成功！', theme: 'success' });
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
      utlFormatDate: function (dateLong) {
        return dataFormat(new Date(dateLong), ' yyyy-MM-dd hh:mm:ss');
      }
    }
  };
</script>

<style lang="scss">
  .wrap.xxJg {
    .wrapper-pagebar-pagesize {
      .wrap-menu {
        top: unset!important;
        bottom: calc(100% + 4px)!important;
      }
    }
  }
</style>
<style scoped lang="scss">
  .xxJg {
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
