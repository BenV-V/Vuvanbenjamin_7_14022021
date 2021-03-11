<template>
  <div class="profile">
        <Login v-if="!connected"/>
        <Nav v-if="connected"/>
        <UserProfile v-if="connected"/>
  </div>
</template>
<script>
import Login from '@/components/Login.vue';
import Nav from '@/components/Nav.vue';
import UserProfile from '@/components/UserProfile.vue';

export default {
    name: 'Profile',    

    components: {
        Login,
        Nav,
        UserProfile,
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
