<template>
  <div id="generalboard">
    <div class="content-container">
      <div class="content-wrapper">
          <section class="box-content1">
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
                <a> 게시물 제목 </a>
              </section>
              <section class="content-nickname content-title">
                <a> 닉네임 </a>


              </section>
              <!--<button type="button" @click="onClick(getDataId)">axios Get</button>
              <li v-for="(v, i) in data.data" :key="`data${i}`">
                <p> id: {{ v.id }} </p>
                <p> title: {{ v.title }}</p>
              </li>
              {{data}}-->

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


      </div>

    </div>

  </div>
</template>


<script>
//import {api} from "@/api/api";
import data from "bootstrap/js/src/dom/data";
import axios from "axios";

export default {
  name: 'HeartButton',
  computed: {
    data() {
      return data
    }
  },
  data() {
    return {
      liked: false,
      HeartImg: require('@/assets/heart.png'),
      EmptyHeartImg: require('@/assets/emptyheart.png'),

      // eslint-disable-next-line vue/no-dupe-keys
      data: "null",
    };
  },
  methods: {
    toggleLike() {
      this.liked = !this.liked;
      // 여기서 서버에 좋아요 상태 업데이트를 위한 API 호출을 할 수 있습니다.

    },
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
};


</script>


<style scoped>
html{
  scroll-behavior: smooth;
}
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
a{
  font-family: Inter;
  font-size: 17px;
}
.content-container{
  position: absolute;
  margin: 0.5% 5%;
  width: 90%;
  height: 250%;
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
  height: 44%;
  margin-top: -120px;
  align-items: center;
  gap: -1px;
}
.content-title{
  font-weight: 550;
}
.content-nickname{
  width: 100%;
  height: 100%;
}
.box-content2{
  margin-left: 7%;
}
.box-content3{
  margin-left: 14%;
}
.box-content4{
  margin-top: 40%;
}
.box-content5{
  margin-top: 40%;
  margin-left: 7%;
}
.box-content6{
  margin-top: 40%;
  margin-left: 14%;
}
.box-content7{
  margin-top: 75%;
}
.box-content8{
  margin-top: 75%;
  margin-left: 20%;
}
.box-content9{
  margin-top: 75%;
  margin-left: 40%;
}
.heart-content{
  width: 14%;
  height: 15%;
  margin: 33% 78%;
}



</style>