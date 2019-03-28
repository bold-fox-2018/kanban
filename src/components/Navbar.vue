<template>
    <div class="col pt-3" style="background-color:#FFFDD0;">
        <div class="row">
            <div class="col-sm-9">
                <h3>Kanban</h3>
            </div>
            <div class="col-sm-3">
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#newTaskCenter">
                    New Task
                </button>

                <!-- Modal -->
                <div class="modal fade" id="newTaskCenter" tabindex="-1" role="dialog" aria-labelledby="newTaskCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">New Task</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div class="modal-body">
                        <form v-on:submit.prevent="addTodo">
                            Title:<br>
                            <input type="text" v-model="newTitle" placeholder="Title"><br>
                            Description:<br>
                            <input type="text" v-model="newDesc" placeholder="Description"><br>
                            Point:<br>
                            <input type="text" v-model="newPoint" placeholder="Point"><br>
                            Assigned To: <br>
                            <input type="text" v-model="newPerson" placeholder="Person"><br>
                            <button type="submit" class="btn btn-primary">Add New Todo</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </form>
                        </div>
                        <div class="modal-footer">
                        
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        
        </div>
    </div>

</template>

<script>
import db from '@/api/firebase.js'

export default {
  name: 'navbar',
  data() {
    return {
      newTitle:'',
      newDesc: '',
      newPoint: 0,
      newPerson: '',
    };
  },
  methods: {
    addTodo() {
      console.log('masuk method add todo')
      db.collection('todos')
        .add({
          name: this.newTitle,
          description: this.newDesc,
          point: this.newPoint,
          assignedTo: this.newPerson,
          category: "Back-Log",
          createdAt: new Date(),
        })
        .then(docref => {
          console.log('berhasil add', docref);
        })
        .catch(e => {
          console.log(e);
        });
    },
  },
};
</script>