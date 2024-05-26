<template>
  <div id="ContestCommentWrite">
    <div class="userId-container">

      <!-- 작성창 -->
      <div v-if="this.userId"  ref="form">
        <div class="comment-input" style="width: 97%;">
          <input type="text" v-model="content" placeholder="댓글을 입력하세요" class="comment-form" :disabled="false">
          <button type="submit" class="btn btn-secondary rounded-circle" style="background-color: #80C85F" @click="writeComment">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="20" fill="#FFFFFF" class="bi bi-arrow-up-circle" viewBox="0 0 16 16">
              <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- 로그인 안되어있을 시 로그인 화면으로 안내 -->
      <div v-else class="d-flex justify-center pb-5" style="font-size: medium">
        댓글 작성은&nbsp; <router-link to="/login" style=" color: rgb(48,82,58,100%); font-weight: 550; text-decoration-line: underline;"> 로그인 </router-link> &nbsp;후에 가능합니다.
      </div>
    </div>

  </div>

</template>

<script>
import Store from "@/store/index";

export default {
  name: "ContestCommentWrite",
  data() {
    return {
      userId: Store.state.userId,
      content: "",
      parentId: 0,
    }
  },
  methods: {
    writeComment(){
      if(this.userId){
        const { content, parentId } = this;
        this.$emit("submit", { content, parentId });
        this.content = ""; // 답글 작성 양식을 초기화
      }

    }
  },
  created() {
  }
}
</script>

<style scoped>
#ContestCommentWrite{
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: relative;
  width: 100%;
  height: auto;
}
.userId-container{
  position: relative;
  width: 87%;
  left: 5px;
}
.comment-input input[type="text"] {
  flex: 1;
  height: 50px;
  border: 1px solid rgb(141,141,141,70%);
  border-radius: 6px;
  padding: 10px;
  font-size: 16px;
}
.comment-input button {
  padding: 1px 15px;
  border: none;
  cursor: pointer;
  margin-left: 10px;
}

</style>