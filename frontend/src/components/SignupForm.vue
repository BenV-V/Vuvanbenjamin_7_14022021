<template>
    <div class="signupform">
        <img src="../assets/icon-left-font.png" alt="Groupomania logo">
        <nav><router-link to="/">Se connecter</router-link> | <router-link to="/signup" class="active">S'inscrire</router-link></nav>
        <form @submit.prevent = signup()>            
            <input id="signup_lastname" type="text" placeholder="Nom" required>
            <input id="signup_firstname" type="text" placeholder="Prenom" required>
            <input id="signup_password" type="password" placeholder="Mot de passe" required>
            <input id="signup_email" type="email" placeholder="Email" required>
            <div class="error_message">{{message}}</div>
            <button id="signup_btn" type="submit">S'inscrire</button>
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

            axios.post(`http://localhost:5000/api/auth/signup`,{lastname,firstname,password,email},
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(res => {
                if(res.status === 201) {
                location.href = '/profile';
                }
            })
            .catch((error) => {
                if (error.response.status === 401) {this.message = "Email non disponible";}  
            });       
        }
    }
}
</script>

<style scoped>
.signupform{
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
#signup_btn{
    padding: 10px;
    font-size: 1.1rem;
    color: white;
    background-color: rgb(43, 42, 42);
    border: none;
    border-radius: 10px;
    transition-duration: 0.2s;
    cursor: pointer;
}
#signup_btn:hover{
    transform: scale(1.02);
}  
</style>