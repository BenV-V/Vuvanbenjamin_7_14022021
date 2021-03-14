<template>
    <div class="files">
        <article class="file" v-for = "file in files" :key="file.id">
            <router-link :to="{ name: 'File', params: { id: file.id } }">
                <div class="header">
                    <span class="info">Posté par {{post.firstname}} {{post.lastname}} le {{dateTimeFormat(post.date)}}</span>
                </div>  
                <div class="file">{{req.file.filename}}</div> 
                      <div class="card-img-top w-75 mx-auto" v-if="post.attachement">
        <img :src="post.attachement" alt="..." class="w-100" />
      </div>            
            </router-link>
        </article>
    </div>
</template>

<script>
console.log('media file')

import axios from 'axios';

export default {
    name: 'Medias',
    data(){
        return{
            image: '',
            fileName: '',
            files: ''
        }
    },
    mounted() {
        if(localStorage.user != undefined){
            this.getFile();
        }
    },
    methods: {
        getFile() {
            
            const image = this.image
            axios.post(`http://localhost:5000/api/file/`,
                                {
                    userId: this.$user.userId,
                    file: image, 
                    filename: this.fileName
                },{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                })
            .then(res => {
                this.files = res.data;
            })
        },
        dateTimeFormat(date){
            const event = new Date(date);
            return event.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' });
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