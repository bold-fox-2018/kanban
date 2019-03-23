<template>
  <div class="main-header">
    <input type="text" placeholder="Input name Here" v-model="Assigned" />
    <input type="text" placeholder="Input title Here" v-model="Title" />
    <input
      type="text"
      placeholder="Input description Here"
      v-model="Description"
    />
    <input type="text" placeholder="Input point Here" v-model="Point" />
    <input type="submit" @click="sendItem" value="Add Task" />
  </div>
</template>

<script>
import database from "@/assets/config";

export default {
  name: "formadd",
  data() {
    return {
      Assigned: "",
      Title: "",
      Description: "",
      Point: null
    };
  },
  methods: {
    sendItem() {
      const obj = {
        Assigned: this.Assigned,
        Description: this.Description,
        Point: Number(this.point),
        Title: this.Title,
        Status: "back-log"
      };
      database
        .collection("kamidisini")
        .set(obj)
        .then(data => {
          console.log(obj);
          this.Assigned = "";
          this.Title = "";
          this.Description = "";
          this.point = null;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
html,
body {
  font-family: "Lato";
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
h3 {
  padding: 0;
  margin: 0;
}
.main-header h1 {
  color: #f646b3;
  margin-left: auto;
  margin-left: auto;
  text-align: center;
  border-top: #f646b3 3px solid;
  padding-top: 1.5%;
  font-size: 35px;
}
.main-header i {
  font-size: 20px;
  color: #f646b3;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  display: block;
  margin-top: 50px;
  cursor: pointer;
}
.main-header input {
  display: block;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
input {
  height: 30px;
  width: 300px;
  margin-bottom: 20px;
  margin-top: 20px;
  border-radius: 5px;
}
</style>
