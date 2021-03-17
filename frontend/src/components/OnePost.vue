<template>
    <div class="onePost">
        <div class="post_modify" v-if="!modify">
            <h2 class="post_title">{{post.title}}</h2>
            <a><div class="post_content" v-html="post.content"></div></a>
        </div>
        <div class="modify" v-if="modify">
            <input type="text" id="modify_title" v-model="post.title">
            <textarea id="modify_content" v-model="post.content"></textarea>
        </div>
        <button v-if="authorized && !modify" @click="modify = true">Modifier</button>
        <button v-if="modify" @click="modify = false">Annuler</button>
        <button v-if="modify" @click="modifyPost()">Publier les modifications</button>
        <button v-if="modify" class="delete_btn" @click="deletePost()">Supprimer le post</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Post',
    
    data(){
        return{
            post: {},
            authorized: false,
            modify: false
        }
    },
    mounted(){
        this.getOnePost();
    },
    methods: {
        getOnePost(){
            const postId = this.$route.params.id;
            axios.get(`http://localhost:5000/api/posts/${postId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                })
            .then(result => {
                this.post = result.data[0];
                if(this.$user.userId === this.post.userId || this.$user.admin == 1){
                    this.authorized = true;
                 }
                else{
                    this.authorized = false;
                }
            })
        },
        deletePost(){
            const postId = this.$route.params.id;
            axios.delete(`http://localhost:5000/api/posts/${postId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                }
            )
            this.$router.go(-1)
        },
        modifyPost(){
            const postId = this.$route.params.id;
            const title = this.post.title;
            const content = this.post.content;
            axios.put(`http://localhost:5000/api/posts/${postId}`,
                {
                    postId,
                    title,
                    content
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                }
            )
            this.$router.go(-1)
        },
    }
}
</script>

<style scoped>
    .post_modify{
        margin: 40px auto 40px auto;
        max-width: 800px;
        padding: 20px;
        border-radius: 20px;
        border-top: 5px solid red;
        border-bottom: 5px solid red;
        box-shadow: 10px 10px 10px rgba(0,0,0,0.1);
        text-align: left;
    }
    .post_title {
        margin: 0;
        color: red;
        font-size: 2rem;
    }
    .post_content{
        margin-top: 20px;
    }
    .modify{
        display: flex;
        flex-direction: column;
        margin: 50px auto;
        padding: 40px;
        max-width: 800px;
        text-align: left;
        box-shadow: 10px 10px 40px 0 rgba(0,0,0);
        border-radius: 15px;
        border: 2px solid red;
    }
    #modify_title {
        margin-bottom: 20px;
        color: red;
        width: 100%;
        font-size: 2rem;
        padding: 7px;
    }
    #modify_content{
        margin-top: 20px;
        height: 200px;
        width: 100%;
        padding: 10px;
    }
    button{
        padding: 15px;
        font-size: 1rem;
        font-weight: bold;
        color: white;
        background-color: rgb(43, 42, 42);
        border: none;
        border-radius: 30px;
        margin: 20px 10px 0 10px;
        outline:none;  
    }
    button:hover{
        transition-duration: 400ms;
        transform: scale(1.05);
        cursor: pointer;
    }
    .delete_btn{
        background-color: red !important;
    }
</style>