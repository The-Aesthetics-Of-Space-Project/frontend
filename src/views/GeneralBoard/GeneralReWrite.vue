<template>
  <div id="generalboard-write">
    <div class="general-content-container" style="display: grid; grid-template-columns: 4fr 1fr; grid-template-rows: 1fr; grid-column-gap: 0px; grid-row-gap: 0px;">
      <div class="image-upload-container">
        <div class="image-upload-wrapper">
          <img class="upload-image-wrapper" id="preview" :src="uploadImg" v-model="posts.thumbnail">
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
            <input type="file" ref="serveyImg" @change="onImageChange" style="display:none;"/>
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
          <button @click="modalOk" class="open-btn" style="position: relative; width: 80px; height: 50px; border-radius: 10px;
          background-color: darkslategrey; border: 1px solid darkslategrey; color: white;"> 확인 </button>
        </section>

      </div>
    </div>
    <section class="board-title">
      <section class="mb-3">
        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="제목을 입력해 주세요." maxlength="50" v-model="posts.title" style="outline: none; box-shadow: none; border-top: white; border-left: white; border-right: white;">
        <p>{{ posts.title.length }}/50</p>
      </section>
    </section>

    <div id="editor" class="content-write" style="margin: auto; width: 45%; left:-1.5%;">
      <editor />
    </div>

    <section class="button">
      <button type="button" class="btn btn-success" @click="postArticle" style="width: 100px; height: 45px; top:-15px; left:-1.5%;">수정 하기</button>
    </section>
  </div>
</template>

<script>
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import {api} from "@/api/api";
import Store from "@/store/index";

export default {
  name: 'GeneralBoardWrite',
  data() {
    return {
      baseUrl: 'http://jerry6475.iptime.org:20000',
      content: '',
      users: {
        userId: Store.state.userId,
        nickname: Store.state.nickname,
      },
      posts:{
        articleId: '',
        title: '',
        thumbnail: '',
        content: '',
      },
      editorImg: '',
      image: null,
      editor: null,
      uploadImg: null,
      modalCheck: false,
      imgUrl: null,
      svgIcon: `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
            <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z"/>
        </svg>
      `,
      isExistsTempModal: false,
      editorContent: '',
      editorImageId:'',
      resUrlId: '',
      resUrl: '', // response img URL,
      editorImgUrl: '',
      getArticleId: ''
    }
  },
  async created() {
    // 현재 페이지 URL에서 파라미터를 추출하여 URLSearchParams 객체 생성
    const urlStr = window.location.href;
    // 마지막 = 이후의 부분을 분리
    const parts = urlStr.split('=');
    this.getArticleId = parts.pop();

    if (this.getArticleId) {
      await this.loadArticleData();
    }
  },
  mounted(){
    this.editor = new Editor({
      el: document.querySelector('#editor'),
      height: '550px',
      initialEditType: 'markdown',            // 최초로 보여줄 에디터 타입 (markdown || wysiwyg)
      previewStyle: 'vertical',               // 마크다운 프리뷰 스타일 (tab || vertical)
      previewHighlight: false,
      extendedAutolinks: true,                // 자동링크
      toolbarItems: [
        ['heading', 'bold', 'italic', 'strike'],
        ['hr', 'quote'],
        ['ul', 'ol', 'task', 'indent', 'outdent'],
        ['image', 'link'],
      ],
      state: 'strong',
      hooks: {
        // blob: 삽입하려는 이미지 정보를 가지고 있음
        // callback: 이미지 처리된 걸 가지고 처리된 이미지를 태그로 만들어서 toast editor에 넣어주는 역할
        addImageBlobHook: async (file, callback) => {
          const formData = new FormData();
          formData.append('file', file);

          const args = '/api/general/post/image';
          await api.setGeneralUser(args, formData)
              .then(res => {
                this.editorImgUrl = res.data;
                const editorFullImgUrl = this.baseUrl + this.editorImgUrl;

                callback(editorFullImgUrl, 'alt_img');
              })
              .catch(err => {
                console.error("이미지 업로드 중 오류 발생:", err);
              });
        }
      }
    });
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
    async loadArticleData() {
      if (this.getArticleId) {
        const args = `/api/general/post/${this.getArticleId}`;
        try {
          const res = await api.getPosts(args);
          this.posts = res.data;
          this.uploadImg = this.posts.thumbnail;
          this.initializeEditor();
        } catch (error) {
          console.error('Error loading article:', error);
        }
      }
    },
    initializeEditor(){
      this.editor = new Editor({
        el: document.querySelector('#editor'),
        height: '550px',
        initialEditType: 'markdown',            // 최초로 보여줄 에디터 타입 (markdown || wysiwyg)
        previewStyle: 'vertical',               // 마크다운 프리뷰 스타일 (tab || vertical)
        previewHighlight: false,
        extendedAutolinks: true,                // 자동링크
        toolbarItems: [
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['image', 'link'],
        ],
        state: 'strong',
        hooks: {
          // blob: 삽입하려는 이미지 정보를 가지고 있음
          // callback: 이미지 처리된 걸 가지고 처리된 이미지를 태그로 만들어서 toast editor에 넣어주는 역할
          addImageBlobHook: async (file, callback) => {
            const formData = new FormData();
            formData.append('file', file);

            const args = '/api/general/post/image';
            await api.setGeneralUser(args, formData)
                .then(res => {
                  this.editorImgUrl = res.data;
                  const editorFullImgUrl = this.baseUrl + this.editorImgUrl;

                  callback(editorFullImgUrl, 'alt_img');
                })
                .catch(err => {
                  console.error("이미지 업로드 중 오류 발생:", err);
                });
          }
        }
      });
      if(this.posts.content){
        this.editor.setMarkdown(this.posts.content);
      }
    },
    closeModal() {
      this.showModal = false;
      this.$router.push({ path: "GeneralBoardPage" }); // 홈으로 리다이렉트하거나 적절한 페이지로 이동
    },
    /* 모달 창 */
    modalOpen() {
      this.modalCheck = !this.modalCheck;
      this.uploadImg = this.imgUrl;
    },
    /* 모달 창 - 확인 버튼 */
    modalOk(){
      this.modalCheck = !this.modalCheck;
      if(!this.imgUrl){
        alert('사진을 등록해 주세요.');
      }
      else //else 조건으로 요청코드 GO
      {
        const args = '/api/general/post/image';
        const formData = new FormData();
        formData.append('file', this.image);

        /* 이미지 파일 전송 */
        api.setGeneralUser(args, formData).then(res => {
          this.uploadImg = this.baseUrl + res.data;
          this.posts.thumbnail = this.uploadImg;
        });
      }
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
    /* 발행하기 버튼 클릭 시 실행 */
    postArticle(){
      if(!this.posts.title){
      alert('제목을 입력하세요.');
      return;
    }
      this.posts.content = this.editor.getMarkdown();
      const articleData = {
        title: this.posts.title,
        thumbnail: this.posts.thumbnail,
        content: this.posts.content,
        nickname: this.posts.nickname
      }

      const args = `/api/general/post/${this.posts.articleId}`;
      const params = articleData;

      // 수정 요청 보내기
      api.editPost(args, params)
          .then(res => {
            if (window.confirm('수정하시겠습니까?')) {
              alert('게시물이 수정되었습니다');
              this.$router.push('/generalBoard');
            }
          })
          .catch(error => {
            console.error('게시물 수정에 실패했습니다.', error);
          });
    },
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
};
</script>

<style>
#generalboard-write {
  font-family: inherit;
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
  top: 5em;
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
  left: 70%;
  transform: translateX(-50%);
  top: 7.5em;
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
  width: 45%;
  height: 50%;
  top: 4.5em;
  left: 27.5em;
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
  top: 4em;
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
