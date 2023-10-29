<script setup>
import {Lock, User} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import {reactive} from "vue";
import {post} from "@/net";
import router from "@/router";


const form = reactive({
  username: '',
  password: '',
  remember: false

    })
const login = () =>{
  if (!form.username || !form.password){
    ElMessage.warning('请填写用户名和密码')
  }else {
    post('/api/auth/login', {
      username: form.username,
      password: form.password,
      remember: form.remember
    }, (message) => {
      ElMessage.success(message)
        router.push('/index')
      })
  }
}
</script>

<template>
<div style="text-align: center;margin: 0 60px">
<div style="margin-top:200px">
  <div style="font-size:30px;color: darkslategray">登陆</div>
  <div style="font-size:20px;color: lightslategray">在进入平台之前请先完成登陆：）</div>
</div>
<div style="margin-top: 50px">
  <el-input v-model="form.username" type="text" placeholder="用户名/邮箱登陆">
    <template v-slot:prepend>
      <el-icon><User /></el-icon>
    </template>
  </el-input>
</div>

<div style="margin-top: 20px">
  <el-input v-model="form.password" type="password" placeholder="这里输密码" show-password>
    <template v-slot:prepend>
      <el-icon><Lock /></el-icon>
    </template>
  </el-input>

  <div>
    <el-row style="margin-top: 10px; justify-content: space-between;">

      <el-col span="12" style="text-align: left">
        <el-checkbox v-model="form.remember" label="记住我" style="color: lightslategrey"/>
      </el-col>

      <el-col span="12" style="text-align: right; color: darkblue ; transform: translateX(-30px);font-size: 22px;">
        <el-link @click="router.push('/forget')">搞忘密码？</el-link>
      </el-col>
    </el-row>
  </div>

</div>
<div style="margin-top: 50px">
  <el-button @click="login" style="width: 300px" type="success" plain>立即登陆</el-button>
</div>
<el-divider>
  <span style="color: black">没得账号</span>
</el-divider>
<el-button @click="router.push('/protocol')" style="width: 300px" type="warning" plain>马上注册</el-button>

</div>
</template>

<style scoped>

</style>