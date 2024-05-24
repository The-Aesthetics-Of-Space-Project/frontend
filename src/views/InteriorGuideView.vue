<!-- InteriorGuide.vue -->
<template>
  <div class="interirorguideview">
    <div class="container">
      <div class="left-section">
        <!-- <button @click='test'>test</button> -->
        <h1  class="font-h1"><span style="position: relative; left:-220px;">마음에 드는</span><br>
          <span  v-if="currentStep === 1" style="position: relative; left:-165px; color:darkgreen">
        인테리어 이미지를</span>
          <span  v-if="currentStep === 2" style="position: relative; left:-220px; color:darkgreen">
        컬러 색감을</span>
          <span  v-if="currentStep === 3" style="position: relative; left:-200px; color:darkgreen">
        가구 이미지를</span>
          <br>
          <span style="position: relative; left:-205px;">선택해 주세요</span>
        </h1>
        <p class="guide-textcontent">{{ textContent }}</p>
        <router-link to="/" id="anlay-btn" style="position: relative; left:-180px;" class="btn btn-outline-success"><span class="font-analye_1">뒤로 가기</span></router-link>
        <button id="anlay-btn" class="btn btn-success" style="position: relative; top:230px; left:-145px; padding:20px;" @click="goToStep2" v-if="currentStep === 1"><span style="position: relative; top:-5px;">다음</span></button>
        <button id="anlay-btn" class="btn btn-success" style="position: relative; top:230px; left:-145px; padding:20px;" @click="goToStep3" v-if="currentStep === 2"><span style="position: relative; top:-5px;">다음</span></button>
        <button id="anlay-btn" class="btn btn-success" style="position: relative; top:230px; left:-145px; padding:20px;" @click="analyzeSelectedImages" v-if="currentStep === 3"><span style="position: relative; top:-5px;">분석하기</span></button>

      </div>

      <span style="position: relative; left: 680px; top:15px; font-weight: bolder; color: darkslategrey">{{ currentStep }}/3</span>
      <div class="right-section">
        <div class="step-counter">
          <div class="progress" :style="{width: progressWidth + '%'}"></div>
        </div>
        <div class="image-gallery">
          <div v-for="(image, index) in currentImages" :key="index" @click="selectImage(index)" :class="{'selected': isSelected(index)}">
            <img :src="image.src" alt="Interior Style" width="200px" height="180px">
          </div>
        </div>

        <div v-if="isLoading" class="loading-overlay">
          로딩 중...
        </div>
      </div>

      <modal v-if="showModal" @close="closeModal" class="modal-custom" style="color: #333333">
        <div class="modal-header">
        </div>
        <div class="modal-body">
          <div class="content-layout">
            <div class="text-section">
              <div class="home-style">
                <h6 style="position: relative; left:-260px; top:5px; font-size: 16px; color:black; font-family: MyCustomFont3">AnalysisResult</h6>
              </div>
              <div class="analysis-result">
               <strong style="font-size: 25px; color: black; position: relative; left:-202px; top:10px; text-align: left;">{{ analysisResult }}</strong>
              </div>
              <div class="analysis-items" style="padding-top: 20px;">
                <ul>
                  <li v-for="(item, index) in analysistext" :key="index" style="text-align:left; position:relative; list-style: none; left:19px;">-&nbsp;{{ item }}</li>
                </ul>
              </div>
              <div class="tips-section" style="border-top: 1px solid lightgrey; width: 91%; margin: auto; top:20px;">
                <ul>
                  <span style="font-size: 16px; position: relative; left:-290px; color:black; font-family: MyCustomFont3">Interior Tip</span>
                  <li v-for="(tips, index) in tip" :key="index" style=" text-align:left; position:relative; list-style: none; left:-12px;">-&nbsp;{{ tips }}</li>
                </ul>
              </div>
              <div class="color-section">
                <h3  style="font-size: 16px; position: relative; left:-269px; top:20px; color:black; font-family: MyCustomFont3 ">Mood Color</h3>
                <div class="recommended-colors" style="text-align:left; position: relative;  top:20px; left:22px;">
                  <img v-for="(color, index) in color" :key="index" :src="color" alt="추천 색상 이미지" class="recommended-color">
                </div>
              </div>
            </div>
            <div class="image-section">
              <h3 style="font-size: 16px; font-family: MyCustomFont3">홈 스타일</h3>
            <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
              <div class="carousel-inner">
                <div v-for="(image, index) in interiorImages" :key="index" :class="['carousel-item', { 'active': index === 0 }]">
                  <img :src="image" class="d-block w-100" alt="Interior Image" width="300px;" height="400px;">
                </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
            </div>
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
import {api} from "@/api/api";
import axios from "axios";

export default {
  components: {
    Modal
  },
  data() {
    return {
      isLoading: false,
      textContent: "원하는 인테리어 스타일 3가지를 선택하면 취향에 맞게 결과를 분석해드립니다.",
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
        { src: require('@/assets/interiorguide_image_list/color/Teal.png')},
        { src: require('@/assets/interiorguide_image_list/color/Brown.png')},
        { src: require('@/assets/interiorguide_image_list/color/Green.png')},
        { src: require('@/assets/interiorguide_image_list/color/Lavender blue.png')},
        { src: require('@/assets/interiorguide_image_list/color/Navy.png')},
        { src: require('@/assets/interiorguide_image_list/color/Netural.png')},
        { src: require('@/assets/interiorguide_image_list/color/Orange.png')},
        { src: require('@/assets/interiorguide_image_list/color/PurPle.png')},
        { src: require('@/assets/interiorguide_image_list/color/Red.png')},
        { src: require('@/assets/interiorguide_image_list/color/Blue.png')},
        { src: require('@/assets/interiorguide_image_list/color/Yellow.png')},
      ], thirdStepImages: [
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
      interiorImages:"",
      color:"",
      showModal: false,
      selectedImagesStep2: [],
      currentStep: 1,
      selectedImagesStep3: [],
      selectedImagesStep4: [],
      firstid:'1',
      secondid:'2',
      thirdid:'3',
      fourid:'4',
      fiveid:'5',
      styleToId: {
        'modern': '1',
        'natural': '2',
        'vintage': '3',
        'classic': '4',
        'simple': '5'
      },

    }
  },
  computed: {
    progressWidth() {
      return (this.currentStep / 3) * 100;
    },
    currentImages() {
      if (this.currentStep === 1) {
        return this.firstStepImages;
      } else if (this.currentStep === 2) {
        return this.secondStepImages;
      } else if (this.currentStep === 3) {
        return this.thirdStepImages; // 세 번째 단계 이미지를 반환하도록 추가
      }
    }
    },
  methods: {
    async test() {
      // 여러 ID를 배열로 관리
      const ids = [this.firstid, this.secondid, this.thirdid, this.fourid, this.fiveid];
      // 모든 ID에 대한 요청을 준비
      const requests = ids.map(id =>
          axios.get(`http://jerry6475.iptime.org:20000/api/interior/style/${encodeURIComponent(id)}`)
      );

      // 모든 요청을 동시에 실행하고, 모든 결과를 기다림
      try {
        const responses = await axios.all(requests);
        // 각 응답을 순회하며 처리
        responses.forEach(res => {
          this.about = res.data.about;
          this.tips = res.data.tips;
          this.color = res.data.color;
          // 서버 응답 로그
          console.log('Response data', res.data);
        });
      } catch (error) {
        console.error('Error data', error);
      }
    },

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
    goToStep3() {
      this.currentStep = 2;
      // 이전에 selectedImagesStep3를 초기화하는 코드를 삭제하거나 주석 처리합니다.
      // this.selectedImagesStep3 = [];
      this.selectedImagesStep3 = [];
      if (this.selectedImages.length === 3) {
        // 선택된 이미지가 3개일 경우, 다음 단계로 넘어감
        this.currentStep = 3;
        // 여기에 누락된 로직을 추가합니다: 두 번째 단계에서 선택된 이미지를 세 번째 단계의 선택 목록에 추가
        this.selectedImagesStep3 = [];
      } else {
        // 선택된 이미지가 3개가 아닐 경우, 사용자에게 경고 창 표시
        alert("3개의 인테리어 이미지를 선택해 주세요.");
      }
    },
    selectImage(index) {
      let targetArray;
      if (this.currentStep === 1) {
        targetArray = this.selectedImages;
      } else if (this.currentStep === 2) {
        targetArray = this.selectedImagesStep2;
      } else if (this.currentStep === 3) {
        targetArray = this.selectedImagesStep3; // 세 번째 단계에서도 선택된 이미지를 처리할 수 있도록 추가
      }
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
      let targetArray;
      if (this.currentStep === 1) {
        targetArray = this.selectedImages;
      } else if (this.currentStep === 2) {
        targetArray = this.selectedImagesStep2;
      } else if (this.currentStep === 3) {
        targetArray = this.selectedImagesStep3; // 세 번째 단계의 배열 사용
      }
      return targetArray.includes(index);
    },
    analyzeSelectedImages() {
      this.currentStep = 3;
      if (this.selectedImages.length === 3 && this.selectedImagesStep2.length === 3 && this.selectedImagesStep3.length === 3) {
        this.isLoading = true;

        // 로딩 함수
        setTimeout(async () => {

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
            '0': ['modern', 'simple', 'natural', 'classic'],
            '1': ['modern', 'natural', 'vintage'],
            '2': ['natural'],
            '3': ['natural'],
            '4': ['natural'],
            '5': ['natural'],
            '6': ['vintage'],
            '7': ['simple'],
            '8': ['vintage'],
            '9': ['simple'],
            '10': ['vintage'],
          };

          const imageStyles3 = {
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
          };

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

          this.selectedImagesStep2.forEach(imageId => {
            const styles = imageStyles3[imageId];
            if (styles) {
              styles.forEach(style => {
                if (!styleScores[style]) styleScores[style] = 0; // 이 줄은 사실상 필요 없으나, 다른 스타일이 추가될 경우를 대비해 둡니다.
                styleScores[style]++;
              });
            }
          });

          // 두 번째 단계 이미지 스타일 점수 합산
          this.selectedImagesStep3.forEach(imageId => {
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

          const styleId = this.styleToId[recommendedStyle];

          try {
            const response = await axios.get(`http://jerry6475.iptime.org:20000/api/interior/style/${encodeURIComponent(styleId)}`);
            this.analysisResult =response.data.style;
            this.analysistext = response.data.about;
            this.tip = response.data.tips;
            this.color = response.data.color.map(colorPath => `http://jerry6475.iptime.org:20000${colorPath}`);
            this.interiorImages = response.data.interiorImage.map(imagePath => `http://jerry6475.iptime.org:20000${imagePath}`);

            this.showModal = true;
          } catch (error) {
            console.error('Error fetching analysis data', error);
          } finally {
            this.isLoading = false;
          }
        }, 1000); // 이곳에 지연 시간(밀리초)을 입력해야 합니다.
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
  left:-100px;
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
  box-sizing: border-box; /* 테두리를 내부 크기에 포함 */
}

.selected {
  outline: 2px solid blue; /* 선택된 이미지를 파란색 테두리로 강조 */
  box-sizing: border-box; /* 테두리를 내부 크기에 포함 */
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

.font-analye_1{
  font-weight: bolder;
  position: relative;
  top:8px;
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


.modal-footer {
  text-align: center;
  padding: 20px;
  background: #f9f9f9;
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
.step-counter {
  width: 100%;
  background-color : darkslategrey;
  border-radius: 20px;
  position: relative;
  height: 16px;
  margin-bottom: 10px;
}

.progress {
  background-color: #4caf50;
  height: 100%;
  border-radius: 18px;
  transition: width 0.3s ease;
}
.recommended-images img, .recommended-colors img {
  width: 100px;
  height: 100px;
  margin: 5px;
}
.content-layout {
  display: flex;
  justify-content: space-between;
}

.text-section {
  width: 50%;
}

.image-section {
  width: 50%;
}

.recommended-image {
  display: block; /* 이미지를 블록 요소로 만듭니다. */
  max-width: 100%; /* 최대 너비를 100%로 설정하여 부모 요소를 꽉 채웁니다. */
  height: auto; /* 이미지의 높이를 자동으로 설정하여 비율을 유지합니다. */
}
.recommended-color {
  width: 50px;
  height: 50px;
  margin: 5px;
  border: 1px solid #ddd;
}
</style>
