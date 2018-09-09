<template>
  <div class="wrap">
    <cmp-tab v-bind="optionTab"></cmp-tab>
    <cmp-table v-bind="optionTabel">
      <tr slot="head">
        <td>姓名</td><td>性别</td><td>所在单位</td><td>职务</td><td>手机号</td><td>所属角色</td><td>干系人配置</td>
      </tr>
      <tr slot="body" slot-scope="props">
        <td>{{props.item.name}}</td><td>{{props.item.qysl}}</td><td>{{props.item.qyxzsl}}</td><td>{{props.item.zzcyl}}</td><td>{{props.item.xmycl}}</td><td>{{props.item.zzcyl}}</td><td>{{props.item.xmycl}}</td>
      </tr>
    </cmp-table>
  </div>
</template>

<script>
  import {Echarts, Radio, Checkbox, Table, Tab} from 'web-base-ui';
  import {ajaxGetAreaKbData} from '../../../data/ajax.js';

  export default {
    name: 'Login',
    components: {
      'cmpEcharts': Echarts,
      'cmpRadio': Radio,
      'cmpCheckbox': Checkbox,
      'cmpTable': Table,
      'cmpTab': Tab
    },
    data () {
      return {
        optionTab: {
          acitve: 0,
          list: [
            {
              name: '风险干系人配置'
            }
          ]
        },
        optionTabel: {
          data: []
        }
      };
    },
    mounted: function () {
      var _this = this;

      ajaxGetAreaKbData({}, function (data) {
        if (data.code === 0) {
          _this.optionTabel.data = data.ret;
        } else {
          _this.$tip({ show: true, text: data.msg, theme: 'danger' });
        }
      });
    },
    methods: {
      // 
    }
  };
</script>

<style lang="scss">
  .wrap {}
</style>
<style scoped lang="scss">
  .wrap {
    background-color: transparent;
  }

  // 笔记本尺寸 1366 * 768
  @media screen and (max-width: 1366px) {}
</style>
