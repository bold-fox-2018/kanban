<template>
  <div class="cardContent">
    <h2>{{item.title}}</h2>
    <div class="container-button">
      <div>
        <h4 @click="removeItem(item.id)">delete</h4>
      </div>

      <div>
        <h4 @click="actionOne(item.id)">{{buttonOne}}</h4>
      </div>

      <div>
        <h4 @click="actionTwo(item.id)" v-if="buttonTwo">{{buttonTwo}}</h4>
      </div>
    </div>
  </div>
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
      //   database.ref(`/${this.item.id}`).remove();
      //   database.ref("/").push({
      //     title: this.item.title,
      //     status: this.buttonOne
      //   })
      database
        .collection('Tasks')
        .doc(value)
        .delete()
      database.collection('Tasks')
        .add({
          title: this.item.title,
          status: this.buttonOne
        })
    },
    actionTwo (value) {
      database
        .collection('Tasks')
        .doc(value)
        .delete()
      database.collection('Tasks')
        .add({
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

<style scoped>
.cardContent {
  font-size: 10px;
  color: #fff;
  width: 70%;
  min-height: 100px;
  background-color: #4684f6;
  -webkit-box-shadow: 0px 5px 4px #c0c0c09d;
  -moz-box-shadow: 0px 5px 4px #c0c0c09d;
  box-shadow: 0px 5px 4px #c0c0c09d;
  border-radius: 5px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  margin-bottom: 50px;
  vertical-align: middle;
  cursor: pointer;
  padding-bottom: 20px;
}
.card h2 {
  padding-top: 20px;
  font-size: 20px;
}
.container-button h4 {
  color: #4684f6;
  background-color: #fff;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  width: 30%;
  padding: 2%;
  border-radius: 5px;
}
</style>
