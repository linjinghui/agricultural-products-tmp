<template>
  <div class="wrap dsh">
    <cmp-tab v-bind="optionTab" @cbk="cbkTab"></cmp-tab>
    <div style="padding: 0 20px;" v-show="optionTab.current.id===1">
      <div class="wrap-form horiz" :class="{'show': formShow}">
        <div class="form-layer">
          <label class="star">主体名称:</label>
          <cmp-input class="f-dom" v-model="query.entName" maxlength="50"></cmp-input>
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
          <label class="star">主体性质:</label>
          <cmp-drop-menu class="f-dom" v-bind="optionZtxz" v-model="optionZtxz.result" @cbkClkItem="cbkClkZtxz">
            <span slot="line" slot-scope="props">{{props.item.text}}</span>
          </cmp-drop-menu>
        </div>
        <div class="form-layer">
          <label class="star">产业类型:</label>
          <cmp-drop-menu class="f-dom" v-bind="optionCylx" v-model="optionCylx.result" @cbkClkItem="cbkClkCylx">
            <span slot="line" slot-scope="props">{{props.item.text}}</span>
          </cmp-drop-menu>
        </div>
        <div class="form-layer">
          <label class="star">注册时间:</label>
          <cmp-date-picker class="f-dom" v-model="query.startTime"></cmp-date-picker>
        </div>
        <div class="form-layer" style="width: 185px;">
          <cmp-date-picker style="width: 100%;" class="f-dom" v-model="query.endTime"></cmp-date-picker>
        </div>
        <div class="form-layer">
          <label class="star">主体状态:</label>
          <cmp-drop-menu class="f-dom" v-bind="optionZtzt" v-model="optionZtzt.result" @cbkClkItem="cbkClkZtzt">
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
          <td @click="clkOrder('entName')">主体名称</td>
          <td @click="clkOrder('busiPlace')">经营场所</td>
          <td @click="clkOrder('entIndustrySub')">产业类型</td>
          <td @click="clkOrder('entProperty')">主体性质</td>
          <td @click="clkOrder('principalName')">负责人姓名</td>
          <td @click="clkOrder('createTime')">注册时间</td>
          <td class="no-order">操作</td>
        </tr>
        <tr slot="body" slot-scope="props">
          <td>{{props.item.entName}}</td>
          <td>{{props.item.busiPlace}}</td>
          <td>{{props.item.entIndustrySub}}</td>
          <td>{{props.item.entProperty}}</td>
          <td>{{props.item.principalName}}</td>
          <td>{{utlFormatDate(props.item.createTime)}}</td>
          <td>
            <cmp-button class="theme" @click="clkTabelItem(props.item)">查看</cmp-button>
            <cmp-button class="theme" @click="clkTabelItem(props.item)">标记明星企业</cmp-button>
            <cmp-button class="theme" @click="clkTabelItem(props.item)">标记黑名单</cmp-button>
            <cmp-button class="theme" @click="clkTabelItem(props.item)">问题记录</cmp-button>
          </td>
        </tr>
      </cmp-table>
      <cmp-pagebar-pagesize v-bind="optionPagebarPagesize" @callback="callbackPagebar"></cmp-pagebar-pagesize>    
    </div>
    <div style="padding: 0 20px;" v-if="optionTab.current.id!==1">
      <cmp-sh v-bind="optionSh" @callback="callbackSh"></cmp-sh>
    </div>
  </div>
</template>

<script>
  import {Tab, Input, DropMenu, FlatDatePicker, Button, Table, PagebarPagesize} from 'web-base-ui';
  import {dataFormat} from 'web-js-tool';
  import Sh from './sh.vue';
  import {ajaxGetScztDataList, ajaxGetChildDivision} from '../../../data/ajax.js';

  export default {
    name: 'Ztxc',
    components: {
      'cmpTab': Tab,
      'cmpInput': Input,
      'cmpDropMenu': DropMenu,
      'cmpDatePicker': FlatDatePicker,
      'cmpButton': Button,
      'cmpTable': Table,
      'cmpPagebarPagesize': PagebarPagesize,
      'cmpSh': Sh
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
          // '福州市', '宁德市', '莆田市', '泉州市', '厦门市', '漳州市', '南平市', '三明市', '龙岩市'
          data: [],
          result: []
        },
        optionCylx: {
          placeholder: '请选择',
          show: true,
          data: this.$root.cylx,
          result: []
        },
        optionZtxz: {
          placeholder: '请选择',
          show: true,
          data: this.$root.ztxz,
          result: []
        },
        optionZtzt: {
          placeholder: '请选择',
          show: true,
          data: [
            {text: '全部', value: 1},
            {text: '主体启用', value: 2},
            {text: '主体禁用', value: 3},
            {text: '明星企业', value: 4},
            {text: '黑名单企业', value: 5}
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
        },
        optionSh: {
          type: '',
          data: {}
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
          if (data.id === 2) {
            this.optionSh.type = 'sh';
          } else if (data.id === 3) {
            this.optionSh.type = 'log';
          }
        }
      },
      cbkClkCity: function (data) {
        data = data[0];
        this.$set(this.query, 'adminDivision', data.divCode);
        this.optionXian.data = [];
        this.$nextTick(function () {
          this.optionXian.data = data.children;
        });
      },
      cbkClkXian: function (data) {
        var _this = this;

        data = data[0];
        this.$set(this.query, 'adminDivisionCity', data.divCode);
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
      cbkClkCylx: function (data) {
        data = data[0];
        this.$set(this.query, 'entIndustry', data.value);
      },
      cbkClkZtzt: function (data) {
        data = data[0];
        this.$set(this.query, '_ztzt_', data.value);
      },
      cbkClkZtxz: function (data) {
        data = data[0];
        this.$set(this.query, 'entProperty', data.text);
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
        ajaxGetScztDataList(Object.assign({
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
      callbackSh: function (data) {
        this.$set(this.optionTab, 'active', '');
        this.$nextTick(function () {
          this.$set(this.optionTab, 'active', 0);
        });
        this.optionTab.list.splice(1, this.optionTab.list.length);
        if (data === 'fresh') {
          // 更新列表
          this.callbackPagebar({
            currentPage: 1,
            pagesize: this.optionPagebarPagesize.pagesize
          });
        }
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
