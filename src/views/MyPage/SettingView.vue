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
          <!-- 비밀번호 헤더 -->
          <section class="setting-password-wrapper">
            <section class="setting-password-content">
              <a> 비밀번호 </a>
              <section class="setting-form-text-pass setting-form-text-nickname"
              style="position: relative;width: 75%;height: 10%;top: 4px;margin: auto;left: 15.7em;font-size: 13px; font-weight: normal;">
                <a> 대소문자, 숫자, 특수문자를 포함한 8자 이상을 입력하세요. </a>
              </section>
            </section>
            <!-- 비밀번호 입력 폼 -->
            <section class="password-input-wrapper">
              <div class="input-group" style="position: relative; margin-bottom: 20px;">
                <input type="text" class="form-control invalid" placeholder="비밀번호" v-model="user.password"
                       id="passwordInput" aria-describedby="passwordHelp" @input="setCheckPassword" style="border-radius: 6px; height: 40px; font-size: 14px;">
                <div><span id="checkpassword" style="width: 100px; font-size: 13px; top:-10px;" @input="setCheckPassword"></span></div>
              </div>
            </section>
          </section>
          <!-- 닉네임 헤더 -->
          <section class="setting-nickname-wrapper">
            <section class="setting-password-content">
              <a> 닉네임 </a>
            </section>
            <section class="setting-form-text-nickname">
              <a> 다른 유저와 겹치지 않도록 입력해주세요. (2~15자) </a>
            </section>
            <!-- 닉네임 입력 form -->
            <section class="form-group-nickname-wrapper">
              <div class="input-group" style="top: 10px; left: 35px; position: relative; width: 89%; margin-bottom: 10px;">
                <input type="nickname" v-model="user.nickname" class="form-control invalid" placeholder="닉네임" aria-label="Nickname"
                       id="nicknameInput" @input="checkNickname" minlength="2" maxlength="15" style="border-radius: 6px; height: 40px; font-size: 14px;">
                <div><span id="checkNickname" style="width: 100px; font-size: 13px;" @input="checkNickname"></span></div>
              </div>
            </section>
          </section>
          <!-- 프로필 -->
          <section class="profile-content-wrapper">
            <section class="profile-header-wrapper setting-password-content">
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
            <button type="button" class="btn-modify" id="modifyButton" @click="userInfoModify()"> 수정하기 </button>
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
      userId: Store.state.userId,
      imgUrl: null,
      image: null,
      user:{
        userId: '',
        nickname: '',
        profile: '',
        password: ''
      },
      isNicknameChecked : false,
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
  },
  methods: {
    setCheckPassword() {
      // 입력란 변수화
      const passwordInput = document.querySelector("#passwordInput");

      // 형식 검증
      const validatePass = (password) => {
        const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W]).{8,}$/;
        return passPattern.test(password);
      };

      // 형식 확인
      const checkPass = () => {
        const password = passwordInput.value;
        const passMessage = document.querySelector("#checkpassword");

        if (validatePass(password)) {
          passMessage.textContent = '올바른 비밀번호 형식입니다.';
          passMessage.style.color = '#2fb380';
          document.getElementById("passwordInput").classList.remove("is-invalid");
          document.getElementById("passwordInput").classList.add("is-valid");
        } else {
          passMessage.textContent = '올바른 비밀번호 형식이 아닙니다.';
          passMessage.style.color = '#dc3545';
          document.getElementById("passwordInput").classList.remove("is-valid");
          document.getElementById("passwordInput").classList.add("is-invalid");
        }
      };
      // 입력란에 keyup 이벤트 핸들러 추가
      passwordInput.addEventListener("keyup", checkPass);
    },
    checkNickname(){
      const nicknameInput = document.querySelector("#nicknameInput");
      const nicknameMessage = document.querySelector("#checkNickname");
      const nickname = this.user.nickname;

      if (nickname.length > 2 || nickname.length < 15) {
        const NicknameCheck = () => {
          const nicknameValue = nicknameInput.value;
          const args = `/checknickname/${nicknameValue}`;
          this.isNicknameChecked=true;
          api.getUser(args).then(res => {
                const result = res.data;
                console.log("result 값임!!!!: ", result)
                if (result) {
                  nicknameMessage.textContent = '사용 가능한 닉네임입니다.';
                  nicknameMessage.style.color = '#2fb380';
                  document.getElementById("nicknameInput").classList.remove("is-invalid");
                  document.getElementById("nicknameInput").classList.add("is-valid");
                  this.isNicknameAvailable = true;
                } else if(!result) {
                  nicknameMessage.textContent = '이미 사용 중인 닉네임입니다.';
                  nicknameMessage.style.color = '#dc3545';
                  document.getElementById("nicknameInput").classList.remove("is-valid");
                  document.getElementById("nicknameInput").classList.add("is-invalid");
                  this.isNicknameAvailable = false;
                }
              }
          ).catch(error => {
            if (error.response) {
              alert("서버 오류가 발생했습니다. 나중에 다시 시도해주세요.");
            } else if (error.request) {
              alert("서버 응답이 없습니다. 네트워크 연결을 확인해주세요.");
            } else {
              alert("요청을 처리하는 중 오류가 발생했습니다.");
            }
          });
        }
        const handleKeyup = () => {
          let debounceTimer;
          clearTimeout(debounceTimer); // 기존 타이머 취소
          debounceTimer = setTimeout(NicknameCheck, 2000); // 2초 후에 중복 검사 함수 실행
        };
        // 닉네임 입력란에 keyup 이벤트 핸들러 추가
        nicknameInput.addEventListener("keyup", handleKeyup);
      }
    },
    /* 이미지 업로드 */
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) {
        return;
      }
      this.image = file; // 이미지 파일을 저장
      this.user.profile = this.image;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imgUrl = e.target.result;
      };
      reader.readAsDataURL(file);

    },
    async userInfoModify(){
      const formData = new FormData();
      const presentUserId = this.userId;

      formData.append('password', this.user.password);
      formData.append('nickname', this.user.nickname);
      formData.append('profile', this.image);

      for (let key of formData.keys()) {
        console.log(key, ":", formData.get(key));
      }

      const args=`/users/update?userId=${encodeURIComponent(presentUserId)}`;
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
  top: 8em;
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
/* 비밀번호 */
.setting-password-wrapper{
  position: relative;
  width: 50%;
  height: 17%;
  margin: auto;
}
.setting-password-content{
  position: relative;
  right: 35%;
  top: 20px;
  font-size: 18px;
  font-weight: 550;
}
/* 이메일 입력칸 */
.password-input-wrapper{
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
  top: 8px;
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
  top: 25px;
  left: -5px;
  margin: auto;
}
/* 프로필 */
.profile-content-wrapper{
  position: relative;
  width: 50%;
  height: 40%;
  top: 25px;
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
  top: 2.6em;
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