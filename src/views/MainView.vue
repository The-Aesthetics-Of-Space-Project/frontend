<template>
  <div class="main">
    <div class="main-banner">
      <div class="main-banner-title">
        <h1><span style=" transform: skewX(1deg);font-style: italic; ">zip</span>&nbsp;에서 시작하는 새로운 이야기</h1>
        <p>영감을 공유하고 새로운 트렌드를 발견하세요.</p>
      </div>
    </div>
    <div class="main-1container" style=" height: 700px; width: auto;">
      <div class="image-1container">
        <router-link to="/interiorguide">
          <img src="@/assets/main_content_image_list/ckdwh.jpg" alt="인테리어 사진" width="280px">
        </router-link>
        <div class="title-a" style="font-family: MyCustomFont2; font-size: 20px;">인테리어 맞춤형 추천</div>
        <div class="description">나만의 공간을 창조하고 콘텐츠를 통해 나의 공간과 일상을 상상하도록 돕고, 더 나은 개선된 환경과 조화를 손쉽게 살펴볼 수 있습니다.</div>
      </div>

      <div class="image-1container">
        <router-link :to="isUserLogin ? '/GeneralBoard':'/login'">
          <img src="@/assets/main_content_image_list/main_contents.png" alt="유저들의 콘텐츠" width="290px">
        </router-link>
        <div class="title-a" style="font-family: MyCustomFont2; font-size: 20px;">영감 가득한 유저들의 콘텐츠</div>
        <div class="description">온라인 집들이부터 특별한 경험, 일상의 단면까지, 좋아하는 거로 삶을 채워나가는 유저들의 생생한 이야기들이 모여 다른 사람들의 영감이 됩니다.</div>
      </div>

      <div class="image-1container">
        <router-link to="/Community">
          <img src="@/assets/main_content_image_list/main-community.png" alt="커뮤니티" width="282px;">
        </router-link>
        <div class="title-a" style=" font-size: 20px;">취향을 나누는 커뮤니티</div>
        <div class="description">다채로운 관심사를 가진 사람들이 모여 정보를 얻고, 서로 공감하면서 긍정적인 영향을 주고받는 커뮤니티 생태계를 만듭니다.</div>
      </div>
    </div>
    <div class="guide-content">
      <div class="guide-text">
        <h2 ref="mainText" style="font-size: 24px; font-weight: bolder;">맞춤형 인테리어 추천</h2>
      </div>

      <div class="card-view">
        <router-link to="/InteriorGuide" style="text-decoration: none; color:black; font-weight: bolder; position: relative; left:-100px; top:-30px;">
          <span style="float:right; position: relative; left:37px; top:15px; font-weight: 650">더 보기</span>
        </router-link>

        <div class="card-list">
          <div class="card" v-for="(card, index) in cards" :key="index">
            <div class="card-body">
              <h5 class="card-title">{{ card.title }}</h5>
              <!--<h5 class="card-title">{{ card.title }}</h5>-->
              <!-- <p class="card-text">{{ card.text }}</p>-->
                <img :src="card.imageSrc" alt="Card Image" width="112%"height="117%" style="position: relative; left:-6%; top:-24px;">
                <span class="card-guide-content" id="router-link-custom" style="color: #333333; font-weight: bolder; "> {{card.text}}</span>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div id="carouselExampleDark" class="carousel slide" data-bs-ride="carousel" style="position: relative; top:100px; ">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleDark" v-for="(slide, index) in slides"
                :data-bs-slide-to="index" :class="{ 'active': index === 0 }" :aria-current="index === 0"
                :aria-label="'Slide ' + (index + 1)" :key="'indicator-' + index"></button>
      </div>
      <div class="carousel-inner" >
        <div v-for="(slide, index) in slides" :class="{ 'carousel-item': true, 'active': index === 0 }"
             :data-bs-interval="slide.interval" :key="'slide-' + index">
          <img :src="slide.image" class="d-block w-100" width="80%" height="820vh"
               :style="{ 'background-color': slide.backgroundColor}" >
          <div class="image-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.4);"></div>
          <div class="carousel-caption d-none d-md-block">
            <div class="animated-title" v-if="index === 0">
              <div class="track">
                <div class="content"><blockquote class="blockquote">
                </blockquote></div>
              </div>
            </div>

            <div class="title-home" v-if="index === 0">
              <h3>INTERIOR DESIGN COMPANY </h3>
              <H1>Experience Interior <br> Design</H1>

            </div>
            <div v-if="index === 1" style="background-color: white; width: 150%; height: 150%; position: relative; left:-28%; top:58px;">
              <router-link to="/competitionPoster"><img src="@/assets/main_content_image_list/second_banner.png" style="width: 63%; height: 63%; position: relative; top:-50px;"></router-link>
            </div>


            <h5 v-if="slide.title"
                :style="{ 'position': 'relative', 'top': slide.titleTop, 'font-size': slide.fontsize, 'color': slide.color }">{{
                slide.title }}</h5>
            <p
                :style="{ 'position': 'relative', 'top': slide.contentTop, 'font-size': slide.fontsize, 'color': slide.color }">
              {{ slide.content }}</p>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <div class="Home-Styling-title">
      <router-link to="/GeneralBoard" style="text-decoration: none; color:black; font-weight: bolder; position: relative; left:-100px; top:-30px;">
        <span style="float:right; position: relative; left:-117px; top:165px;">더 보기</span>
      </router-link>
      <h2  style=" color: #333333; position: relative; top:80px; font-size: 24px; font-weight: bolder;">주목받는 게시물</h2>
      <div class="board-write-list">
        <div class="card-view">
          <div class="card-list">
            <div class="card" v-for="(card, index) in cardsa" :key="index">
              <div class="card-body">
                <h5 class="card-title" style="font-size: 16px; color: #333333; font-weight: bolder;">{{ card.title }}</h5>
                <img :src="card.thumbnail" alt=" " height="310" width="310" style="border-radius: 15px; position: relative; top:-6px;">
              </div>
              <img src="@/assets/mypage_icon/like.png" height="25" width="25" style="position: relative; left:85%; top:10%;">
              <span style="position: relative; left:45%; top:3.8%;">{{ card.likeCount }}</span>
              <h5 class="card-title" style="position:relative; top:50px; font-size: 16px;"><span style="font-size: 17.5px;">{{ card.nickname }}</span>&nbsp;의 게시물</h5>
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
import {api} from "@/api/api";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'MainView',
  computed: {
    // 로그인 유무 확인
    isUserLogin() {
      return this.$store.getters.isLogin;
    }
  },
  mounted() {
    this.cardlist();
  },
  methods:{
    async cardlist() {
      const baseUrl = 'http://jerry6475.iptime.org:20000';
      await api.getGeneralRanking('/api/general/posts/popular').then(res => {
        this.cardsa = res.data.map(card => ({
          ...card,
          profile: baseUrl + card.profile
        }));
        console.log('데이타', res.data);
      }).catch(error => {
        if (error.response) {
          console.log("error", error);
        }
      });
    },
    //  async updateLike(index) {
    //   const card = this.cardsa[index];
  },
  components: {
  },
  data() {
    return {
      cardsa:'',
      cards: [
        {  text: '자연스러운 느낌을 주는 인테리어', imageSrc:require('@/assets/interiorguide_image_list/simple4.jpg')},
        {  text: '현대적인 인테리어',imageSrc:require('@/assets/interiorguide_image_list/modern4.jpg')},
        {  text: '미니멀하고 심플한 인테리어',imageSrc:require('@/assets/interiorguide_image_list/n2.jpg') },
        {  text: '빈티지&레트로 인테리어',imageSrc:require('@/assets/interiorguide_image_list/retro1.jpg') },
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

<style >

@font-face {
  font-family: 'SOGANGUNIVERSITYTTF';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2312-1@1.1/SOGANGUNIVERSITYTTF.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}
body {
  margin :0;
}

.title-home h1{
  position: relative;
  bottom:240px;
  font-size: 60px;
}
.title-home h3{
  position: relative;
  bottom:280px;
  font-size: 35px;

}
.item_box{
  background-color: rgba(0,0,0,0.4);
  padding:20px;
  border-radius: 5px;
  transition: 0.5s;
}
.item_box:hover{
  background-color: wheat;
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
  height:3800px;
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
  color: #333333;
  top:20px;
}

.guide-content{
  position: relative;
  top:130px;
  width:100%;
  height:600px;
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
  background-repeat: no-repeat;
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
  top:100px;
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
  top:180px;
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
  height:680px;
  background: linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8)),url(@/assets/room.jpg);
  background-size: cover;
}
.main-banner-content p{
  font-weight: normal;
}
.main-banner-title{
  position: relative;
  top:300px;
  color: white;
  font-size: 40px;
  animation: slides 5s ease-out;
}
.main-banner-content p
@keyframes slides {
  from{
    left:800px;
  }
  to{
    left:800px;
  }
}
.main-banner-title p{
  position: relative;
  top:20px;
  font-size: 21px;
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

.main-banner-content h5{
  font-family : MyCustomFont3;
  font-size : 21px;
}
.main-banner-content:hover{
  background-color: darkslategrey;
}
.card {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-10px);
}

.main-1container {
  display: flex; /* Flexbox를 사용하여 자식 요소들을 가로로 나열 */
  justify-content: center;
  align-items: center; /* 자식 요소들을 세로 중앙에 위치 */
  flex-wrap: wrap; /* 내용이 넘치면 다음 줄로 자동 이동 */
  width: 100%;
  background-color: #f4f7f8;
  position: relative;
  top:130px;
  gap:30px;

}

.image-1container {
  flex-basis: 29%; /* flex 항목의 기본 크기 설정 */
  text-align: center; /* 텍스트 중앙 정렬 */
  background-color: #f8f8f8; /* 배경색 */
  padding: 15px; /* 내부 여백 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
  border-radius: 10px; /* 모서리 둥글게 */
  transition: transform 0.3s ease-in-out; /* 변형 애니메이션 */

}

.image-1container:hover {
  transform: scale(1.05); /* 마우스 오버 시 컨테이너 확대 */
}

.image-1container img {
  max-width: 100%; /* 이미지 최대 너비 */
  height: auto; /* 이미지 높이 자동 조정 */
  border-radius: 8px; /* 이미지 모서리 둥글게 */
}

.title-a {
  color: #333; /* 제목 색상 */
  margin-top: 15px; /* 상단 여백 */
  font-size: 1.1em; /* 글자 크기 */
  font-weight: bold; /* 글자 굵기 */
}

.description {
  color: #666; /* 설명 텍스트 색상 */
  margin-top: 10px; /* 상단 여백 */
  font-size: 0.9em; /* 글자 크기 */
}

</style>
