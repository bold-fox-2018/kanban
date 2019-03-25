<template>
  <div class="baris">
    <div class="card" style="width: 18rem;">
      <div class="card-header">Back-Log</div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item" v-for="item in backlog" v-bind:key="item.id">
          <card v-bind:oneTask="item"></card>
        </li>
      </ul>
    </div>
    <div class="card" style="width: 18rem;">
      <div class="card-header">Todo</div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item" v-for="item in todo" v-bind:key="item.id">
          <card v-bind:oneTask="item"></card>
        </li>
      </ul>
    </div>
    <div class="card" style="width: 18rem;">
      <div class="card-header">Doing</div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item" v-for="item in doing" v-bind:key="item.id">
          <card v-bind:oneTask="item"></card>
        </li>
      </ul>
    </div>
    <div class="card" style="width: 18rem;">
      <div class="card-header">Done</div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item" v-for="item in done" v-bind:key="item.id">
          <card v-bind:oneTask="item"></card>
        </li>
      </ul>
    </div>
  </div>
</template>


<style scoped>
* {
  box-sizing: border-box;
}

html {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-content: center;
  align-items: center;
  height: 100%;
  margin: 0px;
  padding: 0px;
}

body {
  margin: 20px 10px;
  padding-top: 10px;
  flex: 0 1 auto;
  align-self: auto;
  width: 100%;
  max-width: 90%;
  height: 100%;
  max-height: 90%;
}

section {
  background-color: rgba(13, 139, 139, 0.6);
  margin: 20px;
}

h1 {
  color: black;
  text-align: center;
  font-family: URW Chancery L, cursive;
}

.nav {
  border: 3px solid #ccc;
  border-width: 3px 0;
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: center;
}

.nav li {
  display: inline;
}

.nav a {
  color: black;
  display: inline-block;
  padding: 10px;
}

head {
  vertical-align: middle;
  text-align: center;
}

.awal {
  text-align: left;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  padding: 5px 4px;
}

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.awal p {
  text-indent: 50px;
  text-align: justify;
  font-size: 25px;
  text-shadow: 10px 10px 5px grey;
}

.awal video {
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 8px;
  width: 50%;
  height: 50%;
}

.baris {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card {
  max-width: 100%;
  padding: 0 4px;
  vertical-align: middle;
}

.kontak {
  display: inline-block;
  text-align: left;
}

.scroll {
  scroll-behavior: smooth;
  background-color: rgba(13, 139, 139, 0.6);
}

.awal p {
  font-family: "Roboto", sans-serif;
  text-align: center;
  font-size: 2vw;
  background-color: rgba(242, 241, 239, 0.5);
  text-shadow: 10px 10px 5px grey;
}
</style>

<script>
import db from "@/api/firebase.js";
import card from "@/components/Card.vue";
export default {
  name: "allTasks",
  components: {
    card
  },
  data() {
    return {
      backlog: [],
      todo: [],
      doing: [],
      done: []
    };
  },
  mounted() {
    db.collection("todos").onSnapshot(querySnapshot => {
      let result = "";
      let i = 0;
      this.backlog = []
      this.todo = []
      this.doing = []
      this.done = []
      querySnapshot.forEach(doc => {
        // console.log(doc.id);
        if (doc.data().status === "Back-Log") {
          this.backlog.push({id: doc.id, ...doc.data()});
        } else if (doc.data().status === "Todo") {
          this.todo.push({id: doc.id, ...doc.data()});
        } else if (doc.data().status === "Doing") {
          this.doing.push({id: doc.id, ...doc.data()});
        } else {
          this.done.push({id: doc.id, ...doc.data()});
        }
        console.log(this.backlog);
      });
    });
  }
};
</script>
