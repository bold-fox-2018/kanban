<template>
  <div>
    <nav>
      <div class="menu-icon">
        <i class="fa fa-bars fa-2x"></i>
      </div>
      <div class="logo">KANBAN</div>
      <div class="menu">
        <ul>
          <li>
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#myModal"
            >Add New Task</button>
          </li>
        </ul>
      </div>
    </nav>
    <div class="modal" id="myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal body -->
          <div class="modal-body">
            <div class="add">
              <h2>Add Task</h2>
              <form v-on:submit.prevent="addTodo">
                <input v-model="title" placeholder="Title" class="form-control">
                <br>
                <input v-model="detail" placeholder="Detail" class="form-control">
                <br>
                <input v-model="point" placeholder="Point" class="form-control">
                <br>
                <input v-model="assign" placeholder="Assign To" class="form-control">
                <br>
                <br>
                <input type="submit" class="btn btn-success" value="Submit">
              </form>
            </div>
          </div>
          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
}
body {
  font-family: "Helvetica Neue", sans-serif;
  font-weight: lighter;
}
header {
  width: 100%;
  height: 100vh;
  background-color: honeydew;
  background-size: cover;
}
.logo {
  line-height: 60px;
  position: fixed;
  float: left;
  margin: 16px 46px;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  letter-spacing: 2px;
}
nav {
  position: fixed;
  width: 100%;
  line-height: 60px;
  z-index: 100;
}
nav ul {
  line-height: 60px;
  list-style: none;
  background: rgba(0, 0, 0, 0);
  overflow: hidden;
  color: #fff;
  padding: 0;
  text-align: right;
  margin: 0;
  padding-right: 40px;
  transition: 1s;
  background-color: rosybrown;
}
nav.black ul {
  background: #000;
}
nav ul li {
  display: inline-block;
  padding: 16px 40px;
}
nav ul li a {
  text-decoration: none;
  color: #fff;
  font-size: 16px;
}
input[type="text"] {
  width: 130px;
  -webkit-transition: width 0.4s ease-in-out;
  transition: width 0.4s ease-in-out;
}
input[type="text"]:focus {
  width: 100%;
}
.menu-icon {
  line-height: 60px;
  width: 100%;
  background: #000;
  text-align: right;
  box-sizing: border-box;
  padding: 15px 24px;
  cursor: pointer;
  color: #fff;
  display: none;
}
@media (max-width: 786px) {
  .logo {
    position: fixed;
    top: 0;
    margin-top: 16px;
  }
  nav ul {
    max-height: 0px;
    background: #000;
  }
  nav.black ul {
    background: #000;
  }
  .showing {
    max-height: 34em;
  }
  nav ul li {
    box-sizing: border-box;
    width: 100%;
    padding: 24px;
    text-align: center;
  }
  .menu-icon {
    display: block;
  }
}
.add form {
  width: 100%;
  height: 100%;
}

.form-group {
  max-width: 80%;
}
</style>

<script>
import db from "@/api/firebase.js";
export default {
  data() {
    return {
      title: '',
      detail: '',
      assign: '',
      point: 0,
      status: 'Back-Log',
    };
  },
  methods: {
    addTodo() {
      db.collection("todos")
        .add({
          title: this.title,
          detail: this.detail,
          point: this.point,
          assign: this.assign,
          status: this.status
        })
        .then(docRef => {
          console.log(docRef);
          this.title = '';
          this.detail = '';
          this.point = 0;
          this.assign = ''
          Swal.fire({
            type: 'success',
            title: `Add task success`,
            animation: true,
            timer: 1500
          });
        })
        .catch(err => {
          console.log(err);
          Swal.fire({
            type: 'error',
            title: 'Oops, something wrong happen',
            animation: true,
            customClass: {
              popup: 'animated tada'
            },
            timer: 1500,
          });
        });
    }
  }
};
</script>