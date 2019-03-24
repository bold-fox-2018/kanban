<template>
  <nav class="navbar navbar-light bg-white">
    <a href class="navbar-brand">
      <img src="../assets/kanzai.png" alt="Kanzai Logo" width="100px;">
    </a>
    <div>
      <button
        class="btn btn-md btn-outline-dark mr-auto"
        data-toggle="modal"
        data-target="#addTask"
      >Add Task</button>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="addTask" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add Task</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body d-flex justify-content-center">
            <form class="w-50">
              <div class="form-group">
                <label for="task-name" class="col-form-label">Input task :</label>
                <input v-model="name" type="text" class="form-control">
              </div>
              <div class="form-group">
                <label for="assign" class="col-form-label">Assign to :</label>
                <input v-model="assignTo" type="text" class="form-control">
              </div>
              <div class="form-group">
                <label for="point" class="col-form-label">Point :</label>
                <input v-model="point" type="text" class="form-control">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click.prevent="addTask" type="button" class="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
  </nav>
</template>

<script>
import db from "@/api/firebase";

export default {
  name: 'navbar',
  data() {
    return {
      name: '',
      assignTo: '',
      point: 0
    };
  },
  methods: {
    addTask() {
      db.collection('tasks')
        .add({
          name: this.name,
          assign: this.assignTo,
          point: this.point,
          status: 'Pre-Log'
        })
        .then(() => {
          this.name = '';
          this.assignTo = '';
          this.point = '';
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.btn-outline-dark {
  color: #000;
  border-color: #000;
  font-family: 'Italiana', serif;
  font-weight: bolder;
}
.btn-outline-dark:hover {
    color: #fff;
    background-color: #343a40;
    border-color: #343a40;
}
</style>
