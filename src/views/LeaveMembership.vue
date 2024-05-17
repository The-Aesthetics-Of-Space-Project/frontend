<template>
  <div id="leave">
    <div class="leave-container">
        <section class="leave-content-wrapper">
          <a>
            탈퇴 후 아이디 <span style="color: #80C85F"> xxx@ooo.com </span> 으로 재가입 시 일주일의 시간이 걸리며<br>
            해당 아이디로 작성한 데이터는 복구할 수 없습니다.<br>
            작성한 게시물은 탈퇴 후 삭제할 수 없습니다.<br>
          </a>
        </section>
        <section class="agree-container">
          <div class="agree-wrapper form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
              안내 사항을 확인하였으며, 이에 동의합니다.
            </label>
          </div>
        </section>

        <section class="agree-btn-wrapper">
          <button type="button" class="btn-agree" id="agreeButton"> 확인 </button>
        </section>

    </div>


  </div>
</template>

<script setup>

</script>

<style scoped>
#leave {
  font-family: Inter;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  position: relative;
  width: 100%;
  height: 528px;
  margin: 0;
  align-content: center;
}
.leave-container{
  position: relative;
  width: 100%;
  height: 100%;
}
.leave-content-wrapper{
  position: relative;
  width: 45%;
  height: 25%;
  top: 120px;
  margin: auto;
  font-weight: 550;
  color: #B1B3B9;
  text-decoration: none;
  font-size: 24px;
}
.agree-container{
  position: relative;
  width: 28%;
  top: 120px;
  left: -140px;
  margin: auto;
  font-weight: 500;
  color: RGB(0,0,0,50%);
  text-decoration: none;
  font-size: 20px;
}
.form-check-input:checked {
  background-color: #80C85F; /* 체크박스 배경 색 */
  border-color: #B1B3B9;  /* 체크박스 테두리 색 */
  box-shadow: #80C85F;
  accent-color: green;
}
.agree-btn-wrapper{
  position: relative;
  width: 20%;
  height: 11%;
  top: 160px;
  left: 60px;
  align-content: center;
  margin: auto;
}
.btn-agree{
  width: 80%;
  height: 80%;
  border: none;
  border-radius: 12px;
  background-color: #80C85F;
  font-size: 19px;
  font-weight: 550;
  color: floralwhite;
}
</style>