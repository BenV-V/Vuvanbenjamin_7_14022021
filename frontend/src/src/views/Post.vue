<template>
  <div class="post">
    <Login v-if="!connected"/>

    <Nav v-if="connected"/>
    <OnePost v-if="connected"/>

    <Comments v-if="connected"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue';
import Nav from '@/components/Nav.vue';
import OnePost from '@/components/OnePost.vue';
import Comments from '@/components/Comments.vue';


export default {
  name: 'Post',

  components: {
    Nav,
    Login,
    OnePost,
    Comments
  },

  data() {
    return{
      connected: true,
      authorized: true
    };
  },

}
</script>
