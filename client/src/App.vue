<template>
  <div>
    <button type="submit" class="btn btn-primary" @click="hideData()">ADD TODO</button>
    <button type="submit" class="btn btn-primary" @click="showData()">Home</button>
    <div>
      <formTodo @to-backhome="backhome" v-if="formAdd==true"></formTodo>
    </div>
    <div v-if="formAdd==false">
      <div class="box">
        <div class="container">
          <div class="row">
            <!--  -->
            <div class="judul col-lg-3">
              <h1>backLog</h1>
              <div v-for=" item in dataA" v-bind:key="item._id">
                <card @to-reload="loadData" v-bind:satuan="item"/>
              </div>
              <hr>
              <hr>
            </div>

            <div class="judul col-lg-3">
              <h1>TODO</h1>
              <div v-for=" item in dataB" v-bind:key="item._id">
                <card @to-reload="loadData" v-bind:satuan="item"/>
                <!-- {{satuan}} -->
              </div>
              <hr>
              <hr>
            </div>
            <div class="judul col-lg-3">
              <h1>Doing</h1>
              <div v-for=" item in dataC" v-bind:key="item._id">
                <card @to-reload="loadData" v-bind:satuan="item"/>
              </div>
              <hr>
              <hr>
            </div>
            <div class="judul col-lg-3">
              <h1>Done</h1>
              <div v-for=" item in dataD" v-bind:key="item._id">
                <card @to-reload="loadData" v-bind:satuan="item"/>
              </div>
              <hr>
              <hr>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "@/views/card.vue";
import form from "@/views/form.vue";
import db from "@/api/firebase.js";
export default {
  name: "home",
  components: {
    card: Card,
    formTodo: form
  },
  data() {
    return {
      data: null,
      formAdd: false,
      dataA: [],
      dataB: [],
      dataC: [],
      dataD: []
    };
  },
  methods: {
    backhome() {
      console.log("kokokokkokokkokok");

      this.hideData();
      this.loadData();
    },
    showData() {
      this.formAdd = false;
    },
    hideData() {
      this.formAdd = true;
    },
    loadData() {
      var arr = [];
      db.collection("Todo")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            console.log(`${doc.id} => ${doc.data()}`);
            // this.dataTodo.push(doc.data());
            let temp = doc.data();
            var obj = { id: doc.id };
            obj = Object.assign(obj, temp);
            // console.log(obj);

            arr.push(obj);
          });
          this.data = arr;

          this.convert(this.data);
        });
    },
    convert() {
      this.dataA = [];
      this.dataB = [];
      this.dataC = [];
      this.dataD = [];
      var data = this.data;
      // console.log("==========");

      for (var i = 0; i < data.length; i++) {
        if (data[i].status == "backlog") {
          this.dataA.push(data[i]);
        } else if (data[i].status == "todo") {
          this.dataB.push(data[i]);
        } else if (data[i].status == "doing") {
          this.dataC.push(data[i]);
        } else if (data[i].status == "done") {
          this.dataD.push(data[i]);
        }
      }
      console.log(this.dataA);
    }
  },
  mounted() {
    this.loadData();
    this.convert();
  }
};
</script>


 
