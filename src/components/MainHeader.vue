<template>
  <v-card flat >
    <v-container xs6>
      <v-form @submit.prevent="sendItem">
        <v-layout column >
          <v-text-field append-outline-icon :counter="maxlength" :rules="rules" autofocus label="input new task" v-model="taskName"></v-text-field> 
          <v-text-field append-outline-icon label="input task content" v-model="taskContent"></v-text-field>
          <v-text-field append-outline-icon label="Assigned to" v-model="person"></v-text-field>
          <v-btn color="primary" type="submit">submit</v-btn>
        </v-layout>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import database from "../assets/config.js";
export default {
  name: "MainHeader",
  data() {
    return {
      taskName: "",
      taskContent: "",
      person:"",
      maxlength: 10
    };
  },
  computed:{
    rules(){
      const rules = []
      const rule = v => (v || '').length <= this.maxlength ||
              `A maximum of ${this.maxlength} characters is allowed`
      rules.push(rule)
      return rules
    }
  },
  methods: {
    sendItem() {
      if(this.taskName.length <= this.maxlength) {
        database
        .collection("Tasks")
        .add({
          title: this.taskName,
          content: this.taskContent,
          person:this.person,
          status: "Pre - Log"
        })
        .then(docRef => {
          this.taskName = "";
          this.taskContent = "";
          this.person = "";
          this.$emit("close-dialog");
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(err => {
          console.error("Error adding document: ", err);
        });
      }
      
    }
  }
};
</script>
