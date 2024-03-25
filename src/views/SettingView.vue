<template>
  <div id="setting">
    <div class="header-container">
      <div class="leave-membership">
        <section class="leave-membership-wrapper">
          <nav>
            <router-link to="/leave"> 탈퇴하기 </router-link>
          </nav>
        </section>
      </div>
        <section class="header-wrapper">
          <a> 회원정보 수정 </a>
        </section>

    </div>

      <div class="content-container">
          <section class="email-wrapper">
            <section class="email-content">
              <a> 이메일 </a>
            </section>
            <!-- 이메일 입력 -->
            <div class="input-group">
              <input type="text" class="form-control" placeholder="이메일" aria-label="Username">
              <span class="input-group-text">@</span>
              <input type="text" class="form-control email-input" aria-label="Server">
            </div>
          </section>
            <section class="nickname-wrapper email-wrapper">
              <section class="nickname-content email-content">
                <a> 닉네임 </a>
              </section>

              <section class="form-text-nickname form-text">
                <a> 다른 유저와 겹치지 않도록 입력해주세요. (2~15자) </a>
              </section>

              <div class="form-group-nickname form-group">
                <!-- 닉네임 입력 -->
                <input type="nickname" class="form-control invalid" placeholder="닉네임" id="nickname">
              </div>



            </section>

        <section class="profile-content">
          <section class="profile-header-wrapper email-wrapper">
            <section class="profile-header-content email-content">
              <a> 프로필 </a>
            </section>

          </section>
          <section class="profile-wrapper">
            <section class="profile-img-wrapper">
              <el-button type="button" class="btn-img-button">
                <img src="../assets/plusimage.png" class="upload-btn-img">
              </el-button>

            </section>



          </section>
          <div class="d-grid gap-2">
            <el-button type="button" class="btn-loginIn" id="modifyButton"> 회원정보 수정 </el-button>
          </div>

        </section>


    </div>
  </div>

</template>

<script setup>


</script>

<style scoped>
#setting {
  font-family: Inter;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
nav{
  width: 100px;
  margin: 20px 50px;
}
.header-container{
  margin: 20px 80px;
}
.header-wrapper{
  margin: 10px 300px;
  font-weight: 550;
  font-size: 22px;
}
.leave-membership-wrapper{
  margin: 10px 950px;
}
.content-container{
  margin: 10px 400px;
}
.email-wrapper{
  margin: 40px 120px;
}
.input-group{
  margin: 13px 100px;
  width: 67%;
}
.email-input{
  width: 30px;
}
.form-group{
  margin: 7px 150px;
  width: 59%
}
.form-text{
   font-size: 13px;
   margin: 11px -1px;
   width: 100%;
 }
.form-text-nickname{
  margin: 11px -85px;
}
.nickname-wrapper{
  margin: 10px 70px;
}

.profile-header-wrapper{
  margin: 1px 180px;
}
.email-content{
  margin-right: 420px;
  font-size: 19px;
  font-weight: 550;
}
.profile-wrapper{
  margin: 13px 220px;
  border: 1px solid #D9D9D9;
  border-radius: 6px;
  width: 175px;
  height: 160px;
}
.btn-img-button{
  margin: 35px 10px;
}
.upload-btn-img{
  width: 85px;
  height: 85px;
}


</style>