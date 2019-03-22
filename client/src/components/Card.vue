<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-lg-3">
          <div class="card" v-for="item in satuan" v-bind:key="item.id">
            <div class="card" style="width: 250px;">
              <div class="card-body">
                <h3>{{item.title}}</h3>
                <hr>
                <p>POINT :{{item.point}}</p>
                <br>
                <p>Asssigned :{{item.assigned}}</p>
                <br>
                <button>show</button>
                <form class="form-inline my-2 my-lg-0">
                  <button
                    v-on:click="edit(item)"
                    class="btn btn-outline-success"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    type="button"
                  >SHOW DETAIL</button>
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
                        <h5 class="modal-title" id="exampleModalLabel">id: {{ID}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <form>
                          <div class="form-group">
                            <label for="mTitle">Title</label>
                            {{ mTitle}}
                            <br>

                            <label for="mDescription">deskripsi</label>
                            {{ mDescription}}
                            <br>
                            <label for="mPoint">POINT</label>
                            {{ mPoint}}
                            <br>
                            <label for="mStatus">STATUS</label>
                            {{ mStatus}}
                            <br>
                            <div class="modal-footer">
                              <!-- <button
                                type="button"
                                class="btn btn-secondary"
                                data-dismiss="modal"
                              >Close</button>-->

                              <button
                                data-dismiss="modal"
                                class="btn btn-primary"
                                v-on:click="remove()"
                              >delete</button>
                              <button
                                data-dismiss="modal"
                                class="btn btn-primary"
                                v-on:click="update('todo')"
                              >Todo</button>
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
<style scoped>
.card {
  border: 2px solid #e0e0eb;
}
</style>
<script>
import db from "@/api/firebase.js";
export default {
  props: ["satuan"],

  name: "todo",
  data: function() {
    return {
      data: "",
      title: "",
      description: "",
      point: "",
      status: "",
      assigned: " ",
      mTitle: " ",
      mDescription: " ",
      mPoint: " ",
      mStatus: " ",
      mAssigned: "",
      ID: "",
      tombol: []
    };
  },
  methods: {
    edit(item) {
      this.ID = item.id;
      this.mTitle = item.title;
      this.mDescription = item.description;
      this.mPoint = item.point;
      this.mStatus = item.status;
      this.mAssigned = item.assigned;
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
    update(input) {
      db.collection("Todo")
        .doc(this.ID)
        .delete()
        .then(data => {
          return db.collection("Todo").add({
            title: this.mTitle,
            description: this.mDescription,
            point: this.mPoint,
            assigned: this.mAssigned,
            status: input
          });
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    }
  },
  mounted() {
    // this.data = this.satuan;
    console.log("ini astuannya");

    console.log(this.satuan);
  }
};
</script>
