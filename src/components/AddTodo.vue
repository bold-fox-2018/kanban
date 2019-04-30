<template>
  <div class="mt-3">
    <div>
      <h4>Add Todo</h4>
      <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#exampleModal">
        <img src="https://img.icons8.com/color/48/000000/plus-math.png" height="18">
      </button>
    </div>
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
            <h5 class="modal-title" id="exampleModalLabel">Add Todo</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="exampleFormControlInput1">Todo</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="e.g. 'Matkul Spikologi'"
                v-model="todo"
              >
            </div>
            <div class="form-group">
              <label for="exampleFormControlInput1">Point</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="1000"
                v-model="point"
              >
            </div>
            <div class="form-group">
              <label for="exampleFormControlInput1">Assigned To</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Fikri"
                v-model="assigned_to"
              >
            </div>
          </div>
          <div class="modal-footer">
            <button
              id="modal-button"
              type="button"
              class="btn btn-primary"
              @click="addTodo"
            >Add Todo</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/Firebase/config.js'

export default {
  data() {
    return {
      todo: '',
      point: null,
      assigned_to: '',
      status: 0
    };
  },
  methods: {
    addTodo() {
      db.collection("todos")
        .add({
          todo: this.todo,
          status: this.status,
          point: this.point,
          assigned_to: this.assigned_to
        })
        .then(function(docRef) {})
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    }
  }
};
</script>

<style>
</style>
