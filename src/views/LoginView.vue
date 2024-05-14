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
              <button v-on:click="loginClick" class="userbutton" @click="login"> 로그인 </button>
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

        <div class="sns-login" style="position: fixed; left:16.5%; top:600px;">
          sns 계정으로 간편 로그인
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
  font-family: Inter;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width:100%;
  margin: auto;
  padding:130px;
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

  margin: auto;
}

.login-wrapper {
  width: 50%;
  margin: auto;
}

.login-header {
  position: relative;
  font-size: 42px;
  margin: auto;
  gap: 13px;
  width:100%;
  left:-40px;
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

.userbutton {
  background-color: RGB(128, 200, 95, 90%);
  color: cornsilk;
  border-color: #80C85F;
  border-radius: 6px;
  margin: 10px 10px;
  height: 52px;
  font-size: 19px;
  position: relative;
  width:380px;
  left:10px;
  font-weight: bolder;
}

.bottom-login {
  grid-column: span 2;
  display: flex !important;
  position: relative;
  font-size: 20px;
  margin: auto;
  gap: 15px;
  text-decoration: none;
  color: #757575;
  position: relative;
  left:93px;
  font-weight: bolder;
}

.passwordFind-container {
  text-decoration: none;
  color: #757575;
  text-align: center;
}

.login-btn-class{
  width:100%;
  margin:auto;
  position: relative;
}
.btn-naver-login-img {
  margin: 30px 20px;
  height: 50px;
  position: relative;
  top:20px;
}


.sns-login{
position: relative;
  width: 68%;
  text-align: center;
  left:65px;
  font-weight: bolder;
}

.btn-kakao-login {
  margin: 20px 15px;
  height: 50px;
}

.btn-kakao-login-img {
  height: 50px;
  width: 105px;
  margin: 10px 15px;
  position: relative;
  top:20px;
}

</style>