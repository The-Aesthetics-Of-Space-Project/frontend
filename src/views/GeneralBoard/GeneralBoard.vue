<template>
  <div id="generalboard">
    <div class="content-wrapper">
      <!-- 상위 3개의 게시물 섹션 -->
      <div class="text-header" style="position: relative; width: 6%; font-weight: 550; font-size:26px; right: 21.1em; top:-5px;">베스트 3</div>
      <div class="grid-container article-grid-container">
        <div class="box-content" v-for="(popularPost, index) in popularPosts" :key="popularPost.id">
          <section class="thumbnail" style="position: relative; cursor: pointer; width:100%; height:70%;" >
            <div class="rank-badge" style="position: absolute; text-align: center; font-weight: 550; font-size: 15px; width: 8%;  height: 10%; top: -2px; left: -2px; border-radius: 50%; background-color: rgba(22, 74, 33,60%);">
              <a style="position: relative; top: 4px; color: rgb(255,255,255,100%); z-index: 1;">{{ index + 1 }}</a> </div>
            <router-link :to="{ name: 'GeneralBoardPage', query: {articleId: popularPost.articleId} }" style="text-decoration: none; color: rgb(0,0,0,80%);">
            <img :src="popularPost.thumbnail" alt="Post Thumbnail" class="post-thumbnail">
            </router-link>
          </section>
          <section class="content-title">
            <router-link :to="{ name: 'GeneralBoardPage', query: {articleId: popularPost.articleId} }" style="cursor:pointer; font-weight: 650; font-size: 17px; text-decoration: none; color: rgb(0,0,0,80%);">
            <span style="cursor: pointer;">{{ popularPost.title }}</span>
            </router-link>
          </section>
          <section class="content-title-wrapper">
            <section class="heart-contents">
              <img src="@/assets/mypage_icon/like.png" alt="Like Icon" width="35px" height="35px">
              <section class="count-number">
                <span>{{ popularPost.likeCount }}</span>
              </section>
            </section>
            <section class="content-nickname">
              <section class="user-profile" style="cursor:pointer;">
                <router-link :to="{ name: '', query: {nickname: popularPost.nickname}}"> //
                <img :src="popularPost.profile" alt="User Profile" class="profile-img">
                  </router-link>
              </section>
              <router-link :to="{ name: 'MyPageView', query: {nickname: popularPost.nickname}}" style="cursor:pointer; font-weight: 550; font-size:15px; text-decoration: none; color: rgb(0,0,0,80%);">
              <span>{{ popularPost.nickname }}</span>
              </router-link>
            </section>
          </section>
        </div>
      </div>
      <br><br><br><br><br><br><br>
      <section class="generalBoard-line-container"><hr/></section>
      <!-- 일반 게시물 섹션 -->
      <div class="grid-container article-grid-container">
        <div class="box-content" v-for="post in posts" :key="post.id">
          <section class="thumbnail" style="position: relative; cursor: pointer; width:100%; height:70%;" >
            <router-link :to="{ name: 'GeneralBoardPage', query: {articleId: post.articleId} }">
            <img :src="post.thumbnail" alt="Post Thumbnail" class="post-thumbnail">
            </router-link>
          </section>
          <section class="content-title">
            <router-link :to="{ name: 'GeneralBoardPage', query: {articleId: post.articleId} }" style="cursor:pointer; font-weight: 650; font-size: 17px; text-decoration: none; color: rgb(0,0,0,80%);">
            <span>{{ post.title }}</span>
            </router-link>
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
                <router-link :to="{ name: 'MyPageView', query: {nickname: post.nickname}}" style="cursor:pointer;">
                <img :src="post.profile" alt="User Profile" class="profile-img">
                </router-link>
              </section>
              <router-link :to="{ name: 'MyPageView', query: {nickname: post.nickname}}" style="cursor:pointer; font-weight: 550; font-size:15px; text-decoration: none; color: rgb(0,0,0,80%);">
              <span>{{ post.nickname }}</span>
              </router-link>
            </section>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "@/api/api";
import router from "@/router/guard";

export default {
  name: 'GeneralBoardPage',
  data() {
    return {
      posts: {
        articleId: '',
        title: '',
        thumbnail: '',
        nickname: '',
        likeCount: '',
      },
      liked: '',
      heartImg: require('@/assets/mypage_icon/like.png'),
      baseUrl: 'http://jerry6475.iptime.org:20000',
      popularPosts:{
        articleId: '',
        title: '',
        thumbnail: '',
        nickname: '',
        likeCount: '',
        profile: ''
      }
    };
  },
  created() {
    this.fetchPosts();
    this.fetchPopularPosts();
  },
  methods: {
    async fetchPosts() {
      try {
        const res = await api.getPost('/api/general/posts');
        this.posts = res.data;
        this.posts.thumbnail=this.baseUrl+this.posts.thumbnail;
        console.error('response posts:', res);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },
    /* 좋아요 많은 상위 3개 게시글 */
    async fetchPopularPosts() {
      try {
        const res = await api.getPost('/api/general/posts/popular');
        this.popularPosts = res.data;
          this.popularPosts.thumbnail= this.baseUrl + this.popularPosts.thumbnail;
        console.log('response popular posts:', res);
      } catch (error) {
        console.error('Error fetching popular posts:', error);
      }
    },
    goToPostDetails(articleId) {
      this.$router.push({
        path: "GeneralBoardPage",
        query: {articleId: articleId}
      });
    },
    goToUserDetails(nickname) {
      console.log("nickname OUTPUT!!!: ", nickname);
      this.$router.push({name: 'MyPageView', params: {nickname: nickname}});
    }
  },
};
</script>

<style scoped>
#generalboard{
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: relative;
  width:100%;
  padding-bottom: 10rem;
  margin: 0;
}
.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 130px;
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
  height: 440px;
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
.generalBoard-line-container{
  position: relative;
  width: 80%;
  height: 5%;
  top: -5em;
  left: 22em;
  align-items: center;
  align-content: center;
}
hr{
  position: relative;
  width: 50%;
  height: 1.3px;
  background-color: #757575;
}
</style>
