<!--风险干系人配置-->
<template>
    <div class="wrap">
        <cmp-tab v-bind="optionTab" @cbk="cbkTab"></cmp-tab>
        <div style="padding: 0 20px;">

            <div class="form-layer" style="width: 100%;text-align:right;padding-top: 10px;padding-bottom: 10px; padding-right: 10px">
                <cmp-button class="theme" @click="clkSearch">添加</cmp-button>
            </div>
            <cmp-table v-bind="optionTabel">
                <tr slot="head">
                    <td>姓名</td><td>所属部门</td><td>登录时间</td><td>登录IP</td>
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
    name: 'Yjff',
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
              name: '风险干系人配置'
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
        optionSsbm: {
          placeholder: '请选择',
          show: true,
          data: [ {text: '部门1', value: 1}, {text: '部门2', value: 2} ],
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
      cbkClkSsbm: function (data) {
        this.$set(this.query, '_wtzt_', data);
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

