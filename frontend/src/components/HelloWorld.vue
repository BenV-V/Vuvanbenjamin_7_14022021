<template>

  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Merci de renseigner votre email et votre mot de passe
    </p>
    <form>
      <input id="email" type="text" placeholder="Email" required>          
      <input id="password" type="password" placeholder="Mot de passe" required>
      <div class="error-message">{{message}}</div>
      <button id="login" type="submit">Connexion</button>
  </form>
    <h3>Contactez-nous</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">Mentions légales</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">A propos</a></li>
    </ul>
  </div>
  
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #ad232e;
}
form{
    display: flex;
    flex-direction: column;
    margin: 0 50px 0 50px;
}
input{
    font-size: 1rem;
    padding: 10px;
    margin-bottom: 10px;
    text-align: center;
}
#login{
    padding: 10px;
    font-size: 1.1rem;
    color: white;
    margin: 10px 40px 0 40px;
    background-color: rgb(173, 28, 28);
    border: none;
    border-radius: 15px;
    transition-duration: 400ms;
    cursor: pointer;
}
#login:hover{
transform: scale(1.02);
}
button{
  margin-top: 10px;
}
</style>
