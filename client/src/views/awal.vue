<template>
  <div>
    <a class="next" @click="tambah()">@ task || list todo</a>
    <formTodo v-if="formAdd==true"></formTodo>
    <div v-if="formAdd==false">
      <div class="box">
        <div class="container">
          <div class="row">
            <!--  -->
            <div class="judul col-lg-3">
              <h1>backLog</h1>
              <div>
                <todo v-bind:satuan="dataA"></todo>
              </div>
              <hr>
              <hr>
            </div>

            <div class="judul col-lg-3">
              <h1>To-Do</h1>
              <hr>
              <card2 v-bind:satuan="dataB"></card2>
              <hr>
            </div>

            <div class="judul col-lg-3">
              <h1>Doing</h1>
              <hr>
              <card2 v-bind:satuan="dataC"></card2>
              <hr>
            </div>

            <div class="judul col-lg-3">
              <h1>Done</h1>
              <hr>
              <done v-bind:satuan="dataD"></done>
              <hr>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.judul {
  border: 2px solid #7575a3;
}
</style>
<script>
import Card from "@/components/Card.vue";
import Card2 from "@/components/Card2.vue";
import Card3 from "@/components/Card3.vue";
import db from "@/api/firebase.js";
import form from "@/components/Form.vue";

export default {
  components: {
    todo: Card,
    card2: Card2,
    done: Card3,
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
    tambah() {
      this.formAdd = !this.formAdd;
    },
    convert(data) {
      this.dataA = [];
      this.dataB = [];
      this.dataC = [];
      this.dataD = [];
      // var data = this.data;
      console.log("==========");
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
    }
  },
  mounted() {
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
  updated() {
    // this.convert(this.data);
  }
};
</script>

