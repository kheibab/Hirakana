<template>
    <div class="cart-item-card">
        <h3>Cart Total : {{ cart_total.toFixed(2) }} €</h3>

        <button class="view_product_but">Faire un virement</button>

    </div>
</template>

<script>
export default {
    computed: {
        cart_total() {
            return this.$store.getters.cartTotal
        }
    }
}
</script>

<style lang="scss" scoped>
    .view_product_but{
        background-color: rgb(79, 160, 187);
        border: none;
        color: white;
        font-weight: bold;
        font-size: 1.15rem;
        border-radius: 5px;
        cursor: pointer;
        margin-bottom: 10px;
        height: 40px;
    }
    .view_product_but:hover{
        background-color: #220147;
    }
</style>