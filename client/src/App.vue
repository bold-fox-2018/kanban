<template>
  <div id="app">
    <Navbar/>
    <router-view/>
    <div class="modal" :class="{'is-active': showModal}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title"></p>
          <button class="delete" aria-label="close" @click="showModal=false"></button>
        </header>
        <section class="modal-card-body">
          <form @submit.prevent="taskCreate">
            <div class="field">
              <label class="label">Title</label>
              <div class="control">
                <input type="text" class="input" v-model="title" placeholder="Title" required>
              </div>
            </div>
            <div class="field">
              <label class="label">Description</label>
              <div class="control">
                <textarea
                  v-model="description"
                  class="textarea"
                  placeholder="Description"
                  required
                ></textarea>
              </div>
            </div>
            <div class="field">
              <label class="label">Point</label>
              <div class="control">
                <input type="number" class="input" v-model="point" placeholder="Point" required>
              </div>
            </div>
            <div class="field">
              <label class="label">Assignee To</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  v-model="assignedTo"
                  placeholder="Assignee To"
                  required
                >
              </div>
            </div>
            <div class="columns is-pulled-right">
              <div class="column">
                <input type="submit" value="Save" class="button is-success">
              </div>
              <div class="column" v-if="id">
                <a @click="taskDelete()" class="button is-danger">Delete</a>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from './components/Navbar.vue';

  export default {
    components: {
      Navbar,
    },
    created() {
      this.isLogin = !! this.$auth.currentUser;
      this.$db.collection('tasks')
        .orderBy('createdAt')
        .onSnapshot((doc) => {
          this.backlog = [];
          this.todo = [];
          this.doing = [];
          this.done = [];
          doc.forEach((task) => {
            this[this.listLabel[+task.data().status].slug].push({
              id: task.id,
              ...task.data(),
            });
          });
        }, (err) => {
          console.log(err);
        });
    },
    methods: {
      getTaskById(id) {
        return this.$db.collection('tasks')
          .doc(id)
          .get();
      },
      moveNextTask(id) {
        this.getTaskById(id)
          .then(async (doc) => {
            const data = doc.data();
            await this.$db.collection('tasks')
              .doc(id)
              .update({
                status: (+data.status + 1 < this.listLabel.length ? +data.status + 1 : +data.status),
              });
          })
          .catch((err) => {
            console.log(err);
          });
      },
      movePrevTask(id) {
        this.getTaskById(id)
          .then(async (doc) => {
            const data = doc.data();
            await this.$db.collection('tasks')
              .doc(id)
              .update({
                status: (+data.status - 1 >= 0 ? +data.status - 1 : +data.status),
              });
          })
          .catch((err) => {
            console.log(err);
          });
      },
      taskDelete() {
        this.$db.collection('tasks')
          .doc(this.id)
          .delete()
          .then(() => {
            this.clearDataInput();
            this.showModal = false;
          })
          .catch((err) => {
            console.log(err);
          });
      },
      taskUpdateForm(id) {
        this.getTaskById(id)
          .then((doc) => {
            const item = doc.data();
            this.id = doc.id;
            this.title = item.title;
            this.description = item.description;
            this.point = item.point;
            this.assignedTo = item.assignedTo;
            this.showModal = true;
          })
          .catch((err) => {
            console.log(err);
          });
      },
      taskCreate() {
        if (this.id) {
          this.$db.collection('tasks')
            .doc(this.id)
            .update({
              title: this.title,
              description: this.description,
              point: this.point,
              assignedTo: this.assignedTo,
            })
            .then(() => {
              this.clearDataInput();
              this.showModal = false;
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.$db.collection('tasks')
            .add({
              title: this.title,
              description: this.description,
              point: this.point,
              assignedTo: this.assignedTo,
              status: 0,
              createdAt: new Date(),
            })
            .then(() => {
              this.clearDataInput();
              this.showModal = false;
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
      clearDataInput() {
        this.id = '';
        this.title = '';
        this.description = '';
        this.point = 0;
        this.assignedTo = '';
      },
    },
    watch: {
      showModal(val) {
        if (!val) {
          this.clearDataInput();
        }
      },
    },
    data() {
      return {
        listLabel: [
          {title: 'Backlog', slug: 'backlog'},
          {title: 'Todo', slug: 'todo'},
          {title: 'Doing', slug: 'doing'},
          {title: 'Done', slug: 'done'},
        ],
        backlog: [],
        todo: [],
        doing: [],
        done: [],
        id: '',
        title: '',
        description: '',
        point: 0,
        isLogin: false,
        assignedTo: '',
        bgNavbar: 'white',
        showModal: false,
      };
    },
  };
</script>

<style lang="scss">
  @import "./assets/stylesheets/config";

  $link: $color-primary;
  $title-color: $color-primary;

  $content-heading-color: $color-primary;

  $menu-item-hover-color: white;
  $menu-item-hover-background-color: $color-primary;

  $navbar-dropdown-item-hover-color: white;
  $navbar-dropdown-item-hover-background-color: $color-primary;

  $footer-background-color: white;
  $footer-padding: 0;

  #app {
    padding-top: 80px;
  }

  @import "~bulma/bulma.sass";
</style>
