<template>
  <div class="information-setup">
    <h2>个人信息：</h2>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="性别：">
        <el-radio-group v-model="form.gender">
          <el-radio label="male">男</el-radio>
          <el-radio label="female">女</el-radio>
          <el-radio label="other">其他</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生日：">
        <el-date-picker v-model="form.birthday"
                        type="date"
                        placeholder="选择某一天"
                        format="YYYY/MM/DD"
                        value-format="YYYY-MM-DD"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="电话号码：">
        <el-input v-model="form.phone" type="tel" class="width" placeholder="请填写您正在使用的电话号" :maxlength="11"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="saveInformation" class="custom-button">确认提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { ElForm, ElFormItem, ElInput, ElButton, ElRadio, ElRadioGroup, ElDatePicker, ElMessage } from 'element-plus';
import { post } from "@/net";
import router from "@/router";

export default {
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
    ElRadio,
    ElRadioGroup,
    ElDatePicker
  },
  setup() {
    const formRef = ref(null);
    const form = ref({
      gender: '',
      birthday: '',
      phone: ''
    });
    const validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else if(!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(value)){
        callback(new Error('手机号不符合规范'))
      } else {
        callback()
      }
    }
    const rules = {
      gender: [
        { required: true, message: '请选择您的性别', trigger: 'change' }
      ],
      birthday: [
        { required: true, message: '请选择您的生日', trigger: 'change' }
      ],
      phone: [
        {validator: validatePhone, trigger: ['blur', 'change']}
      ],
    };

    const saveInformation = () => {
      formRef.value.validate((isValid) => {
        if (isValid) {
          post('/api/auth/personal-data', {
            gender: form.value.gender,
            birthday: form.value.birthday,
            phone: form.value.phone,
          }, (message) => {
            ElMessage.success(message);
            router.push("/welcome/avatar");
          });
        } else {
          ElMessage.warning('请完整填写！');
        }
      });
    };

    return {
      formRef,
      form,
      rules,
      saveInformation
    };
  }
};
</script>

<style>
.information-setup {
  max-width: 600px;
  margin: 250px auto 0 auto;
  padding: 20px;
}
.custom-button {
  width: 200px;
}
.width {
  width: 60%;
}
</style>