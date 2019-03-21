<template>
  <v-app>
    <v-toolbar  dark scroll-toolbar-off-screen>
      <v-toolbar-title class="headline ">
        <i class="fas fa-feather-alt" style="color: white"></i>
        <span>My</span>
        <span class="font-weight-heavy" > KanBan</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat to="/" >Home</v-btn>
        <v-btn flat to="/about" >About</v-btn>
        <v-btn @click.stop="dialog = true"  dark>+ Add Task</v-btn>
        <v-dialog v-model='dialog' content-class width="500px">
            <MainHeader @close-dialog='closeDialog()' />
        </v-dialog>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import MainHeader from '@/components/MainHeader'
export default {
  name: 'App',
  components:{
    MainHeader
  },
  methods:{
    closeDialog(){
      this.dialog = false
    }
  },
  data () {
    return {
      dialog: false
    }
  }
}
</script>
