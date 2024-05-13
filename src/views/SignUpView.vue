<template>
  <div id="signup">
    <div class="header-container">
      <section class="header-wrapper">
        <section class="logo-image-wrapper">
          <img src="../assets/ziplogo.png">
        </section>
        <logofont></logofont>
      </section>
    </div>
    <div class="signup-container">
      <section class="signup-header">
        <section class="signup-wrapper">
          <a style="font-size: 25px;"> 회원가입 </a>
          <div class="sns-login">

              <div style="position: fixed; left:44.5%; top:215px; font-size: 16px"> sns 계정으로 간편 회원가입 </div>

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
            <a class="email-title"> 이메일 </a>
          </section>
          <!-- 이메일 입력 -->
          <div class="input-group">
            <input type="text" class="form-control" placeholder="이메일" aria-label="Username" v-model="userId" @input="checkId" id="emailInput">
            <div><span id="checkId" style="font-size: 13px;" @input="checkId"></span></div>
          </div>

        </section>
        <section class="password-wrapper email-wrapper">
          <section class="password-content email-content">
            <a class="pw-title"> 비밀번호 </a>
          </section>

          <div class="form-group has-success">
            <section class="form-text-nickname form-text" style="font-size: 14px; position: absolute; top:495px;">
            영문, 숫자, 특수문자를 포함한 8자 이상의 비밀번호를 입력해주세요.
            </section>
            <!-- 비밀번호 입력 -->
            <input type="password" class="form-control valid" placeholder="비밀번호" id="pw" name="pw"
                   v-model="password" @input="checkPasswords">
            <div class="valid-feedback"></div>
          </div>
        </section>

        <section class="re-password-wrapper email-wrapper">
          <section class="re-password-content email-content">
            <a class="re-pw-title"> 비밀번호 재확인 </a>
            <input type="password" class="form-control valid" placeholder="비밀번호" id="confirm-password" name="confirm-PW"
                   v-model="repassword" @input="checkPasswords">
            <span class="password-match" v-if="passwordsMatch && repasswordEntered">비밀번호가 일치합니다.</span>
            <span class="password-not-match"  v-else-if="repasswordEntered">비밀번호가 일치하지 않습니다.</span>
          </section>

          <div class="form-group has-danger">
            <!-- 비밀번호 재확인 입력 -->
          </div>
        </section>

        <section class="nickname-wrapper email-wrapper" style="position: relative; top:-50px;">
          <section class="nickname-content email-content">
            <a class="nickname-title"> 닉네임 </a>
          </section>

          <section class="form-text-nickname form-text" style="font-size: 14px; position: absolute; top:66px; left:33%;">
            <a> 다른 유저와 겹치지 않도록 입력해주세요. (2~15자) </a>
          </section>

          <div class="form-group-nickname form-group">
            <!-- 닉네임 입력 -->
            <input type="nickname" class="form-control invalid" placeholder="닉네임" id="nickname" v-model="nickname">

          </div>
        </section>

        <div class="d-grid gap-2">
          <button type="button" class="userbutton" id="signInButton" @click="signup" style="width: 180px; height: 55px;"> 회원가입</button>
        </div>

      </section>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import Logofont from "@/components/logofont.vue";
import UserName from "@/components/UserName.vue";

export default {
  name: 'SignUpView',
  components: {UserName, Logofont},
  data() {
    return {
      userId: '',
      password: '',
      repassowrd: '',
      nickname: '',
      passwordsMatch: false,
      repasswordEntered: false,
    }
  },
  methods: {

    checkId() {

      // ID(email) 형식 검증
      const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
      };

      // ID(email) 형식 확인
      const email = this.userId; // Vue 데이터 속성 사용
      const emailMessage = document.querySelector("#checkId");

      if (validateEmail(email)) {
        emailMessage.textContent = '이메일 양식이 일치한 양식입니다.';
        emailMessage.style.color = 'darkgreen';
        document.getElementById("emailInput").classList.remove("is-invalid");
        document.getElementById("emailInput").classList.add("is-valid");
        const signUpButton = document.querySelector("#signUpButton");
        signUpButton.disabled = false;
      } else {
        emailMessage.textContent = '이메일 양식이 일치하지 않습니다.';
        emailMessage.style.color = 'red';
        document.getElementById("emailInput").classList.remove("is-valid");
        document.getElementById("emailInput").classList.add("is-invalid");
        const signUpButton = document.querySelector("#signUpButton");
        signUpButton.disabled = true;
      }
    },
    checkPasswords() {
      this.checkPassword();
    },
    checkPassword() {
      this.passwordsMatch = this.password === this.repassword;
      this.repasswordEntered = true; // 사용자가 입력을 시작하면 true로 설정

      var password = document.getElementById("pw").value;
      var confirmPassword = document.getElementById("confirm-PW").value;
      var matchMessage = document.querySelector('.password-match');
      var notMatchMessage = document.querySelector('.password-not-match');
      var submitButton = document.getElementById("signInButton");

      if (this.passwordsMatch && this.password.length >= 8 && this.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W]).+$/)) {
        matchMessage.style.display = 'block';
        notMatchMessage.style.display = 'none';
        submitButton.disabled = false;
      } else {
        matchMessage.style.display = 'none';
        notMatchMessage.style.display = 'block';
        submitButton.disabled = true;
      }
    }
    ,
    signup() {
        // 입력 필드 확인
        if (!this.userId.trim() || !this.password.trim() || !this.nickname.trim()) {
          alert('빈칸을 입력해주세요.');
          window.location.reload(); // 페이지 리로드
          return;
        }

      const userData = {
        userId: this.userId,
        password: this.password,
        repassword: this.repassowrd,
        nickname: this.nickname
      };

      // 보내기 전 데이터 확인
      console.log('Sending data', userData);

      axios.post('http://jerry6475.iptime.org:20000/signup', userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
          .then(response => {
            // 서버 응답 로그
            console.log('Response data', response.data);
            // 여기서 response.data를 사용하여 this.userId, this.password, this.nickname 값을 업데이트
            alert('회원가입에 성공하였습니다.');
            this.$router.push('/login');
          })
          .catch(error => {
            // 에러 로그
            console.error('Error data', error);
          })
          .finally(() => {
            // 필요한 최종 처리
          });
    }
  }
}
</script>

<style scoped>
#signup{
  padding:30px;
}
/* 상대적 크기와 여백 조정 */
.signup-wrapper, .email-wrapper, .nickname-wrapper {
  margin: 0 auto; /* 가운데 정렬 */
  width: 80%; /* 뷰포트 너비의 80% 사용 */
  font-weight: bolder;
  font-size: 18px;
  padding:10px;
}

.input-group, .form-group {
  margin: 13px auto; /* 가운데 정렬 */
  width: 35%; /* 부모 요소의 너비를 전체 사용 */
}

.btn-loginIn {
  margin: auto;
}
/* 유효성 검사 메시지 위치 조정 */
.form-group .validation-message {
  color: #d9534f; /* 오류 메시지 색상 */
  font-size: 13px; /* 메시지 글꼴 크기 */
  margin-top: 5px; /* 입력 필드와의 여백 */
}

/* 디자인 일관성 */
.form-control, .btn-loginIn {
  height: 40px; /* 입력 필드와 버튼의 높이 통일 */
  border-radius: 5px; /* 모서리 둥글기 */
}

/* 반응형 디자인을 위한 미디어 쿼리 추가 */
@media (max-width: 768px) {
  .signup-wrapper, .email-wrapper, .nickname-wrapper {
    width: 35%; /* 모바일 화면에서 너비 조정 */
  }

  .btn-loginIn {
    width: 70%; /* 모바일 화면에서 버튼 너비 조정 */
  }
}
#emailInput {
  min-height: 40px; /* 또는 원하는 높이 */
  width: 100%; /* 또는 원하는 너비 */
}
.is-valid, .is-invalid {
  border-width: 1px; /* 기존 테두리 두께 유지 */
  padding: .375rem .75rem; /* 기존 패딩 유지 */
}
#confirm-password{
  width:35%;
  margin: auto;
}
.password-match, .password-not-match{
  font-size: 13px;
  position: absolute;
  left:64%;
  top:570px;
}
.password-match{
  color: darkgreen;
}
.password-not-match{
  color:red;
}
.login-btn-wrapper {
  display: flex;
  justify-content: center; /* 가로 방향으로 중앙 정렬 */
  align-items: center; /* 세로 방향으로 중앙 정렬 */
  gap: 10px; /* 버튼 사이의 간격 */
  padding-right: 50px;
}

.btn-kakao-login{
  flex: 1; /* 버튼들이 사용 가능한 공간을 균등하게 나누어 가짐 */
  max-width: 90px; /* 버튼의 최대 너비 설정 */
}
.btn-naver-login {
  flex: 1; /* 버튼들이 사용 가능한 공간을 균등하게 나누어 가짐 */
  max-width: 110px; /* 버튼의 최대 너비 설정 */
  max-height: 88px;
}

.btn-kakao-login-img, .btn-naver-login-img {
  width: 105%; /* 이미지가 버튼의 크기에 맞게 조절되도록 설정 */
  height: auto; /* 이미지의 비율을 유지하면서 높이 조절 */
  position: relative;
  top:20px;
}
.userbutton{
  margin: auto;
}
#checkId{
  position: absolute;
  width:200px;
  top:10px;
  left:101%;
}
.email-title{
  text-decoration: none;
  color:black;
  position: absolute;
  top:340px;
  left:36.5%;
  font-size: 19px;
}
.pw-title{
  text-decoration: none;
  color:black;
  position: absolute;
  top:428px;
  left:36.5%;
  font-size: 19px;
}
.re-pw-title{
  text-decoration: none;
  color:black;
  position: absolute;
  top:528px;
  left:36.5%;
  font-size: 19px;
}
.nickname-title{
  text-decoration: none;
  color:black;
  position: absolute;
  top:-10px;
  left:32.55%;
  font-size: 19px;
}
</style>