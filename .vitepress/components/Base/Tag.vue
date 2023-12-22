<template>
  <span :style="{ background: color }" class="base-tag">{{ title }}</span>
</template>

<script>
export default {
  name: 'base-tag',
  props: {
    color: {
      type: String,
      default: '#108ee9',
    },
    title: String,
  },
};
</script>

<style lang="stylus" scoped>
.base-tag{
    font-size: 1rem
    padding: 2px 4px
    border-radius: 2px
    color: #fff
}
</style>
