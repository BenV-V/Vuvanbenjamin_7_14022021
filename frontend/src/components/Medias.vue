<template>
    <div class="files">  
        <router-link to='/'>
            <span class="info">Allez voir le fil d'actualité !</span>
        </router-link>
        <div class="listfiles">                    
            <h1>Ci-dessous les dernières photos publiées :</h1>
            <div class="file" v-for="file in files" :key="file.fileName">
                <div class="file_info"><h4>Par {{file.firstName}} {{file.lastName}} le {{dateTimeFormat(file.date)}}</h4>
                    <img :src="file.fileURL" />
                    <div class="comments">  
                        <h2 v-if="file.comments && file.comments.length > 0">Commentaires :</h2>
                        <div class="comment" v-for="comment in file.comments" :key="comment.id">
                            <div class="comment_info">Par {{comment.firstname}} {{comment.lastname}} le {{dateFormat(comment.created_at)}} 
                                <span @click="deleteCommentFile(comment.id)" v-if="comment.userId == $user.userId || $user.admin == 1" :key="comment.id">Supprimer</span>
                            </div>
                            {{comment.content}}
                        </div>
                        <form @submit.prevent= createCommentFile(file.id,file.fileURL)>
                            <textarea name="newComment" :id="'new_comment_file_' + file.id" placeholder="Laissez un commentaire..." required></textarea>
                            <button type="submit" id="send_comment_file">Envoyer</button>
                        </form>
                    </div>
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
            files: [],
            comments: []
        }
    },
    async beforeMount() {
        if(localStorage.user != undefined){
            await this.getAllFiles();
        }
    },
    methods: {
        async getAllFiles() {
            const results = await axios.get(`http://localhost:5000/api/file/`,
                {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.$token}`
                }
            })
            let cpt = 0
            for (const file of results.data) {
                file.id = cpt++ 
                const comments = await this.getCommentsFile(file.fileURL)
                file.comments = comments
            }
            this.files = results.data
        },
        dateTimeFormat(date){
            const event = new Date(parseInt(date));
            return event.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' });
        },
        deleteFile(file){
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
        createCommentFile(id, fileURL){
            const fileURL64 = window.btoa(fileURL)
            const userId = this.$user.userId;
            const content = document.getElementById(`new_comment_file_${id}`).value;
            axios.post(`http://localhost:5000/api/file/comment/`,
                {
                    userId,
                    content,
                    fileURL: fileURL64
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
        async getCommentsFile(fileURL){
            const fileURL64 = window.btoa(fileURL)
            const result = await axios.get(`http://localhost:5000/api/file/comments/${fileURL64}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                }
            )
            return result.data
        },
        getAllCommentsFile(){
            axios.get(`http://localhost:5000/api/file/comments/all`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                }
            )
            .then(result => {
                this.comments = result.data;
            });
        },
        deleteCommentFile(commentId){
            console.log('comment id : ', commentId)
            axios.delete(`http://localhost:5000/api/file/comment/${commentId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                }
            )
        this.$router.go()
        },
        dateFormat(created_at){
            const event = new Date(created_at);
            return event.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' });
        }
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
    }
    img{
        margin: 0 auto;
        margin-bottom: 15px;
        box-shadow: 10px 10px 40px 0 rgba(0,0,0);
        border-radius: 20px;
        border: 2px solid red;
    }
    .comments{
        max-width: 85%;
        margin: 0 auto;
        padding: 30px;
    }
    textarea{
        margin: 50px 0px 20px 0px;
        height: 50px;
        width: 90%;
        padding: 10px;
        border-radius: 20px;
        border: 2.5px solid rgba(255, 0, 0, 0.212);
        outline:none;  
    }
    button{
        padding: 15px;
        font-size: 1rem;
        color: white;
        background-color: rgb(255, 0, 0);
        border: none;
        border-radius: 30px;
        margin: 0 20px 0 20px;
    }
    button:hover{
        transform: scale(1.2);
        transition-duration: 400ms;
        cursor: pointer;
    }
    .comment{
        padding: 20px 20px 20px 30px;
        border-left: 5px solid rgb(43, 42, 42);
        border-right: 5px solid rgb(43, 42, 42);
        margin-top: 20px;
        box-shadow: 10px 10px 10px 0 rgba(0,0,0,0.1);
        text-align: left;
        transition-duration: .1s;
        border-radius: 20px;
    }
    .comment_info{
        display: flex;
        justify-content: space-between;
        color: rgb(245, 101, 101);
        font-size: .7rem;
        margin-bottom: 10px;
    }
    span{
        cursor: pointer;
        color: rgb(0, 0, 0);
        font-weight: bold;
    }
</style>