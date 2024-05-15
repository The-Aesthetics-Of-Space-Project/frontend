<template>
  <div id="my-page">
    <div class="my-page-container">
      <section class="header-container-wrapper">
        <section class="container-header-wrapper-profile">
          <router-link to="/profile"> 프로필 </router-link>
        </section>
        <section class="container-header-wrapper-setting">
          <router-link to="/setting"> 설정 </router-link>
        </section>

      </section>

      <section class="content-container">
        <section class="left-container">
          <section class="left-content">
            <section class="share-button-container">
              <button @click="click()" class="share-button-wrapper">
                <img src="../assets/공유_1.png">
                <!--<h2>클릭결과: {{ result }}</h2>-->
              </button>
            </section>
            <section class="profile-container">
              <section class="profile-wrapper">
                <img src="../assets/프로필_2.png">
              </section>

            </section>

            <section class="nickname-container">
              <section class="nickname-content">
                <a> 닉네임 </a>
              </section>
            </section>

            <section class="follow-list-container">
              <section class="follow-list-wrapper">
                <section class="follow-list-wrapper-follower">
                  <router-link to="/follower"> 팔로워 </router-link>
                  <br>
                  <section class="follower-count">
                    <!--{{ number }}-->  0
                  </section>
                </section>

                <section class="line"> | </section>

                <section class="follow-list-wrapper-following">
                  <router-link to="/following"> 팔로잉 </router-link>
                  <br>
                  <section class="following-count">
                    <!--{{ number }}-->  0
                  </section>
                </section>

              </section>

            </section>

            <section class="line-container">
              <hr/>
            </section>

            <section class="content-under-container">
              <section class="content-under-wrapper">

                <section class="img-wrapper-scrap">
                  <img src="../assets/scrapbook.png">
                </section>

                <section class="img-wrapper-like">
                  <img src="../assets/like.png">
                </section>


                <section class="scrap-content">
                  <a> 스크랩북 <br> 0</a>

                </section>

                <section class="like-content">
                  <a> 좋아요 <br> 0 </a>
                </section>
              </section>

            </section>


          </section>

        </section>

        <section class="right-container">
          <section class="right-content">

            <section class="house-container">
              <section class="house-header">
                <a> 집들이 </a>
              </section>

              <section class="house-content">

              </section>

            </section>



            <section class="competition-container">
              <section class="competition-header house-header">
                <a> 공모전 </a>
              </section>

              <section class="competition-content house-content">

              </section>

            </section>


          </section>

        </section>

      </section>

    </div>

  </div>

</template>


<script>
export default {
  name: 'MyPageView',
  data(){
    return{
      input: '',
      result:''
    }
  },
  methods:{
    click(){
      this.result = this.input
    }
  }
}
</script>


<style scoped>
#my-page{
  font-family: Inter;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 80%;
  margin: 0;
  align-content: center;
}
.my-page-container{
  position: relative;
  width: 110%;
}
.header-container-wrapper{
  grid-column: span 2;
  display: flex!important;
  position: relative;
  width: 70%;
  margin: 10px 50%;
  font-size: 19px;
  gap: 40px;
}
.container-header-wrapper-profile a{
  text-decoration: none;
  color: #80C85F;
  font-weight: 560;
  font-size: 20px;
}
.container-header-wrapper-setting a{
  text-decoration: none;
  color: #757575;
  font-weight: 550;
}
.content-container{
  display: flex!important;
  margin: 10% 8%;
  width: 80%;
}
.house-header{
  position: relative;
  font-weight: 550;
  margin: 2px 15px;
  text-align: left;
}
.house-content{
  position: relative;
  width: 560px;
  height: 230px;
  margin: 5px 15px;
  border: 1px dashed #CCC5C5;
  border-radius: 10px;
}
.left-container{
  position: relative;
  width: 90%;
  margin: 0px 10%;
  height: 270%;
  border: 1px solid #CCC5C5;
  border-radius: 10px;
  align-items: center;
  align-content: center;
}
.left-content{
  margin: 13% 1%;
  width: 100%;
  height: 260%;
}
.right-container{
  position: relative;
  width: 63%;
  height: 530px;
  grid-row: span 3;
}
.share-button-container{
  position: absolute;
  margin: -25px 300px;
  width: 40px;
  height: 40px;
}
.follow-list-wrapper{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 30px;
  align-items: center;
  margin: 4% 10.5%;
  width: 40%;
  height: 8%;
  font-weight: 700;
  font-size: 17px;
  line-height: 200%;
}
/* 팔로워 0 | 팔로잉 0 */
.follow-list-wrapper-follower a{
  width: 70px;
  height: 70px;
  text-align: center;
  color: #787575;
  position: absolute;
  text-decoration: none;
  margin-left: -1px;
  align-items: center;
}
.line{
  margin-right: 40%;
  margin-bottom: 25px;
  color: #787575;
  align-items: center;
}
.follow-list-wrapper-following a{
  width: 70px;
  height: 70px;
  text-align: center;
  color: #787575;
  position: absolute;
  text-decoration: none;
  margin: 0% -15%;
  align-items: center;
}
.follower-count{
  margin: 5% 30%;
  width: 120px;
  height: 10px;
  color: #787575;
}
.following-count{
  margin: 5% -25%;
  width: 120px;
  height: 10px;
  color: #787575;
}
.competition-header{
  position: relative;
  margin-left: 14px;
  margin-top: 40px;

}
.share-button-wrapper{
  background-color: white;
  border: 0px;
}
.profile-container{
  margin: 2% 10%;
  width: 267.96px;
  height: 50%;
}
.profile-wrapper{
  margin: 0% 5%;
}
/* 닉네임 */
.nickname-container{
  width: 45%;
  height: 5%;
  margin: 0% 37%;
}
.nickname-content{
  margin: 1% 6%;
  width: 141px;
  height: 34px;
  font-weight: 700;
  font-size: 25px;
  line-height: 150%;
  /* or 45px */
  display: flex;
  align-items: center;
  text-align: center;
}
.line-container{
  margin: 17% 12%;
  align-items: center;
}
hr{
  width: 100%;
  height: 1.3px;
  background-color: #757575;
}
.content-under-wrapper{
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  grid-template-rows: 3fr 2fr;
  grid-column-gap: 1px;
  grid-row-gap: 1px;
  width: 80%;
  height: 70%;
  position: relative;
  align-items: center;
  align-content: center;
  margin: 10% 10%;
}
.img-wrapper-like{
  margin: 0% 1%;
  width: 100%;
  height: 100%;
}
.img-wrapper-scrap{
  margin: 0% 8%;
  width: 100%;
  height: 75%;
}
.content-under-container{
  width: 100%;
  height: 40%;
  margin: 10px 0px;
}
/* 스크랩북 */
.scrap-content{
  font-size: 16px;
  font-weight: 700;
  color: #787575;
  width: 100px;
  height: 20px;
  line-height: 200%;
  /* identical to box height, or 22px */
  display: flex;
  align-items: center;
  text-align: center;
  margin: 5% 35%;
}
/* 좋아요 */
.like-content{
  font-weight: 700;
  font-size: 16px;
  width: 82px;
  height: 20px;
  line-height: 200%;
  /* identical to box height, or 22px */
  display: flex;
  align-items: center;
  text-align: center;
  color: #787575;
  margin: 5% 35%;
}
</style>