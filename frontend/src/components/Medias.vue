<template>
    <div class="files">  
        <router-link to='/'>
            <span class="info">Vous souhaitez réagir aux photos de vos collègues, parlez-en dans le fil d'actualité ! (Si les images sont dessous, c'est que ça marche !) 
            </span>
        </router-link>      
        <div class="listfiles">
            <h3>Ci-dessous les dernières photos publiées :</h3> 
            {{files}}
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
            this.getFile();
        }
    },
    methods: {
        getFile() {

            axios.get(`http://localhost:5000/api/file/`,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                })
            .then(res => {
                this.files = res.data
            })
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