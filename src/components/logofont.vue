<template>
  <router-link to="/" class="logofont">.zip</router-link>
</template>

<style>
.logofont {
  text-decoration: none;
  color: RGB(128, 200, 95);
  font-weight: 600;
  position: relative;
  top: -80px;
  left: 45px;
  font-size: 45px;
  transform: skewX(1deg); /* 글자 기울기 추가 */
  font-style: italic;
}

.logofont:hover {
  color: darkgreen;
  font-style: italic;
  transform: skewX(1deg);
}
</style>