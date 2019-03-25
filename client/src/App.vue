<template>
  <div>
    <navbar/>
    <Window />
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Window from '@/views/Window.vue';


export default {
  components: {
    Navbar,
    Window,
  },
  data() {
    return {
      username: '',
    };
  },

};
</script>
