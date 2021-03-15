<template>
    <div class="files">  
                <div class="header">
                    <span class="info">Si les images sont dessous, c'est que ça marche ! </span>
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
                this.files = res.data;
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
        padding: 13px;
        font-size: 1rem;
        color: white;
        background-color: rgb(255, 0, 0);
        border: none;
        border-radius: 20px;
    }
</style>