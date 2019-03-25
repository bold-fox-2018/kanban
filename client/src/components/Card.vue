<template>
  <div class="card" style="width: 20rem;">
    <div class="card-block">
      <h5 class="card-title">{{oneTask.title}}</h5>
      <p class="card-text">{{oneTask.detail}}</p>
      <p class="card-text">{{oneTask.assign}}</p>
      <p class="card-text">{{oneTask.point}}</p>
      <div v-if="oneTask.status==='Back-Log'">
        <a href="#" class="btn btn-primary" role="button" v-on:click.prevent="deleteTask(oneTask.id)">Delete</a>
        <a href="#" class="btn btn-primary" role="button" v-on:click.prevent="updateNext(oneTask.id, oneTask.status)">Todo</a>
      </div>
      <div v-if="oneTask.status==='Todo'">
        <a href="#" class="btn btn-primary" role="button" v-on:click.prevent="updateReverse(oneTask.id, oneTask.status)">Back-Log</a>
        <a href="#" class="btn btn-primary" role="button" v-on:click.prevent="deleteTask(oneTask.id)">Delete</a>
        <a href="#" class="btn btn-primary" role="button" v-on:click.prevent="updateNext(oneTask.id, oneTask.status)">Doing</a>
      </div>
      <div v-if="oneTask.status==='Doing'">
        <a href="#" class="btn btn-primary" role="button" v-on:click.prevent="updateReverse(oneTask.id, oneTask.status)">Doing</a>
        <a href="#" class="btn btn-primary" role="button" v-on:click.prevent="deleteTask(oneTask.id)">Delete</a>
        <a href="#" class="btn btn-primary" role="button" v-on:click.prevent="updateNext(oneTask.id, oneTask.status)">Done</a>
      </div>
      <div v-if="oneTask.status==='Done'">
        <a href="#" class="btn btn-primary" role="button" v-on:click.prevent="updateReverse(oneTask.id, oneTask.status)">Doing</a>
        <a href="#" class="btn btn-primary" role="button" v-on:click.prevent="deleteTask(oneTask.id)">Delete</a>
      </div>
    </div>
  </div>
</template>

<style>
.card-block {
  border: solid 2px;
}
.card {
  margin: 5px;
}
</style>
<script>
import db from "@/api/firebase.js";
export default {
  props: ["oneTask"],
  data() {
    return {
      data: "",
      button: ""
    };
  },
  methods: {
      deleteTask(idTask) {
          db.collection('todos').doc(idTask).delete()
          .then(() => {
              console.log('Delete success')
          })
      },
      updateReverse(idTask, statusTask) {
          let updatedStatus = ''
          if (statusTask === 'Todo') {
              updatedStatus = 'Back-Log'
          }
          else if (statusTask === 'Doing') {
              updatedStatus = 'Todo'
          }
          else {
              updatedStatus = 'Doing'
          }
          db.collection('todos').doc(idTask).update({
              status: updatedStatus
          })
          .then((response) => {
              console.log(response)
          })
          .catch(err=> {
              console.log(err)
          })
      },
      updateNext(idTask, statusTask) {
          let updatedStatus = ''
          if (statusTask === 'Back-Log') {
              updatedStatus = 'Todo'
          }
          else if (statusTask === 'Todo') {
              updatedStatus = 'Doing'
          }
          else {
              updatedStatus = 'Done'
          }
          db.collection('todos').doc(idTask).update({
              status: updatedStatus
          })
          .then((response) => {
              console.log(response)
          })
          .catch(err=> {
              console.log(err)
          })
      }
  },
};
</script>
