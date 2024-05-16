<template>
<div id="competitionMain">
  <!-- 배너 이미지 -->
  <div class="banner-containers">
    <section class="banner-wrappers">
      <section class="banner-img-container">
          <img src="../../assets/contest_img/InteriorContest.png" style="width: 70%; height: auto;"/>
      </section>

      <!-- 글 쓰러가기 버튼(화살표) -->
      <section class="banner-arrow-container">
        <router-link to="/comWrite">
        <button type="button" class="banner-img-button">
        <img src="../../assets/contest_img/BlackArrow.png" style="position: relative; width: 100%; height: 120px;"/>
        </button>
        </router-link>
      </section>
      <section class="context"> 디자인하러 가기 </section>
    </section>
  </div>

  <!-- 공유 버튼 -->
  <div class="btn-container">
    <section class="btn-wrapper">
      <button type="button" class="copy-btn" @click="copyUrl">
        <img src="../../assets/contest_img/shareIcon.png" style="position: relative; width: 85px; height: 75px; top: -3px; right: 7px;"/>
      </button>
    </section>
  </div>

</div>
</template>

<script>
export default {
  name: 'competitionMain',
  data(){
    return{

    }

  },
  methods: {
    copyUrl(){
      const pageUrl = window.location.href; // 현재 페이지의 URL
      navigator.clipboard.writeText(pageUrl).then(() => {
        alert("클립보드에 복사되었습니다.");
      }).catch(err => {
        alert("URL 복사에 실패했습니다. 브라우저가 클립보드 복사를 지원하지 않습니다.");
        console.error("Could not copy text: ", err);
      });
    }
  }
}
</script>



<style>
#competitionMain{
  font-family: Inter;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: relative;
  width: 100%;
  height: 1080px;
  margin: 0;
}
.banner-containers{
  position: relative;
  width: 65%;
  height: 70%;
  top: 60px;
  margin: auto;
  box-shadow: none;
}
.banner-wrappers{
  position: relative;
  width: 100%;
  height: 80%;
  margin: auto;
}
.banner-img-container{
  position: relative;
  width: 80%;
  height: 100%;
  margin: auto;
}
.context{
  position: relative;
  width: 14%;
  height: 30px;
  top: 145px;
  left: 60%;
  color: rgb(0,0,0,70%);
  font-size: 16px;
  font-weight: 560;
  boder: 1px solid #8D8D8D;
}
.banner-img-button{
  position: relative;
  top: 10px;
  left: -30px;
  width: 200px;
  height: 110px;
  border: none;
  border-radius: 30px;
}
.banner-arrow-container{
  position: relative;
  top: 100px;
  left: 210px;
  width: 23%;
  height: 15%;
  margin: auto;
}
.btn-container{
  position: relative;
  width: 15%;
  height: 10%;
  left: 980px;
  top: -690px;
  align-items: center;
}
.btn-wrapper{
  position: relative;
  width: 90%;
  height: 90%;
  top: 10px;
}
.copy-btn{
  position: relative;
  width: 38%;
  height: 76px;
  margin: auto;
  border-radius: 50%;
  border: none;
}


</style>