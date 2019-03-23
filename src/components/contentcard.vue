<template>
  <div class="cardContent">
    <h1>{{ eachtask.Title }}</h1>
    <div>
      <b-button v-b-modal.detail variant="secondary">
        show detail
      </b-button>
      <b-modal id="detail" size="lg" title="Task detail" hide-footer>
        <div>
          <b-card title="eachtask.Title" sub-title="Card subtitle">
            <b-card-text>
              {{ eachtask.Assigned }}
            </b-card-text>
            <h3>Description</h3>
            <b-card-text> {{ eachtask.Description }} </b-card-text>
            <h3>point</h3>
            <b-card-text> {{ eachtask.Point }} </b-card-text>
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
      </b-modal>
    </div>
  </div>
</template>

<script>
import database from "@/assets/config";

export default {
  name: "contentcard",
  props: ["eachtask"],
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
