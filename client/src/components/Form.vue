<template>
  <div>
    <div class="container register-form">
      <h1>REGISTER</h1>
      <div class="form">
        <div class="form-content">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <input
                  type="text"
                  v-model="title"
                  class="form-control"
                  placeholder="Your Title"
                  value
                >
              </div>
              <div class="form-group">
                <input
                  type="text"
                  v-model="description"
                  class="form-control"
                  placeholder="Your descriptrion *"
                  value
                >
              </div>
              <div class="form-group">
                <input
                  type="text"
                  v-model="point"
                  class="form-control"
                  placeholder="Your point *"
                  value
                >
              </div>
              <div class="form-group">
                <input
                  type="text"
                  v-model="assigned"
                  class="form-control"
                  placeholder="Your assinged Ton *"
                  value
                >
              </div>
            </div>
          </div>
          <button>
            <a v-on:click="tambah()">register</a>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import db from "@/api/firebase.js";
import form from "@/components/Form.vue";
export default {
  name: "formTodo",
  data() {
    return {
      data: "",
      title: "",
      description: "",
      point: "",
      assigned: ""
    };
  },

  methods: {
    tambah() {
      db.collection("Todo")
        .add({
          title: this.title,
          description: this.description,
          point: this.point,
          assigned: this.assigned,
          status: "backlog"
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    }
  }
};
</script>
