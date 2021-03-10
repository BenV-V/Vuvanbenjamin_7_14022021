<template>
    <div class="UserProfile">
        <div class="info">
            <h2>Bonjour,</h2>
            <span>{{this.$user.firstname}}</span> <span>{{this.$user.lastname}}</span>
            <h4>Comment allez-vous aujourd'hui ?</h4>
            <router-link to='/'><h5>N'hésitez pas à aller voir ce qui se passe dans le réseau aujourd'hui !!</h5></router-link>
        </div>
        <div class="delete_zone">
          <div class="delete" @click="deleteUser()">Supprimer le compte</div>
          <p>Cette suppression est irréversible, tous vos posts seront supprimés.<br>(Nous serions tristes de vous voir partir...)</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'UserProfile',
  methods: {
    deleteUser(){
      const userId = this.$user.userId;
      axios.delete(`http://localhost:5000/api/auth/${userId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.$token}`
            }
          }
      )
      .then(alert('votre compte est en cours de suppression !'))
      .then(localStorage.removeItem('user'))
      .then(location.href = "/");
    }
  }
}
</script>

<style scoped>
    .info{
      margin: 50px auto;
      max-width: 800px;
    }
    h2 {
      margin-bottom: 20px;
      font-size: 1.5rem;
    }
    h4{
      margin-top: 50px;
      font-size: 1.3rem;
    }
    h5{
      border-radius: 30px;
      background-color: rgba(253, 0, 0, 0.699);
      padding: 10px;
      margin: 0 40px 0 40px;
      color: blanchedalmond;
      font-size: 1.5rem;
      }
    h5:hover{
      transform: scale(1.1);
      transition-duration: 400ms;
    }
    span {
        font-size: 1.5rem;
    }
    .delete{
      font-size: 24px;
      cursor: pointer;
      border-radius: 20px;
      font-weight: 900;
      color: white;
      margin:0 50px 0 50px;
      padding: 100px 20px 10px 20px;
    }
    .delete:hover{
      transform: scale(1.05);
      transition-duration: 200ms;
    }
    .delete_zone{
      background: url(../assets/imagedefond.png);
      opacity: 0.7;
      height: 300px;
    }
    p{
      padding-bottom: 100px;
      color:rgb(255, 0, 0);
      font-weight: 900;
      font-size: 1.4rem;
    }
</style>