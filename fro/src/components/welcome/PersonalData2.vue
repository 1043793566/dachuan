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
      <el-form-item label="电子邮箱：">
        <el-autocomplete
            v-model="form.email"
            :fetch-suggestions="querySearch"
            placeholder="请填写您的电子邮箱"
            clearable
            @select="handleSelect"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="saveInformation" class="custom-button">确认提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { ElAutocomplete, ElForm, ElFormItem, ElButton, ElRadio, ElRadioGroup, ElDatePicker, ElMessage } from 'element-plus';
import { post } from "@/net";
import router from "@/router";

export default {
  components: {
    ElForm,
    ElFormItem,
    ElButton,
    ElRadio,
    ElRadioGroup,
    ElDatePicker,
    ElAutocomplete
  },
  setup() {
    const formRef = ref(null);
    const form = ref({
      gender: '',
      birthday: '',
      email: ''
    });

    const rules = {
      gender: [
        { required: true, message: '请选择您的性别', trigger: 'change' }
      ],
      birthday: [
        { required: true, message: '请选择您的生日', trigger: 'change' }
      ],
      email: [
        { required: true, message: '请输入邮件地址', trigger: 'blur' },
        { type: 'email', message: '请输入合法的电子邮件地址', trigger: ['blur', 'change'] }
      ],
    };

    const saveInformation = () => {
      formRef.value.validate((isValid) => {
        if (isValid) {
          post('/api/auth/personal-data2', {
            gender: form.value.gender,
            birthday: form.value.birthday,
            email: form.value.email,
          }, (message) => {
            ElMessage.success(message);
            router.push("/welcome/avatar");
          });
        } else {
          ElMessage.warning('请完整填写！');
        }
      });
    };


    const emailSuffixes = [
      { value: '@qq.com' },
      { value: '@163.com' },
      { value: '@126.com' },
      { value: '@sina.com' },
      { value: '@gmail.com' },
      { value: '@hotmail.com' },
    ];
    const querySearch = (queryString, cb) => {
      const results = queryString
          ? emailSuffixes.filter(createFilter(queryString))
          : emailSuffixes;
      cb(results);
    };

    const createFilter = (queryString) => {
      return (emailSuffix) => {
        return (
            emailSuffix.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    };
    const handleSelect = (item) => {
      console.log(item);
    };


    return {
      formRef,
      form,
      rules,
      saveInformation,
      querySearch,
      handleSelect,
      createFilter,
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
</style>