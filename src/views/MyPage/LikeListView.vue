<template>
  <div id="likelist">
    <div class="user-like-posts">
      <section class="posts-container">
        <section v-for="like in likeList" :key="like.id" class="post-item">
          <img :src="like.thumbnail" alt="thumbnail" class="post-thumbnail" />
          <div class="post-details">
            <h3>{{ like.title }}</h3>
            <div class="author-info">
              <img :src="like.profile" alt="profile" class="author-profile" />
              <span class="author-id">{{ like.userId }}</span>
            </div>
          </div>
        </section>
      </section>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
import Store from '@/store/index';

export default {
  data() {
    return {
      userId: Store.state.userId,
      likeList: {
        title: '',
        userId: '',
        thumbnail: '',
        profile: ''
      }
    };
  },
  created() {
    this.fetchScrapPosts();
    this.fetchScrapImg();
  },
  methods: {
    async fetchScrapPosts() {
      try {
        const args = `/users/likes?userId=${this.userId}`;
        const res = await axios.get(args);
        this.likeList = res.data; // API 응답 데이터를 posts에 저장
      } catch (error) {
        console.error('스크랩한 게시글 데이터를 가져오는데 실패했습니다.', error);
      }
    },
    async fetchScrapImg(){
      try {
        const args = `/users/image?userId=${this.userId}`;
        const res = await axios.get(args);
        this.likeList.profile = res.data; // API 응답 데이터를 posts에 저장
      } catch (error) {
        console.error('스크랩한 게시글 데이터를 가져오는데 실패했습니다.', error);
      }
    }

  }
};
</script>

<style>
#likelist{
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.user-like-posts {
  padding: 20px;
}
.posts-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
.post-item {
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.post-thumbnail {
  width: 100%;
  height: auto;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
}
.post-details {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.author-info {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.author-profile {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}
.author-id {
  font-size: 14px;
  color: #555;
}
</style>
