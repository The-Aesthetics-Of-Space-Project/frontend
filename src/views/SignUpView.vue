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

            <div style="position: relative;  top:-10px; font-size: 16px; font-family: MyCustomFont2"> sns 계정으로 간편 회원가입 </div>

          </div>
          <div class="login-btn-class">
            <section class="login-btn-wrapper">
              <el-button type="button" class="btn-kakao-login">
                <img src="../assets/kakao_login_large.png" class="btn-kakao-login-img" style="width: 80px; height: 40px; position: relative; left:-15px; top:10px;">
              </el-button>
              <el-button type="button" class="btn-naver-login">
                <img src="../assets/naver_login_btn.png" class="btn-naver-login-img" style="width: 95px; height: 40px; position: relative; left:5px; top:10px;">
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
            <a class="email-title" style="text-decoration: none; position: relative; left:-190px; top:-3.5px; font-weight: bolder; color: black; font-size: 17px;"> 이메일 </a>
          </section>
          <!-- 이메일 입력 -->
          <div class="input-group" style="width: 400px; position: relative; left:40px;">
            <input type="text" class="form-control" placeholder="이메일" aria-label="Username" v-model="userId" @input="checkId" id="emailInput" style="border-radius: 6px; height: 40px; font-size: 14px;">
            <button @click="checkIdbut" id="checkbtnid" style="position: absolute; top:-32px; left:14%; border-radius: 8px; font-weight:bolder;padding:4px; font-size: 13px;" class="btn btn-outline-success">중복 확인</button>
            <div><span id="checkId" style="font-size: 13px;" @input="checkId"></span></div>
          </div>

        </section>
        <section class="password-wrapper email-wrapper">
          <section class="password-content email-content">
            <a class="pw-title" style="text-decoration: none; position: relative; left:-180px; top:-3.5px; font-weight: bolder; color: black; font-size: 17px;"> 비밀번호 </a>
          </section>

          <div class="form-group has-success" style="width: 400px; position: relative; left:-10px;">
            <section class="form-text-nickname form-text" style="font-size: 14px; position: absolute; top:40px;">
              영문, 숫자, 특수문자를 포함한 8자 이상을 입력하세요.
            </section>
            <!-- 비밀번호 입력 -->
            <input type="password" class="form-control valid" placeholder="비밀번호" id="pw" name="pw" style="font-size: 14px; height: 40px"
                   v-model="password" @input="checkPasswords">
            <div class="valid-feedback"></div>
          </div>
        </section>

        <section class="re-password-wrapper email-wrapper" style="width: 400px; position: relative; left:40px; top:35px;">
          <section class="re-password-content email-content">
            <a class="re-pw-title"  style="text-decoration: none; position: relative; left:-145px; top:-3.5px; font-weight: bolder; color: black; font-size: 17px;"> 비밀번호 재확인 </a>
            <input type="password" class="form-control valid" placeholder="비밀번호" id="confirm-password" name="confirm-PW" style="font-size: 14px; height: 40px; "
                   v-model="repassword" @input="checkPasswords" >
            <span class="password-match" v-if="passwordsMatch && repasswordEntered">비밀번호가 일치합니다.</span>
            <span class="password-not-match"  v-else-if="repasswordEntered">비밀번호가 일치하지 않습니다.</span>
          </section>

          <div class="form-group has-danger">
            <!-- 비밀번호 재확인 입력 -->
          </div>
        </section>

        <section class="nickname-wrapper email-wrapper" style="position: relative; top:30px;">
          <section class="nickname-content email-content">
            <a class="nickname-title" style="text-decoration: none; position: relative; left:-188px; top:15px; font-weight: bolder; color: black; font-size: 17px;"> 닉네임 </a>
          </section>

          <section class="form-text-nickname form-text" style="font-size: 14px; position: relative; top:60px; left:-48px;">
            <a> 다른 유저와 겹치지 않도록 입력해주세요. (2~15자) </a>
          </section>

          <div class="form-group-nickname form-group" style="width: 400px; position: relative; left:-10px; top:80px;">
            <!-- 닉네임 입력 -->
            <input type="nickname" class="form-control invalid" placeholder="닉네임" id="nickname" v-model="nickname" style="position: relative; top:-85px; font-size: 14px; height: 40px;">

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
import ZipLogo from "@/components/ZipLogo.vue";

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
    }
  },
  methods: {

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

    //패스워드 검증
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

    //회원가입 비동기 통신
    signup() {
      //중복확인 여부
      if (!this.isIdChecked) {
        alert('중복 확인을 해주세요.');
        return; // 추가적인 회원가입 로직을 방지
      }
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
    },

    //중복확인 버튼에 대한 비동기 통신
    checkIdbut() {
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
      axios.get(`http://jerry6475.iptime.org:20000/checkUserId/${encodeURIComponent(this.userId)}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
          .then(response => {
              if(this.userIdDuplicate === false) {
                alert('사용 가능한 아이디입니다.');
              }
          })
          .catch(error => {
            if (error.response && error.response.status === 401) {
              // 여기서 401 상태 코드를 확인하고, 사용자에게 알림
              alert("이미 사용중인 아이디입니다.");
            }
          });
    },
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
  top:80px;
  left:140px;
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
  left:0.5px;

}

.password-match {
  color: #28a745;
}

.password-not-match {
  color: red;
}
.email-title, .pw-title, .re-pw-title, .nickname-title{
  font-family: MyCustomFont2;
}
</style>