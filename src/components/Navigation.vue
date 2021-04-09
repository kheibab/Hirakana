<template>
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=New+Tegomin&display=swap" rel="stylesheet">
  <div class="nav-box">
    <div class="nav-logo">
      
    </div>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="container">
        <div class="card-body" v-if="isLoggedIn">
          <a class="nav-item nav-link" v-if="isLoggedIn" @click.prevent="logout" href="#">Logout</a>
          <h5>Hello, {{ user.name }}</h5>
        </div>
        <div class="navbar-header">
          <router-link class="navbar-brand" to="/">Hirakana</router-link>
        </div>
        <ul class="nav navbar-nav">
          <router-link v-if="!isLoggedIn" class="nav-item nav-link" :to="{ name: 'Login' }">Login</router-link>
          <router-link v-if="!isLoggedIn" class="nav-item nav-link" :to="{ name: 'Register' }" >Register</router-link>
          <router-link v-if="isLoggedIn" class="nav-item nav-link" :to="{ name: 'Store' }" >Shop</router-link>
          <router-link v-if="isLoggedIn" class="nav-item nav-link" :to="{ name: 'Dashboard' }" >Dashboard</router-link>
          <router-link v-if="isLoggedIn" class="nav-item nav-link" :to="{ name: 'CrudUser' }" >Admin User</router-link>
          <router-link v-if="isLoggedIn" class="nav-item nav-link" :to="{ name: 'CrudUser' }" >Admin User</router-link>
          <router-link class="nav-item nav-link" v-if="isLoggedIn" :to="{ name: 'Cart' }"><img src="../assets/Shopping_cart_icon.png" width="40" height="40"></router-link>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import User from "../apis/User";
import { mapGetters } from "vuex";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapGetters(["isLoggedIn"]),
        ...mapState({
      user: state => state.auth.user
    })
  },
  methods: {
    logout() {
      User.logout().then(() => {
        localStorage.removeItem("token");
        this.$store.commit("LOGIN", false);
        this.$router.push({ name: "Home" });
      });
    }
  }
};
</script>

<style lang="scss" scoped>

.navbar.navbar-expand.navbar-dark.bg-dark{
  background-color: rgba(253, 253, 253, 0.938) !important;
  height: 80px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  border: 2px solid slategray;
}
.nav-logo{
  height: 150px;
}
.nav.navbar-nav{
display: flex;
flex-direction: row;
flex-wrap: nowrap;
justify-content: center;
}
.nav-item.nav-link {
  color: black !important;
  transition: all 0.25s;
  border: 1px solid black;
  border-radius: 5px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.container{
    display: flex;
    flex-direction: row;
    justify-content: space-between;

  }
.card-body{
  color: black !important;
  position: absolute;
  display: flex;
  flex-direction: row;
  padding: 10px;
}
.card-body .nav-item.nav-link{
  height: 50px;

}
.card-body h5{
    border: 1px solid rgba(0, 0, 0, 0.637);
    border-radius: 5px ;
    background-image: 
    radial-gradient(circle farthest-side at top right, transparent, #000501), radial-gradient(ellipse farthest-corner at 0% 100%, transparent, #01fc40);
    animation:bg-change 10s infinite;
    color: white;
    color: cornsilk;
    font-size: 16px;
    width: 200px;
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.nav-item.nav-link:hover{
  border: 1px solid black;
  background-color: #220147;
  color: #ffffff !important;
}
.navbar-header{
  min-width: 60%;
}
.navbar-brand{
  color: black !important;
  font-family: 'New Tegomin', serif  !important;
  font-size: 300% !important;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
@media (max-width: 1400px){
  .navbar.navbar-expand.navbar-dark.bg-dark{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
  .container{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
}
@media (max-width: 1200px){
  .card-body h5{
    display: none;
  }
}
@media (max-width: 800px){
  .navbar.navbar-expand.navbar-dark.bg-dark{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 250px;
  }
  .container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .navbar-brand{
    position: unset;
    left: unset;
    top: unset;
    transform: unset;
  }
  .card-body{
    position: unset;
  }
}
</style>