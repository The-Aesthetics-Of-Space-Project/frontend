<template>
  <div id="generalboard">
    <div class="content-wrapper">
      <div class="grid-container">
        <div class="box-content" v-for="post in posts" :key="post.id">
          <section class="thumbnail" style="cursor: pointer;" >
            <img :src="post.thumbnail" alt="Post Thumbnail" class="post-thumbnail" width="100px" height="50px"
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
              <span @click="goToUserDetails(user.userId)">{{ post.nickname }}</span>
            </section>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "@/api/api";

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
    };
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await api.getPost('/posts');
        this.posts = response.data;
        console.error('response posts:', response);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },
    goToPostDetails(postId) {
      this.$router.push({ name: 'GeneralBoardPage', params: { id: postId } });
    },
    goToUserDetails(userId) {
      // Add the logic to navigate to the user details page if needed
      console.log(`Navigate to user details with ID: ${userId}`);
    }
  }
};
</script>

<style>
#generalboard{
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: relative;
  width:100%;
  height:1200px;
  margin: 0;
}
.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
}
.grid-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
}
.box-content {
  flex: 1 1 calc(33.333% - 40px);
  max-width: calc(33.333% - 40px);
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  box-sizing: border-box;
}
.thumbnail img {
  width: 90%;
  height: 40%;
  border-radius: 10px;
}
.heart-contents {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
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
  margin-top: 15px;
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
