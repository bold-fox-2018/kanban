<template>
  <div class="hello">
    <div class="container">
      <div class="row">
        <div class="col-3" v-for="(tasks,index) in category" :key="index">
          <div class="card" style="width: 100%">
            <div class="card-header" :style="tasks.borderColor">{{tasks.name}}</div>
            <draggable
              :list="tasks.tasks"
              :options="{group:'taksOption'}"
              :move="checkMove"
              @end="endMove"
              style="padding:10px;"

            >
              <div
                :class="tasks.name"
                v-for="task in tasks.tasks"
                :key="task.id"
                style="border:1px solid"
              >
                <div class="card-header" :style="tasks.borderColor">{{task.task}}</div>
                <p class="card-text">{{task.description}}</p>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-toggle="modal"
                  data-target="#exampleModalLong"
                  @click="updateTask(task)"
                >show details</button>
              </div>
            </draggable>
          </div>
        </div>
      </div>

      <update :selected-task="selectedTask"/>
    </div>
  </div>
</template>

<script>
import db from "@/api/firestore";
import update from "@/components/updateModal.vue";
import draggable from "vuedraggable";
export default {
  name: "mainPage",
  components: {
    update,
    draggable
  },
  data() {
    return {
      selectedTask: {},
      taskId: "",
      status: "",
    };
  },
  props: ["category"],
  methods: {
    updateTask(input) {
      this.$emit("selected-task", input);
      this.selectedTask = input;
    },
    checkMove(e) {
      this.taskId = e.draggedContext.element.id;
    },
    endMove(e) {
      this.status = e.to.firstChild.className;
      db.collection("kanban")
        .doc(`${this.taskId}`)
        .update({
          status: this.status
        });
    }
  }
};
</script>
