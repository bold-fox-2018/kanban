<template>
  <nav class="navbar navbar-light bg-dark justify-content-between">
    <a class="navbar-brand text-light">₭₳₦฿₳₦</a>
    <button class="btn btn-outline-light my-2 my-sm-0" data-toggle="modal" data-target="#modalTask">Add Task</button>
    <div class="modal fade" id="modalTask" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">New Task</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="newTask">
              <div class="form-group">
                <label class="col-form-label">Title</label>
                <input type="text" class="form-control" v-model="title" required>
              </div>
              <div class="form-group">
                <label class="col-form-label">Description</label>
                <textarea class="form-control" v-model="description" required></textarea>
              </div>
              <div class="form-group">
                <label class="col-form-label">Point</label>
                <input type="number" min="1" max="100" class="form-control" v-model="point" required>
              </div>
              <div class="form-group">
                <label class="col-form-label">Assigned To</label>
                <input type="text" class="form-control" v-model="assignedTo" required>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-primary">Add</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import db from '@/api/firebase.js';

export default {
  name: 'navbar',
  data() {
    return {
      title: null,
      description: null,
      point: null,
      assignedTo: null,
    };
  },
  methods: {
    newTask() {
      db.collection('kanban')
        .add({
          title: this.title,
          description: this.description,
          point: this.point,
          assignedTo: this.assignedTo,
          status: 'backlog',
          createdAt: new Date(),
        })
        .then((doc) => {
          this.title = null;
          this.description = null;
          this.point = null;
          this.assignedTo = null;
          console.log(doc);
        })
        .catch((err) => {
          console.log(err);
        });
      $('#modalTask').modal('toggle');
    },
  },
};
</script>
