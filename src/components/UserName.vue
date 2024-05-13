<template>
  <button  class="userbutton">{{ buttonName }}</button>
</template>
<style>
.userbutton {
  background-color: RGB(128, 200, 95, 90%);
  color: cornsilk;
  border-color: #80C85F;
  border-radius: 6px;
  margin: 10px 10px;
  height: 52px;
  font-size: 19px;
  position: relative;
  width:380px;
  left:10px;
  font-weight: bolder;
}
</style>
<script setup>
</script>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  buttonName: String
})

</script>