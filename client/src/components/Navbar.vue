<template>
  <nav class="navbar is-fixed-top container" role="navigation" aria-label="main navigation"
       :style="{'background-color': $parent.bgNavbar}">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">Kanban</router-link>
      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
         data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbarBasicExample" class="navbar-menu" v-if="$parent.isLogin">
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a @click="$parent.showModal = true" class="button is-primary">
              <strong>New Task</strong>
            </a>
          </div>
        </div>
        <div class="navbar-item">
          <div class="buttons">
            <a @click="logout()" class="button is-primary is-outlined">
              <strong>Logout</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'Navbar',
    methods: {
      logout() {
        this.$auth.signOut().then(() => {
          this.$parent.isLogin = false;
          this.$router.replace('/login');
        })
      },
    }
  };
</script>

<style scoped lang="scss">
  @import "../assets/stylesheets/config";

  .navbar {
    .navbar-brand {
      background-color: $color-primary;

      .navbar-item {
        font-weight: bold;
        font-size: x-large;
        color: white;
      }
    }
  }
</style>
