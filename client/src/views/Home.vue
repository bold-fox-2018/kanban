<template>
  <div class="container-fluid">
    <Navbar />
    <div class="container-fluid mt-2">
      <div class="row">
        <div class="col">
          <div class="card p-0">
            <h5 class="card-header" style="background-color: red; color: white;">Back-Log</h5>
            <div class="card-body p-2">
              <Task :tasks="backlog" />
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card p-0">
            <h5 class="card-header" style="background-color: #feb236; color: white;">To-do</h5>
            <div class="card-body p-2">
              <Task :tasks="todo" />
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card p-0">
            <h5 class="card-header" style="background-color: #007bff; color: white;">Doing</h5>
            <div class="card-body p-2">
              <Task :tasks="doing" />
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card p-0">
            <h5 class="card-header" style="background-color: #4CAF50; color: white;">Done</h5>
            <div class="card-body p-2">
              <Task :tasks="done" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Task from '@/components/Task.vue';
import Navbar from '@/components/Navbar.vue';
import db from '@/api/firebase.js';

export default {
  name: 'home',
  components: {
    Navbar,
    Task
  },
  data() {
    return {
      backlog: [],
      todo: [],
      doing: [],
      done: []
    }
  },
  created() {
    db.collection('tasks')
      .orderBy('createdAt')
      .onSnapshot(doc => {
        this.backlog = [];
        this.todo = [];
        this.doing = [];
        this.done = [];
        doc.forEach(task => {
          this[`${task.data().status}`].push({
            ...task.data(),
            id: task.id
          });
        })
      }, err => {
        console.log(err);
      });
  },
};
</script>
