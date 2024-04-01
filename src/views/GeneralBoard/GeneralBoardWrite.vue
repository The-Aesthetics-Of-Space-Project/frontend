<template>
  <div class="generalboard">
    <!--임시 저장 및 발행하기 및 커버사진 추가하는 부분에 대해 코드 변경 필요함 !!-->
    <div class="image-upload">
      <h6>드래그 앤 드롭이나 추가하기 버튼으로 <p>
        커버 사진을 업로드 해주세요.
      </p></h6>
      &nbsp;
      <h6 class="image-size-explanation">
        *권장사이즈 &nbsp;<p>
      </p>
        <p>모바일 : 1920 x 1920, 최소 1400 x 1400 (1:1 비율)</p>
        <p>PC : 1920 x 1080, 최소 1400 x 787 (16:9 비율)</p>
      </h6>

      <button id="cover-image-upload" class="btn btn-dark" type="submit">커버 사진 추가하기</button>
    </div>
    <div class="board-title">
      <div class="mb-3">
        <input  class="form-control" id="exampleFormControlInput1" placeholder="제목을 입력해 주세요." maxlength="50" v-model="title">
        <p>{{ title.length }}/50</p>
      </div>

    </div>
    <div class="mb-3">
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="내용을 입력해 주세요."></textarea>
    </div>
    <div class="button">
      <button type="button" class="btn btn-outline-dark">임시저장</button>
      <button type="button" class="btn btn-success">발행하기</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: ''
    }
  },


// eslint-disable-next-line vue/multi-word-component-names
  name: 'GeneralBoardWrite',
}

</script>

<style>

.generalboard {
  width:100%;

}
.button {
  position: relative;
  width: 100%;
  left: 73.5%;
  transform: translateX(-50%);
  top:-20px;
}

.button button {
  width:5%;
  height:10%;
}
.button button:first-child {
  position: relative;
  left:-10px;
}
.mb-3 input{
  height:50px;
  border-top : white;
  border-left : white;
  border-right : white;
  border-radius: 0px;
  border-bottom: 1px solid;
  font-weight: bolder;
  font-size: 18px;
}
.mb-3 p{
  position: relative;
  left:48%;
  top:-35px;
  font-size: 18px;
}
.image-upload{
  width:55%;
  margin: auto;
  background-color: whitesmoke;
  height:400px;
  position: relative;
  top:20px;
}
.board-title{
  padding:20px;
  width:58%;
  position: relative;
  margin: auto;

}

.mb-3 textarea{
  margin: auto;
  height:400px;
  width:56%;
  position: relative;
  top:-30px;
  border-top : white;
  border-left : white;
  border-right : white;
  border-bottom : white;
  border-radius: 0px;
  font-size: 18px;
}

h6 {
 position: relative;
  bottom:-25px;
  font-weight: bolder;
  color: black;
}
h6 p{
  padding:5px;
}
.image-size-explanation{
  color:lightslategrey;
}

.image-upload Button{
  position: relative;
  bottom:-100px;
  width:180px;
  height:50px;
  background-color: darkslategrey;
  border-color: darkslategrey;
}
</style>