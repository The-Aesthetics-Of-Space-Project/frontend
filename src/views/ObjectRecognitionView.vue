<template>
  <div class="objectrecognition">
    <div class="objectrecognition-container">
      <div class="left-column">
        <div>
          <form id="imageUploadForm" @submit.prevent="uploadImage" enctype="multipart/form-data">
            <input type="file" id="imageInput" name="file" accept="image/*" required @change="handleFileChange">
            <button type="submit" @click='uploadImage'>이미지 업로드</button>
          </form>

          <div id="imageUploadStatus">
            <p v-if="uploadSuccess">이미지 업로드 성공!</p>
            <p v-if="uploadError">이미지 업로드 실패: {{ uploadErrorMessage }}</p>
          </div>

          <div v-if="imagePreview">
            <img :src="imagePreview" class="rounded-image" alt="Uploaded Image">
          </div>
        </div>
      </div>

      <div class="right-column">
        <span class="header-text">당신의 인테리어 스타일은</span>
        <span class="style-name">머시깽이</span>
        <span class="confirmation-text">이네요 !</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'objectrecognition',

  data() {
    return {
      image: null,
      imagePreview: null,
      uploadSuccess: false,
      uploadError: false,
      uploadErrorMessage: ''
    }
  },
  methods: {
    handleFileChange(event) {
      this.image = event.target.files[0];
      this.imagePreview = URL.createObjectURL(this.image);
    },
    uploadImage() {
      const formData = new FormData()
      formData.append('file', this.image)

      axios.post('http://jerry6475.iptime.org:20000/detectedImage', formData)
          .then(res => {
            console.log("res 이미지 파일 전송후 :", res)
            this.uploadSuccess = true
            this.uploadError = false
          })
          .catch(error => {
            console.error("이미지 업로드 실패:", error)
            this.uploadSuccess = false
            this.uploadError = true
            this.uploadErrorMessage = error.message
          })
    }
  }
}
</script>

<style>
.objectrecognition {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0; /* 상하 패딩 추가 */
  background-color: #f5f5f5; /* 배경색 변경 */
}
#imageUploadForm{
  position: relative;
  top:-10px;
}
.objectrecognition-container {
  display: flex;
  width: 60%;
  background-color: white;
  box-shadow: 0 4px 8px rgba(50, 100, 100, 0.3); /* 그림자 추가 */
  border-radius: 16px; /* 테두리 둥글게 */
  overflow: hidden; /* 내용이 테두리를 넘지 않도록 */
  height: 780px; /* 높이 조정 */
}

.left-column {
  flex: 1;
  padding: 30px; /* 패딩 조정 */
}

.rounded-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.right-column {
  flex: 1;
  padding: 30px; /* 패딩 조정 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff; /* 배경색 변경 */
}

.header-text, .style-name, .confirmation-text {
  color: #333;
  text-align: center;
}

.header-text {
  font-size: 22px;
  margin-bottom: 15px;
  font-weight: 500; /* 글꼴 무게 조정 */
}

.style-name {
  font-size: 28px;
  font-weight: bold;
  color: #4A90E2; /* 스타일 이름 색상 변경 */
  margin-bottom: 10px;
}

.confirmation-text {
  font-size: 22px;
  font-weight: 400;
}

/* 각각의 줄 간격 조정 */
.right-column span {
  margin-bottom: 10px; /* 줄 간격 조정 */
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .objectrecognition-container {
    width: 90%;
    height: auto;
    flex-direction: column;
  }

  .left-column,
  .right-column {
    flex: auto;
    padding: 20px;
  }
}
</style>
