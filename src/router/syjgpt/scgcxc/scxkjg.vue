<template>
  <div class="wrap">
    <cmp-tab v-bind="optionTab" @cbk="cbkTab"></cmp-tab>
    <div style="padding: 0 20px;">
      <div class="wrap-form horiz" :class="{'show': formShow}">
        <div class="form-layer">
          <label class="star">许可证编号:</label>
          <cmp-input class="f-dom" v-model="query._spmc_" maxlength="50"></cmp-input>
        </div>
        <div class="form-layer">
          <label class="star">有效期至:</label>
          <cmp-date-picker class="f-dom" v-model="query._tjsjstart_"></cmp-date-picker>
        </div>
        <div class="form-layer" style="width: 185px;">
          <cmp-date-picker style="width: 100%;" class="f-dom" v-model="query._tjsjend_"></cmp-date-picker>
        </div>
        <div class="form-layer">
          <label class="star">主体名称:</label>
          <cmp-input class="f-dom" v-model="query._ztmc_" maxlength="50"></cmp-input>
        </div>
        <div class="form-layer" style="width: 100%;text-align:center;">
          <cmp-button theme="line" @click="clkRest">重置</cmp-button>
          <cmp-button class="theme" @click="clkSearch">搜索</cmp-button>
        </div>
      </div>
      <div class="fgx">
        <i class="cicon-triangle-top triangle center-h" :title="formShow?'隐藏搜索':'展开搜索'" @click="formShow=!formShow"></i>
      </div>
      <cmp-table v-bind="optionTabel">
        <tr slot="head">
          <td>许可证编号</td><td>发证日期</td><td>有效期至</td><td>主体名称</td>
        </tr>
        <tr slot="body" slot-scope="props">
          <td>{{props.item._ztmc_}}</td><td>{{props.item._jycs_}}</td><td>{{props.item._fddbr_}}</td><td>{{props.item._cylx_}}</td>
        </tr>
      </cmp-table>
      <cmp-pagebar-pagesize v-bind="optionPagebarPagesize" @callback="callbackPagebar"></cmp-pagebar-pagesize>    
    </div>
  </div>
</template>

<script>
  import {Tab, Input, DropMenu, FlatDatePicker, Button, Table, PagebarPagesize} from 'web-base-ui';
  import {ajaxGetDshData} from '../../../data/ajax.js';

  export default {
    name: 'Scxkjg',
    components: {
      'cmpTab': Tab,
      'cmpInput': Input,
      'cmpDropMenu': DropMenu,
      'cmpDatePicker': FlatDatePicker,
      'cmpButton': Button,
      'cmpTable': Table,
      'cmpPagebarPagesize': PagebarPagesize
    },
    data () {
      return {
        optionTab: {
          acitve: 0,
          close: true,
          list: [
            {
              name: '生产许可监管'
            }
          ]
        },
        formShow: true,
        query: {},
        optionCylx: {
          placeholder: '请选择',
          show: true,
          data: [ {text: '蔬菜种植', value: 1}, {text: '食用菌种植', value: 2}, {text: '水果种植', value: 3}, {text: '茶叶种植', value: 4}, {text: '中药材种植', value: 5}, {text: '牲畜饲养', value: 6}, {text: '家禽饲养', value: 7}, {text: '屠宰及肉类加工', value: 8} ],
          result: []
        },
        optionSplx: {
          placeholder: '请选择',
          show: true,
          data: [ {text: '全部', value: 0}, {text: '食用农产品', value: 1} ],
          result: []
        },
        optionTabel: {
          data: []
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
    mounted: function () {
      // 
    },
    methods: {
      cbkTab: function (data) {
        this.optionTab.acitve = data.name === '审核' ? 1 : 0;
      },
      cbkClkSplx: function (data) {
        this.$set(this.query, '_ztxz_', data);
      },
      clkRest: function () {
        this.query = {};
        this.clkSearch();
      },
      clkSearch: function () {
        console.log('===search===');
        console.log(this.query);
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

        console.log('====callbackPagebar====');
        console.log(data);
        this.optionPagebarPagesize.index = data.currentPage;
        this.optionPagebarPagesize.pagesize = data.pagesize;
        ajaxGetDshData(Object.assign({
          current: this.optionPagebarPagesize.index,
          pageSize: this.optionPagebarPagesize.pagesize
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
        if (this.optionTab.list.length === 1) {
          this.optionTab.list.push({
            name: '审核'
          });
        }
        this.optionTab.acitve = 1;
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
  .wrap {
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
