<template>
  <div id="likeList">
    <div class="content-wrapper">
      <div class="text-header" style="position: relative; width: 10%; font-weight: 550; font-size:26px; right: 20.5em; top:-5px;">일반 게시판</div>
      <div class="grid-container article-grid-container">
        <div class="box-content" v-for="post in posts" :key="post.id">
          <section class="thumbnail" style="position: relative; cursor: pointer; width:100%; height:70%;" >
            <router-link :to="{name: 'GeneralBoardPage', query: {articleId: post.articleId} }" style="cursor:pointer;">
            <img :src="post.thumbnail" alt="Post Thumbnail" class="post-thumbnail">
            </router-link>
          </section>
          <section class="content-title" >
            <router-link :to="{name: 'GeneralBoardPage', query: {articleId: post.articleId} }" style="cursor:pointer; font-weight: 650; font-size: 17px; text-decoration: none; color: rgb(0,0,0,80%);">
            <span style="cursor: pointer;">{{ post.title }}</span>
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
                <router-link :to="{ name: 'MyPageView', query: {nickname: post.nickname} }" style="cursor:pointer;">
                <img :src="post.profile" alt="User Profile" class="profile-img">
                </router-link>
              </section>
              <router-link :to="{ name: 'MyPageView', query: {nickname: post.nickname} }" style="cursor:pointer; font-weight: 650; font-size: 16px; text-decoration: none; color: rgb(0,0,0,80%);">
              <span style="font-size: 15px;">{{ post.nickname }}</span>
              </router-link>
            </section>
          </section>
        </div>
      </div>
      <br><br><br><br><br>
      <div class="text-header" style="position: relative; width: 10%; font-weight: 550; font-size:26px; right: 21.5em; top:-5px;">공모전</div>
      <!-- 공모전 섹션 -->
      <div class="grid-container article-grid-container">
        <div class="box-content" v-for="contest in contests" :key="contest.id">
          <section class="thumbnail" style="position: relative; cursor: pointer; width:100%; height:70%;">
            <router-link :to="{ name: 'CompetitionPage', query: {articleId: contest.articleId} }" style="cursor:pointer;">
              <img :src="contest.thumbnail" alt="Post Thumbnail" class="post-thumbnail">
            </router-link>
          </section>
          <section class="content-title">
            <router-link :to="{ name: 'CompetitionPage', query: {articleId: contest.articleId} }" style="cursor: pointer; font-weight: 650; font-size: 17px; text-decoration: none; color: rgb(0,0,0,80%);">
              <span style="cursor: pointer;">{{ contest.title }}</span>
            </router-link>
          </section>
          <section class="content-title-wrapper">
            <section class="heart-contents">
              <img src="@/assets/mypage_icon/like.png" alt="Like Icon" width="35px" height="35px">
              <section class="count-number">
                <span>{{ contest.likeCount }}</span>
              </section>
            </section>
            <section class="content-nickname">
              <section class="user-profile">
                <router-link :to="{ name: 'MyPageView', query: {nickname: contest.nickname} }" style="cursor:pointer;">
                <img :src="contest.profile" alt="User Profile" class="profile-img">
                </router-link>
              </section>
              <router-link :to="{ name: 'MyPageView', query: {nickname: contest.nickname} }" style="cursor:pointer; font-weight: 650; font-size: 16px; text-decoration: none; color: rgb(0,0,0,80%);">
              <span style="cursor:pointer;">{{ contest.nickname }}</span>
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
      contests:{
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
  props:{
    // 본인이 아닌 다른 사람의 getUserId
    getUserId: {
      type: String,
      required: true
    }
  },
  created() {
    this.getUsersId = this.getUserId;
    if(this.getUsersId){
      this.fetchOtherPosts();
      this.fetchOtherContest();
    }else{
      this.fetchPosts();
      this.fetchContest();
    }

  },
  methods: {
    async fetchPosts() {
      try {
        const res = await api.getPosts(`/users/likes/general?userId=${encodeURIComponent(this.userId)}`);
        this.posts = res.data;
        this.posts.thumbnail=this.baseUrl+this.posts.thumbnail;
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },
    async fetchContest() {
      try {
        const res = await api.getPosts(`/users/likes/contest?userId=${encodeURIComponent(this.userId)}`);
        this.contests = res.data;
        this.contests.thumbnail=this.baseUrl+this.contests.thumbnail;
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },
    async fetchOtherPosts() {
      try {
        const res = await api.getPosts(`/users/likes/general?userId=${encodeURIComponent(this.getUsersId)}`);
        this.posts = res.data;
        this.posts.thumbnail=this.baseUrl+this.posts.thumbnail;
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },
    async fetchOtherContest() {
      try {
        const res = await api.getPosts(`/users/likes/contest?userId=${encodeURIComponent(this.getUsersId)}`);
        this.contests = res.data;
        this.contests.thumbnail=this.baseUrl+this.contests.thumbnail;
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },
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
  margin-top: 110px;
  margin-bottom: 60px;
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
