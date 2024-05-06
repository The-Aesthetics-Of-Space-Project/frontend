<!-- InteriorGuide.vue -->
<template>
  <div class="container">
    <div class="left-section">
      <h1 class="font-h1"><span style="position: relative; left:-80px;">마음에 드는</span><br><span style="position: relative; left:-25px; color:darkgreen">
        인테리어 이미지를</span> <br>
        <span style="position: relative; left:-65px;">선택해 주세요</span></h1>
      <p class="guide-textcontent">{{ textContent }}</p>
      <button class="btn btn-success" @click="analyzeSelectedImages" :disabled="selectedImages.length !== 3"><span class="font-analye">분석 결과</span></button>
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
      const selectedCombination = this.selectedImages.sort((a, b) => a - b).join(',');
      switch(selectedCombination) {
        case '2,5,10':
        case '2,5,14':
        case '2,10,14':
        case '6,10,14':
          this.analysisResult = " 귀하의 선택에 기반하여, 🌙'모던 스타일'🌙 인테리어를 추천 ";
          this.analysistext = "메탈, 대리석 소재를 지나치게 사용하면 차가운느낌이 너무 강해질수 있다. 그럴 때는 러그, 화분, 따듯한 느낌의 조명등을 이용하여 차가운 느낌을 중화시키면서 간결하고 깔끔하게 연출할 수 있다.\n" +
              "단색, 모노톤의 심플한 너무 화려하지 않은디자인의 액자를 배치하여 세련된 감각을 줄 수 있다.";
          this.tip = "✔ 메탈, 대리석 소재를 지나치게 사용하면 차가운 느낌이 들 수 있다.";
            this.tip_second = "✔ 러그, 화분, 따듯한 느낌의 조명등을 이용하여 중화를 시키는 방법 !";
          this.color = "🟫⬜⬛";
          break;
        case '2,4,11': // 이미지 3, 5, 12를 선택한 경우
          this.analysisResult = "귀하의 선택에 기반하여, 🌙'미니멀리스트 스타일'🌙 인테리어를 추천 ";
          break;
          // 다른 조합에 대한 분석 결과 추가 가능
        default:
          this.analysisResult = "분석 가능한 선택이 아닙니다. 다른 이미지를 선택해 주세요.";
          break;
      }
      // Perform analysis on the selected images
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
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

button {
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
