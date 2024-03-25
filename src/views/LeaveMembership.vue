<template>
  <div id="leave">
    <div class="content-container">
      <section class="content-wrapper">
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

      <div class="d-grid gap-2">
        <el-button type="button" class="btn-loginIn" id="modifyButton"> 확인 </el-button>
      </div>

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
}
.content-container{
  margin: 19% 26%;
  font-weight: 550;
  color: #B1B3B9;
  text-decoration: none;
  font-size: 24px;
}
.content-wrapper{
  margin: 15px 20px;
}
.agree-container{
  margin: 5% 2.5%;
  font-weight: 380;
  color: RGB(0,0,0,52%);
  text-decoration: none;
  font-size: 20px;
}
.form-check-input:checked {
  background-color: #80C85F; /* 체크박스 배경 색 */
  border-color: #B1B3B9;  /* 체크박스 테두리 색 */
  box-shadow: #80C85F;
  accent-color: green;
}
.d-grid{
  text-align: center;
  width: 420px;
  margin: 80px 220px;
}
</style>