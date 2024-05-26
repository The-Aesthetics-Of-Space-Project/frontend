<template>
  <div id="likeList">
    <div class="content-wrapper">
      <div class="grid-container article-grid-container">
        <div class="box-content" v-for="post in posts" :key="post.id">
          <section class="thumbnail" style="position: relative; cursor: pointer; width:100%; height:70%;" >
            <img :src="post.thumbnail" alt="Post Thumbnail" class="post-thumbnail"
                 @click="goToPostDetails(post.articleId)">
          </section>
          <section class="content-title" @click="goToPostDetails(post.articleId)" >
            <span style="cursor: pointer;">{{ post.title }}</span>
          </section>
          <section class="content-title-wrapper">
            <section class="heart-contents">
              <img src="@/assets/mypage_icon/like.png" alt="Like Icon" width="35px" height="35px">
              <section class="count-number">
                <span>{{ post.likeCount }}</span>
              </section>
            </section>
            <section class="content-nickname">
              <section class="user-profile">
                <img :src="post.profile" alt="User Profile" class="profile-img">
              </section>
              <span style="font-size: 15px; font-weight:550; cursor: pointer;" @click="goToUserDetails(post.nickname)">{{ post.nickname }}</span>
            </section>
          </section>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { api } from "@/api/api";
import Store from "@/store/index";

export default {
  data() {
    return {
      posts: {
        articleId: '',
        title: '',
        thumbnail: '',
        nickname: '',
        likeCount: '',
        profile: '',
      },
      liked: '',
      heartImg: require('@/assets/mypage_icon/like.png'),
      baseUrl: 'http://jerry6475.iptime.org:20000',
      userId: Store.state.userId,
      getUserId: ''
    };
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    async fetchPosts() {
      try {
        const res = await api.getPost(`/users/likes?userId=${encodeURIComponent(this.userId)}`);
        this.posts = res.data;
        this.posts.thumbnail=this.baseUrl+this.posts.thumbnail;
        console.error('response posts:', res);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },
    /* 해당 게시글로 이동 */
    goToPostDetails(articleId) {
      console.log("찍어봐요 articleId",articleId);
      this.$router.push({path: "GeneralBoardPage", params: {articleId: articleId}});
    },
    /* 해당 유저 페이지로 이동 */
    goToUserDetails(nickname){
      this.$router.push({path: "MyPageView", params: {nickname: nickname}});
    }
  },
};
</script>

<style scoped>
#likeList{
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: relative;
  width:100%;
  margin: 0;
}
.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 170px;
}
.grid-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
}
.article-grid-container {
  /*
   * grid-contianer css가 전역적으로 적용되고 있어서 게시판 grid-container를 추가
   * (기존 grid-container의 속성을 무시하기 위해 important 설정)
   */
  display: grid !important;
  grid-template-columns: 1fr 1fr 1fr !important;
}
.box-content {
  flex: 1 1 calc(33.333% - 40px);
  border: 1px solid #ddd;
  height: 430px;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  box-sizing: border-box;
}
.thumbnail img {
  width: 95%;
  height: 100%;
  border-radius: 10px;
}
.heart-contents {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -2px;
}
.count-number {
  margin-left: 10px;
}
.content-title-wrapper {
  margin-top: 10px;
}
.content-title {
  font-size: 15px;
  font-weight: bold;
  margin-top: 14px;
}
.content-nickname {
  display: flex;
  align-items: center;
  margin-top: 5px;
}
.user-profile img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

@media (max-width: 1024px) {
  .box-content {
    flex: 1 1 calc(50% - 40px);
    max-width: calc(50% - 40px);
  }
}

@media (max-width: 768px) {
  .box-content {
    flex: 1 1 100%;
    max-width: 100%;
  }
}
</style>
