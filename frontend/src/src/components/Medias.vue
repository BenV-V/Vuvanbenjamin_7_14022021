<template>
    <div class="files">  
        <router-link to='/'>
            <span class="info">Vous souhaitez réagir aux photos de vos collègues, parlez-en dans le fil d'actualité ! (Si les images sont dessous, c'est que ça marche !) 
            </span>
        </router-link>
        <div class="listfiles">                    
            <h3>Ci-dessous les dernières photos publiées :</h3>
            <div class="file" v-for="file in files" :key="file.fileName">
                <div class="file_info">Par {{file.firstName}} {{file.lastName}} le {{dateTimeFormat(file.date)}} 
                    <img :src="file.fileURL" />
                    <span @click="deleteFile(file.fileName)" v-if="file.userId == $user.userId || $user.admin == 1" :key="file.fileName">Supprimer</span>
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
                },
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
        deleteFile(){
            axios.delete(`http://localhost:5000/api/file/`,
            {
                    userId: this.$user.userId,
                    filename: this.fileName
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                }
            )
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
        font-size: 1rem;
        color: white;
        background-color: rgb(255, 0, 0);
        border: none;
        border-radius: 20px;
    }
    h3{
        margin-top: 20px;
    }
</style>