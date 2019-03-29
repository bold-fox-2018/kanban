<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12" v-for="task in tasks"  v-bind:key="task.id">
        <!-- {{task.id}} -->
        <h2>{{task.title}}</h2>
        <p>{{task.description}}</p>
        <p>Point : {{task.point}}</p>
        <p>Assigned To: {{task.assignedto}}</p>
        <hr class="garis">
        <button v-on:click.prevent="prev(task.id, task.status)" class="btn btn-danger" v-if="task.status === 'todo'">backlog</button> 
        <button v-on:click.prevent="prev(task.id, task.status)" class="btn btn-danger" v-if="task.status === 'doing'">todo</button> 
        <button v-on:click.prevent="prev(task.id, task.status)" class="btn btn-danger" v-if="task.status === 'done'">doing</button>
        <button v-on:click.prevent="next(task.id, task.status)" class="btn btn-success" v-if="task.status === 'backlog'">todo</button>
        <button v-on:click.prevent="next(task.id, task.status)" class="btn btn-success" v-if="task.status === 'todo'" >doing</button>
        <button v-on:click.prevent="next(task.id, task.status)" class="btn btn-success" v-if="task.status === 'doing'">done</button>
      </div>
    </div>
  </div>
</template>


<style scoped>
hr.garis {
  color: whitesmoke;
}

</style>


<script>
import db from '@/api/firebase.js'

export default {
  name: 'Task',
  props: ['tasks'],
  methods: {
    prev(id, status) {
       let arrStatus = ['backlog', 'todo', 'doing', 'done'];
      db.collection('Tasks')
        .doc(id)
        .update({
          status: arrStatus[arrStatus.indexOf(status) - 1]
        })
    },
    next(id, status) {
       const arrStatus = ['backlog', 'todo', 'doing', 'done'];
      db.collection('Tasks')
        .doc(id)
        .update({
          status: arrStatus[arrStatus.indexOf(status) + 1]
        })
        .then(response=>[
          console.log('success moved')
        ])
        .catch(err=>{
          console.log(err)
        })
    }
  }
};
</script>
