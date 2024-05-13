<template>
  <div class="header">
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
      <router-link to="#">
        <img class="scrap-image" src="@/assets/스크랩.png">
      </router-link>

      <img class="alarm-image" src="@/assets/알람.png">

      <router-link to="/my-page">
        <img class="mypage-image" src="@/assets/마이페이지.png" alt="마이페이지">
      </router-link>
      </div>
    <div class="navigations">



      <!-- 로그인 후 -->
      <template v-if="isUserLogin">

<span id="dropdown-a" class="dropdown" style="position: relative; left:630px; border-color: white;">
  <router-link
      to="#"
      class="btn btn-secondary"
      role="button"
      id="dropdownMenuLink"
      data-bs-toggle="dropdown"
      aria-expanded="false"
  >
    {{ $store.state.userId}}님
  </router-link>

  <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink" style="border-color: white; text-align: center;">
   <li class="dropdown-item"> <router-link to="/Chat" style="text-decoration: none">채팅목록</router-link></li>
    <li><hr class="dropdown-divider"></li>
    <li><a href="javascript:;" @click="logoutUser" class="dropdown-item">로그아웃</a></li>
  </ul>
</span>

        <span class="username"></span>
        <div id="header-board-write" class="btn-group">
          <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            글쓰기
            <span class="visually-hidden">Toggle Dropdown</span>
          </button>
          <ul class="dropdown-menu" id="dropdown" >
            <li v-for="(item, index) in menuItems" :key="item.text" >
              <router-link :to="item.href" class="dropdown-item" id="menu-font" style="font-weight:bolder;text-align: center;">
                <img :class="item.class" :src="item.imgSrc">{{ item.text }}
              </router-link>
              <hr class="dropdown-divider" v-if="index < menuItems.length - 1">
            </li>
          </ul>
        </div>


      </template>
      <!-- 로그인 전 -->
      <template v-else>
        <router-link to="/login" class="login-a">로그인</router-link>
        <router-link to="/signup" class="signup-a">회원가입</router-link>
      </template>


    </div>
  </div>
</template>

<script>
export default {
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
  },
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Header',
  data(){
    return{
      menus: ['.ZIP','가구 인식', '커뮤니티', '인테리어 가이드', '소개'],
      menuItems: [
        { text: '일반 게시판', imgSrc: require('../assets/header_write_icon_list/generalboard.png'), class: 'board-image', href:'/GeneralBoard' },
        { text: '공모전 게시판', imgSrc: require('../assets/header_write_icon_list/usedboard.png'), class: 'board-image', href:'#' },
        { text: '일반 게시판 글쓰기', imgSrc: require('../assets/header_write_icon_list/generalboard_write.png'), class: 'write-image', href:'/GeneralBoardWrite' },
        { text: '공모전 게시판 글쓰기', imgSrc: require('../assets/header_write_icon_list/usedboard_write.png'), class: 'write-image', href:'#' },
      ],
      menuLinks: ['/', '#', '/Community', 'InteriorGuide', '/Introduce'],
    }
  }
}
</script>

<style>
.header{
  height:170px;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 15px;
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
  left:-300px;
  font-size: 40px;
}

#header-board-write
{
  position: relative;
  left: 310px;
  top: -138px;
  border-radius: 11px;
  border-color: black;
  font-size: 20px;
  font-weight: bolder;
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
  font-family: 'SOGANGUNIVERSITYTTF';
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
  left:-185px;
  color: #333;
  padding: 17px;
  font-size: 17px;
  text-decoration: none;
  font-weight:bolder;
}

.menu a:hover, #header-board-write button:hover
{
  color:#1F8D2D;
  font-weight: bolder;
}

.scrap-image
{
  width: 53px;
  height: 53px;
  position: relative;
  top:-50px;
  left: 400px;
  padding:10px;
}
.mypage-image{
  width: 56px;
  height: 56px;
  position: relative;
  top:-50px;
  left: 390px;
  padding:10px;
}

.alarm-image{
  width: 55px;
  height: 55px;
  position: relative;
  top:-50px;
  left:210px;
  padding:8px;
}

.dropdown{
  position: relative;
  top:-138px;
  left:300px;
  color:#333;
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
#dropdownMenuLink{
  border: white;
  color:#333;
  background-color: white;
}

.dropdown li a{
  font-size:15px;
  font-family: 'SOGANGUNIVERSITYTTF';
}

.login-a{
  position: relative;
  left:425px;
  top:-130px;
  text-decoration: none;
  color: black;
  font-size: 16px;
  font-weight: bolder;
  font-family: 'SOGANGUNIVERSITYTTF';
  border-radius: 13px;
  border:1px solid gray;
  padding:10px;
}
.signup-a{
  position: relative;
  left:455px;
  top:-130px;
  text-decoration: none;
  color: black;
  font-size: 16px;
  font-weight: bolder;
  font-family: 'SOGANGUNIVERSITYTTF';
  border-radius: 13px;
  border:1px solid gray;
  padding:10px;
}
.username{
  position: relative;
  left:700px;
  top:-130px;
}
</style>
