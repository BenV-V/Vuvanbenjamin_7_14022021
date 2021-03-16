<template>
  <div class="mediapage">
    <Login v-if="!connected"/>
    <Nav v-if="connected"/>   
    <Medias v-if="connected"/> 
    <Media v-if="connected"/> 
  </div>
</template>

<script>
import Login from '@/components/Login.vue';
import Nav from '@/components/Nav.vue';
import Media from '@/components/Media.vue';
import Medias from '@/components/Medias.vue';

export default {
  name: 'MediaPage',

  components: {
    Login,
    Nav,
    Medias,
    Media,
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
