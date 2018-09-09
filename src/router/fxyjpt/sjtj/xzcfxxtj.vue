<template>
  <div class="wrap">
    <cmp-tab v-bind="optionTab"></cmp-tab>
    行政处罚信息统计
  </div>
</template>

<script>
  import {Tab} from 'web-base-ui';
  export default {
    name: 'Xzcfxxtj',
    components: {
      'cmpTab': Tab 
    },
    data () {
      return {
        optionTab: {
          acitve: 0,
          list: [
            {
              name: '行政处罚信息统计'
            }
          ]
        } 
      };
    },
    mounted: function () {
      // 
    },
    methods: {
      // 
    }
  };
</script>

<style lang="scss">
  .wrap {}
</style>
<style scoped lang="scss">
  .wrap {
    background-color: transparent;
  }

  // 笔记本尺寸 1366 * 768
  @media screen and (max-width: 1366px) {}
</style>
