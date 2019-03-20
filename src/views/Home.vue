<template>
  <div class="home">
    <MainHeader/>
    <div class="container">
      <div class="container-card">
        <KanbanCard v-for="(data,index) in taskLists" :key="index" :data="data"></KanbanCard>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MainHeader from '@/components/MainHeader.vue'
import KanbanCard from '@/components/KanbanCard.vue'
import database from '../assets/config.js'

const taskData = [
  {
    name: `Pre - Log`,
    tasks: []
  },
  {
    name: `To - Do`,
    tasks: []
  },
  {
    name: `On - Going`,
    tasks: []
  },
  {
    name: `Finished`,
    tasks: []
  }
]

export default {
  name: 'home',
  components: {
    MainHeader,
    KanbanCard
  },
  data () {
    return {
      taskLists: taskData
    }
  },
  methods: {},
  created () {
    database
      .collection('Tasks').onSnapshot(querySnapshot => {
        taskData[0].tasks = []
        taskData[1].tasks = []
        taskData[2].tasks = []
        taskData[3].tasks = []
        querySnapshot.forEach(childSnapshot => {
          console.log(childSnapshot.id)
          if (childSnapshot.data().status === 'Pre - Log') {
            const obj = childSnapshot.data()
            obj.id = childSnapshot.id
            taskData[0].tasks.push(obj)
          } else if (childSnapshot.data().status === 'To - Do') {
            const obj = childSnapshot.data()
            obj.id = childSnapshot.id
            taskData[1].tasks.push(obj)
          } else if (childSnapshot.data().status === 'On - Going') {
            const obj = childSnapshot.data()
            obj.id = childSnapshot.id
            taskData[2].tasks.push(obj)
          } else {
            const obj = childSnapshot.data()
            obj.id = childSnapshot.id
            taskData[3].tasks.push(obj)
          }
        })
      })
  },
  mounted () {}
}
</script>

<style>
.container-card {
  margin-top: 30px;
  padding-top: 5%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  width: 90%;
  grid-gap: 20px;
}
.container {
  background-color: #f6f7f9;
  width: 100%;
  min-height: 675px;
}
@media only screen and (max-width: 800px) {
  .container-card {
    display: block;
  }
}
</style>
