<template>
  <div id="app">
            <nav><router-link to="/" class="active">Se connecter</router-link> | <router-link to="/signup">S'inscrire</router-link></nav>

    <img alt="Vue logo" src="./assets/icon-left-font.png" width="30%">
    <HelloWorld msg="connexion"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
nav{
    font-size: 1.05rem;
    margin: 20px;
}

.active{
    color: red;
    font-weight: bold;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
