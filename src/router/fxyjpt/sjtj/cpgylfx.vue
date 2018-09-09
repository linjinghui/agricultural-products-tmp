<template>
  <div class="wrap">
    <cmp-tab v-bind="optionTab"></cmp-tab>
    产品供应量分析
  </div>
</template>

<script>
  import {Tab} from 'web-base-ui';
  export default {
    name: 'Cpgylfx',
    components: {
      'cmpTab': Tab 
    },
    data () {
      return {
        optionTab: {
          acitve: 0,
          list: [
            {
              name: '产品供应量分析'
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
