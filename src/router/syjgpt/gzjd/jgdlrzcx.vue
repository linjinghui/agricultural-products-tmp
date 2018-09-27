<template>
  <div class="wrap jgdlcx">
    <cmp-tab v-bind="optionTab" @cbk="cbkTab"></cmp-tab>
    <div style="padding: 0 20px;" v-show="optionTab.current.id===1">
      <div class="wrap-form search horiz" :class="{'show': formShow}">
        <div class="form-layer">
          <label class="star">登录时间:</label>
          <cmp-date-picker class="f-dom" v-model="query.startTime"></cmp-date-picker>
        </div>
        <div class="form-layer" style="width: 185px;">
          <cmp-date-picker style="width: 100%;" class="f-dom" v-model="query.endTime"></cmp-date-picker>
        </div>
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
        <div class="form-layer">
          <label class="star">姓名:</label>
          <cmp-input class="f-dom" v-model="query.userName" maxlength="50"></cmp-input>
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
          <td @click="clkOrder('userName')">姓名</td>
          <td @click="clkOrder('deptName')">所属机构</td>
          <td @click="clkOrder('loginTime')">登录时间</td>
          <td @click="clkOrder('ipAddr')">登录IP</td>
        </tr>
        <tr slot="body" slot-scope="props">
          <td>{{props.item.userName}}</td>
          <td>{{props.item.deptName}}</td>
          <td>{{utlFormatDate(props.item.loginTime)}}</td>
          <td>{{props.item.ipAddr}}</td>
        </tr>
      </cmp-table>
      <cmp-pagebar-pagesize v-bind="optionPagebarPagesize" @callback="callbackPagebar"></cmp-pagebar-pagesize>    
    </div>
  </div>
</template>

<script>
  import {Tab, Input, DropMenu, FlatDatePicker, Button, Table, PagebarPagesize} from 'web-base-ui';
  import {dataFormat} from 'web-js-tool';
  import {ajaxGetChildDivision, ajaxGetJgyhLoginLogList} from '../../../data/ajax.js';

  export default {
    name: 'Ydxx',
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
      callbackPagebar: function (data) {
        var _this = this;

        this.optionPagebarPagesize.index = data.currentPage;
        this.optionPagebarPagesize.pagesize = data.pagesize;
        ajaxGetJgyhLoginLogList(Object.assign({
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
      clkOrder: function (orderBy) {
        this.$refs.rtable.setOrder(this.optionTabel.data, orderBy);
      },
      utlFormatDate: function (dateLong) {
        return dateLong && dataFormat(new Date(dateLong), ' yyyy-MM-dd hh:mm:ss');
      }
    }
  };
</script>

<style lang="scss">
  .wrap.jgdlcx {
    .wrapper-pagebar-pagesize {
      .wrap-menu {
        top: unset!important;
        bottom: calc(100% + 4px)!important;
      }
    }
  }
</style>
<style scoped lang="scss">
  .jgdlcx {
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
