<script setup>

</script>

<template>
  <div style="width: 100vw; height: 100vh; overflow: hidden; display: flex">
    <div style="flex: 1">
      <el-image style="width: 100%; height: 100%" fit="cover" src="https://ai.xiaohongma.cc/uploads/draw/20231024/c9604af7e6cebc94e6392dc089f75fbc.png" />
    </div>
    <div class="welcome-title">
      <div>欢迎来到大川点评</div>
    </div>
    <div style="width: 560px; background-color: white">
      <router-view v-slot="{ Component }">
        <transition name="el-fade-in-linear" mode="out-in">
          <component :is="Component" style="height: 100%"/>
        </transition>
      </router-view>
    </div>
  </div>
</template>


<style scoped>
.welcome-title{
  position: absolute;
  bottom: 50px;
  left: 90px;
  color: white;
  text-shadow: 0 0 10px pink;
  font-size: 70px;
  font-weight: bold;
}
</style>