<template>
  <div class="introduce">
    <div class="int-first-title">
      '이렇게 살아보고 싶다'는<br>
      <span style="position: relative; left:150px;">전 세계 사람들의 꿈을 현실로 만듭니다</span>
    </div>
    <div class="int-second-content">
      <span style="position: relative; left:-163px;">
        <span style="position: relative; left:-33.5px;">꿈꿔왔던 시간을 공간에 담는 여정.</span><br>
        우리는 라이프스타일을 이렇게 정의합니다.
        </span>
      <br><br>
      <span style="position: relative; left:-100px;">
      나의 취향을 발견하고, 좋아하는 것들로 일상을 채우는 것은<br>
        <span style="position: relative; left:-6.5px;">삶을 더 풍요롭고 의미 있게 만드는 것과 같기 때문입니다.</span>
        </span>
      <br><br>
      <span style="position: relative; left:-113px;">
      오늘의집은 자신의 취향을 가진 커뮤니티 유저들과 함께<br>
        <span style="position: relative; left:28px;">영감을 발산하는 콘텐츠와 일상 실현을 돕는 커머스를 연결하여</span><br>
        <span style="position: relative; left:80px;">각자가 원하는 라이프스타일을 쉽게, 편하게, 즐겁게 만들어가도록 돕습니다.</span>
        </span>
    </div>
    <div class="slider-container">
      <div class="slider-wrapper" :style="{ 'transform': `translateX(-${currentIndex * 400}px)` }">
        <div class="slide" v-for="(image, index) in images" :key="index">
          <img :src="image" :alt="'Slide ' + (index + 1)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        // 이미지 URL
        require('@/assets/interiorguide_image_list/classic.jpg'),
        require('@/assets/interiorguide_image_list/modern.png'),
        require('@/assets/interiorguide_image_list/natural.png'),
        require('@/assets/interiorguide_image_list/simple.png'),
        require('@/assets/interiorguide_image_list/vintage.png'),
        require('@/assets/interiorguide_image_list/classic2.jpg'),
        require('@/assets/interiorguide_image_list/modern2.png'),
        require('@/assets/interiorguide_image_list/natural2.png'),
        require('@/assets/interiorguide_image_list/simpl2.png'),
        require('@/assets/interiorguide_image_list/vintage2.png'),
        require('@/assets/interiorguide_image_list/modern3.png'),
        require('@/assets/interiorguide_image_list/natural3.png'),
        require('@/assets/interiorguide_image_list/simple3.png'),
        require('@/assets/interiorguide_image_list/vintage3.png'),
        require('@/assets/interiorguide_image_list/modern4.png'),
        require('@/assets/interiorguide_image_list/natural4.png'),
        require('@/assets/interiorguide_image_list/classic.jpg'),
        require('@/assets/interiorguide_image_list/modern.png'),
        require('@/assets/interiorguide_image_list/natural.png'),
        require('@/assets/interiorguide_image_list/modern4.png'),
      ],
      currentIndex: 0,
    };
  },
  created() {
    this.startSlide();
  },
  methods: {
    startSlide() {
      setInterval(() => {
        this.currentIndex += 1;
        // 이미지가 끝에 도달했을 때 처음으로 돌아가게 설정
        if (this.currentIndex >= this.images.length) {
          this.currentIndex = 0;
        }
      }, 3000); // 이미지가 3초마다 변경
    },
  },
};
</script>
<style>
@font-face {
  font-family: 'MyCustomFont4';
  src: url('../fonts/SOGANG_UNIVERSITY_for_windows.ttf') format('woff');
  font-weight: normal;
  font-style: normal;
}
.introduce {
  width: 100%;
  padding: 80px 0;
}

.int-first-title{
  padding:100px;
  color: #212529;
  font-size: 50px;
  font-stretch: normal;
  font-weight: 600; letter-spacing: -.8px;
  line-height: 1.32; white-space: pre-wrap;
  position: relative; left:-370px;
  font-family: MyCustomFont4;
  width:100%;
}

.int-first-title span {
  position: relative;
  left: 150px;
}

.int-second-content {
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  color: #495057;
  line-height: 1.6;
  text-align: center;
  width: 80%;
  margin: 0 auto;
  position: relative;
  left:-285px;
  top:-65px;
}.slider-container {
   overflow: hidden;
   width: 6500px; /* 600px * 8 /2 -21(@) */
  position: relative;
  top:100px;
 }

.slider-wrapper {
  display: flex;
  transition: transform 10s ease-in-out;
}

.slide {
  padding: 5px;
  width: 1000px;
  height: 300px;
}

.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>