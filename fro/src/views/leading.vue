<script>
import * as THREE from "three";
import NET from "vanta/src/vanta.net";
import router from "@/router";
export default {
  components: {},
  data() {
    return {
      imgList: [
        {imgUrl: "https://img.phb123.com/uploads/allimg/220708/66-220FQ555410-L.jpg"},
        {imgUrl: "https://p1.ssl.qhimg.com/t016bd377fa8c338438.jpg"},
        {imgUrl: "https://img.zcool.cn/community/016e045ca4ebfba801208f8b00ee56.jpg@3000w_1l_0o_100sh.jpg"},
        {imgUrl: "https://ts1.cn.mm.bing.net/th/id/R-C.ded657685a6f31180faea8013c6b14f5?rik=lyLiy2p79f5eUQ&riu=http%3a%2f%2fwww.scu.edu.cn%2f__local%2fD%2fED%2f65%2f7685A6F31180FAEA8013C6B14F5_5700A059_B46F7.jpg&ehk=26%2f%2bQFotxMDWP72x%2fGM0vFmuYErf89dwgId%2fRFAx0HE%3d&risl=&pid=ImgRaw&r=0"},
        {imgUrl: "https://news.sicau.edu.cn/__local/5/E9/AF/2DC897EB05190A99843DA38DB7C_AA9089F5_424FA.jpg"}
      ],
      ShowImg: 0,  // 表示当前显示的图片
      flag: true, // 用来节流防止重复点击
      start: null, // 自动执行下一张定时器
      showEnterText: true // 是否显示"点此进入"字样
    };
  },
  //mounted() {
  //this.setTimeoFun();  // 注释掉自动播放的代码
  //},
  methods: {
    router() {
      return router
    },
    //MouseFun(type) {//注释掉鼠标移入移出效果
    //type == '移入' ? clearTimeout(this.start) : this.setTimeoFun();
    //},
    setTimeoFun() {
      this.start = setInterval(() => {
        this.NextFun();
      }, 1500);
    },
    //节流函数 避免连续快速点击导致函数频繁执行
    throttle(fun) {
      if (this.flag) {
        this.flag = false;
        fun();
        setTimeout(() => {
          this.flag = true;
        }, 1200);
      }
    },
    PrevFun() {
      if (this.ShowImg !== 0) {
        this.ShowImg--;
      }
      this.showEnterText = this.ShowImg === this.imgList.length - 1;
    },
    NextFun() {
      if (this.ShowImg !== this.imgList.length - 1) {
        this.ShowImg++;
      }
      this.showEnterText = this.ShowImg === this.imgList.length - 1;
    },
    //handleClick() {
    //router.push('/login');
    //},
    handleMouseEnter() {
      this.showEnterText = true; // 添加悬浮变化
      document.querySelector(".enterText").classList.remove("enterText-animation");
    },
    handleMouseLeave() {
      document.querySelector(".enterText").classList.add("enterText-animation");
    },
  },

  mounted() {
    this.vantaEffect = NET({
      el: this.$refs.vantaRef,
      THREE: THREE,
    });
    VANTA.NET({
      el: this.$refs.vantaRef,
      /*以下为样式配置*/
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0xc5c5c5,
      size: 1.1,
      backgroundColor: 0x000000,
    });
  },
  beforeDestroy() {
    if (this.vantaEffect) {
      this.vantaEffect.destroy();
    }
  },

};

</script>

<template>

  <div id="box">
    <div ref="vantaRef" style="width: 100vw; height: 100vh"></div>
    <div class="banner">
      <div class="SwiperBox" >
        <!-- 图片 -->
        <img :class="['imgCss',ShowImg==index?'ShowCss':'']"
             :src="item.imgUrl" v-for="(item,index) in imgList" :key="index" />
        <!-- 左箭头按钮 -->
        <div class="leftBtn" @click="throttle(PrevFun)">&larr;</div>
        <!-- 右箭头按钮 -->
        <div class="rightBtn" @click="throttle(NextFun)">&rarr;</div>
        <!-- 下方指示点容器 -->
        <div class="instBox">
          <div v-for="(item,index) in imgList.length" :key="index"
               @click="ShowImg=index" :class="['inst',ShowImg==index?'instActv':'']">
          </div>
        </div>
        <div class="mengceng"></div>
        <!-- 点击进入文字 -->
        <div class="enterText" v-if="showEnterText && ShowImg === imgList.length - 1" @click="router().push('/welcome/login')"
             @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
          点此进入大川点评
        </div>

      </div>
      <div class="welcomeText" >
        WELCOME!
      </div>

    </div>
  </div>
</template>

<style scoped>
/* 图片容器样式 */
.SwiperBox {
  position: relative;
  width: 75%;
  height: 100%;
  margin-left: 0;
  padding: 0;
  float: left;
  border: 10px solid black;
  box-sizing: border-box;
  z-index: 999;

}
/* 图片默认样式 */
.imgCss {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: 0.8s;  /* 淡入淡出过渡时间 */
}

/* 图片选中样式(继承上方默认样式)*/
.ShowCss {
  opacity: 1;
}

/* 两个按钮共有的样式,也可直接使用箭头图片替代 */
.leftBtn,
.rightBtn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(109, 109, 109, 0.445);
  color: #fff;
  border-radius: 50%;
  cursor: pointer;
  font-size: 32px;
  font-weight: 1000;
  z-index: 1000;
}
.leftBtn {
  left: 10px;
}
.rightBtn {
  right: 10px;
}
/* 下方指示器盒子 */
.instBox{
  position: absolute;
  left: 50%;
  bottom: 10px;
  display: flex;
  z-index: 1000;
}
/* 小圆点 */
.inst{
  width: 20px;
  height: 20px;
  border: 1px solid #ccc;
  margin-right: 8px;
  background: #fff;
  border-radius: 50%;
  cursor: pointer;
}
.inst:last-child{
  margin-right: 0px;
}
.instActv{
  border: 1px solid #ff0000;
  background: #ff0000;
}

#app{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  background: linear-gradient(to right, black calc(80% - 1px), darkblue );
}

/* 点击进入文字样式 */
.enterText {
  position: absolute;
  right: 10px;
  bottom: 10px;
  color: #fff;
  font-size: 52px;
  font-family: 幼圆;
  cursor: pointer;
  transition: font-size 0.2s ease-in-out; /* 鼠标悬浮时字体大小过渡效果 */
  animation: colorChange 5s infinite;
}
.enterText:hover {
  font-size: 64px; /* 鼠标悬浮时字体变大 */
  animation: blink 1s infinite; /* 添加动画 */
  color: #fff; /* 字体颜色默认为白色 */
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
/* 定义字体颜色变化动画 */
@keyframes colorChange {
  0% {
    color: #ff0000;
  }
  25% {
    color: #00ff00;
  }
  50% {
    color: #0000ff;
  }
  75% {
    color: #ffff00;
  }
  100% {
    color: #ff00ff;
  }
}

.welcomeText {
  position: absolute;
  top: 5%;
  right: 5%;
  color: white;
  font-size: 52px;
  font-weight: bold;
  font-family: 幼圆;
}

#box {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  .banner {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    z-index: 0;
    position: absolute;
    color: #fff;
  }
}

.mengceng{
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
}
</style>
