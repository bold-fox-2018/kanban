<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand" href="#">
          <img
            src="https://res-1.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1482132470/vfmmn0twb17nn2epblee.png"
            width="50"
            alt
          >
        </a>
      </nav>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav mr-auto"></ul>
        <form class="form-inline my-2 my-lg-0">
          <button
            @click="dialog === true"
            class="btn btn-outline-success"
            data-toggle="modal"
            data-target="#exampleModal"
            type="button"
          >New Task</button>
        </form>
        <!-- Modal -->
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">New Task</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group">
                    <label for="title">Title</label>
                    <input
                      v-model="title"
                      type="text"
                      class="form-control"
                      id="title"
                      placeholder="Task Title"
                    >

                    <div class="form-group">
                      <label for="description">Description</label>
                      <textarea
                        v-model="description"
                        class="form-control"
                        id="description"
                        rows="3"
                      ></textarea>
                    </div>

                    <label for="point">Point</label>
                    <input
                      v-model="point"
                      type="number"
                      class="form-control"
                      id="point"
                      placeholder="0"
                    >

                    <label for="assign">Assigned To</label>
                    <input
                      v-model="assignedto"
                      type="text"
                      class="form-control"
                      id="assign"
                      placeholder="Assigned To"
                    >
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      
                      <button  data-dismiss="modal"  v-on:click="addTask"  class="btn btn-primary">Save changes</button>
                      
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import db from '@/api/firebase.js'
export default {
  name: "NavBar",
  props: {},
  data() {
    return {
      dialog: false,
      title: "",
      description: "",
      point: "",
      assignedto: ""
    };
  },
  methods: {
      addTask() {
        //   Add Task from Modal
          console.log(this.title, this.description, this.point, this.assignedto)
          db.collection('Tasks')
            .add({
                title: this.title,
                description: this.description,
                point: this.point,
                assignedto: this.assignedto,
                status: 'done'
            })
            .then((docRef)=>{
                this.dialog = false
                this.title = ''
                this.description = ''
                this.point = ''
                this.assignedto = ''
                console.log('Document created with ID:', docRef.id)
            })
            .catch(function(err){
                console.log(err)
            })
      }
  }
};
</script>


