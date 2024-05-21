<template>
  <div class="objectrecognition">
    <div class="container">
      <div class="left-column">
        <img  alt="Your Image" class="rounded-image">
      </div>
      <div class="right-column">
        <span>당신의 인테리어 스타일은</span> <br>
        <span>머시깽이</span><br>
        <span>이네요 !</span><br>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'objectrecognition'
}
</script>
<style>
.objectrecognition {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  display: flex;
  width: 80%;
  background-color: white;

}

.left-column {
  flex: 1;
  padding: 20px;
}

.rounded-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.right-column {
  flex: 1;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: #333;
}
</style>