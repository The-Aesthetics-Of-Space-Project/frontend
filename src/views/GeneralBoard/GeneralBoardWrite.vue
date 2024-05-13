<template>
  <div id="generalboard-write">
    <div class="general-content-container" style="display: grid; grid-template-columns: 4fr 1fr; grid-template-rows: 1fr; grid-column-gap: 0px; grid-row-gap: 0px;">
      <div class="image-upload-container">
        <div class="image-upload-wrapper">
            <img class="upload-image-wrapper" id="preview" :src="uploadImg">
            <h6 class="image-size-explanation" v-if="!hasImg" style="position: relative; top: -53%; left: 55%;
            transform: translate(-50%,-50%); font-size: 14px; color: #333;">
              *권장사이즈
              <p>모바일 : 1920 x 1920, 최소 1400 x 1400 (1:1 비율)</p>
              <p>PC : 1920 x 1080, 최소 1400 x 787 (16:9 비율)</p>
            </h6>
            <button @click="modalOpen" class="modal-open" v-if="!hasImg">커버 사진 추가하기</button>

        </div>
      </div>
      <div class="side-upload-img-btn-wrapper" style="position: relative; width: 50%; height: 350px; left:-10%; top: 0%; text-align: left;">
        <button @click="modalOpen" v-if="hasImg" style="position: relative; width: 42%; height: 15%; border-radius: 50%; border: 1px solid darkslategrey; background-color: white; bottom: -380px;">
          <span v-html="svgIcon"/>
        </button>

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
    <section class="board-title">
      <section class="mb-3">
        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="제목을 입력해 주세요." maxlength="50" v-model="title" style="outline: none; box-shadow: none; border-top: white; border-left: white; border-right: white;">
        <p>{{ title.length }}/50</p>
      </section>
    </section>
    <section class="content-write">
      <Editor class="toastui-editor-defaultUI"/>
      <!--<textarea class="form-control" id="exampleFormControlTextarea1" placeholder="내용을 입력해 주세요."></textarea>-->
    </section>
    <section class="button">
      <button type="button" class="btn btn-outline-dark">임시저장</button>
      <button type="button" class="btn btn-success">발행하기</button>
    </section>
  </div>
</template>

<script>
import {Editor} from '@toast-ui/vue-editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import axios from "axios";

export default {
  name: 'GeneralBoardWrite',
  components:{
    Editor
  },
  data() {
    return {
      title: '',
      image: null,
      uploadImg: null,
      modalCheck: false,
      selectedImage: null,
      imgUrl: null,
      article: {
        thumnail: ''
      },
      svgIcon: `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
            <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z"/>
        </svg>
      `,
      editor: {
        placeholder: '내용을 입력하시오.',
        modules: {
          el: document.querySelector('#editor'),
          toolbarItems: [
            ['heading', 'bold'],
            ['ul', 'ol', 'task'],
            ['code', 'codeblock'],
            ['image'],
          ],
        }
      }

    }
  },
  computed: {
    imagePreview() {
      return this.image ? URL.createObjectURL(this.image) : '';
    },
    hasImg(){
      return !!this.uploadImg;
    }
  },
  methods: {
    modalOpen() {
      this.modalCheck = !this.modalCheck;
      this.uploadImg = this.imgUrl;
    },
    modalClose(){
      this.modalCheck = !this.modalCheck;
    },
    onImageChange(event){
      const file = event.target.files[0];
      if(!file){
        return;
      }
      this.image = file; // 이미지 파일을 저장합니다.
      const formData = new FormData(); // file전송시 FormData 형식으로 전송함
      formData.append('filelist', file);


      const reader = new FileReader();
      reader.onload = (e) => {
        this.imgUrl = e.target.result;
      };
      reader.readAsDataURL(file);

      /*axios({
        url: "http://localhost:3000/article",
        method: "POST",
        headers: {'Content-Type': 'multipart/form-data'},
        data: formData,
      }).then(res => {
        console.log(res.data.message);

      }).catch(err => {
        alert(err);
      })*/
    }

    },

  watch: {
    modalCheck: function () {
      const html = document.querySelector('.html-overflow');
      if( this.modalCheck === true ){
        html.style.overflow = 'hidden'
      } else {
        html.style.overflow = 'auto'
      }
    },
  },
  };
</script>

<style>
#generalboard-write {
  font-family: Inter;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: relative;
  width: 100%;
  height: 120%;
  margin: 0;
}
html {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
html::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}
.general-content-container {
  position: relative;
  width: 72%;
  height: 100%;
  margin: auto;
  left: 70px;
}
.image-upload-container {
  position: relative;
  width: 65%;
  margin: auto;
  height: 380px;
  top: 10px;
}
.image-upload-wrapper {
  position: relative;
  width: 100%;
  height: 90%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.upload-image-wrapper {
  width: 110%;
  height: 100%;
}
.modal-open :not :empty{
  display: none;
}
.modal-open {
  position: absolute;
  top: 75%;
  left: 55%;
  transform: translate(-50%, -50%);
  display: inline-block;
  padding: 10px 15px;
  background-color: darkslategrey;
  color: whitesmoke;
  font-size: 14px;
  border-radius: 4px;
  line-height: 22px;
}
/* dimmed */
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
  //transform: translate(-50%, -50%);
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
// 이미지 첨부되었을 때
.image-size-explanation :not :empty {
  display: none;
}
.image-size-explanation p {
  margin-bottom: 5px;
}
.button {
  position: relative;
  width: 80%;
  left: 60.5%;
  transform: translateX(-50%);
  top: 250px;
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
.content-write{
  position: relative;
  width: 55%;
  height: 150px;
  margin: 15px 25%;
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
// title 클릭 했을 때
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
.board-title {
  position: relative;
  margin: 0px 27.5%;
  padding: 10px;
  width: 42.5%;
  top: 10px;
}
element.style {
  width: 80%;
  height: 120%;

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
</style>
