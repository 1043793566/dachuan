<script setup>
import {EditPen, Lock, Iphone, User} from "@element-plus/icons-vue";
import router from "@/router";
import {reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import {post} from "@/net";
import Vcode from 'vue3-puzzle-vcode'
import Img from '@/assets/10.jpg'
const form = reactive({
  username: '',
  password: '',
  password_repeat: '',
  phone: '',
  code: ''
})

const validateUsername = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else if(!/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(value)){
    callback(new Error('用户名不能包含特殊字符，只能是中文/英文'))
  } else {
    callback()
  }
}
const validatePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== form.password) {
    callback(new Error("两次输入的密码不一致"))
  } else {
    callback()
  }
}
const validatePhone1 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入手机号'))
  } else if(!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(value)){
    callback(new Error('手机号不符合规范'))
  } else {
    callback()
  }
}
const rules = {
  username: [
    { validator: validateUsername, trigger: ['blur', 'change'] },
    { min: 2, max: 10, message: '用户名的长度必须在2-10个字符之间', trigger: ['blur', 'change'] },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 18, message: '密码的长度必须在6-18个字符之间', trigger: ['blur', 'change'] }
  ],
  password_repeat: [
    { validator: validatePassword, trigger: ['blur', 'change'] },
  ],
  phone: [
    {validator: validatePhone1, trigger: ['blur', 'change']}
  ],
  code: [
    { required: true, message: '请输入获取的验证码', trigger: 'blur' },
  ]
}

const formRef = ref()
const isPhoneValid = ref(false)
const coldTime = ref(0)

const onValidate = (prop, isValid) => {
  if(prop === 'phone')
    isPhoneValid.value = isValid
}

const register = () => {
  formRef.value.validate((isValid) => {
    if(isValid) {
      post('/api/auth/register2', {
        username: form.username,
        password: form.password,
        phone: form.phone,
        code: form.code
      }, (message) => {
        ElMessage.success(message)
        router.push("/welcome/personaldata2")
      })
    } else {
      ElMessage.warning('请完整填写注册表单内容！')
    }
  })
}
const isShow = ref(false)
//用户点击遮罩层，关闭模态框1
const close = () => {
  isShow.value = false
}
//用户验证失败
const fail = () => {
  console.log('验证失败')
}
const validatePhone = () => {
  isShow.value = true
}
const success = () => {
  coldTime.value = 60
  post('/api/auth/valid-register-phone', {
    phone: form.phone
  }, (message) => {
    ElMessage.success(message)
    setInterval(() => coldTime.value--, 1000)
  }, (message) => {
    ElMessage.warning(message)
    coldTime.value = 0
  })
}
</script>

<template>
  <div style="text-align: center;margin: 0 20px">
    <div style="margin-top: 200px">
      <div style="font-size: 25px;font-weight: bold;color: black">注册新用户</div>
      <div style="font-size: 22px;font-weight: bold;color: black">您正在使用手机号注册</div>
      <div style="font-size: 14px;color: grey">欢迎注册我们的平台，请在下方填写相关信息</div>
    </div>
    <div style="margin-top: 50px">
      <el-form :model="form" :rules="rules" @validate="onValidate" ref="formRef">
        <el-form-item prop="username">
          <el-input v-model="form.username" :maxlength="10" type="text" placeholder="用户名，不能包括特殊字符">
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" :maxlength="18" type="password" placeholder="密码">
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password_repeat">
          <el-input v-model="form.password_repeat" :maxlength="18" type="password" placeholder="重复密码">
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input v-model="form.phone" type="tel" maxlength="11" placeholder="手机号码">
            <template #prefix>
              <el-icon><Iphone /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row :gutter="10" style="width: 100%">
            <el-col :span="17">
              <el-input v-model="form.code" :maxlength="6" type="text" placeholder="请输入验证码">
                <template #prefix>
                  <el-icon><EditPen /></el-icon>
                </template>
              </el-input>
            </el-col>
            <el-col :span="5">
              <el-button style="width: 152px" type="success" @click="validatePhone"
                         :disabled="!isPhoneValid || coldTime > 0">
                <Vcode :show="isShow" @success="success" @close="close" @fail="fail" :img="[Img]"></Vcode>
                {{coldTime > 0 ? '请稍后 ' + coldTime + ' 秒' : '获取验证码'}}
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin-top: 60px">
      <el-button style="width: 320px" type="primary" @click="register" plain>立刻注册</el-button>
    </div>
    <div style="margin-top: 20px">
      <el-button style="width: 320px" type="warning"
                 @click="router.push('/welcome/registerbyemail')" plain>通过邮箱注册</el-button>
    </div>
    <div style="margin-top: 20px">
      <span style="font-size: 14px;line-height: 15px;color: grey">已有账号? </span>
      <el-link type="primary" style="translate: 0 -2px" @click="router.push('/welcome/login')">立即登录</el-link>
    </div>
  </div>
</template>


<style scoped>

</style>