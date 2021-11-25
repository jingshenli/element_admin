<template>
  <div class="login-container">
    <el-form
      class="login-form"
      :model="loginForm"
      :rules="loginRules"
      ref="loginRef"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('msg.login.title') }}</h3>
        <select-lang class="select-lang" />
      </div>
      <!-- 用户名组件 -->
      <el-form-item prop="username">
        <!-- 用户图标 -->

        <span class="svg-container">
          <svg-icon iconName="user" />
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
          <svg-icon iconName="password" />
        </span>
        <!-- input -->
        <el-input
          v-model="loginForm.password"
          placeholder="password"
          name="password"
          :type="flag ? 'password' : 'text'"
        ></el-input>
        <!-- 密码的显示和隐藏图标 -->
        <span class="svg-container" @click="toggleIcon">
          <svg-icon :iconName="flag ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-button
        type="primary"
        style="width: 100%; margin-top: 30px"
        @click="handleLogin"
        >{{ $t('msg.login.loginBtn') }}</el-button
      >
      <!-- 账号提示 tips -->
      <div class="tips" v-html="$t('msg.login.desc')"></div>
    </el-form>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import { passwordValidate, usernameValidate } from './rule.js'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import SelectLang from '@/components/SelectLang/index.vue'

// useRouter 路由表所有信息
// Router 当前路由匹配的东西

// 表单双向数据绑定的值=数据
const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})
// 表单验证
const loginRules = ref({
  username: [
    {
      required: true, // 内容是否能为空
      trigger: 'blur', // 在什么条件下触发
      // message: i18n.t('msg.login.usernameRule') // 错误信息 这样写不具备响应式
      validator: usernameValidate()
    }
  ],
  password: [
    {
      // 使用了 validator以后是不能再使用 requried
      trigger: 'blur',
      validator: passwordValidate() // 这个方法的返回值就是验证以后的结果
    }
  ]
})

// 小眼睛，切换是password还是text
const flag = ref(true)
function toggleIcon() {
  flag.value = !flag.value
}

// 登录逻辑
// 定义整个表单的ref
const loginRef = ref(null)
const store = useStore()
const router = useRouter()
const handleLogin = () => {
  // 1、验证拿到的表单数据是否合法,每有几个验证规则的这个回调函数就会调用几次
  loginRef.value.validate((validate) => {
    if (!validate) {
      return // 当其中一个规则没有通过，就跳出回调函数，都成功了才能执行下面的逻辑
    }
    // 验证通过后执行登录的逻辑，保存token
    store.dispatch('user/login', loginForm.value).then((res) => {
      // 只有在登录成功以后才可以执行跳转
      router.push({
        name: 'Index'
      })
    })
  })
}

// 监听 getters.language 的变化
watch(
  () => store.getters.language,
  (newValue, oldValue) => {
    // 发生了中英文切换 验证要重新执行
    loginRef.value.validateField('username')
    loginRef.value.validateField('password')
  }
)
</script>
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;
.login-container {
  min-height: 100%;
  width: 100%;
  height: 100vh;
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
    :deep(.select-lang) {
      position: absolute;
      top: 4px;
      right: 0px;
      background-color: white;
      font-size: 24px;
      border-radius: 4px;
      cursor: pointer;
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
      border: 1px solid rgba(160, 156, 156, 0.1);
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
    .tips {
      font-size: 14px;
      line-height: 28px;
      color: white;
      margin-bottom: 10px;
    }
  }
}
</style>
