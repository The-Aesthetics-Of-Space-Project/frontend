<template>
  <div class="generalboardpage">
    <div class="title">
      제목
    </div>

    <div class="user_name">
      이름
    </div>

    <div class="date">
      날짜
    </div>

    <div class ="content">
      내용..
    </div>

    <div class="comment-title">
      <h4>댓글</h4>
    </div>

    <div class="comment-line">
    </div>
  </div>
</template>

<script>
export default
{
// eslint-disable-next-line vue/multi-word-component-names
  name: 'GeneralBoardPage',
}
</script>

<style>
.generalboardpage{
  width:100%;
  height:1200px;
}
.title {
  width:30%;
  margin:auto;
  height:50px;
  border-bottom: 1px solid;
  position: relative;
  left:-15%;
}
.user_name{
  width:5%;
  margin:auto;
  height:40px;
  border-bottom: 1px solid;
  position: relative;
  left:-27.5%;
  top:25px;
}
.date{
  width:5%;
  margin:auto;
  height:40px;
  border-bottom: 1px solid;
  position: relative;
  left:-27.5%;
  top:50px;
}
.content{
  width:60%;
  margin:auto;
  height:40px;
  border: 1px solid;
  position: relative;
  top:70px;
  height:600px;
}
.comment-title{
  width:5%;
  margin:auto;
  height:40px;
  border: 1px solid;
  position: relative;
  left:-27.5%;
  top:130px;
  border : white;
}
.comment-line{
  width:61%;
  height:20px;
  margin: auto;
  border-bottom:1px solid;
  position: relative;
  top:120px;
}
</style>