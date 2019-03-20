<template>
  <v-app class="home">
    <v-content>
    <MainHeader/>
      <v-container fluid>
          <v-layout row justify-space-between >
            <KanbanCard v-for="(data,index) in taskLists" :key="index" :data="data"></KanbanCard>
          </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
// @ is an alias to /src
import MainHeader from '@/components/MainHeader.vue'
import KanbanCard from '@/components/KanbanCard.vue'
import database from '../assets/config.js'

const taskData = [
  {
    name: `Pre - Log`,
    tasks: [],
    color: 'pink'
  },
  {
    name: `To - Do`,
    tasks: [],
    color: 'purple'
  },
  {
    name: `On - Going`,
    tasks: [],
    color: 'blue'
  },
  {
    name: `Finished`,
    tasks: [],
    color: 'green'
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
