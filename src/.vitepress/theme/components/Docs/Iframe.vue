<template>
  <div class="docs-iframe">
    <iframe
      style="width: 100%; height: 100%"
      :src="`http://www.xwbuilders.com:8800/examples/page/${this.src}`"
      frameborder="0"
      loading="lazy"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts allow-pointer-lock allow-same-origin"
    ></iframe>
    <a id="code-button" target="_blank" :href="codeBtnHref"><img src="./close_black.svg"/></a>
  </div>
</template>

<script>
export default {
  name: "docs-iframe",
  props: {
    src: String,
  },
  data() {
    return {
      baseUrl: "http://www.xwbuilders.com:8800/examples/page/",
    };
  },
  computed: {
    codeBtnHref: function () {
      return (
        "https://github.com/soonspacejs/example/tree/main/page/" +
        this.src
      );
    },
  },
};
</script>

<style lang="stylus" scoped>
.docs-iframe 
  width: 100%
  height: 400px
  position relative
  padding-top 12px

#code-button 
  width 44px
  height 44px
  position: absolute
  right: 16px
  bottom: 16px
  border-radius: 50%
  margin-bottom: 0px
  background-color: #FFF
  opacity: .9
  img 
    position absolute
    top 50%
    left 50%
    transform: translateX(-50%) translateY(-50%)
  
</style>