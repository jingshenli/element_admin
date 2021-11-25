<template>
  <!-- el-icon -->
  <i :class="icon" v-if="icon.includes('el-icon')"></i>
  <!-- svg 全局组件 -->
  <svg-icon :iconName="icon" className="sideClass" v-else />
  <span>{{ getTitle(title) }}</span>
</template>
<script setup>
import { defineProps } from 'vue'
import { getTitle } from '@/utils/i18n.js'

defineProps({
  title: {
    type: String,
    requried: true
  },
  icon: {
    type: String,
    requried: true
  }
})

// 因为第一个icon图标显示不出来，所以用自己的方法修改了他的el-icon变成的svg需要的类名
// var prop = { ...props }
// if (prop.title === 'profile') {
//   prop.icon = 'user'
// }
</script>
<style lang="scss" scoped>
.sideClass {
  margin-right: 10px;
  margin-left: 3px;
}
</style>
