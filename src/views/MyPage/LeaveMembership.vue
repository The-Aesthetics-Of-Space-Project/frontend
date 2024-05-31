<template>
  <div id="leave" class="d-flex align-items-center justify-content-center">
    <div class="leave-container d-flex flex-column align-items-center justify-content-between">
      <section class="leave-content-wrapper text-left text-secondary font-weight-bold">
        <p>
          탈퇴 후 아이디 <span class="text-success" style="color: #80C85F; font-weight: 650;">{{ $store.state.userId }}</span> 으로 재가입 시 일주일의 시간이 걸리며<br>
          해당 아이디로 작성한 데이터는 복구할 수 없습니다.<br>
          작성한 게시물은 탈퇴 후 삭제할 수 없습니다.
        </p>
      </section>
      <section class="agree-container d-flex align-items-center justify-content-center text-muted font-weight-medium">
        <div class="agree-wrapper form-check">
          <input class="form-check-input" type="checkbox" v-model="isAgreed" id="flexCheckDefault" style="position: relative; left: -14.5em; width: 20px; height: 20px;">
          <label class="form-check-label" for="flexCheckDefault" style="position: relative; left: -11.5em; top:3px; font-size: 17px;">
            안내 사항을 확인하였으며, 이에 동의합니다.
          </label>
        </div>
      </section>
      <section class="agree-btn-wrapper d-flex align-items-center justify-content-center">
        <button type="button" class="btn-agree btn btn-success font-weight-bold"  :disabled="!isAgreed"  @click="deleteUsers()" style="height: 50px; background-color: #80C85F; border-color: #80C85F; position: relative; left: 2em;">
          확인
        </button>
      </section>
    </div>
  </div>
</template>

<script>
import { api } from "@/api/api";
import Store from "@/store/index";

export default {
  data() {
    return {
      isAgreed: false,
      userId: Store.state.userId
    };
  },
  methods: {
    async deleteUsers() {
      if (!this.isAgreed) {
        alert("안내 사항을 확인하고 동의해 주세요.");
        return;
      }
      const args = `/users/delete?userId=${encodeURIComponent(this.userId)}`;
      await api.deleteUser(args).then(res => {
        alert("회원 탈퇴 되었습니다.");
        this.$store.commit('clearUsername');
        this.$router.push('/login');
      }).catch(err => {
        alert("회원 탈퇴에 실패했습니다.");
        console.log(err);
      });
    }
  }
};
</script>

<style>
#leave {
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  width: 100%;
  height: 90vh;
  text-align: left;
}

.leave-container {
  width: 90%;
  max-width: 1080px;
  height: 50%;
}

.leave-content-wrapper {
  width: 80%;
  max-width: 750px;
  font-size: 1.5rem;
}

.agree-container {
  width: 80%;
  max-width: 500px;
  font-size: 0.9rem;
  margin-top: -180px;
  margin-left: -1em;
}

.form-check-input:checked {
  background-color: #80C85F;
  border-color: #B1B3B9;
  box-shadow: #80C85F;
  accent-color: #80C85F;
}

.btn-agree:disabled {
  background-color: #d3d3d3;
  cursor: not-allowed;
}

.agree-btn-wrapper {
  width: 20%;
}

.btn-agree {
  width: 100%;
  height: 40px;
  border-radius: 12px;
  font-size: 1rem;
  margin-top: -250px;
}

@media (max-width: 768px) {
  .leave-content-wrapper {
    font-size: 1rem;
  }
  .agree-container {
    font-size: 1.5rem;
  }
  .btn-agree {
    height: 35px;
    font-size: 0.9rem;
  }
}
</style>
