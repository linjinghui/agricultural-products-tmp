import './style/main.css';
import Vue from 'vue';
import router from './router';
import App from './App';
// import './mock.js';
import {install} from 'web-base-ui';

// 注册全局组件
install(Vue);

const app = new Vue({
  router,
  ...App
});

app.$mount('#app');
