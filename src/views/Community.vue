<template>
  <div class="community">
    <div class="community-title">
      <h2 class="community-first-title">.zip이 바꿀 인테리어</h2>
      <h5 class="community-second-title"><p>모두를 위한, 커뮤니티를 만들고자 합니다.</p></h5>
    </div>


    <template>
      <div class="community-body">
        <div class="GeneralBoard">
          <h4>일반 <p>게시판</p></h4>
          <router-link to="/GeneralBoard"><img src="@/assets/커뮤니티버튼.png" class="icon-image"></router-link>
        </div>
        <div class="usedBoard">
          <h4>공모전 <p>게시판</p></h4>
          <router-link to="/comMain"><img src="@/assets/커뮤니티버튼.png" class="icon-image"></router-link>
        </div>
        <div class="Interior">
          <h4>당신의 <br>인테리어를<br> 보여주세요</h4>
          <router-link to="/GeneralBoardWrite"><img src="@/assets/커뮤니티버튼.png" class="icon-image_second"></router-link>
        </div>
        <div class="Board">
          <h4>가구 및 스타일<br> 분석하기</h4>
          <router-link to="#"><img src="@/assets/커뮤니티버튼.png" class="icon-image_second"></router-link>
        </div>
      </div>
    </template>

  </div>
</template>
<script>
export default {

  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Community',
  components: {

  },
}
</script>

<style>
.GeneralBoard h4, .usedBoard h4, .Interior h4, .Board h4{
  position: relative;
  top:15px;
  font-weight: bolder;
  color:white;
  font-family: 'Georgia', Sans-serif;
  animation: fadeIn 4s;
  font-size: 30px;
}
@keyframes fadeIn {
  0% {opacity: 0;}
  100% {opacity: 1;}
}
.community-title
{
  margin: auto;
  width:100%;
  font-weight: bolder;
  position: relative;
  top:15px;
}

.community-first-title
{
  font-weight: bolder;
  padding:15px;
  color: black;
  animation: slides 4s;
  font-size: 33px;
  font-family: 'SOGANGUNIVERSITYTTF';
}
.community-second-title{
  padding:15px;
  animation: slides 6s;
  font-weight: bolder;
  color: #333;
  font-size: 25px;
  font-family: 'SOGANGUNIVERSITYTTF';
}


.community-line_bottom
{
  border-top: 1px solid lightsteelblue;
  position: relative;
  top:25px;
  width:51%;
  margin: auto;
}
@keyframes slides{
  from{
    position: relative;
    left:-300px;
    opacity: 0;
  }
  to{
    position: relative;
    left:0px;
    opacity: 1;
  }
}

.community-body
{
  width:90%;
  margin:auto;
  height:1000px;
}

.community
{
  height:1380px;
}

.GeneralBoard
{
  width:25%;
  height:450px;
  background-color: lightgray;
  display: inline-block;
  position: relative;
  left: -3%;
  border-radius: 10px;
  background-image: url("@/assets/asd.jpg");
  background-size: cover;
}

.GeneralBoard h4
{
  position: relative;

  top:80px;
  font-size: 45px;
}
.usedBoard
{
  float:right;
  width:25%;
  height:450px;
  background-color: lightgray;
  display: inline-block;
  position: relative;
  left: -21.5%;
  border-radius: 10px;
  background-image: url("@/assets/asd1.png");
  background-size: cover;
}

.usedBoard h4
{
  position: relative;

  top:80px;
  font-size: 45px;
}

.Interior
{
  width:25%;
  height:450px;
  background-color: lightgray;
  position: relative;
  left: 22%;
  border-radius: 10px;
  top:50px;
  background-image: url("@/assets/asd2.png");
  background-size: cover;
}
.Interior h4
{
  position: relative;
  top:35px;
  font-size: 45px;
}
.Board
{
  float: right;
  width:25%;
  height:450px;
  background-color: lightgray;
  position: relative;
  top:-400px;
  left:-21.5%;
  border-radius: 10px;
  background-image: url("@/assets/asd3.jpg");
  background-size: cover;
}
.Board h4
{
  position: relative;
  top:35px;
  font-size: 45px;
}
.icon-image
{
  transform: rotate(180deg); /* 90도 회전 */
  /* 애니메이션 효과를 적용하고 싶다면 transition 속성을 사용합니다. */
  transition: transform 0.5s ease-in-out;
  width:50px;
  height:50px;
  position: relative;
  top:58%;

}
.icon-image_second
{
  transform: rotate(180deg); /* 90도 회전 */
  /* 애니메이션 효과를 적용하고 싶다면 transition 속성을 사용합니다. */
  transition: transform 0.5s ease-in-out;
  width:50px;
  height:50px;
  position: relative;
  top:48%;

}
/* :hover 선택자를 이용하여 마우스 오버 시 회전하게 할 수도 있습니다. */
.icon-image:hover
{
  transform: rotate(90deg); /* 180도 회전 */
}
.icon-image_second:hover{
  transform: rotate(90deg); /* 180도 회전 */
}
</style>