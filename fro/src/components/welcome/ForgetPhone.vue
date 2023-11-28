<script setup>
import {reactive, ref} from "vue";
import {EditPen, Lock, Iphone} from "@element-plus/icons-vue";
import {post} from "@/net";
import {ElMessage} from "element-plus";
import router from "@/router";
import Img from "@/assets/10.jpg";
import Vcode from 'vue3-puzzle-vcode'
const active = ref(0)

const form = reactive({
  phone: '',
  code: '',
  password: '',
  password_repeat: '',
})

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
  phone: [
    {validator: validatePhone1, trigger: ['blur', 'change']}
  ],
  code: [
    { required: true, message: '请输入获取的验证码', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 18, message: '密码的长度必须在6-18个字符之间', trigger: ['blur', 'change'] }
  ],
  password_repeat: [
    { validator: validatePassword, trigger: ['blur', 'change'] },
  ],
}

const formRef = ref()
const isPhoneValid = ref(false)
const coldTime = ref(0)

const onValidate = (prop, isValid) => {
  if(prop === 'phone')
    isPhoneValid.value = isValid
}
const isShow = ref(false)

const close = () => {
  isShow.value = false
}

const fail = () => {
  console.log('验证失败')
}
const validatePhone = () => {
  //展现验证码模态框
  isShow.value = true
}
const success = () => {
  coldTime.value = 60
  post('/api/auth/valid-reset-phone', {
    phone: form.phone
  }, (message) => {
    ElMessage.success(message)
    setInterval(() => coldTime.value--, 1000)
  }, (message) => {
    ElMessage.warning(message)
    coldTime.value = 0
  })
}

const startReset = () => {
  formRef.value.validate((isValid) => {
    if(isValid) {
      post('/api/auth/start-reset-phone', {
        phone: form.phone,
        code: form.code
      }, () => {
        active.value++
      })
    } else {
      ElMessage.warning('请填写手机号码和验证码')
    }
  })
}

const doReset = () => {
  formRef.value.validate((isValid) => {
    if(isValid) {
      post('/api/auth/do-reset-phone', {
        password: form.password
      }, (message) => {
        ElMessage.success(message)
        router.push('/welcome/login')
      })
    } else {
      ElMessage.warning('请填写新的密码')
    }
  })
}

</script>

<template>
  <div>
    <div style="margin: 30px 20px">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="验证手机号码" />
        <el-step title="重新设定密码" />
      </el-steps>
    </div>
    <transition name="el-fade-in-linear" mode="out-in">
      <div style="text-align: center;margin: 0 20px;height: 100%" v-if="active === 0">
        <div style="margin-top: 80px">
          <div style="font-size: 25px;font-weight: bold">重置密码</div>
          <div style="font-size: 14px;color: grey">请输入需要重置密码的手机号码</div>
        </div>
        <div style="margin-top: 50px">
          <el-form :model="form" :rules="rules" @validate="onValidate" ref="formRef">
            <el-form-item prop="phone">
              <el-input v-model="form.phone" :maxlength="11" type="tel" placeholder="手机号码">
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
                  <el-button type="success" @click="validatePhone"
                             :disabled="!isPhoneValid || coldTime > 0">
                    <Vcode :show="isShow" @success="success" @close="close" @fail="fail" :img="[Img]"></Vcode>
                    {{coldTime > 0 ? '请稍后 ' + coldTime + ' 秒' : '获取验证码'}}
                  </el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
        <div style="margin-top: 70px">
          <el-button @click="startReset()" style="width: 270px;" type="danger" plain>开始重置密码</el-button>
        </div>
      </div>
    </transition>
    <transition name="el-fade-in-linear" mode="out-in">
      <div style="text-align: center;margin: 0 20px;height: 100%" v-if="active === 1">
        <div style="margin-top: 80px">
          <div style="font-size: 25px;font-weight: bold">重置密码</div>
          <div style="font-size: 14px;color: grey">请填写您的新密码，务必牢记，防止丢失</div>
        </div>
        <div style="margin-top: 50px">
          <el-form :model="form" :rules="rules" @validate="onValidate" ref="formRef">
            <el-form-item prop="password">
              <el-input v-model="form.password" :maxlength="18" type="password" placeholder="新密码" show-password>
                <template #prefix>
                  <el-icon><Lock /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password_repeat">
              <el-input v-model="form.password_repeat" :maxlength="18"
                        type="password" placeholder="重复新密码" show-password>
                <template #prefix>
                  <el-icon><Lock /></el-icon>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="margin-top: 70px">
          <el-button @click="doReset()" style="width: 270px;" type="danger" plain>立即重置密码</el-button>
        </div>
      </div>
    </transition>
  </div>


</template>

<style scoped>

</style>