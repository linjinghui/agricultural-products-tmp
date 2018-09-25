<template>
  <div class="wrap fbxx">
    <cmp-tab v-bind="optionTab" @cbk="cbkTab"></cmp-tab>
    <div class="main" v-show="optionTab.current.id===1">
      <ul class="p-l">
        <p>栏目选择</p>
        <li :class="{'active': lmList.active===index}" v-for="(item,index) in lmList.data" 
          :key="'ylm_'+index" @click="lmList.active=index">{{item.columnName}}</li>
      </ul>
      <div class="p-r">
        <div class="wrap-form">
          <div class="form-layer">
            <label class="star">推送信息标题：</label>
            <cmp-input class="f-dom" autofocus="true" v-model="currentInfo.title" maxlength="50"></cmp-input>
            <small class="tip">&nbsp;</small>
          </div>
          <div class="form-layer">
            <label class="star"></label>
            <cmp-editor v-model="currentInfo.content" v-bind="optionEditor"></cmp-editor>
            <small class="tip">&nbsp;</small>
          </div>
          <div class="form-layer" style="text-align:right;">
            <cmp-button class="theme" @click="clkSend(1)">发布</cmp-button>
            <!-- <cmp-button theme="line" @click="clkSend(0)">存草稿</cmp-button> -->
          </div>
        </div>
      </div>
    </div>
    <cmp-mypublish v-if="optionTab.current.id===2"></cmp-mypublish>
  </div>
</template>

<script>
  import {Tab, Input, Button, Editor} from 'web-base-ui';
  import MyPublish from './myPublish.vue';
  import {ajaxGetCanUseLmDataList, ajaxPublish, ajaxUploadFile} from '../../../data/ajax.js';

  export default {
    name: 'Fbxx',
    components: {
      'cmpTab': Tab,
      'cmpInput': Input,
      'cmpButton': Button,
      'cmpEditor': Editor,
      'cmpMypublish': MyPublish
    },
    props: {
      title: ''
    },
    data () {
      return {
        optionTab: {
          active: 0,
          close: true,
          current: {},
          list: [
            {
              id: 1,
              name: this.title,
              close: false
            },
            {
              id: 2,
              name: '我发布的信息',
              close: false
            }
          ]
        },
        optionEditor: {
          placeholder: '请输入内容...',
          upImage: this.upImage
        },
        currentInfo: {},
        lmList: {
          active: 0,
          data: []
        }
      };
    },
    mounted: function () {
      var _this = this;

      // 获取有权限的栏目列表
      ajaxGetCanUseLmDataList(function (result) {
        if (result.code === 0) {
          _this.lmList.data = result.ret;
        } else {
          _this.$tip({ show: true, text: result.msg, theme: 'danger' });
        }
      });
    },
    methods: {
      cbkTab: function (data) {
        if (data) {
          this.optionTab.current = data;
        }
      },
      upImage: function (data, callback) {    
        var _this = this;
        var file = data[0].file;
        var size = data[0].size;
        var name = data[0].name;
        // var suffix = data[0].suffix;

        ajaxUploadFile({
          size: size,
          fileName: name,
          datafile: file
        }, function (result) {
          if (result.code !== 0) {
            _this.$tip({ show: true, text: result.msg, theme: 'danger' });
          }
          result.code = result.code === 0 ? 200 : result.code;
          result.url = result.ret.downloadUrl;
          callback && callback(result);          
        });        
      },
      clkSend: function (type) {
        var _this = this;
        var info = JSON.parse(JSON.stringify(this.currentInfo));

        info.status = type;
        if (this.lmList.active !== '') {
          info.columnId = this.lmList.data[this.lmList.active].columnId;
        }
        ajaxPublish(info, function (result) {
          if (result.code === 0) {
            _this.$tip({ show: true, text: type === 0 ? '已存为草稿！' : '发布成功！', theme: 'success' });
            _this.currentInfo = {};
            _this.lmList.active = '';
            setTimeout(function () { _this.optionTab.active = 1; }, 1000);
          } else {
            _this.$tip({ show: true, text: result.msg, theme: 'danger' });
          }
        });
      }
    }
  };
</script>

<style lang="scss">
  .wrap.fbxx {
    .ql-editor {
      min-height: 300px;
    }
  }
</style>
<style scoped lang="scss">
  .wrap.fbxx {
    background-color: transparent;
    
    >.main {
      position: relative;
      margin: 0 auto;
      margin-top: 20px;
      width: calc(100% - 20px - 20px);
      border: solid 1px #ccc;
      overflow: hidden;

      >.p-l {
        float: left;        
        width: 240px;
        min-height: 500px;
        border-right: solid 1px #ccc;

        > p {
          height: 30px;
          line-height: 30px;
          text-align: center;
          color: #fff;
          background-color: var(--theme);
        }

        > li {
          padding: 0 14px;
          height: 40px;
          line-height: 40px;
          border-bottom: solid 1px #ccc;
          overflow: hidden;
          cursor: pointer;
        }
        > li:hover {
          background-color: #e3edf3;
        }
        > li.active {
          background-color: #cbe3f3;
        }
      }
      >.p-r {
        float: left;
        padding: 14px;
        width: calc(100% - 240px);
      }
    }
  }

  // 笔记本尺寸 1366 * 768
  @media screen and (max-width: 1366px) {}
</style>
