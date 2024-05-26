<template>
  <div id="leave">
    <div class="leave-container">
      <section class="leave-content-wrapper">
        <a>
          탈퇴 후 아이디 <span style="color: #80C85F"> {{ $store.state.userId }} </span> 으로 재가입 시 일주일의 시간이 걸리며<br>
          해당 아이디로 작성한 데이터는 복구할 수 없습니다.<br>
          작성한 게시물은 탈퇴 후 삭제할 수 없습니다.<br>
        </a>
      </section>
      <section class="agree-container">
        <div class="agree-wrapper form-check">
          <input class="form-check-input" type="checkbox" v-model="isAgreed" id="flexCheckDefault">
          <label class="form-check-label" for="flexCheckDefault">
            안내 사항을 확인하였으며, 이에 동의합니다.
          </label>
        </div>
      </section>
      <section class="agree-btn-wrapper">
        <button type="button" class="btn-agree" :disabled="!isAgreed" @click="deleteUsers()"> 확인 </button>
      </section>

    </div>

  </div>
</template>

<script>
import {api} from "@/api/api";
import Store from "@/store/index";
export default {
  data() {
    return {
      isAgreed: false, // 체크박스 상태 관리
      userId: Store.state.userId
    };
  },
  mounted(){
  },
  methods: {
    async deleteUsers(){
      const args=`/users/delete?userId=${encodeURIComponent(this.userId)}`;
      await api.deleteUser(args).then(res =>{
        alert("회원 탈퇴 되었습니다.");
        this.$store.commit('clearUsername');
        // 로그인 페이지로 이동
        this.$router.push('/login');
      }).catch(err => {
        alert("회원 탈퇴에 실패했습니다.");
        console.log(err);
      })
    }
  },
};
</script scoped>

<style>
#leave {
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  width: 100%;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.leave-container {
  width: 90%;
  max-width: 1080px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-left: 100px;
  height: 50%;
}
.leave-content-wrapper {
  width: 80%;
  max-width: 750px;
  font-weight: 550;
  color: #B1B3B9;
  font-size: 21px;
  text-align: left;
  margin-top: 20px;
}
.agree-container {
  width: 80%;
  max-width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  color: rgb(0, 0, 0, 50%);
  font-size: 15px;
  margin-top: -180px;
  margin-right: 430px;
}
.form-check-input:checked {
  background-color: #80C85F;
  border-color: #B1B3B9;
  box-shadow: #80C85F;
  accent-color: green;
}
.btn-agree:disabled {
  background-color: #d3d3d3;
  cursor: not-allowed;
}
.agree-btn-wrapper {
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-agree {
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 12px;
  background-color: #80C85F;
  font-size: 1rem;
  font-weight: 550;
  color: floralwhite;
  margin-top: -250px;
}
@media (max-width: 768px) {
  .leave-content-wrapper {
    font-size: 1rem;
  }
  .agree-container {
    font-size: 0.9rem;
  }
  .btn-agree {
    height: 35px;
    font-size: 0.9rem;
  }
}
</style>