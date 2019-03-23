<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs3>
        <board :color="'lime'" :title="'Back-Log'" :tasks="backlog"></board>
      </v-flex>

      <v-flex xs3>
        <board :color="'amber'" :title="'To-Do'" :tasks="todo"></board>
      </v-flex>

      <v-flex xs3>
        <board :color="'yellow'" :title="'On-Process'" :tasks="process"></board>
      </v-flex>

      <v-flex xs3>
        <board :color="'orange'" :title="'Done'" :tasks="done"></board>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import board from "../components/Board";
import database from "../assets/config.js";

database.settings({
  timestampsInSnapshots: true
});

export default {
  data: function() {
    return {
      backlog: [],
      todo: [],
      process: [],
      done: []
    };
  },
  components: {
    board
  },
  methods: {},
  created() {
    database.collection("tasks").onSnapshot(querySnapshot => {
      this.backlog = [];
      this.todo = [];
      this.process = [];
      this.done = [];
      querySnapshot.forEach(doc => {
        console.log(`${doc.id} => ${doc.data()}`);

        let obj = doc.data();
        obj.id = doc.id;

        if (doc.data().status === "Back-Log") {
          this.backlog.push(obj);
        } else if (doc.data().status === "To-Do") {
          this.todo.push(obj);
        } else if (doc.data().status === "On-Process") {
          this.process.push(obj);
        } else if (doc.data().status === "Done") {
          this.done.push(obj);
        }
      });
    });
  }
};
</script>
