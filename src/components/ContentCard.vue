<template>
  <v-flex my-1 :name="item.name">
    <v-toolbar :color="color" class="lighten-3 text-xs-center" >
      <v-toolbar-title>
        <div class><i :class="icon"></i>{{item.title.toUpperCase()}}</div>
      </v-toolbar-title>
    </v-toolbar>
    <v-card>
      <div class="text-xs-center">
        <v-dialog v-model="dialog" width="500">
          <v-btn slot="activator" :color="color" class="darken-3 my-1">Details</v-btn>
          <v-card>
            <v-card-title
              :color="color"
              class="headline lighten-3"
              primary-title
            >Details for task "{{item.title.toUpperCase()}}"</v-card-title>
            <v-card-text>
              Task description:
              <b>{{item.content}}</b>
            </v-card-text>
            <v-card-text>
              Assigned to:
              <b>{{item.person}}</b>
            </v-card-text>
            <v-card-actions>
              <v-layout row>
                <v-btn small @click="removeItem(item.id)" flat color="red">Delete</v-btn>
                <v-btn small @click="actionOne(item.id)" flat color="orange">{{buttonOne}}</v-btn>
                <v-btn
                  small
                  @click="actionTwo(item.id)"
                  flat
                  color="blue"
                  v-if="buttonTwo"
                >{{buttonTwo}}</v-btn>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
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
      buttonTwo: '',
      dialog: false
    }
  },
  props: ['item', 'name', 'color', 'icon'],
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
        .then()
      database.collection('Tasks').add({
        title: this.item.title,
        content: this.item.content,
        person: this.item.person,
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
        content: this.item.content,
        person: this.item.person,
        status: this.buttonTwo
      })
    },
    removeItem (value) {
      database
        .collection('Tasks')
        .doc(value)
        .delete()
    }
  }
}
</script>
