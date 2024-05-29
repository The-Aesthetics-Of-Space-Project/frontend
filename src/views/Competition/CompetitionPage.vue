<template>
  <div id="competitionPage">
    <div class="competitionPage-container">
      <!-- 글 삭제 및 수정 버튼 -->
      <div class="author-actions" v-if="isAuthor" style="position: relative; width: 10%; left: 57em; top: 5em;">
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

      <div class="user_info" style="position: relative;  width: 55%; height: 57px; margin: auto; top: 6.2em;" >
        <section class="user_info_wrapper" style="position: relative; display: grid; grid-template-columns: 1fr 2fr; grid-template-rows: 1fr; width: 35%;
      height: 50px; top: 2px;">
            <section class="user_profiles">
              <router-link :to="{ name: 'MyPageView', query: {nickname: posts.nickname} }">
              <img :src="posts.profile" alt="프로필 사진" style="height: 50px; width: 55px; border-radius: 50%;">
              </router-link>
            </section>
          <router-link :to="{ name: 'MyPageView', query: {nickname: posts.nickname} }" style="font-weight: 550; cursor: pointer; text-decoration: none; color: rgb(0,0,0,80%);">
            <section class="user_name" >
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
        width: 45%; height: 65px; top: 81%; font-size: 14.5px;">
            <img :src="posts.like ? HeartImg : EmptyHeartImg" width="30px" height="30px"/>
            <br>
            {{ posts.likeCount }}
          </button>

          <section class="board-chat-wrapper" style="position: sticky; top: 40.3em;">
            <button class="board-chat-icon-btn" style="position: sticky; border-radius: 60%; border: none;
        width: 45%; height: 65px; right: 50%; top: 30em; background-color: white; font-size: 14.5px;" @click="chatgoing"><img src="../../assets/mypage_icon/chatIcon.png" width="52px" height="52px"></router-link></button>
          </section>

        </section>
      </div>

      <!-- 댓글 작성 및 댓글 확인 폼 -->
      <div class="comment-container">
        <div class="comment-input">
          <!-- 댓글 작성 컴포넌트 -->
          <ContestCommentWrite @submit="handleCommentSubmit" />
        </div>
        <ContestCommentList :articleId="Number(getArticleId)" ref="commentList"
                     @submit="replyComments" @modified="modifiedComment" @deleted="deletedComment"/>

      </div>
    </div>
  </div>
</template>

<script>
import {api} from "@/api/api";
import Store from "@/store/index";
import ContestCommentWrite from "@/views/Competition/ContestComment/ContestCommentWrite.vue";
import ContestCommentList from "@/views/Competition/ContestComment/ContestCommentList.vue";

export default {
  name: 'CompetitionPage',
  components:{
    ContestCommentWrite,
    ContestCommentList,
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
        like: '',
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
      baseURL: 'http://jerry6475.iptime.org:20000'
    };
  },
  computed:{
    isUserLogin(){
      return this.$store.getters.isLogin;
    },
    // 현재 사용자가 글 작성자인지 여부를 확인하는 계산된 속성
    isAuthor() {
      return this.posts.nickname === this.users.nickname;
    },
    articlesId(){
      return this.$route.query.articleId;
    }
  },
  created(){
  },
  mounted(){
      this.getArticle();
      // CommentList 컴포넌트의 메서드를 호출하여 초기 데이터를 로드
      this.loadComments();
      console.error('articleId가 정의되지 않았습니다.');
  },
  methods: {
    async getArticle(){
     this.getArticleId = this.articlesId;

      const args = `/api/contest/post/${this.getArticleId}`;

      await api.getPost(args).then(res =>{
        this.posts=res.data;
        this.posts.thumbnail = this.baseURL + this.posts.thumbnail;
        const dateObject = new Date(this.posts.date);
        this.year = dateObject.getFullYear();
        this.month = dateObject.getMonth()+1;
        this.day = dateObject.getDate();
        this.formDate = `${this.year}-${this.month}-${this.day}`;
      })
    },
    loadComments() {
      // CommentList 컴포넌트의 메서드를 호출하여 댓글 로드
      this.$refs.commentList.loadComments(this.getArticleId);
    },
    /* 좋아요 클릭/언클릭 */
    async likeBtn() {
      if(this.isUserLogin) {
        if (this.posts.like) {
          // 이미 좋아요를 누른 상태에서 다시 눌렀을 때 => 좋아요 취소
          const args = '/api/contest/unlike';
          console.log("args 출력해줘ㅓ", args);
          const unLikeData = {
            userId: this.users.userId,
            articleId: this.posts.articleId
          }
          await api.unSetLike(args, unLikeData).then(res => {
            alert("좋아요를 취소했습니다!");
            this.posts.like = !this.posts.like;
            this.getArticle();

          }).catch(error => {
            console.log("좋아요 취소 실패!", error);
          });
        } else {
          // 좋아요를 누르지 않은 상태에서 누름 => 좋아요 추가
          const args = '/api/contest/like';
          const likeData = {
            userId: this.users.userId,
            articleId: this.posts.articleId
          }
          await api.setLike(args, likeData).then(res => {
            alert("좋아요를 눌렀습니다!");
            this.posts.like = !this.posts.like;
            this.getArticle();
          }).catch(error => {
            console.log("좋아요 실패!", error);
            this.posts.like = !this.posts.like;
          })
        }
      }
      else
      {
        this.$router.push('login');
      }
    },
    /* 게시글 삭제 */
    deletePost(){
      const args = `/api/contest/post/${this.posts.articleId}`;
      api.deletePost(args).then(res => {
        if (window.confirm('삭제하시겠습니까?')) {
          alert('글 삭제에 성공하였습니다.');
          this.$router.push('/competitionMain');
          console.log("글 삭제 성공!", res);
        }
      }).catch(error => {
        console.log("글 삭제 실패했습니다!", error);
      });
    },
    /* 게시글 수정 */
    editPost(){
      this.$router.push({
        path: "CompetitionReWrite",
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

      const args = `/api/contest/comment`;
      if(!commentData.content){
        alert('댓글을 입력하세요.')
      }
      else {
        await api.setComment(args, params).then(res => {
          this.comments = res.data;
          this.loadComments(this.getArticleId);
        }).catch(err => {
          console.log("Comment등록의 err 출력: ", err);
        });
      }
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

      const args = `/api/contest/comment`;
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

      const args = `/api/contest/comment/${modifiedData.commentId}`;
      await api.editComment(args, params).then(res=>{
        this.comments=res.data;
        this.loadComments(this.getArticleId);
      }).catch(err=>{
        console.log("Comment등록의 err 출력: ", err);
      });
    },
    async deletedComment(commentId){
      const args = `/api/contest/comment/${commentId.commentId}`;
      await api.deleteComment(args).then(res=>{
        this.comments=res.data;
        this.loadComments(this.getArticleId);
      }).catch(err=>{
        console.log("Comment등록의 err 출력: ", err);
      });
    },
    async chatgoing() {
      const userData = {
        nickname : this.posts.nickname,
        id : this.users.userId,
      }
      // console.log("nicknamea",this.posts.nickname);
      // console.log("아이디",this.users.userId);
      await api.setChatPartnerId(`/api/chat_room/${encodeURIComponent(this.posts.nickname)}/${encodeURIComponent(this.users.userId)}`,userData)
          .then(res => {
            this.users = res.data;
            console.log('Response data',res);
            // 여기서 라우터 이동
            this.$router.push({path: `/api/chat_room/${this.posts.nickname}/${this.userId}`});
          })
          .catch(error => {
            // 통신할 때 401에러 처리
            console.error('Error data', error);
            console.log(this.posts.nickname);
            console.log(this.posts.userId);
          });
    },
  }
};
</script>

<style scoped>
#competitionPage{
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: relative;
  width:100%;
  height:1500px;
  margin: 0;
}
.competitionPage-container{
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
  left: -0.5em;
}
.date_container{
  position: relative;
  width: 100%;
  height: 100%;
  left: -10px;
  font-size: 15px;
  text-align: left;
  align-content: center;
  color: rgb(0,0,0,60%);
}
.date{
  position: relative;
  width: 20%;
  left: 23.5%;
  height:35px;
  top: 6.5em;
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
  top: 1em;
  left: 23%;
  margin-top: calc(10% + 0em);
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