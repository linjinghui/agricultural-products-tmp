 <template>
  <div class="wrap">
    <cmp-tab v-bind="optionTab" @cbk="callbackTab"></cmp-tab>
    <component :is="currentTabComponent"></component>
  </div>
</template>

<script>
  import {Tab} from 'web-base-ui';
  import Fmqykb from './fmqykb.vue';
  import Dqzgzhkb from './dqzgzhkb.vue';

  export default {
    name: 'Home',
    components: {
      'cmpTab': Tab
    },
    data () {
      return {
        optionTab: {
          acitve: 0,
          list: [
            {
              name: '赋码企业看板'
            },
            {
              name: '地区主管综合看板'
            }
          ]
        },
        currentTabComponent: Fmqykb
      };
    },
    mounted: function () {
      // 
    },
    methods: {
      callbackTab: function (data) {
        if (data.name === '赋码企业看板') {
          this.currentTabComponent = Fmqykb;
        } else if (data.name === '地区主管综合看板') {
          this.currentTabComponent = Dqzgzhkb;
        }
      }
    }
  };
</script>

<style lang="scss">
  .wrap {
    >.wrap-tab {
      font-size: 14px;
      padding-left: 10px;
      background-color: #ccc!important;

      >.active {
        border: 0!important;
        border-radius: 0!important;
      }
    }
  }
</style>
<style scoped lang="scss">
  .wrap {
    >.wrap-tab {
      font-size: 14px;
      padding-left: 10px;
      background-color: #ccc!important;
    }
  }

  // 笔记本尺寸 1366 * 768
  @media screen and (max-width: 1366px) {}
</style>
