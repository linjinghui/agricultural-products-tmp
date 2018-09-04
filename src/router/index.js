import Vue from 'vue';
import Router from 'vue-router';

const Login = () => import('./login/index.vue');
const Index = () => import('./index/index.vue');
const Home = () => import('./home/index.vue');
const Syjgpt = () => import('./syjgpt/index.vue');
const Fxyjpt = () => import('./fxyjpt/index.vue');
const Jcpt = () => import('./jcpt/index.vue');
const Mmxg = () => import('./mmxg/index.vue');

Vue.use(Router);

export default new Router({
  mode: 'hash', // history, hash
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/syjgpt',
          name: 'syjgpt',
          component: Syjgpt
        },
        {
          path: '/fxyjpt',
          name: 'fxyjpt',
          component: Fxyjpt
        },
        {
          path: '/jcpt',
          name: 'jcpt',
          component: Jcpt
        },
        {
          path: '/mmxg',
          name: 'mmxg',
          component: Mmxg
        }
      ]
    }
    //, {
    //   path: '/index',
    //   name: 'index',
    //   component: Index,
    //   children: [
    //     {
    //       path: '/',
    //       name: 'section',
    //       component: Section
    //     },
    //     {
    //       path: '/home',
    //       name: 'home',
    //       component: Home
    //     }
    //   ]
    // }
  ]
});
