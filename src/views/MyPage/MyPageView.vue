<template>
  <div id="my-page">
    <div class="my-page-container">
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
        <section class="my-page-content-wrapper" v-for="user in users">
          <!-- 왼쪽 컨텐츠 -->
          <section class="left-container">
            <section class="left-content">
              <!-- 공유 버튼 -->
              <section class="share-button-container">
                <button @click="copyUrl()" class="share-button-wrapper"><img src="../../assets/mypage_icon/mypageShareIcon.png" style="width: 70px; height: 62px; left: 5px;"><!--<h2>클릭결과: {{ result }}</h2>--></button>
              </section>
              <!-- 프로필 컨테이너 -->
              <section class="profile-container">
                <section class="profile-wrapper"><img :src="user.profile" style="width: 100%; height: 100%; border-radius: 50%;"></section>
              </section>
              <!-- 닉네임 -->
              <section class="nickname-container">
                <section class="nickname-content"><a> {{ user.nickname }} </a></section>
              </section>
              <!-- 채팅 버튼 -->
              <section class="chat-container">
                <section class="chat-wrapper">
                  <button class="chat-icon-btn"><router-link to="/Chat"> <img src="../../assets/mypage_icon/chatIcon.png" style="position: relative; width: 42px; height: 41px; right: 5px;"></router-link></button>
                  <section class="chat-message-content"><router-link to="/chat"> <a>채팅하기</a> </router-link></section>
                </section>
              </section>
              <!-- 팔로워 -->
              <section class="follow-list-container">
                <section class="follow-list-wrapper">
                  <section class="follow-list-wrapper-follower">
                    <router-link to="/follower"> <a>팔로워</a><br> <a>0</a></router-link>
                  </section>
                  <section class="line"> | </section>
                  <!-- 팔로잉 -->
                  <section class="follow-list-wrapper-following">
                    <router-link to="/following"> <a>팔로잉</a>
                    <br><a>0</a></router-link>
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
                  <section class="scrap-content"><router-link to="/scrap"><a> 스크랩북 <br> 0</a></router-link></section>
                  <!-- 좋아요 -->
                  <section class="like-content"><router-link to="/like"><a> 좋아요 <br> 0 </a></router-link></section>
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
                <section class="house-content"></section>
              </section>

              <!-- 공모전 -->
              <section class="competition-container">
                <section class="competition-header house-header">
                  <a> 공모전 </a>
                </section>
                <section class="competition-content"></section>
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

export default {
  name: 'MyPageView',
  data(){
    return{
      input: '',
      result:'',
      data: "null",
      users: [],
      userId: Store.state.userId,
    }
  },
  mounted(){
    this.getUser();
  },
  methods:{
    async getUser(){
      const args=`/user`;
      await api.getUser(args).then(res => {
        this.users=res.data;
        console.log("응답 성공", res);
      })
    },
    copyUrl(){
      const pageUrl = window.location.href; // 현재 페이지의 URL
      navigator.clipboard.writeText(pageUrl).then(() => {
        alert("클립보드에 복사되었습니다.");
      }).catch(err => {
        alert("URL 복사에 실패했습니다. 브라우저가 클립보드 복사를 지원하지 않습니다.");
        console.error("Could not copy text: ", err);
      });
    }
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
  width: 100%;
  height: 60%;
}
.header-container-wrapper{
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  width: 15%;
  height: 2%;
  left: 44%;
  top: -8em;
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
  width: 100%;
  height: 100%;
}
.my-page-content-wrapper{
  position: relative;
  width: 80%;
  height: 100%;
  margin: auto;
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-template-rows: 1fr;
}
.left-container{
  position: relative;
  width: 66%;
  height: 110%;
  margin: auto;
  border: 1px solid #CCC5C5;
  border-radius: 10px;
  left: 3.5%;
  top: -2em;
  align-items: center;
  align-content: center;
}
.left-content{
  position: relative;
  margin: auto;
  width: 100%;
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
  left: 80px;
  width: 90%;
  height: 100%;
}
.right-content{
  position: relative;
  width: 100%;
  height: 95%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 1fr);
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