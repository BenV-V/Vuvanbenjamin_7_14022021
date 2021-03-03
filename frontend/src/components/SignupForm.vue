<template>
    <div class="wrapper">
        <form @submit.prevent = signup()>
            <img src="../assets/icon-left-font.png" alt="Groupomania logo">
            <nav><router-link to="/">Se connecter</router-link> | <router-link to="/signup" class="active">S'inscrire</router-link></nav>
            <input id="signup_lastname" type="text" placeholder="Nom" required>
            <input id="signup_firstname" type="text" placeholder="Prenom" required>
            <input id="signup_password" type="password" placeholder="Mot de passe" required>
            <input id="signup_email" type="email" placeholder="Email" required>
            <div class="error-message">{{message}}</div>
            <button id="signup-btn" type="submit">S'inscrire</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'SignupForm',

    data() {
        return {
            message: "",
        };
    },

    methods: {
        signup(){
            const lastname = document.getElementById("signup_lastname").value;
            const firstname = document.getElementById("signup_firstname").value;
            const password = document.getElementById("signup_password").value;
            const email = document.getElementById("signup_email").value;

            axios.post(`http://localhost:8080/auth/signup`,
                {
                    lastname,
                    firstname,
                    password,
                    email
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(res => {
                if(res.status === 201) {
                        location.href = '/';
                }
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    this.message = "Email non disponible.";
                }  
            });       
        }
    }
}
</script>

<style>
    .wrapper{
        max-width: 500px;
        margin: 90px auto;
    }

    img{
        width: 100%;
    }

    nav{
        font-size: 1.05rem;
        margin: 20px;
    }

    .active{
        color: rgb(255, 2, 2);
        font-weight: bold;
    }

    form{
        display: flex;
        flex-direction: column;
    }

    form label{
        color: rgba(0, 0, 0, .5);
        margin: 10px;
    }

    .error-message{
        background-color: rgba(255, 0, 0, 0.301);
    }

    form input{
        font-size: 1.05rem;
        padding: 10px;
        margin-bottom: 15px;
        text-align: center;
    }

    #signup-btn{
        padding: 10px;
        font-size: 1.1rem;
        color: white;
        background-color: rgb(43, 42, 42);
        border: none;
        border-radius: 10px;
        transition-duration: 0.2s;
        cursor: pointer;
    }

    #signup-btn:hover{
        transform: scale(1.025);
    }

    label{
        font-size: 0.8rem;
        font-weight: bold;
        color: rgb(109, 109, 109);
        text-align: left;
        border: 0;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
    }
    
</style>