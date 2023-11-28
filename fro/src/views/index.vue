<script setup>
import {ElMessage} from "element-plus";
import {get} from "@/net";
import router from "@/router";
import {useStore} from "@/stores";
const store = useStore()
const logout = () => {
  get('/api/auth/logout',(message) =>{
    ElMessage.success(message)
    store.auth.user = null
    router.push('/welcome/login')
  })
}
const test = () => {
  get('/test',(message) =>{
    ElMessage.success(message)
  })
}
const test1 = () => {
  get('/test1',(message) =>{
    ElMessage.success(message)
  })
}
const test2 = () => {
  get('/test2',(message) =>{
    ElMessage.success(message)
  })
}

</script>

<template>
  <div>
  <p>欢迎进入大川点评</p>
  <p>亲爱的{{ store.auth.user.username }}</p>
  <p>这是您第{{ store.auth.user.count }}次光临本站</p>
  </div>
  <div style="margin-top: 20px">
    <el-button @click="logout" type="danger" plain>退出登录</el-button>
  </div>
  <div style="margin-top: 20px">
    <el-button @click="test" type="primary" >管理员权限测试</el-button>
  </div>
  <div style="margin-top: 20px">
    <el-button @click="test1" type="primary" >用户权限测试</el-button>
  </div>
  <div style="margin-top: 20px">
    <el-button @click="test2" type="primary" >商家测试</el-button>
  </div>
</template>

<style scoped>

</style>