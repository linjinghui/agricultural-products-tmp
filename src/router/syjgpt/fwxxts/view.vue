<template>
  <div class="wrap view">
    <template v-if="xxInfo.status===0||xxInfo.status===1">
      <h2>{{xxInfo.title}}<label v-if="xxInfo.status===0" style="color:#ed6363;">[草稿]</label></h2>
      <p>{{xxInfo.userName}} - {{utlFormatDate(xxInfo.createTime)}}</p>
      <div class="content" v-html="xxInfo.content"></div>
    </template>
    <template v-else-if="xxInfo.status===2">
      {{'该信息已被撤回！'}}
    </template>
    <template v-else-if="xxInfo.status===3">
      {{'该信息已被删除！'}}
    </template>
    
  </div>
</template>

<script>
  import {dataFormat} from 'web-js-tool';
  import {ajaxGetYdxxData} from '../../../data/ajax.js';

  export default {
    name: 'Ckxx',
    components: {
      // 
    },
    props: {
      id: {
        default: ''
      }
    },
    data () {
      return {
        xxInfo: {}
      };
    },
    watch: {
      id: function (val) {
        this.getDetailInfo();
      }
    },
    mounted: function () {
      this.getDetailInfo();
    },
    methods: {
      utlFormatDate: function (dateLong) {
        return dateLong && dataFormat(new Date(dateLong), ' yyyy-MM-dd hh:mm:ss');
      },
      getDetailInfo: function () {
        if (this.id) {
          var _this = this;

          ajaxGetYdxxData({
            recId: this.id
          }, function (data) {
            if (data.code === 0) {
              _this.xxInfo = data.ret.info;
            } else {
              _this.$tip({ show: true, text: data.msg, theme: 'danger' });
            }
          });
        }
      }
    }
  };
</script>

<style lang="scss">
  .wrap.view {}
</style>
<style scoped lang="scss">
  .wrap.view {
    position: relative;
    margin: 0 auto;
    padding: 20px 0;
    width: 680px;
    color: #333;
    background-color: transparent;

    >h2 {
      font-size: 22px;
      line-height: 1.4;
      margin-bottom: 14px;
    }

    >p {
      font-size: 15px;
      color: rgba(0, 0, 0, 0.3);
    }

    >.content {
      margin-top: 20px;
      line-height: 24px;
    }
  }

  // 笔记本尺寸 1366 * 768
  @media screen and (max-width: 1366px) {}
</style>
