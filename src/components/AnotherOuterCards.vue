<template>
  <div  class="card border-success my-5 container mx-auto" :style="detail.borderColor">
    <div class="card-header bg-transparent border-success container">
        <div class="row">
            <div id="outerCards" class="col">
                {{ detail. title }}
            </div>
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="e.g. 'Matkul Spikologi'" v-model="todo">
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Point</label>
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="1000" v-model="point">
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Assigned To</label>
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Fikri" v-model="assigned_to">
                            </div>
                    </div>
                    <div class="modal-footer">
                        <!-- <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button> -->
                        <button id="modal-button" type="button" class="btn btn-primary" @click="addTodo">Add Todo</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="card-body text-success">
      <h5 class="card-title"></h5>
      <TodoContent :todos="detail.todos"></TodoContent>
    </div>
  </div>
</template>

<script>
import TodoContent from '@/components/todo-content.vue'
import db from '@/Firebase/config.js'

export default {
  data () {
    return {
      todo: '',
      description: '',
      date: '',
      status: 0,
      point: null,
      assigned_to: ''
    }
  },
  components: {
    TodoContent
  },
  props: {
    detail: Object
  },
  methods: {
    // add todo to database
    addTodo () {
      db.collection('todos').add({
        todo: this.todo,
        description: this.description,
        status: this.status,
        point: this.point,
        assigned_to: this.assigned_to
      })
        .then(function (docRef) {
          //
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    }
  }
}
</script>

<style>
    #modal-button {
        background-color: #7F782A;
    }
    #outerCards {
        font-size: 1.5em;
    }
    .btn-primary {
        background-color: #fff;
    }
    .btn.btn-primary:hover {
        border-color: #000;
    }
</style>
