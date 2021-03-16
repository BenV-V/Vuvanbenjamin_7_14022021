<template>
    <div class="posts">
        <article class="post" v-for = "post in posts" :key="post.id">
            <router-link :to="{ name: 'Post', params: { id: post.id } }">
                <div class="header">
                    <span class="info">Posté par {{post.firstname}} {{post.lastname}} le {{dateTimeFormat(post.date)}}</span>
                </div>  
                <h2 class="title">{{post.title}}</h2>
                <div class="content">{{post.content}}</div>
                <div class="image">{{post.imageUrl}}</div>                
            </router-link>
        </article>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Posts',
    data(){
        return {
            posts: [],
        }
    },
    mounted() {
        if(localStorage.user != undefined){
            this.getAllPosts();
        }
    },
    methods: {
        getAllPosts(){
            axios.get(`http://localhost:5000/api/posts/`,     
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                }
            )
            .then(res => {
                this.posts = res.data;
            })
        },
        dateTimeFormat(date){
            return new Date(date).toLocaleDateString('fr-FR', { weekday:'long', day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' });
        }
    }
}
</script>

<style scoped>
    .posts{
        margin: 0 auto;
        padding: 20px;
        max-width: 800px;
    }
    .post{
        position: relative;
        padding: 20px;
        margin-bottom: 40px;
        border-radius: 20px;
        border-top: 5px solid red;
        border-bottom: 5px solid red;
        box-shadow: 10px 10px 10px rgba(0,0,0,0.1);
        text-align: left;
    }
    .post:hover{
        transform:scale(1.2);
        transition-duration: 1400ms;
    }
    h2{
        margin-top: 10px;
    }
    .header{
        color: rgb(0, 0, 0);
        font-size: .8rem;
    }
    .title{
        color: red;
    }
    .content{
        font-size: 1rem;
    }
</style>