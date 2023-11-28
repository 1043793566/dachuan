<template>
  <div class="image-upload-container">
    <div style="margin-top: 0">
      <div style="font-size: 25px;font-weight: bold;color: black">选择您的头像</div>
      <div style="font-size: 16px;color: black">图片格式为png/jpg</div>
      <div style="font-size: 14px;color: blue">您可以在此处上传您的头像，也可以选择跳过</div>
    </div>
    <div class="image-preview">
      <input type="file" ref="inputFile" style="display: none" @change="handleFileChange">
      <div class="image-placeholder">
        <img :src="previewImageUrl" alt="Preview Image" v-if="previewImageUrl" class="preview-image">
      </div>
    </div>
    <div class="image-actions">
      <el-button type="success" @click="handleChooseImage">选择图片</el-button>
      <el-button type="primary" @click="handleUpload">上传图片</el-button>
    </div>
    <div class="skip-action">
      <el-button type="warning" @click="router().push('/welcome/login')" class="skip">跳过该步骤</el-button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { ElMessage } from "element-plus";

import router from "@/router";
import { post } from "@/net";

export default {
  methods: {
    router() {
      return router
    }
  },
  setup() {
    const selectedImage = ref(null);
    const previewImageUrl = ref("https://img1.baidu.com/it/u=2223877677,4130829624&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500");

    const handleChooseImage = () => {
      const inputFile = document.createElement("input");
      inputFile.type = "file";
      inputFile.click();
      inputFile.addEventListener("change", handleFileChange);
    };

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      selectedImage.value = file;
      previewImageUrl.value = URL.createObjectURL(file);
    };

    const handleUpload = () => {
      if (selectedImage.value) {
        const formData = new FormData();
        formData.append("avatar", selectedImage.value);

        post("/api/auth/upload-avatar", formData, (message) => {
          ElMessage.success(message);
          router.push("/welcome/login");
        }, (message) => {
          console.error("图片上传失败", message);
          ElMessage.error("图片上传失败，请稍后再试");
        });
      } else {
        ElMessage.warning("请选择图片");
      }
    };


    return {
      selectedImage,
      previewImageUrl,
      handleChooseImage,
      handleFileChange,
      handleUpload,
    };
  },
};
</script>

<style>
.image-upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}


.image-preview {
  margin-top: 40px;
  margin-bottom: 30px;
}

.image-placeholder {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-placeholder span {
  position: absolute;
}

.image-actions button {
  margin-bottom: 10px;
}
.skip{
  width: 190px;
}
</style>
