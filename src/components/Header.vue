<template>
  <div class="Header">
    <div class="menu">
      <h4>
        <router-link
            v-for="(menu, index) in menus"
            :key="menu"
            :to="menuLinks[index]"
        >
          {{ menu }}
        </router-link>
      </h4>
    </div>
  </div>
</template>

<script>
export default {
// eslint-disable-next-line vue/multi-word-component-names
  name: 'Header',
  data() {
    return{ menus: ['로그인',], menuLinks: ['/login'],
    }
  }
}
</script>

<style>

</style>