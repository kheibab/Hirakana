<template>
    <div class="cartpage">
        <div class="cart">
            <div class="cartheader">
                <h1>Votre Panier!</h1>
            </div>
            <div class="cartmain">

                    <CartItemCard
                    v-for="elem in elems"
                    :key="elem.id"
                    :elem="elem" />
                
            </div>
            <div class="cartbut">
                <CartSummaryPaymentCard />
            </div>
        </div>
    </div>
</template>
<script>
import User from "../apis/User";
import { mapState } from "vuex";
import CartItemCard from "../components/CartItemCard.vue"
import CartSummaryPaymentCard from "../components/CartSummaryPaymentCard.vue"

export default {
    components: {
        CartItemCard, 
        CartSummaryPaymentCard
    },
    computed: {
        elems() {
            return this.$store.getters.cartItems
        },
        ...mapState({
            user: state => state.auth.user
        })
    },
    created() {
        User.auth().then(response => {
            this.$store.commit("AUTH_USER", response.data);
        });
    },
}
</script>
<style lang="scss" scoped>
.cartpage{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
    max-height: 700px;

}
.cart{
    background-color: white;
    height: 680px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px solid;
    border-radius: 8px;
    width: 40%;

}
.cartheader{
    height: 10%;
    border-bottom: 1px solid black;
    width: 100%;
    text-align: center;
    font-style: italic;
    font-weight: bolder;
    padding-top: 5px;
    background-color: #220147;
    color: white;
}
.cartmain{
    height: 77%;
    width: 100%;
    text-align: center;
    overflow-y: auto;
}
.cartbut{
    height: 13%;
    border-top: 1px solid black;
    width: 100%;
    text-align: center;
}

.cartmain h1{
    color: black;
}
@media (max-width: 1500px){
    .cart{
        width: 50%;
    }
}
@media (max-width: 1000px){
    .cart{
        width: 60%;
    }
}
@media (max-width: 750px){
    .cart{
        width: 70%;
    }
}
@media (max-width: 500px){
    .cart{
        width: 80%;
    }
}
@media (max-width: 360px){
    .cart{
        width: 90%;
    }
}
</style>