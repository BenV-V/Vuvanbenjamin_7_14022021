<template>
  <div class="homepage">
    <Login v-if="!connected"/>
    <Nav v-if="connected"/>
  </div>
</template>

<script>
import Login from '@/components/Login.vue';
import Nav from '@/components/Nav.vue';

export default {
  name: 'HomePage',

  components: {
    Login,
    Nav,
  },

  data() {
    return{
      connected: true
    };
  },

  created(){
    this.login()
  },
  
  methods: {
    login(){
      if(localStorage.user !== undefined){
        this.connected = true;
        console.log('Utilisateur connecté !');
      }
      else if(localStorage.user == undefined){
        this.connected = false;
        console.log('Utilisateur non connecté !');
      }
    }
  }
}
</script>
