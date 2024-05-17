<template>
  <div class="introduce">
    <div class="int-first-title">
      '이렇게 살아보고 싶다'는<br>
      <span style="position: relative; left:150px;">전 세계 사람들의 꿈을 현실로 만듭니다</span>
    </div>
    <div class="int-second-content">
      <span style="position: relative; left:-163px;">
        <span style="position: relative; left:-30.5px;">꿈꿔왔던 시간을 공간에 담는 여정.</span><br>
        우리는 라이프스타일을 이렇게 정의합니다.
        </span>
      <br><br>
      <span style="position: relative; left:-92px;">
      나의 취향을 발견하고, 좋아하는 것들로 일상을 채우는 것은<br>
        <span style="position: relative; left:-9.5px;">삶을 더 풍요롭고 의미 있게 만드는 것과 같기 때문입니다.</span>
        </span>
      <br><br>
      <span style="position: relative; left:-115px;">
      ZIP에서는 자신의 취향을 가진 커뮤니티 유저들과 함께<br>
        <span style="position: relative; left:33.5px;">영감을 발산하는 콘텐츠와 일상 실현을 돕는 커머스를 연결하여</span><br>
        <span style="position: relative; left:87px;">각자가 원하는 라이프스타일을 쉽게, 편하게, 즐겁게 만들어가도록 돕습니다.</span>
        </span>
    </div>
    <div class="slider-containers">
      <div class="slider-wrappers" :style="{ 'transform': `translateX(-${currentIndex * 400}px)` }">
        <div class="slideaa" v-for="(image, index) in images" :key="index">
          <img :src="image" :alt="'Slide ' + (index + 1)">
        </div>
      </div>
    </div>

    <div class="third-container">
      <div style="position: relative; left:-150px; top:150px;" class="third-container-title">
        <span style=" transform: skewX(1deg); font-style: italic; position: relative; left:-270px;">.zip은</span>
        <br> <span style="position: relative; left:-190px;">영감을 주는 공간,</span>
        <br> <span style="position: relative; left:-145px;">함께 만드는 아름다움을</span> <br>
        <span style="position: relative; left:-180px;">선호하고 있습니다.</span>
        <div style="width: 500px; height: 500px; background-color: white; border-radius: 13px; border: 1px solid white; position: relative; top:-250px;left:1100px; box-shadow: 100px 100px 100px rgba(0, 0, 0, 0.25);">
        </div>
      </div>
    </div>

    <div class="int-main-content">
      <span style="position: relative; left:-80px;" class="main-content-style">
      <span style=" transform: skewX(1deg); font-style: italic; font-size: 40px;">ZIP</span>&nbsp;은 콘텐츠, 커뮤니티, 커머스를 연결한 독창적 서비스로<br>
        <span style="position: relative; left:-87px;">전 국민 사람들의 라이프스타일에 영감을 주고,</span><br>
        <span style="position: relative; left:-69px;">꿈꾸던 삶을 현실로 만드는 도전을 하고 있습니다.</span>
        </span>
      <div class="image-int" style="height: 1650px;">
        <div style="height:550px;">
        <img src="@/assets/intreoduce_image_list/intro-image.png" width="950px" style="padding:10px; background-color: #f4f7f8; position: relative; left:70px;">
        <span style="font-family: MyCustomFont5;">
          <span style="position: relative; top:-100px; left:100px; font-size: 25px;  font-weight: bolder">인테리어 맞춤형 추천</span>
        <span style="position: relative; left:-115px; top:-20px; font-size: 20px;">나만의 공간을 창조하고 콘텐츠를 통해 나의 공간과 일상을 상상하도록 돕고,  </span>
          <br><span style="position: relative; left:390px; top:-250px;font-size: 20px;">더 나은 개선된 환경과 조화를 손쉽게 살펴볼 수 있습니다.</span>
        </span>
        </div>
        <div style="height:550px;">
          <img src="@/assets/intreoduce_image_list/intro-board.png" width="950px" style="padding:10px; background-color: #f4f7f8; position: relative; left:70px;">
          <span style="font-family: MyCustomFont5;">
          <span style="position: relative; top:-100px; left:100px; font-size: 25px;  font-weight: bolder">영감 가득한 유저들의 콘텐츠</span>
        <span style="position: relative; left:-195px; top:-20px; font-size: 20px;">온라인 집들이부터 특별한 경험, 일상의 단면까지,좋아하는 거로 삶을  </span>
          <br><span style="position: relative; left:455px; top:-250px;font-size: 20px;">채워나가는 유저들의 생생한 이야기들이 모여 다른 사람들의 영감이 됩니다.</span>
        </span>
        </div>
        <div style="height:550px;">
          <img src="@/assets/intreoduce_image_list/intro-community.png" width="650px" style="padding:10px; background-color: #f4f7f8; position: relative; left:70px;">
          <span style="font-family: MyCustomFont5;">
          <span style="position: relative; top:-100px; left:100px; font-size: 25px;  font-weight: bolder">유저들이 취향을 나누는 커뮤니티</span>
        <span style="position: relative; left:-240px; top:-20px; font-size: 20px;">다채로운 관심사를 가진 사람들이 모여 정보를 얻고,</span>
          <br><span style="position: relative; left:340px; top:-320px;font-size: 20px;">서로 공감하면서 긍정적인 영향을 주고받는 커뮤니티 생태계를 만듭니다.</span>
        </span>
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
.introduce {
  height: 4100px;
  width: 100%;
  padding: 80px 0;
}

@font-face {
  font-family: 'MyCustomFont4';
  src: url('../fonts/SOGANG_UNIVERSITY_for_windows.ttf') format('woff');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'MyCustomFont5';
  src: url('../fonts/GowunBatang-Regular.ttf') format('woff');
  font-weight: normal;
  font-style: normal;
}



.int-first-title {
  padding: 100px;
  color: #212529;
  font-size: 50px;
  font-stretch: normal;
  font-weight: 600;
  letter-spacing: -.8px;
  line-height: 1.32;
  white-space: pre-wrap;
  position: relative;
  left: -370px;
  font-family: MyCustomFont4;
  width: 100%;
}

.int-first-title span {
  position: relative;
  left: 150px;
}

.int-second-content {
  font-family: MyCustomFont5;
  font-size: 20px;
  color: #495057;
  line-height: 1.6;
  text-align: center;
  width: 80%;
  margin: 0 auto;
  position: relative;
  left: -285px;
  top: -65px;
}

.slider-containers {
  overflow: hidden;
  width: 6500px; /* 600px * 8 /2 -21(@) */
  position: relative;
  top: 100px;
}

.slider-wrappers {
  display: flex;
  transition: transform 10s ease-in-out;
}

.slideaa {
  padding: 5px;
  width: 1000px;
  height: 300px;
}

.slideaa img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.third-container {
  background-color: #f4f7f8;
  width: 100%;
  height: 800px;
  position: relative;
  top: 150px;
}

.third-container-title {
  font-family: MyCustomFont4;
  font-size: 35px;
  color: #333333;
}

.int-main-content {
  position: relative;
  top: 200px;
}

.main-content-style {
  font-size: 35px;
  font-family: MyCustomFont4;
  font-weight: bolder;
  font-stretch: normal;
  font-weight: 600;
  letter-spacing: -.8px;
  line-height: 1.32;
  color: #212529;
}
.image-int{
  position: relative;
  top:100px;
}
</style>