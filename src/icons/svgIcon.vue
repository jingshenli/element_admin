<template>
  <svg aria-hidden="true" :class="getClassName">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script setup>
import { computed, defineProps } from 'vue'
import { useStore } from 'vuex'
const props = defineProps({
  iconName: {
    type: String,
    requrie: true
  },
  className: {
    type: String
  }
})
const iconName = computed(() => {
  return `#icon-${props.iconName}`
})
const store = useStore()
const getClassName = computed(() => {
  // 如果传了 className 并且值为 sideClass -->  defacltSvgClass sideClass
  if (props.className === 'sideClass') {
    if (store.getters.sideBarOpen) {
      return ['defaultSvgClass', props.className]
    } else {
      return `defaultSvgClass`
    }
  } else if (props.className === 'cuttle') {
    return ['defaultSvgClass', props.className]
  } else {
    return `defaultSvgClass`
  }
})
</script>
<style lang="scss" scoped>
.defaultSvgClass {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: -0.15em;
  overflow: hidden;
}
</style>
