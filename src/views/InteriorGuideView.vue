<!-- InteriorGuide.vue -->
<template>
  <div class="container">
    <div class="left-section">
      <h1 class="font-h1"><span style="position: relative; left:-80px;">마음에 드는</span><br><span style="position: relative; left:-25px; color:darkgreen">
        인테리어 이미지를</span> <br>
        <span style="position: relative; left:-65px;">선택해 주세요</span></h1>
      <p class="guide-textcontent">{{ textContent }}</p>
      <button id="anlay-btn" class="btn btn-success" @click="analyzeSelectedImages" :disabled="selectedImages.length !== 3"><span class="font-analye">분석 결과</span></button>
    </div>
    <div class="right-section">
      <div class="image-gallery">
        <div class="image-container" v-for="(image, index) in images" :key="index">
          <img style="width:200px;,height:200px" :src="image.src" :alt="image.alt" @click="selectImage(index)" :class="{ 'selected': selectedImages.includes(index) }">
        </div>
      </div>
    </div>

    <modal v-if="showModal" @close="closeModal">
      <h2>Preference Analysis</h2>
      <br>
      <div class="first-section">
      <span style="font-size: 27px; font-weight: bolder; position: relative; left:-250px;">결과는? 두둥탁</span>
      <p style="font-size: 18px;">{{ analysisResult }}</p>
      <div style="width:88%; margin: auto; border-top: 1px solid"></div>
      <br>
      <div style="width:87%; margin: auto;">{{analysistext}}</div>
      </div>
      <br>

      <div class="second-section">
        <h3 style="position: relative; left:-310px; font-weight: bolder">TIPS</h3>
        <div style="width:85%; margin: auto;">
          {{tip}}
          <br>
          {{tip_second}}
          <br>
      </div>
        <div class="bottom-section">
          <h3 style="position: relative; left:-300px; font-weight: bolder">Colors</h3>
          <br>
         <span style="font-size: 40px"> {{color}}</span>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue'

export default {
  components: {
    Modal
  },
  data() {
    return {
      textContent: "원하시는 인테리어 스타일 3가지를 선택하시면 취향에 맞게 결과를 분석해드립니다.",
      images: [
        { src: require('@/assets/interiorguide_image_list/natural.png')},
        { src: require('@/assets/interiorguide_image_list/natural2.png')},
        { src:require('@/assets/interiorguide_image_list/modern.png')},
        { src: require('@/assets/interiorguide_image_list/natural3.png')},
        { src: require('@/assets/interiorguide_image_list/simple.png')},
        { src: require('@/assets/interiorguide_image_list/modern2.png')},
        { src: require('@/assets/interiorguide_image_list/classic.jpg')},
        { src: require('@/assets/interiorguide_image_list/simpl2.png')},
        { src: require('@/assets/interiorguide_image_list/vintage2.png')},
        { src: require('@/assets/interiorguide_image_list/classic2.jpg')},
        { src: require('@/assets/interiorguide_image_list/modern3.png')},
        { src: require('@/assets/interiorguide_image_list/vintage.png')},
        { src: require('@/assets/interiorguide_image_list/natural.png')},
        { src: require('@/assets/interiorguide_image_list/natural2.png')},
        { src:require('@/assets/interiorguide_image_list/modern4.png')},
        { src: require('@/assets/interiorguide_image_list/natural4.png')},
        { src: require('@/assets/interiorguide_image_list/simple3.png')},
        { src: require('@/assets/interiorguide_image_list/vintage3.png')}
        // Add more images here
      ],
      selectedImages: [],
      showAnalysis: false,
      analysisResult: "",
      analysistext: "",
      tip: "",
      tip_second: "",
      color:"",
      showModal: false
    }
  },
  methods: {
    selectImage(index) {
      const selectedIndex = this.selectedImages.indexOf(index);
      if (selectedIndex === -1) {
        this.selectedImages.push(index);
      } else {
        this.selectedImages.splice(selectedIndex, 1);
      }
  },
    analyzeSelectedImages() {
      // 스타일 별로 점수를 계산
      let styleScores = {
        'modern': 0,
        'minimalist': 0,
        'natural': 0,
        'vintage': 0,
        'classic': 0
      };

      // 각 이미지에 대한 스타일 태그
      const imageStyles = {
        '2': ['modern'],
        '5': ['modern', 'classic'],
        '10': ['modern', 'natural'],
        '4': ['minimalist'],
        '7': ['minimalist', 'classic'],
        '16': ['minimalist'],
        '0': ['natural'],
        '1': ['natural'],
        '3': ['natural'],
        '15': ['natural'],
        '8': ['vintage'],
        '11': ['vintage'],
        '17': ['vintage'],
      };

      // 선택된 이미지들에 대해 스타일 점수 계산
      this.selectedImages.forEach(imageId => {
        const styles = imageStyles[imageId];
        if (styles) {
          styles.forEach(style => {
            styleScores[style]++;
          });
        }
      });

      // 가장 점수가 높은 스타일 찾기
      let highestScore = 0;
      let recommendedStyle = '';
      for (let style in styleScores) {
        if (styleScores[style] > highestScore) {
          highestScore = styleScores[style];
          recommendedStyle = style;
        }
      }

      // 추천 스타일에 따른 결과
      switch(recommendedStyle) {
        case 'modern':
          this.analysisResult = " 귀하의 선택에 기반하여, 🧱'모던 스타일'🧱 인테리어를 추천 ";
          this.analysistext = "메탈, 대리석 소재를 지나치게 사용하면 차가운느낌이 너무 강해질수 있다. 그럴 때는 러그, 화분, 따듯한 느낌의 조명등을 이용하여 차가운 느낌을 중화시키면서 간결하고 깔끔하게 연출할 수 있다.\n" +
              "단색, 모노톤의 심플한 너무 화려하지 않은디자인의 액자를 배치하여 세련된 감각을 줄 수 있다.";
          this.tip = "✔ 메탈, 대리석 소재를 지나치게 사용하면 차가운 느낌이 들 수 있다.";
          this.tip_second = "✔ 러그, 화분, 따듯한 느낌의 조명등을 이용하여 중화를 시키는 방법 !";
          this.color = "🟫⬜⬛";
          break;
        case 'minimalist':
          this.analysisResult = "귀하의 선택에 기반하여, ⭐'미니멀리스트&심플 스타일'⭐ 인테리어를 추천 ";
          this.analysistext = "과거의 감성을 현대적으로 재해석한 스타일을 선호합니다. 고유의 색감과 패턴이 돋보이는 가구와 소품을 사용하여 개성 있는 공간을 연출합니다. 골동품이나 레트로한 디자인의 소품을 활용하여 시간을 초월하는 매력을 더할 수 있습니다.";
          this.tip = "✔ 고유의 색감과 패턴이 돋보이는 가구 사용하기";
          this.tip_second ="✔ 골동품 및 레트로한 디자인의 소품 활용하기";
          this.color = "⬜🔘⬛";
          break;
        case 'natural':
          this.analysisResult = "귀하의 선택에 기반하여, 🌙'Natural 스타일'🌙 인테리어를 추천 ";
          this.analysistext= "자연 소재를 많이 사용하고, 식물이나 나무 요소를 포함시켜 실내외 연결감을 강화할 수 있습니다. 자연광을 최대한 활용하고, 통풍이 잘 되도록 구성하는 것이 중요합니다.";
          this.tip= "✔ 식물이나 나무 요소를 포함시키기";
          this.tip_second = "✔ 자연광을 최대한 활용하기";
          this.color = "🟩⬜🟫⬛";
          break;
        case 'vintage':
          this.analysisResult = "귀하의 선택에 기반하여, 🎇'빈티지&레트로 스타일'🎇 인테리어를 추천 ";
          this.analysistext = "과거의 감성을 현대적으로 재해석한 스타일을 선호합니다. 고유의 색감과 패턴이 돋보이는 가구와 소품을 사용하여 개성 있는 공간을 연출합니다. 골동품이나 레트로한 디자인의 소품을 활용하여 시간을 초월하는 매력을 더할 수 있습니다.";
          this.tip = "✔ 고유의 색감과 패턴이 돋보이는 가구 사용하기"
          this.tip_second = "✔ 골동품 및 레트로한 디자인의 소품 활용하기";
          this.color = "🟫🟨🟧";
          break;
        case 'classic':
          this.analysisResult = "귀하의 선택에 기반하여, ✨'클래식 스타일'✨ 인테리어를 추천 ";
          this.analysistext = "우아하고 고전적인 느낌을 주는 가구와 장식품을 선택합니다. 깊은 색상의 목재, 정교한 패턴의 직물, 그리고 클래식한 라인의 조명 등을 사용하여 고급스러움을 연출할 수 있습니다.";
          this.tips= "✔ 우아하고 고전적인 느낌의 가구 선택하기";
          this.tip_second = "✔ 깊은 색상의 목재 사용하기";
          this.color="⬜⬛";
          break;

        default:
          this.analysisResult = "분석 가능한 선택이 아닙니다. 다른 이미지를 선택해 주세요.";
          break;
      }
      // 모달 창을 보여주는 로직
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    }

  }
}
</script>

<style>
.container {
  display: flex;
  justify-content: space-between;
  height:1250px;
  padding:110px;
}

.font-h1{
  position: relative;
  top:200px;
  font-weight:bolder;
  left:-50px;
}
.guide-textcontent{
  position: relative;
  top:200px;
  left:-80px;
}
.left-section {
  flex: 1;
  padding: 20px;
  position: sticky;
  height:70vh;
  top:170px;
}


.right-section {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}

.image-container img {
  width: 100%;
  height: auto;
  cursor: pointer;
}

.image-container .selected {
  border: 2px solid blue;
}

#anlay-btn {
  margin-top: 20px;
  position: relative;
  top:230px;
  left:-90px;
  width:110px;
  height:55px;
}
.font-analye{
  font-weight: bolder;
}
</style>
