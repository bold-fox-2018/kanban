<template>
  <div id="home">
    <CardTemplate :tasks="data"/>
  </div>
</template>

<script>
import db from '@/api/firebase';
import CardTemplate from '@/components/CardTemplate.vue';

export default {
  name: 'home',
  components: {
    CardTemplate,
  },
  data() {
    return {
      data: []
    };
  },
  created() {
    db.collection('tasks').onSnapshot(querySnapshot => {
      const tmpData = [
      {
        name: 'Pre-Log',
        tasks: []
      },
      {
        name: 'To-Do',
        tasks: []
      },
      {
        name: 'On-Going',
        tasks: []
      },
      {
        name: 'Finished',
        tasks: []
      }
    ];
      querySnapshot.forEach(doc => {
        
        if (doc.data().status == 'Pre-Log') {
          tmpData[0].tasks.push({ id: doc.id, ...doc.data() });
        } else if (doc.data().status == 'To-Do') {
          tmpData[1].tasks.push({ id: doc.id, ...doc.data() });
        } else if (doc.data().status == 'On-Going') {
          tmpData[2].tasks.push({ id: doc.id, ...doc.data() });
        } else if (doc.data().status == 'Finished') {
          tmpData[3].tasks.push({ id: doc.id, ...doc.data() });
        }
      });
      this.data = tmpData;
    });
  },
};
</script>

<style scoped>
</style>
