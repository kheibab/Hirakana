<template>
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=New+Tegomin&display=swap" rel="stylesheet">
    <div class="scroll">
        <div class="shop">
            <div v-for="product,index in products" :key="index">
                <div class="prodcard">
                    <div class="prodinfo">
                        <div class="prodtitle">
                            <h4>{{product.productname}}</h4>
                            <h5>{{product.cbdpercent}}% CBD</h5>
                        </div>
                        <div class="categorie">
                            <span>{{product.categorie.name}}</span>
                        </div>
                        <div class="prodpic">
                            <div v-if="product.categorie.name === 'Fleur de CBD'">
                                <img alt="image" src="../assets/shopexample.jpg" width="344" height="244">
                            </div>
                            <div v-if="product.categorie.name === 'Thé'">
                                <img alt="image" src="../assets/ThéCBD.jpg" width="344" height="244">
                            </div>
                            <div v-if="product.categorie.name === 'Cookie'">
                                <img alt="image" src="../assets/cookiescbd.jpg" width="344" height="244">
                            </div>
                        </div>
                        <div class="detailsnum">
                            <div v-if="product.instock > 0">
                                <h4>En Stock</h4>
                            </div>
                            <div v-if="product.instock === 0">
                                <h4 class="outofstock">Epuisé</h4>
                            </div>
                        </div>
                        <div class="prodbut">
                            <input type="button" class="btn_view" @click="openModalProd(product)" value="View">
                        </div>
                    </div>
                </div>
                <div v-if="prodModal" >
                    <div class="newModal-backdrop">
                        <div class="createModal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
                            <div class="post__modal">
                                <div class="createPost">
                                    <div class="prodtitle">
                                        <h4>{{elem.productname}}</h4>
                                        <h4>{{elem.cbdpercent}}% CBD</h4>
                                    </div>
                                    <div class="categorie">
                                        <span>{{elem.categorie.name}}</span>
                                    </div>
                                    <div class="scrollmodal">
                                        <div class="prodpicshow">
                                            <div v-if="elem.categorie.name === 'Fleur de CBD'">
                                                <img alt="image" src="../assets/shopexample.jpg">
                                            </div>
                                            <div v-if="elem.categorie.name === 'Thé'">
                                                <img alt="image" src="../assets/ThéCBD.jpg">
                                            </div>
                                            <div v-if="elem.categorie.name === 'Cookie'">
                                                <img alt="image" src="../assets/cookiescbd.jpg">
                                            </div>
                                        </div>
                                        <div class="detailsnumshow">
                                            <div v-if="elem.categorie.name === 'Fleur de CBD'">
                                                <h4>Prix/Gr: {{elem.price}} €</h4>
                                            </div>
                                            <div v-if="elem.categorie.name === 'Thé'">
                                                <h4>10 sachets: {{elem.price}} €</h4>
                                            </div>
                                            <div v-if="elem.categorie.name === 'Cookie'">
                                                <h4>10 cookies: {{elem.price}} €</h4>
                                            </div>
                                            <div v-if="elem.instock > 0">
                                                <div class="prodincart">
                                                    <div class="cartnum">
                                                        <span class="spanclasssamere">In cart: </span>
                                                        <span>{{prod_incart}}</span>
                                                    </div>
                                                    <div class="buttonscart">
                                                        <button class="add" @click="addToCart()">+</button>
                                                        <button class="remove" @click="removeFromCart()">-</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-if="elem.instock === 0">
                                                <h4 class="outofstock">Epuisé</h4>
                                            </div>
                                        </div>
                                        <div class="prodescriptionshow">
                                            {{elem.description}}
                                        </div>
                                        <div class="addcomment">
                                            <input type="text" class="addcommentinput" v-model="newComment" placeholder="Un commentaire?...">
                                            <button type="button" class="submitcommentbut" @click="submitPost(elem, user)">Balance!</button>
                                        </div>
                                        <div class="commentslist">
                                            <div v-for="post in posts" :key="post">
                                                <div v-if="elem.id === post.product_id">
                                                    <div class="commentuser">By {{post.user.name}} /créé le {{post.created_at}}</div>
                                                    <div class="commentbox">{{post.content}}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="prod-footershow">
                                        <button type="button" class="close" @click="prodModal=false"><span aria-hidden="true">Close</span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const axios = require('axios').default;
import User from "../apis/User";
import { mapState } from "vuex";

export default {
    name: 'Store',
    data() {
        return {
            products:[],
            posts:[],
            prodModal: false,
            elem: "",
            newComment:'',
        }
    },
    computed: {
        prod_incart(){
            return this.$store.getters.productQuantity(this.elem)
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
    mounted(){
        axios.get('http://127.0.0.1:8000/api/products').then(response =>{
            for(let product in response.data){
                this.products.push(response.data[product]);
            }
        });
        axios.get('http://127.0.0.1:8000/api/posts/').then(response =>{
            for(let post in response.data){
                this.posts.push(response.data[post]);
            }
        });
    },
    methods: {
        openModalProd(product){
            this.prodModal = true;
            this.elem = product;
        },
        submitPost(elem, user){
            axios.post('http://127.0.0.1:8000/api/posts',{
                content: this.newComment,
                user_id: user.id,
                product_id: elem.id,
                
            }).then((response) => {
                const data = response.data;
                this.posts.push(data);
                console.log(elem.id);
                window.location.reload()
            })
        },
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
.scroll{
    max-height: 660px;
    overflow-y: scroll;
    margin-top: 10px;
    margin-bottom: -30px;
}
.scrollmodal{
    overflow-y: auto;
    height: 600px;
    border: 1px solid rgba(128, 128, 128, 0.479);
}
.shop{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    padding-right: 350px;
    padding-left: 350px;
}
.prodcard{
    border: 3px solid #220147;
    background-color: snow;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 20px;
    width: 350px;
    height: 450px;
    box-shadow: 10px 5px 5px rgba(40, 44, 48, 0.384);
}
.prodinfo{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
}
.prodpic{
    height: 246px;
    width: 350px;
    border: transparent;
    border-bottom: 1px solid;
    background-color: #220147;
    border-left: 3px solid #220147;
    border-right:3px solid #220147;
}
.prodpic img{
    padding: 5px;
}
.prodtitle{
    border-bottom: 1px solid black;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    width: 100%;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    font-family: 'New Tegomin';
    background-image: 
    radial-gradient(circle farthest-side at top right, transparent, #220147), radial-gradient(ellipse farthest-corner at 0% 100%, transparent, #01fc40);
    animation:bg-change 10s infinite;
    color: white;
}
.detailsnum{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 10px;
    border-top: 1px solid black;
    color: #220147;
    font-family: 'Train One', cursive;
    text-shadow: 1px 1px 2px red, 0 0 1em blue, 0 0 0.2em blue;
    background-color: snow;
}
.outofstock{
    color: red;
}
.detailsnumshow{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-top: 1px solid black;
    padding-top: -5px;
    padding-bottom: -5px;
    background-color: snow;
}
.detailsnumshow img{
    max-width: 50px;
    max-height: 40px;
    border-radius: 5px;
    border: 2px solid white;

}
.detailsnumshow img:hover{
    border:6px solid white;
    background-color: white;
}
.commentslist{
    display: flex;
    flex-direction:column;
    justify-content: flex-start;
    font-family: sans-serif;
    width: 100%;
    padding-right: 30px;
    padding-left: 30px;
    word-break: break-all;
    border-top: 1px solid black;
    background-color: rgb(251, 253, 251);
    background-color: #220147;
}
.commentuser{
    background-color: rgb(90, 105, 151);
    border-left: 1px solid;
    border-right: 1px solid;
    font-size: 16px;
    font-style: italic;
    padding-left: 10px;
    padding-right: 10px;
}
.commentbox{
    background-color:rgb(160, 156, 156);
    padding-top: 10px;
    padding-bottom: 30px;
    border: 1px solid;
    font-size: 16px;
    padding-left: 10px;
    padding-right: 10px;
}
.prodescriptionshow{
    display: flex;
    flex-direction:row;
    justify-content: center;
    width: 100%;
    height: 75px;
    padding: 5px;
    font-size: 20px;
    font-style: italic;
    word-break: break-all;
    font-family: 'New Tegomin', serif  !important;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    background-color: snow;
}
.addcomment{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 50px;
    font-family: sans-serif;
}
.addcommentinput{
    height: 50px;
    width: 80%;
    border: 2px solid;
    background-color: cornsilk;
    
}
.submitcommentbut{
    height: 50px;
    width: 20%;
    border-radius: 5px;
    background-color: darkgreen;
    color: white;
}
.prodbut{
    max-height: 30px;
    border-top: 1px solid black; 
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.btn_view{
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    width: 344px;
    height: 52px;
    border: transparent;
    background-color: #220147;
    color: white;
}
.btn_view:hover{
    background-color: darkgreen;
}
.newModal-backdrop{
    background-color: transparent;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    display: flex;
    flex-wrap: wrap;
}
.close{
    border:1px solid black;
    color: black;
    border-radius: 5px;
    margin: 10px;
    width: 100px;
    height: 50px;
    background-color: white;
    z-index: 9999;
}
.close:hover{
    border: red;
    background-color: red;
    color: cornsilk;
}
.createPost{
    background-color: #220147;
    border: 2px solid;
    border-radius: 8px;
    max-width: 650px;
    height: 800px;
    box-shadow: 10px 10px 1px rgba(53, 49, 49, 0.158);
    transition: all 0.5s;
    cursor: pointer;
    font-family: 'Permanent Marker', cursive;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.createPost .prodtitle{
    margin-left: -1px;
}
.prodpicshow img{
    display: flex;
    flex-wrap: wrap;
    max-width: 700px;
    max-height: 430px;
    padding: 15px;
}
.prodpicshow{
    background-color: #220147;
}
.categorie{
    color: white;
    background-color: #220147;
    height: 20px;
    width: 100%;
    text-align: center;
    font-family: 'New Tegomin';
}
.createPost .categorie{
    color: white;
    background-color: #220147;
    height: 53px;
    width: 100%;
    text-align: center;
    font-family: 'New Tegomin';
}
.prodincart{
    display: flex;
    flex-direction: row;
}
.cartnum{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;
    font-family: sans-serif;
    text-transform: uppercase;
    .spanclasssamere{
        font-weight: 900;
    }
    span{
        border: 2px solid;
        width: 75px;
        text-align: center;
    }
}
.buttonscart{
    display: flex;
    flex-direction: column;
}
.buttonscart button{
    background-color: #220147;
    color: white;
}
.buttonscart button:hover{
    background-color: white;
    color: #220147;
}
@keyframes bg-change {
	0%, 100% {
		filter:hue-rotate(0deg);
	}
	50% {
		filter:hue-rotate(-45deg);
	}
}
@media (max-width: 1500px) {
    .shop{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        padding-right: 200px;
        padding-left: 200px;
    }
}
@media (max-width: 700px){
    .prodpicshow img{
        display: flex;
        flex-wrap: wrap;
        max-width: 550px;
        max-height: unset;
        padding: 15px;
    }
    .prodcard{
        border: 3px solid #220147;
        background-color: snow;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 0px;
        max-width: 550px;
        height: 450px;
        box-shadow: 10px 5px 5px rgba(40, 44, 48, 0.384);
    }
}
@media (max-width: 550px){
    .prodpicshow img{
        display: flex;
        flex-wrap: wrap;
        max-width: 400px;
        max-height: unset;
        padding: 15px;
    }
    .prodcard{
        border: 3px solid #220147;
        background-color: snow;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 0px;
        max-width: 400px;
        height: 450px;
        box-shadow: 10px 5px 5px rgba(40, 44, 48, 0.384);
    }
    .shop{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        padding-right: 50px;
        padding-left: 50px;
    }
}
@media (max-width: 360px){
    .prodpicshow img{
    display: flex;
    flex-wrap: wrap;
    max-width: 300px;
    max-height: unset;
    padding: 15px;
    }
    .prodcard{
    border: 3px solid #220147;
    background-color: snow;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0px;
    max-width: 300px;
    height: 450px;
    box-shadow: 10px 5px 5px rgba(40, 44, 48, 0.384);
    }
}
</style>
