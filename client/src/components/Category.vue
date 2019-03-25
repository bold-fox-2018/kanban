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
                    <div class="col-sm-12" v-for="(item, index) in backlog" v-bind:key="index">
                        <p>{{item.title}}</p>
                        <hr>
                        <p>{{item.description}}</p>
                        <p>Point : {{item.point}}</p>
                        <p>Assigned To: {{item.assignedto}}</p>
                    </div>
                </div>
            </div>
            <hr>
            <!-- <Task /> -->
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
                <div class="col-sm-12 mb-10" v-for="(item, index) in todo" v-bind:key="index">
                      <p>{{item.title}}</p>
                      <hr>
                      <p>{{item.description}}</p>
                      <p>Point : {{item.point}}</p>
                      <p>Assigned To: {{item.assignedto}}</p>
                </div>  
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
            <div class="col-sm-12 mb-10" v-for="(item, index) in doing" v-bind:key="index">
                    <p>{{item.title}}</p>
                    <hr>
                    <p>{{item.description}}</p>
                    <p>Point : {{item.point}}</p>
                    <p>Assigned To: {{item.assignedto}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="card text-white bg-danger" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">Done</h5>
            <hr>
            <div class="col-sm-12 mb-10" v-for="(item, index) in done" v-bind:key="index">
                    <p>{{item.title}}</p>
                    <hr>
                    <p>{{item.description}}</p>
                    <p>Point: {{item.point}}</p>
                    <p>Assigned To: {{item.assignedto}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
    .kotak {
        /* border: 1px solid whitesmoke; */
    }
</style>


<script>
import Task from '@/components/Task.vue'
import db from '@/api/firebase.js'

export default {
  name: "Category",
  props: [],
  components: {
      Task
  },
  data() {
      return {
          backlog: [],
          todo: [],
          doing: [],
          done: []
      }
  }
  ,
  mounted() {
    
      db.collection('Tasks')
        .onSnapshot((querySnapshot)=>{
          this.backlog = []
          this.todo = []
          this.doing = []
          this.done = []
            querySnapshot.forEach(docs => {
                console.log(docs.data())
                // console.log(docs.data().status, 'cek status')
                if (docs.data().status === 'backlog') {
                    this.backlog.push(docs.data())
                } else if (docs.data().status === 'todo') {
                    this.todo.push(docs.data())
                } else if (docs.data().status === 'doing') {
                    this.doing.push(docs.data())
                } else if (docs.data().status === 'done') {
                    this.done.push(docs.data())
                }
            });
            // console.log(querySnapshot.docs)
        })
        .catch(err=>{
            console.log(err) 
        })
  }
};
</script>

