<template>
    <div id="navbar">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li class="nav-item active mx-auto" id="kanban">
                        <router-link to="/" class="navbar-brand mx-auto underline--magical" style="font-size: 2em;">Bamkanban</router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
  name: 'NavbarGeneral',
  // props: {
  //     msg: String
  // }
  methods: {
    loginGoogle () {
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(token => {
          console.log(token)
        })
        .catch(err => {
          console.log(err)
        })
    },
    loginFacebook () {
      firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(token => {
          console.log(token)
        })
        .catch(err => {
          console.log(err)
        })
    },
    loginGithub () {
      firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider())
        .then(token => {
          console.log(token)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
    .navbar-nav {
        width: 100%;
        text-align: center;
        /* > li {
            float: none;
            display: inline-block;
        }; */
    }
    .bg-light {
        background-color: rgb(232, 230, 233) !important;
    }
    #navbar {
        font-family: 'Nova Flat', cursive;
    }
    #kanban:hover {
        background-color: rgb(225, 220, 225);
        text-decoration: underline;
        /* transform: scaleX(1); */
    }
    #kanban {
        border-radius: 12px;
    }
    .underline--magical {
        background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
        background-repeat: no-repeat;
        background-size: 100% 0.2em;
        background-position: 0 88%;
        transition: background-size 0.25s ease-in;
    }
    .underline--magical:hover {
        background-size: 100% 88%;
    }
</style>
