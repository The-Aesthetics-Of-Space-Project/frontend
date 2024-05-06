<!-- InteriorGuide.vue -->
<template>
  <div class="container">
    <div class="left-section">
      <h1 class="font-h1"><span style="position: relative; left:-80px;">마음에 드는</span><br><span style="position: relative; left:-25px; color:darkgreen">
        인테리어 이미지를</span> <br>
        <span style="position: relative; left:-60px;">선택해 주세요.</span></h1>
      <p class="guide-textcontent">{{ textContent }}</p>
    </div>
    <div class="right-section">
      <div class="image-gallery">
        <div class="image-container" v-for="(image, index) in images" :key="index">
          <img :src="image.src" :alt="image.alt" @click="selectImage(index)" :class="{ 'selected': selectedImages.includes(index) }">
        </div>
      </div>
      <button @click="analyzeSelectedImages" :disabled="selectedImages.length !== 3">Analyze</button>
    </div>
    <modal v-if="showModal" @close="closeModal">
      <h2>Preference Analysis</h2>
      <p>{{ analysisResult }}</p>
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
      textContent: "This is the text content for the interior design guide.",
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
      const selectedCombination = this.selectedImages.sort().join(',');
      switch(selectedCombination) {
        case '0,1,11': // 이미지 1, 2, 12를 선택한 경우
          this.analysisResult = "귀하의 선택에 기반하여, 우리는 '모던 스타일' 인테리어를 추천합니다...";
          break;
        case '2,4,11': // 이미지 3, 5, 12를 선택한 경우
          this.analysisResult = "귀하의 선택에 기반하여, 우리는 '미니멀리스트 스타일' 인테리어를 추천합니다...";
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
}
.guide-textcontent{
  position: relative;
  top:200px;
  left:-10px;
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
}

.analysis-section {
  margin-top: 20px;
  padding: 20px;
  background-color: #f5f5f5;
}
</style>
