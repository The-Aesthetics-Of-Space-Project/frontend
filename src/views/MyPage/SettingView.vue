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
              <div class="input-group">
                <input type="text" class="form-control invalid" placeholder="이메일" v-model="user.userId" id="emailInput" aria-describedby="emailHelp" @input="checkUserId" style="border-radius: 6px; height: 40px; font-size: 14px;">
                <div><span id="checkId" style="font-size: 13px;" @input="checkUserId"></span></div>
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
              <input type="text" v-model="user.nickname" class="nickname-input-form" placeholder="닉네임" aria-label="Nickname">
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
                <img :src="imgUrl" v-if="imagePreview" alt="이미지 미리보기"/>
                <input type="file" class="btn-img-button"  style="position: relative; border: none;
                background-color: white; border-radius: 50%; width: 60%; height: 60%; top: 30px;"/>
                <img src="../../assets/mypage_icon/plusimage.png" class="upload-btn-img" @change="handleFileUpload">

              </label>
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
import Store from "@/store/index";

export default {
  data() {
    return{
      user:{
        userId: '',
        nickname: '',
        email:'',
        profile: '',
      },
      imgUrl: null,
      image: null,
    }
  },
  computed:{
    imagePreview() {
      return this.image ? URL.createObjectURL(this.image) : '';
    },
  },
  methods: {
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
        const emailMessage = document.querySelector("#emailInput");

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
    /* 이미지 업로드 */
    handleFileUpload(event) {
      this.user.profile = event.target.files[0];
      if(!this.user.profile){
        return;
      }
      this.image = this.user.profile; // 이미지 파일을 저장

      const formData = new FormData(); // file전송시 FormData 형식으로 전송
      formData.append('filelist', file);

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imgUrl = e.target.result;
      };
      reader.readAsDataURL(this.user.profile);
    },
    async userInfoModify(userId){
      const presentUserId=userId;
      const formData = new FormData();
      formData.append('userId', this.user.userId+'@'+this.user.email);
      formData.append('nickname', this.user.nickname);
      if (this.user.profile) {
        formData.append('profile', this.user.profile);
      }

      const args=`/user/${presentUserId}`;
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
.valid-text-container{
  position: relative;
  margin: auto;
  width: 50%;
  height: 40%;
  text-align: left;
  left: -6em;
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
.nickname-input-form:focus{
  position: relative;
  width: 90%;
  height: 98%;
  left: 10px;
  border: none;
  border-radius: 7px;
  margin: auto;
  outline: 2px solid rgb(48,82,58,100%);
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
  width: 45%;
  height: 20%;
  top: -50px;
  align-content: center;
  margin: auto;
}
.btn-modify{
  width: 40%;
  height: 30%;
  font-weight: 550;
  border: none;
  border-radius: 12px;
  background-color: #80C85F;
  font-size: 17px;
  color: floralwhite;
}
</style>