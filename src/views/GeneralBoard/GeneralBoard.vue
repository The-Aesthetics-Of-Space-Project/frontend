<template>
  <div id="generalboard">
    <div class="content-wrapper">
      <div class="content-wrapper">
          <section class="box-content1" v-for="user in users">
            <!--<img :src="user.thumnail">-->
            <section class="heart-contents">
              <button type="button" class="heart-button">
                <img :src="liked ? HeartImg : EmptyHeartImg" @click="toggleLike" width="25px" height="25px" />
              </button>
              <section class="count-number">
                <a> 123 </a>
              </section>

            </section>
            <section class="content-title-wrapper">
              <section class="content-title">
                <a> {{ user.userId }} </a>
              </section>
              <section class="content-nickname content-title">
                <section class="user-profile">
                  <img :src="user.profile"/>
                </section>

                <a> {{ user.nickname }} </a>

              </section>

            </section>

          </section>

          <section class="box-content2 box-content1">
            <section class="heart-contents2 heart-contents">
              <button type="button" class="heart-button">
                <img :src="liked ? HeartImg : EmptyHeartImg" @click="toggleLike" width="25px" height="25px"/>
              </button>
            </section>

          </section>

          <section class="box-content3 box-content1">
            <section class="heart-contents">
              <button type="button" class="heart-button">
                <img :src="liked ? HeartImg : EmptyHeartImg" @click="toggleLike" width="25px" height="25px"/>
              </button>
            </section>

          </section>


        <section class="box-content4 box-content1">
          <section class="heart-contents">
            <button type="button" class="heart-button">
              <img :src="liked ? HeartImg : EmptyHeartImg" @click="toggleLike" width="25px" height="25px"/>
            </button>
          </section>

        </section>

        <section class="box-content5 box-content1">
          <section class="heart-contents2 heart-contents">
            <button type="button" class="heart-button">
              <img :src="liked ? HeartImg : EmptyHeartImg" @click="toggleLike" width="25px" height="25px"/>
            </button>
          </section>

        </section>

        <section class="box-content6 box-content1">
          <section class="heart-contents">
            <button type="button" class="heart-button">
              <img :src="liked ? HeartImg : EmptyHeartImg" @click="toggleLike" width="25px" height="25px"/>
            </button>
          </section>

        </section>

        <section class="box-content7 box-content1">
          <section class="heart-contents">
            <button type="button" class="heart-button">
              <img :src="liked ? HeartImg : EmptyHeartImg" @click="toggleLike" width="25px" height="25px"/>
            </button>
          </section>

        </section>

        <section class="box-content8 box-content1">
          <section class="heart-contents">
            <button type="button" class="heart-button">
              <img :src="liked ? HeartImg : EmptyHeartImg" @click="toggleLike" width="25px" height="25px"/>
            </button>
          </section>

        </section>

        <section class="box-content9 box-content1">
          <section class="heart-contents">
            <button type="button" class="heart-button">
              <img :src="liked ? HeartImg : EmptyHeartImg" @click="toggleLike" width="25px" height="25px"/>
            </button>
          </section>

        </section>



      </div>

    </div>

  </div>
</template>

<script>
//import {api} from "@/api/api";
import axios from "axios";
import {api} from "@/api/api";

export default {
  name: 'HeartButton',
  data() {
    return {
      liked: false,
      HeartImg: require('@/assets/generalboardpage_icon/heart.png'),
      EmptyHeartImg: require('@/assets/generalboardpage_icon/emptyheart.png'),
      users: [], //data에 데이터를 넣기 위한 users 리스트 초기화

      // eslint-disable-next-line vue/no-dupe-keys
      data: "null",
    }
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      await api.getUser('/user').then(res => {
        this.users = res;
        console.log("res:", res);
      })
      /*async init(){
      await api.getUser().then(res => {
        this.setUser(res)
      })
    },*/

      /*onClick(){
  axios
      .get('https://my-json-server.typicode.com/typicode/demo/posts', {})
      .then((res)=> {
        console.log(res);
        this.data = res.data;
        console.log("성공");
      })
      .catch((res) => {
        console.log(res);
      })

}*/
    },

  },
}

</script>

<style>
#generalboard{
  font-family: Inter;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: relative;
  width: 100%;
  height: 1080px;
  margin: 0;
}
.content-wrapper{
  position: absolute;
  margin: 0.5% 5%;
  width: 90%;
}
.content-wrapper{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  position: relative;
  grid-template-rows: 1fr;
  grid-column-gap: 2px;
  align-items: center;
  margin-left: 16.5%;
  width: 65%;
  height: 190px;
}
.box-content1{
  position: relative;
  border: 2px solid #d9d9d9;
  border-radius: 15px;
  height: 190px;
  width: 310px;
}
.heart-contents{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 45px;
  position: relative;
  width: 29%;
  height: 25%;
  margin: 45% 68%;
  align-items: center;
}
.heart-button{
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
.count-number a{
  position: relative;
  align-items: center;
  align-content: center;
  width: 40px;
  height: 20px;
  font-style: normal;
  font-weight: 400;
  margin-right: 5px;
}
.content-title-wrapper{
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 1fr);
  width: 100%;
  height: 40%;
  margin-top: -120px;
  align-items: center;
  gap: -5px;
}
.content-title{
  position: relative;
  font-size: 18px;
  height: 100%;
  font-weight: 550;
}
.content-nickname{
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 1fr;
  text-align: left;
  font-size: 15px;
  width: 100%;
  height: 100%;
  margin-bottom: 1px;
}
.user-profile{
  position: relative;
  margin: auto;
  width: 60%;
  height: 100%;
  border-radius: 50%;
  background-color: cornflowerblue;
}
.box-content2{
  position: relative;
  margin-left: 7%;
}
.box-content3{
  position: relative;
  margin-left: 14%;
}
.box-content4{
  position: relative;
  margin-top: 40%;
}
.box-content5{
  position: relative;
  margin-top: 40%;
  margin-left: 7%;
}
.box-content6{
  position: relative;
  margin-top: 40%;
  margin-left: 14%;
}
.box-content7{
  position: relative;
  margin-top: 41%;
}
.box-content8{
  position: relative;
  margin-top: 41%;
  margin-left: 10%;
}
.box-content9{
  position: relative;
  margin-top: 41%;
  margin-left: 17%;
}
.heart-content{
  width: 14%;
  height: 15%;
  margin: 33% 78%;
}



</style>