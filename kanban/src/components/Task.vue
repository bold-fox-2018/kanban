<template>
  <div>
    <div class="card" v-for="task in tasks" :key="task.id">
      <div class="card-body">
        <h5 class="card-title text-primary"><strong>{{ task.title }}</strong></h5>
        <p class="card-text">Description: {{ task.description }}</p>
        <p class="card-text">Point: {{ task.point }}</p>
        <p class="card-text">Assigned To: {{ task.assignedTo }}</p>
        <div class="d-flex justify-content-around">
          <a role="button" class="card-link btn text-warning" @click.prevent="moveTask(task.id, task.status, -1)" v-if="task.status === 'todo'">Back log</a>
          <a role="button" class="card-link btn text-warning" @click.prevent="moveTask(task.id, task.status, -1)" v-if="task.status === 'doing'">To Do</a>
          <a role="button" class="card-link btn text-warning" @click.prevent="moveTask(task.id, task.status, -1)" v-if="task.status === 'done'">Doing</a>
          <a role="button" class="card-link btn text-danger" @click.prevent="deleteTask(task.id)">Delete</a>
          <a role="button" class="card-link btn text-warning" @click.prevent="moveTask(task.id, task.status, 1)" v-if="task.status === 'backlog'">To Do</a>
          <a role="button" class="card-link btn text-warning" @click.prevent="moveTask(task.id, task.status, 1)" v-if="task.status === 'todo'">Doing</a>
          <a role="button" class="card-link btn text-warning" @click.prevent="moveTask(task.id, task.status, 1)" v-if="task.status === 'doing'">Done</a>
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
      const statusList = ['backlog', 'todo', 'doing', 'done'];
      db.collection('kanban')
        .doc(id)
        .update({
          status: statusList[statusList.indexOf(status) + direction],
        })
        .then(() => {
          console.log('berhasil pindah');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteTask(id) {
      db.collection('kanban')
        .doc(id)
        .delete()
        .then(() => {
          console.log('berhasil delete');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  props: ['tasks'],
};
</script>