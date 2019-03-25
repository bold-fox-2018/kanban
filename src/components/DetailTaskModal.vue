<template>
  <div
    class="modal fade"
    id="detail-task"
    tabindex="-1"
    role="dialog"
    aria-labelledby="add-task-label"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header bg-light">
          <h5 class="modal-title" id="add-task-label">New Task</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form class="text-left">
            <div class="form-group">
              <label for="name">Task Title</label>
              <input v-model="newTask.title" type="text" class="form-control" placeholder="Task Title" id="name">
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <textarea v-model="newTask.description" class="form-control" rows="3" id="description"></textarea>
            </div>
            <div class="form-group">
              <label for="point">Point</label>
              <input v-model="newTask.point" type="number" class="form-control" id="point">
            </div>
            <div class="form-group">
              <label for="assign">Assign To</label>
              <input v-model="newTask.assign" type="text" class="form-control" placeholder="Assign To" id="assign">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
          <button v-on:click="addTask" type="submit" class="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddTaskModal",
  data() {
    return {
      newTask: {
        title: "",
        description: "",
        point: "",
        assign: "",
        status: "backlog"
      }
    };
  },

  methods: {
    toggleModal() {
      this.modalShown = !this.modalShown;
    },
    addTask() {
      this.$db.collection('tasks')
        .add({
          title: this.newTask.title,
          description: this.newTask.description,
          point: this.newTask.point,
          assign: this.newTask.assign,
          status: this.newTask.status,
          createdAt: new Date()
        })
        .then(task => {
          this.$emit('close-modal')
          this.newTask = {
            title: "",
            description: "",
            point: "",
            assign: "",
            status: "backlog"
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

};
</script>



