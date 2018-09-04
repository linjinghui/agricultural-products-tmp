<template>
  <div class="wrap">
    <div class="part pie">
      <cmp-echarts :option="optionPie"></cmp-echarts>
    </div>
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
          <td>企业名称</td><td>行政区划</td><td>企业信息完整度</td><td>销售量</td><td>赋码数量</td>
        </tr>
        <tr slot="body" slot-scope="props">
          <td>{{props.item.enterName}}</td><td>{{props.item.xzqh}}</td><td>{{props.item.xxwzd}}</td><td>{{props.item.xsl}}</td><td>{{props.item.fmsl}}</td>
        </tr>
      </cmp-table>
    </div>
    <div class="part area">
      <p class="title">区域</p>
      <!-- <cmp-checkbox v-model="areaArr.full" val="0" @click="clkAreaFull">全部区域</cmp-checkbox> -->
      <cmp-checkbox v-model="areaArr.val" v-for="(item,index) in areaArr.arr" :key="'ckb_'+index" :val="item.val" @click="clkArea">{{item.name}}</cmp-checkbox>
    </div>
    <div class="part pagebar">
      <cmp-pagebar-pagesize v-bind="optionPagebarPagesize" @callback="callbackPagebar"></cmp-pagebar-pagesize>
    </div>
  </div>
</template>

<script>
  import {Echarts, Radio, Checkbox, Table, PagebarPagesize} from 'web-base-ui';
  import {ajaxGetCylxzb, ajaxGetFmsltj, ajaxGetQyxs, ajaxGetEnterpriseByArea} from '../../data/ajax.js';

  export default {
    name: 'Fmqykb',
    components: {
      'cmpEcharts': Echarts,
      'cmpRadio': Radio,
      'cmpCheckbox': Checkbox,
      'cmpTable': Table,
      'cmpPagebarPagesize': PagebarPagesize
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
      // this.clkArea();
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
            text: '赋码数量统计',
            left: 'left',
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
              data: [20, 40, 60, 80, 100, 120, 140],
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
       * data - [{ value: 335, name: '水果' }]
       * nameArr - ['水果', '蔬菜', '茶叶', '食用菌', '中草药', '牲畜', '家禽', '屠宰及肉类加工']
       */
      setPieOption: function (nameArr, data) {
        this.optionPie = {
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
          },
          title: {
            text: '产业类型占比',
            left: 'left',
            textStyle: {
              color: '#000000'
            }
          },
          legend: {
            orient: 'horizontal',
            width: 380,
            itemGap: 20,
            x: 'center',
            y: 40,
            data: nameArr
          },
          color: [ '#00c1ed', '#80c26b', '#ffd503', '#d1d5de', '#3c9bed', '#df4c3a', '#02a75b', '#f39c10' ],
          series: [
            {
              name: '',
              type: 'pie',
              radius: ['30%', '60%'],
              center: ['50%', '65%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: false,
                  textStyle: {
                    fontSize: '20',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: data
            }
          ]
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
            text: '区域销售'
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
      setTabelData: function () {
        for (var i = 0;i < 10;i++) {
          this.optionTabel.data.push({
            id: i,
            _name_: 'name' + i,
            _xzqh_: i * 10,
            _qyxxwzd_: i * 10 + '%',
            _xsl_: i * 33,
            _fmsl_: i * 11
          });
        }
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

        ajaxGetCylxzb({ 'timeType': this.timeArr.val}, function (data) {
          if (data.code === 0) {
            var temp = parseResult(data.ret);

            _this.setPieOption(temp[0], data.ret);
          } else {
            _this.$tip({ show: true, text: data.msg, theme: 'danger' });
          }
        });
        ajaxGetFmsltj({ 'timeType': this.timeArr.val}, function (data) {
          if (data.code === 0) {
            var temp = parseResult(data.ret);

            _this.setBarOption(temp[0], temp[1]);
          } else {
            _this.$tip({ show: true, text: data.msg, theme: 'danger' });
          }
        });
        ajaxGetQyxs({ 'timeType': this.timeArr.val}, function (data) {
          if (data.code === 0) {
            _this.setMapOption(data.ret);
          } else {
            _this.$tip({ show: true, text: data.msg, theme: 'danger' });
          }
        });
        
      },
      clkArea: function () {
        // if (this.areaArr.val.length === 0) {
        //   // alert('取全省数据');
        // } else {
        //   // alert('按区域取数据:' + this.areaArr.val);
        // }
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
        
        console.log('===callbackPagebar===');
        console.log(data);
        this.optionPagebarPagesize.index = data.currentPage;
        this.optionPagebarPagesize.pagesize = data.pagesize;
        ajaxGetEnterpriseByArea({
          area: this.areaArr.val,
          current: this.optionPagebarPagesize.index,
          pageSize: this.optionPagebarPagesize.pagesize
        }, function (data) {
          if (data.code === 0) {
            _this.optionTabel.data = data.ret.list;
            _this.optionPagebarPagesize.totalPage = parseInt((data.ret.totalSize - 1) / _this.optionPagebarPagesize.pagesize) + 1;
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

    >.pie,
    >.map {
      width: 22%;
    }
    >.bar {
      width: calc(45% - 10px - 10px - 10px - 10px);
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
