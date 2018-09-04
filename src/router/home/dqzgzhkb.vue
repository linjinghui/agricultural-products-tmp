<template>
  <div class="wrap">
    <div class="part bar">
      <cmp-echarts :option="optionBar"></cmp-echarts>
    </div>
    <div class="part map">
      <cmp-echarts :option="optionMap" :map="map"></cmp-echarts>
    </div>
    <div class="part time">
      <p class="title">时间</p>
      <cmp-radio v-model="timeArr.val" v-for="(item,index) in timeArr.arr" :key="'rd_'+index" :val="item.val">{{item.name}}</cmp-radio>
    </div>
    <div class="part tabel">
      <cmp-table v-bind="optionTabel">
        <tr slot="head">
          <td>行政区划</td><td>企业数量</td><td>企业新增数量</td><td>种植业产量（公斤）</td><td>畜牧业产量（公斤）</td>
        </tr>
        <tr slot="body" slot-scope="props">
          <td>{{props.item.name}}</td><td>{{props.item.qysl}}</td><td>{{props.item.qyxzsl}}</td><td>{{props.item.zzcyl}}</td><td>{{props.item.xmycl}}</td>
        </tr>
      </cmp-table>
    </div>
    <div class="part area">
      <p class="title">区域</p>
      <cmp-checkbox v-model="areaArr.val" v-for="(item,index) in areaArr.arr" :key="'ckb_'+index" :val="item.val" @click="clkArea">{{item.name}}</cmp-checkbox>
    </div>
  </div>
</template>

<script>
  import {Echarts, Radio, Checkbox, Table} from 'web-base-ui';
  import {ajaxGetCylxzb, ajaxGetScztSltj, ajaxGetQycl, ajaxGetAreaKbData} from '../../data/ajax.js';

  export default {
    name: 'Dqzgzhkb',
    components: {
      'cmpEcharts': Echarts,
      'cmpRadio': Radio,
      'cmpCheckbox': Checkbox,
      'cmpTable': Table
    },
    data () {
      return {
        optionBar: {},
        optionPie: {},
        optionMap: {},
        map: {},
        timeArr: {
          val: '',
          arr: [
            {
              val: '1',
              name: '今天'
            },
            {
              val: '2',
              name: '本月'
            },
            {
              val: '3',
              name: '本年度'
            },
            {
              val: '4',
              name: '全部'
            }
          ]
        },
        optionTabel: {
          data: []
        },
        areaArr: {
          val: [],
          full: [],
          arr: [
            {
              val: '1',
              name: '福州市'
            },
            {
              val: '2',
              name: '宁德市'
            },
            {
              val: '3',
              name: '莆田市'
            },
            {
              val: '4',
              name: '泉州市'
            },
            {
              val: '5',
              name: '厦门市'
            },
            {
              val: '6',
              name: '漳州市'
            },
            {
              val: '7',
              name: '南平市'
            },
            {
              val: '8',
              name: '三明市'
            },
            {
              val: '9',
              name: '龙岩市'
            }
          ]
        }
      };
    },
    watch: {
      'timeArr.val': {
        deep: true,
        handler: function (val) {
          this.clkTime();
        }
      }
    },
    mounted: function () {
      // 默认取当天数据
      this.timeArr.val = '1';
      // 默认取全省区域企业数据
      this.clkArea();
    },
    methods: {
      /**
       * nameArr - ['水果', '蔬菜', '茶叶', '食用菌', '中草药', '牲畜', '家禽', '屠宰及肉类加工']
       * valueArr - [10, 52, 200, 334, 390, 330, 220, 119]
       */
      setBarOption: function (nameArr, valueArr) {
        this.optionBar = {
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            // 坐标轴指示器，坐标轴触发有效
            axisPointer: {
              // 默认为直线，可选为：'line' | 'shadow'
              type: 'shadow'
            }
          },
          title: {
            text: '生产主体数量统计',
            left: 'center',
            textStyle: {
              color: '#000000'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: nameArr,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              data: [200, 1400],
              name: '',
              nameTextStyle: {
                fontSize: 14
              }
            }
          ],
          series: [
            {
              name: '',
              type: 'bar',
              barWidth: '60%',
              data: valueArr
            }
          ],
          toolbox: {
            right: '3.5%',
            feature: {
              magicType: {
                show: true,
                type: ['line', 'bar']
              }
            }
          }
        };
      },
      /**
       * data - [{name: '福州市', value: 20057.34}, {name: '厦门市', value: 15477.48}, {name: '漳州市', value: 31686.1}, {name: '泉州市', value: 6992.6},
                {name: '莆田市', value: 44045.49}, {name: '宁德市', value: 40689.64}, {name: '南平市', value: 37659.78}, {name: '三明市', value: 45180.97},
                {name: '龙岩市', value: 55204.26}, {name: '平潭', value: 323.26}]
       */
      setMapOption: function (data) {
        var map = require('./map/fujian.js').default;

        this.optionMap = {
          title: {
            text: '区域产量'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c}'
            // formatter: '{b}<br/>{c} (p / km2)'
          },
          visualMap: {
            min: 100,
            max: 1000,
            text: ['高', '低'],
            realtime: false,
            calculable: true,
            inRange: {
              color: ['#03f', '#00ffff', '#00ff00']
            }
          },
          series: [
            {
              name: '',
              type: 'map',
              // 自定义扩展图表类型
              map: 'FJ',
              x: '30%',
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    color: '#333'
                  }
                }
              },
              data: data
            }
          ]
        };
        this.map = map;
      },
      clkTime: function () {
        var _this = this;
        var parseResult = function (resultList) {
          var nameArr = [];
          var valueArr = [];

          resultList.forEach(function (item) {
            nameArr[nameArr.length] = item.name;
            valueArr[valueArr.length] = item.value;
          });
          return [nameArr, valueArr];
        }

        ajaxGetScztSltj({ 'timeType': this.timeArr.val}, function (data) {
          if (data.code === 0) {
            var temp = parseResult(data.ret);

            _this.setBarOption(temp[0], temp[1]);
          } else {
            _this.$tip({ show: true, text: data.msg, theme: 'danger' });
          }
        });
        ajaxGetQycl({ 'timeType': this.timeArr.val}, function (data) {
          if (data.code === 0) {
            _this.setMapOption(data.ret);
          } else {
            _this.$tip({ show: true, text: data.msg, theme: 'danger' });
          }
        });
        
      },
      clkArea: function () {
        var _this = this;
        
        ajaxGetAreaKbData({
          area: this.areaArr.val
        }, function (data) {
          if (data.code === 0) {
            _this.optionTabel.data = data.ret;
          } else {
            _this.$tip({ show: true, text: data.msg, theme: 'danger' });
          }
        });
      }
    }
  };
</script>

<style lang="scss">
  #app {
    background-color: #fff;
  }
  .wrap {
    .wrap-table table {
      text-align: center;
    }

    .pagebar .wrap-drop-menu .wrap-menu {
      top: unset!important;
      bottom: calc(100% + 4px)!important;
    }
  }
</style>
<style scoped lang="scss">
  .wrap {
    padding-right: 10px;
    padding-bottom: 10px;
    width: 100%;
    height: 100%;
    border-style: solid;
    border-width: 0px;
    border-color: #ccc;
    overflow: hidden;

    >.part {
      margin-top: 10px;
      margin-left: 10px;
      padding: 10px;
      float: left;
      border: inherit;
      border-width: 1px;
      height: 420px;

      >.title {
        margin-bottom: 20px;
        font-size: 18px;
        font-weight: 700;
        color: #333;
      }

      >.radio,
      >.checkbox {
        display: block;
        margin-top: 14px;
      }
    }

    >.map {
      width: 29%;
    }
    >.bar {
      width: calc(60% - 10px - 10px - 10px);
    }
    >.time,
    >.area {
      width: 11%;
    }
    >.tabel {
      width: calc(89% - 10px - 10px);
    }
    >.pagebar {
      padding: 0;
      width: calc(100% - 10px);
      height: 40px;
      border-width: 0;
    }
  }

  // 笔记本尺寸 1366 * 768
  @media screen and (max-width: 1366px) {}
</style>
