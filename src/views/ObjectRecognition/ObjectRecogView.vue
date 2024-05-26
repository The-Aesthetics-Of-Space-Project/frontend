<template>
  <div class="container">
    <div class="content-box">
      <div class="row">
        <span class="badge">AI 인테리어 분석</span>
        <h2 class="whitespace-pre-line h2">
          내 방으로 알아보는<br>나의 인테리어 취향
        </h2>
        <p style="margin-top: 30px">
          사진만 업로드하면 취향에 꼭 맞는 인테리어 스타일과 어울리는<br>다양한 가구들을 추천해 드려요.
          <br><br>
          당신만의 공간을 더욱 특별하고 아름답게 꾸밀 수 있도록 도와줄게요!
        </p>
      </div>

      <div class="steps">
        <div class="step">
          <img src="@/assets/objectrecognition_image_list/ic_search.png" alt="Step 1">
          <div>
            <strong>01</strong> 사진 분석
          </div>
        </div>
        <div class="step">
          <img src="@/assets/objectrecognition_image_list/ic_analyze.png" alt="Step 2">
          <div>
            <strong>02</strong> 가구, 색상 추출
          </div>
        </div>
        <div class="step">
          <img src="@/assets/objectrecognition_image_list/ic_light.png" alt="Step 3">
          <div>
            <strong>03</strong> 스타일 추천
          </div>
        </div>
        <div class="step">
          <img src="@/assets/objectrecognition_image_list/ic_cards.png" alt="Step 4">
          <div>
            <strong>04</strong> 분석 완료
          </div>
        </div>
      </div>
    </div>

    <!-- 사진 업로드 영역 -->
    <div class="upload-box">
      <div class="upload-placeholder">
        <img v-if="!uploadedImage" src="@/assets/common/ic_camera.png" width="24px" alt="Upload">
        <img v-else :src="uploadedImage" alt="Uploaded Image" style="width: 100%; height: 100%; object-fit: cover;">

        <p v-if="!uploadedImage" id="upload-title">사진을 첨부해주세요</p>
        <p v-if="!uploadedImage" id="upload-sub">인테리어 스타일을 분석해드려요</p>

        <input type="file" @change="handleFileUpload" ref="fileInput" style="display: none;">

        <div class="button-container">
          <button @click="triggerFileInput">PC에서 불러오기</button>
          <button v-if="uploadedImage" @click="submitToServer">업로드</button>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="loading-overlay">
      이미지를 분석 중입니다...
    </div>

    <!-- 이미지 분석 결과 Modal -->
    <div class="modal-wrap" v-show="isModalOpened">
      <div class="result-modal-container">
        <!-- 모달 헤더 -->
        <div class="row modal-header">
          <div class="d-flex" style="justify-content: space-between">
            <p id="modal-header-date" class="text-start">{{ currentDate }}</p>
            <button type="button" class="btn-close" aria-label="Close" @click="modalOpen"></button>
          </div>
          <p id="modal-header-title" class="text-start"> {{ $store.state.nickname }} 님의 인테리어 스타일 분석 결과</p>
        </div>

        <div class="row modal-body">
          <div class="col-auto">
            <img id="style-analyze-main-image" class="rounded-image-32" :src="uploadedImage" alt="Uploaded Image"
                 style="width: 360px; object-fit: cover;"/>
          </div>

          <div class="col">
            <div class="d-flex flex-column align-items-start">
              <p class="style-result-title">나의 인테리어 취향은</p>
              <p class="badge-purple">{{ maxMood }}</p>

              <p class="style-result-title" style="margin-top: 28px;">내가 가장 관심있는 가구는</p>
              <p class="badge-green">{{ mostDetectedObject }}</p>

              <p class="style-result-title" style="margin-top: 28px;">이런 가구는 어떤가요?</p>
              <p style="text-align: start; font-size: 14px">
                회원님의 방과 어울릴만한 스타일의 가구를 가져왔어요<br>사진을 클릭하면 제품 상세페이지로 이동됩니다.
              </p>

              <div class="d-flex flex-wrap">
                <div v-for="(image, index) in imageUrls" :key="index" class="p-2">
                  <img :src="image" width="100px" class="rounded-image-4" alt="Uploaded Image"
                       @click="redirectToUrl(index)">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import axios from "axios";
import {getCurrentDate} from "@/api/util";

const fileInput = ref(null);
const uploadedImage = ref(null);
const selectedFile = ref(null);
const isLoading = ref(false);
const currentDate = ref(getCurrentDate());

// Variables to store API response
const mostDetectedObject = ref("");
const maxMood = ref("");
const imageUrls = ref([]);
const productUrls = ref([]);

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const submitToServer = async () => {
  if (!selectedFile.value) {
    alert('이미지를 먼저 업로드해주세요!');
    return;
  }

  const formData = new FormData();
  formData.append('file', selectedFile.value);
  isLoading.value = true;  // Show loading screen

  try {
    const response = await axios.post(
        `http://jerry6475.iptime.org:20000/detectedImage`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
    )

    const data = response.data;
    mostDetectedObject.value = data.most_detected_object;
    maxMood.value = data.max_mood;
    imageUrls.value = data.image.map(imagePath => `http://jerry6475.iptime.org:20000${imagePath}`);
    productUrls.value = data.urls;

    modalOpen();
  } catch (error) {
    console.error('Error uploading the image:', error);
    alert('이미지 업로드 중 오류가 발생했습니다.');
  } finally {
    isLoading.value = false;
  }
};

const redirectToUrl = (index) => {
  const url = productUrls.value[index];
  if (url) {
    window.open(url, '_blank');
  }
}

// Modal toggle function
const isModalOpened = ref(false);
const modalOpen = () => {
  isModalOpened.value = !isModalOpened.value;
};

</script>

<style scoped>

.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: auto;
  font-family: inherit;
}

.content-box {
  padding: 20px;
  width: 50%;
  box-sizing: border-box;
  text-align: left;
  align-items: flex-start;
}

.row .badge {
  display: inline-block;
  margin-left: 10px;
  background-color: #F8FFF5;
  color: #32C000;
  padding: 5px 10px;
  border-radius: 8px;
  font-size: 16px;
  width: auto;
  border: 1px solid #D9FFCC;
}

.row h1 {
  font-size: 24px;
  margin: 10px 0;
}

.row h2 {
  margin-top: 30px;
  font-weight: bold;
  font-size: 36px;
}

.row p {
  font-size: 16px;
  color: #525463;
}

#upload-title {
  font-size: 16px;
  font-weight: bold;
}

#upload-sub {
  margin-top: -0.5rem;
}

.steps {
  margin-top: 50px;
  display: flex;
  justify-content: flex-start;
  gap: 3rem;
}

.step {
  text-align: center;
}

.step img {
  display: block;
  margin: 0 auto 10px;
  width: 64px;
  height: 64px;
}

.step div {
  font-size: 14px;
  color: #333;
}

.upload-box {
  border: 1px solid #f0f0f0;
  background-color: #f9f9f9;
  aspect-ratio: 1 / 1;
  padding: 20px;
  width: 30%;
  box-sizing: border-box;
  margin-left: 20px;
  display: flex;
  text-align: center;
  align-self: center;
  justify-content: center;
  align-items: center;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.upload-placeholder img {
  margin-bottom: 10px;
}

.upload-placeholder p {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.upload-placeholder button {
  margin-top: 1rem;
  background-color: #207b00;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.upload-placeholder button:hover {
  background-color: #165700;
}

.button-container {
  display: flex;
  gap: 0.5rem;
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
  margin-right: 1rem;
}

/* dimmed */
.modal-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}

/* modal or popup */
.result-modal-container {
  width: max-content;
  position: absolute; /* 절대 위치로 설정 */
  top: 50%; /* 수직 중앙 정렬 */
  left: 50%; /* 수평 중앙 정렬 */
  transform: translate(-50%, -50%); /* 중앙으로 변환 */
  background: #fff;
  border-radius: 32px;
  box-sizing: border-box;
}

.modal-header {
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  padding: 28px;
  margin: 0;
  background: #F7F7FA;
}

#modal-header-date {
  margin: 0;
  font-weight: normal;
  font-size: 16px;
  color: #525463;
}

#modal-header-title {
  margin: 0;
  font-weight: bold;
  font-size: 28px;
  color: #2B2D36;
}

.modal-body {
  padding: 28px;
}

.rounded-image-32 {
  border-radius: 32px;
}

.rounded-image-4 {
  border-radius: 4px;
}

#style-analyze-main-image {
  aspect-ratio: 1 / 1.16;
}

.modal-body .style-result-title {
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 20px;
  color: #2B2D36;
}

/* badge 공통 속성 */
.modal-body [class*="badge"] {
  display: inline-block;
  width: auto;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  margin: 0;
  padding: 5px 10px;
}

.modal-body .badge-purple {
  background-color: #F6F5FE;
  color: #6356F8;
  border: 1px solid #C9C4FC;
}

.modal-body .badge-green {
  background-color: #F3FBFC;
  color: #217E8C;
  border: 1px solid #A6E3ED;
}
</style>
