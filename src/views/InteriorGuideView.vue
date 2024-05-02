<!-- InteriorGuide.vue -->
<template>
  <div class="container">
    <div class="left-section">
      <h1>Interior Design Guide</h1>
      <p>{{ textContent }}</p>
    </div>
    <div class="right-section">
      <div class="image-gallery">
        <div class="image-container" v-for="(image, index) in images" :key="index">
          <img :src="image.src" :alt="image.alt" @click="selectImage(index)" :class="{ 'selected': selectedImages.includes(index) }">
        </div>
      </div>
      <button @click="analyzeSelectedImages" :disabled="selectedImages.length !== 3">Analyze</button>
    </div>
    <div class="analysis-section" v-if="showAnalysis">
      <h2>Preference Analysis</h2>
      <p>{{ analysisResult }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textContent: "This is the text content for the interior design guide.",
      images: [
        { src: 'image1.jpg', alt: 'Image 1' },
        { src: 'image2.jpg', alt: 'Image 2' },
        { src: 'image3.jpg', alt: 'Image 3' },
        // Add more images here
      ],
      selectedImages: [],
      showAnalysis: false,
      analysisResult: ""
    }
  },
  methods: {
    selectImage(index) {
      if (this.selectedImages.length < 3) {
        this.selectedImages.push(index);
      } else {
        this.selectedImages.splice(0, 1, index);
      }
    },
    analyzeSelectedImages() {
      // Perform analysis on the selected images
      this.analysisResult = "Based on your selections, we recommend the following interior design style...";
      this.showAnalysis = true;
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
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
