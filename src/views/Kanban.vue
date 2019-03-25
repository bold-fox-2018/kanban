<template>
  <div class="dashboard">
    <div class="container">
      <div class="row">
        <div
          v-for="(status, index) in statusList"
          :key="index"
          class="col-sm-12 col-lg-3 text-left"
        >
          <div class="card">
            <h5 :class="status.header" class="card-header text-white">{{status.title}}</h5>

            <div v-if="status.status === 'backlog'" class="card-body">
              <div v-for="(task, index) in backlogTask" :key="index" class="card mb-2">
                <h5 class="card-header bg-light">{{ task.title }}</h5>
                <div class="card-body">
                  <p>Point : {{ task.point }}</p>
                  <p>Assign to : {{ task.assign }}</p>
                  <button
                    v-on:click="getDetail(task.id)"
                    type="button"
                    class="btn btn-primary my-2 my-sm-0"
                    data-toggle="modal"
                    data-target="#detail-task"
                  >Show Detail</button>
                </div>
              </div>
            </div>

            <div v-if="status.status === 'todo'" class="card-body">
              <div v-for="(task, index) in todoTask" :key="index" class="card">
                <h5 class="card-header bg-light">{{ task.title }}</h5>
                <div class="card-body">
                  <p>Point : {{ task.point }}</p>
                  <p>Assign to : {{ task.assign }}</p>
                  <button
                    v-on:click="getDetail(task.id)"
                    type="button"
                    class="btn btn-primary my-2 my-sm-0"
                    data-toggle="modal"
                    data-target="#detail-task"
                  >Show Detail</button>
                </div>
              </div>
            </div>

            <div v-if="status.status === 'doing'" class="card-body">
              <div v-for="(task, index) in doingTask" :key="index" class="card">
                <h5 class="card-header bg-light">{{ task.title }}</h5>
                <div class="card-body">
                  <p>Point : {{ task.point }}</p>
                  <p>Assign to : {{ task.assign }}</p>
                  <button
                    v-on:click="getDetail(task.id)"
                    type="button"
                    class="btn btn-primary my-2 my-sm-0"
                    data-toggle="modal"
                    data-target="#detail-task"
                  >Show Detail</button>
                </div>
              </div>
            </div>

            <div v-if="status.status === 'done'" class="card-body">
              <div v-for="(task, index) in doneTask" :key="index" class="card">
                <h5 class="card-header bg-light">{{ task.title }}</h5>
                <div class="card-body">
                  <p>Point : {{ task.point }}</p>
                  <p>Assign to : {{ task.assign }}</p>
                  <button
                    v-on:click="getDetail(task.id)"
                    type="button"
                    class="btn btn-primary my-2 my-sm-0"
                    data-toggle="modal"
                    data-target="#detail-task"
                  >Show Detail</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="detail-task"
      tabindex="-1"
      role="dialog"
      aria-labelledby="add-task-label"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content text-left">
          <div class="modal-header bg-light">
            <h5 class="modal-title" id="add-task-label">
              <b>Detail Task :</b>
              {{ task.title }}
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>
              <b>Task Description :</b>
            </p>
            <p>{{ task.description }}</p>
            <p>
              <b>Point :</b>
            </p>
            <p>{{ task.point }}</p>
            <p>
              <b>Status :</b>
            </p>
            <p>{{ task.status }}</p>
          </div>
          <div class="modal-footer d-flex justify-content-between">
            <div v-if="task.status === 'backlog'"></div>

            <button
              v-if="task.status === 'todo'"
              v-on:click="changeStatus('prev')"
              type="button"
              class="btn btn-warning"
            >Backlog</button>
            
            <button
              v-if="task.status === 'doing'"
              v-on:click="changeStatus('prev')"
              type="button"
              class="btn btn-warning"
            >Todo</button>
            <button
              v-if="task.status === 'done'"
              v-on:click="changeStatus('prev')"
              type="button"
              class="btn btn-warning"
            >Doing</button>
            
            <button v-on:click="deleteTask" type="button" class="btn btn-danger">Delete</button>

            <div v-if="task.status === 'done'"></div>
            <button
              v-if="task.status === 'backlog'"
              v-on:click="changeStatus('next')"
              type="button"
              class="btn btn-success"
            >Todo</button>
            <button
              v-if="task.status === 'todo'"
              v-on:click="changeStatus('next')"
              type="button"
              class="btn btn-success"
            >Doing</button>
            <button
              v-if="task.status === 'doing'"
              v-on:click="changeStatus('next')"
              type="button"
              class="btn btn-success"
            >Done</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DetailTaskModal from "@/components/DetailTaskModal.vue";
export default {
  name: "Kanban",
  components: {
    DetailTaskModal
  },
  data() {
    return {
      statusList: [
        { status: "backlog", title: "Backlog", header: "bg-danger" },
        { status: "todo", title: "Todo", header: "bg-warning" },
        { status: "doing", title: "Doing", header: "bg-info" },
        { status: "done", title: "Done", header: "bg-success" }
      ],
      tasks: [],
      task: {}
    };
  },
  computed: {
    backlogTask() {
      return this.tasks.filter(task => task.status === "backlog");
    },
    todoTask() {
      return this.tasks.filter(task => task.status === "todo");
    },
    doingTask() {
      return this.tasks.filter(task => task.status === "doing");
    },
    doneTask() {
      return this.tasks.filter(task => task.status === "done");
    },
    getNextPrev(status, move) {
      return this.statusList[
        this.statusList.findIndex(i => i.status === status) +
          (move === "next" ? 1 : -1)
      ].status;
    }
  },
  created() {
    this.$db
      .collection("tasks")
      .orderBy("createdAt")
      .onSnapshot(data => {
        this.tasks = [];

        data.forEach(task => {
          this.tasks.push({
            id: task.id,
            ...task.data()
          });
        });
      });
  },
  methods: {
    getDetail(id) {
      let temp = this.tasks.filter(task => task.id === id);
      this.task = temp[0];

      this.modalShown = !this.modalShown;
    },
    clearDetail() {
      task: {
      }
    },
    deleteTask() {
      this.$db
        .collection("tasks")
        .doc(this.task.id)
        .delete()
        .then(() => {
          this.clearDetail();
          $("#detail-task").modal("toggle");
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeStatus(move) {
      let index =
        this.statusList.findIndex(i => i.status === this.task.status) +
        (move === "next" ? 1 : -1);

      this.$db
        .collection("tasks")
        .doc(this.task.id)
        .update({
          status: this.statusList[index].status
        })
        .then(() => {
          this.clearDetail();
          $("#detail-task").modal("toggle");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
