<template>
  <div class="">个人中心</div>
  {{ $t('msg.login.title') }}
  <el-pagination
    v-model:currentPage="currentPage1"
    :page-size="100"
    layout="total, prev, pager, next"
    :total="1000"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  >
  </el-pagination>
</template>

<script setup>
import {} from 'vue'
</script>

<style lang="scss" scoped></style>
