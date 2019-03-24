<template>
  <div class="card-content m-4">
    <div class="kanban">
      <p class="card-text p-3 title">{{ taskContent.name }}</p>
    </div>
    <div class="e-btn">
      <button type="button" class="btn btn-sm btn-danger" @click.prevent="deleteTask">Delete</button>
      <button
        v-if="prev"
        @click.prevent="goPrev"
        type="button"
        class="btn btn-sm btn-primary"
      >{{ prev }}</button>
      <button
        v-if="next"
        type="button"
        @click.prevent="goNext"
        class="btn btn-sm btn-primary"
      >{{ next }}</button>
    </div>
  </div>
</template>

<script>
import db from '@/api/firebase';

export default {
  name: 'card-content',
  props: ['taskContent'],
  data() {
    return {
      next: '',
      prev: '',
    }
  },
  created() {
    if (this.taskContent.status == 'Pre-Log') {
      this.prev = null;
      this.next = 'To-Do';
    } else if (this.taskContent.status == 'To-Do') {
      this.prev = 'Pre-Log';
      this.next = 'On-Going';
    } else if (this.taskContent.status == 'On-Going') {
      this.prev = 'To-Do';
      this.next = 'Finished';
    } else if (this.taskContent.status == 'Finished') {
      this.prev = 'On-Going';
      this.next = null;
    };
  },
  methods: {
    deleteTask() {
      db.collection('tasks')
        .doc(this.taskContent.id)
        .delete();
    },
    goNext() {
      // console.log(this.taskContent);
      db.collection('tasks')
        .doc(this.taskContent.id)
        .set({
          name: this.taskContent.name,
          assign: this.taskContent.assign,
          point: this.taskContent.point,
          status: this.next,
        });
    },
    goPrev() {
        db.collection('tasks')
        .doc(this.taskContent.id)
        .set({
          name: this.taskContent.name,
          assign: this.taskContent.assign,
          point: this.taskContent.point,
          status: this.prev,
        });
    }
  }
};
</script>

<style scoped>

.title {
  font-family: 'Italiana', serif;
  font-weight: bolder;
}

.card-content {
  background-color: #f2f2f2;
  padding: 10px;
  border-radius: 8px;
}
.e-btn {
  display: flex;
  justify-content: space-around;
}
</style>
