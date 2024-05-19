<template>
  <div id="login">
    <div class="login-container">
      <div class="login-wrapper">
        <section class="login-header">
          <ZipLogo></ZipLogo>
          <logofont style="position:relative; top:-100px;"></logofont>
        </section>
        <div class="el-input el-input-line">
          <!-- email 입력 -->
          <form>
            <div class="form-group" style="position: relative; top:-30px;">
              <input type="text" id="inputEmail" class="text-put-clas" aria-describedby="emailHelp" placeholder="이메일" v-model="userId" style="height: 45px; border-radius: 3px; font-size: 14px; width: 300px;">
              <div><span id="checkId"></span></div>
            </div>
            <!-- password 입력 -->
            <div class="form-group has-success" style="position: relative; top:-10px;">
              <!-- 비밀번호 입력 -->
              <input type="password"  id="inputPW" class="text-put-clas" name="PW" placeholder="비밀번호" v-model="password" style="height: 45px; position: relative; top: -21px; border-radius: 3px; font-size: 14px;width: 300px;">
              <div class="valid-feedback"></div>
            </div>

            <div class="d-grid gap-2">
              <button v-on:click="loginClick" class="userbutton" @click="login" style="position: relative; top:-35px;left:-5px; width:290px;"> 로그인 </button>
              <div> <h2> {{num}} </h2></div>
            </div>
            <section class="bottom-login">
              <section class="signup-con">
                <nav>
                  <router-link to="/signup" style="text-decoration: none; color:gray; font-family: MyCustomFont2" class="rou-sgn">회원가입</router-link>
                </nav>
              </section>
              <section class="passwordFind-container">
                <nav>
                  <router-link to="/password" style="text-decoration: none; color:gray; font-family: MyCustomFont2" class="rou-sgn">비밀번호 찾기</router-link>
                </nav>
              </section>
              <router-view></router-view>
            </section>
          </form>
        </div
        >
        <div style="border: 1px solid lightgray; border-bottom: thin; position: relative; top:-27px; width:55%; margin: auto;">
        </div>

        <div class="sns-login" style="font-weight: bold; font-size: 16px; position: relative; top:-25px; font-family: MyCustomFont2;">
          sns 계정으로 간편 로그인
        </div>

        <div class="login-btn-class">
          <section class="login-btn-wrapper">
            <el-button type="button" class="btn-kakao-login">
              <img src="../assets/kakao_login_large.png" class="btn-kakao-login-img" style="position: relative; top:-10px; width: 80px; height: 40px;">
            </el-button>
            <el-button type="button" class="btn-naver-login">
              <img src="../assets/naver_login_btn.png" class="btn-naver-login-img"style="position: relative; top:-10px; width: 95px; height: 40px;">
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
import ZipLogo from "@/components/ZipLogo.vue";
import {api} from "@/api/api";

export default {
  name: 'login',
  components: {ZipLogo, Logofont},
  el: '#login',
  data() {
    return {
      userId: '',
      password: ''
    }
  },
  methods: {

    async login() {

      // 입력값 검증
      if (!this.userId && !this.password) {
        alert('아이디와 비밀번호를 입력해 주세요.');
      } else if (!this.userId) {
        alert('아이디를 입력해 주세요.');
      } else if (!this.password) {
        alert('비밀번호를 입력해 주세요.');
      } else {

        await api.getUser('/users').then(res => {
          this.users = res.data;
              // 서버 응답 로그
              console.log('Response data', res.data);
              // 로그인 성공 알림
              alert('로그인에 성공하였습니다.');
              // 세션 값 저장
              this.$store.commit('setUserId', res.data.userId);
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
@font-face {
  font-family: 'MyCustomFont2';
  src: url('../fonts/Interop-Regular.otf') format('woff');
  font-weight: normal;
  font-style: normal;
}

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


.el-input, .form-group {
  margin-bottom: 20px; /* 입력 필드 간격 조정 */
  width:300px;
  margin: auto;
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

.sns-login {
  text-align: center; /* 중앙 정렬 */
  margin-top: 20px; /* 상단 여백 */
  position: relative;
  left:-5px;
}


.login-btn-class {
  display: flex;
  justify-content: center;
  gap: 10px; /* 버튼 사이 간격 */
}
.btn-kakao-login {

  color: #3C1E1E;
  border-radius: 5px;
}
.btn-naver-login {

  color: #FFFFFF; /* 글자 색상 */
  border-radius: 5px;
}
.btn-kakao-login-img {
  width: 90px;
  position: relative;
  left:-20px;
  height: 45px;
}
.btn-naver-login-img{
  width: 100px;
  height: 40px;
}
.rou-sgn{
  position: relative;
  top:-35px;
  font-size: 14px;
}
.text-put-clas{
  border: 1px solid lightgray;
}
</style>