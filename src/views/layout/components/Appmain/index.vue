<template>
  <div class="app-main">
    <!-- 二级路由显示容器 -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </div>
</template>
<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { isNoTag } from '@/utils/tag.js'
import { getTitle as getTitle_, watchLang } from '@/utils/i18n.js'

const route = useRoute()
const store = useStore()

// 获取 title
const getTitle = (to) => {
  if (!to.meta || !to.meta.title) {
    // 如果不存在 title
    const tmp = to.path.split('/')
    return tmp[tmp.length - 1]
  } else {
    // 如果存在 title ：约定以 path 的最后一项最为它的 title
    return getTitle_(to.meta.title)
  }
}
// 监听当前的路由变化  -->  增加 tag 到指定位置
watch(
  route,
  (to, from) => {
    if (isNoTag(to.path)) {
      return true
    }
    // 增加一个合法的 tag 到 vuex 中
    const { path, fullPath, meta, name, params, query } = to
    store.commit('tag/addTagViewList', {
      path,
      fullPath,
      meta,
      name,
      params,
      query,
      title: getTitle(to)
    })
  },
  { immediate: true }
)

// 当国际化切换，
watchLang(() => {
  // 要重新更新 vuex 中的 title 的值
  store.getters.tagViewList.forEach((route, index) => {
    store.commit('tag/changeTitle', {
      index: index,
      route: { ...route, title: getTitle(route) } // 不能使用 getTitle_(route.title)
    })
  })
})
</script>
<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  // position: relative;
  overflow: hidden;
  padding: 62px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
