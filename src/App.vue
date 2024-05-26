<template>
  <div id="app">
    <Header v-if="!$route.meta.hideHeader"></Header>
    <router-view/>
    <Footer v-if="!$route.meta.hideFooter"></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'App',
  components: {
    Header,
    // eslint-disable-next-line vue/no-unused-components
    Footer
  }
}
</script>

<style>

#app {
  font-family: "Pretendard Variable", Pretendard, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
