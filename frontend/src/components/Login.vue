<template>
    <div class="wrapper">
        <img src="../assets/icon-left-font.png" alt="Groupomania logo">
        <nav><router-link to="/" class="active">Se connecter</router-link> | <router-link to="/signup">S'inscrire</router-link></nav>
        <form @submit.prevent = login()>
            <input id="log_email" type="text" placeholder="Email" required>
            <input id="log_password" type="password" placeholder="Mot de passe" required>
            <div class="error-message">{{message}}</div>
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

            axios.post(`http://localhost:8080/auth/login`,
                {
                    email,
                    password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => {
                localStorage.setItem('user', JSON.stringify(response.data));
                location.reload();
            })
            .catch((error) => {
                if (error.response.status === 404) {this.message = "Utilisateur inconnu";}
                if (error.response.status === 401) {this.message = "Email ou mot de passe invalide";}
                if (error.response.status === 500) {this.message = "Erreur serveur";
                }
            });
        }
    }
}
</script>

<style>
    .wrapper{
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
        transform: scale(1.025);
    }
</style>