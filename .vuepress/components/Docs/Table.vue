<template>
  <div class="docs-table">
    <BaseTable :head="head" :data="data" />
  </div>
</template>

<script>
import BaseTable from '../Base/Table'
export default {
  name: "docs-table",
  components: {
    BaseTable
  },
  data() {
    return {
      head: [
        { title: '属性', key: 'prop' },
        { title: '描述', key: 'desc' },
        { title: '类型', key: 'type' },
        { title: '必填', key: 'require' },
        { title: '默认值', key: 'default' },
      ]
    };
  },
  props: {
    data: Array
  }
};
</script>

<style lang="stylus">
.docs-table
  td 
    &:first-child
      color #003a8c
      width ($contentWidth / 30 * 5)
    &:nth-child(2)
      width ($contentWidth / 30 * 10)
    &:nth-child(3)
      width ($contentWidth / 30 * 7)
    &:nth-child(4)
      color #003a8c
      width ($contentWidth / 30 * 2)
    &:last-child
      width ($contentWidth / 30 * 6)

</style>