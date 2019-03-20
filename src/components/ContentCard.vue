<template>
  <v-flex my-1>
    <v-card>
      <v-card-title>{{item.title.toUpperCase()}}</v-card-title>
      <v-card-actions>
        <v-layout column>
          <v-btn small @click="removeItem(item.id)" flat color="red">Delete</v-btn>
          <v-btn small @click="actionOne(item.id)" flat color="orange">{{buttonOne}}</v-btn>
          <v-btn small @click="actionTwo(item.id)" flat color="blue" v-if="buttonTwo">{{buttonTwo}}</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
import database from '@/assets/config'

export default {
  name: 'ContentCard',
  data () {
    return {
      buttonOne: '',
      buttonTwo: ''
    }
  },
  props: ['item', 'name'],
  created () {
    if (this.name === 'Pre - Log') {
      this.buttonOne = 'To - Do'
      this.buttonTwo = null
    } else if (this.name === 'To - Do') {
      this.buttonOne = 'Pre - Log'
      this.buttonTwo = 'On - Going'
    } else if (this.name === 'On - Going') {
      this.buttonOne = 'To - Do'
      this.buttonTwo = 'Finished'
    } else if (this.name === 'Finished') {
      this.buttonOne = 'On - Going'
      this.buttonTwo = null
    }
  },
  methods: {
    actionOne (value) {
      database
        .collection('Tasks')
        .doc(value)
        .delete()
      database.collection('Tasks').add({
        title: this.item.title,
        status: this.buttonOne
      })
    },
    actionTwo (value) {
      database
        .collection('Tasks')
        .doc(value)
        .delete()
      database.collection('Tasks').add({
        title: this.item.title,
        status: this.buttonTwo
      })
    },
    removeItem (value) {
      //   database.ref(`/${this.item.id}`).remove();
      console.log('aaa', value)
      database
        .collection('Tasks')
        .doc(value)
        .delete()
    }
  }
}
</script>
