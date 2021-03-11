<template>
    <div class="nav">
        <router-link to='/'><h1><img src="../assets/icon-left-font.png" alt="Groupomania logo"></h1></router-link>
        <nav><router-link to='/profile'><div class="account">Mon compte</div></router-link><div class="account" id="disconnect_btn" @click = disconnection()>Se déconnecter</div></nav>
    </div> 
</template>

<script>
export default {
    name: 'Nav',
    methods: {
        disconnection(){
            localStorage.removeItem('user');
            location.href = "/";
        }
    }
}
</script>

<style scoped>
img{
    width: 50%;
}
.nav{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
}
nav{
    display: flex;
}
.account{
    margin-left: 10px;
    font-weight: bold;
    font-size: 1.2rem;
    border-radius: 20px;
    color:white;
    background-color: red;
    padding: 10px 20px 10px 20px;
}
.account:hover{
  transform: scale(1.05);
  transition-duration: 200ms;
}
</style>