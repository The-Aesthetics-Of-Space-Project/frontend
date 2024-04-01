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

    <span class="dropdown">
  <router-link
      to="#"
      class="btn btn-secondary"
      role="button"
      id="dropdownMenuLink"
      data-bs-toggle="dropdown"
      aria-expanded="false"
  >
    가이드&TIP
  </router-link>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <li><router-link class="dropdown-item" to="/action">인테리어 추천 가이드</router-link></li>
    <hr class="dropdown-divider">
    <li><router-link class="dropdown-item" to="/GuideAndTips">초보자를 위한 TIP</router-link></li>
  </ul>
</span>

    <span class="dropdown" style="position: relative; left:-250px;">
  <router-link
      to="#"
      class="btn btn-secondary"
      role="button"
      id="dropdownMenuLink"
      data-bs-toggle="dropdown"
      aria-expanded="false"
  >
    스마트 인테리어
  </router-link>

  <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <li><router-link class="dropdown-item" to="/action">3D 홈스타일링</router-link></li>
    <hr class="dropdown-divider">
    <li><router-link class="dropdown-item" to="/action">가구 인식</router-link></li>
  </ul>
</span>

    <!-- 헤더 부분 글 작성 버튼-->

    <div id="header-board-write" class="btn-group">
      <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        글쓰기
        <span class="visually-hidden">Toggle Dropdown</span>
      </button>
      <ul class="dropdown-menu" id="dropdown">
        <li v-for="(item, index) in menuItems" :key="item.text">
          <router-link :to="item.href" class="dropdown-item" id="menu-font" style="text-align: center;">
            <img :class="item.class" :src="item.imgSrc">{{ item.text }}
          </router-link>
          <hr class="dropdown-divider" v-if="index < menuItems.length - 1">
        </li>
      </ul>
    </div>

    <!-- 헤더와 바디 부분 사이 밑줄-->

  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Header',
  data(){
    return{
      menus: ['.ZIP', '스마트 인테리어', '커뮤니티', '가이드&TIP', '소개'],
      menuItems: [
        { text: '일반 게시판', imgSrc: require('../assets/header_write_icon_list/generalboard.png'), class: 'board-image', href:'/GeneralBoard' },
        { text: '중고 게시판', imgSrc: require('../assets/header_write_icon_list/usedboard.png'), class: 'board-image', href:'#' },
        { text: '일반 게시판 글쓰기', imgSrc: require('../assets/header_write_icon_list/generalboard_write.png'), class: 'write-image', href:'/GeneralBoardWrite' },
        { text: '중고 게시판 글쓰기', imgSrc: require('../assets/header_write_icon_list/usedboard_write.png'), class: 'write-image', href:'#' },
      ],
      menuLinks: ['/Home', '#', '/Community', '#', '/Introduce'],
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
  left:-260px;
  font-size: 35px;
}

#header-board-write
{
  position: relative;
  left: 360px;
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
  left:-140px;
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
  left: 480px;
  padding:10px;
}
.mypage-image{
  width: 56px;
  height: 56px;
  position: relative;
  top:-50px;
  left: 450px;
  padding:10px;
}

.alarm-image{
  width: 55px;
  height: 55px;
  position: relative;
  top:-50px;
  left:325px;
  padding:8px;
}

.header-line
{
  margin: auto;
  text-align: center;
  width: 100%;
  border-top: 1px solid lightgray;
  position: relative;
  top:-60px;
}
#menu-font
{
  font-weight: bolder;
}

.dropdown{
  position: relative;
  top:-141px;
  left:125px;
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
}
#dropdownMenuLink{
  border: white;
  color:#333;
  background-color: white;
}

.dropdown li a{
  font-size:15px;
  font-weight: bold;

  font-family: 'SOGANGUNIVERSITYTTF';
}
.smart-interior{
  position: relative;
  left:-380px;
}
</style>
