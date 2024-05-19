<template>
  <div class="community">
    <!-- 24.05.19 23:36 pull 확인용 -->

    <div class="main-sc-container">
      <div class="title-container">
        <h1 style=" color: #333333; font-size: 31px;   font-family: MyCustomFont2; ">모두를 위한 커뮤니티</h1>
      </div>
      <div class="grid-container">
        <div class="image-sc-container">
          <router-link to="/interiorguide">
            <img src="@/assets/community_image_list/ckdwha.png" alt="인테리어 사진" class="image-sc">
          </router-link>
          <div class="title-sc" style="position: relative; left:-150px;">게시판</div>
          <div class="title-sc" style="font-size: 19px; position: relative; left:-55px;">다양한 주제의 소통 공간입니다.</div>

        </div>

        <div class="image-sc-container">
          <router-link :to="isUserLogin ? '/GeneralBoard':'/login'">
            <img src="@/assets/community_image_list/board_write.png" alt="유저들의 콘텐츠" class="image-sc">
          </router-link>
          <div class="title-sc" style="position: relative; left:-120px;">게시판 글쓰기</div>
          <div class="title-sc" style="font-size: 19px; position: relative; left:-55px; "> 생각과 경험을 나누는 창입니다.</div>

        </div>

        <div class="image-sc-container">
          <router-link to="/Community">
            <img src="@/assets/community_image_list/competition.png" alt="커뮤니티" class="image-sc">
          </router-link>
          <div class="title-sc" style="position: relative; left:-150px;">공모전</div>
          <div class="title-sc" style="font-size: 19px; position: relative; left:-25px; ">창의력에 대한 도전을 펼칠 수 있습니다.</div>

        </div>

        <div class="image-sc-container">
          <router-link to="/Community">
            <img src="@/assets/community_image_list/competition_write.png" alt="커뮤니티" class="image-sc">
          </router-link>
          <div class="title-sc" style="position: relative; left:-120px;">공모전 글쓰기</div>
          <div class="title-sc" style="font-size: 19px; position: relative; left:-45px; ">아이디어를 경쟁의 무대에 올립니다.</div>
        </div>
      </div>
    </div>
    <router-link to="/">
   <img src="@/assets/community_image_list/back.png" width="50px" style="opacity: 0.7">
    </router-link>
  </div>
</template>

<script>
export default {
  computed: {
    isUserLogin() {
      return this.$store.getters.isLogin;
    }
  },
  name: 'Community',
}
</script>

<style>
.main-sc-container {
  width: 47%;
  margin: auto;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
}

.title-container {
  text-align: center;
  margin-bottom: 50px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2x2 그리드 */
  gap: 50px; /* 그리드 아이템 간의 간격 */
}

.image-sc-container {
  background-color: #f8f8f8;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  text-align: center;
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 370px;
  top:-20px;
  opacity: 0.9;
}

.image-sc-container:hover {
  transform: scale(1.05);
}

.image-sc {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 8px;
  opacity: 0.9;
  position: relative;
  top:70px;
}

.title-sc {
  margin-top: 15px;
  position: relative;
  top:-250px;
  left:-90px;
  font-size: 20px;
  font-family: MyCustomFont2;
  color : #212529;
  font-weight: bolder;
}

</style>
