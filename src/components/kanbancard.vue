<template>
  <div class="card">
    <h2>{{ content.status }}</h2>
    <contentcard
      v-for="(data, index) in content"
      :key="index"
      :eachtask="data"
    />
  </div>
</template>
<script>
import contentcard from "./contentcard.vue";

export default {
  name: "kanbancard",
  props: ["content"],
  components: {
    contentcard
  }
};
</script>

<style>
.card {
  font-size: 10px;
  color: #4684f6;
  width: 100%;
  min-height: 400px;
  height: 100%;
  background-color: burlywood;
  -webkit-box-shadow: 0px 5px 4px #c0c0c09d;
  -moz-box-shadow: 0px 5px 4px #c0c0c09d;
  box-shadow: 0px 5px 4px #c0c0c09d;
  border-radius: 5px;
}

.card h2 {
  padding: 20px;
  font-size: 20pt;
  font-family: Arial, Helvetica, sans-serif;
  color: darksalmon;
}
</style>
