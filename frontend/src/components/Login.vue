<template>
    <div class="login">
        <img src="../assets/icon-left-font.png" alt="Groupomania logo">
        <nav><router-link to="/" class="active">Se connecter</router-link> | <router-link to="/signup">S'inscrire</router-link></nav>
        <form @submit.prevent = login()>
            <div class="error-message">{{message}}</div>            
            <input id="log_email" type="text" placeholder="Email" required>
            <input id="log_password" type="password" placeholder="Mot de passe" required>

            <button id="log_btn" type="submit">Connexion</button>           
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Login',
    data() {
        return {
            message: "",
        };
    },

    methods: {

        login(){
            const email = document.getElementById("log_email").value;
            const password = document.getElementById("log_password").value;

            axios.post(`http://localhost:5000/api/auth/login`,{email,password},
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => {
                console.log(response)
                localStorage.setItem('user', JSON.stringify(response.data));
                location.reload();
            })
            .catch((error) => {
                if (error) {this.message = "Merci de vérifier votre mail et mot de passe";}
            });
        }
    }
}
</script>

<style scoped>
.login{
    max-width: 800px;
    margin: 90px auto;
}
img{
    width: 70%;
}
nav{
    font-size: 1.3rem;
    margin: 20px;
}
.active{
    color: rgb(228, 24, 24);
    font-weight: bold;
}
form{
    display: flex;
    flex-direction: column;
}
input{
    font-size: 1rem;
    padding: 8px;
    margin-bottom: 20px;
    text-align: center;
}
#log_btn{
    padding: 10px;
    font-size: 1rem;
    font-weight: bold;
    color: white;
    background-color: rgb(228, 24, 24);
    border: none;
    border-radius: 20px;
    transition-duration: 400ms;
}
#log_btn:hover{
    transform: scale(1.02);
}
</style>