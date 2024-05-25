<template>
  <div id="scraplist">
    <div class="user-scrap-posts">
      <section class="posts-container">
        <section v-for="scrap in scrapList" :key="scrap.id" class="post-item">
          <img :src="scrap.thumbnail" alt="thumbnail" class="post-thumbnail" />
          <div class="post-details">
            <h3>{{ scrap.title }}</h3>
            <div class="author-info">
              <img :src="scrap.author.profile" alt="profile" class="author-profile" />
              <span class="author-id">{{ scrap.author.id }}</span>
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
      scrapList: []
    };
  },
  created() {
    this.fetchScrapPosts();
    this.fetchScrapImg();
  },
  methods: {
    async fetchScrapPosts() {
      try {
        const args = `/users/followers?userId=${this.userId}`;
        const res = await axios.get(args);
        this.scrapList = res.data; // API 응답 데이터를 posts에 저장
      } catch (error) {
        console.error('스크랩한 게시글 데이터를 가져오는데 실패했습니다.', error);
      }
    },
    async fetchScrapImg(){
      try {
        const args = `/users/details?userId=${this.userId}`;
        const res = await axios.get(args);
        this.scrapList.profile = res.data; // API 응답 데이터를 posts에 저장
      } catch (error) {
        console.error('스크랩한 게시글 데이터를 가져오는데 실패했습니다.', error);
      }
    }
  }
};
</script>

<style>
#scraplist{
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 1080px;
  margin: 0;
}
.user-scrap-posts {
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
