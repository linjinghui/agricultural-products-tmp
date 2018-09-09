<template>
  <div class="wrap">
    <cmp-tab v-bind="optionTab" @cbk="cbkTab"></cmp-tab>
    <div style="padding: 0 20px;">
      <div class="wrap-form horiz" :class="{'show': formShow}">
        <div class="form-layer">
          <label class="star">主体名称:</label>
          <cmp-input class="f-dom" v-model="query._ztmc_" maxlength="50"></cmp-input>
        </div>
        <div class="form-layer">
          <label class="star">行政区划:</label>
          <cmp-drop-menu class="f-dom" v-bind="optionCity" v-model="optionCity.result" @cbkClkItem="cbkClkCity">
            <span slot="line" slot-scope="props">{{props.item.text}}</span>
          </cmp-drop-menu>
        </div>
        <div class="form-layer" style="width: 185px;">
          <cmp-drop-menu style="width: 100%;" class="f-dom" v-bind="optionXian" v-model="optionXian.result" @cbkClkItem="cbkClkXian">
            <span slot="line" slot-scope="props">{{props.item.text}}</span>
          </cmp-drop-menu>
        </div>
        <div class="form-layer" style="width: 185px;">
          <cmp-drop-menu style="width: 100%;" class="f-dom" v-bind="optionXiang" v-model="optionXiang.result" @cbkClkItem="cbkClkXiang">
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
          <label class="star">负责人姓名:</label>
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
          <td>主体名称</td><td>经营场所</td><td>产业类型</td><td>负责人姓名</td>
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
  import geoinfo from '../../../../static/geoinfo.js';
  import {ajaxGetDshData} from '../../../data/ajax.js';

  export default {
    name: 'Ccpxxxc',
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
              name: '生产计划巡查'
            }
          ]
        },
        formShow: true,
        query: {},
        optionCity: {
          placeholder: '选择城市',
          show: true,
          data: geoinfo[0].child,
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
          data: [ {text: '蔬菜种植', value: 1}, {text: '食用菌种植', value: 2}, {text: '水果种植', value: 3}, {text: '茶叶种植', value: 4}, {text: '中药材种植', value: 5}, {text: '牲畜饲养', value: 6}, {text: '家禽饲养', value: 7}, {text: '屠宰及肉类加工', value: 8} ],
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
      cbkClkCity: function (data) {
        this.$set(this.query, '_city_', data);
        this.optionXian.data = [];
        this.$nextTick(function () {
          this.optionXian.data = data[0].child;
        });
      },
      cbkClkXian: function (data) {
        this.$set(this.query, '_xian_', data);
        this.optionXiang.data = [];
        this.$nextTick(function () {
          this.optionXiang.data = data[0].child;
        });
      },
      cbkClkXiang: function (data) {
        this.$set(this.query, '_xiang_', data);
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
