<template>
  <div class="login-container">
    <el-form class="login-form" :rules="loginRules">
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <!-- 用户名组件 -->
      <el-form-item prop="username">
        <!-- 用户图标 -->
        <span class="svg-container">
          <svg-icon iconName="账号" />
        </span>
        <!-- input框 -->
        <el-input
          placeholder="username"
          v-model="loginForm.username"
          name="username"
          type="text"
        ></el-input>
      </el-form-item>

      <!-- 密码组件 -->
      <el-form-item prop="password">
        <!-- 密码图标 -->
        <span class="svg-container">
          <svg-icon iconName="密码" />
        </span>
        <!-- input -->
        <el-input
          v-model="loginForm.password"
          placeholder="password"
          name="passwaord"
          :type="flag ? 'password' : 'text'"
        ></el-input>
        <!-- 密码的显示和隐藏图标 -->
        <span class="svg-container" @click="toggleIcon">
          <svg-icon :iconName="flag ? '不可见' : '可见'" />
        </span>
      </el-form-item>
      <el-button type="primary" style="width: 100%; margin-top: 30px"
        >登录</el-button
      >
    </el-form>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const loginForm = ref({
  username: '',
  password: ''
})
// const loginRules = ref({
//   username: [
//     {
//       required: true,
//       message: '不能为空',
//       trigger: 'blur'
//     }
//   ],
//   password: [
//     {
//       required: true,
//       trigger: 'blur',
//       message: '不能为空'
//     }
//   ]
// })
const flag = ref(true)
function toggleIcon() {
  flag.value = !flag.value
}
</script>
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;
.login-container {
  min-height: 100%;
  width: 100%;
  height: 100%;
  background: $bg;
  overflow: hidden;

  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;

      .el-input {
        height: 47px;
        width: 85%;

        .el-input__inner {
          background: transparent;
          border: 0px;
          border-radius: 0px;
          padding: 12px 5px 12px 15px;
          color: $cursor;
          height: 47px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 5px 15px;
      color: $dark_gray;
      vertical-align: middle;
      display: inline-block;
    }
  }
}
</style>
