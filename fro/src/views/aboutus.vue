<template>
  <el-container class="layout-container-demo" style="height: 100vh">
    <el-aside width="300px">
      <el-scrollbar>
        <el-menu>
          <el-menu-item index="/introduction" @click="handleMenuClick('/introduction')">
            <el-icon class="menu-icon" ><User/></el-icon>
            团队介绍
          </el-menu-item>
          <el-menu-item index="/product" @click="handleMenuClick('/product')">
            <el-icon class="menu-icon" name="el-icon-goods"><Aim/></el-icon>
            产品理念
          </el-menu-item>
          <el-menu-item index="/joinus" @click="handleMenuClick('/joinus')">
            <el-icon class="menu-icon" name="el-icon-user"><Phone/></el-icon>
            加入我们
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 20px">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px"><setting/></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="router.push('/')" style="font-size: 20px">
                  <el-icon class="menu-icon" ><DataAnalysis/></el-icon>
                  返回启动页
                </el-dropdown-item>
                <el-dropdown-item @click="router.push('/welcome/login')" style="font-size: 20px">
                  <el-icon class="menu-icon" ><Check/></el-icon>
                  返回登录
                </el-dropdown-item>
                <el-dropdown-item @click="router.push('/welcome/registerbyemail')" style="font-size: 20px">
                  <el-icon class="menu-icon" ><ZoomIn/></el-icon>
                  返回注册
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>返回</span>
        </div>
      </el-header>

      <el-main>
        <el-scrollbar>
          <template v-if="selectedMenu === '/introduction'">
            <!-- 团队介绍内容 -->
            <h2>团队介绍</h2>
            <p><strong>团队概述</strong></p>
            <p style="text-indent: 2em">开发团队是美团公司的核心技术团队之一，致力于推动业务的技术创新和发展。团队成员来自全球各地，拥有丰富的技术经验和行业背景，具备强大的技术研发实力和专业的团队协作能力。</p>
            <p><strong>团队使命</strong></p>
            <p style="text-indent: 2em">开发团队以 “让生活更美好” 作为企业使命，通过技术创新和发展，为用户提供更好的服务体验和更便捷的生活方式。</p>
            <p><strong>团队文化</strong></p>
            <p style="text-indent: 2em">开发团队注重分享和学习，鼓励团队成员不断探索、创新和挑战，提高技术水平和团队协作能力。团队秉承 “尊重每一个人，坦诚相待，共同成长” 的文化理念，营造轻松愉悦、开放包容的工作氛围。</p>
            <p><strong>团队架构</strong></p>
            <p style="text-indent: 2em">开发团队分为多个子团队，包括前端团队、后端团队、数据团队、测试团队等，每个子团队都拥有专业的技术领域和团队职能。团队采用敏捷开发和持续集成、持续交付等先进的开发方法论，不断提高研发效率和团队协作效能。</p>
          </template>
          <template v-else-if="selectedMenu === '/product'">
            <!-- 产品理念内容 -->
            <h2>产品理念</h2>
            <p><strong>一站式服务</strong></p>
            <p style="text-indent: 2em">我们致力于集合各类生活服务，例如外卖订购、餐厅预订、电影票购买、酒店预订、旅游景点门票等，以便用户能够在一个平台上完成各类需求，提高用户使用的便利性。</p>
            <p><strong>个性化推荐</strong></p>
            <p style="text-indent: 2em">基于用户历史数据和行为分析，我们可以为每个用户提供个性化的推荐服务。通过了解用户的兴趣、喜好和消费习惯，推荐符合其需求的商家和服务，提高用户体验和满意度。</p>
            <p><strong>尊享式体验</strong></p>
            <p style="text-indent: 2em">我们重视用户反馈，通过建立完善的客服系统和评价机制，及时解决用户遇到的问题，并根据用户反馈进行产品优化和改进，以持续提升用户体验。</p>
            <p><strong>便利与高效</strong></p>
            <p style="text-indent: 2em">通过智能化技术和数据分析，我们致力于提供便捷、高效的服务体验。比如，根据用户的历史消费记录和偏好，推荐适合的餐厅或商家；通过GPS定位功能，提供附近商家的信息等。</p>
          </template>
          <template v-else-if="selectedMenu === '/joinus'">
            <!-- 加入我们内容 -->
            <h2>加入我们</h2>
            <p style="text-indent: 2em">大川点评正在寻找有激情、有才华、善于创新的人才，与我们一起共同构建一个更美好的生活服务平台。作为中国领先的在线平台之一，提供丰富多样的职业发展机会和专业的培训计划。</p>
            <p style="text-indent: 2em">在这里，你将有机会参与到一个快节奏、充满活力的工作环境中。我们鼓励团队成员积极思考、勇于创新，并提供实现个人职业目标的平台和支持。</p>
            <p style="text-indent: 2em">无论你是技术开发、产品设计、市场营销、运营管理还是客户服务等领域的专家，都能在这里找到适合自己才华的舞台。我们注重多元化的团队，欢迎来自不同背景和专业领域的人才加入。</p>
            <p style="text-indent: 2em">如果你对创新、服务和用户体验充满激情，愿意与我们一起为用户提供更好的生活体验，那么我们诚邀你加入大川点评大家庭！</p>
            <p><strong>官方网站：www.dachuandianping.com</strong></p>
            <p><strong>电子邮件：dev@dachuandianping.com</strong></p>
            <p><strong>地址：成都市武侯区一环路南一段四川大学东园二舍</strong></p>
          </template>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {Aim, Check, DataAnalysis, Phone, Service, Setting, User, ZoomIn} from '@element-plus/icons-vue'
import router from "@/router";


const selectedMenu = ref('/introduction')
function handleMenuClick(index: string) {
  selectedMenu.value = index;
}

</script>

<style scoped>
.layout-container-demo {
  height: 100%;
  margin-left: 10px;
  margin-right: 10px;
  background-image: url("https://img.zcool.cn/community/01f45a5ca4eb8ea80121416864bbef.jpg@3000w_1l_0o_100sh.jpg");
  background-position: center; /* 设置背景图片居中 */
  background-repeat: no-repeat; /* 设置背景图片不重复 */
  background-size: cover; /* 设置背景图片铺满容器 */
}

.layout-container-demo .el-header {
  position: relative;
  margin-left: 20px;
  margin-right: 0;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
  border-radius: 10px; /* 设置圆角 */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); /* 设置阴影 */
  z-index: 10; /* 将上部栏置于最上层 */
}
.layout-container-demo .el-aside {
  margin-left: 0;
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
  border-radius: 10px; /* 设置圆角 */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); /* 设置阴影 */
  z-index: 10; /* 将侧边栏置于最上层 */
}
.layout-container-demo .el-menu {
  border-right: none;
  border-color: rgba(151, 151, 151, 0.3);
  border-radius: 10px; /* 设置圆角 */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); /* 设置阴影 */
}
.layout-container-demo .el-main {
  padding: 20px;
  margin-left: 20px;
  margin-top: 20px;
  margin-right: 0;
  border-radius: 20px; /* 设置圆角 */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); /* 设置阴影 */
  background-color: rgba(255,255,255,0.6);
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
.layout-container-demo .el-menu-item {
  font-size: 28px; /* 修改菜单字体大小 */
}
.layout-container-demo .el-icon {
  font-size: 32px; /* 设置图标大小 */
}

.layout-container-demo h2 {
  text-align: center;
  font-size: 28px;
  margin-bottom: 10px;
}
.layout-container-demo p {
  margin-bottom: 20px;
  font-size: 20px;
  line-height: 1.5; /* 设置行高 */
  padding: 10px; /* 设置内边距 */
}
</style>
