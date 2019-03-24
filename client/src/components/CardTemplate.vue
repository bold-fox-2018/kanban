<template>
  <div class="d-flex justify-content-around flex-wrap">
    <div v-for="(data, index) in tasks" :key="index">
      <div class="card m-3" style="width: 18rem;">
        <div class="card-body" :style="{'background-color':changeColor(data.name)}">
          <h5 class="card-title title">{{ data.name }}</h5>
          <CardContent v-for="(task, index) in data.tasks" :key="index" :task-content="task" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardContent from '@/components/CardContent.vue';

export default {
  name: 'card-template',
  components: {
    CardContent,
  },
  props: ['tasks'],
  methods: {
    changeColor(type) {
      if (type == 'Pre-Log') {
        return '#CC0000';
      } else if (type == 'To-Do') {
        return '#FFDF00';
      } else if (type == 'On-Going') {
        return '#006994';
      } else if (type == 'Finished') {
        return '#32CD32';
      }
    },
  },
};
</script>

<style scoped>
  .title {
    color: aliceblue;
    font-weight: bolder;
    font-family: 'Italiana', serif;
  }
</style>