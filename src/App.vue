<template>
  <div id="app">
    <div class="container">
      <nav class="mb-1 navbar navbar-expand-lg navbar-white white-color">
        <a class="navbar-brand" href="#">KamVan-KW</a>
        <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent-4"
        aria-controls="navbarSupportedContent-4"
        aria-expanded="false"
        aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent-4">
          <ul class="navbar-nav ml-auto">
            <!-- <li class="nav-item active">
              <a class="nav-link" href="#">
                New Task
                <span class="sr-only">(current)</span>
              </a>
            </li> -->

            <div class="text-center">
              <a
              href=""
              class="btn btn-default btn-rounded my-3"
              data-toggle="modal"
              data-target="#modalLRForm">New Task</a>
            </div>
          </ul>
        </div>
      </nav>

      <div class="row">

        <div class="col col-sm-3">

          <div class="card card-bordered">
            <div class="card-header" style="background-color: red;"><p>Back-Log</p></div>
            <div class="card-body">

              <div class="card" v-for="(backlog,index) in BackLogData" :key="index">

                <div class="card-header">{{ backlog.data.title }}</div>

                <div class="card-body">
                  <h6>Point: {{ backlog.data.point }}</h6>
                  <h6>Assign To: {{ backlog.data.assign }}</h6>
                  <button
                    type="button"
                    class="btn purple-gradient btn-sm"
                    data-toggle="modal"
                    data-target="#basicExampleModal">
                    Show Detail
                  </button>

                  <div
                    class="modal fade"
                    id="basicExampleModal"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5
                            class="modal-title"
                            id="exampleModalLabel">
                            Detail Task: {{ backlog.data.title }} for {{ backlog.data.assign }}
                          </h5>
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <h6>Task Description:</h6>
                          <h5>{{ backlog.data.description }}</h5>
                          <br><br>
                          <h6>Point:</h6>
                          <h5>{{ backlog.data.point }}</h5>
                          <br><br>
                          <h6>Status:</h6>
                          <h5>Back Log</h5>
                          <br>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-outline-danger waves-effect"
                            data-dismiss="modal"
                            @click="deleteData(index, backlog.id)">
                            Delete
                          </button>
                          <button
                            type="button"
                            class="btn btn-outline-success waves-effect"
                            data-dismiss="modal"
                            @click="nextBackLog(index, backlog.id)">
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="col col-sm-3">

          <div class="card card-bordered">
            <div class="card-header" style="background-color: #f90;"><p>To-Do</p></div>
            <div class="card-body">
              <div class="card" v-for="(todo, index) in TodoData" :key="index">
                <div class="card-header">{{ todo.data.title }}</div>
                <div class="card-body">
                  <h6>Point: {{ todo.data.point }}</h6>
                  <h6>Assign To: {{ todo.data.assign }}</h6>
                  <button
                    type="button"
                    class="btn purple-gradient btn-sm"
                    data-toggle="modal"
                    data-target="#basicExampleModal">
                    Show Detail
                  </button>

                  <div
                    class="modal fade"
                    id="basicExampleModal"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5
                            class="modal-title"
                            id="exampleModalLabel">
                            Detail Task: {{ todo.data.title }} for {{ todo.data.assign }}
                          </h5>
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <h6>Task Description:</h6>
                          <h5>{{ todo.data.description }}</h5>
                          <br><br>
                          <h6>Point:</h6>
                          <h5>{{ todo.data.point }}</h5>
                          <br><br>
                          <h6>Status:</h6>
                          <h5>Todo</h5>
                          <br>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-outline-info waves-effect"
                            @click="backTodo(index, todo.id)"
                            data-dismiss="modal">Back</button>
                          <button
                            type="button"
                            class="btn btn-outline-danger waves-effect"
                            data-dismiss="modal"
                            @click="deleteData(index, todo.id)">Delete</button>
                          <button
                            type="button"
                            class="btn btn-outline-success waves-effect"
                            @click="nextTodo(index, todo.id)"
                            data-dismiss="modal">Next</button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="col col-sm-3">

          <div class="card card-bordered">
            <div class="card-header" style="background-color: #39f;"><p>Doing</p></div>
            <div class="card-body">
              <div class="card" v-for="(doing, index) in DoingData" :key="index">
                <div class="card-header">{{ doing.data.title }}</div>
                <div class="card-body">

                  <h6>Point: {{ doing.data.point }}</h6>
                  <h6>Assign To: {{ doing.data.assign }}</h6>
                  <button
                    type="button"
                    class="btn purple-gradient btn-sm"
                    data-toggle="modal"
                    data-target="#basicExampleModal">
                    Show Detail
                  </button>

                  <div
                    class="modal fade"
                    id="basicExampleModal"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5
                            class="modal-title"
                            id="exampleModalLabel">
                            Detail Task: {{ doing.data.title }} for {{ doing.data.assign }}
                          </h5>
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <h6>Task Description:</h6>
                          <h5>{{ doing.data.description }}</h5>
                          <br><br>
                          <h6>Point:</h6>
                          <h5>{{ doing.data.point }}</h5>
                          <br><br>
                          <h6>Status:</h6>
                          <h5>Doing</h5>
                          <br>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-outline-info waves-effect"
                            @click="backDoing(index, doing.id)"
                            data-dismiss="modal">Back</button>
                          <button
                            type="button"
                            class="btn btn-outline-danger waves-effect"
                            data-dismiss="modal"
                            @click="deleteData(index, doing.id)">Delete</button>
                          <button
                            type="button"
                            class="btn btn-outline-success waves-effect"
                            @click="nextDoing(index, doing.id)"
                            data-dismiss="modal">Next</button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="col col-sm-3">

          <div class="card card-bordered">
            <div class="card-header" style="background-color: #0c6;"><p>Done</p></div>
            <div class="card-body">
              <div class="card" v-for="(done, index) in DoneData" :key="index">
                <div class="card-header">{{ done.data.title }}</div>
                <div class="card-body">

                  <h6>Point: {{ done.data.point }}</h6>
                  <h6>Assign To: {{ done.data.assign }}</h6>
                  <button
                    type="button"
                    class="btn purple-gradient btn-sm"
                    data-toggle="modal"
                    data-target="#basicExampleModal">Show Detail</button>

                  <div
                    class="modal fade"
                    id="basicExampleModal"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5
                            class="modal-title"
                            id="exampleModalLabel">
                            Detail Task: {{ done.data.title }} for {{ done.data.assign }}
                          </h5>
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <h6>Task Description:</h6>
                          <h5>{{ done.data.description }}</h5>
                          <br><br>
                          <h6>Point:</h6>
                          <h5>{{ done.data.point }}</h5>
                          <br><br>
                          <h6>Status:</h6>
                          <h5>Done</h5>
                          <br>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-outline-info waves-effect"
                            @click="backDone(index, done.id)"
                            data-dismiss="modal">Back</button>
                          <button
                            type="button"
                            class="btn btn-outline-danger waves-effect"
                            data-dismiss="modal"
                            @click="deleteData(index, done.id)">Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>

      </div>


      <!-- Modal Form -->
      <div
        class="modal fade"
        id="modalLRForm"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true" >
        <div class="modal-dialog cascading-modal" role="document">
          <!--Content-->
          <div class="modal-content">

            <!--Modal cascading tabs-->
            <div class="modal-c-tabs" >

              <!-- Nav tabs -->
              <ul class="nav nav-tabs md-tabs tabs-2 light-blue darken-3" role="tablist">
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    data-toggle="tab"
                    href="#panel7"
                    role="tab">New Task</a>
                </li>
              </ul>

              <!-- Tab panels -->
              <div class="tab-content">
                <!--Panel 7-->
                <div class="tab-pane fade in show active" id="panel7" role="tabpanel">

                  <!--Body-->
                  <form >
                    <div class="modal-body mb-1">
                      <div class="md-form form-sm mb-5">
                        <input
                          type="text"
                          id="modalLRInput10"
                          class="form-control form-control-sm validate"
                          placeholder="Task Title" v-model="title">
                        <label
                          data-error="wrong"
                          data-success="right"
                          for="modalLRInput10"></label>
                      </div>


                      <div class="md-form form-sm mb-4">
                        <input
                          type="text"
                          id="modalLRInput11"
                          class="form-control form-control-sm validate"
                          placeholder="Input Description"
                          v-model="description">
                        <label
                          data-error="wrong"
                          data-success="right"
                          for="modalLRInput11"></label>
                      </div>


                      <div class="md-form form-sm mb-5">
                        <input
                          type="text"
                          id="modalLRInput10"
                          class="form-control form-control-sm validate"
                          placeholder="Point" v-model="point">
                        <label
                          data-error="wrong"
                          data-success="right"
                          for="modalLRInput10"></label>
                      </div>


                      <div class="md-form form-sm mb-5">
                        <input
                          type="text"
                          id="modalLRInput10"
                          class="form-control form-control-sm validate"
                          placeholder="Assigned To" v-model="assign">
                        <label
                          data-error="wrong"
                          data-success="right"
                          for="modalLRInput10"></label>
                      </div>

                    </div>
                    <!--Footer-->
                    <div class="modal-footer">

                      <div class="text-center mt-2">
                        <button
                          type="button"
                          class="btn btn-outline-info waves-effect ml-auto"
                          data-dismiss="modal">Cancel</button>
                      </div>

                      <div class="text-center mt-2">
                        <button
                          type="submit"
                          class="btn btn-info"
                          data-dismiss="modal"
                          @click="submited">Subimt</button>
                      </div>
                    </div>
                  </form>


                  </div>

              </div>

            </div>

          </div>
          <!--/.Content-->
        </div>
      </div>


    </div>
  </div>

</template>


<script>
import firebase from '../api/firebase';

export default {
  data() {
    return {
      BackLogData: [],
      TodoData: [],
      DoingData: [],
      DoneData: [],
      title: '',
      description: '',
      point: '',
      assign: '',
      status: '',
      createdAt: '',
    };
  },
  created() {
    this.createdData();
  },
  methods: {
    submited() {
      firebase
        .collection('Task')
        .add({
          title: this.title,
          description: this.description,
          point: this.point,
          assign: this.assign,
          status: 'back-log',
          createdAt: new Date(),
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createdData() {
      firebase
        .collection('Task')
        .onSnapshot((data) => {
          data.forEach((doc) => {
            if (doc.data().status === 'back-log') {
              this.BackLogData.push({ data: doc.data(), id: doc.id });
            } else if (doc.data().status === 'todo') {
              this.TodoData.push({ data: doc.data(), id: doc.id });
            } else if (doc.data().status === 'doing') {
              this.DoingData.push({ data: doc.data(), id: doc.id });
            } else if (doc.data().status === 'done') {
              this.DoneData.push({ data: doc.data(), id: doc.id });
            }
          });
        });
    },

    nextBackLog(index, id) {
      this.TodoData.push(this.BackLogData[index]);
      this.BackLogData.splice(index, 1);
      firebase
        .collection('Task')
        .doc(id)
        .set({
          title: this.TodoData[this.TodoData.length - 1].data.title,
          status: 'todo',
          description: this.TodoData[this.TodoData.length - 1].data.description,
          point: this.TodoData[this.TodoData.length - 1].data.point,
          assign: this.TodoData[this.TodoData.length - 1].data.assign,
        })
        .then(() => {
          console.log(this.BackLogData[index]);
          // this.createdData()
        })
        .catch((err) => {
          console.log(err);
        });
      // this.BackLogData[index].data.status = 'todo'
    },
    nextTodo(index, id) {
      firebase
        .collection('Task')
        .doc(id)
        .set({
          title: this.TodoData[index].data.title,
          status: 'doing',
          description: this.TodoData[index].data.description,
          point: this.TodoData[index].data.point,
          assign: this.TodoData[index].data.assign,
        })
        .then(() => {
          this.DoingData.push(this.TodoData[index]);
          this.TodoData.splice(index, 1);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    nextDoing(index, id) {
      firebase
        .collection('Task')
        .doc(id)
        .set({
          title: this.DoingData[index].data.title,
          status: 'done',
          description: this.DoingData[index].data.description,
          point: this.DoingData[index].data.point,
          assign: this.DoingData[index].data.assign,
        })
        .then(() => {
          this.DoneData.push(this.DoingData[index]);
          this.DoingData.splice(index, 1);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    backDone(index, id) {
      firebase
        .collection('Task')
        .doc(id)
        .set({
          title: this.DoneData[index].data.title,
          status: 'doing',
          description: this.DoneData[index].data.description,
          point: this.DoneData[index].data.point,
          assign: this.DoneData[index].data.assign,
        })
        .then(() => {
          this.DoingData.push(this.DoneData[index]);
          this.DoneData.splice(index, 1);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    backDoing(index, id) {
      firebase
        .collection('Task')
        .doc(id)
        .set({
          title: this.DoingData[index].data.title,
          status: 'todo',
          description: this.DoingData[index].data.description,
          point: this.DoingData[index].data.point,
          assign: this.DoingData[index].data.assign,
        })
        .then(() => {
          this.TodoData.push(this.DoingData[index]);
          this.DoingData.splice(index, 1);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    backTodo(index, id) {
      firebase
        .collection('Task')
        .doc(id)
        .set({
          title: this.TodoData[index].data.title,
          status: 'back-log',
          description: this.TodoData[index].data.description,
          point: this.TodoData[index].data.point,
          assign: this.TodoData[index].data.assign,
        })
        .then(() => {
          this.BackLogData.push(this.TodoData[index]);
          this.TodoData.splice(index, 1);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    deleteData(index, id) {
      firebase
        .collection('Task')
        .doc(id)
        .delete()
        .then(() => {
          console.log('masuk');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
p{
  color: white;
}
h6{
  color: grey;
  font-size: 14px;
}

h5{
  font-size: 12px;
}
</style>
