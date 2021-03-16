<template>
  <div class="newPost">
    <div class="newPost_btn" @click="visible = true">Ajouter un nouveau post</div>
      <div class="background" v-if="visible">
          <div class="popup">
            <span class="form_close"  @click="visible = false">X Fermer</span>
            <form class="newPostForm" @submit.prevent="createPost()">
                <label for="title">Titre</label>
                <input id="newPost_title" type="text" v-model="title" placeholder="Que voulez vous nous dire ?" required>
                <label for="content">Contenu</label>
                <textarea id="newPost_content" v-model="content" placeholder="Souhaitez-vous expliquer plus précisément vos pensées ?"></textarea>
                <button id="newPost_btn" type="submit">Publier</button>
            </form>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'NewPost',
    data(){
        return{
            visible: false,
            content: '',
            title:'',
        }
    },
    methods: {
        createPost() {
            const title = this.title;
            const content = this.content;

            axios.post(`http://localhost:5000/api/posts/`,
                    {
                        userId: this.$user.userId,
                        title,
                        content,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${this.$token}`
                        }
                    })
                .then(this.visible = false)
                .then(this.$emit('Posts'))
            },
            
        }
    }
</script>

<style scoped> 
    .newPost_btn{
        margin: 30px auto;
        padding: 20px;
        border-radius: 30px;
        background-color: rgb(255, 34, 34);
        color: white;
        font-weight: 900;
        max-width: 750px;
        font-size: 1.5rem;
        transition-duration: 200ms;
        cursor: pointer;
    }
    .newPost_btn:hover{
        transform: scale(1.02);
    }
    .background{
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(5, 5, 5, 0.644);
        z-index: 1;
    }
    .popup{
        box-sizing: border-box;
        background-color: white;
        display: flex;
        flex-direction: column;
        padding: 3%;
        width: 65%;
        height: 90%;
        border-radius: 20px;
        z-index: 2;
    }
    .form_close{
        cursor: pointer;
        align-self: flex-end;
    }
    .newPostForm{
        display: flex;
        flex-direction: column;
        text-align: center;
    }
    input{
        font-size: 1rem;
        padding: 10px;
        margin-bottom: 0 auto 15px auto;
        text-align: left; 
        width: 90%;
        margin-left: auto;
        margin-right: auto;  
    }
    label{
        color: red;
        font-weight: bold;
        font-size: 1.5rem;
        margin-bottom: 10px;
    }
    #newPost_content{
        height: 200px;
        width: 90%;
        margin-left: auto;
        margin-right: auto;
        padding: 10px;
        resize: none;
        overflow-y: scroll;
    }
    #newPost_btn{
        margin-top: 20px;
        padding: 13px;
        font-size: 1rem;
        color: white;
        background-color: rgb(255, 0, 0);
        border: none;
        border-radius: 20px; 
    }
    #newPost_btn:hover{
        transition-duration: 400ms;
        transform: scale(1.05);
        cursor: pointer;  
    }
</style>