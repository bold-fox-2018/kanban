<template>
  <div id="navbar">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between">
      <router-link to="/" class="navbar-brand">Benk-Ban</router-link>
      <form class="form-inline">
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
        >new task</button>
      </form>
    </nav>

    <!-- <nav class="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between">
      <div class="col-md-6">
        <router-link to="/" class="navbar-brand">Benk-ban</router-link>
      </div>

      <div class="col-md-6">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item">
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
            >new task</button>
          </li>
        </ul>
      </div>
    </nav> -->

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form method="post" v-on:submit.prevent="addTask()">
              <div class="form-group row">
                <label for="colFormLabel" class="col-sm-2 col-form-label">Task</label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control"
                    id="colFormLabel"
                    placeholder="new task"
                    v-model="task"
                  >
                </div>
              </div>
              <div class="form-group row">
                <label for="colFormLabel" class="col-sm-2 col-form-label">Description</label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control"
                    id="colFormLabel"
                    placeholder="description"
                    v-model="description"
                  >
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Save changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/api/firestore";
export default {
  name: "navbar",

  data() {
    return {
      task: "",
      description: "",
      status: "back-log"
    };
  },
  methods: {
    addTask() {
      console.log("masuk sini");

      db.collection("kanban").add({
        task: this.task,
        description: this.description,
        status: this.status
      });
      // .then(doc => {
      //   return db
      //     .collection('kanban')
      //     .get()
      //     .then(snapshot => {
      //       let data = []
      //       snapshot.forEach(element => {
      //         data.unshift({ id: element.id, ...element.data() })
      //       })
      //       this.$emit('newdata', data)
      //     })
      // })
      // .catch(err => {
      //   console.log(err)
      // })
    }
  }
};
</script>