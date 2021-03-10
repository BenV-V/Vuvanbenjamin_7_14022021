<template>
  <div class="homepage">
    <Login v-if="!connected"/>
    <Nav v-if="connected"/>   
    <NewPost v-if="connected"/>
    <Posts v-if="connected"/>
  </div>
</template>

<script>
import Login from '@/components/Login.vue';
import Nav from '@/components/Nav.vue';
import NewPost from '@/components/NewPost.vue';
import Posts from '@/components/Posts.vue';

export default {
  name: 'HomePage',

  components: {
    Login,
    Posts,
    Nav,
    NewPost
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
