<template>
    <div class="cart_item_card" v-if="elem.quantity > 0">
        <div class="header">
            <div class="name">{{elem.productname}}</div>
            <div class="cartstatus">
                <div class="buttonscart">
                    <button class="add" @click="addToCart()">+</button>
                    <button class="remove" @click="removeFromCart()">-</button>
                </div>
                <div class="quantity">In cart: {{elem.quantity}}</div>
                <div class="price">Total cost: {{item_cost.toFixed(2)}} €</div>
            </div>
        </div>
        <p>~ {{description}} ~</p>
    </div>
</template>

<script>

export default {
    props: ['elem'],
    computed: {
        description() {
            return this.elem.description.substring(0, 120)
        },
        item_cost(){
            return this.elem.price * this.elem.quantity
        }
    },
    methods: {
        addToCart(){
            this.$store.commit('addToCart', this.elem)
        },
        removeFromCart(){
            this.$store.commit('removeFromCart', this.elem)
        }
    }
}
</script>

<style lang="scss" scoped>
.cart_item_card{
    width:90%;
    margin: 5%;
    background-color: white;
    box-shadow: 0 0 5px grey;
    border-radius: 5px;
    padding: 10px;
    text-align: left;

    .header{
        display: flex;
        flex-direction: column;
        .name{
            text-transform: uppercase;
            color: #220147;
            font-family: 'New Tegomin';
            text-shadow: 1px 1px 2px red, 0 0 1em blue, 0 0 0.2em blue;
        }
        .cartstatus{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: flex-end;

            .buttonscart{
                display: flex;
                flex-direction: row;
                padding-right: 10px;
            }
            .buttonscart button{
                background-color: #22014793;
                color: white;
                border-radius: 20px;
                width: 30px;
                margin-right: 5px;
            }
            .buttonscart button:hover{
                background-color: white;
                color: #220147;
            }
            .quantity{
                padding-right: 10px;
            }
            .price{
                padding-right: 10px;
                padding-left: 10px;
            }
        }
    }
    p{
        font-style: italic;
        font-size: 12px;
    }
}
</style>