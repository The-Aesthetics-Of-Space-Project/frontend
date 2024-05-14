<template>
  <div id="login">
    <div class="login-container">
      <div class="login-wrapper">
        <section class="login-header">
          <section class="logo-container" href="/login">
            <img src="../assets/ziplogo.png">
          </section>
          <logofont></logofont>
        </section>
        <div class="el-input el-input-line">
          <!-- email 입력 -->
          <form>
            <div class="form-group" style="position: relative; top:-30px;">
              <input type="text" class="form-control invalid" id="inputEmail" aria-describedby="emailHelp" placeholder="Email" v-model="userId">
              <div><span id="checkId"></span></div>
            </div>
            <!-- password 입력 -->
            <div class="form-group has-success" style="position: relative; top:-10px;">
              <!-- 비밀번호 입력 -->
              <input type="password" class="form-control valid" id="inputPW" name="PW" placeholder="Password" v-model="password">
              <div class="valid-feedback"></div>
            </div>

            <div class="d-grid gap-2">
              <button v-on:click="loginClick" class="userbutton" @click="login" style="position: relative;  top:10px;left:-50px; width:365px;"> 로그인 </button>
              <div> <h2> {{num}} </h2></div>
            </div>
            <section class="bottom-login">
              <section class="signup-con">
                <nav>
                  <router-link to="/signup" style="text-decoration: none; color:gray">회원가입</router-link>
                </nav>
              </section>
              <section class="passwordFind-container">
                <nav>
                  <router-link to="/password" style="text-decoration: none; color:gray">비밀번호 찾기</router-link>
                </nav>
              </section>
              <router-view></router-view>
            </section>
          </form>
        </div>

        <div class="sns-login" style="font-weight: bolder; font-size: 17px;">
          sns 계정으로 간편 로그인
        </div>

        <div class="login-btn-class">
          <section class="login-btn-wrapper">
            <el-button type="button" class="btn-kakao-login">
              <img src="../assets/kakao_login_large.png" class="btn-kakao-login-img" style="position: relative; top:20px; width: 80px; height: 40px;">
            </el-button>
            <el-button type="button" class="btn-naver-login">
              <img src="../assets/naver_login_btn.png" class="btn-naver-login-img"style="position: relative; top:20px; width: 95px; height: 40px;">
            </el-button>
          </section>
        </div>

      </div>
    </div>

  </div>
</template>

<script>

import axios from "axios";
import Logofont from "@/components/logofont.vue";

export default {
  name: 'login',
  components: {Logofont},
  el: '#login',
  data() {
    return {
      userId: '',
      password: ''
    }
  },
  methods: {
    login() {
      // 입력값 검증
      if (!this.userId && !this.password) {
        alert('아이디와 비밀번호를 입력해 주세요.');
      } else if (!this.userId) {
        alert('아이디를 입력해 주세요.');
      } else if (!this.password) {
        alert('비밀번호를 입력해 주세요.');
      } else {
        const userData = {
          userId: this.userId,
          password: this.password,
        };

        // 보내기 전 데이터 확인
        console.log('Sending data', userData);

        axios.post('http://jerry6475.iptime.org:20000/login', userData, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
            .then(response => {
              // 서버 응답 로그
              console.log('Response data', response.data);
              // 로그인 성공 알림
              alert('로그인에 성공하였습니다.');
              // 세션 값 저장
              this.$store.commit('setUserId', response.data.userId);
              // 페이지 이동
              this.$router.push('/');
            })
            .catch(error => {
              // 사용자에게 친절한 에러 메시지 표시
              alert('로그인에 실패하였습니다. 아이디와 비밀번호를 확인해 주세요.');
              console.error('Error data', error);
            });
      }
    }
  }
}
</script>

<style>
#login {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  margin: auto;
  padding: 180px 0;
}

.login-container {
  max-width: 600px; /* 로그인 컨테이너 최대 너비 설정 */
  margin: 0 auto; /* 중앙 정렬 */
  padding: 20px;
  background-color: #ffffff; /* 배경색 설정 */
  box-shadow: 0 4px 10px rgba(0,0,0,0.1); /* 그림자 효과 추가 */
  border-radius: 8px; /* 모서리 둥글게 */
}

.login-wrapper {
  padding: 20px;
}

.login-header .logo-container img {
  width: 120px; /* 로고 이미지 크기 조정 */
  margin-bottom: 20px;
}

.el-input, .form-group {
  margin-bottom: 20px; /* 입력 필드 간격 조정 */
  width:300px;
  margin: auto;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc; /* 테두리 색상 */
  border-radius: 5px; /* 입력 필드 모서리 둥글게 */
  font-size: 16px; /* 폰트 크기 */
}

.userbutton {
  width: 100%;
  padding: 10px 20px;
  background-color: #007bff; /* 버튼 배경색 */
  color: #ffffff; /* 버튼 글자색 */
  border: none;
  border-radius: 5px; /* 버튼 모서리 둥글게 */
  cursor: pointer; /* 마우스 오버 시 커서 변경 */
  font-size: 16px; /* 폰트 크기 */
  margin-bottom: 10px; /* 버튼 간격 */
}

.userbutton:hover {
  background-color: #0056b3; /* 호버 시 버튼 색상 변경 */
}

.bottom-login {
  margin-top: 20px; /* 하단 섹션 간격 조정 */
}

.signup-con, .passwordFind-container {
  display: inline-block; /* 옆으로 나란히 정렬 */
  margin-right: 10px; /* 버튼 사이의 간격 */
}

.router-link {
  color: #007bff;
  text-decoration: none;
}

.router-link:hover {
  text-decoration: underline;
}

.sns-login {
  text-align: center; /* 중앙 정렬 */
  margin-top: 20px; /* 상단 여백 */
  position: relative;
  left:-5px;
}


.login-btn-class {
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  gap: 10px; /* 버튼 사이 간격 */
}
.btn-kakao-login {

  color: #3C1E1E; /* 글자 색상 */
  border-radius: 5px; /* 모서리 둥글게 */
}
.btn-naver-login {

  color: #FFFFFF; /* 글자 색상 */
  border-radius: 5px; /* 모서리 둥글게 */
}
.btn-kakao-login-img {
  width: 90px; /* SNS 로그인 버튼 크기 조정 */
  position: relative;
  left:-20px;
  height: 45px;
}
.btn-naver-login-img{
  width: 100px;
  height: 40px;
}
</style>