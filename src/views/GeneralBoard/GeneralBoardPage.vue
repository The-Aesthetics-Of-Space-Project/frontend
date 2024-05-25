<template>
  <div id="generalboardpage">
    <div class="generalboardpage-container">
      <!-- 글 삭제 및 수정 버튼 -->
      <div class="author-actions" v-if="isAuthor" style="position: relative; width: 10%; left: 56em; top: 5em;">
        <button style="position: relative; border: none; text-decoration-line: underline; color: rgb(141,141,141,90%); background-color: white;" @click="deletePost">삭제</button>
        <button style="position: relative; border: none; text-decoration-line: underline; color: rgb(141,141,141,90%); background-color: white;" @click="editPost">수정</button>
      </div>
      <div class="thumbnail-container" style="position: relative; width: 82%; height: 22em; margin: auto; top: 5em;">
        <section class="thumbnail-wrapper" style="position: relative; width: 65%; height: 90%; margin: auto; top: 1.2em; left: -0.5em;">
          <img :src="posts.thumbnail" style="width: 100%; height: 100%;">
        </section>
      </div>
      <!-- 제목 출력 -->
    <div class="title">
      <div class="title-content" style="position: relative; width: 100%; margin: auto;
      top: 10px; font-size: 26px; font-weight: 540; text-align: left;">
        {{ posts.title }}
      </div>
    </div>

    <div class="user_info" style="position: relative;  width: 55%; height: 57px; margin: auto; top: 6.2em;" ><!--v-for="user in users"-->
      <section class="user_info_wrapper" style="position: relative; display: grid; grid-template-columns: 1fr 2fr; grid-template-rows: 1fr; width: 35%;
      height: 50px; top: 2px;">
        <router-link to="/my-page">
        <section class="user_profiles">
          <img :src="posts.profile" alt="프로필 사진" style="height: 50px; width: 55px; border-radius: 50%;">
        </section>
        </router-link>
        <router-link to="/my-page" style="text-decoration: none; color: black;">
        <section class="user_name" style="font-weight: 540;">
          {{ posts.nickname }}
        </section>
        </router-link>
      </section>
    </div>
      <!-- 날짜 출력 -->
    <div class="date">
      <section class="date_container">
        작성일 : {{ this.formDate }}
      </section>
    </div>

      <!-- 내용 출력 -->
    <div class="general-content-container" style="position: relative; left: 1px; width: 80%; height: 100%; display: grid;
    grid-template-columns: 6fr 1fr; grid-template-rows: 1fr; top: 4em; margin: auto;">
      <div class="content-wrappers">
        <div id="viewer" class="content">
        </div>
      </div>

      <section class="side-btn-wrapper" style="position:fixed; width: 8%; height: 100%; right:17%; top: 19%; text-align: left;">
        <!-- 좋아요 버튼 -->
        <button type="button" class="heart-btn" @click="likeBtn" style="position: sticky; border: 1px solid rgb(141,141,141,70%); border-radius: 50%;
        width: 45%; height: 65px; top: 90%; font-size: 14.5px;">
          <img :src="posts.isLiked ? HeartImg : EmptyHeartImg" width="30px" height="30px"/>
          <br>
          {{ posts.likeCount }}
        </button>

        <!-- 스크랩 버튼 -->
        <button type="button" class="scrap-btn" @click="scrapBtn" style="position: sticky; border: 1px solid rgb(141,141,141,70%); border-radius: 50%;
        width: 45%; height: 65px; right: 50%; top: 81%; background-color: white; font-size: 14.5px;">
          <img :src="posts.isScraped ? ScrapImg : EmptyScrapImg" width="30px" height="30px"/>
          <br>
          {{ posts.scrapCount }}
        </button>

        <section class="board-chat-wrapper" style="position: sticky; top: 40.3em;">
          <button class="board-chat-icon-btn" style="position: sticky; border-radius: 60%; border: none;
        width: 45%; height: 65px; right: 50%; top: 30em; background-color: white; font-size: 14.5px;"><router-link to="/chat"> <img src="../../assets/mypage_icon/chatIcon.png" width="52px" height="52px"></router-link></button>
        </section>

      </section>
    </div>

      <!-- 댓글 작성 및 댓글 확인 폼 -->
      <div class="comment-container">
        <div class="comment-input">
          <!-- 댓글 작성 컴포넌트 -->
          <comment-write @submit="handleCommentSubmit" />
        </div>
        <CommentList :articleId="Number(getArticleId)" ref="commentList"
                     @submit="replyComments" @modified="modifiedComment" @deleted="deletedComment"/>

      </div>

    </div>
  </div>
</template>

<script>
import {api} from "@/api/api";
import Store from "@/store/index";
import CommentWrite from "@/views/GeneralBoard/Comment/CommentWrite.vue";
import {marked} from 'marked';
import CommentList from "@/views/GeneralBoard/Comment/CommentList.vue";

export default {
  name: 'GeneralBoardPage',
  components:{
    CommentWrite,
    CommentList,
  },
  data() {
    return {
      liked: '',
      likedCtn: '',
      scraped: false,
      scrapedCtn: '',
      newComment: '',
      // 댓글 불러옴
      childComments: {
        commentId: '',
        content: '',
        parentId: '',
        date: '',
        articleId: '',
        nickname: ''
      },
      // 사용자 정보 store에서 가져옴
      users: {
        userId: Store.state.userId,
        nickname: Store.state.nickname,
        profile: Store.state.profile,
      },
      // 게시글 정보 불러옴
      posts: {
        articleId: '',
        title: '',
        thumbnail: '',
        date: '',
        content: '',
        nickname: '',
        likeCount: '',
        scrapCount: '',
        profile: '',
        isLiked: '',
        isScraped: ''
      },
      HeartImg: require('@/assets/generalboardpage_icon/heart.png'),
      EmptyHeartImg: require('@/assets/generalboardpage_icon/emptyheart.png'),
      EmptyScrapImg: require('@/assets/generalboardpage_icon/emptyScrap.png'),
      ScrapImg: require('@/assets/generalboardpage_icon/fillScrap.png'),
      data: null,
      getArticleId: '',       // 주소에서 articleId 뽑아냄
      year: '',               // 년도 뽑아냄
      month: '',              // 개월 뽑아냄
      day: '',                // 일 뽑아냄
      formDate: '',            // 작성일 날짜 year+month+day
    };
  },
  computed:{
    isUserLogin(){
      return this.$store.getters.isLogin;
    },
    // 현재 사용자가 글 작성자인지 여부를 확인하는 계산된 속성
    isAuthor() {
      return this.posts.nickname === this.users.nickname;
    }
  },
  mounted(){
    const urlStr = window.location.href;
    // 마지막 = 이후의 부분을 분리
    const parts = urlStr.split('=');
    this.getArticleId = parts.pop();

    if (this.getArticleId) {
      this.getArticle();
      // CommentList 컴포넌트의 메서드를 호출하여 초기 데이터를 로드
      this.loadComments();
    } else {
      console.error('articleId가 정의되지 않았습니다.');
    }
  },
  methods: {
    async getArticle(){
      const args = `/api/general/post/${this.getArticleId}`;
      await api.getPost(args).then(res =>{
        this.posts=res.data;
        const dateObject = new Date(this.posts.date);
        this.year = dateObject.getFullYear();
        this.month = dateObject.getMonth()+1;
        this.day = dateObject.getDate();
        this.formDate = `${this.year}-${this.month}-${this.day}`;
        const htmlContent = marked(this.posts.content);

        document.querySelector('#viewer').innerHTML = htmlContent;

        console.log("좋아요 여부 데이터 ", this.posts.isLiked);
      })
    },
    loadComments() {
      // CommentList 컴포넌트의 메서드를 호출하여 댓글 로드
      this.$refs.commentList.loadComments(this.getArticleId);
    },
    /* 좋아요 클릭/언클릭 */
    async likeBtn() {
      if(this.posts.isLiked){
        // 이미 좋아요를 누른 상태에서 다시 눌렀을 때 => 좋아요 취소
        const args = '/api/general/unlike';
        const unLikeData = {
          userId: this.users.userId,
          articleId: this.posts.articleId
        }
        await api.unSetLike(args, unLikeData).then(res => {
          alert("좋아요를 취소했습니다!");
          console.log("좋아요 취소 성공!", this.posts.liked);
          this.posts.isLiked = !this.posts.isLiked;

        }).catch(error => {
          console.log("좋아요 취소 실패!", error);
        });
      } else{
        // 좋아요를 누르지 않은 상태에서 누름 => 좋아요 추가
        const args = '/api/general/like';
        const likeData = {
          userId: this.users.userId,
          articleId: this.posts.articleId
        }
        await api.setLike(args, likeData).then(res => {
          alert("좋아요를 눌렀습니다!");
          this.posts.isLiked = !this.posts.isLiked;
          this.getArticle();
        }).catch(error => {
          console.log("좋아요 실패!", error);
          this.posts.isLiked = !this.posts.isLiked;
        })
      }
    },
    /* 스크랩 클릭/언클릭 */
    async scrapBtn() {
      if(this.posts.scraped){
        // 이미 스크랩을 누른 상태에서 다시 눌렀을 때 => 스크랩 취소
        const args = '/api/general/unscrap';
        const scrapData = {
          userId: this.users.userId,
          articleId: this.posts.articleId
        }
        await api.unSetScrap(args, scrapData).then(res => {
          alert("스크랩 취소했습니다!");
          this.posts.isScraped = !this.posts.isScraped;
        }).catch(error => {
          console.log("스크랩 취소 실패!", error);
        });
      }else{
        const args = '/api/general/scrap';
        const unScrapData = {
          userId: this.users.userId,
          articleId: this.posts.articleId
        }
        await api.setScrap(args, unScrapData).then(res => {
          alert("스크랩을 눌렀습니다!");
          this.posts.isScraped = !this.posts.isScraped;
        }).catch(error => {
          console.log("스크랩 실패!", error);
          this.posts.isScraped = !this.posts.isScraped;
        })
      }
    },
    /* 게시글 삭제 */
    deletePost(){
      const args = `/api/general/post/${this.posts.articleId}`;
       api.deletePost(args).then(res => {
        console.log("글 삭제 성공!", res);
        alert("글 삭제 성공했습니다!");
         this.$router.push('/generalBoard');
      }).catch(error => {
        console.log("글 삭제 실패했습니다!", error);
      });
    },
    /* 게시글 수정 */
    editPost(){
      this.$router.push({
        path: "GeneralReWrite",
        query: {
          articleId: this.posts.articleId
        }
      });
    },
    /* 원댓글 작성 */
    async handleCommentSubmit(commentData){
        const submitData = {
          content: commentData.content,
          parentId: commentData.parentId,
          articleId: this.getArticleId,
          nickname: this.users.nickname
        }
        const params = submitData;

        const args = `/api/general/comment`;
        await api.setComment(args, params).then(res=>{
          this.comments=res.data;
          this.loadComments(this.getArticleId);
        }).catch(err=>{
          console.log("Comment등록의 err 출력: ", err);
        });
    },
    /* 답글 달기 등록 */
    async replyComments(commentReplyData){

      const submitReplyData = {
        content: commentReplyData.replyText,
        parentId: commentReplyData.parentId,
        articleId: this.getArticleId,
        nickname: this.users.nickname
      }
      const params = submitReplyData;

      const args = `/api/general/comment`;
      await api.setComment(args, params).then(res=>{
        this.comments=res.data;
        this.loadComments(this.getArticleId);
      }).catch(err=>{
        console.log("Comment등록의 err 출력: ", err);
      });
    },
    /* 댓글 수정 */
    async modifiedComment(modifiedData){

      const modifyData = {
        content: modifiedData.replyText
      }
      const params = modifyData;

      const args = `/api/general/comment/${modifiedData.commentId}`;
      await api.editComment(args, params).then(res=>{
        this.comments=res.data;
        this.loadComments(this.getArticleId);
      }).catch(err=>{
        console.log("Comment등록의 err 출력: ", err);
      });
    },
    async deletedComment(commentId){
      console.log("commentId출력티비예: "+ commentId.commentId);

      const args = `/api/general/comment/${commentId.commentId}`;
      await api.deleteComment(args).then(res=>{
        this.comments=res.data;
        this.loadComments(this.getArticleId);
      }).catch(err=>{
        console.log("Comment등록의 err 출력: ", err);
      });
    }
  }
};
</script>

<style>
#generalboardpage{
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: relative;
  width:100%;
  height:1200px;
  margin: 0;
}
.generalboardpage-container{
  position: relative;
  margin: auto;
  width: 80%;
}
.title {
  position: relative;
  width:53%;
  height:50px;
  top: 7em;
  border-bottom: 1px solid rgb(141,141,141,70%);
  border-radius: 6px;
  margin-left: 23%;
  font-size: 13px;
  font-weight: 500;
}
.title-content{
  position: absolute;
  width: 100%;
  margin: auto;
  top: 13px;
  font-size: 26px;
  font-weight: 530;
  text-align: left;
}
.user_profiles{
  position: relative;
  width: 55px;
  height: 100%;
  border-radius: 50%;
  cursor: pointer;
}
.user_name{
  position: relative;
  width: 100%;
  height: 50px;
  font-size: 20px;
  align-content: center;
  text-align: left;
  cursor: pointer;
}
.date_container{
  position: relative;
  width: 100%;
  height: 100%;
  left: -10px;
  font-size: 18px;
  text-align: left;
  align-content: center;
}
.date{
  position: relative;
  width: 20%;
  left: 23.5%;
  height:35px;
  top: 6em;
}
.content-wrappers{
  width: 78%;
  margin: auto;
  height: 650px;
  border: 1px solid rgb(141,141,141,30%);
  border-radius: 15px;
  position: relative;
  top: 50px;
  left: 70px;
  overflow: visible; /* 내용이 길어져도 모두 표시되도록 설정 */
}
.comment-container {
  position: relative;
  width: 78%;
  height: auto;
  top: 9.2em;
  left: 23%;
}
.comment-input {
  display: flex;
  position: relative;
  width: 80%;
  height: auto;
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
.heart-btn{
  position: relative;
  margin-top: 9px;
  width: 55px;
  height: 42px;
  border: none;
  background: none;
  cursor: pointer;
  align-items: center;
  align-content: center;
}
svg.bi-arrow-up-circle{
  width: 25px;
  height: 25px;
}
</style>