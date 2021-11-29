<template>
  <div :class="{ show: isShow }" class="header-search">
    <!-- 图标 -->
    <svg-icon
      iconName="search"
      class="search-icon"
      @click.stop="onClose"
    ></svg-icon>
    <!-- select 下拉选项 -->
    <el-select
      v-model="search"
      placeholder="Select"
      class="header-search-select"
      ref="searchSelectRef"
      filterable
      remote
      default-first-option
      :remote-method="querySearch"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchResult"
        :key="option.item.path"
        :label="option.item.title.join('>>')"
        :value="option.item"
      >
      </el-option>
    </el-select>
  </div>
</template>
<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { filterRouter, generateFuse } from '@/utils/router.js'
import Fuse from 'fuse.js'
import { watchLang } from '@/utils/i18n.js'

const router = useRouter()

const searchSelectRef = ref(null)

const isShow = ref(false)
// const toggleShow = () => {
//   onClose()
// }

// 用户输入检索的字符串
const search = ref('')

const searchResult = ref([])

// 检索方法
const querySearch = (query) => {
  searchResult.value = fuse.search(query)
}

// 选中 option 触发方法
const onSelectChange = (value) => {
  // search 修改
  search.value = value.title.join('>>')

  // 跳转
  router.push(value.path)
}

// 准备数据源
let list = computed(() => {
  // 去重
  const filterRoutes = filterRouter(router.getRoutes())
  //  格式化路由
  //    1、具备 meta && meta.title
  //    2、过滤掉动态路由
  return generateFuse(filterRoutes)
})

// 初始化 Fuse  -->  模糊搜索工具
let fuse
const initFuse = (list) => {
  fuse = new Fuse(list, {
    shouldSort: true, // 搜索的结果是否按照优先级排序
    minMatchCharLength: 2, // 搜索的字符最小长度
    keys: [
      {
        name: 'path', // 你要搜索的字段
        weight: 0.7 // 搜索的权重
      },
      {
        name: 'title',
        weight: 0.3
      }
    ]
  })
}
initFuse(list.value)
// 监听 language 的切换
watchLang((lang) => {
  list = computed(() => {
    const filterRoutes = filterRouter(router.getRoutes())
    return generateFuse(filterRoutes)
  })
  initFuse(list.value)
})

// 问题 1：收起的时候，清空上一次的 search 和 下拉列表数据
// 问题 2：点击其他位置 search 收起
const onClose = () => {
  search.value = ''
  searchResult.value = []
  isShow.value = !isShow.value
  // 展开自动获取焦点
  searchSelectRef.value.focus()
}
// 当 isShow 为 true 的时候 search 会展开
// 当 isShow 为 true 的时候绑定事件 ，让它可以点击其他的时候收起来，
// 当 isShow 为 false 的时候取消绑定事件
watch(isShow, (val) => {
  if (val) {
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})
</script>
<style lang="scss" scoped>
.header-search {
  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
    fill: currentColor;
    color: #414444;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0px;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    :deep(.el-input__inner) {
      border-radius: 0;
      border: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
      padding-left: 0;
      padding-right: 0;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
