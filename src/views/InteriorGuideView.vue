<!-- InteriorGuide.vue -->
<template>
  <div class="interirorguideview">
  <div class="container">
    <div class="left-section">
      <h1  class="font-h1"><span style="position: relative; left:-220px;">마음에 드는</span><br>
        <span  v-if="currentStep === 1" style="position: relative; left:-165px; color:darkgreen">
        인테리어 이미지를</span>
        <span  v-if="currentStep === 2" style="position: relative; left:-200px; color:darkgreen">
        가구 이미지를</span>
        <br>
        <span style="position: relative; left:-205px;">선택해 주세요</span></h1>
      <p class="guide-textcontent">{{ textContent }}</p>
      <router-link to="/" id="anlay-btn" style="position: relative; left:-80px;" class="btn btn-outline-success"><span class="font-analye_1">뒤로 가기</span></router-link>

    </div>


    <div class="right-section">
      <div class="image-gallery">
      <div v-for="(image, index) in currentImages" :key="index" @click="selectImage(index)" :class="{'selected': isSelected(index)}">
        <img :src="image.src" alt="Interior Style" width="195px" height="180px">
      </div>
         </div>
      <button id="anlay-btn" class="btn btn-success" style="position: relative; top:20px; left:-5px; padding:20px;" @click="goToStep2" v-if="currentStep === 1"><span style="position: relative; top:-5px;">Next</span></button>
      <div v-if="isLoading" class="loading-overlay">
        로딩 중...
      </div>
      <button id="anlay-btn" class="btn btn-success" style="position: relative; top:20px; left:-5px; padding:20px;" @click="analyzeSelectedImages" v-if="currentStep === 2"><span style="position: relative; top:-5px;">분석하기</span></button>
    </div>

    <modal v-if="showModal" @close="closeModal" class="modal-custom">
      <div class="modal-header">
        <h2>Preference Analysis</h2>
      </div>
      <div class="modal-body">
        <div class="section">
          <h3>결과는? 두둥탁</h3>
          <p>귀하의 선택에 기반하여, <strong style="font-size: 22px; color: black">{{ analysisResult }}</strong> 인테리어를 추천합니다.</p>
        </div>
        <div class="section" style="text-align: left; border-top: 1px solid lightgray; padding:5px;">
          <h3>내용</h3>
          {{analysistext}}
        </div>
        <div class="section">
          <h3>팁 설명</h3>
          <p>{{ tip }}<br>{{ tip_second }}</p>
        </div>
        <div class="section">
          <h3>색깔 추천</h3>
          <div class="colors">{{ color }}</div>
        </div>
      </div>
      <div class="modal-footer">
        <button @click="closeModal">Close</button>
      </div>
    </modal>
  </div>
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
      isLoading: false,
      textContent: "원하시는 인테리어 스타일 3가지를 선택하면 취향에 맞게 결과를 분석해드립니다.",
      firstStepImages: [
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
      ],  secondStepImages: [
        // 새로운 17개 이미지 배열을 여기에 추가하세요.
        { src: require('@/assets/interiorguide_image_list/furniture/furniture-natural.png')},
        { src: require('@/assets/interiorguide_image_list/furniture/furniture-vintage4.png')},
        { src:require('@/assets/interiorguide_image_list/furniture/furniture-vintage3.png')},
        { src: require('@/assets/interiorguide_image_list/furniture/furniture-natural2.png')},
        { src: require('@/assets/interiorguide_image_list/furniture/furniture-vintage2.png')},
        { src: require('@/assets/interiorguide_image_list/furniture/furniture-natural3.png')},
        { src: require('@/assets/interiorguide_image_list/furniture/furniture-vintage.png')},
        { src: require('@/assets/interiorguide_image_list/furniture/furniture-natural4.png')},
        { src: require('@/assets/interiorguide_image_list/furniture/furniture-simple3.png')},
        { src: require('@/assets/interiorguide_image_list/furniture/furniture-modern.png')},
        { src: require('@/assets/interiorguide_image_list/furniture/furniture-simple2.png')},
        { src: require('@/assets/interiorguide_image_list/furniture/furniture-modern2.png')},
        { src: require('@/assets/interiorguide_image_list/furniture/furniture-simple.png')},
        { src: require('@/assets/interiorguide_image_list/furniture/furniture-modern3.png')},
        { src: require('@/assets/interiorguide_image_list/furniture/furniture-vintage5.png')},
      ],
      selectedImages: [],
      showAnalysis: false,
      analysisResult: "",
      analysistext: "",
      tip: "",
      tip_second: "",
      color:"",
      showModal: false,
      selectedImagesStep2: [],
      currentStep: 1,
    }
  },
  computed: {
    currentImages() {
      return this.currentStep === 1 ? this.firstStepImages : this.secondStepImages;
    }
  },
  methods: {
    goToStep2() {
      this.currentStep = 1;
      this.selectedImagesStep2 = [];
      if (this.selectedImages.length === 3) {
        // 선택된 이미지가 3개일 경우, 다음 단계로 넘어감
        this.currentStep = 2;
        // 두 번째 단계에서 선택된 이미지 목록을 초기화
        this.selectedImagesStep2 = [];
      } else {
        // 선택된 이미지가 3개가 아닐 경우, 사용자에게 경고 창 표시
        alert("3개의 인테리어 이미지를 선택해 주세요.");
      }
    },
    selectImage(index) {
      const targetArray = this.currentStep === 1 ? this.selectedImages : this.selectedImagesStep2;
      const selectedIndex = targetArray.indexOf(index);
      if (selectedIndex === -1) {
        if (targetArray.length < 3) { // 최대 3개까지만 선택 가능
          targetArray.push(index);
        }
      } else {
        targetArray.splice(selectedIndex, 1);
      }
    },
    isSelected(index) {
      const targetArray = this.currentStep === 1 ? this.selectedImages : this.selectedImagesStep2;
      return targetArray.includes(index);
    },
    analyzeSelectedImages() {
      this.currentStep = 2;
      if (this.selectedImages.length === 3 && this.selectedImagesStep2.length === 3) {
        this.isLoading = true;

        //로딩 함수
        setTimeout(() => {

          // 스타일 별로 점수를 계산
          // 각 이미지에 대한 스타일 태그
          const imageStyles = {
            '2': ['modern'],
            '5': ['modern', 'classic'],
            '10': ['modern', 'natural'],
            '4': ['simple'],
            '7': ['simple', 'classic'],
            '16': ['simple'],
            '0': ['natural'],
            '1': ['natural'],
            '3': ['natural'],
            '15': ['natural'],
            '8': ['vintage'],
            '11': ['vintage'],
            '17': ['vintage'],
          };
          const imageStyles2 = {
            '0': ['natural'],
            '1': ['vintage', 'classic'],
            '2': ['vintage'],
            '3': ['natural'],
            '4': ['vintage', 'classic'],
            '5': ['natural'],
            '6': ['vintage'],
            '7': ['natural'],
            '8': ['simple'],
            '9': ['modern'],
            '10': ['simple'],
            '11': ['modern'],
            '12': ['simple'],
            '13': ['modern'],
            '14': ['vintage'],
          }

          let styleScores = {
            'modern': 0,
            'natural': 0,
            'vintage': 0,
            'classic': 0,
            'simple': 0,
          };

          // 선택된 이미지들에 대해 스타일 점수 계산
          this.selectedImages.forEach(imageId => {
            const styles = imageStyles[imageId];
            if (styles) {
              styles.forEach(style => {
                if (!styleScores[style]) styleScores[style] = 0; // 이 줄은 사실상 필요 없으나, 다른 스타일이 추가될 경우를 대비해 둡니다.
                styleScores[style]++;
              });
            }
          });

// 두 번째 단계 이미지 스타일 점수 합산
          this.selectedImagesStep2.forEach(imageId => {
            const styles = imageStyles2[imageId];
            if (styles) {
              styles.forEach(style => {
                if (!styleScores[style]) styleScores[style] = 0; // 마찬가지로 필요 없지만, 확장성을 고려
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
          console.log(`추천 스타일: ${recommendedStyle}, 점수: ${highestScore}`);
          // 추천 스타일에 따른 결과
          switch (recommendedStyle) {
            case 'modern':
              this.analysisResult = " 🧱'모던 스타일'🧱";
              this.analysistext = "메탈, 대리석 소재를 지나치게 사용하면 차가운느낌이 너무 강해질수 있다. 그럴 때는 러그, 화분, 따듯한 느낌의 조명등을 이용하여 차가운 느낌을 중화시키면서 간결하고 깔끔하게 연출할 수 있다.\n" +
                  "단색, 모노톤의 심플한 너무 화려하지 않은디자인의 액자를 배치하여 세련된 감각을 줄 수 있다.";
              this.tip = "✔ 메탈, 대리석 소재를 지나치게 사용하면 차가운 느낌이 들 수 있다.";
              this.tip_second = "✔ 러그, 화분, 따듯한 느낌의 조명등을 이용하여 중화를 시키는 방법 !";
              this.color = "🟫⬜⬛";
              break;
            case 'simple':
              this.analysisResult = "⭐'미니멀리스트&심플 스타일'⭐";
              this.analysistext = "과거의 감성을 현대적으로 재해석한 스타일을 선호합니다. 고유의 색감과 패턴이 돋보이는 가구와 소품을 사용하여 개성 있는 공간을 연출합니다. 골동품이나 레트로한 디자인의 소품을 활용하여 시간을 초월하는 매력을 더할 수 있습니다.";
              this.tip = "✔ 고유의 색감과 패턴이 돋보이는 가구 사용하기";
              this.tip_second = "✔ 골동품 및 레트로한 디자인의 소품 활용하기";
              this.color = "⬜🔘⬛";
              break;
            case 'natural':
              this.analysisResult = "🌙'Natural 스타일'🌙";
              this.analysistext = "자연 소재를 많이 사용하고, 식물이나 나무 요소를 포함시켜 실내외 연결감을 강화할 수 있습니다. 자연광을 최대한 활용하고, 통풍이 잘 되도록 구성하는 것이 중요합니다.";
              this.tip = "✔ 식물이나 나무 요소를 포함시키기";
              this.tip_second = "✔ 자연광을 최대한 활용하기";
              this.color = "🟩⬜🟫⬛";
              break;
            case 'vintage':
              this.analysisResult = "🎇'빈티지&레트로 스타일'🎇";
              this.analysistext = "과거의 감성을 현대적으로 재해석한 스타일을 선호합니다. 고유의 색감과 패턴이 돋보이는 가구와 소품을 사용하여 개성 있는 공간을 연출합니다. 골동품이나 레트로한 디자인의 소품을 활용하여 시간을 초월하는 매력을 더할 수 있습니다.";
              this.tip = "✔ 고유의 색감과 패턴이 돋보이는 가구 사용하기"
              this.tip_second = "✔ 골동품 및 레트로한 디자인의 소품 활용하기";
              this.color = "🟫🟨🟧";
              break;
            case 'classic':
              this.analysisResult = "✨'클래식 스타일'✨";
              this.analysistext = "우아하고 고전적인 느낌을 주는 가구와 장식품을 선택합니다. 깊은 색상의 목재, 정교한 패턴의 직물, 그리고 클래식한 라인의 조명 등을 사용하여 고급스러움을 연출할 수 있습니다.";
              this.tips = "✔ 우아하고 고전적인 느낌의 가구 선택하기";
              this.tip_second = "✔ 깊은 색상의 목재 사용하기";
              this.color = "⬜⬛";
              break;

            default:
              this.analysisResult = "분석 가능한 선택이 아닙니다. 다른 이미지를 선택해 주세요.";
              break;
          }

          // 모달 창을 보여주는 로직
          this.showModal = true;

          this.isLoading = false;
        },3000);
      } else {
        alert("3개의 가구를 선택해 주세요.");
      }
    },
    closeModal() {
      this.showModal = false;
    }

  }
}
</script>

<style>
.interirorguideview{
  height: 1500px;
}

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
  left:-85px;
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
  left:-120px;
  width:110px;
  height:55px;
}
.font-analye{
  font-weight: bolder;
}

.font-analye_1{
  font-weight: bolder;
  position: relative;
  top:8px;
}
 .selected {
   border: 2px solid blue; /* 선택된 이미지를 파란색 테두리로 강조 */
 }
.modal-custom {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.modal-header {
  background: #f9f9f9;
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #eee;
  width: 100%;
}

.modal-header h2 {
  margin: 0;
  font-family: 'MyCustomFont3', sans-serif;
  color: #333;
  font-weight: bolder;
  font-size: 30px;
}

.modal-body {
  padding: 20px;
}

.section h3 {
  font-family: 'MyCustomFont3', sans-serif;
  color: #333;
  text-align: left;
}

.section p, .section strong {
  font-family: 'MyCustomFont3', sans-serif;
  text-align: left;
}

.colors {
  font-size: 40px;
  display: flex;
  text-align: left;
}

.modal-footer {
  text-align: center;
  padding: 20px;
  background: #f9f9f9;
  border-top: 1px solid #eee;
}

.modal-footer button {
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.5s ease; /* 부드러운 배경색 전환 효과 */
}

.modal-footer button:hover {
  background: #0056b3; /* 마우스를 올렸을 때의 배경색 */
}

/* 로딩 */
.loading-overlay {
  position: fixed; /* 뷰포트에 고정하여 항상 보이게 합니다. */
  top: 0;
  left: 0;
  width: 100%; /* 전체 너비 */
  height: 100%; /* 전체 높이 */
  background-color: rgba(0, 0, 0, 0.75); /* 반투명 검정색 배경 */
  color: white; /* 텍스트 색상 */
  display: flex; /* Flexbox를 사용하여 자식 요소를 중앙 정렬합니다. */
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  font-size: 1.5em; /* 텍스트 크기 */
  z-index: 1000; /* 다른 요소들 위에 오버레이가 위치하도록 z-index 설정 */
}

.loading-overlay::before {
  content: ''; /* 가상 요소의 내용 */
  display: block;
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3; /* 옅은 회색 테두리 */
  border-top: 5px solid #3498db; /* 상단은 진한 파란색으로 */
  border-radius: 50%; /* 원형 */
  animation: spin 2s linear infinite; /* 2초 동안 무한 회전 */
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

</style>
