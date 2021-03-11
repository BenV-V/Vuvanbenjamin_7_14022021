<template>
    <div class="comments">  
        <form @submit.prevent= createComment()>
            <textarea name="newComment" id="new_comment" placeholder="Laissez un commentaire..." required></textarea>
            <button type="submit" id="send">Envoyer</button>
        </form>
        <h2 v-if="comments.length > 0">Commentaires :</h2>
        <div class="comment" v-for="comment in comments" :key="comment.id">
            <div class="comment_info">Par {{comment.firstname}} {{comment.lastname}} le {{dateTimeFormat(comment.created_at)}} 
                <span @click="deleteComment(comment.id)" v-if="comment.userId == $user.userId || $user.admin == 1" :key="comment.id">Supprimer</span>
            </div>
            {{comment.content}}
        </div>

    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'Comments',

    data(){
        return{
            comments: []
        }
    },
    mounted(){
        this.getAllComments();
    },
    methods: {
        createComment(){
            const postId = parseInt(this.$route.params.id);
            const userId = this.$user.userId;
            const content = document.getElementById('new_comment').value;
            axios.post(`http://localhost:5000/api/posts/${postId}/comment/`,
                {
                    userId,
                    content
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                }
            )
            .then(this.getAllComments());
        },
        getAllComments(){
            const postId = parseInt(this.$route.params.id);

            axios.get(`http://localhost:5000/api/posts/${postId}/comments`,
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
        deleteComment(commentId){
            axios.delete(`http://localhost:5000/api/posts/comment/${commentId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                    }
                }
            )
            .then(this.getAllComments());
        },
        dateTimeFormat(created_at){
            const event = new Date(created_at);

            return event.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' });
        }
    }
}
</script>

<style scoped>
    .comments{
        max-width: 85%;
        margin: 0 auto;
        padding: 30px;
    }
    textarea{
        margin: 50px 0px 20px 0px;
        height: 50px;
        width: 100%;
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
        color: rgb(255, 0, 0);
        font-weight: bold;
    }
</style>