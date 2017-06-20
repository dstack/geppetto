<template>
  <div class="settings-ct">
    <slot />
  </div>
</template>

<script></script>

<style lang="stylus">
  @import '../styl/colors'

  *
    box-sizing border-box

  html, body
    font-family sans-serif
    font-size 12px
    margin 0px
    padding 0px
    width 100%
    height 100%
    color gray
    background slate
    overflow hidden

  label
    margin 6px 6px 12px 6px
    display block
    input
      display block
    small
      color dk-gray

  input
    width 100%
    &[type=text]
      margin-top 6px
      border none 0px
      padding 8px 6px
      border-radius 3px
      background rgba(255,255,255,0.15)
      color gray
      &::placeholder
        color dk-gray

  input[type=range]
    appearance none
    display block
    width 90%
    margin 15px 5px
    background transparent

  input[type=range]::-webkit-slider-thumb
    appearance none
    height 24px
    width 12px
    border-radius 3px
    background lt-blue
    cursor pointer
    margin-top -9px
    box-shadow 0px 1px 5px rgba(0,0,0,0.35), 0px 0px 1px dk-gray

  input[type=range]:focus
    outline none

  input[type=range]::-webkit-slider-runnable-track
    width 100%
    height 6px
    margin 0px
    background blue

  .btn
    display inline-block
    border solid 1px white
    color white
    background transparent
    margin 6px
    padding 8px
    border-radius 3px
    cursor pointer
    &:hover
      background rgba(white, 0.14)

  .warning
    background orange
    color white
    padding 8px
    border-radius 3px
    text-align center
    margin 15px 0px
</style>
