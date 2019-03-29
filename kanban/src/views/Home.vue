<template>
  <div class="home">
    <div>
      <navbar @newdata="newdata"/>
      <mainPage :category="category"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import mainPage from "@/components/mainPage.vue";
import navbar from "@/components/navbar.vue";
import update from "@/components/updateModal.vue";
import db from "@/api/firestore";

export default {
  name: "home",
  data() {
    return {
      length: 4,
      category: [
        {
          name: "back-log",
          borderColor: "max-width: 18rem; background-color: #77c678;",
          tasks : []
        },
        {
          name: "To-Do",
          borderColor: "max-width: 18rem; background-color: #cc9278;",
          tasks : []
        },
        {
          name: "Doing",
          borderColor: "max-width: 18rem; background-color: #9575c6;",
          tasks : []
        },
        {
          name: "Done",
          borderColor: "max-width: 18rem; background-color: #77c678;",
          tasks : []
        }
      ],
      taskToUpdate: {}
    };
  },
  created() {
    db.collection("kanban").onSnapshot(querySnapshot => {
      console.log("onSnapshot");
      const data = [];
      querySnapshot.docs.forEach(doc => {
        data.push({ id: doc.id, ...doc.data() });
      });
       this.category[0].tasks = []
       this.category[1].tasks = []
       this.category[2].tasks = []
       this.category[3].tasks = []
      data.forEach(a => {
        if(a.status == 'back-log') {
          this.category[0].tasks.push(a)
        } else if (a.status == 'To-Do') {
          this.category[1].tasks.push(a)
        } else if (a.status == 'Doing') {
          this.category[2].tasks.push(a)
        } else  if(a.status == 'Done') {
          this.category[3].tasks.push(a)
        }
      })
    });
  },
  components: {
    mainPage,
    navbar,
    update
  },
  methods: {
    newdata(payload) {
      this.allTask = payload;
    },
    selectedTask(payload) {
      this.taskToUpdate = payload;
    }
  },
  computed: {
    allData() {
      // return this.allTask;
    }
  }
};
</script>
