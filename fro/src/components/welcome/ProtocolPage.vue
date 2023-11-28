<template>
  <div class="user-agreement">
    <h1>用户须知</h1>
    <p>欢迎使用大川点评，请在注册前仔细阅读以下内容：</p>
    <ol>
      <li>本平台仅供娱乐，休闲使用，禁止用于非法用途。</li>
      <li>本平台不承担任何因使用本平台而产生的任何直接或间接损失。</li>
      <li>本平台保留随时修改用户须知的权利，修改后的用户须知将在本页面公布。</li>
      <li>用户应保证注册信息的真实性和准确性，如有虚假信息或盗用他人信息的行为，本平台有权取消该用户的注册资格并追究其法律责任。</li>
      <li>用户应妥善保管自己的账号和密码，不得将其泄露给他人。如因用户自身原因导致账号信息泄露，本平台不承担任何责任。</li>
      <li>用户在平台中的言行应符合社会公德和道德规范，不得发布违法、违规内容，如有违反，本平台有权对其进行处理。</li>
    </ol>
    <div class="agreement-checkbox">
      <input type="checkbox" id="agreement" v-model="isAgreed">
      <label for="agreement">我已阅读并同意以上条款</label>
    </div>
    <el-button
        class="register-button"
        :disabled="!isAgreed"
        type="warning"
        plain
        style="width: 300px"
        @click="router.push('/welcome/registerbyemail')"
    >
      马上注册
    </el-button>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import router from '@/router';

const isAgreed = ref(false);

</script>

<style scoped>
.user-agreement {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  box-sizing: border-box;
}

.user-agreement h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.user-agreement p {
  font-size: 16px;
  margin-bottom: 10px;
}

.user-agreement ol {
  margin-left: 20px;
  margin-bottom: 20px;
}

.user-agreement li {
  font-size: 14px;
  margin-bottom: 5px;
}

.agreement-checkbox {
  margin-top: 20px;
}

.agreement-checkbox label {
  font-size: 14px;
  margin-left: 5px;
}

.register-button {
  display: block;
  margin: 30px auto 0;
}

</style>
