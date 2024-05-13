<template>
  <div class="generalboardpage">
    <div class="generalboardpage-container">

    <div class="title">
      <!--{{ post.title }}-->
    </div>

    <div class="user_info">
        <div v-for="user in users">
          <section class="user_profiles">{{ user.nickname }}</section> <!--<img :src="post.user.profilePicture" alt="프로필 사진">-->
          <section class="user_name"> {{ user.userId }} </section>
        </div>
    </div>

    <div class="date">
      <section class="date_container">
        <!--{{ post.date }}-->
        date
      </section>

    </div>

    <div class="content">
      <section class="content-container">
        <!--{{ post.content }}-->

      </section>
    </div>


      <!-- 댓글 작성 폼 -->
      <div class="comment-container">
        <div class="comment-input">
          <input type="text" v-model="newComment" placeholder="댓글을 입력하세요" class="comment-form">

            <button type="button" class="btn btn-secondary rounded-circle" style="background-color: #80C85F" @click="submitComment">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="20" fill="#FFFFFF" class="bi bi-arrow-up-circle" viewBox="0 0 16 16">
                <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"></path>
              </svg>
            </button>

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
      user: null,
      users: [], //data에 데이터를 넣기 위한 users 리스트 초기화
      article: null,
      comments: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      await api.getUser().then(res => {
        this.users = res.data;
        console.log("res:", res);
      })
      //axios.get('http://localhost:3004/user')
          //.then(response => {
            //console.log('user',response.data);
           // this.users = response.data;
            //console.log('users', this.users);
         // })
         // .catch(error => {
          //  console.error('Error fetching user data:', error);
        //  }).finally();

      /*axios.get('http://localhost:3004/article/1')
          .then(response => {
            this.article = response.data.article[0];
          })
          .catch(error => {
            console.error('Error fetching article data:', error);
          });*/

      /*axios.get('http://localhost:3004/comments?postId=1')
          .then(response => {
            this.comments = response.data.comments;
          })
          .catch(error => {
            console.error('Error fetching comments data:', error);
          });*/
    }
    }
};
</script>

<style>
.generalboardpage{
  position: relative;
  width:100%;
  height:1200px;
}
.generalboardpage-container{
  position: relative;
  margin: auto;
  width: 80%;
  height: 150%;
}
.title {
  width:50%;
  height:50px;
  border: 1.5px solid #8D8D8D;
  border-radius: 5px;
  position: relative;
  margin-left: 25%;
  font-size: 13px;
  font-weight: 500;
}
.user_info{
  grid-column: span 2;
  display: flex!important;
  margin:auto;
  position: relative;
  width: 20%;
  height: 4%;
  margin-right: 55%;
  top:2px;
}
.user_profile{
  width: 21%;
  height: 50px;
  margin: 20px 1px;
  border: 1px solid #8D8D8D;
  align-content: center;
}
.user_name{
  width:80%;
  height: 50px;
  margin:20px 1px;
  border: 1px solid;
  position: relative;
  align-content: center;
  text-align: left;
}
.date{
  width:8%;
  margin-left: 25%;
  height:35px;
  position: relative;
  top: 4px;
}
.date_container{
  border: 1px solid #8D8D8D;
  width: 100%;
  height: 100%;
  position: relative;
  margin: 5px 1px;
  top: -4px;
  font-size: 17px;
  text-align: left;
}
.content{
  width:50%;
  margin:auto;
  height:40px;
  border: 1px solid;
  position: relative;
  top:30px;
  height:600px;
  border-radius: 4px;
}
.comment-container {
  position: relative;
  margin-top: 55px;
  width: 50%;
  margin-left: 25%;
}

.comment-input {
  display: flex;
}

.comment-input input[type="text"] {
  flex: 1;
  height: 50px;
  border: 1px solid #8D8D8D;
  border-radius: 5px;
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
svg.bi-arrow-up-circle{
  width: 25px;
  height: 25px;
}


</style>