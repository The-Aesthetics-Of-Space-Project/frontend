<template>
  <div id="generalboardpage">
    <div class="generalboardpage-container">

    <div class="title">
      <div class="title-content" style="position: relative; width: 100%; margin: auto;
      top: 10px; font-size: 26px; font-weight: 540; text-align: left;">
        <!--{{ user.title }}-->
      </div>
    </div>

    <div class="user_info" style="position: relative; width: 55%; height: 57px; margin: auto; left: 0px; top: 30px;" ><!--v-for="user in users"-->
      <section class="user_info_wrapper" style="position: relative; display: grid; grid-template-columns: 1fr 2fr; grid-template-rows: 1fr; width: 30%;
      height: 20px; top: 2px;">
        <router-link to="/my-page">
        <section class="user_profiles">
          <!--{{ user.nickname }}-->
        </section> <!--<img :src="post.user.profilePicture" alt="프로필 사진">-->
        </router-link>
        <router-link to="/my-page" style="text-decoration: none; color: black;">
        <section class="user_name" style="font-weight: 540;">
          whswls
          <!--{{ user.userId }}-->
        </section>
        </router-link>
      </section>

    </div>

    <div class="date">
      <section class="date_container">
        <!--{{ post.date }}-->
        date
      </section>

    </div>

    <div class="mypage-content-container" style="position: relative; left: 140px; top:10px; width: 80%; height: 100%;">
      <section class="content-wrappers">
        <section class="content">

        </section>
        <!--{{ post.content }}-->
      </section>

      <section class="side-btn-wrapper" style="position:fixed; width: 8%; height: 100%; right:17%; top: 19%; text-align: left;">
        <!-- 좋아요 버튼 -->
        <button type="button" class="heart-btn" @click="likeBtn" style="position: sticky; border: 1px solid rgb(141,141,141,70%); border-radius: 50%;
        width: 35%; height: 45px; top: 90%;">
          <img :src="liked ? HeartImg : EmptyHeartImg" width="25px" height="25px"/>
        </button>

        <!-- 스크랩 버튼 -->
        <button type="button" class="scrap-btn" @click="scrapBtn" style="position: sticky; border: 1px solid rgb(141,141,141,70%); border-radius: 50%;
        width: 35%; height: 45px; right: 50%; top: 84%; background-color: white;">
          <img :src="clicked ? ScrapImg : EmptyScrapImg" width="25px" height="25px"/>
        </button>

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
        </div>

        <div class="comment-confirm-container">
          <section class="comment-confirm-wrapper">
            <section class="comment-user-profile" style="position: relative; width: 52%; height: 52px; left: 15px; top: 5px; background-color: chartreuse; border: 1px solid #8D8D8D;
  border-radius: 50%;">
              <!-- <img :src=""/>-->
            </section>
            <section class="user-comment-wrapper" style="">
              <section class="comment-user-nickname" style="position: relative; width: 100%; text-align: left; top: 3px; left: -30px; font-size: 16.5px;
              font-weight: 550;">
                whswls
              </section>
              <section class="user-comment-content" style="position: relative; height: 20px; font-size: 20px; text-align: left; left: -28px; font-weight: 540; top:5px;">
                hello
              </section>

            </section>

          </section>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {api} from "@/api/api";

export default {
  name: 'GeneralBoardPage',
  data() {
    return {
      liked: false,
      clicked: false,
      user: null,
      users: [], //data에 데이터를 넣기 위한 users 리스트 초기화
      article: null,
      comments: [],
      HeartImg: require('@/assets/generalboardpage_icon/heart.png'),
      EmptyHeartImg: require('@/assets/generalboardpage_icon/emptyheart.png'),
      EmptyScrapImg: require('@/assets/generalboardpage_icon/emptyScrap.png'),
      ScrapImg: require('@/assets/generalboardpage_icon/fillScrap.png'),
      likeCnt: 0,

    };
  },
  created() {
    this.init();
  },
  computed:{
    isUserLogin(){
      return this.$store.getters.isLogin;
    }
  },
  methods: {
    likeBtn() {
      axios.post('http://localhost:3000/like', this.likeCnt, {
        headers: {
          "Content-Type": "application/json"
        },
      }).then(response => {
        console.log("좋아요 성공!", response);
        alert("좋아요를 눌렀습니다!");
        this.liked = !this.liked;
      }).catch(error => {
        console.log("좋아요 실패!", error);
      })
    },
    scrapBtn() {
      axios.post('http://localhost:3000/scrap', this.likeCnt, {
        headers: {
          "Content-Type": "application/json"
        },
      }).then(response => {
        console.log("스크랩 성공!", response);
        alert("스크랩 하셨습니다!");
        this.clicked = !this.clicked;
      }).catch(error => {
        console.log("스크랩 실패!", error);
      })
    },
  }
};
</script>

<style>
#generalboardpage{
  font-family: Inter;
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
  border: 1.5px solid #8D8D8D;
  border-radius: 5px;
  margin-left: 22%;
  font-size: 13px;
  font-weight: 500;
}
.title-content{
  position: relative;
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
  background-color: cornflowerblue;
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
  top: 35px;
}
.mypage-content-container{
  position: relative;
  display: grid;
  grid-template-columns: 6fr 1fr;
  grid-template-rows: 1fr;
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
  top: 80px;
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