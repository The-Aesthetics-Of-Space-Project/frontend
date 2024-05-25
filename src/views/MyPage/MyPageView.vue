<template>
  <div id="my-page">
    <div class="my-page-container">
      <LikeListView @usersDetails="getOtherUser"> </LikeListView>
      <!-- 프로필/설정 (헤더) -->
      <section class="header-container-wrapper">
        <section class="container-header-wrapper-profile">
          <router-link to="/profile"> 프로필 </router-link>
        </section>
        <section class="container-header-wrapper-setting">
          <router-link to="/setting"> <a>설정</a> </router-link>
        </section>
      </section>

      <section class="my-page-content-container">
        <section class="my-page-content-wrapper" >
          <!-- 왼쪽 컨텐츠 -->
          <section class="left-container">
            <section class="left-content">
              <!-- 공유 버튼 -->
              <section class="share-button-container">
                <button @click="copyUrl()" class="share-button-wrapper"><img src="../../assets/mypage_icon/mypageShareIcon.png" style="width: 70px; height: 62px; left: 5px;"><!--<h2>클릭결과: {{ result }}</h2>--></button>
              </section>
              <!-- 프로필 컨테이너 -->
              <section class="profile-container">
                <section class="profile-wrapper"><img :src="this.users.profile" style="width: 100%; height: 100%; border-radius: 50%;"></section>
              </section>
              <!-- 닉네임 -->
              <section class="nickname-container">
                <section class="nickname-content"><a> {{this.users.nickname}} </a></section>
              </section>
              <!-- 채팅 버튼 -->
              <section class="chat-container">
                <section class="chat-wrapper">
                  <button class="chat-icon-btn"><router-link to="/chat"> <img src="../../assets/mypage_icon/chatIcon.png" style="position: relative; width: 42px; height: 41px; right: 5px;"></router-link></button>
                  <section class="chat-message-content"><router-link to="/chat"> <a>채팅하기</a> </router-link></section>
                </section>
              </section>
              <!-- 팔로워 -->
              <section class="follow-list-container">
                <section class="follow-list-wrapper">
                  <section class="follow-list-wrapper-follower">
                    <router-link to="/follower"> <a>팔로워</a><br> <a>{{this.users.follower}}</a></router-link>
                  </section>
                  <section class="line"> | </section>
                  <!-- 팔로잉 -->
                  <section class="follow-list-wrapper-following">
                    <router-link to="/following"> <a>팔로잉</a>
                    <br><a>{{this.users.following}}</a></router-link>
                  </section>

                </section>

              </section>
              <!-- 줄 -->
              <section class="line-container"><hr/></section>

              <section class="content-under-container">
                <section class="content-under-wrapper">
                  <!-- 스크랩 이미지 -->
                  <section class="img-wrapper-scrap"><img src="../../assets/mypage_icon/scrapbook.png"></section>
                  <!-- 좋아요 이미지 -->
                  <section class="img-wrapper-like"><img src="../../assets/mypage_icon/like.png"></section>
                  <!-- 스크랩 -->
                  <section class="scrap-content"><router-link to="/scrap"><a> 스크랩북 <br> {{this.users.scraps}}</a></router-link></section>
                  <!-- 좋아요 -->
                  <section class="like-content"><router-link to="/like"><a> 좋아요 <br> {{this.users.likes}}</a></router-link></section>
                </section>
              </section>

            </section>
          </section>

          <!-- 오른쪽 컨텐츠 -->
          <section class="right-container">
            <section class="right-content">
              <!-- 집들이 -->
              <section class="house-container">
                <section class="house-header">
                  <a> 집들이 </a>
                </section>

                <section class="house-content" style="position: relative; width: 60%; height: 280px; border: 1px dashed #CCC5C5; border-radius: 10px; display: flex; overflow-x: auto;">
                  <section class="user-posts-container" style="display: flex; flex-wrap: nowrap; gap: 20px;">
                    <section class="user-posts-wrapper" v-for="post in posts" :key="post.id" style=" border-radius: 11.1%; border: 1px solid rgb(120,117,117,50%); margin-top: 8px; flex: 0 0 auto; display: flex; flex-direction: column;">
                      <!-- 게시글 썸네일과 제목 -->
                      <div class="mypage-post-thumbnail" style="width: 300px; height: 220px; border: none;">
                        <img :src="post.thumbnail" alt="게시글 썸네일" class="thumbnail-image" @click="goToPostDetails(post.articleId)" style="cursor: pointer; border-radius: 12.5%; width: 100%; height: 210px;">
                      </div>
                      <div class="post-title" @click="goToPostDetails(post.articleId)" style="cursor: pointer; margin-left: 10px; text-align: left; font-weight: 550;"> <a>{{ post.title }}</a></div>
                    </section>
                  </section>
                </section>

              <!-- 공모전 -->
              <section class="competition-container">
                <section class="competition-header house-header">
                  <a> 공모전 </a>
                </section>
                <section class="competition-content" style="position: relative; width: 60%; height: 280px; border: 1px dashed #CCC5C5; border-radius: 10px; display: flex; overflow-x: auto;">
                  <section class="user-posts-container" style="display: flex; flex-wrap: nowrap; gap: 20px;">
                    <section class="user-posts-contest-wrapper" v-for="post in posts" :key="post.id" style=" border-radius: 11.1%; border: 1px solid rgb(120,117,117,50%); margin-top: 8px; flex: 0 0 auto; display: flex; flex-direction: column;">
                      <!-- 게시글 썸네일과 제목 -->
                      <div  class="post-thumbnail" style="width: 300px; height: 220px; border: none;">
                        <img :src="post.thumbnail" alt="게시글 썸네일" class="thumbnail-image" style="border-radius: 12.5%; width: 100%; height: 210px;">
                      </div>
                      <div class="post-title" style="">{{ post.title }}</div>
                    </section>
                  </section>
                </section>
              </section>
            </section>
          </section>
        </section>
      </section>
      </section>
    </div>
  </div>
</template>


<script>
import Store from "@/store/index";
import {api} from "@/api/api";
import axios from "axios";

export default {
  name: 'MyPageView',
  props:{
    // 본인이 아닌 다른 사람의 userId
    getUserId: {
      type: String,
      required: true
    }
  },
  data(){
    return{
      input: '',
      result:'',
      data: null,
      userId: Store.state.userId,
      users: {
        userId: '',
        profile: '',
        nickname: '',
        follower: '',
        following: '',
        likes: '',
        scraps: '',
      },
      posts: {
        articleId: '',
        title: '',
        thumbnail: '',
        nickname: '',
        likeCount: ''
      }
    }
  },
  mounted(){
      if(this.userId){
        this.getUser();
        this.getPost();
      }else{
        this.getOtherUser();
        this.getOtherPost();
      }
  },
  methods:{
    /* 본인일 때 유저 정보 조회 */
    async getUser(){
        try {
          const args = `/users/details?userId=${encodeURIComponent(this.userId)}`;
          const res = await api.getUserInfo(args);
          this.users = res.data;
        } catch (error) {
          console.error(error);
        }
    },
    /* 본인 아닐때 목록 조회 */
    async getOtherUser(getUserId){
        try {
          const args = `/users/details?userId=${encodeURIComponent(getUserId)}`;
          const res = await api.getUserInfo(args);
          this.users = res.data;
        } catch (error) {
          console.error(error);
        }
    },
    /* 게시글 목록 조회 */
    async getPost(){
      try {
        const args = `/users/posts?userId=${encodeURIComponent(this.users.userId)}`;
        const res = await api.getPost(args);
        this.posts = res.data;
      } catch (error) {
        console.error(error);
      }
    },
    /* 본인 아닐 때 게시글 목록 조회 */
    async getOtherPost(getUserId){
      try {
        const args = `/users/posts?userId=${encodeURIComponent(getUserId)}`;
        const res = await api.getPost(args);
        this.posts = res.data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchImg(){
      try {
        const args = `/users/image?userId=${this.userId}`;
        const res = await axios.get(args);
        this.users.profile = res.data; // API 응답 데이터를 posts에 저장
      } catch (error) {
        console.error('스크랩한 게시글 데이터를 가져오는데 실패했습니다.', error);
      }
    },
    copyUrl(){
      const pageUrl = window.location.href; // 현재 페이지의 URL
      navigator.clipboard.writeText(pageUrl).then(() => {
        alert("클립보드에 복사되었습니다.");
      }).catch(err => {
        alert("URL 복사에 실패했습니다.");
        console.error("Could not copy text: ", err);
      });
    },
  }
}
</script>


<style>
#my-page{
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: relative;
  width: 100%;
  height: 1080px;
  margin: 0;
  align-content: center;
}
.my-page-container{
  position: relative;
  width: 80%;
  height: 60%;
}
.header-container-wrapper{
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  width: 20%;
  height: 5%;
  left: 40em;
  top: -5em;
  font-size: 19px;
  gap: 4px;
}
.container-header-wrapper-profile{
  position: relative;
  width: 70%;
  color: #80C85F;
  font-weight: 560;
  font-size: 20px;
}
.container-header-wrapper-profile a{
  position: relative;
  width: 10%;
  text-decoration: none;
  color: #80C85F;
  font-weight: 560;
  font-size: 20px;
}
.container-header-wrapper-setting{
  position: relative;
  width: 70%;
  text-decoration: none;
  color: #757575;
  font-weight: 550;
}
.container-header-wrapper-setting a{
  position: relative;
  width: 80%;
  text-decoration: none;
  color: #757575;
  font-weight: 550;
}
.container-header-wrapper-setting a:hover{
  color: rgb(128,200,95,100%);
  font-weight: bold;
}
.my-page-content-container{
  position: relative;
  margin: auto;
  width: 90%;
  height: 100%;
}
.my-page-content-wrapper{
  position: relative;
  width: 80%;
  height: 100%;
  margin: auto;
  display: flex;
}
.left-container{
  position: relative;
  width: 57%;
  height: 110%;
  margin: auto;
  border: 1px solid #CCC5C5;
  border-radius: 10px;
  left: 5em;
  top: -2em;
  align-items: center;
  align-content: center;
}
.left-content{
  position: relative;
  margin: auto;
  width: 87%;
  height: 100%;
}
/* 공유버튼 */
.share-button-container{
  position: relative;
  width: 25%;
  height: 12%;
  left: 74%;
  top: 1.3em;
}
.share-button-wrapper{
  position: relative;
  width: 100%;
  margin: auto;
  background-color: white;
  border: 0px;
}
/* 프로필 */
.profile-container{
  position: relative;
  width: 80%;
  height: 260px;
  margin: auto;
}
.profile-wrapper{
  position: relative;
  width: 87%;
  height: 240px;
  top: 1px;
  margin: auto;
  border: 1px solid #CCC5C5;
  border-radius: 50%;
}
/* 닉네임 */
.nickname-container{
  position: relative;
  width: 100%;
  height: 5%;
  top: 5px;
  margin: auto;
}
.nickname-content{
  position: relative;
  width: 80%;
  margin: auto;
  font-weight: 650;
  font-size: 21px;
  line-height: 150%;
}
/* 채팅 */
.chat-container{
  position: relative;
  top: 12px;
  width: 80%;
  height: 6%;
  margin: auto;
}
.chat-wrapper{
  position: relative;
  width: 70%;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1fr;
  margin: auto;
  left: 20px;
}
.chat-icon-btn{
  padding: -5px;
  margin: auto;
  width: 62%;
  left: -10px;
  border: none;
  background-color: white;
}
.chat-message-content{
  position: relative;
  width: 50%;
  height: 50%;
  margin: auto;
  left: -27px;
}
.chat-message-content a{
  text-decoration: none;
  color: rgb(0,0,0,65%);
  font-weight: bold;
  font-size: 1.0em;
}
.chat-message-content a:hover{
  color: rgb(128,200,95,100%);
  font-weight: bold;
}
/* 팔로워 팔로잉 */
.follow-list-container{
  position: relative;
  width: 100%;
  height: 10%;
  top: 20px;
  margin: auto;
}
.follow-list-wrapper{
  position: relative;
  width: 70%;
  height:100%;
  margin: auto;
  display: grid;
  grid-template-columns: 10fr 1fr 10fr;
  grid-column-gap: -5px;
  font-weight: 700;
  font-size: 17px;
  line-height: 200%;
}
/* 팔로워 */
.follow-list-wrapper-follower{
  position: relative;
  width: 90%;
  height: 80%;
  margin: auto;
}
/* 팔로워 0 */
.follow-list-wrapper-follower a{
  position: relative;
  width: 70px;
  height: 70px;
  text-align: center;
  color: #787575;
  text-decoration: none;
  margin-left: -1px;
}
.follow-list-wrapper-follower a:hover{
  color: rgb(128,200,95,100%);
  font-weight: bold;
}
/* 팔로잉 0 */
.follow-list-wrapper-following{
  position: relative;
  width: 90%;
  height: 80%;
  margin: auto;
  text-decoration: none;
}
.follow-list-wrapper-following a{
  color: #787575;
  text-decoration: none;
}
.follow-list-wrapper-following a:hover{
  color: rgb(128,200,95,100%);
  font-weight: bold;
}
.line{
  position: relative;
  width: 5%;
  margin: auto;
  color: #787575;
  align-items: center;
}
/* 구분선 */
.line-container{
  position: relative;
  width: 80%;
  height: 5%;
  top: 22px;
  margin: auto;
  align-items: center;
  align-content: center;
}
hr{
  position: relative;
  width: 100%;
  height: 1.3px;
  background-color: #757575;
}
.content-under-container{
  position: relative;
  width: 100%;
  height: 20%;
  top: 19px;
  margin: auto;
}
.content-under-wrapper{
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  grid-template-rows: 3fr 2fr;
  grid-column-gap: 1px;
  grid-row-gap: 1px;
  width: 80%;
  height: 80%;
  align-items: center;
  align-content: center;
  margin: auto;
}
.img-wrapper-like{
  position: relative;
  margin: auto;
  width: 100%;
  height: 100%;
}
.img-wrapper-scrap{
  position: relative;
  margin: auto;
  width: 100%;
  height: 75%;
}
/* 스크랩북 */
.scrap-content{
  position: relative;
  font-size: 16px;
  font-weight: 700;
  color: #787575;
  width: 100px;
  height: 20px;
  line-height: 200%;
  align-items: center;
  text-align: center;
  margin: auto;
}
.scrap-content a{
  color: #787575;
  text-decoration: none;
}
.scrap-content a:hover{
  color: rgb(128,200,95,100%);
  text-decoration: none;
}
/* 좋아요 */
.like-content{
  position: relative;
  font-weight: 700;
  font-size: 16px;
  width: 82px;
  height: 20px;
  line-height: 200%;
  align-items: center;
  text-align: center;
  color: #787575;
  margin: auto;
}
.like-content a{
  color: #787575;
  text-decoration: none;
}
.like-content a:hover{
  color: rgb(128,200,95,100%);
  text-decoration: none;
}
/* 오른쪽 컨테이너 */
.right-container{
  position: relative;
  top: -30px;
  width: 60%;
  height: 90%;
}
.right-content{
  position: relative;
  width: 90%;
  height: 89%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 1fr);
  left: 13em;
}
/* 집들이 헤더 */
.house-header{
  position: relative;
  font-weight: 550;
  margin: 2px 15px;
  text-align: left;
}
.house-content{
  position: relative;
  width: 75%;
  height: 100%;
  margin: 5px 15px;
  border: 1px dashed #CCC5C5;
  border-radius: 10px;
}
/* 공모전 헤더 */
.competition-header{
  position: relative;
  top: 60px;
}
.competition-content{
  position: relative;
  top: 60px;
  width: 75%;
  height: 100%;
  margin: 5px 15px;
  border: 1px dashed #CCC5C5;
  border-radius: 10px;
}
</style>