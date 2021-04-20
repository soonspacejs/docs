<template>
  <div class="docs-update" v-if="visible && isTipUpdate && !isOverTime">
    <div class="docs-update-body">
      <div class="docs-update-header">
        版本更新提示
      </div>
      <div class="docs-update-content">
        新版本<strong class="docs-update-highlight"> 2.x </strong>预计将在五一节后<strong class="docs-update-highlight"> 2021.5.6 </strong>发布正式版本。
        发布后会取消在<strong class="docs-update-highlight"> npm </strong>仓库中的<strong class="docs-update-highlight"> next </strong>标签。
        <br>
        <br>
        <strong class="docs-update-highlight">因此使用 1.x 的所有项目要注意以下几点：</strong>
        <ol>
          <li>锁定项目内使用的稳定版本。</li>
          <li>若想使用 1.x 最新版本，执行 <code>npm i soonspacejs@legacy</code>。</li>
          <li>文档移步<a href="http://www.xwbuilders.com:9018/soonspacejs/Docs/1.x/">这里</a></li>
        </ol>
      </div>
      <div class="docs-update-footer">
        <input id="footer-checkbox" type="checkbox" @change="isTipUpdateChange">
        <label class="docs-update-footer_label" for="footer-checkbox">不再提示</label>
        <button class="docs-update-footer_btn" @click="IKnow">我知道了</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "docs-update",
  computed: {
    isOverTime: function() {
      const date = new Date
      const y = date.getFullYear()
      const m = date.getMonth() + 1

      return y < 2022 && m > 6
    },
    isTipUpdate: function() {
      if( typeof window === 'object' ) {
       return window.localStorage.getItem('isTipUpdate') !== 'false'
      } else {
        return true
      }
    }
  },
  data() {
    return {
      visible: true,
      notTipNext: false
    };
  },
  methods: {
    IKnow() {
      this.visible = false

      if( typeof window === 'object' ) {
        this.notTipNext && window.localStorage.setItem('isTipUpdate', 'false')
      }
    },
    isTipUpdateChange(e) {
      this.notTipNext = e.target.checked
    }
  },
  mounted() {
    console.log(this.isOverTime)
  }
};
</script>

<style lang="stylus">
.docs-update
  box-sizing border-box
  position fixed
  width 100vw
  height 100vh
  top 0
  left 0
  background-color rgba(0, 0, 0, .6)
  z-index 1000

  &-highlight
    color $accentColor

  &-body
    position relative
    margin 128px auto 0
    width 60%
    background-color #fff

  &-header
    position relative
    padding 24px
    font-size 24px
    color #000
    font-weight bold
    border-bottom 1px solid $borderColor

  &-content
    position relative
    padding 16px 32px
    font-size 16px
    color $textColor
    line-height 1.7

  &-footer
    position relative
    padding 16px 32px
    border-top 1px solid $borderColor

    &_label
      font-size 14px

    &_btn
      position relative
      width 100px
      height 32px 
      background-color $accentColor
      color #fff
      border none
      font-size 14px
      border-radius 4px
      font-weight bold
      left calc(100% - 172px)

</style>