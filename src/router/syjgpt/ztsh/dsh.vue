<template>
  <div class="wrap">
    <cmp-tab v-bind="optionTab"></cmp-tab>
    <div style="padding: 0 20px;">
      <div class="wrap-form horiz" :class="{'show': formShow}">
        <div class="form-layer">
          <label class="star">主体名称:</label>
          <cmp-input class="f-dom" v-model="name" maxlength="50"></cmp-input>
        </div>
        <div class="form-layer">
          <label class="star">主体名称:</label>
          <cmp-input class="f-dom" v-model="name" maxlength="50"></cmp-input>
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
          <label class="star">法定代表人:</label>
          <cmp-input class="f-dom" v-model="name" maxlength="50"></cmp-input>
        </div>
        <div class="form-layer">
          <label class="star">产业类型:</label>
          <cmp-drop-menu class="f-dom" v-bind="optionCity" v-model="optionCity.result" @cbkClkItem="cbkClkCity"></cmp-drop-menu>
        </div>      
        <div class="form-layer">
          <label class="star">主体性质:</label>
          <cmp-drop-menu class="f-dom" v-bind="optionCity" v-model="optionCity.result" @cbkClkItem="cbkClkCity"></cmp-drop-menu>
        </div>
        <div class="form-layer">
          <label class="star">负责人姓名:</label>
          <cmp-input class="f-dom" v-model="name" maxlength="50"></cmp-input>
        </div>
        <div class="form-layer">
          <label class="star">主体提交时间:</label>
          <cmp-date-picker class="f-dom" v-model="name"></cmp-date-picker>
        </div>
        <div class="form-layer" style="width: 185px;">
          <cmp-date-picker style="width: 100%;" class="f-dom" v-model="name"></cmp-date-picker>
        </div>
        <div class="form-layer">
          <label class="star">身份验证时间:</label>
          <cmp-date-picker class="f-dom" v-model="name"></cmp-date-picker>
        </div>
        <div class="form-layer" style="width: 185px;">
          <cmp-date-picker style="width: 100%;" class="f-dom" v-model="name"></cmp-date-picker>
        </div>      
        <div class="form-layer" style="width: 100%;text-align:center;">
          <cmp-button theme="line">重置</cmp-button>
          <cmp-button>搜索</cmp-button>
        </div>
      </div>
      <div class="fgx">
        <i class="cicon-triangle-top triangle center-h" :title="formShow?'隐藏搜索':'展开搜索'" @click="formShow=!formShow"></i>
      </div>
      <cmp-table v-bind="optionTabel">
        <tr slot="head">
          <td>主体名称</td><td>主体代码</td><td>经营场所</td><td>法定代表人</td><td>产业类型</td><td>主体性质</td><td>负责人姓名</td><td>登录账号</td><td>生产主体提交时间</td><td>身份验证时间</td>
        </tr>
        <tr slot="body" slot-scope="props">
          <td>{{props.item.name}}</td><td>{{props.item.qysl}}</td><td>{{props.item.qyxzsl}}</td><td>{{props.item.zzcyl}}</td><td>{{props.item.xmycl}}</td>
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
    name: 'Dsh',
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
        formShow: true,
        name: '',
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
        optionTab: {
          acitve: 0,
          list: [
            {
              name: '待审核'
            }
          ]
        },
        optionTabel: {
          data: []
        },
        optionPagebarPagesize: {
          // theme: 'simple',
          // 当期页
          index: 1,
          // 总页数
          totalPage: 1,
          pagesizes: [
            10, 20, 30, 40, 50
          ],
          pagesize: 300
        }
      };
    },
    mounted: function () {
      ajaxGetDshData({}, function (data) {
        // 
      });
    },
    methods: {
      cbkClkCity: function (data) {
        console.log('====cbkClkCity====');
        console.log(data);
        this.optionXian.data = [];
        this.$nextTick(function () {
          this.optionXian.data = data[0].child;
        });
      },
      cbkClkXian: function (data) {
        console.log('====cbkClkXian====');
        console.log(data);
        this.optionXiang.data = [];
        this.$nextTick(function () {
          this.optionXiang.data = data[0].child;
        });
      },
      cbkClkXiang: function (data) {
        console.log('====cbkClkXiang====');
        console.log(data);
      },
      callbackPagebar: function (data) {
        console.log('====callbackPagebar====');
        console.log(data);
      }
    }
  };
</script>

<style lang="scss">
  .wrap {}
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
  }

  // 笔记本尺寸 1366 * 768
  @media screen and (max-width: 1366px) {}
</style>
