import Vuex from "vuex";

function updateLocalStorage(cart){
  localStorage.setItem('cart', JSON.stringify(cart))
}

export default new Vuex.Store({
  state: {
    auth: {
      login: false,
      user: [],
    },
    cart: []
  },

  getters: {
    isLoggedIn(state) {
      return state.auth.login;
    },
    productQuantity: state => elem => {
      const item = state.cart.find(i => i.id === elem.id)

      if(item) return item.quantity
      else return null
    },
    cartItems: state => {
      return state.cart
    },
    cartTotal: state => {
      return state.cart.reduce((a, b) => a + (b.price * b.quantity), 0)
    }
  },

  mutations: {
    LOGIN(state, status) {
      state.auth.login = status;
      state.auth.user = [];
    },

    AUTH_USER(state, user) {
      state.auth.user = user;
    },
    addToCart (state, elem) {
      let item = state.cart.find( i => i.id === elem.id)

      if(item) {
        item.quantity++
      }else{
        state.cart.push({...elem, quantity: 1})
      }
      updateLocalStorage(state.cart)
    },
    removeFromCart(state, elem) {
      let item = state.cart.find( i => i.id === elem.id)

      if(item){
        if(item.quantity > 0){
          item.quantity--
        }else{
          state.cart.filter( i => i.id !== elem.id)
        }
      }
      updateLocalStorage(state.cart)
    },
    updateCartFromLocalStorage(state) {
      const cart = localStorage.getItem('cart')
      if(cart) {
        state.cart = JSON.parse(cart)
      }
    }
  },

  actions: {},
});
