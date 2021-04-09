import { createRouter, createWebHistory } from 'vue-router'
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import CategoriesTable from "../components/CrudCategoriesTable.vue";
import Store from "../views/Store.vue";
import Cart from "../views/Cart.vue";



const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/categories",
    name: "CategoriesTable",
    component: CategoriesTable
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    meta: { authOnly: true }
  },
  {
    path: "/magasin",
    name: "Store",
    component: Store,
    meta: { authOnly: true }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { guestOnly: true }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { guestOnly: true }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { authOnly: true }
  }
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

function isLoggedIn() {
  return localStorage.getItem("token");
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLoggedIn()) {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guestOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (isLoggedIn()) {
      next({
        path: "/dashboard",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});



export default router
