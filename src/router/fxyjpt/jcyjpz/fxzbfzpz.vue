<template>
  <div class="wrap">
    <cmp-tab v-bind="optionTab"></cmp-tab>
    <cmp-table v-bind="optionTabel">
      <tr slot="head">
        <td>风险等级</td><td>预警设置</td><td>配置</td>
      </tr>
      <tr slot="body" slot-scope="props">
        <td>{{props.item.name}}</td><td>{{props.item.qysl}}</td><td>{{props.item.qyxzsl}}</td>
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
              name: '风险指标阈值配置'
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
