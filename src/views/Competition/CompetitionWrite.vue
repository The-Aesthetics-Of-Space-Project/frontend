<template>
  <div id="competitionWrite">
      <div class="com-container">
        <div class="com-wrapper">
          <div class="thumnail-img-container">
            <div class="thumnail-img-wrapper">
              <img class="upload-thumnail-img" id="imgView" :src="uploadImg">
              <h6 class="image-size-explanation" v-if="!hasImg" style="position: relative; top: -53%; left: 55%;
            transform: translate(-50%,-50%); font-size: 14px; color: #333;">
                *권장사이즈
                <p>모바일 : 1920 x 1920, 최소 1400 x 1400 (1:1 비율)</p>
                <p>PC : 1920 x 1080, 최소 1400 x 787 (16:9 비율)</p>
              </h6>
              <button @click="modalOpen" class="modal-open" v-if="!hasImg">커버 사진 추가하기</button>
            </div>
            <button @click="modalOpen" v-if="hasImg" style="position: relative; top: -4em; left: 24em; width: 8%; height: 15%; border-radius: 50%; border: 1px solid darkslategrey; background-color: white; bottom: -380px;">
              <span v-html="svgIcon"/>
            </button>
          </div>
          <!-- 글 제목 작성-->
          <section class="comp-title">
            <section class="mb-3">
              <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="제목을 입력해 주세요." maxlength="50" v-model="article.title" style="outline: none; box-shadow: none; border-top: white; border-left: white; border-right: white;">
              <p>{{ article.title.length }}/50</p>
            </section>
          </section>
          <!-- 글 내용 작성-->
          <section class="com-content-container">
            <section class="com-content-wrapper">
            <textarea type="text" class="com-content" oninput='this.style.height = ""; this.style.height = this.scrollHeight + "px"'
                      placeholder="내용을 입력해 주세요.(최대 500자)" maxlength="500" rows="30" cols="90" style="resize: none; box-shadow: none; max-height: 80%; border: 1px solid #8D8D8D; border-radius: 8px; outline-color: darkslategrey;"
                      v-model="article.contents"/>
              <section class="max-length"> <p>{{ contents.length}}/500</p> </section>
            </section>
          </section>
          <!-- 제출하기 버튼 -->
          <section class="submit-btn-wrapper">
            <button type="submit" class="submit-btn" @click="submitArticle"> 제출하기 </button>
          </section>
        </div>
      </div>
      <div class="modal-wrap" v-show="modalCheck" @click="modalOpen">
        <div class="modal-container" @click.stop="">
          <div class="upload-img-wrapper">
            <label class="upload-img-btn" style="position: relative; width: 150px;height: 50px; left: 0px;
          border: 2px solid darkslategrey; border-radius: 10px; text-align: center; padding: 10px; cursor: pointer;">
              <input type="file" @change="onImageChange" style="display:none;"/>
              이미지 업로드
            </label>
          </div>
          <section class="modal-content">
            <section class="modal-img-container" >
              <img :src="imgUrl" v-if="imagePreview" alt="이미지 미리보기"/>
            </section>
          </section>
          <section class="modal-btn" style="position: relative; width: 100%; top: 12px;">
            <button @click="modalClose" class="close-btn" style="width: 80px; height: 50px; position: relative; border-radius: 10px;
          background-color: white; color: black; border: 1px solid darkslategrey;"> 닫기 </button>
            <button @click="modalOpen" class="open-btn" style="position: relative; width: 80px; height: 50px; border-radius: 10px;
          background-color: darkslategrey; border: 1px solid darkslategrey; color: white;"> 확인 </button>
          </section>
        </div>
      </div>
  </div>
</template>

<script>
import Store from "@/store/index";
import {api} from "@/api/api";
export default {
  name: 'CompetitionWrite',
  data(){
    return{
      title:'',
      contents:'',
      uploadImg: null,
      imgUrl: null,
      modalCheck: false,
      image: null,
      userId: Store.state.userId,
      nickname: Store.state.nickname,
      baseUrl: 'http://jerry6475.iptime.org:20000',
      article:{
        title: '',
        thumbnail:'',
        contents: '',
        nickname: Store.state.nickname
      },
      svgIcon: `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
            <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z"/>
        </svg>
      `,
    }
  },
  mounted(){
  },
  computed: {
    imagePreview() {
      return this.image ? URL.createObjectURL(this.image) : '';
    },
    hasImg(){
      return !!this.uploadImg;
    },
  },
  methods: {
    /* 모달 창 */
    modalOpen() {
      this.modalCheck = !this.modalCheck;
      this.uploadImg = this.imgUrl;
    },
    /* 모달 창 - 확인 버튼 */
    modalOk(){
      this.modalCheck = !this.modalCheck;
    },
    /* 모달 창 - 닫기 버튼 */
    modalClose(){
      this.modalCheck = !this.modalCheck;
    },
    // 이미지 미리보기
    onImageChange(event){
      const file = event.target.files[0];
      if (!file) {
        return;
      }
      this.image = file; // 이미지 파일을 저장

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imgUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    /* 제출하기 */
    submitArticle(){
      const formData = new FormData();

      formData.append('contestId', 1);
      formData.append('title', this.article.title);
      formData.append('thumbnail', this.image);
      formData.append('contents', this.article.contents);
      formData.append('nickname', this.article.nickname);

      const args = '/api/contest/post';
      const params = formData;

      // POST 요청 보내기
      api.setUser(args, params)
          .then(response => {
            // 요청이 성공했을 때 처리할 코드
            alert('공모전에 참가되었습니다!');
            this.$router.push('/competitionMain');
          })
          .catch(error => {
            // 요청이 실패했을 때 처리할 코드
            console.error('게시물 등록에 실패했습니다.', error);
          });
    }
  },
  watch: {
    modalCheck: function () {
      const html = document.querySelector('.html-overflow');
      if( this.modalCheck === true ){
        html.style.overflow = 'hidden';
      } else {
        html.style.overflow = 'auto';
      }
    },
  },
}
</script>

<style>
#competitionWrite{
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: relative;
  width: 100%;
  height: 1080px;
  margin: 0;
}
.com-container{
  position: relative;
  width: 100%;
  height: 100%;
  top: 5em;
}
.com-wrapper{
  position: relative;
  width: 80%;
  height: 100%;
  margin: auto;
}
.thumnail-img-container {
  position: relative;
  width: 60%;
  height: 38%;
  margin: auto;
  top: 25px;
  left: 3%;
}
.thumnail-img-wrapper {
  position: relative;
  width: 80%;
  height: 90%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.upload-thumnail-img {
  width: 110%;
  height: 100%;
}
.modal-wrap {
  position: fixed;
  top: 120px;
  width: 100%;
  height: 100%;
  align-content: center;
  z-index: 2;
}
/* modal or popup */
.modal-container {
  position: relative;
  top: -170px;
  margin: auto;
  width: 35%;
  height: 570px;
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 10px;
  border: 1px solid #8D8D8D;
  z-index: 1;
}
.modal-content{
  position: relative;
  width: 100%;
  height: 80%;
}
.modal-img-container{
  position: relative;
  top: 20px;
  width: 100%; /* 모달 크기에 맞춰서 이미지 컨테이너를 설정합니다. */
  height: 90%;
  border: 1px solid darkslategrey;
  border-radius: 5px;
}
.modal-img-container img {
  position: relative;
  top: -0.2px;
  max-width: 100%; /* 이미지가 컨테이너를 넘어가지 않도록 최대 너비를 설정합니다. */
  height: 100%; /* 이미지의 높이를 자동으로 조정합니다. */
}
/* 이미지 첨부되었을 때*/
.image-size-explanation :not :empty {
  display: none;
}
.image-size-explanation p {
  margin-bottom: 5px;
}
.button button {
   position: relative;
   width: 5%;
   height: 10%;
 }
.button button:first-child {
  position: relative;
  left: -10px;
}
.comp-title{
  position: relative;
  margin: 0px 27.5%;
  padding: 10px;
  width: 54%;
  right: 5%;
  top: 10px;
}
.mb-3 input {
  height: 50px;
  border-radius: 0px;
  border-bottom: 1px solid;
  font-weight: 500;
  font-size: 25px;
  outline: none;
  box-shadow: none;
}
/* title 클릭 했을 때 */
.mb-3 input:focus {
  height: 50px;
  border-bottom: 2px solid darkslategrey;
  font-weight: 500;
  font-size: 25px;
  box-shadow: none;
}
.mb-3 p {
  position: relative;
  left: 47%;
  top: -40px;
  font-size: 16px;
  color: rgb(0,0,0,50%);
}
h6 {
  position: relative;
  margin-top: -50px;
  font-weight: bolder;
  color: black;
}
h6 p {
  padding: 8px;
}
.com-content-container{
  position: relative;
  width: 55%;
  height: 50%;
  margin: auto;
}
.com-content-wrapper{
  position: relative;
  width: 80%;
  height: 80%;
  left: 0em;
}
.max-length p{
  position: relative;
  width: 7%;
  left: 48em;
  font-size: 15px;
  color: rgb(0,0,0,50%);
}
.submit-btn-wrapper{
  position: relative;
  width: 10%;
  height: 8%;
  top: -13%;
  left: 22%;
  margin: auto;
}
.submit-btn{
  width: 80%;
  height: 60%;
  background-color: rgb(47,79,79,75%);
  border-radius: 6px;
  border: none;
  color: white;
  font-size: 17px;
  font-weight: normal;
}
</style>