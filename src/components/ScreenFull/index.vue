<template>
  <div>
    <svg-icon
      :iconName="isScreenFull ? 'exit-fullscreen' : 'fullscreen'"
      @click="toggleScreenFull"
      class="screenIcon"
    ></svg-icon>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import screenfull from 'screenfull'

const isScreenFull = ref(false)
const toggleScreenFull = () => {
  isScreenFull.value = !isScreenFull.value
  // 使用 screenfull 插件实现全屏切换
  screenfull.toggle() // 默认是 body 切换
}
</script>
<style lang="scss" scoped>
.screenIcon {
  fill: currentColor;
  color: #333939;
}
</style>
