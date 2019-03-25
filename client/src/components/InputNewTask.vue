<template>
  <div>
    <div
      class="modal fade"
      id="new-task"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">New Task</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <span class="input">
              Title
              <input v-model="title" type="text" class="form-control">
            </span>
            <span class="input">
              Description
              <input v-model="description" type="text" class="form-control">
            </span>
            <span class="input">
              Point
              <input v-model="point" type="text" class="form-control">
            </span>
            <span class="input">
              Assigned To
              <input v-model="assignedTo" type="text" class="form-control">
            </span>
          </div>
          <div class="modal-footer">
            <button
              @click.prevent="addTask"
              type="button"
              class="btn btn-primary"
              data-dismiss="modal"
            >Add Task</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputNewTask',
  data() {
    return {
      title: '',
      description: '',
      point: '',
      assignedTo: '',
      status: 'Back Log',
      createdAt: new Date(),
    };
  },
  methods: {
    resetForm() {
      this.title = '';
      this.description = '';
      this.point = '';
      this.assignedTo = '';
      this.status = 'Back Log';
      this.createdAt = new Date();
    },
    addTask() {
      this.$db
        .collection('tasks')
        .add({
          title: this.title,
          description: this.description,
          point: this.point,
          assignedTo: this.assignedTo,
          status: this.status,
          createdAt: this.createdAt,
        })
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id);
          this.resetForm();
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
    },
  },
};
</script>
<style>
.form-control {
  border: 0;
  border-bottom: 1px solid #000;
}
input[type="text"]:focus {
  border-color: white;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.01) inset, 0 0 8px rgba(0, 0, 0, 0.3);
  outline: 0 none;
}
.input {
  display: block;
  padding: 15px 0px;
}
</style>
