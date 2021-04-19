<template>
  <iframe
    class="docs-iframe"
    :src="`${this.baseUrl}${this.src}`"
    frameborder="0"
  ></iframe>
</template>

<script>
export default {
  name: "docs-iframe",
  props: {
      src: String
  },
  data() {
    return {
      baseUrl: "http://www.xwbuilders.com:9018/soonspacejs/examples/page/2.x/"
    };
  }
};
</script>

<style lang="stylus" scoped>
.docs-iframe 
  width: 100%
  height: 400px
  padding: 12px 0

</style>