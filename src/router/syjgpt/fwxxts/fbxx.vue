<template>
  <div class="wrap fbxx">
    <cmp-tab v-bind="optionTab"></cmp-tab>
    <div class="main">
      <ul class="p-l">
        <p>栏目选择</p>
        <li class="active">asdasdddasd</li>
        <li>asdasdddasd</li>
        <li>asdasdddasd</li>
        <li>asdasdddasd</li>
      </ul>
      <div class="p-r">
        <div class="wrap-form">
          <div class="form-layer">
            <label class="star">推送信息标题：</label>
            <cmp-input class="f-dom" autofocus="true" v-model="currentInfo.name" maxlength="50"></cmp-input>
            <small class="tip">&nbsp;</small>
          </div>
          <div class="form-layer">
            <label class="star"></label>
            <!--  useCustomImageHandler @imageAdded="handleImageAdded" -->
            <vue-editor id="editor" :editorToolbar2="customToolbar" v-model="currentInfo.content"></vue-editor>
            <small class="tip">&nbsp;</small>
          </div>
          <div class="form-layer" style="text-align:right;">
            <cmp-button class="theme">发布</cmp-button>
            <cmp-button theme="line">存草稿</cmp-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Tab, Input, Button} from 'web-base-ui';
  import { VueEditor } from 'vue2-editor';
  // import {} from '../../../data/ajax.js';

  export default {
    name: 'Fbxx',
    components: {
      'cmpTab': Tab,
      'cmpInput': Input,
      'cmpButton': Button,
      'vueEditor': VueEditor
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
            }
          ]
        },
        customToolbar: [
          ['bold', 'italic', 'underline'],
          [
            { 'list': 'ordered' }, 
            { 'list': 'bullet' }
          ],
          ['image', 'code-block']
        ],
        currentInfo: {}
      };
    },
    mounted: function () {
      // 
    },
    methods: {
      handleImageAdded: function (data) {
        console.log('======handleImageAdded=======');
        console.log(data);
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
