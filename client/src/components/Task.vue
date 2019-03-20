<template>
  <div>
    <div class="card mb-2" v-for="task in tasks" :key="task.id">
      <div class="card-header pl-3 pt-1 pb-1">
        <strong>{{ task.title }}</strong>
      </div>
      <div class="card-body pl-3 pt-2 pb-1">
        <div>
          Point: {{ task.point }}
        </div>
        <div>
          Description: {{ task.description }}
        </div>
        <div>
          Assigned To: {{ task.assignedTo }}
        </div>
      </div>
      <div class="card-footer p-0">
        <div class="d-flex justify-content-between">
          <button class="btn" style="background-color: red; color: white;" v-if="task.status === 'todo'" @click.prevent="moveTask(task.id, task.status, -1)">Back Log</button>
          <button class="btn btn-warning" v-if="task.status === 'doing'" @click.prevent="moveTask(task.id, task.status, -1)">To Do</button>
          <button class="btn btn-primary" v-if="task.status === 'done'" @click.prevent="moveTask(task.id, task.status, -1)">Doing</button>
          <button class="btn btn-danger" @click.prevent="deleteTask(task.id)">Delete</button>
          <button class="btn btn-warning" v-if="task.status === 'backlog'" @click.prevent="moveTask(task.id, task.status, 1)">To Do</button>
          <button class="btn btn-primary" v-if="task.status === 'todo'" @click.prevent="moveTask(task.id, task.status, 1)">Doing</button>
          <button class="btn btn-success" v-if="task.status === 'doing'" @click.prevent="moveTask(task.id, task.status, 1)">Done</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/api/firebase.js';

export default {
  name: 'task',
  methods: {
    moveTask(id, status, direction) {
      const statusList = ['backlog', 'todo', 'doing', 'done']
      db.collection('tasks')
        .doc(id)
        .update({
          status: statusList[statusList.indexOf(status) + direction]
        })
        .then(() => {
          console.log('jalan bro')
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteTask(id) {
      db.collection('tasks')
        .doc(id)
        .delete()
        .then(() => {
          console.log('aaarrgghh tinininining')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  props: ['tasks']
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
