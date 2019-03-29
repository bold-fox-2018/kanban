<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-3">
        <div class="card text-white bg-primary" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">Back-Log</h5>
            <hr>
             <div class="container kotak">
                <div class="row">
                    <Task :tasks="backlog" />
                </div>
            </div>
            <hr>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="card text-white bg-secondary" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">To-Do</h5>
            <hr>
            <div class="container kotak">
              <div class="row">
                <Task :tasks="todo" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="card text-white bg-success" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">Doing</h5>
            <hr>
            <Task :tasks="doing" />
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="card text-white bg-danger" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">Done</h5>
            <hr>
            <Task :tasks="done" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>id

<style scoped>
    .kotak {
        /* border: 1px solid whitesmoke; */
    }
</style>


<script>
import Task from '@/components/Task.vue';
import db from '@/api/firebase.js';

export default {
  name: 'Category',
  components: {
    Task,
  },
  data() {
    return {
      backlog: [],
      todo: [],
      doing: [],
      done: [],
    };
  },
  mounted() {
    db.collection('Tasks')
      .orderBy('createdAt')
      .onSnapshot((querySnapshot) => {
        this.backlog = [];
        this.todo = [];
        this.doing = [];
        this.done = [];
        querySnapshot.forEach((docs) => {
          // console.log(docs.id)
          // console.log(docs.data());
          // console.log(docs.data().status, 'cek status')
          // console.log(docs.data().id)
          if (docs.data().status === 'backlog') {
            this.backlog.push({ ...docs.data(), id: docs.id});
          } else if (docs.data().status === 'todo') {
            this.todo.push({ ...docs.data(), id: docs.id });
          } else if (docs.data().status === 'doing') {
            this.doing.push({ ...docs.data(), id: docs.id });
          } else if (docs.data().status === 'done') {
            this.done.push( { ...docs.data(), id: docs.id });
          }
        });
      })
      .catch((err) => {
        console.log(err)
      });
  },
};
</script>
