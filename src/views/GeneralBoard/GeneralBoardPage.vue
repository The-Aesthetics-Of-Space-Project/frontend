<template>
  <div id="generalboardpage">
    <div class="generalboardpage-container">
      <div class="thumbnail-container" style="position: relative; width: 82%; height: 22em; margin: auto; top: 5em;">
        <section class="thumbnail-wrapper" style="position: relative; width: 65%; height: 90%; margin: auto; top: 1.2em; left: -0.5em;">
          <img :src="posts.thumbnail" style="width: 100%; height: 100%;">
        </section>
      </div>

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
          <img :src="users.profile" alt="프로필 사진">
        </section>
        </router-link>
        <router-link to="/my-page" style="text-decoration: none; color: black;">
        <section class="user_name" style="font-weight: 540;">
          {{ users.userId }}
        </section>
        </router-link>
      </section>
    </div>

    <div class="date">
      <section class="date_container">
        {{ posts.date }}
      </section>
    </div>

    <div class="general-content-container" style="position: relative; left: 1px; width: 80%; height: 100%; display: grid;
    grid-template-columns: 6fr 1fr; grid-template-rows: 1fr; top: 5em; margin: auto;">
      <section class="content-wrappers">
        <section class="content">
          <Viewer v-if="posts.content != null" :initialValue="content" ref="toastViewer"/>
          <!--{{ post.content }}-->
        </section>
      </section>

      <section class="side-btn-wrapper" style="position:fixed; width: 8%; height: 100%; right:17%; top: 19%; text-align: left;">
        <!-- 좋아요 버튼 -->
        <button type="button" class="heart-btn" @click="likeBtn" style="position: sticky; border: 1px solid rgb(141,141,141,70%); border-radius: 50%;
        width: 45%; height: 65px; top: 90%; font-size: 14.5px;">
          <img :src="liked ? HeartImg : EmptyHeartImg" width="25px" height="25px"/>
          {{ posts.likeCount }}
        </button>

        <!-- 스크랩 버튼 -->
        <button type="button" class="scrap-btn" @click="scrapBtn" style="position: sticky; border: 1px solid rgb(141,141,141,70%); border-radius: 50%;
        width: 45%; height: 65px; right: 50%; top: 81%; background-color: white; font-size: 14.5px;">
          <img :src="scraped ? ScrapImg : EmptyScrapImg" width="25px" height="25px"/>
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
          <input type="text" v-model="newComment" placeholder="댓글을 입력하세요" class="comment-form">

            <button type="button" class="btn btn-secondary rounded-circle" style="background-color: #80C85F" @click="submitComment">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="20" fill="#FFFFFF" class="bi bi-arrow-up-circle" viewBox="0 0 16 16">
                <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"></path>
              </svg>
            </button>
          <Comment v-for="comment in comments" :key="comment.id" :comment="comment" @reply="addReply"></Comment>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import {api} from "@/api/api";
import Store from "@/store/index";
import Comment from './Comment.vue';

export default {
  name: 'GeneralBoardPage',
  components:{
    Comment
  },
  data() {
    return {
      liked: false,
      scraped: false,
      newComment: '',
      comments: [],
      users: {
        userId: Store.state.userId,
        nickname: Store.state.nickname,
        profile: Store.state.profile,
      },
      posts: {
        articleId: '',
        title: '',
        thumbnail: '',
        date: '',
        content: '',
        nickname: '',
        likeCount: '',
        scrapCount: '',
      },
      HeartImg: require('@/assets/generalboardpage_icon/heart.png'),
      EmptyHeartImg: require('@/assets/generalboardpage_icon/emptyheart.png'),
      EmptyScrapImg: require('@/assets/generalboardpage_icon/emptyScrap.png'),
      ScrapImg: require('@/assets/generalboardpage_icon/fillScrap.png'),
      content: null,
      data: null,
    };
  },
  created() {
    this.fetchComments();
  },
  computed:{
    isUserLogin(){
      return this.$store.getters.isLogin;
    }
  },
  mounted(){
   /* const args = '/api/general/post/{id}'
    api.getPost(args).then(res =>{
      this.posts=res.data;
    })*/
  },
  methods: {
    async likeBtn() {
      if(this.liked){
        // 이미 좋아요를 누른 상태에서 다시 눌렀을 때 => 좋아요 취소
        const args = 'api/general/unlike';
        const formData = new FormData();
        formData.append('userId', this.users.userId);
        formData.append('articleId', this.posts.articleId);

        await api.unSetLike(args, formData).then(res => {
          console.log("좋아요 취소 성공!", res);
          alert("좋아요를 취소했습니다!");
          console.log("좋아요 취소 성공!", this.liked);
          this.liked = !this.liked;
        }).catch(error => {
          console.log("좋아요 취소 실패!", error);
        });
      } else{
        // 좋아요를 누르지 않은 상태에서 누름 => 좋아요 추가
        const args = 'api/general/like';
        const formData = new FormData();
        formData.append('userId', this.users.userId);
        formData.append('articleId', this.posts.articleId);

        await api.setLike(args, formData).then(res => {
          console.log("좋아요 성공!", res);
          alert("좋아요를 눌렀습니다!");
          this.liked = !this.liked;
        }).catch(error => {
          console.log("좋아요 실패!", error);
          this.liked = !this.liked;
        })
      }
    },
    async scrapBtn() {
      if(this.scraped){
        // 이미 좋아요를 누른 상태에서 다시 눌렀을 때 => 좋아요 취소
        const args = 'api/general/unscrap';
        const formData = new FormData();
        formData.append('userId', this.users.userId);
        formData.append('articleId', this.posts.articleId);

        await api.unSetScrap(args, formData).then(res => {
          console.log("스크랩 취소 성공!", res);
          alert("스크랩 취소했습니다!");
          this.scraped = !this.scraped;
        }).catch(error => {
          console.log("스크랩 취소 실패!", error);
        });
      }else{
        const args = 'api/general/scrap';
        const formData = new FormData();
        formData.append('userId', this.users.userId);
        formData.append('articleId', this.posts.articleId);

        await api.setScrap(args, formData).then(res => {
          console.log("스크랩 성공!", res);
          alert("스크랩을 눌렀습니다!");
          this.scraped = !this.scraped;
        }).catch(error => {
          console.log("스크랩 실패!", error);
          this.scraped = !this.scraped;
        })
      }
    },
    setContent(content){
      this.$refs.toastViewer.invoke('setMarkdown', content);
    },
    /* 댓글 등록하기 버튼 */
    async submitComment() {
      if (this.newComment.trim()) {
        const newComment = {
          content: this.newComment,
          articleId: this.posts.articleId,
          nickname: this.users.nickname,
          parentId: null, // 댓글 등록 시 parentId는 null로 설정
        };
        try {
          await api.setComment('/api/general/comment', newComment).then(res =>{
            this.comments.push({
              id: res.data.id, // 서버에서 생성된 ID
              user: {
                nickname: this.$store.state.nickname,
                profileImage: this.$store.state.profile
              },
              content: this.newComment,
              replies: []
            });
            this.newComment = '';
          })
        } catch (error) {
          console.error('Error posting comment:', error);
        }
      }
    },
    async fetchComments() {
      try {
        const response = await api.get(`/api/general/comment/{id}`);
        this.comments = response.data.map(comment => ({
          ...comment,
          replies: comment.replies || []
        }));
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    },
    /* 새로운 대댓글을 특정 부모 댓글에 추가하는 역할 */
    addReply({ reply, parentId }) {
      const parentComment = this.findCommentById(this.comments, parentId);
      if (parentComment) {
        if (!parentComment.replies) {
          parentComment.replies = [];
        }
        parentComment.replies.push(reply);
      }
    },
    findCommentById(comments, id) {
      for (const comment of comments) {
        // 현재 댓글의 id가 찾고자 하는 id와 일치하면 반환
        if (comment.id === id) {
          return comment;
        }
        if (comment.replies && comment.replies.length) {
          // 대댓글 트리에서 재귀적으로 찾기
          const found = this.findCommentById(comment.replies, id);
          if (found) {
            return found;
          }
        }
      }
      return null;
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
  width:55%;
  height:50px;
  top: 7em;
  border: 1.5px solid #8D8D8D;
  border-radius: 5px;
  margin-left: 22%;
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
  border: 1px solid #8D8D8D;
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
  border: 1px solid rgb(141,141,141,50%);
  border-radius: 15px;
  position: relative;
  top: 50px;
  left: 70px;
  overflow: visible; /* 내용이 길어져도 모두 표시되도록 설정 */
}
.comment-container {
  position: relative;
  width: 54%;
  height: auto;
  top: 10em;
  left: 23%;
}
.comment-input {
  display: flex;
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
.comment-input button:hover {
  background-color: darkorchid; /* 변경할 색상 지정 */
}
.comment-confirm-container{
  position: relative;
  border: 1px solid rgb(141,141,141,70%);
  border-radius: 6px;
  width: 100%;
  height: 300px;
  top: 10px;
}
.comment-confirm-wrapper{
  position: relative;
  display: grid;
  grid-template-columns: 1fr 6fr;
  grid-template-rows: 1fr;
  width: 100%;
  height: 20%;
}
.user-comment-wrapper{
  position: relative;
  width: 100%;
  height: 20%;
  left: 10px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 2fr;
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