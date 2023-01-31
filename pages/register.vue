<template>
  <div class="main">
    <div class="title">
      <nuxt-link to="/login">登录</nuxt-link>
      <span>|</span>
      <nuxt-link class="active" to="/register">注册</nuxt-link>
    </div>

    <div class="sign-up-container">
      <el-form ref="registerForm" :model="registerInfo">
        <el-form-item
          prop="nickname"
          :rules="[
            { required: true, message: '请输入你的昵称', trigger: 'blur' },
          ]"
        >
          <div>
            <el-input
              type="text"
              placeholder="你的昵称"
              v-model="registerInfo.nickname"
            ></el-input>
          </div>
        </el-form-item>

        <el-form-item
          prop="email"
          :rules="[
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { validator: checkEmail, trigger: 'blur' },
          ]"
        >
          <div>
            <el-input
              type="text"
              placeholder="邮箱"
              v-model="registerInfo.email"
            ></el-input>
          </div>
        </el-form-item>

        <el-form-item
          prop="password"
          :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
        >
          <div>
            <el-input
              type="password"
              placeholder="密码"
              v-model="registerInfo.password"
            ></el-input>
          </div>
        </el-form-item>

        <el-form-item
          prop="code"
          :rules="[
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ]"
        >
          <div
            style="width: 100%; display: block; float: left; position: relative"
          >
            <el-input
              type="text"
              placeholder="验证码"
              v-model="registerInfo.code"
            ></el-input>
          </div>
          <div class="btn" style="position: absolute; right: 0; width: 40%">
            <el-button type="text" @click="sendVerification" :disabled="sent">{{
              codeBottonText
            }}</el-button>
          </div>
        </el-form-item>

        <div class="btn">
          <input
            type="button"
            class="sign-up-button"
            value="注册"
            @click="submitRegister"
          />
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import '~/assets/css/sign.css'

import register from '@/api/register'

export default {
  layout: 'sign',

  data() {
    return {
      registerInfo: {
        // 注册数据
        email: '',
        password: '',
        nickname: '',
        code: '',
      },
      sent: false, // 验证码是否发送
      second: 60, // 验证码发送冷却
      codeBottonText: '获取验证码',
    }
  },

  methods: {
    checkEmail(rule, value, callback) {
      if (!/^([a-z0-9_\\.-]+)@([\da-z\\.-]+)\.([a-z\\.]{2,6})$/.test(value)) {
        return callback(new Error('邮箱格式不正确'))
      }
      return callback()
    },

    timeDown() {
      let result = setInterval(() => {
        --this.second
        this.codeBottonText = this.second
        if (this.second < 1) {
          clearInterval(result)
          this.sent = false
          this.second = 60
          this.codeBottonText = '获取验证码'
        }
      }, 1000)
    },

    sendVerification() {
      if (!this.registerInfo.email) {
        this.$message({
          type: 'error',
          message: '邮箱不能为空',
        })
        return false
      }
      register.sendEmail(this.registerInfo.email).then((response) => {
        if (response.data.code === 404) {
          // 发送失败
          this.$message({
            type: 'error',
            message: response.data.message,
          })
          return false
        }
        // 发送成功
        this.sent = true
        this.$message({
          type: 'info',
          message: '已发送验证码',
        })
        this.timeDown()
      })
    },

    submitRegister() {
      register.register(this.registerInfo).then((response) => {
        if (response.data.code === 404) {
          // 注册失败
          this.$message({
            type: 'error',
            message: response.data.message,
          })
          return false
        }
        // 注册成功
        this.$message({
          type: 'success',
          message: '注册成功',
        })
        this.$router.push({
          path: '/login',
        })
      })
    },
  },
}
</script>

<style></style>
