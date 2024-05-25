<template>
  <div id="commentDetails">

  </div>

</template>

<script>
import {api} from "@/api/api";
import Store from "@/store/index";
export default {
  name: "CommentDetails",
  props: {
    // CommentList에서 불러옴
    comments: {
      Array
    }
  },
  data() {
    return {
      isEditing: false,
      modifiedComment: "",
      commentNo: "",
      userId: Store.state.userId,
      nickname: Store.state.nickname,
      showReplyForm: false
    }
  },
  methods: {
    toggleReplyForm(){
      this.showReplyForm=true;
    },
    submitModifiedComment() {
      this.commentNo = this.item.commentNo
      const { commentNo, modifiedComment } = this
      this.$emit("submit", { commentNo, modifiedComment })
      this.isModify = false
    },
    async submitDeletedComment() {
      await this.requestDeleteCommentAtBoardToSpring( this.item.commentNo )
      await this.$router.go()
    }
  },
}
</script>

<style>
#commentDetails{
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: relative;
  width: 100%;
  height: 180px;
}
</style>