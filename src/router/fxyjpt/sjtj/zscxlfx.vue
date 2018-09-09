<template>
  <div class="wrap">
    <cmp-tab v-bind="optionTab"></cmp-tab>
    追溯查询量分析
  </div>
</template>

<script>
  import {Tab} from 'web-base-ui';
  export default {
    name: 'Zscxlfx',
    components: {
      'cmpTab': Tab 
    },
    data () {
      return {
        optionTab: {
          acitve: 0,
          list: [
            {
              name: '追溯查询量分析'
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
