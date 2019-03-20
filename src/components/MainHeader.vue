<template>
  <v-container>
    <v-layout>
      <v-text-field box autofocus label="input new task" v-model="taskName"></v-text-field>
      <v-btn color="dark" @click="sendItem">submit</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import database from '../assets/config.js'
export default {
  name: 'MainHeader',
  data () {
    return {
      taskName: ''
    }
  },
  methods: {
    sendItem () {
      database
        .collection('Tasks')
        .add({
          title: this.taskName,
          status: 'Pre - Log'
        })
        .then(docRef => {
          this.taskName = ''
          console.log('Document written with ID: ', docRef.id)
        })
        .catch(err => {
          console.error('Error adding document: ', err)
        })
    }
  }
}
</script>
