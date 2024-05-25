<template>
  <div class="objectrecognition">
    <div class="objectrecognition-container">
      <div class="left-column">
        <span style="font-family: MyCustomFont2; font-size: 20px;">이미지 업로드</span>
        <div style="font-size: 14px;">사진 업로드시, 취향에 맞는 스타일을 분석해드립니다.</div>
        <div>
          <form id="imageUploadForm" @submit.prevent="uploadImage" enctype="multipart/form-data">
            <input type="file" id="imageInput" name="file" accept="image/*" required @change="handleFileChange">
            <button id="image-upload-but" type="submit" @click='uploadImage'><img src="@/assets/image_upload.png" width="55px" height="55px"></button>
          </form>

          <div v-if="imagePreview">
            <img :src="imagePreview" id="rounded-image" alt="Uploaded Image">
          </div>
        </div>

        <div id="imageUploadStatus">
          <p v-if="uploadSuccess">이미지 업로드 성공!</p>
          <p v-if="uploadError">이미지 업로드 실패: {{ uploadErrorMessage }}</p>
        </div>
      </div>

      <div v-if="isLoading" class="loading-overlay">
        로딩 중...
      </div>


      <div class="right-column">
        <div v-if="uploadSuccess">
          <span style="font-size: 22px;position: relative;left: -140px; top:-90px;">귀하의</span>
          <br>
        <span class="header-text">인테리어 스타일은</span>
        <br>
        <span class="style-name">{{mood}}</span>
        <span class="confirmation-text">이네요 !</span>
        </div>
        <div class="image-section"  v-if="uploadedImages.length" style="position: relative; top:20px;">
          <h3 style="position: relative; left:-210px; top:30px; font-size: 20px;">관련 스타일</h3>
          <div  id="upload-success-list">
            <!-- 여기에 class="image-list"를 추가합니다 -->
            <span class="image-list" v-for="(image, index) in uploadedImages" :key="index">
              <img :src="image" class="rounded-image" alt="Uploaded Image" id="img-success">
            </span>
          </div>
        </div>


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
      uploadErrorMessage: '',
      uploadedImages: "", // 빈 배열로 초기화
      isLoading: false, // 로딩 상태 추가
      mood:'',
    }
  },
  methods: {
    handleFileChange(event) {
      this.image = event.target.files[0];
      this.imagePreview = URL.createObjectURL(this.image);
    },
    uploadImage() {
      this.isLoading = true; // 이미지 업로드 시작 시 로딩 상태
      const formData = new FormData()
      formData.append('file', this.image)

      axios.post('http://jerry6475.iptime.org:20000/detectedImage', formData)
          .then(res => {
            console.log("res 이미지 파일 전송후 :", res)
            this.mood = res.data.max_mood;
            this.uploadSuccess = true
            this.uploadError = false
            this.uploadedImages = res.data.image.map(imagePath => `http://jerry6475.iptime.org:20000${imagePath}`);
           // console.log("Uploaded Images:", this.uploadedImages); // 디버깅 로그 추가
            this.isLoading = false; // 이미지 업로드 성공 시 로딩 상태를 false로 설정
          })
          .catch(error => {
            console.error("이미지 업로드 실패:", error)
            this.uploadSuccess = false
            this.uploadError = true
            this.uploadErrorMessage = error.message
            this.isLoading = false; // 이미지 업로드 실패 시 로딩 상태를 false로 설정
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

#imageUploadForm {
  position: relative;
  top: 450px;
}

.objectrecognition-container {
  display: flex;
  width:75%;
  background-color: white;
  box-shadow: 0 4px 8px rgba(50, 100, 100, 0.3); /* 그림자 추가 */
  border-radius: 16px; /* 테두리 둥글게 */
  overflow: hidden; /* 내용이 테두리를 넘지 않도록 */
  height: 780px; /* 높이 조정 */
}

.left-column {
  flex: 1;
  padding: 30px; /* 패딩 조정 */
  width: 70%;
  height: 600px;
  background-color: white;
  position: relative;
  top:70px;
  left:30px;
  border-radius: 16px; /* 테두리 둥글게 */
  box-shadow: 0 4px 8px rgba(50, 100, 100, 0.3); /* 그림자 추가 */
}

#rounded-image {
  width: 330px;
  height: 330px;
  border-radius: 4px;
  position: relative;
  top:-30px;
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

.header-text {
  color: #333;
  text-align: center;
  position: relative;
  left:-40px;
  top:-70px;
}

.style-name{
  position: relative;
  top:-40px;
  left:20px;
}
 .confirmation-text{
position: relative;
  top:-40px;
  left:30px;
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
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
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

#img-success{
  width: 130px;
  height: 130px;
}
.image-list {
  display: flex; /* Flexbox를 사용하여 아이템들을 가로로 나열합니다 */
  flex-wrap: wrap; /* 내용이 넘치면 다음 줄로 이동합니다 */
  gap: 10px; /* 이미지 사이의 간격을 설정합니다 */
}

.rounded-image {
  width: 130px; /* 이미지의 너비를 설정합니다 */
  height: 130px; /* 이미지의 높이를 설정합니다 */
  object-fit: cover; /* 이미지 비율을 유지하면서 요소에 맞게 조정합니다 */
  border-radius: 50%; /* 이미지를 원형으로 만듭니다 */
  position: relative;
  top:50px;
}
#image-upload-but{
  background-color: white;
  border: white;
}
#upload-success-list{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
