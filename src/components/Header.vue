<template>
  <div class="header">
      <!-- <button @click="chatgoing"><router-link :to="isUserLogin ?`/chat/${this.userId}` :'login'">채팅 하기</router-link></button> -->
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
      <img src="../assets/ziplogo.png" style="position: relative; left:-640px; top:-85px;  width: 100px; /* 로고 이미지 크기 조정 */">
    </div>
    <div class="navigations">



      <!-- 로그인 후 -->
      <template v-if="isUserLogin">
        <router-link :to="isUserLogin ? '/#':'/login'">
          <img class="scrap-image" src="@/assets/스크랩.png">
        </router-link>
        <div class="btn-group" style="position: relative; top:-50px; cursor: pointer; ">
          <img id="alarm-image" data-bs-toggle="dropdown" aria-expanded="false" src="@/assets/mypage.png">
          <ul class="dropdown-menu" style="text-align: center; min-width: 120px; padding:10px; font-family: MyCustomFont2;">
            <router-link :to="isUserLogin ? '/my-page':'/login'" style="text-decoration: none; color:black; font-weight: bolder; font-size:15px;">마이페이지</router-link>
            <li><hr class="dropdown-divider"></li>
            <li><a href="javascript:;" @click="logoutUser" class="dropdown-item" style="font-weight: bolder; font-size:15px;">로그아웃</a></li>
          </ul>
        </div>


          <button style="background-color: white; border: white; position: relative;" @click="chatseesion"><router-link :to="isUserLogin ?`/chatroom/${this.userId}` :'login'"> <img class="chat-image" src="@/assets/chat.png" alt="채팅"
          ></router-link></button>



        <span class="username"></span>
        <div id="header-board-write" class="btn-group" style="text-align: left;">
          <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            글쓰기
            <span class="visually-hidden">Toggle Dropdown</span>
          </button>
          <ul class="dropdown-menu" id="dropdown" >
            <li v-for="(item, index) in menuItems" :key="item.text" >
              <router-link :to="item.href(isUserLogin)" class="dropdown-item" id="menu-font" style="font-weight:bolder;text-align: left;">
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
        <div id="header-board-write" class="btn-group" style="position: relative; left:610px; top:-182px;text-align: left;">
          <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            글쓰기
            <span class="visually-hidden">Toggle Dropdown</span>
          </button>
          <ul class="dropdown-menu" id="dropdown" >
            <li v-for="(item, index) in menuItems" :key="item.text" >
              <router-link :to="item.href(isUserLogin)" class="dropdown-item" id="menu-font" style="font-weight:bolder;text-align: left;">
                <img :class="item.class" :src="item.imgSrc">{{ item.text }}
              </router-link>
              <hr class="dropdown-divider" v-if="index < menuItems.length - 1">
            </li>
          </ul>
        </div>
        <router-link to="/login" class="login-a" style="font-weight: bolder;">로그인</router-link>
        <router-link to="/signup" class="signup-a" style="font-weight: bolder;">회원가입</router-link>
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
            this.$router.push({path: `/chatroom/${this.userId}`});
          })
          .catch(error => {
            // 통신할 때 401에러 처리
            console.error('Error data', error);
          });
    },
    chatgoing() {
      axios.get(`http://jerry6475.iptime.org:20000/chat/${encodeURIComponent(this.userId)}`)
          .then(res => {
            this.users = res.data;
            console.log('Response data', res.data.userId);

            // 여기서 라우터 이동
            this.$router.push({path: `/chat/${this.userId}`});
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
      userId: this.$store.state.userId,
      menus: ['zip', '이미지 분석', '모두의 광장', '스타일 추천', '소개'],
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
          href: () => '/competitionMain'
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
          href: (isUserLogin) => isUserLogin ? '/competitionWrite' : '/login'
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
  padding: 40px;
  height: 180px;
}

@font-face {
  font-family: 'SOGANGUNIVERSITYTTF';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2312-1@1.1/SOGANGUNIVERSITYTTF.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}

body {
  margin: 0;
}

div {
  box-sizing: border-box;
}

.menu {
  width: 100%;
  background: white;
  padding: 40px;
  border-radius: 5px;
  color: #333;
}

.menu a:nth-child(1) {
  position: relative;
  left: -310px;
  font-size: 45px;
  transform: skewX(1deg); /* 글자 기울기 추가 */
  font-style: italic; /* 글자 기울기 추가 */
}

#header-board-write {
  position: relative;
  left: 470px;
  top: -190px;
  border-radius: 11px;
  border-color: black;
  font-size: 13px;
}

#header-board-write img {
  width: 40px;
  height: 40px;
  position: relative;
  left: -10px;
}

#header-board-write button {
  background-color: whitesmoke;
  border-color: whitesmoke;
  color: #333;
  font-weight: bolder;
  padding: 9px;
  text-align: left;
}


@font-face {
  font-family: 'TheJamsil5Bold';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302_01@1.0/TheJamsil5Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
}

.menu a {
  position: relative;
  left: -155px;
  color: #333;
  padding: 20px;
  font-size: 17px;
  text-decoration: none;
  font-weight: bolder;
}

.menu a:hover, #header-board-write button:hover {
  color: RGB(128, 200, 95);
  font-weight: bolder;
}

.scrap-image {
  width: 47px;
  height: 47px;
  position: relative;
  top: -190px;
  left: 420px;
  padding: 10px;
}

.chat-image {
  width: 59px;
  height: 59px;
  position: relative;
  top: -193px;
  left: 365px;
  padding: 10px;
}

#alarm-image {
  width: 56px;
  height: 56px;
  position: relative;
  top: -142px;
  left: 483px;
  padding: 8px;
}

.dropdown a {
  color: #333;
  font-weight: bolder;
  font-size: 17px;
}

.dropdown a:hover {
  color: green;
  font-weight: bolder;
  font-weight: bolder;
}

.dropdown li a {
  font-size: 15px;
  font-family: 'SOGANGUNIVERSITYTTF';

}

.login-a {
  position: relative;
  left: 355px;
  top: -180px;
  text-decoration: none;
  color: black;
  font-size: 16px;
}

.signup-a {
  position: relative;
  left: 380px;
  top: -180px;
  text-decoration: none;
  color: black;
  font-size: 16px;
}

.username {
  position: relative;
  left: 700px;
  top: -130px;
}
</style>