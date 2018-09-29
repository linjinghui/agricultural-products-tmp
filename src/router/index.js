import Vue from 'vue';
import Router from 'vue-router';

const Login = () => import('./login/index.vue');
const Index = () => import('./index/index.vue');
const Home = () => import('./home/index.vue');

const Syjgpt = () => import('./syjgpt/index.vue');
const Dbsx = () => import('./syjgpt/dbsx.vue');
const Dsh = () => import('./syjgpt/ztsh/dsh.vue');
const Lssh = () => import('./syjgpt/ztsh/lssh.vue');
const Shcx = () => import('./syjgpt/ztsh/shcx.vue');
const Ztxc = () => import('./syjgpt/ztdaxc/ztxc.vue');
const Yjcx = () => import('./syjgpt/ztdaxc/yjcx.vue');
const Giszs = () => import('./syjgpt/ztdaxc/giszs.vue');
const Mcqy = () => import('./syjgpt/ztdaxc/mxqy.vue');
const Hmdqy = () => import('./syjgpt/ztdaxc/hmdqy.vue');
const Cpjbxxxc = () => import('./syjgpt/scgcxc/cpjbxxxc.vue');
const Scxkjg = () => import('./syjgpt/scgcxc/scxkjg.vue');
const Scjhxc = () => import('./syjgpt/scgcxc/scjhxc.vue');
const Nzjtrpxc = () => import('./syjgpt/scgcxc/nzjtrpxc.vue');
const Scghjxc = () => import('./syjgpt/scgcxc/scghjxc.vue');
const Ccpxxxc = () => import('./syjgpt/scgcxc/ccpxxxc.vue');
const Jcxxxc = () => import('./syjgpt/scgcxc/jcxxxc.vue');
const Fmxxxc = () => import('./syjgpt/fmxxxc/fmxxxc.vue');
const Xslxxc = () => import('./syjgpt/fmxxxc/xslxxc.vue');
const Xcwt = () => import('./syjgpt/jggl/xcwt.vue');
const Ajgl = () => import('./syjgpt/jggl/ajgl.vue');
const Jypgl = () => import('./syjgpt/jggl/jypgl.vue');
const Hmdgl = () => import('./syjgpt/jggl/hmdgl.vue');
const Xzcfgl = () => import('./syjgpt/jggl/xzcfgl.vue');
const Jdjcgl = () => import('./syjgpt/jggl/jdjcgl.vue');
const Jgdlrzcx = () => import('./syjgpt/gzjd/jgdlrzcx.vue');
const Jgczrzcx = () => import('./syjgpt/gzjd/jgczrzcx.vue');
const Scztdlrzcx = () => import('./syjgpt/gzjd/scztdlrzcx.vue');
const Scztczrzcx = () => import('./syjgpt/gzjd/scztczrzcx.vue');

// 栏目设置
const Lmsz = () => import('./syjgpt/fwxxts/lmsz.vue');
// 阅读信息
const Ydxx = () => import('./syjgpt/fwxxts/ydxx.vue');
// 发布信息
const Fbxx = () => import('./syjgpt/fwxxts/fbxx.vue');
// 信息监管
const Xxjg = () => import('./syjgpt/fwxxts/xxjg.vue');

// =============分析预警平台=============

const Fxyjpt = () => import('./fxyjpt/index.vue');
const Fxyjsy = () => import('./fxyjpt/fxyjsy/fxyjsy.vue');

const Jcyjpz = () => import('./fxyjpt/jcyjpz/index.vue');
const Fxpz = () => import('./fxyjpt/jcyjpz/fxpz.vue');
const Fxzbfzpz = () => import('./fxyjpt/jcyjpz/fxzbfzpz.vue');
const Fxgxrpz = () => import('./fxyjpt/jcyjpz/fxgxrpz.vue');


const Yjff = () => import('./fxyjpt/jcyjpz/yjff.vue');
const Jqcl = () => import('./fxyjpt/jcyjpz/jqcl.vue');

const Ksjcfxjc = () => import('./fxyjpt/fxyjcgl/ksjcfxjc.vue');
const Qyzzyzjc = () => import('./fxyjpt/fxyjcgl/qyzzyzjc.vue');
const Syncpcljc = () => import('./fxyjpt/fxyjcgl/syncpcljc.vue');
const Syncpycfxjc = () => import('./fxyjpt/fxyjcgl/syncpycfxjc.vue');
const Syncpzlfxjc = () => import('./fxyjpt/fxyjcgl/syncpzlfxjc.vue');
const Syxxtxjc = () => import('./fxyjpt/fxyjcgl/syxxtxjc.vue');

const Cpgylfx = () => import('./fxyjpt/sjtj/cpgylfx.vue');
const Jdjcxxtj = () => import('./fxyjpt/sjtj/jdjcxxtj.vue');
const Pthydfx = () => import('./fxyjpt/sjtj/pthydfx.vue');
const Xzcfxxtj = () => import('./fxyjpt/sjtj/xzcfxxtj.vue');
const Zscxlfx = () => import('./fxyjpt/sjtj/zscxlfx.vue');
const Ztxztj = () => import('./fxyjpt/sjtj/ztxztj.vue');

const Cylxtj = () => import('./fxyjpt/sjtj/cylxtj.vue');
const Fmsltj = () => import('./fxyjpt/sjtj/fmsltj.vue');
const Rzqktj = () => import('./fxyjpt/sjtj/rzqktj.vue');
const Scgmtj = () => import('./fxyjpt/sjtj/scgmtj.vue');
const Zbxxtj = () => import('./fxyjpt/sjtj/zbxxtj.vue');
const Ztfbtj = () => import('./fxyjpt/sjtj/ztfbtj.vue');
const Ztsltj = () => import('./fxyjpt/sjtj/ztsltj.vue');
const Zxscxxtj = () => import('./fxyjpt/sjtj/zxscxxtj.vue');
const Nzpsyqktj = () => import('./fxyjpt/sjtj/nzpsyqktj.vue');


// ==============基础平台==============
const Jcpt = () => import('./jcpt/index.vue');

const Zzjggl = () => import('./jcpt/xtgl/zzjggl.vue');
const Yhgl = () => import('./jcpt/xtgl/yhgl.vue');
const Jsjqxgl = () => import('./jcpt/xtgl/jsjqxgl.vue');

const Cylxsz = () => import('./jcpt/sjzd/cylxsz.vue');
const Qtzdsz = () => import('./jcpt/sjzd/qtzdsz.vue');


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
          component: Syjgpt,
          children: [
            {
              path: '/dbsx',
              name: 'dbsx',
              component: Dbsx
            },
            // {
            //   path: '/',
            //   name: 'dsh',
            //   component: Dsh
            // },
            {
              path: '/dsh',
              name: 'dsh',
              component: Dsh
            },
            {
              path: '/lssh',
              name: 'lssh',
              component: Lssh
            },
            {
              path: '/shcx',
              name: 'shcx',
              component: Shcx
            },
            {
              path: '/ztxc',
              name: 'ztxc',
              component: Ztxc
            },
            {
              path: '/yjcx',
              name: 'yjcx',
              component: Yjcx
            },
            {
              path: '/giszs',
              name: 'giszs',
              component: Giszs
            },
            {
              path: '/mcqy',
              name: 'mcqy',
              component: Mcqy
            },
            {
              path: '/hmdqy',
              name: 'hmdqy',
              component: Hmdqy
            },
            {
              path: '/cpjbxxxc',
              name: 'cpjbxxxc',
              component: Cpjbxxxc
            },
            {
              path: '/scxkjg',
              name: 'scxkjg',
              component: Scxkjg
            },
            {
              path: '/scjhxc',
              name: 'scjhxc',
              component: Scjhxc
            },
            {
              path: '/nzjtrpxc',
              name: 'nzjtrpxc',
              component: Nzjtrpxc
            },
            {
              path: '/scghjxc',
              name: 'scghjxc',
              component: Scghjxc
            },
            {
              path: '/ccpxxxc',
              name: 'ccpxxxc',
              component: Ccpxxxc
            },
            {
              path: '/jcxxxc',
              name: 'jcxxxc',
              component: Jcxxxc
            },
            {
              path: '/fmxxxc',
              name: 'fmxxxc',
              component: Fmxxxc
            },
            {
              path: '/xslxxc',
              name: 'xslxxc',
              component: Xslxxc
            },
            {
              path: '/xcwt',
              name: 'xcwt',
              component: Xcwt
            },
            {
              path: '/ajgl',
              name: 'ajgl',
              component: Ajgl
            },
            {
              path: '/jypgl',
              name: 'jypgl',
              component: Jypgl
            },
            {
              path: '/hmdgl',
              name: 'hmdgl',
              component: Hmdgl
            },
            {
              path: '/xzcfgl',
              name: 'xzcfgl',
              component: Xzcfgl
            },
            {
              path: '/jdjcgl',
              name: 'jdjcgl',
              component: Jdjcgl
            },
            {
              path: '/lmsz',
              name: 'lmsz',
              component: Lmsz
            },
            {
              path: '/ydxx',
              name: 'ydxx',
              component: Ydxx
            },
            {
              path: '/fbxx',
              name: 'fbxx',
              component: Fbxx
            },
            {
              path: '/xxjg',
              name: 'xxjg',
              component: Xxjg
            },
            {
              path: '/jgdlrzcx',
              name: 'jgdlrzcx',
              component: Jgdlrzcx
            },
            {
              path: '/jgczrzcx',
              name: 'jgczrzcx',
              component: Jgczrzcx
            },
            {
              path: '/scztdlrzcx',
              name: 'scztdlrzcx',
              component: Scztdlrzcx
            },
            {
              path: '/scztczrzcx',
              name: 'scztczrzcx',
              component: Scztczrzcx
            }
          ]
        },
        {
          path: '/fxyjpt',
          name: 'fxyjpt',
          component: Fxyjpt,
          children: [
            {
              path: '/fxyjsy',
              name: 'fxyjsy',
              component: Fxyjsy
            },
            {
              path: '/jcyjpz',
              name: 'jcyjpz',
              component: Jcyjpz,
              children: [
                  {
                    path: '/fxpz',
                    name: 'fxpz',
                    component: Fxpz
                  },
                  {
                    path: '/fxzbfzpz',
                    name: 'fxzbfzpz',
                    component: Fxzbfzpz
                  },
                  {
                    path: '/fxgxrpz',
                    name: 'fxgxrpz',
                    component: Fxgxrpz
                  },
                  {
                    path: '/yjff',
                    name: 'yjff',
                    component: Yjff
                  },
                  {
                    path: '/jqcl',
                    name: 'jqcl',
                    component: Jqcl
                  }
                ]
            },
            {
              path: '/ksjcfxjc',
              name: 'ksjcfxjc',
              component: Ksjcfxjc
            },
            {
              path: '/qyzzyzjc',
              name: 'qyzzyzjc',
              component: Qyzzyzjc
            },
            {
              path: '/syncpcljc',
              name: 'syncpcljc',
              component: Syncpcljc
            },
            {
              path: '/syncpycfxjc',
              name: 'syncpycfxjc',
              component: Syncpycfxjc
            },
            {
              path: '/syncpzlfxjc',
              name: 'syncpzlfxjc',
              component: Syncpzlfxjc
            },
            {
              path: '/syxxtxjc',
              name: 'syxxtxjc',
              component: Syxxtxjc
            },
            {
              path: '/cpgylfx',
              name: 'cpgylfx',
              component: Cpgylfx
            },
            {
              path: '/jdjcxxtj',
              name: 'jdjcxxtj',
              component: Jdjcxxtj
            },
            {
              path: '/pthydfx',
              name: 'pthydfx',
              component: Pthydfx
            },
            {
              path: '/xzcfxxtj',
              name: 'xzcfxxtj',
              component: Xzcfxxtj
            },
            {
              path: '/zscxlfx',
              name: 'zscxlfx',
              component: Zscxlfx
            },
            {
              path: '/ztxztj',
              name: 'ztxztj',
              component: Ztxztj
            },
            {
              path: '/cylxtj',
              name: 'cylxtj',
              component: Cylxtj
            },
            {
              path: '/rzqktj',
              name: 'rzqktj',
              component: Rzqktj
            },
            {
              path: '/scgmtj',
              name: 'scgmtj',
              component: Scgmtj
            },
            {
              path: '/ztsltj',
              name: 'ztsltj',
              component: Ztsltj
            },
            {
              path: '/fmsltj',
              name: 'fmsltj',
              component: Fmsltj
            },
            {
              path: '/zbxxtj',
              name: 'zbxxtj',
              component: Zbxxtj
            },
            {
              path: '/ztfbtj',
              name: 'ztfbtj',
              component: Ztfbtj
            },
            {
              path: '/zxscxxtj',
              name: 'zxscxxtj',
              component: Zxscxxtj
            },
            {
              path: '/nzpsyqktj',
              name: 'nzpsyqktj',
              component: Nzpsyqktj
            }
          ]
        },
        {
          path: '/jcpt',
          name: 'jcpt',
          component: Jcpt,
          children: [
            {
              path: '/zzjggl',
              name: 'zzjggl',
              component: Zzjggl
            },
            {
              path: '/yhgl',
              name: 'yhgl',
              component: Yhgl
            },
            {
              path: '/jsjqxgl',
              name: 'jsjqxgl',
              component: Jsjqxgl
            },
            {
              path: '/cylxsz',
              name: 'cylxsz',
              component: Cylxsz
            },
            {
              path: '/qtzdsz',
              name: 'qtzdsz',
              component: Qtzdsz
            }
          ]
        },
        {
          path: '/mmxg',
          name: 'mmxg',
          component: Mmxg
        }
      ]
    }
  ]
});
