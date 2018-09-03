<template>
  <div id="app">
    <router-view></router-view>
    <loading v-model="optionLoading.show" v-bind="optionLoading"></loading>
    <!-- <Dialog v-model="optionDialog.show" v-bind="optionDialog"></Dialog> -->
    <!-- <dialog v-model="optionDialog.show" v-bind="optionDialog"></dialog> -->
    <prompt v-bind="optionPrompt" v-model="optionPrompt.show">
      <span slot="title">投票成功</span>
    </prompt>
  </div>
</template>

<script>
  import Vue from 'vue';
  // import {Loading, Tip, Alert} from 'web-base-ui';
  // import {lsgGetData, lsgDeleteData, lsgSaveData} from '../node_modules/web-js-tool/libs/js/util';

  export default {
    name: 'app',
    components: {
      // cmpLoading: Loading,
      // cmpTip: Tip,
      // cmpAlert: Alert
    },
    data: function () {
      return {
        optionLoading: {
          show: false,
          text: ' 正在加载中...',
          modal: false
        },
        optionDialog: {
          show: false,
          modal: false,
          // error|success|warning
          type: 'success',
          stl: {
            header: {
              // left|center
              'text-align': 'center'
            },
            section: {
              // left|center|right
              'text-align': 'center'
            },
            footer: {
              // left|center|right
              'text-align': 'center'
            }
          },
          buttons1: [],
          buttons: [{
            text: '放弃修改',
            // primary|success|info|warning|danger|#f56c6c
            theme: 'line'
          }, {
            text: '修改',
            theme: 'warning'
          }]    
        },
        optionPrompt: {
          show: false,
          modal: true,
          stl: {
            footer: {
              // left|center|right
              'text-align': 'right'
            }
          },
          buttons2: [],
          buttons: [{
            text: '放弃修改',
            // primary|success|info|warning|danger|#f56c6c
            theme: 'line'
          }, {
            text: '修改',
            theme: 'warning'
          }]
        }
      };
    },
    mounted: function () {
      let _this = this;

      Vue.prototype.$loading = function (option) {
        _this.optionLoading = Object.assign(_this.optionLoading, option);
      };
      Vue.prototype.$dialog = function (option) {
        _this.optionDialog = Object.assign(_this.optionDialog, option);
      };
      Vue.prototype.$prompt = function (option) {
        _this.optionPrompt = Object.assign(_this.optionPrompt, option);
      };
    },
    watch: {
      //
    },
    methods: {
      toPage: function (path, type) {
        if (!path) {
          switch (type) {
            case 0:
              path = '/#/login';
              break;
            case 1:
              path = '/#/home';
              break;
            case 2:
              path = '/#/addressBookAdmin';
              break;
            default:
              path = '/#/home';
          }
        }
        var search = location.href.split('?');

        if (search.length !== 2) {
          search = '';
        } else {
          search = '?' + search[1];
        }
        window.location.href = location.origin + path + search;
      }
    }
  };
</script>

<style type="text/css">
  #app {
    position: relative;
    width: 100%;
    height: 100%;
    min-width: 1350px;
    min-height: 660px;
    overflow: auto;
    background-color: #3d484e;
  }
</style>
