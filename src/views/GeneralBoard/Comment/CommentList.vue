<template>
  <div id="commentList">
    <div class="commentList-container" >
      <div class="commentList-wrapper" v-for="comment in comments" :key="comment.commentId" v-if="comment.parentId===0">
        <!-- 원댓글인 경우 -->
          <div class="list-profile-container">
            <div class="list-profile-wrapper">
              <img :src="comment.profile" style="width: 67px; height: 67px; border: 1px solid black; border-radius: 50%;">
            </div>
            <div class="comment-list-content">
              <div class="comment-nickname-content" style="font-size: 16px;"> {{ comment.nickname }} </div>
              <div class="comments-content" > <section class="comments-content-wrapper"> {{ comment.content }}</section> </div>
              <div class="reply-content" style="color: rgb(0,0,0,60%); font-size: 13px; cursor: pointer;" @click="toggleReplyForm(comment.commentId)"> 답글달기 </div>
            </div>
          </div>
          <div class="comment-right-content">
            <section class="comment-date-content" style="text-align: right">
              {{ comment.date }}
            </section>
            <!-- 댓글 작성자인 경우에만 수정 및 삭제 버튼 표시 -->
            <section class="right-comment-modi-dele-container" >
              <section class="comment-modify-content" @click="submitModifiedComment">수정</section>
              <section class="comment-delete-content" @click="submitDeletedComment">삭제</section>
            </section>

          </div>

          <!-- 답글달기 창 -->
          <div v-if="showReplyForm === comment.commentId">
            <!-- 작성창 -->
            <div ref="form">
              <div class="reply-input" style="width: 150%; height: 70px;">
                <input type="text" v-model="replyText" placeholder="답글을 입력하세요" class="reply-form" :disabled="false">
                <button type="submit" class="btn btn-secondary rounded-circle" style="background-color: #80C85F" @click="writeReply(comment.commentId)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="20" fill="#FFFFFF" class="bi bi-arrow-up-circle" viewBox="0 0 16 16">
                    <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

        <!-- 해당 댓글에 대한 답글 표시 -->
        <div v-for="reply in comments" :key="reply.commentId" v-if="reply.parentId === reply.commentId">
          <div class="list-profile-container">
            <div class="list-profile-wrapper">
              <img src="@/assets/generalboardpage_icon/curvedArrowIcon.png" width="50px" height="50px">
              <img :src="reply.profile" style="width: 67px; height: 67px; border: 1px solid black; border-radius: 50%;">
            </div>
            <div class="comment-list-content">
              <div class="comment-nickname-content" style="font-size: 16px;"> {{ reply.nickname }} </div>
              <div class="comments-content" > <section class="comments-content-wrapper"> {{ reply.content }}</section> </div>
              <div class="reply-content" style="color: rgb(0,0,0,60%); font-size: 13px; cursor: pointer;" @click="toggleReplyForm(reply.commentId)"> 답글달기 </div>
            </div>
          </div>
          <div class="comment-right-content">
            <section class="comment-date-content" style="text-align: right">
              {{ reply.date }}
            </section>
            <!-- 댓글 작성자인 경우에만 수정 및 삭제 버튼 표시 -->
            <section class="right-comment-modi-dele-container" >
              <section class="comment-modify-content" @click="submitModifiedComment">수정</section>
              <section class="comment-delete-content" @click="submitDeletedComment">삭제</section>
            </section>

          </div>

          <!-- 답글달기 창 -->
          <div v-if="showReplyForm === reply.commentId">
            <!-- 작성창 -->
            <div ref="form">
              <div class="reply-input" style="width: 150%; height: 70px;">
                <input type="text" v-model="replyToText" placeholder="답글을 입력하세요" class="reply-form" :disabled="false">
                <button type="submit" class="btn btn-secondary rounded-circle" style="background-color: #80C85F" @click="writeToReply(reply.commentId)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="20" fill="#FFFFFF" class="bi bi-arrow-up-circle" viewBox="0 0 16 16">
                    <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

        </div>


      </div>





    </div>

  </div>

</template>

<script>
import {api} from "@/api/api";
import Store from "@/store/index";

export default {
  name: "CommentList",
  components: {},
  props:{
    articleId: {
      type: Number,
      required: true
    },
  },
  data(){
    return {
      // 댓글 불러옴
      comments: {
        commentId: '',
        content: '',
        parentId: '',
        date: '',
        articleId: '',
        nickname: ''
      },
      getArticleId: '',
      nickname: Store.state.nickname,
      showReplyForm: false,
      year: '',               // 년도 뽑아냄
      month: '',              // 개월 뽑아냄
      day: '',                // 일 뽑아냄
      content: '',
      replyText: '',
      replyToText: ''
    }
  },
  mounted() {
  },
  methods: {
    async loadComments(articleId){
      const args = `/api/general/comment/list/${articleId}`;
      await api.getComment(args).then(res=>{
        this.comments=res.data;
        this.comments.map(comment =>{
          const dateObject = new Date(comment.date);
          this.year = dateObject.getFullYear();
          this.month = dateObject.getMonth()+1;
          this.day = dateObject.getDate();
          comment.date = `${this.year}-${this.month}-${this.day}`;
          return comment;
        })
      }).catch(err=>{
        console.log("CommentList의 err 출력: ", err);
      });
    },
    toggleReplyForm(commentId){
      this.showReplyForm= this.showReplyForm === commentId ? null: commentId;
      // 다른 댓글의 답글 작성 창은 닫힘
      //this.replyText = ""; // 답글 작성 양식을 초기화
    },
    writeReply(commentId){
      const parentId = commentId;
      if(this.nickname){
        const replyText  = this.replyText;
        console.log("replyText 출력해주라아알ㅇ", replyText);
        this.$emit("submit", { replyText, parentId });
      }
    },
    writeToReply(commentId){
      const parentId = commentId;

      if(this.nickname){
        const { replyToText } = this;
        this.$emit("submit", { replyToText, parentId });
      }
    },
     /*loadDetailsComments(){
      console.log("출력티비::: ", this.comments);

      const args = `/api/general/comment/list/${this.comments.commentId}`;
      console.log("CommentDetails commentId 출력: ", this.comments.commentId);
      console.log("CommentDetailsComments 메소드의 args 출력: ", args);
      api.getComment(args).then(res=>{
        this.comments=res.data;
      }).catch(err=>{
        console.log("CommentList의 err 출력: ", err);
      });
    },*/
    submitModifiedComment(){
    },
    submitDeletedComment(){
    }

  }
}
</script>

<style>
#commentList{
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: relative;
  width: 100%;
  height: 180px;
}
.commentList-container{
  position: relative;
  width: 69%;
  height: auto;
  top: 13px;
}
.commentList-wrapper{
  position: relative;
  width: 100%;
  height: 45%;
  border-radius: 6px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr;
}
.list-profile-container{
  position: relative;
  width: 85%;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1fr;
  text-align: start;
}
.list-profile-wrapper{
  position: relative;
  width: 90%;
  margin: auto;
}
.comment-list-content{
  position: relative;
  display: grid;
  width: 100%;
  height: 78%;
  grid-template-columns: 2fr;
  grid-template-rows: 1fr 2fr 1fr;
  margin: auto;
  align-content: center;
  align-items: center;
}
.comments-content-wrapper{
  top: 15px;
  font-size: 16px;
}
.comment-right-content{
  position: relative;
  width: 100%;
  height: 80%;
  top: 5px;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 2fr;
}
.right-comment-modi-dele-container{
  position: relative;
  width: 54%;
  display: grid;
  grid-template-columns: repeat(2, 0.5fr);
  grid-template-rows: 1fr;
  left: 8em;
}
.comment-modify-content{
  color: rgb(0,0,0,70%);
  font-size: 15px;
  align-content: end;
  margin-left: 15px;
  width: 75%;
  text-align: right
}
.comment-delete-content{
  color: rgb(0,0,0,70%);
  font-size: 15px;
  align-content: end;
  width: 75%;
  text-align: right;
}
.reply-form{
  position: relative;
  width: 70%;
  flex: 1;
  height: 50px;
  left: 15px;
  border: 1px solid rgb(141,141,141,70%);
  border-radius: 6px;
  padding: 10px;
  font-size: 16px;
}
.reply-input button {
  padding: 1px 10px;
  border: none;
  cursor: pointer;
  margin-left: 15px;
}
.reply-input input[type="text"]{
  font-size: 16px;
}
.list-reply-profile-container{
  position: relative;
  width: 69%;
  height: auto;
  border: 1px solid rgb(141,141,141,70%);
}
</style>