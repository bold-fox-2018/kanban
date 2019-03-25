<template>
  <div class="window">
    <div class="board">
      <div class="title backlog">Back-Log</div>
      <Card v-for="task in backLog_Task" :key="task.id" :task="task" @detail-task="setTask"/>
    </div>
    <div class="board">
      <div class="title todo">To-do</div>
      <Card v-for="task in todo_Tasks" :key="task.id" :task="task" @detail-task="setTask"/>
    </div>
    <div class="board">
      <div class="title doing">Doing</div>
      <Card v-for="task in doing_Tasks" :key="task.id" :task="task" @detail-task="setTask"/>
    </div>
    <div class="board">
      <div class="title done">Done</div>
      <Card v-for="task in done_Tasks" :key="task.id" :task="task" @detail-task="setTask"/>
    </div>

    <!-- MODAL DETAIL -->
    <div
      class="modal fade"
      id="detailTask"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{task.title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <span>
              <span class="title-body">Description:</span>
              {{task.description}}
            </span>
            <span>
              <span class="title-body">Point:</span>
              {{task.point}}
            </span>
            <span>
              <span class="title-body">Status:</span>
              {{task.status}}
            </span>
          </div>
          <div class="modal-footer action">
             <button
              v-if="task.status=='To Do'"
              @click.prevent="setStatus(task.id,'Back Log')"
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >Back Log</button>
            <button
              v-if="task.status=='Back Log' || task.status=='Doing' "
              @click.prevent="setStatus(task.id,'To Do')"
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >To Do</button>
            <button
              v-if="task.status=='To Do' || task.status=='Done' "
              @click.prevent="setStatus(task.id,'Doing')"
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >Doing</button>
            <button
              @click.prevent="deleteTask(task.id)"
              type="button"
              class="btn btn-danger"
              data-dismiss="modal"
            >Delete</button>
            <button
              v-if="task.status=='Doing'"
              @click.prevent="setStatus(task.id,'Done')"
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >Done</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';

export default {
  name: 'Board',
  components: { Card },
  data() {
    return {
      task: {},
      tasks: [],
      backLog_Task: [],
      todo_Tasks: [],
      doing_Tasks: [],
      done_Tasks: [],
    };
  },
  methods: {
    setTask(payload) {
      this.task = payload;
    },
    deleteTask(id) {
      this.$db
        .collection('tasks')
        .doc(id)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!');
        })
        .catch((error) => {
          console.error('Error removing document: ', error);
        });
    },
    setStatus(id, status) {
      this.$db
        .collection('tasks')
        .doc(id)
        .update({
          status,
        })
        .then(() => {
          console.log('Document successfully updated!');
        })
        .catch((error) => {
          console.error('Error updating document: ', error);
        });
    },
  },
  computed: {},
  created() {
    this.$db
      .collection('tasks')
      .orderBy('createdAt')
      .onSnapshot((querySnapshot) => {
        this.backLog_Task = [];
        this.todo_Tasks = [];
        this.doing_Tasks = [];
        this.done_Tasks = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;

          if (data.status === 'Back Log') this.backLog_Task.push(data);
          else if (data.status === 'To Do') this.todo_Tasks.push(data);
          else if (data.status === 'Doing') this.doing_Tasks.push(data);
          else this.done_Tasks.push(data);
        });
      });
  },
};
</script>

<style>
body {
  background-color: #ffffff;
}
.window {
  text-align: center;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0px 30px;
  padding-top: 100px;
}
.board {
  display: inline-block;
  border: solid 1px #c7ecee;
  min-width: 310px;
  min-height: 100px;
  text-align: center;
  margin-bottom: 20px;
}

.board .title {
  padding: 10px 20px;
  color: white;
  font-weight: bold;
  margin-bottom: 10px;
}
#detailTask .modal-body span {
  /* background-color: red; */
  display: block;
  margin-bottom: 10px;
}
#detailTask span > .title-body {
  background-color: white;
  display: block;
  font-weight: bold;
  margin-bottom: 2px;
}

.backlog {
  background-color: #ff0000;
}
.todo {
  background-color: #ff9800;
}
.doing {
  background-color: #4d7fff;
}
.done {
  background-color: #00de61;
}

.action {
  display: flex;
}
</style>
