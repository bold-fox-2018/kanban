<template>
  <div
    class="modal fade"
    id="exampleModalLong"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLongTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">detail for task {{selectedTask.task}}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>description : {{selectedTask.description}}</p>
        </div>
        <div class="modal-footer">
            <div>
                 <button
                type="button"
                class="btn btn-primary"
                v-if="selectedTask.status == 'To-Do'"
                @click="updateTask(selectedTask,'back-log')"
                data-dismiss="modal"
                >back-log</button>
                  <button
                type="button"
                class="btn btn-primary"
                v-if="selectedTask.status == 'Doing'"
                @click="updateTask(selectedTask,'To-Do')"
                data-dismiss="modal"
                >To-Do</button>
                  <button
                type="button"
                class="btn btn-primary"
                v-if="selectedTask.status == 'Done'"
                @click="updateTask(selectedTask,'Doing')"
                data-dismiss="modal"
                >Doing</button>
            </div>

            <div>
                <button 
                type="button" 
                class="btn btn-secondary" 
                data-dismiss="modal"
                @click="deleteTask(selectedTask)"
                 >delete</button>
            </div>
            <div>
                 <button
                type="button"
                class="btn btn-primary"
                v-if="selectedTask.status == 'back-log'"
                @click="updateTask(selectedTask,'To-Do')"
                data-dismiss="modal"
                >todo</button>
                  <button
                type="button"
                class="btn btn-primary"
                v-if="selectedTask.status == 'To-Do'"
                @click="updateTask(selectedTask,'Doing')"
                data-dismiss="modal"
                >doing</button>
                   <button
                type="button"
                class="btn btn-primary"
                v-if="selectedTask.status == 'Doing'"
                @click="updateTask(selectedTask,'Done')"
                data-dismiss="modal"
                >done</button>
            </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/api/firestore";
export default {
  name: "update",
  data () {
    return {

    }
  },
  props: ["selected-task"],
  methods : {
      updateTask(task, command) {
          db
            .collection('kanban')
            .doc(`${task.id}`)
            .update({
                status : command
            })      
      },
      deleteTask(task) {
          db
            .collection("kanban")
            .doc(`${task.id}`).delete()
            .then(function() {
                console.log("Document successfully deleted!");
            })
            .catch(function(error) {
                console.error("Error removing document: ", error);
            });

      }
  }
};
</script>

