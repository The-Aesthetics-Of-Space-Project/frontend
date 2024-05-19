<template>
  <div id="setting">
    <div class="setting-container">
      <section class="setting-wrapper">
        <!-- 헤더(회원정보 수정, 탈퇴하기) -->
        <div class="header-container">
          <div class="leave-membership">
            <section class="leave-membership-wrapper">
                <router-link to="/leave"> 탈퇴하기 </router-link>
            </section>
          </div>
          <section class="header-wrapper"><a> 회원정보 수정 </a></section>
        </div>

        <!-- 내용 -->
        <div class="setting-content-wrapper">
          <!-- 이메일 헤더 -->
          <section class="email-wrapper">
            <section class="setting-email-content">
              <a> 이메일 </a>
            </section>
            <!-- 이메일 입력 폼 -->
            <section class="email-input-wrapper">
                <input type="text" class="email-input-form" placeholder="이메일" aria-label="Username">
                <span class="input-group-text">@</span>
                <input type="text" class="email-input-form-2" aria-label="Server">
            </section>

          </section>
          <!-- 닉네임 헤더 -->
          <section class="nickname-wrapper">
            <section class="setting-email-content">
              <a> 닉네임 </a>
            </section>
            <section class="setting-form-text-nickname">
              <a> 다른 유저와 겹치지 않도록 입력해주세요. (2~15자) </a>
            </section>
            <!-- 닉네임 입력 form -->
            <section class="form-group-nickname-wrapper">
              <input type="text" class="nickname-input-form" placeholder="닉네임" aria-label="Nickname">
            </section>

          </section>
          <!-- 프로필 -->
          <section class="profile-content-wrapper">
            <section class="profile-header-wrapper setting-email-content">
              <section class="profile-header-content">
                <a> 프로필 </a>
              </section>
            </section>

            <section class="setting-profile-wrapper">
              <label class="profile-img-wrapper">
                <input type="file" class="btn-img-button" style="position: relative; border: none;
                background-color: white; border-radius: 50%; width: 60%; height: 60%; top: 30px;"/>
                  <img src="../assets/plusimage.png" class="upload-btn-img">

              </label>
            </section>
            <!-- 수정 완료 버튼 -->
            <div class="user-modify-btn-wrapper">
              <button type="button" class="btn-modify" id="modifyButton"> 수정하기 </button>
            </div>

          </section>

        </div>
      </section>
    </div>
  </div>

</template>

<script setup>


</script>

<style scoped>
#setting {
  font-family: Inter;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: relative;
  width: 100%;
  height: 800px;
  margin: 0;
  align-content: center;
}
.setting-container{
  position: relative;
  width: 100%;
  height: 100%;
}
.setting-wrapper{
  position: relative;
  width: 80%;
  height: 100%;
  top: 35px;
  margin: auto;
}
.header-container{
  position: relative;
  width: 80%;
  height: 10%;
  margin: auto;
}
/* 헤더(회원정보 수정, 탈퇴하기) */
.header-wrapper{
  position: relative;
  margin: 10px 300px;
  font-weight: 550;
  font-size: 22px;
}
.leave-membership-wrapper{
  position: relative;
  width: 10%;
  left: 30%;
  margin: auto;
}
.leave-membership-wrapper a{
  font-size: 15px;
  font-weight: 550;
  color: rgb(0,0,0,50%);
  text-decoration: none;
}
.setting-content-wrapper{
  position: relative;
  width: 80%;
  height: 90%;
  margin: auto;
}
/* 이메일 */
.email-wrapper{
  position: relative;
  width: 50%;
  height: 17%;
  margin: auto;
}
.setting-email-content{
  position: relative;
  right: 35%;
  top: 20px;
  font-size: 18px;
  font-weight: 550;
}
.email-input-wrapper{
  position: relative;
  margin: auto;
  width: 80%;
  top: 26px;
  display: grid;
  grid-template-columns: 4fr 1fr 4fr;
  grid-template-rows: 1fr;
}
/* 이메일 입력칸 */
.email-input-form{
  position: relative;
  width: 100%;
  border: 1px solid rgb(141,141,141,80%);
  border-radius: 7px;
}
.input-group-text{
  position: relative;
  width: 100%;
}
.email-input-form-2{
  position: relative;
  width: 100%;
  border: 1px solid rgb(141,141,141,80%);
  border-radius: 7px;
}
/* 닉네임 */
.nickname-wrapper{
  position: relative;
  width: 50%;
  height: 18%;
  top: -10px;
  margin: auto;
}
.setting-form-text-nickname{
  position: relative;
  width: 75%;
  height: 10%;
  top: 22px;
  margin: auto;
  font-size: 13px;
}
.setting-form-text-nickname a{
  position: relative;
  width: 75%;
  left: -69px;
  margin: auto;
  font-size: 13px;
}
.form-group-nickname-wrapper{
  position: relative;
  width: 91%;
  height: 30%;
  top: 35px;
  left: -5px;
  margin: auto;
  align-content: center;
}
.nickname-input-form{
  position: relative;
  width: 90%;
  height: 98%;
  left: 10px;
  border: 1px solid rgb(141,141,141,80%);
  border-radius: 7px;
  margin: auto;
}
/* 프로필 */
.profile-content-wrapper{
  position: relative;
  width: 50%;
  height: 40%;
  top: 10px;
  margin: auto;
}
.profile-header-wrapper{
  position: relative;
  width: 20%;
  height: 10%;
  top: 10px;
  margin: auto;
}
.setting-profile-wrapper{
  position: relative;
  left: -130px;
  top: 15px;
  width: 32%;
  height: 53%;
  margin: auto;
  border: 1px solid #D9D9D9;
  border-radius: 6px;
}
.profile-img-wrapper{
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.upload-btn-img{
  position: relative;
  width: 90%;
  height: 100%;
  margin: auto;
  top: -90px;
}
/* 버튼 */
.user-modify-btn-wrapper{
  position: relative;
  width: 40%;
  height: 20%;
  top: 50px;
  align-content: center;
  margin: auto;
}
.btn-modify{
  width: 90%;
  height: 80%;
  font-weight: 550;
  border: none;
  border-radius: 12px;
  background-color: #80C85F;
  font-size: 17px;
  color: floralwhite;
}
</style>