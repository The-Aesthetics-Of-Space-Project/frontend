<template>
  <div id="my-page">
    <div class="header">
      <section class="header-wrapper">
        <h4> 여긴 헤더 자리 </h4>

      </section>


    </div>

    <div class="container">
      <section class="container-header">
        <section class="container-header-wrapper">
          <nav>
            <router-link to="/profile"> 프로필 </router-link>
          </nav>
          <nav>
          <router-link to="/setting"> 설정 </router-link>
          </nav>
        </section>
      </section>

      <section class="content">
        <section class="left-container">
          <section class="left-content">
            <section class="share-button-container">
              <button @click="click()" class="share-button-wrapper">
                <img src="../assets/공유_1.png">
                <!--<h2>클릭결과: {{ result }}</h2>-->
              </button>
            </section>
            <section class="profile-container">
              <img src="../assets/프로필_2.png">
            </section>

            <section class="nickname-container">
              <section class="nickname-content">
                <a> 닉네임 </a>
              </section>
            </section>

            <section class="follow-list-container">
              <section class="follow-list-wrapper">
                <nav>
                  <router-link to="/profile"> 프로필 </router-link>
                </nav>
                <nav>
                  <router-link to="/setting"> 설정 </router-link>
                </nav>
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

            <section class="used-container">
              <section class="used-header house-header">
                <a> 중고게시판 </a>
              </section>

              <section class="used-content house-content">

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
}
nav a{
  font-size: 20px;
  font-weight: 500;
}
.container{
  width: 100%;
}
.container-header{
  align-items: center;
}
.house-header{
  font-weight: 550;
  margin: 2px 15px;
  text-align: left;
}
.content{
  margin: 10px 80px;
  grid-column: span 2;
  display: flex!important;
}
.house-content{
  width: 500px;
  height: 250px;
  margin: 5px 15px;
  border: 1px solid #CCC5C5;
  border-radius: 3px;
}
.container-header-wrapper{
  grid-column: span 2;
  display: flex!important;
  position: relative;
  gap: 35px;
  margin: 55px 565px;
  width: 70%;
}
.left-container{
  width: 32%;
  margin: 0 -5px;
  height: 550px;
  border: 1px solid #CCC5C5;
  border-radius: 3px;
}
.right-container{
  width: 62%;
  margin: 0% 15%;
  height: 550px;
  grid-row: span 3;
}

.share-button-container{
  margin: 20px 350px;
}
.used-container{
  margin: 25px 0px;
}
.share-button-wrapper{
  background-color: white;
  border: 0px;
}
.profile-container{
  margin: 10px 15px;
}
.left-content{
  width: 100%;
  margin: 10px 0px;
}
.nickname-container{
  width: 100%;
  height: 50%;
}
.nickname-content{
  margin: 10px 1px;
  font-size: 23px;
  font-weight: 600;
}
</style>