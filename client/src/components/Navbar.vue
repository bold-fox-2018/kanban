<template>
  <nav class="navbar navbar-light bg-light p-1 border-bottom border-dark">
    <div class="navbar-brand">Kanban Board</div>
    <button class="btn btn-primary my-2 my-sm-0" data-toggle="modal" data-target="#modalTask">New Task</button>
    <div class="modal fade" id="modalTask" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">New Task</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="newTask">
            <div class="modal-body">
              <div>
                Title
                <div>
                  <input type="text" class="border rounded pl-2" placeholder="Task Title" v-model="title">
                </div>
              </div>
              <div>
                Description
                <div>
                  <input type="textarea" class="border rounded pl-2" placeholder="Task Short Description" v-model="description">
                </div>
              </div>
              <div>
                Point
                <div>
                  <input type="text" class="border rounded pl-2" v-model="point">
                </div>
              </div>
              <div>
                Assigned To
                <div>
                  <input type="text" class="border rounded pl-2" placeholder="Assigned To" v-model="assignedTo">
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import db from '../api/firebase.js';

export default {
  name: 'navbar',
  data() {
    return {
      title: null,
      description: null,
      point: 0,
      assignedTo: null
    }
  },
  methods: {
    newTask() {
      db.collection('tasks')
        .add({
          title: this.title,
          description: this.description,
          point: this.point,
          assignedTo: this.assignedTo,
          status: 'backlog',
          createdAt: new Date()
        })
        .then(doc => {
          this.title = null
          this.description = null
          this.point = 0
          this.assignedTo = null
          console.log(doc)
        })
        .catch(err => {
          console.log(err)
        })
      $('#modalTask').modal('toggle');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
