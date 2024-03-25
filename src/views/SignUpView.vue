<template>
  <div id="signup">
    <div class="header-container">
      <section class="header-wrapper">
        <section class="logo-image-wrapper">
          <img src="../assets/ziplogo.png">
        </section>
        <a class="logofont"> .zip </a>
      </section>
    </div>
    <div class="signup-container">
      <section class="signup-header">
        <section class="signup-wrapper">
          <a> 회원가입 </a>
          <div class="sns-login">
            <section class="sns-login-wrapper">
              <a> sns 계정으로 간편 회원가입 </a>
            </section>
          </div>
          <div class="login-btn-class">
            <section class="login-btn-wrapper">
              <el-button type="button" class="btn-kakao-login">
                <img src="../assets/kakao_login_large.png" class="btn-kakao-login-img">
              </el-button>
              <el-button type="button" class="btn-naver-login">
                <img src="../assets/naver_login_btn.png" class="btn-naver-login-img">
              </el-button>
            </section>
          </div>
        </section>

        <section class="line-content">
          <hr/>
        </section>

      </section>
      <section class="signup-content">
        <section class="email-wrapper">
          <section class="email-content">
            <a> 이메일 </a>
          </section>
          <!-- 이메일 입력 -->
          <div class="input-group">
            <input type="text" class="form-control" placeholder="이메일" aria-label="Username">
            <span class="input-group-text">@</span>
            <input type="text" class="form-control email-input" aria-label="Server">
          </div>

        </section>
        <section class="password-wrapper email-wrapper">
          <section class="password-content email-content">
            <a> 비밀번호 </a>
          </section>

          <div class="form-group has-success">
            <section class="form-text">
              <a> 영문, 숫자, 특수문자를 포함한 8자 이상의 비밀번호를 입력해주세요.</a>
            </section>
            <!-- 비밀번호 입력 -->
            <input type="password" class="form-control valid" placeholder="비밀번호" id="newPW" name="PW">
            <div class="valid-feedback"></div>
          </div>
        </section>

        <section class="re-password-wrapper email-wrapper">
          <section class="re-password-content email-content">
            <a> 비밀번호 재확인 </a>
          </section>

          <div class="form-group has-danger">
            <!-- 비밀번호 재확인 입력 -->
            <input type="password" class="form-control invalid" placeholder="비밀번호 확인" id="Re-enterPW">

          </div>
        </section>

        <section class="nickname-wrapper email-wrapper">
          <section class="nickname-content email-content">
            <a> 닉네임 </a>
          </section>

          <section class="form-text-nickname form-text">
            <a> 다른 유저와 겹치지 않도록 입력해주세요. (2~15자) </a>
          </section>

          <div class="form-group-nickname form-group">
            <!-- 닉네임 입력 -->
            <input type="nickname" class="form-control invalid" placeholder="닉네임" id="nickname">

          </div>
        </section>

        <div class="d-grid gap-2">
          <el-button type="button" class="btn-loginIn" id="signInButton"> 로그인 </el-button>
        </div>



      </section>
    </div>

  </div>
</template>

<script>

export default {
  name: 'SignUpView',
}
</script>

<style scoped>
#signup {
  font-family: Inter;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
nav {
  padding: 10px;
}
.line-content{
  width: 50%;
  margin: 5px 23%;
}
hr{
  width: 60%;
  height: 1.3px;
  background-color: #757575;
  margin: 5px 180px;
}

nav a {
  font-weight: 460;
  color: RGB(117,117,117);
  text-decoration: none;
}
.header-wrapper{
  grid-column: span 2;
  display: flex!important;
  position: relative;
  font-size: 40px;
  margin: 15px 15px;
  align-items: center;
  gap: 8px;
}
.signup-wrapper{
  width: 40%;
  margin: 15px 500px;
  align-items: center;
}
.signup-header{
  font-size: 24px;
  font-weight: 650;
}
.sns-login-wrapper{
  position: relative;
  text-decoration: none;
  color: #757575;
  text-align: center;
  margin: 25px 15px;
  font-size: 15px;
  font-weight: 530;
}
.login-btn-class{
  margin: 5px 10px;
  position: relative;
  text-align: center;
}
.login-btn-wrapper{
  margin: 10px 150px;
  position: relative;
  text-align: center;
  gap: 2px;
}
.signup-content{
  margin: 30px 180px;
}
.email-wrapper{
  margin: 30px 180px;
}
.nickname-wrapper{
  margin: -35px 180px;
}
.email-content{
  margin-right: 420px;
  font-size: 22px;
  font-weight: 550;
}
.password-content{
  margin-right: 400px;
}
.re-password-content{
  margin-right: 330px;
}

.input-group{
  margin: 13px 250px;
  width: 50%;
}
.email-input{
  width: 30px;
}
.form-group{
  margin: 7px 247px;
}

.form-text{
  font-size: 13px;
  margin: 11px -5px;
  width: 100%;
}
.form-text-nickname{
  margin: 11px -90px;
}
.form-control{
  width: 125%;
}
.btn-loginIn{
  width: 35%;
  margin: 45px 450px;
}

</style>