<!-- 认证情况统计统计 -->
<template>
    <div class="wrap">

        <div class="part tabel">
            <cmp-table v-bind="optionMainTabel">
                <tr slot="head">
                    <td>主体性质</td><td>主体数(家)</td>
                </tr>
                <tr slot="body" slot-scope="props">
                    <td>{{props.item.entProperty}}</td><td>{{props.item.staNo}}</td>
                </tr>
            </cmp-table>
        </div>

        <div class="part pie">
            <cmp-echarts :option="optionPie"></cmp-echarts>
        </div>

        <div class="part time">
            <p class="title">时间</p>
            <cmp-radio v-model="timeArr.val" v-for="(item,index) in timeArr.arr" :key="'rd_'+index" :val="item.val">{{item.name}}</cmp-radio>
            <div v-show="timeShow" >
                <div class="timeDiv">
                    <cmp-date-picker class="f-dom" v-model="query.startTime"></cmp-date-picker>
                </div>
                <div class="timeDiv">
                    <cmp-date-picker class="f-dom" v-model="query.endTime"></cmp-date-picker>
                </div>
            </div>
        </div>

        <div class="part tabel">
            <cmp-table v-bind="optionMainTabel">
                <tr slot="head">
                    <td>主体性质</td><td>主体数(家)</td>
                </tr>
                <tr slot="body" slot-scope="props">
                    <td>{{props.item.entProperty}}</td><td>{{props.item.staNo}}</td>
                </tr>
            </cmp-table>
        </div>
        <div class="part bar">
            <cmp-echarts :option="optionBar"></cmp-echarts>
        </div>

        <div class="part area">
            <p class="title">区域</p>
            <!-- <cmp-checkbox v-model="areaArr.full" val="0" @click="clkAreaFull">全部区域</cmp-checkbox> -->
            <cmp-checkbox v-model="areaArr.val" v-for="(item,index) in areaArr.arr" :key="'ckb_'+index" :val="item.val" @click="clkArea">{{item.name}}</cmp-checkbox>

        </div>

    </div>
</template>

<script>
  import {Echarts, Radio, Checkbox, FlatDatePicker, Button, Table, PagebarPagesize} from 'web-base-ui';
  // import {ajaxGetCylxzb, ajaxGetFmsltj, ajaxGetQyxs, ajaxGetEnterpriseByArea} from '../../../data/ajax.js';
  import {ajaxStaEntProperty} from '../../../data/fxyjajax.js';


  export default {
    name: 'rzqktj',
    components: {
      'cmpEcharts': Echarts,
      'cmpRadio': Radio,
      'cmpDatePicker': FlatDatePicker,
      'cmpCheckbox': Checkbox,
      'cmpButton': Button,
      'cmpTable': Table,
      'cmpPagebarPagesize': PagebarPagesize
    },
    data () {
      return {
        optionBar: {},
        optionPie: {},
        timeShow: false,
        optionMainTabel: {
          data: []
        },
        optionCityTabel: {
          data: []
        },
        query: {},
        timeArr: {
          val: '',
          arr: [
            {
              val: '1',
              name: '今天之前'
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
              name: '自定义区间'
            }
          ]
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
      this.timeArr.val = '2';
      // 查询统计数据
      this.queryEntPropertySta();
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
            text: '主体性质数据统计',
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
            text: '主体性质分布',
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
      clkOutput: function () {
        console.log('导出按钮');
      },
      // 整理查询数据，在echart中使用
      parseResult: function (resultList, pieData) {
        var nameArr = [];
        var valueArr = [];

        resultList.forEach(function (item) {
          nameArr[nameArr.length] = item.entProperty;
          valueArr[valueArr.length] = item.staNo;
          var o = {};

          o.name = item.entProperty;
          o.value = item.staNo;
          pieData.push(o);
        });
        return [nameArr, valueArr, pieData];
      },
      queryEntPropertySta: function () {
        var _this = this;

        ajaxStaEntProperty(this.query, function (data) {
          if (data.code === 0) {
            // 设置饼图
            var pieData = [];
            var temp = _this.parseResult(data.ret, pieData);

            _this.optionMainTabel.data = data.ret;
            _this.setBarOption(temp[0], temp[1]);
            _this.setPieOption(temp[0], pieData);
            _this.barData = temp;
          } else {
            _this.$tip({ show: true, text: data.msg, theme: 'danger' });
          }
        });
      },
      clkTime: function () {

        this.timeShow = (this.timeArr.val === '4');
        console.log('clkTime---' + this.timeArr.val + '---' + this.timeShow);
        /* if (this.timeArr.val === '4') {
          console.log('clkTime---' + this.timeArr.val);
        } else*/

        // var _this = this;
        /* var parseResult = function (resultList) {
          var nameArr = [];
          var valueArr = [];

          resultList.forEach(function (item) {
            nameArr[nameArr.length] = item.name;
            valueArr[valueArr.length] = item.value;
          });
          return [nameArr, valueArr];
        };*/

        /* ajaxGetCylxzb({'timeType': this.timeArr.val}, function (data) {
          if (data.code === 0) {
            // var temp = parseResult(data.ret);

            // _this.setPieOption(temp[0], data.ret);
          } else {
            _this.$tip({ show: true, text: data.msg, theme: 'danger' });
          }
        });
        ajaxGetFmsltj({'timeType': this.timeArr.val}, function (data) {
          if (data.code === 0) {
            // var temp = parseResult(data.ret);

            // _this.setBarOption(temp[0], temp[1]);
          } else {
            _this.$tip({ show: true, text: data.msg, theme: 'danger' });
          }
        });
        ajaxGetQyxs({'timeType': this.timeArr.val}, function (data) {
          if (data.code === 0) {
            _this.setMapOption(data.ret);
          } else {
            _this.$tip({ show: true, text: data.msg, theme: 'danger' });
          }
        });*/

      },
      clkArea: function () {
        console.log('选择的区域--' + this.areaArr.val);
        this.query.areaArr = this.areaArr.val;
        this.queryEntPropertySta();


        // if (this.areaArr.val.length === 0) {
        //   // alert('取全省数据');
        // } else {
        //   // alert('按区域取数据:' + this.areaArr.val);
        // }
        /* if (this.optionPagebarPagesize.index === 1) {
          this.callbackPagebar({
            currentPage: 1,
            pagesize: this.optionPagebarPagesize.pagesize
          });
        } else {
          this.optionPagebarPagesize.index = 1;
        }*/

      }
      /* callbackPagebar: function (data) {
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
      }*/
    }
  };
</script>

<style lang="scss">
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
        background-color: transparent;

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
        >.partSta {
            margin-top: 10px;
            margin-left: 10px;
            padding: 10px;
            float: left;
            border: inherit;
            border-width: 1px;
            height: 440px;

            >.part {
                float: left;
                border: inherit;
                border-width: 1px;
                height: 420px;
            }
        }
        >.tabel {
            width: calc(45% - 10px - 10px);
        }

        >.pie {
            width: calc(45% - 10px - 10px - 10px - 10px);
        }
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
    }

    .timeDiv {
        margin-top: 10px;
        padding-top: 11px;
    }

    // 笔记本尺寸 1366 * 768
    @media screen and (max-width: 1366px) {}
</style>
