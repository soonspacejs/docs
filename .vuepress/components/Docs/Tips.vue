<template>
  <div class="docs-tips" v-if="time > 0">
    <div class="docs-tips-body">
      <img src="./gcd_logo_100.png" />
      <h1>庆祝中国共产党成立100周年</h1>
      <span class="time">{{ time }} 秒后自动关闭</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "docs-tips",
  data() {
    return {
      time: 5,
    };
  },
  mounted(){
    const t = setInterval(() => {
      if( this.time <= 0 ) clearInterval(t)
      this.time--
    }, 1000)
  }
};
</script>

<style lang="stylus">
.docs-tips {
  box-sizing: border-box;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  text-align: center;

  h1, .time {
    color: rgb(254, 194, 145);
  }

  &-body {
    position: relative;
    margin: 64px auto 0;
    width: 60%;
    background-color: #e60000;
    padding: 64px 0;
  }
}

@media (max-width: $MQMobile) {
  .docs-update {
    display: none;
  }
}
</style>