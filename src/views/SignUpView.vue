<template>
  <div id="signup">
    <div class="header-container">
      <section class="header-wrapper">
        <ZipLogo style="position: relative; top:90px;"></ZipLogo>
        <logofont style="position: relative; top:-15px;"></logofont>
      </section>
    </div>
    <div class="signup-container">
      <section class="signup-header">
        <section class="signup-wrapper">
          <a style="font-size: 26px; position: relative; top:-15px; font-weight: bolder;"> 회원가입 </a>
          <div class="sns-login">

            <div style="position: relative;  top:-10px; font-size: 16px; font-family: MyCustomFont2"> sns 계정으로 간편 회원가입
            </div>

          </div>
          <div class="login-btn-class">
            <section class="login-btn-wrapper">
              <el-button type="button" class="btn-kakao-login">
                <img src="../assets/kakao_login_large.png" class="btn-kakao-login-img"
                     style="width: 80px; height: 40px; position: relative; left:-15px; top:10px;">
              </el-button>
              <el-button type="button" class="btn-naver-login">
                <img src="../assets/naver_login_btn.png" class="btn-naver-login-img"
                     style="width: 95px; height: 40px; position: relative; left:5px; top:10px;">
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
            <a class="email-title"
            <a class="email-title"
               style="text-decoration: none; position: relative; left:-190px; top:-3.5px; font-weight: bolder; color: black; font-size: 17px;">
              이메일 </a>
          </section>
          <!-- 이메일 입력 -->
          <div class="input-group" style="width: 400px; position: relative; left:40px;">
            <input type="text" class="form-control" placeholder="이메일" aria-label="Username" v-model="userId"
                   @input="checkId" id="emailInput" style="border-radius: 6px; height: 40px; font-size: 14px;">
            <button @click="checkIdbut" id="checkbtnid"
                    style="position: absolute; top:-32px; left:13.5%; border-radius: 8px; font-weight:bolder;padding:4px; font-size: 13px; width: 60px"
                    class="btn btn-outline-success">Check
            </button>
            <div><span id="checkId" style="font-size: 13px; position: relative; left: 3px" @input="checkId"></span></div>
          </div>

        </section>
        <section class="password-wrapper email-wrapper">
          <section class="password-content email-content">
            <a class="pw-title"
               style="text-decoration: none; position: relative; left:-180px; top:-3.5px; font-weight: bolder; color: black; font-size: 17px;">
              비밀번호 </a>
          </section>

          <div class="form-group has-success" style="width: 400px; position: relative; left:-10px; ">
            <section :style="{ color: inputStarted ? (isValid ? 'green' : 'red') : 'dimgray' }" id="pw-length" class="form-text-nickname form-text"
                     style="font-size: 13px; position: absolute; top:40px; left:3px; " >
           <span >대소문자, 숫자, 특수문자를 포함한 8자 이상을 입력하세요.</span>
            </section>
            <!-- 비밀번호 입력 -->
            <input type="password" class="form-control valid" placeholder="비밀번호" id="pw" name="pw"
                   style="font-size: 14px; height: 40px"
                   v-model="password" @input="checkPasswords">
            <div class="valid-feedback"></div>
          </div>
        </section>

        <section class="re-password-wrapper email-wrapper"
                 style="width: 400px; position: relative; left:40px; top:35px;">
          <section class="re-password-content email-content">
            <a class="re-pw-title"
               style="text-decoration: none; position: relative; left:-145px; top:-3.5px; font-weight: bolder; color: black; font-size: 17px;">
              비밀번호 재확인 </a>
            <input type="password" class="form-control valid" placeholder="비밀번호" id="confirm-password" name="confirm-PW"
                   style="font-size: 14px; height: 40px; "
                   v-model="repassword" @input="checkPasswords">
            <span class="password-match" v-if="passwordsMatch && repasswordEntered">비밀번호가 일치합니다.</span>
            <span class="password-not-match" v-else-if="repasswordEntered">비밀번호가 일치하지 않습니다.</span>
          </section>

          <div class="form-group has-danger">
            <!-- 비밀번호 재확인 입력 -->
          </div>
        </section>

        <section class="nickname-wrapper email-wrapper" style="position: relative; top:30px;">
          <button  style="position: absolute; top:11px; left:93px;  border-radius: 8px; font-weight:bolder;padding:4px; font-size: 13px; width: 60px"
                   class="btn btn-outline-success" @click="checknicknamebut">Check</button>
          <section class="nickname-content email-content">
            <a class="nickname-title"
               style="text-decoration: none; position: relative; left:-188px; top:15px; font-weight: bolder; color: black; font-size: 17px;">
              닉네임 </a>
          </section>

          <section class="form-text-nickname form-text" id="nick-le"
                   style="font-size: 13px; position: relative; top:60px; left:-60px; color: dimgray;">
            <a> 닉네임의 길이는 (4~15자) 사이로 입력을 해주세요. </a>
          </section>

          <div class="form-group-nickname form-group" style="width: 400px; position: relative; left:-10px; top:80px;">
            <!-- 닉네임 입력 -->
            <input @input="checkNickname" type="nickname" class="form-control invalid" placeholder="닉네임" id="nickname"
                   v-model="nickname" style="position: relative; top:-85px; font-size: 14px; height: 40px;"
                   maxlength="15">

          </div>
        </section>

        <div class="d-grid gap-2">
          <button type="button" class="userbutton" id="signInButton" @click="signup"
                  style="width: 180px; height: 55px;"> 회원가입
          </button>
        </div>

      </section>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import Logofont from "@/components/logofont.vue";
import UserName from "@/components/UserName.vue";
import ZipLogo from "@/components/ZipLogo.vue";
import {api} from "@/api/api";

//중복확인 버튼 클릭 여부에 대한 회원가입 동작

export default {

  name: 'SignUpView',
  components: {ZipLogo, UserName, Logofont},
  data() {
    return {
      userId: '',
      password: '',
      repassowrd: '',
      nickname: '',
      passwordsMatch: false,
      repasswordEntered: false,
      userIdDuplicate: false, // 사용자 ID 중복 여부
      isIdChecked: false, // 중복 확인이 되었는지 여부를 추적하는 변수
      isNicknameChecked : false,
      isValid: false,
      inputStarted: false, // 사용자 입력이 시작됐는지 추적하는 새로운 데이터 속성
      isIdAvailable: false, // 아이디 중복 확인 결과
      isNicknameAvailable: false, // 닉네임 중복 확인 결과
    }
  },
  methods: {
    checkPasswords() {
      this.handleInput();
      this.checkPassword();
    },
    handleInput() {
      this.inputStarted = true; // 사용자가 입력을 시작했음을 나타내기
      this.checkPassword();
    },
    checkPassword() {
      if (this.password.length === 0) {
        this.isValid = null; // 입력이 없으면 다시 null로 설정
      } else {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W]).{8,}$/;
        this.isValid = regex.test(this.password);
      }

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
    },
    //이메일 검증
    checkId() {
      const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
      };

      // ID(email) 형식 확인
      const email = this.userId; // Vue 데이터 속성 사용
      const emailMessage = document.querySelector("#checkId");

      if (validateEmail(email)) {
        emailMessage.textContent = '올바른 이메일 형식입니다.';
        emailMessage.style.color = 'darkgreen';
        document.getElementById("emailInput").classList.remove("is-invalid");
        document.getElementById("emailInput").classList.add("is-valid");
        const signUpButton = document.querySelector("#signUpButton");
        signUpButton.disabled = false;
      } else {
        emailMessage.textContent = '올바른 이메일 형식이 아닙니다.';
        emailMessage.style.color = 'red';
        document.getElementById("emailInput").classList.remove("is-valid");
        document.getElementById("emailInput").classList.add("is-invalid");
        const signUpButton = document.querySelector("#signUpButton");
        signUpButton.disabled = true;
      }
    },
    async checkNickname() {
      const nicknameInput = document.querySelector("#nickname");
      const nicknameMessage = document.querySelector("#nick-le");

      const nickname = nicknameInput.value; // input 태그로부터 닉네임 값을 가져옵니다.

      if (nickname.length >= 5 && nickname.length <= 15) {
        // 닉네임 길이가 2~15자 사이인 경우
        nicknameMessage.style.color = 'green'; // 메시지 색상을 초록색으로 설정합니다.
        this.isNicknameValid = true;
      } else {
        // 닉네임 길이가 2~15자 사이가 아닌 경우
        nicknameMessage.style.color = 'red'; // 메시지 색상을 빨간색으로 설정합니다.
        this.isNicknameValid = false;
      }
    },

    //회원가입 비동기 통신
    async signup() {
      //중복확인 여부
      if (!this.isIdChecked) {
        alert('중복 확인을 해주세요.');
        return; // 추가적인 회원가입 로직을 방지
      }
      if (!this.isIdChecked || !this.isIdAvailable) {
        alert('아이디 중복 확인을 해주세요.');
        return;
      }
      if (!this.isNicknameChecked || !this.isNicknameAvailable) {
        alert('닉네임 중복 확인을 해주세요.');
        return;
      }
      // 입력 필드 확인
      if (!this.userId.trim() || !this.password.trim() || !this.nickname.trim() || !this.nickname.trim()) {
        alert('빈칸을 입력해주세요.');
        return;
      }
      if (!this.isValid) {
        alert('비밀번호 양식이 일치하지 않습니다.');
        return;
      }
      if (!this.passwordsMatch) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }
      if (!this.isNicknameValid) {
        alert('닉네임 양식이 일치하지 않습니다.');
        return;
      }
      const userData = {
        userId: this.userId,
        password: this.password,
        nickname: this.nickname
      };

      await api.setUser('/signup', userData).then(res => {
        this.users = res.data;
        alert('회원가입에 성공하였습니다.');
        this.$router.push('/login');
      })
          .catch(error => {
            // 에러 로그
            alert('회원가입에 실패하였습니다.');
            console.error('Error data', error);
          })
          .finally(() => {
            // 필요한 최종 처리
          });

    },
    //중복확인 버튼에 대한 비동기 통신
    async checkIdbut() {
      //중복확인 여부에 대한 boolean
      this.isIdChecked = true;

      function isValidEmail(email) {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
        return regex.test(email);
      }

      if (!this.userId.trim()) {
        alert('이메일을 입력해주세요.');
        return;
      }
      if (!isValidEmail(this.userId)) {
        alert('유효하지 않은 이메일 형식입니다.');
        return; // 유효하지 않으면 여기서 함수 종료
      }
      await api.getUser(`/checkUserId/${encodeURIComponent(this.userId)}`).then(res => {
        const result = res.data;
            if (result) {
              alert('사용 가능한 아이디입니다.');
              this.isIdAvailable = true; // 아이디 사용 가능 상태 업데이트
            } else{
              alert("이미 사용중인 아이디입니다.");
              this.isIdAvailable = false; // 아이디 사용 불가 상태 업데이트
            }
          }
      )
          .catch(error => {
            if (error.response) {
              alert("서버 오류가 발생했습니다. 나중에 다시 시도해주세요.");
            } else if (error.request) {
              alert("서버 응답이 없습니다. 네트워크 연결을 확인해주세요.");
            } else {
              alert("요청을 처리하는 중 오류가 발생했습니다.");
            }
          });
    },
    async checknicknamebut() {
      this.isNicknameChecked=true;
      await api.getUser(`/checknickname/${this.nickname}`).then(res => {
        const result = res.data;
        if (result) {
          alert('사용 가능한 닉네임입니다.');
          this.isNicknameAvailable = true; // 닉네임 사용 가능 상태 업데이트
        } else if(!result) {
          alert("이미 사용중인 닉네임입니다..");
          this.isNicknameAvailable = false; // 닉네임 사용 불가 상태 업데이트
        }
      })
    }
  }
}
</script>

<style>
/* 전체 페이지 스타일링 */
body {
  font-family: 'Noto Sans KR', sans-serif;
  background-color: #f8f9fa;
  color: #212529;
}

a {
  text-decoration: none;
  color: #007bff;
}

a:hover {
  color: #0056b3;
}

.signup-container {
  background-color: white;
  width: 560px; /* 가로 크기 조정 */
  height: 720px;
  margin: 40px auto; /* 상하 여백 조정 */
  padding: 30px; /* 내부 여백 조정 */
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  font-size: 14px; /* 폰트 크기 조정 */
}

/* SNS 로그인 버튼 스타일링 */
.login-btn-class {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.btn-kakao-login, .btn-naver-login {
  border: none;
  cursor: pointer;
}

.btn-kakao-login-img, .btn-naver-login-img {
  width: 40px;
  height: 40px;
}

/* 입력 필드 스타일링 */
.input-group {
  position: relative;
  margin-bottom: 20px;
}

.input-group input[type="text"],
.input-group input[type="password"],
.input-group input[type="nickname"] {
  width: 100%;
  padding: 12px; /* 패딩 조정 */
  margin: 5px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 14px; /* 폰트 크기 조정 */
}

/* 회원가입 버튼 스타일링 */
.userbutton {
  font-size: 16px;
  color: white;
  background-color: #80C85F;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 10px 20px; /* 버튼 패딩 조정 */
  transition: background-color 0.2s ease-in-out;
  position: relative;
  top: 80px;
  left: 140px;
}

.userbutton:hover {
  background-color: #0056b3;
}

.line-content hr {
  border-top: 1px solid #ccc;
  margin: 20px 0;
}

.form-group.has-success, .form-group.has-danger {
  margin-bottom: 15px;
}

.password-match, .password-not-match {
  font-size: 14px;
  position: absolute;
  left: 0.5px;

}

.password-match {
  color: green;
}

.password-not-match {
  color: red;
}

.email-title, .pw-title, .re-pw-title, .nickname-title {
  font-family: MyCustomFont2;
}
.valid {
  color: green;
}

.invalid {
  color: red;
}
</style>