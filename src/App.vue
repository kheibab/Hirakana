<template>
  <div id="app">
    <Navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
export default {
  components: {
    Navigation
  },
  mounted() {
    this.$store.commit("LOGIN", !!localStorage.getItem("token"));
    this.$store.commit('updateCartFromLocalStorage')
  }
};
</script>

<style lang="scss" global>

#app {
  background: url("./assets/cbd-main.jpg") no-repeat center center fixed ;
  background-attachment: fixed;
  background-color: transparent;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 930px;
  }
  @media (max-width: 500px) {
    #app{
      max-width: 500px;
    }
}
</style>