<template>
  <div>
    <b-card title="data.Title" sub-title="Card subtitle">
      <b-card-text>
        {{ data.Assigned }}
      </b-card-text>
      <h3>Description</h3>
      <b-card-text> {{ data.Description }} </b-card-text>
      <h3>point</h3>
      <b-card-text> {{ data.Point }} </b-card-text>
    </b-card>
      <div class="container-button">
        <div>
          <h4 @click="removeItem">delete</h4>
        </div>
        <div>
          <h4 @click="actionOne">{{buttonOne}}</h4>
        </div>
        <div>
          <h4 @click="actionTwo" v-if="buttonTwo">{{buttonTwo}}</h4>
        </div>
      </div>
  </div>
</template>

<script>
import database from "@/assets/config";

export default {
  name: "detailtask",
  props: ["data"],
  data() {
    return {
      buttonOne: "",
      buttonTwo: ""
    };
  },
  methods: {
    actionOne() {
      database.ref(`/${this.item.id}`).remove();
      database.ref("/").push({
        Assigned: this.Assigned,
        Description: this.Description,
        Point: this.point,
        Title: this.Title,
        status: this.buttonOne
      });
    },
    actionTwo() {
      database.ref(`/${this.item.id}`).remove();
      database.ref("/").push({
        Assigned: this.Assigned,
        Description: this.Description,
        Point: this.point,
        Title: this.Title,
        status: this.buttonTwo
      });
    },
    removeItem() {
      database.ref(`/${this.item.id}`).remove();
    }
  },
  created() {
    if (this.name === "Back-Log") {
      this.buttonOne = "To-Do";
      this.buttonTwo = null;
    } else if (this.name === "To-Do") {
      this.buttonOne = "Back-Log";
      this.buttonTwo = "Doing";
    } else if (this.name === "Doing") {
      this.buttonOne = "Done";
      this.buttonTwo = "To-Do";
    } else if (this.name === "Done") {
      this.buttonOne = "On-Going";
      this.buttonTwo = null;
    }
  }
};
</script>
