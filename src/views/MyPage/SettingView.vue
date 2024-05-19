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
          <section class="setting-email-wrapper">
            <section class="setting-email-content">
              <a> 이메일 </a>
            </section>
            <!-- 이메일 입력 폼 -->
            <section class="email-input-wrapper">
              <div class="input-group" style="position: relative; margin-bottom: 20px;">
                <input type="text" class="form-control invalid" placeholder="이메일" v-model="user.userId"
                       id="emailInput" aria-describedby="emailHelp" @input="checkUserId" style="border-radius: 6px; height: 40px; font-size: 14px;">
                <div><span id="checkId" style="width: 100px; font-size: 13px; top:-10px;" @input="checkUserId"></span></div>
              </div>

            </section>

          </section>
          <!-- 닉네임 헤더 -->
          <section class="setting-nickname-wrapper">
            <section class="setting-email-content">
              <a> 닉네임 </a>
            </section>
            <section class="setting-form-text-nickname">
              <a> 다른 유저와 겹치지 않도록 입력해주세요. (2~15자) </a>
            </section>
            <!-- 닉네임 입력 form -->
            <section class="form-group-nickname-wrapper">
              <div class="input-group" style="top: 10px; left: 35px; position: relative; width: 89%; margin-bottom: 10px;">
                <input type="nickname" v-model="user.nickname" class="form-control invalid" placeholder="닉네임" aria-label="Nickname"
                       id="nicknameInput" @input="checkNickname" maxlength="15" style="border-radius: 6px; height: 40px; font-size: 14px;">
                <div><span id="checkNickname" style="width: 100px; font-size: 13px;" @input="checkNickname"></span></div>
              </div>
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
              <section class="profile-img-wrapper">
                <img :src="imgUrl" v-if="imagePreview" alt="이미지 미리보기"/>
              </section>
            </section>
            <section class="profile-submit-btn" style="position: relative; width: 56%; height: 19%; display: grid; grid-template-columns: 1fr 3fr; grid-template-rows: 1fr;
                                                          top: 1.5em; left: 2.5em;" >
              <label style="position: relative;width: 73%; height: 84%; margin: auto; cursor: pointer;">

                <img src="../../assets/mypage_icon/plusimage.png" class="upload-btn-img"  style="position: relative;
               border-radius: 50%; width: 100%; height: 100%;">
                <input type="file" class="btn-img-button" style="position: relative; border: 1px solid chocolate; margin: auto;
                background-color: white; border-radius: 50%; width: 100%; height: 100%; display: none;" @change="handleFileUpload">
              </label>
              <section style="position: relative; margin: auto; height: 50%; left: -2.4em; top: 3px; font-size: 14px; font-weight: bold; color:rgb(0,0,0,60%);">
                <p> 플러스 버튼을 눌러보세요! </p>
              </section>

            </section>


          </section>
          <!-- 수정 완료 버튼 -->
          <div class="user-modify-btn-wrapper">
            <button type="button" class="btn-modify" id="modifyButton" @click="userInfoModify($store.state.userId)"> 수정하기 </button>
          </div>

        </div>
      </section>
    </div>
  </div>

</template>

<script>
import {api} from "@/api/api";

export default {
  data() {
    return{
      user:{
        userId: '',
        nickname: '',
        email:'',
        profile: '',
      },
      users:[],
      imgUrl: null,
      image: null,
    }
  },
  computed:{
    imagePreview() {
      return this.image ? URL.createObjectURL(this.image) : '';
    },
    hasImg(){
      return !!this.image;
    }
  },
  mounted() {
    this.getUser();
  },
  methods: {
    /* user 목록 조회 */
    async getUser() {
      await api.getUser('/user').then(res => {
        this.users = res.data;
      })
    },
    checkUserId() {
      // ID(email) 입력란 변수화
      const idInput = document.querySelector("#emailInput");

      // ID(email) 형식 검증
      const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
      };

      // ID(email) 형식 확인
      const checkEmail = () => {
        const email = idInput.value;
        const emailMessage = document.querySelector("#checkId");

        if (validateEmail(email)) {
          emailMessage.textContent = '올바른 이메일 형식입니다.';
          emailMessage.style.color = '#2fb380';
          document.getElementById("emailInput").classList.remove("is-invalid");
          document.getElementById("emailInput").classList.add("is-valid");
        } else {
          emailMessage.textContent = '올바른 이메일 형식이 아닙니다.';
          emailMessage.style.color = '#dc3545';
          document.getElementById("emailInput").classList.remove("is-valid");
          document.getElementById("emailInput").classList.add("is-invalid");
        }
      };
      // ID(email) 입력란에 keyup 이벤트 핸들러 추가
      idInput.addEventListener("keyup", checkEmail);
    },
    async checkNickname(){

      const nicknameInput = document.querySelector("#nicknameInput");
      const nicknameMessage = document.querySelector("#checkNickname");

      const nickname = this.user.nickname;
      console.log("nickname: ",nickname);
      if (nickname.length < 2 || nickname.length > 15) {
        nicknameMessage.textContent = '닉네임은 2~15자 사이여야 합니다.';
        return;
      }
      const checkNickname = () => {

        const available = this.users.every(user => user.nickname !== nickname);
        console.log("출력하셈미", available);

        if (available) {
          nicknameMessage.textContent = '사용 가능한 닉네임입니다.';
          nicknameMessage.style.color = '#2fb380';
          document.getElementById("nicknameInput").classList.remove("is-invalid");
          document.getElementById("nicknameInput").classList.add("is-valid");
        } else {
          nicknameMessage.textContent = '이미 사용 중인 닉네임입니다.';
          nicknameMessage.style.color = '#dc3545';
          document.getElementById("nicknameInput").classList.remove("is-valid");
          document.getElementById("nicknameInput").classList.add("is-invalid");
        }
      }

      // 닉네임 입력란에 keyup 이벤트 핸들러 추가
      nicknameInput.addEventListener("keyup", checkNickname);

    },
    /* 이미지 업로드 */
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) {
        return;
      }
      this.image = file; // 이미지 파일을 저장

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imgUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    async userInfoModify(userId){
      const presentUserId=userId;
      const formData = new FormData();
      formData.append('userId', this.user.userId);
      formData.append('nickname', this.user.nickname);
      if (this.user.profile) {
        formData.append('profile', this.user.profile);
      }

      const args=`/user/${encodeURIComponent(presentUserId)}`;
      const params = formData;
      await api.updateUser(args, params).then(res => {
        console.log("수정 성공: ", res);
        for (let key of formData.keys()) {
          console.log(key, ":", formData.get(key));
        }
      })
    }
  }

};
</script>

<style>
#setting {
  font-family: inherit;
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
.setting-email-wrapper{
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
/* 이메일 입력칸 */
.email-input-wrapper{
  position: relative;
  margin: auto;
  width: 80%;
  height: 60%;
  top: 26px;
}
.input-group input[type="text"],
.input-group input[type="nickname"] {
  width: 100%;
  padding: 10px; /* 패딩 조정 */
  margin: 5px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 14px; /* 폰트 크기 조정 */
}
/* 닉네임 */
.setting-nickname-wrapper{
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
  width: 90%;
  height: 60%;
  top: 30px;
  left: -5px;
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
  left: 3.5em;
  top: 15px;
  width: 40%;
  height: 65%;
  border: 1px solid #D9D9D9;
  border-radius: 7px;
}
.profile-img-wrapper{
  position: relative;
  width: 100%;
  height: 100%;
}
.profile-img-wrapper img{
  position: relative;
  width: 100%;
  height: 100%;
}
/* 버튼 */
.user-modify-btn-wrapper{
  position: relative;
  width: 45%;
  height: 10%;
  top: 1.3em;
  align-content: center;
  margin: auto;
}
.btn-modify{
  width: 40%;
  height: 62%;
  font-weight: 550;
  border: none;
  border-radius: 12px;
  background-color: #80C85F;
  font-size: 17px;
  color: floralwhite;
}
</style>