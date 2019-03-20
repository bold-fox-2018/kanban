<template>
  <v-app>
    <v-toolbar  dark scroll-toolbar-off-screen>
      <v-toolbar-title class="headline text-uppercase">
        <span>My</span>
        <span class="font-weight-heavy" >KanBan</span>
      </v-toolbar-title>

      <v-toolbar-items>
        <v-btn flat to="/" >Home</v-btn>
        <v-btn flat to="/about" >About</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      //
    }
  }
}
</script>
