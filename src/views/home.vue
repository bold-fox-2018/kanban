<template>
  <div>
    <!-- Image and text -->
    <b-navbar variant="faded" type="light">
      <img
        src="http://clipart-library.com/images/qcBorropi.png"
        alt="omah"
        width="50px"
      />
      <b-navbar-brand href="#">
        <h1>KanFan Board</h1>
      </b-navbar-brand>
      <div>
        <b-button v-b-modal.create variant="primary">add task</b-button>
        <b-modal id="create" size="lg" title="add Task" hide-footer>
          <formadd />
        </b-modal>
      </div>
    </b-navbar>
        <kanbancard
          v-for="(data, index) in taskLists"
          :key="index"
          :content="data"
        />
  </div>
</template>
<script>
import kanbancard from "../components/kanbancard.vue";
import database from "../assets/config";
import formadd from "../components/formadd";

export default {
  name: "home",
  data() {
    return {
      taskLists: [
        {
          status: "back-log",
          list: []
        },
        {
          status: "to-do",
          list: []
        },
        {
          status: "doing",
          list: []
        },
        {
          status: "done",
          list: []
        }
      ]
    };
  },
  components: {
    kanbancard,
    formadd
  },
  mounted() {
    database
      .collection("kamidisini")
      // .doc("kanban")
      .onSnapshot(snapshot => {
        // console.log(snapshot.data)
        this.taskLists[0].task = [];
        this.taskLists[1].task = [];
        this.taskLists[2].task = [];
        this.taskLists[3].task = [];
        snapshot.docs.forEach(childSnapshot => {
          //   console.log(childSnapshot.data,"======")
          if (childSnapshot.data.status === "back-log") {
            const obj = childSnapshot.data;
            obj.id = childSnapshot.key;
            this.taskLists[0].task.push(obj);
          } else if (childSnapshot.data.status === "to-do") {
            const obj = childSnapshot.data;
            obj.id = childSnapshot.key;
            this.taskLists[1].task.push(obj);
          } else if (childSnapshot.data.status === "doing") {
            const obj = childSnapshot.data;
            obj.id = childSnapshot.key;
            this.taskLists[2].task.push(obj);
          } else {
            const obj = childSnapshot.data;
            obj.id = childSnapshot.key;
            this.taskLists[3].task.push(obj);
          }
        });
      });
  }
};
</script>
