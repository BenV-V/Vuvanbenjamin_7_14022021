<template>
    <div class="nav">
        <router-link to='/'><h1><img src="../assets/icon-left-font.png" alt="Groupomania logo"></h1></router-link>
        <nav><router-link to='/profile'><div>Mon compte</div></router-link><div id="disconnect-btn" @click = disconnect()>Se déconnecter</div></nav>
    </div> 
</template>

<script>
export default {
    name: 'Nav',
    methods: {
        disconnect(){
            localStorage.removeItem('user');
            location.href = "/";
        }
    }
}
</script>

<style>
    .nav
    {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 30px 70px 20px 70px;
    }
    .header img{
        width: 70%;
    }
    nav{
        display: flex;
    }
    nav div{
        margin-left: 30px;
        font-weight: bold;
        cursor: pointer;
        transition-duration: .2s;
    }
    .fas{
        font-size: 1.5rem;
    }
    nav div:hover{
        color: rgb(117, 117, 117);
    }
    @media (max-width: 670px) {
        .header{
            flex-direction: column;
            padding: 30px 20px 20px 20px;
        }
    }
</style>