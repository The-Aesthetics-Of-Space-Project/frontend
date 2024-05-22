<template>
  <div class="objectrecognition">
    <div class="objectrecognition-container">
      <div class="left-column">
        <img src="YourImage.jpg" alt="Your Image" class="rounded-image">
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
export default {
  name: 'objectrecognition'
}
</script>

<style>
.objectrecognition {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0; /* 상하 패딩 추가 */
}

.objectrecognition-container {
  display: flex;
  width: 60%;
  background-color: white;
  box-shadow: 0 4px 8px rgba(50, 100, 100, 0.3); /* 그림자 추가 */
  border-radius: 16px; /* 테두리 둥글게 */
  overflow: hidden; /* 내용이 테두리를 넘지 않도록 */
  height: 800px;
}

.left-column {
  flex: 1;
  padding: 20px;
}

.rounded-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.right-column {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff; /* 배경색 변경 */
}

.header-text, .style-name, .confirmation-text {
  color: #333;
  text-align: center;
  position: relative;
  top:-200px;
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
</style>
