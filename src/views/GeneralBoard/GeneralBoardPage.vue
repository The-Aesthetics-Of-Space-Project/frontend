<template>
  <div id="generalboardpage">
    <div class="generalboardpage-container">
      <!-- 글 삭제 및 수정 버튼 -->
      <div class="author-actions" v-if="isAuthor" style="position: relative; width: 10%; left: 58em; top: 5em;">
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
        <section class="user_info_wrapper" style="position: relative; display: grid; grid-template-columns: 1fr 2fr; grid-template-rows: 1fr; width: 32%;
      height: 50px; top: 2px;">
          <section class="user_profiles">
            <router-link :to="{ name: 'MyPageView', query: {nickname: posts.nickname} }" style="cursor:pointer;">
              <img :src="posts.profile" alt="프로필 사진" style="height: 50px; width: 55px; border-radius: 50%; cursor: pointer;">
            </router-link>
          </section>
          <router-link :to="{ name: 'MyPageView', query: {nickname: posts.nickname} }" style="cursor:pointer; font-weight: 650; font-size: 16px; text-decoration: none; color: rgb(0,0,0,80%);">
            <section class="user_name" style="font-weight: 550; font-size: 18px; left: -6px;">
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
      <div class="general-content-container" style="position: relative; left: -5%; width: 80%; height: 80%; display: grid; top: 4em; margin: auto; ">
        <div class="content-wrappers">
          <div id="viewer" class="content">

          </div>
        </div>
        <section class="side-btn-wrapper" style="position:fixed; width: 8%; height: 80%; right:17%; top: 19%; text-align: left;">
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
            <button class="board-chat-icon-btn" @click="chatgoing" style="position: sticky; border-radius: 60%; border: none;
        width: 45%; height: 65px; right: 50%; top: 30em; background-color: white; font-size: 14.5px;">
              <img src="../../assets/mypage_icon/chatIcon.png" width="52px" height="52px">이동</button>
          </section>

        </section>
      </div>
      <!-- 댓글 작성 및 댓글 확인 폼 -->
      <div class="comment-container" style="position: relative; top:-50px;">
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
import axios from "axios";
import Footer from "@/components/Footer.vue";

export default {
  name: 'GeneralBoardPage',
  components:{
    Footer,
    CommentWrite,
    CommentList,
  },
  data() {
    return {
      liked: '',
      likedCtn: '',
      scrapedCtn: '',
      newComment: '',
      chatPartners: '',
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
        isScraped: '',
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
    if (this.getArticleId) {
      this.getArticle();
      // CommentList 컴포넌트의 메서드를 호출하여 초기 데이터를 로드
      this.loadComments();
    } else {
      console.error('articleId가 정의되지 않았습니다.');
    }
    this.chatgoing()
  },
  created(){
    this.getArticleId = this.$route.query.articleId;
  },
  methods: {

    async chatgoing() {
      const userData = {
        nickname : this.posts.nickname,
        id : this.users.userId,
      }
      await api.setChatPartnerId(`/api/chat_room/${encodeURIComponent(this.posts.nickname)}/${encodeURIComponent(this.users.userId)}`,userData)
          .then(res => {
            this.users = res.data;
            // 여기서 라우터 이동
            this.$router.push({path: `/api/chat_room/${this.posts.nickname}/${this.userId}`});
          })
          .catch(error => {
            // 통신할 때 401에러 처리
            console.error('Error data', error);
          });
    },
    async getArticle() {
      try {
        const args = `/api/general/post/${this.getArticleId}`;
        const res = await api.getPosts(args);
        this.posts = res.data;

        const dateObject = new Date(this.posts.date);
        this.year = dateObject.getFullYear();
        this.month = dateObject.getMonth() + 1;
        this.day = dateObject.getDate();
        this.formDate = `${this.year}-${this.month}-${this.day}`;
        this.content = this.posts.content;

        const htmlContent = marked(this.posts.content);
        document.querySelector('#viewer').innerHTML = htmlContent;

        if(this.posts.isLiked===null && this.posts.isScraped===null){
          this.posts.isLike = false;
          this.posts.isScraped = false;
        }

      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log("로그인 창으로 이동");
        } else if (error.response && error.response.status === 400) {
          console.log("잘못된 요청");
        } else {
          console.log("알 수 없는 오류");
        }
      }
    },
    loadComments() {
      // CommentList 컴포넌트의 메서드를 호출하여 댓글 로드
      this.$refs.commentList.loadComments(this.getArticleId);
    },
    /* 좋아요 클릭/언클릭 */
    async likeBtn() {
      if(this.isUserLogin) {
        if (this.posts.isLiked) {
          // 이미 좋아요를 누른 상태에서 다시 눌렀을 때 => 좋아요 취소
          const args = '/api/general/unlike';
          const unLikeData = {
            userId: this.users.userId,
            articleId: this.posts.articleId
          }
          await api.unSetLike(args, unLikeData).then(res => {
            alert("좋아요를 취소했습니다!");
            this.posts.isLiked = !this.posts.isLiked;
            this.getArticle();
          }).catch(error => {
            console.log("좋아요 취소 실패!", error);
          });
        } else {
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
      }
      else {
        this.$router.push('/login');
      }
    },
    /* 스크랩 클릭/언클릭 */
    async scrapBtn() {
      if(this.isUserLogin) {
        if (this.posts.isScraped) {
          // 이미 스크랩을 누른 상태에서 다시 눌렀을 때 => 스크랩 취소
          const args = '/api/general/unscrap';
          const scrapData = {
            userId: this.users.userId,
            articleId: this.posts.articleId
          }
          await api.unSetScrap(args, scrapData).then(res => {
            alert("스크랩 취소했습니다!");
            this.posts.isScraped = !this.posts.isScraped;
            this.getArticle();
          }).catch(error => {
            console.log("스크랩 취소 실패!", error);
          });
        } else {
          const args = '/api/general/scrap';
          const unScrapData = {
            userId: this.users.userId,
            articleId: this.posts.articleId
          }
          await api.setScrap(args, unScrapData).then(res => {
            alert("스크랩을 눌렀습니다!");
            this.posts.isScraped = !this.posts.isScraped;
            this.getArticle();
          }).catch(error => {
            console.log("스크랩 실패!", error);
            this.posts.isScraped = !this.posts.isScraped;
          })
        }
      }
      else
      {
        this.$router.push('/login');
      }
    },
    /* 게시글 삭제 */
    deletePost(){
      const args = `/api/general/post/${this.posts.articleId}`;
      api.deletePost(args).then(res => {
        if (window.confirm('삭제하시겠습니까?')) {
          alert('글 삭제에 성공하였습니다.');
          this.$router.push('/generalBoard');
        }
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

      if(!commentData.content){
        alert('댓글을 입력하세요.')
      }
      else {
        const args = `/api/general/comment`;
        await api.setComment(args, params).then(res => {
          this.comments = res.data;
          this.loadComments(this.getArticleId);
        }).catch(err => {
          console.error("Comment등록의 err 출력: ", err);
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

      const args = `/api/general/comment`;
      await api.setComment(args, params).then(res=>{
        this.comments=res.data;
        this.loadComments(this.getArticleId);
      }).catch(err=>{
        console.log("Comment등록의 err 출력: ", err);
      });
    },
    /* 댓글 수정 */
    async modifiedComment(modifiedData) {
      const modifyData = {
        content: modifiedData.replyText
      }
      const params = modifyData;

      const args = `/api/general/comment/${modifiedData.commentId}`;
      await api.editComment(args, params).then(res => {
        this.comments = res.data;
        this.loadComments(this.getArticleId);
      }).catch(err => {
        console.error("Comment등록의 err 출력: ", err);
      });
    },
    async deletedComment(commentId) {
      const args = `/api/general/comment/${commentId.commentId}`;
      await api.deleteComment(args).then(res => {
        this.comments = res.data;
        this.loadComments(this.getArticleId);
      }).catch(err => {
        console.error("Comment등록의 err 출력: ", err);
      });
    }
  }
};
</script>

<style>
#generalboardpage {
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: relative;
  width: 100%;
  height: 2000px;
  margin: 0;
}

.generalboardpage-container {
  position: relative;
  margin: auto;
  width: 80%;
}

.title {
  position: relative;
  width: 53%;
  height: 50px;
  top: 7em;
  border-bottom: 1px solid rgb(141, 141, 141, 70%);
  border-radius: 2px;
  margin-left: 23%;
  font-size: 13px;
  font-weight: 500;
}

.title-content {
  position: absolute;
  width: 100%;
  margin: auto;
  top: 13px;
  font-size: 26px;
  font-weight: 530;
  text-align: left;
}

.user_profiles {
  position: relative;
  width: 55px;
  height: 100%;
  border-radius: 50%;
  cursor: pointer;
}

.user_name {
  position: relative;
  width: 100%;
  height: 50px;
  font-size: 20px;
  align-content: center;
  text-align: left;
  cursor: pointer;
}

.date_container {
  position: relative;
  width: 100%;
  height: 100%;
  left: -10px;
  font-size: 15px;
  text-align: left;
  align-content: center;
  color: rgb(0, 0, 0, 60%);
}

.date {
  position: relative;
  width: 20%;
  left: 23.5%;
  height: 35px;
  top: 6.5em;
}

.content-wrappers {
  width: 78%;
  margin: auto;
  height: 650px;
  position: relative;
  top: 50px;
  left: 280px;
  overflow: visible; /* 내용이 길어져도 모두 표시되도록 설정 */
}

.comment-container {
  position: relative;
  width: 78%;
  height: auto;
  left: 25%;
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
  border: 1px solid rgb(141, 141, 141, 70%);
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

.heart-btn {
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

.general-content-container .content-wrappers .content img {
  max-width: 400px;
  max-height: 400px;
}

.general-content-container .content-wrappers h1 {
  font-size: 15px;
}

.content-wrappers img {
  max-width: 400px;
  max-height: 400px;
  margin-right: 2rem;
}

.content-wrappers .content {
  max-width: 350px;
}

</style>