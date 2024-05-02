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
        { src: 'image1.jpg', alt: 'Image 1' },
        { src: 'image2.jpg', alt: 'Image 2' },
        { src: 'image3.jpg', alt: 'Image 3' },
        { src: 'image4.jpg', alt: 'Image 4' },
        { src: 'image5.jpg', alt: 'Image 5' },
        { src: 'image6.jpg', alt: 'Image 6' },
        { src: 'image7.jpg', alt: 'Image 7' },
        { src: 'image8.jpg', alt: 'Image 8' },
        { src: 'image9.jpg', alt: 'Image 9' },
        { src: 'image10.jpg', alt: 'Image 10' },
        { src: 'image11.jpg', alt: 'Image 11' },
        { src: 'image12.jpg', alt: 'Image 12' }
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
      // Perform analysis on the selected images
      this.analysisResult = "Based on your selections, we recommend the following interior design style..."
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
  height:600px;
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
