<template>
  <div class="container center">
    <navbar></navbar>
    <div class="row">
      <div class="col s3" v-for="(task, index) in tasks" :key="(index)">
        <div class="card hoverable">
          <div class="card-panel" :style="'background-color:' +task.color">{{ task.title }}</div>

          <div v-if="task.title === 'Back-Log'">
            <div class="card-content" v-for="item in backLog" :key="item.id">
              <div class="card hoverable">
                <todo :item="item"></todo>
              </div>
            </div>
          </div>
          <div v-else-if="task.title === 'Todo'">
            <div class="card-content" v-for="item in todo" :key="item.id">
              <div class="card hoverable">
                <todo :item="item"></todo>
              </div>
            </div>
          </div>
          <div v-else-if="task.title === 'Doing'">
            <div class="card-content" v-for="item in doing" :key="item.id">
              <div class="card hoverable">
                <todo :item="item"></todo>
              </div>
            </div>
          </div>
          <div v-else-if="task.title === 'Done'">
            <div class="card-content" v-for="item in done" :key="item.id">
              <div class="card hoverable">
                <todo :item="item"></todo>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <task></task> -->
  </div>
</template>

<script>
import Db from "@/api/firebase.js";
import Todo from "@/components/todo.vue";

export default {
  name: "app",
  components: {
    todo: Todo,
  },
  data() {
    return {
      backLog: [],
      todo: [],
      doing: [],
      done: [],
      tasks: [
        {
          title: "Back-Log",
          color: "red"
        },
        {
          title: "Todo",
          color: "orange"
        },
        {
          title: "Doing",
          color: "blue"
        },
        {
          title: "Done",
          color: "LimeGreen"
        }
      ]
    };
  },
  mounted() {
    Db.collection("Todo")
      .orderBy("createdAt")
      .onSnapshot(querySnapshot => {
        (this.backLog = []),
          (this.todo = []),
          (this.doing = []),
          (this.done = []),
          querySnapshot.forEach(doc => {
            console.log(doc.data().status, "ini statusnyaaaaa");
            // ==============Back-Log==================
            if (doc.data().status === "Back-Log") {
              let obj = {
                id: doc.id,
                name: doc.data().name,
                description: doc.data().description,
                assignTo: doc.data().assignTo,
                points: doc.data().points,
                status: doc.data().status
              };
              doc.data().id = doc.id;
              this.backLog.push(obj);
            }
            // =================Todo======================
            else if (doc.data().status === "Todo") {
              let obj = {
                id: doc.id,
                name: doc.data().name,
                description: doc.data().description,
                assignTo: doc.data().assignTo,
                points: doc.data().points,
                status: doc.data().status
              };
              doc.data().id = doc.id;
              this.todo.push(obj);
            }

            // =================Doing======================
            else if (doc.data().status === "Doing") {
              let obj = {
                id: doc.id,
                name: doc.data().name,
                description: doc.data().description,
                assignTo: doc.data().assignTo,
                points: doc.data().points,
                status: doc.data().status
              };
              doc.data().id = doc.id;
              this.doing.push(obj);
            }

            // =================Done======================
            else {
              let obj = {
                id: doc.id,
                name: doc.data().name,
                description: doc.data().description,
                assignTo: doc.data().assignTo,
                points: doc.data().points,
                status: doc.data().status
              };
              doc.data().id = doc.id;
              this.done.push(obj);
            }
          });
      });
  }
};
</script>

<style scoped>
.card-panel {
  font-size: 1.5rem;
  color: white;
  font-family: "Roboto", sans-serif;
}

h1 {
  font-family: "Major Mono Display", monospace;
  font-weight: 100;
}
</style>
