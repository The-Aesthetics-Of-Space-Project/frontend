<template>
  <div class="guideandtips">
    <div class="main-title">
      <div class="jumbotron">
        <h1 id="guideandtips-title" class="text-center">Guide & Tips</h1>
        <p id="title-content" class="text-center">인테리어 가이드와 다양한 정보를 얻어가세요.</p>
      </div>
    </div>

    <div class="card-list-main">
      <div class="tips-title">
      <span class="guide-title">
      초보자를 위한 가이드
      </span>
      </div>

      <div class="card-view">
        <div class="card-list">
          <div class="card" v-for="(card, index) in cards" :key="index">
            <div class="card-body">
              <!--<h5 class="card-title">{{ card.title }}</h5>-->
              <!-- <p class="card-text">{{ card.text }}</p>-->
              <a href="#" class="btn btn-outline-primary" style="position: relative; top: 83%;">이동하기</a>
              <p class="card-sentence">{{ card.sentences }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="card-view" id="second-line-card-view">
        <div class="card-list">
          <div class="card" v-for="(card, index) in cards" :key="index">
            <div class="card-body">
              <!--<h5 class="card-title">{{ card.title }}</h5>-->
              <!-- <p class="card-text">{{ card.text }}</p>-->
              <a href="#" class="btn btn-outline-primary" style="position: relative; top: 83%;">이동하기</a>
              <p class="card-sentence" >{{ card.sentences_second }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="card-view" id="third-line-card-view">
        <div class="card-list">
          <div class="card" v-for="(card, index) in cards" :key="index">
            <div class="card-body">
              <!--<h5 class="card-title">{{ card.title }}</h5>-->
              <!-- <p class="card-text">{{ card.text }}</p>-->
              <a href="#" class="btn btn-outline-primary" style="position: relative; top: 83%;">이동하기</a>
              <p class="card-sentence" >{{ card.sentences_third }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="see-more-button">
        <button id="see-more" class="btn btn-success btn-lg">더 보기</button>
      </div>
    </div>

  </div>
</template>
<script>
export default
{
// eslint-disable-next-line vue/multi-word-component-names
  name: 'GuideAndTips',
  data(){
    return {

      cards: [
        {sentences: '우리집을 화사하게 바꿔줄 수 있는 조명',sentences_second: '나홀로 크리스마스 인테리어 준비하기',sentences_third:'반려동물과 함께 할 수 있는 소파 선택'},
        {sentences: '나에게 맞는 러그 선택 방법', sentences_second: '소파 뒤 남는 공간을 효율적으로',sentences_third:'플랜테리어 추천 식물'},
        {sentences: '초보자를 위한 인테리어 준비물', sentences_second: '침실 필수품, 침대 옆 협탁 고르기',sentences_third:'소파 집중 탐구, 소재 고르기'},
        {sentences: '포인트가 되어줄 다양한 타일 스타일', sentences_second: '인테리어 공사 진행 순서',sentences_third:'나만의 취향으로 거울 꾸미기'},
      ],
    }
  }
}

</script>
<style>

.GuideAndTips
{
  width:100%;
  height:1530px;
}

.main-title
{
  width:100%;
  height:330px;
  background-color: #F7D358;
  position: relative;
}
.card-list-main{
  width: 100%;
  margin: auto;
}
.first-card-list{
  width: 100%;
  margin: auto;
}
.card-sentence{
  position: relative;
  top: 183px;
  left:-9%;
}
#guideandtips-title
{
  position: relative;
  top:80px;
  font-size: 80px;
  font-family: 'MyCustomFont', sans-serif;
  color:white;
  margin: auto;
}

#title-content
{
  position: relative;
  top:100px;
  font-size: 30px;
  font-weight: bolder;
  font-family: 'MyCustomFont', sans-serif;
  color:white;
  width:100%;
  float: left;
}

@font-face
{
  font-family: 'MyCustomFont'; /* 폰트에 대한 이름을 정의합니다 */
  src:url('@/fonts/Poly-Italic.ttf') format('truetype'), /* WOFF 형식 */
  url('@/fonts/Poly-Regular.ttf') format('truetype'); /* TTF 형식 */
  font-weight: normal; /* 폰트 굵기 */
  font-style: normal; /* 폰트 스타일 */
}

.tips-title
{
  padding:20px;
  width:100%;

}
.guide-title {
  margin: auto;
  text-align: center;
  font-size: 24px;
  font-weight: bolder;
  position: relative;
  left:-32%;
}
#second-line-card-view
{
  position: relative;
  top:100px;
}

#third-line-card-view
{
  position: relative;
  top:150px;
}

.see-more-button{
  position: relative;
  top:250px;
}
#see-more
{
  width: 150px;
  height:70px;
  font-weight: bolder;
  font-size: 22px;
  background-color:#0B6121;
}
</style>
