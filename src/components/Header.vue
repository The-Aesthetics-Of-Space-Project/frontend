<template>
  <div class="header">
    <button @click="chatseesion"><router-link :to="isUserLogin ?`/chatroom/${this.userId}` :'login'">채팅 목록</router-link></button>
    <button @click="chatgoing"><router-link :to="isUserLogin ?`/chat/${this.userId}` :'login'">채팅 하기</router-link></button>
    <div class="menu">
      <h4>
        <router-link
            v-for="(menu, index) in menus"
            :key="menu"
            :to="menuLinks[index]"
        >
          {{ menu }}
        </router-link>
      </h4>
      <img src="../assets/ziplogo.png" style="position: relative; left:-650px; top:-95px;  width: 120px; /* 로고 이미지 크기 조정 */">
    </div>
    <div class="navigations">



      <!-- 로그인 후 -->
      <template v-if="isUserLogin">
        <router-link :to="isUserLogin ? '/#':'/login'">
          <img class="scrap-image" src="@/assets/스크랩.png">
        </router-link>
        <div class="btn-group" style="position: relative; top:-50px; cursor: pointer; ">
          <img id="alarm-image" data-bs-toggle="dropdown" aria-expanded="false" src="@/assets/마이페이지.png">
          <ul class="dropdown-menu" style="text-align: center; min-width: 120px; padding:10px; font-family: MyCustomFont2;">
            <router-link :to="isUserLogin ? '/my-page':'/login'" style="text-decoration: none; color:black; font-weight: bolder; font-size:15px;">마이페이지</router-link>
            <li><hr class="dropdown-divider"></li>
            <li><a href="javascript:;" @click="logoutUser" class="dropdown-item" style="font-weight: bolder; font-size:15px;">로그아웃</a></li>
          </ul>
        </div>


        <router-link :to="isUserLogin ? '/':'/login'">
          <img class="mypage-image" src="@/assets/알람.png" alt="마이페이지">
        </router-link>



        <span class="username"></span>
        <div id="header-board-write" class="btn-group">
          <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            글쓰기
            <span class="visually-hidden">Toggle Dropdown</span>
          </button>
          <ul class="dropdown-menu" id="dropdown" >
            <li v-for="(item, index) in menuItems" :key="item.text" >
              <router-link :to="item.href(isUserLogin)" class="dropdown-item" id="menu-font" style="font-weight:bolder;text-align: center;">
                <img :class="item.class" :src="item.imgSrc">{{ item.text }}
              </router-link>
              <hr class="dropdown-divider" v-if="index < menuItems.length - 1">
            </li>
          </ul>
        </div>

        <!--  <router-link to="/Chat" style="position: relative; text-decoration: none; color:black; top:-200px; left:410px;">채팅목록</router-link> -->
      </template>
      <!-- 로그인 전 -->
      <template v-else>
        <div id="header-board-write" class="btn-group" style="position: relative; left:610px; top:-198px;">
          <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            글쓰기
            <span class="visually-hidden">Toggle Dropdown</span>
          </button>
          <ul class="dropdown-menu" id="dropdown" >
            <li v-for="(item, index) in menuItems" :key="item.text" >
              <router-link :to="item.href(isUserLogin)" class="dropdown-item" id="menu-font" style="font-weight:bolder;text-align: center;">
                <img :class="item.class" :src="item.imgSrc">{{ item.text }}
              </router-link>
              <hr class="dropdown-divider" v-if="index < menuItems.length - 1">
            </li>
          </ul>
        </div>
        <router-link to="/login" class="login-a" style="  font-family: MyCustomFont2;" >로그인</router-link>
        <router-link to="/signup" class="signup-a"  style="font-family: MyCustomFont2;">회원가입</router-link>
      </template>


    </div>
  </div>
</template>

<script>
import Logofont from "@/components/logofont.vue";
import ZipLogo from "@/components/ZipLogo.vue";
import axios from "axios";

export default {

  components: {ZipLogo, Logofont},
  computed: {
    // 로그인 유무 확인
    isUserLogin() {
      return this.$store.getters.isLogin;
    }
  },

  methods: {
    // 로그아웃 처리
    logoutUser() {
      this.$store.commit('clearUsername');
      // 로그인 페이지로 이동
      this.$router.push('/login');
    },
    chatseesion() {
      axios.get(`http://jerry6475.iptime.org:20000/chatroom/${encodeURIComponent(this.userId)}`)
          .then(res => {
            this.users = res.data;
            console.log('Response data', res.data.userId);

            // 여기서 라우터 이동
            this.$router.push({ path: `/chatroom/${this.userId}` });
          })
          .catch(error => {
            // 통신할 때 401에러 처리
            console.error('Error data', error);
          });
    },
    chatgoing(){
      axios.get(`http://jerry6475.iptime.org:20000/chat/${encodeURIComponent(this.userId)}`)
          .then(res => {
            this.users = res.data;
            console.log('Response data', res.data.userId);

            // 여기서 라우터 이동
            this.$router.push({ path: `/chatroom/${this.userId}` });
          })
          .catch(error => {
            // 통신할 때 401에러 처리
            console.error('Error data', error);
          });
    }
  },
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Header',
  data() {
    return {
      userId : this.$store.state.userId,
      menus: ['zip', '가구 인식', '커뮤니티', '인테리어 가이드', '소개'],
      menuItems: [
        {
          text: '일반 게시판',
          imgSrc: require('../assets/header_write_icon_list/generalboard.png'),
          class: 'board-image',
          href: () => '/GeneralBoard'
        },
        {
          text: '공모전 게시판',
          imgSrc: require('../assets/header_write_icon_list/usedboard.png'),
          class: 'board-image',
          href: (isUserLogin) => isUserLogin ? '/' : '/login'
        },
        {
          text: '일반 게시판 글쓰기',
          imgSrc: require('../assets/header_write_icon_list/generalboard_write.png'),
          class: 'write-image',
          href: (isUserLogin) => isUserLogin ? '/generalBoardWrite' : '/login'
        },
        {
          text: '공모전 게시판 글쓰기',
          imgSrc: require('../assets/header_write_icon_list/usedboard_write.png'),
          class: 'write-image',
          href: (isUserLogin) => isUserLogin ? '/' : '/login'
        },
      ],
      menuLinks: ['/', '/objectrecognition', '/Community', 'InteriorGuide', '/Introduce'],
    };
  },
}
</script>

<style>
.login-a:hover, .signup-a:hover {
  color: RGB(128, 200, 95);
  font-weight: bolder;
}

.header {
  padding: 5px;
  height:110px;
}

@font-face {
  font-family: 'SOGANGUNIVERSITYTTF';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2312-1@1.1/SOGANGUNIVERSITYTTF.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}
body
{
  margin : 0;
}

div
{
  box-sizing: border-box;
}

.menu
{
  width:100%;
  background: white;
  padding : 40px;
  border-radius: 5px;
  color:#333;
}

.menu a:nth-child(1)
{
  position: relative;
  left:-310px;
  font-size: 45px;
  transform: skewX(1deg); /* 글자 기울기 추가 */
  font-style: italic; /* 글자 기울기 추가 */
}

#header-board-write
{
  position: relative;
  left: 470px;
  top: -205px;
  border-radius: 11px;
  border-color: black;
  font-size: 20px;
  font-family: MyCustomFont2;
}

#header-board-write img
{
  width:45px;
  height:45px;
  position: relative;
  left:-10px;
}

#header-board-write button
{
  background-color: whitesmoke;
  border-color: whitesmoke;
  color:#333;
  font-weight: bolder;
  padding:9px;
  font-family: MyCustomFont2;
}
@font-face {
  font-family: 'MyCustomFont3';
  src: url('../fonts/kcc/KCC-Hanbit.ttf') format('woff');
  font-weight: normal;
  font-style: normal;
}


@font-face
{
  font-family: 'TheJamsil5Bold';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302_01@1.0/TheJamsil5Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
}

.menu a
{
  position: relative;
  left:-155px;
  color: #333;
  padding: 20px;
  font-size: 17px;
  text-decoration: none;
  font-weight:bolder;
}

.menu a:hover, #header-board-write button:hover
{
  color: RGB(128, 200, 95);
  font-weight: bolder;
}

.scrap-image
{
  width: 53px;
  height: 53px;
  position: relative;
  top:-205px;
  left: 420px;
  padding:10px;
}
.mypage-image{
  width: 59px;
  height: 59px;
  position: relative;
  top:-205px;
  left: 365px;
  padding:10px;
}

#alarm-image{
  width: 55px;
  height: 55px;
  position: relative;
  top:-155px;
  left:480px;
  padding:8px;
}

.dropdown a{
  color:#333;
  font-weight: bolder;
  font-size: 17px;
}
.dropdown a:hover{
  color:green;
  font-weight: bolder;
  font-weight: bolder;
}

.dropdown li a{
  font-size:15px;
  font-family: 'SOGANGUNIVERSITYTTF';

}

.login-a{
  position: relative;
  left:355px;
  top:-195px;
  text-decoration: none;
  color: black;
  font-size: 16px;
}
.signup-a{
  position: relative;
  left:380px;
  top:-195px;
  text-decoration: none;
  color: black;
  font-size: 16px;
}
.username{
  position: relative;
  left:700px;
  top:-130px;
}
</style>