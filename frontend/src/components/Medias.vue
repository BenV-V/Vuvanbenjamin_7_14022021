<template>
    <div class="files">  
        <router-link to='/'>
            <span class="info">Vous souhaitez réagir aux photos de vos collègues, parlez-en dans le fil d'actualité ! (Si les images sont dessous, c'est que ça marche !) 
            </span>
        </router-link>
        <div class="listfiles">                    
            <h1>Ci-dessous les dernières photos publiées :</h1>
            <div class="file" v-for="file in files" :key="file.fileName">
                <div class="file_info"><h4>Par {{file.firstName}} {{file.lastName}} le {{dateTimeFormat(file.date)}}</h4>
                    <img :src="file.fileURL" />
                    <span @click="deleteFile(file)" v-if="file.userId == $user.userId || $user.admin == 1" :key="file.fileName">Supprimer</span>
                </div>
            </div>          
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Medias',
    data(){
        return{
            files: []
        }
    },
    mounted() {
        if(localStorage.user != undefined){
            this.getAllFiles();
        }
    },
    methods: {
        getAllFiles() {
            axios.get(`http://localhost:5000/api/file/`,
                {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.$token}`
                }
                })
            .then(res => {
                console.log(res.data)
                this.files = res.data
            })
        },
        dateTimeFormat(date){
            const event = new Date(parseInt(date));
            return event.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' });
        },
        deleteFile(file){
            console.log('delete file for userid : ', this.$user.userId)
            axios.delete(`http://localhost:5000/api/file`,
                {   
                    data: {
                        userId: this.$user.userId,
                        fileName: file.fileName,
                        date: file.date
                    }
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                }
            )
        this.$router.go()
        },
    }
}
</script>

<style scoped>
    .files{
        margin-top: 40px;
    }
    span{
        display: flex;
        flex-direction: column;
        cursor: pointer;
        padding: 13px;
        margin-bottom: 15px;
        font-size: 1rem;
        color: white;
        background-color: rgb(255, 0, 0);
        border: none;
        border-radius: 20px;
    }
    h1{
        margin-top: 20px;
    }
    h4{
        font-size: 1.7rem;
        margin:10px;
        font-weight: bold;
        color : rgb(153, 11, 11);
        text-decoration: underline;
    }
    img{
        margin: 0 auto;
        margin-bottom: 15px;
        box-shadow: 10px 10px 40px 0 rgba(0,0,0);
        border-radius: 20px;
        border: 2px solid red;
    }
</style>