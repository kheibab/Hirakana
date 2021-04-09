<template>
<div class="cartest">
    <div class="footer_list">
        <input type="button" class="btn_newpost" @click="openCreateModel" value="New Post">
    </div>
    <div v-if="newPostModel">
        <div class="newModal-backdrop">
            <div class="createModal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
                <div class="post_modal">
                    <div class="createPost">
                        <button type="button" class="close" @click="newPostModel=false"><span aria-hidden="true">Close</span></button>
                        <div class="create_new_post">
                            <input type="text" v-model="createTitle" class="createTitle" placeholder="Titre de votre categorie...">
                        </div>
                        <div class="create-footer">
                            <input type ="submit" value="Post" @click="storeNote" class="plusplus">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="myModel">
        <div class="newModal-backdrop">
            <div class="createModal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
                <div class="post_modal">
                    <div class="createPost">
                    <h4>{{categories.name}}</h4>
                        <button type="button" class="close" @click="myModel=false"><span aria-hidden="true">Close</span></button>
                        <div class="create_new_post">
                            <input type="text" v-model="editTitle" class="createTitle" placeholder="Titre de votre categorie...">
                        </div>
                        <div class="create-footer">
                            <input type ="submit" value="Update" @click="editNote(categories.id)" class="plusplus">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="scroll">
        <div v-for="category,index in categories" :key="index">
            <div class="cardtest">
                <div class="catinfo">
                    <h4>{{category.name}}</h4>
                </div>
                <div class="buttons">
                    <input type="button" class="btn_edit" @click="openModel(category)" value="Edit">
                    <input type="button" class="btn_delete" @click="deletePost(category.id, index)" value="Delete">
                </div>
            </div>
            <div v-if="myModel">
                <div class="newModal-backdrop">
                    <div class="createModal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
                        <div class="post_modal">
                            <div class="createPost">
                            <h4>{{category.id}}</h4>
                                <button type="button" class="close" @click="myModel=false"><span aria-hidden="true">Close</span></button>
                                <div class="create_new_post">
                                    <input type="text" v-model="editTitle" class="createTitle" placeholder="new category name">
                                </div>
                                <div class="create-footer">
                                    <input type ="submit" value="Update" @click="editNote(category.id)" class="plusplus">
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

export default {
    name: 'CategoriesTable',
    data() {
        return {
            categories:[],
            newPostModel: false,
            myModel: false,
            element: "",
        }
    },
    created(){
        axios.get('http://127.0.0.1:8000/api/categories').then(response =>{
            for(let categorie in response.data){
                this.categories.push(response.data[categorie]);
            }
        });
    },
    methods:{
        openCreateModel(){
            this.createTitle = "";
            this.newPostModel = true;
        },
        openModel(id){
            this.editTitle = "";
            this.myModel = true;
            console.log(id);
        },
        storeNote(){
            axios.post('http://127.0.0.1:8000/api/categories',{
                name: this.createTitle,
            }).then((response) => {
                const data = response.data;
                this.categories.push(data);
                window.location.reload()
            })
        },
        deletePost(id, index){
        axios.delete('http://127.0.0.1:8000/api/categories/'+ id,{
        }).then(() => {
            this.categories.splice(index, 1);
            alert("votre Categorie a bien été effacée")
            window.location.reload()
            })
        },
         editNote(id){
            axios.put('http://127.0.0.1:8000/api/categories/'+ id, {
                name: this.editTitle,
            }).then(() => {
                window.location.reload()
                alert("votre Categorie a bien été modifié");
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.cartest{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}
.scroll{
    max-height: 580px;
    overflow-y: scroll;
    margin-top: 10px;
}
.cardtest{
    border: 1px solid black;
    border-radius: 8px;
    background-color: snow;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    width: 250px;
    height: 200px
}
.catinfo{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 150px;
}
.buttons{
    display: flex;
    flex-direction: row;
    border-top: 1px solid;
    width: 100%;
    justify-content: center;
    align-items: center;
    height: 50px;
}
.btn_newpost{
    background-color: white;
    width: 260px;
    height: 30px;
    border-radius: 8px;
    border: 2px solid black;
    font-family: 'Train One', cursive;
    text-shadow:0 0 20px #00FFFC,2px 3px 3px #141414, 0 0 100px #00D4D1;color:rgb(9, 22, 58);
}
.btn_newpost:hover{
    background-color: rgb(27, 117, 4);
    color: cornsilk;
}
.createPost{
    background-color: white;
    border: 2px solid;
    border-radius: 8px;
    width: 400px;
    min-height: 100px;
    box-shadow: 10px 10px 1px rgba(0, 0, 0, 0.2);
    transition: all 0.5s;
    cursor: pointer;
    font-family: 'Permanent Marker', cursive;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.createTitle{
    border:transparent;
    border-bottom: 2px solid black;
    background-color: transparent;
    font-size: 20px;
    min-height: 200px;
    border-radius: 5px;
    width: 381px;
    font-family: 'Permanent Marker', cursive;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.modal-backdrop{
    background-color: transparent;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 9998;
}
.close{
    border:1px solid red;
    color: crimson;
}
.close:hover{
    border: red;
    background-color: red;
    color: cornsilk;
}
.newModal-backdrop{
    background-color: transparent;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
}
.close{
    border:1px solid red;
    color: crimson;
}
.close:hover{
    border: red;
    background-color: red;
    color: cornsilk;
}
.plusplus{
    width: 75px;
    height: 30px;
    border-radius: 5px;
    margin-top: 5px;
    margin-bottom: 5px;
    border: black;
    transition: all 0.5s;
    cursor: pointer;
    font-family: 'Permanent Marker', cursive;
}
.plusplus:hover{
    background-color: black;
    color: cornsilk;
}
.editPost{
    background-color: white;
    border: 2px solid;
    border-radius: 8px;
    width: 400px;
    min-height: 100px;
    box-shadow: 10px 10px 1px rgba(0, 0, 0, 0.2);
    transition: all 0.5s;
    cursor: pointer;
    font-family: 'Permanent Marker', cursive;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.editTitle{
    border:transparent;
    border-bottom: 2px solid black;
    background-color: transparent;
    font-size: 20px;
    min-height: 200px;
    border-radius: 5px;
    width: 381px;
    font-family: 'Permanent Marker', cursive;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.btn_edit{
    width: 75px;
    height: 30px;
    border-radius: 5px;
    margin-top: 5px;
    margin-bottom: 5px;
    border: 1px solid black;
    transition: all 0.5s;
    cursor: pointer;
    font-family: 'Permanent Marker', cursive;
}
.btn_edit:hover{
    background-color: yellowgreen;
    color: black;
}
</style>