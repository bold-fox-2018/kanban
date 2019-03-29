<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-lg-3">
          <div class="card">
            <div class="card" style="width: 250px;">
              <div class="card-body">
                <h3>{{satuan.title}}</h3>
                <hr>

                <p>POINT :{{satuan.point}}</p>
                <br>
                <p>Asssigned :{{satuan.asssigned}}</p>
                <br>
                <form class="form-inline my-2 my-lg-0">
                  <button
                    class="btn btn-outline-success"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    type="button"
                    v-on:click="edit( )"
                  >SHOWw DETAIL</button>
                </form>
                <!-- Modal =======================================================-->
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
                        <h5 class="modal-title" id="exampleModalLabel">id:</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <form>
                          <div class="form-group">
                            <label for="mTitle">Title</label>
                            title
                            <br>

                            <label for="mDescription">deskripsi</label>
                            description
                            <br>
                            <label for="mPoint">POINT</label>
                            point
                            <br>
                            <label for="mStatus">STATUS</label>
                            status
                            <br>
                            <div class="modal-footer">
                              <button
                                data-dismiss="modal"
                                class="btn btn-primary"
                                v-if="deleteButton"
                                v-on:click="remove( )"
                              >delete</button>
                              <button
                                data-dismiss="modal"
                                class="btn btn-primary"
                                v-if="todoButton"
                                v-on:click="forTodo( )"
                              >Todo</button>
                              <button
                                data-dismiss="modal"
                                class="btn btn-primary"
                                v-if="backButton"
                                v-on:click="forback( )"
                              >back log</button>
                              <button
                                data-dismiss="modal"
                                class="btn btn-primary"
                                v-if="doingButton"
                                v-on:click="forDoing( )"
                              >doing</button>
                              <button
                                data-dismiss="modal"
                                class="btn btn-primary"
                                v-on:click="forDone( )"
                                v-if="doneButton"
                              >done</button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- ================================== -->
                <br>
                <hr>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import db from "@/api/firebase.js";
export default {
  name: "kotak",
  props: ["satuan"],
  data() {
    return {
      mTitle: "",
      mPoint: "",
      mstatus: "",
      mDescription: "",
      title: "",
      point: "",
      status: "",
      description: "",
      deleteButton: false,
      todoButton: false,
      backButton: false,
      doingButton: false,
      doneButton: false,
      ID: ""
    };
  },
  methods: {
    edit() {
      this.ID = this.satuan.id;
      this.mTitle = this.satuan.title;
      this.mDescription = this.satuan.description;
      this.mPoint = this.satuan.point;
      this.mStatus = this.satuan.status;
      this.mAssigned = this.satuan.assigned;
    },
    remove() {
      db.collection("Todo")
        .doc(this.ID)
        .delete()
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    forTodo() {
      console.log();
      db.collection("Todo")
        .doc(this.ID)
        .update({
          title: this.mTitle,
          description: this.mDescription,
          point: this.mPoint,
          assigned: this.mAssigned,
          status: "todo"
        })
        .then(function(docRef) {
          console.log(
            "Document written with ID: ",
            docRef.id,
            "======================="
          );
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      this.$emit("to-reload");
    },
    forback() {
      // console.log(this.ID, "xxxxxxxxxxxxxxx");

      db.collection("Todo")
        .doc(this.ID)
        .update({
          title: this.mTitle,
          description: this.mDescription,
          point: this.mPoint,
          assigned: this.mAssigned,
          status: "backlog"
        })
        .then(function(docRef) {
          console.log(
            "Document written with ID: ",
            docRef.id,
            "======================="
          );
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      this.$emit("to-reload");
    },
    forDoing() {
      console.log();
      db.collection("Todo")
        .doc(this.ID)
        .update({
          title: this.mTitle,
          description: this.mDescription,
          point: this.mPoint,
          assigned: this.mAssigned,
          status: "doing"
        })
        .then(function(docRef) {
          console.log(
            "Document written with ID: ",
            docRef.id,
            "======================="
          );
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      this.$emit("to-reload");
    },
    forDone() {
      console.log();
      db.collection("Todo")
        .doc(this.ID)
        .update({
          title: this.mTitle,
          description: this.mDescription,
          point: this.mPoint,
          assigned: this.mAssigned,
          status: "done"
        })
        .then(function(docRef) {
          console.log(
            "Document written with ID: ",
            docRef.id,
            "======================="
          );
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      this.$emit("to-reload");
    },
    cekRole() {
      var posisi = this.satuan.status;
      if (posisi == "backlog") {
        this.deleteButton = true;
        this.todoButton = true;
      }
      if (posisi == "todo") {
        this.backButton = true;
        this.deleteButton = true;
        this.doingButton = true;
      }
      if (posisi == "doing") {
        this.todoButton = true;
        this.deleteButton = true;
        this.doneButton = true;
      }
      if (posisi == "done") {
        this.doingButton = true;
        this.deleteButton = true;
      }
    }
  },
  mounted() {
    this.cekRole();
  }
};
</script>

