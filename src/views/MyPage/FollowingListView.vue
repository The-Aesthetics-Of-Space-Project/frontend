<template>
  <div id="followingList">
    <div class="following-container">
      <div class="following-wrapper" v-for="followings in following" :key="followings.userId">
        <section class="list-profile-img-container">
          <img :src="followings.profile" v-if="profileImage" style="width: 76px; height: 76px; border: 1px solid black; border-radius: 50%;" />
        </section>

        <section class="list-name-container">
          <section class="list-userId-container">
            {{ followings.userId }}
          </section>
          <section class="list-nickName-container">
            {{ followings.nickname }}
          </section>
        </section>

        <section class="list-follower-delete-btn">
          <button class="follower-delete-btn" @click="deleteFollow(followings.userId)">
            팔로잉 </button>
        </section>

      </div>
    </div>
  </div>
</template>

<script>
import {api} from "@/api/api";
import Store from "@/store";
import axios from "axios";
export default {
  data() {
    return {
      following: [
        {
          userId: '',
          nickname: '',
          profile: ''
        },
      ],
      data: "null",
      userId: Store.state.userId,
      profileImage: '',
          //`http://119.198.33.129:8080/users/image?userId=user1@jzip.com`
    };
  },
  mounted() {
    this.getFollow();
    this.fetchImg();
  },
  methods: {
    /* 팔로잉 목록 조회 */
    async getFollow() {
      const args=`/users/followings?userId=${this.userId}`
      await api.getFollow(args).then(res => {
        this.following = res.data;
        console.log("res: ", res);
      })
    },
    /* 언팔로잉(=팔로잉 삭제) */
    async deleteFollow(userId) {
      const args=`/users/unfollowing?userId=${this.userId}&follow=${userId}`;
      await api.deleteFollow(args).then(res => {
          // 3초 후에 팔로워가 목록에서 사라짐
          setTimeout(() => {
            this.following = this.following.filter(following => following.userId !== userId);
          }, 3000);
        console.log("res: ", res);
      })
    },
  }
};
</script>

<style>
#followingList{
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height: 100vh;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
}
.following-container{
  width: 90%;
  max-width: 1080px;
  height: auto;
  padding: 10px;
  justify-content: space-between;
}
.following-wrapper{
  width: 80%;
  max-width: 750px;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr repeat(2, 2fr);
  grid-template-rows: 1fr;
}
.list-profile-img-container{
  width: 40%;
  max-width: 750px;
  margin: auto;
  align-items: center;
  justify-content: center;
}
/* userId, nickname 컨테이너 */
.list-name-container{
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 2fr;
  margin-top: 17px;
  padding: 5px;
  text-align: left;
}
/* userId 컨테이너 */
.list-userId-container{
  width: 100%;
  max-width: 750px;
  font-size: 1.23em;
}
/* nickname 컨테이너 */
.list-nickName-container{
  width: 100%;
  max-width: 750px;
  font-size: 1.22em;
  color: rgb(0,0,0,70%);
  margin-left: 1px;
  margin-top: 5px;
}
/* 버튼 컨테이너 */
.list-follower-delete-btn{
  width: 50%;
  max-width: 750px;
  align-content: center;
  margin-left: 100px;
}
.follower-delete-btn{
  width: 55%;
  max-width: 750px;
  height: 32%;
  font-weight: 550;
  border-radius: 12px;
  border: none;
  background-color: rgb(48,82,58,85%);
  font-size: 17px;
  color: rgba(255,255,255,90%);
  box-shadow: 0px 0px 2px #444;
}
.follower-delete-btn:hover{
  font-weight: 550;
  border-radius: 12px;
  border: none;
  background-color: rgb(48,82,58,91%);
  font-size: 17px;
  color: rgba(255,255,255,100%);
}

</style>