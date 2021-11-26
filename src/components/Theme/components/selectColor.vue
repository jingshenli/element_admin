<template>
  <el-dialog
    :model-value="showDialogVariable"
    :title="$t('msg.theme.themeChange')"
    width="30%"
    :close="handleClose"
  >
    <!-- 取色器 -->
    <div class="content">
      <p class="title">{{ $t('msg.theme.themeColorChange') }}</p>
      <!-- predefine 定义预定颜色 -->
      <el-color-picker v-model="color" :predefine="predefineColor1" />
    </div>
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">{{
          $t('msg.universal.cancel')
        }}</el-button>
        <el-button type="primary" @click="confirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useStore } from 'vuex'
import { predefineColor } from '@/common/common.js'
import { generateNewStyle, writeStyleToHearTag } from '@/utils/theme.js'

const store = useStore()
defineProps({
  showDialogVariable: {
    type: Boolean,
    requried: true
  }
})
const emits = defineEmits(['closeDialog'])
// 关闭模态框
const handleClose = () => {
  // 触发自定义事件 closeDialog
  emits('closeDialog')
}
// 切换 切换按钮
const confirm = async () => {
  // 1、保存主题色
  store.commit('theme/setMyColor', color.value)
  // 2、替换element和本地的样式，让主题色生效
  /*
        1、获取所有的 element 的样式
        2、将样式中的所有情景色替换成 color.value
           color 基本上  -->  生成一系列的和它相近的情景色
        3、将替换完的样式插入到 header 中，利用css优先级让插入的样式生效
  */
  // 2-1 生成最终要替换的颜色
  const newStyle = await generateNewStyle(color.value)
  console.log(newStyle)

  // 2-2 将替换完的样式插入到 header 中，利用css优先级让插入的样式生效
  writeStyleToHearTag(newStyle)
  // 3、关闭dialog
  emits('closeDialog')
}

// 取色器选中颜色  是它的主题色，并且要刷新的时候不能掉
// 其他地方需要主题色，所以要放在vuex和localStorage
const color = ref(store.getters.theme_color)

// 定义预定义颜色
const predefineColor1 = [...predefineColor]
</script>
<style lang="scss" scoped>
.content {
  text-align: center;
  .title {
    margin-bottom: 12px;
  }
}
</style>
