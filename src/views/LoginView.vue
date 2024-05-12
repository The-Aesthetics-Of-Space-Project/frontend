<template>
  <div id="login">
    <div class="login-container">
      <div class="login-wrapper">
        <section class="login-header">
          <section class="logo-container" href="/login">
            <img src="../assets/ziplogo.png">
          </section>
          <a class="logofont" href="/login"> .zip </a>
        </section>
        <div class="el-input el-input-line">
          <!-- email 입력 -->
          <form>
            <div class="form-group">
              <input type="text" class="form-control invalid" id="inputEmail" aria-describedby="emailHelp" placeholder="Email" v-model="userId">
              <div><span id="checkId"></span></div>
            </div>
            <!-- password 입력 -->
            <div class="form-group has-success">
              <!-- 비밀번호 입력 -->
              <input type="password" class="form-control valid" id="inputPW" name="PW" placeholder="Password" v-model="password">
              <div class="valid-feedback"></div>
            </div>

            <div class="d-grid gap-2">
              <button v-on:click="loginClick" class="btn-loginIn" @click="login"> 로그인 </button>
              <div> <h2> {{num}} </h2></div>
            </div>
            <section class="bottom-login">
              <section class="signup-container">
                <nav>
                  <router-link to="/signup">회원가입</router-link>
                </nav>
              </section>
              <section class="passwordFind-container">
                <nav>
                  <router-link to="/password">비밀번호 찾기</router-link>
                </nav>
              </section>
              <router-view></router-view>
            </section>
          </form>
        </div>
        <div class="sns-login">
          <section class="sns-login-wrapper">
            <a> sns 계정으로 간편 로그인 </a>
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

      </div>
    </div>

  </div>
</template>

<script>

import axios from "axios";

export default {
  name: 'LoginView',
  el: '#login',
  data() {
    return {
      userId: '',
      password: ''
    }
  },
  methods: {
    login() {
      if (!this.userId || !this.password) {
        alert('아이디 또는 빈칸을 입력해 주세요.');
        return; // 함수 실행 중지
      }
      const userData = {
        userId: this.userId,
        password: this.password,
      };

      // 보내기 전 데이터 확인
      console.log('Sending data', userData);

      axios.post('https://85fa0ceb-630c-4aa0-b333-1084fe8b5dc5.mock.pstmn.io/login', userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
          .then(response => {
            // 서버 응답 로그
            console.log('Response data', response.data);
            // 여기서 response.data를 사용하여 this.userId, this.password, this.nickname 값을 업데이트
            alert('로그인 성공에 성공하였습니다.');
            //세션 값 저장
            this.$store.commit('setUserId', response.data.userId);
            //페이지 이동
            this.$router.push('/');

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

<style>

#login {
  font-family: Inter;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

nav {
  padding: 10px;
}

nav a {
  font-weight: 460;
  color: RGB(117, 117, 117);
  text-decoration: none;
  font-size: 16px;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.login-container {
  width: 50%;
  max-width: 1280px;
  margin: 5% 18%;

}

.login-wrapper {
  width: 50%;
  margin: 10% 50%;
}

.login-header {
  grid-column: span 2;
  display: flex !important;
  position: relative;
  font-size: 42px;
  font-weight: 650;
  margin: 20px 5px;
  align-items: center;
  gap: 13px;
}

a.logofont {
  text-decoration: none;
  color: RGB(128, 200, 95);
  font-weight: 600;
}

.el-input {
  width: 500px;
  position: relative;
  font-size: 14px;
  display: inline-block;
  margin: 15px 3px;
}

.el-input-line .el-input__inner {
  padding-right: 15px;
  width: 500px;
}

.el-input__inner:focus {
  border-color: #15611D;
}

.el-input__inner {
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  height: 40px;
  width: 100%;
  line-height: 40px;
  padding: 0 15px;
}

.form-group {
  margin: 5px 10px;
  height: 30px;
  width: 400px;
  padding-bottom: 70px;
}

.btn-loginIn {
  background-color: RGB(128, 200, 95, 90%);
  color: cornsilk;
  border-color: #80C85F;
  border-radius: 6px;
  margin: 10px 10px;
  height: 40px;
  font-size: 22px;
}

.bottom-login {
  grid-column: span 2;
  display: flex !important;
  position: relative;
  font-size: 18px;
  font-weight: 500;
  margin: 30px 25px;
  align-items: center;
  gap: 15px;
  text-decoration: none;
  color: #757575;
}

.passwordFind-container {
  text-decoration: none;
  color: #757575;
  text-align: center;
}

.btn-naver-login-img {
  margin: 30px 20px;
  height: 50px;
}

.sns-login-wrapper {
  text-decoration: none;
  color: #757575;
  text-align: center;
  margin: 10px 15px;
}

.login-btn-wrapper {
  grid-column: span 2;
  display: flex !important;
  position: relative;
}

.btn-kakao-login {
  margin: 20px 15px;
  height: 50px;
}

.btn-kakao-login-img {
  height: 50px;
  width: 105px;
  margin: 10px 15px;
}

</style>