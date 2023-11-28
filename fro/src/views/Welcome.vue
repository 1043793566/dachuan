<script setup>
import img from '@/assets/10.jpg'
</script>

<template>
  <div style="width: 100vw; height: 100vh; overflow: hidden; display: flex">
    <div style="flex: 1">
      <img alt="background" style="width: 100%; height: 100%"  src="@/assets/10.jpg" />
    </div>
    <div class="welcome-title">
      <a href="/aboutus" style="text-decoration: none;color: white;" class="welcome-link">
      <div>欢迎来到大川点评</div>
      </a>
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
.welcome-link:hover {
  font-size: 80px;
  color: yellow;
  animation: blink 1s infinite; /* 添加闪烁动画 */
}
@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>