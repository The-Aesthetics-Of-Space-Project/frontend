<template>
  <div class="main">
    <section class="banner-container">
      <div class="title-home">
        <h3>INTERIOR DESIGN COMPANY </h3>
        <H1>Experience Interior <br> Design</H1>

        <div class="item_grid">
          <div class="item_box flex">
            <img src="@/assets/banner_icon/i1.png" width="80px">
            <div class="text">
              <router-link to="/generalboard" class="router-link-custom">
                <p>게시판</p>
              </router-link>
              <p>You can also write your own posts.</p>
            </div>
          </div>
          <div class="item_box flex">
            <img src="@/assets/banner_icon/i2.png" width="80px">
            <div class="text">
              <router-link to="/community" class="router-link-custom">
                <p>커뮤니티</p>
              </router-link>
              <p>community space for communication.</p>
            </div>
          </div>
          <div class="item_box flex">
            <img src="@/assets/banner_icon/i3.png" width="80px" >
            <div class="text">
              <router-link to="/Introduce" class="router-link-custom">
                <p>소개</p>
              </router-link>
              <p>information about the website.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="main-banner">
      <div class="main-banner-title">
        <h1>당신의 공간을 재창조하다</h1>
        <p>영감을 공유하고 새로운 트렌드를 발견하세요.</p>
      </div>
      <div class="main-banner-content">
        <h5 style="font-family: 'SOGANGUNIVERSITYTTF';">집에서 시작하는 새로운 이야기</h5>
        <p>당신의 공간을 재창조하며 새로운 이야기를 쓰세요. 인테리어 아이디어와 영감이 가득한 곳에서 당신만의 스토리를 시작하세요.</p>
        <br>
        <h5 style="font-family: 'SOGANGUNIVERSITYTTF';">영감을 주는 공간, 함께 만드는 아름다움</h5>
        <p>인테리어 디자인의 무한한 가능성을 탐험하고, 커뮤니티와 함께 나만의 공간을 완성하세요.</p>
        <br>
        <h5 style="font-family: 'SOGANGUNIVERSITYTTF';">꿈꾸는 공간을 현실로</h5>
        <p> 당신의 이상적인 공간이 현실이 됩니다. 인테리어 디자인의 모든 것을 탐험하고, 공유하고, 실현해보세요.</p>
      </div>
    </div>

    <div class="guide-content">
      <div class="guide-text">
        <h2 ref="mainText"style="font-family: 'SOGANGUNIVERSITYTTF'; font-size: 29px;">인테리어 추천 가이드</h2>
      </div>

      <div class="card-view">
        <router-link to="/InteriorGuide" style="text-decoration: none; color:black; font-weight: bolder; position: relative; left:-100px; top:-30px;">
          <span style="float:right; position: relative; left:50px;"><img src="@/assets/초보자 가이드 더보기.png" width="30" height="30"></span>
        </router-link>
        <div class="card-list">
          <div class="card" v-for="(card, index) in cards" :key="index">
            <div class="card-body">
              <!--<h5 class="card-title">{{ card.title }}</h5>-->
              <!-- <p class="card-text">{{ card.text }}</p>-->

              <img :src="card.imageSrc" alt="Card Image" width="112%" height="117%" style="position: relative; left:-6%; top:-16px;">
              <router-link to="InteriorGuide" style="text-decoration: none; color: #333333; font-weight: bolder">
                <span class="card-guide-content" id="router-link-custom"> {{card.text}}</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>


    </div>
    <div class="Home-Styling-title">
      <h2>Home Styling</h2>
    </div>
    <div class="board-write-list">
      <div class="card-view">
        <div class="card-list">
          <div class="card" v-for="(card, index) in card" :key="index">
            <div class="card-body">
              <h5 class="card-title">{{ card.title }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-line">
    </div>


  </div>
</template>

<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'MainView',
  components: {
  },
  data() {
    return {
      cards: [
        {  text: '자연스러운 느낌을 주는 인테리어', imageSrc:require('@/assets/interiorguide_image_list/natural.png')},
        {  text: '현대적인 인테리어',imageSrc:require('@/assets/interiorguide_image_list/modern3.png')},
        {  text: '미니멀하고 심플한 인테리어',imageSrc:require('@/assets/interiorguide_image_list/simple3.png') },
        {  text: '빈티지&레트로 인테리어',imageSrc:require('@/assets/interiorguide_image_list/classic.jpg') },
      ],
      card: [
        { title: 'Best', imageUrl: '@/assets/best.png' },
        { title: 'Silver', imageUrl: '@/assets/sliver.png' },
        { title: 'Third', imageUrl: '@/assets/third.png' },
      ],

      menuLinks: ['#', '#', '#', '#', '#'],
      slides: [
        {
          image: require('@/assets/banner_first_image.jpg'),
          interval: 4000,
        },
        {
          backgroundColor: 'lightgray',
          interval: 4000,
          //    title:
          titleTop: '-130px',
          //  content:
          contentTop: '-130px',
          fontsize: '100px'
        },

      ]
    };
  }
}
</script>

<style>

@font-face {
  font-family: 'SOGANGUNIVERSITYTTF';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2312-1@1.1/SOGANGUNIVERSITYTTF.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}
body {
  margin :0;
}

.router-link-custom{
  text-decoration: none;
  color : #2c3e50;
  font-size: 15px;
  font-weight: bolder;
  font-family: 'SOGANGUNIVERSITYTTF';
}
.item_grid{
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3열로 나눔 */
  position: relative;
  bottom:30px;
}

.title-home h1{
  position: relative;
  top:180px;
  font-size: 50px;
  color:gray;
  font-weight: bolder;
}
.title-home h3{
  position: relative;
  font-size: 27px;
  top:160px;
  font-weight: bolder;
  color : #333333;

}
.item_box{
  background-color: rgba(211, 211, 211, 0.5);
  border-radius: 5px;
  transition: 0.5s;
  position: relative;
  top:260px;
  width:330px;
  left:35px;
}
.item_box:hover{
  background-color : darkgray;
  color:black;
}
.title-home img{
  width:100px;
  height:100px;
}
.text p{
  font-size: 17px;
  font-weight: bolder;
}
div {
  box-sizing: border-box;
}
.main{
  height:2650px;
}
@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translate3d(0, -150%, 0);
  }
  to {
    opacity: 1;
    transform: translateZ(0);
  }
}

.guide-text{
  position: relative;

  padding:80px;
  width:30%;
  height:50px;
  animation: slide 7s;
  left:35%;
  font-family: 'SOGANGUNIVERSITYTTF';
  color: black;
}

.guide-content{
  position: relative;
  top:50px;
  width:100%;
  height:600px;
}

.guide-text h2:hover
{
  color:black;
  font-weight: bolder;
  font-size: 30px;
}

@keyframes slide
{
  from{
    position: relative;
    left:120px;
    opacity: 0;
  }
  to{
    position: relative;
    left:35%;
    opacity: 1;
  }
}

#btn-btn-success{
  position: relative;
  top:1020px;
  padding:15px;
  width: 100px;
  font-weight: bolder;
}



.slide2-image{
  background-repeat:
      no-repeat;
  height:500px;
  position: relative;
  left:290px;
  top:260px;
  background-size:700px 370px;
}
.animated-title {
  font-size:60px; font-family:'Raleway',Sans-serif;
  font-weight:300;
  position: relative;
  width: 100%;max-width:100%;
  height: auto;
  padding:100px 0;
  overflow-x: hidden;
  overflow-y: hidden;
}

.animated-title .track {
  position: absolute;
  white-space: nowrap;
  will-change: transform;
  animation: marquee 70s linear infinite;
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (hover: hover) and (min-width: 700px){
  .animated-title .content {
    font-size: 20px;
    position: relative;
    top:140px;
    -webkit-transform: translateY(calc(100% - 8rem));
    transform: translateY(calc(100% - 8rem));
  }
}
.card-body {
  position: relative; /* 부모 요소를 기준으로 자식 요소를 배치 */
  height: 200px; /* 부모 요소의 높이를 설정 */
}

<!-- 초보자를위한 가이드 카드리스트-->
     .card-view {
       display: inline-block;
       text-align: center;
       position: relative;
       width:80%;
     }
.card-view .card-list{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap; /* 필요에 따라 추가: 카드가 너무 많아 한 줄에 다 담지 못할 경우 다음 줄로 넘어가게 하는 속성 */
  padding:15px;
  position: relative;

}
.card {
  width: 23%;
  min-height: 14rem;
}


.card-view {
  display: inline-block;
  text-align: center;
  position: relative;
  width:80%;
}
.board-write-list .card-list{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap; /* 필요에 따라 추가: 카드가 너무 많아 한 줄에 다 담지 못할 경우 다음 줄로 넘어가게 하는 속성 */
  padding:15px;
}
.card {
  width: 23%;
  min-height: 14rem;
}


.board-write-list .card-view {
  display: inline-block;
  text-align: center;
  top:-30px;
  position: relative;
  width:80%;
  height:500px;
}
.board-write-list .card-list{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap; /* 필요에 따라 추가: 카드가 너무 많아 한 줄에 다 담지 못할 경우 다음 줄로 넘어가게 하는 속성 */
  padding:30px;
  position: relative;
  top:0px;
}

.board-write-list .card {
  width: 28%;
  min-height: 24rem;
}

.Home-Styling-title{
  position: relative;
  top:-30px;
}

#carouselExampleDark{
  position: relative;
  top:-50px;
}
.carousel-item {
  position: absolute;
  opacity: 0;
  transition: opacity 0.4s ease-in-out;
}

.carousel-item.active {
  opacity: 1;
  transition: opacity 0.4s ease-in-out;
}

.main-banner{
  display: inline-block;
  text-align: center;
  border-radius: 3px;
  position: relative;
  top:50px;
  width: 100%;
  height:800px;
  background: linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8)),url(@/assets/room.jpg);
  background-size: cover;
}

.main-banner-title{
  position: relative;
  left:-30%;
  top:230px;
  color: white;
  font-size: 40px;
  font-family: 'SOGANGUNIVERSITYTTF';
  animation: slides 2s ease-out;
}
@keyframes slides {
  from{
    left:-400px;
  }
  to{
    left:-30%;
  }
}
.main-banner-title p{
  position: relative;
  top:20px;
  font-size: 22px;
  animation: slides_second 4s ease-out;
}
@keyframes slides_second {
  from{
    left:100px;
  }
  to{
    left:0;
  }
}

.main-banner-content{
  outline: none;
  cursor:pointer;
  border:3px solid darkseagreen;
  color: white;
  width:33%;
  height:370px;
  border-radius: 20px;
  transition: all .4s;
  background: none;
  left:54%;
  top:50px;
  position: relative;
  padding:17px;
  font-weight: bolder;
  font-size: 17px;
  animation: slide_third 10s;
}

.main-banner-content{
  outline: none;
  cursor:pointer;
  border:3px solid darkseagreen;
  color: white;
  width:33%;
  height:370px;
  border-radius: 20px;
  transition: all .4s;
  background: none;
  left:56%;
  top:70px;
  position: relative;
  padding:17px;
  font-weight: bolder;
  font-size: 17px;
  animation: slide_third 3.5s;
  opacity: 0.8;
}

@keyframes slide_third {
  0% {
    opacity: 0;
  }

  90% {
    opacity: 0.2; /* 절반의 시간 동안 매우 천천히 opacity 증가 */
  }

  100% {
    opacity: 1;
  }
}

.card {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-10px);
}

.banner-container{
  background-color : #FFFFFF;
  width: 1300px; /* 가로 크기 조정 */
  height: 700px;
  margin: 40px auto; /* 상하 여백 조정 */
  padding: 30px; /* 내부 여백 조정 */
  box-shadow: 50px 50px 150px rgba(0,0,0,0.2);
  border-radius: 8px;
  font-size: 14px; /* 폰트 크기 조정 */
  position: relative;
  top:30px;
}
</style>