<template>
  <div>
    <div class="card-content">
      <span align="left" class="card-title">{{ item.name }}</span>
      <div class="divider black"></div>
      <div class="section">
        <p align="left">Description: {{item.description}}</p>
        <p align="left">Assign to: {{item.assignTo}}</p>
        <p align="left">Points: {{item.points}}</p>
      </div>
    </div>
    <div class="card-action">
      <div v-if="item.status==='Back-Log'">
        <a href class="red-text" @click.prevent="deleteItem(item.id)">delete</a>
        <a href="#" class="orange-text" @click.prevent="statusForward(item.id,item.status)">Todo</a>
      </div>
      <div v-else-if="item.status==='Todo'">
        <div class="row">
          <div class="col s4">
            <a
              href="#"
              class="red-text"
              @click.prevent="statusBackward(item.id,item.status)"
            >Back</a>
          </div>
          <div class="col s4">
            <a href="#" class="red-text" @click.prevent="deleteItem(item.id)">delete</a>
          </div>
          <div class="col s4">
            <a href="#" class="blue-text" @click.prevent="statusForward(item.id,item.status)">Doing</a>
          </div>
        </div>
      </div>
      <div v-else-if="item.status==='Doing'">
        <a href="#" class="orange-text" @click.prevent="statusBackward(item.id,item.status)">Todo</a>
        <a href="#" class="red-text" @click.prevent="deleteItem(item.id)">delete</a>
        <a href="#" class="green-text" @click.prevent="statusForward(item.id,item.status)">Done</a>
      </div>
      <div v-else>
        <a href="#" class="blue-text" @click.prevent="statusBackward(item.id,item.status)">Doing</a>
        <a href="#" class="red-text" @click.prevent="deleteItem(item.id)">delete</a>
      </div>
    </div>
  </div>
</template>

<script>
import Db from '@/api/firebase';

export default {
  name: 'todo',
  props: ['item'],
  methods: {
    statusForward(id, status) {
      console.log(id, 'ini id yang perlu di update bosque');
      const updateData = {};
      let needUpdate = false;

      if (status === 'Back-Log') {
        updateData.status = 'Todo';
        needUpdate = true;
      } else if (status === 'Todo') {
        updateData.status = 'Doing';
        needUpdate = true;
      } else if (status === 'Doing') {
        updateData.status = 'Done';
        needUpdate = true;
      }

      if (needUpdate === true) {
        Db.collection('Todo')
          .doc(id)
          .update(updateData)
          .then(() => {
            console.log('update data success');
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    statusBackward(id, status) {
      console.log(id, 'ini id yang perlu di update bosque');
      const updateData = {};
      let needUpdate = false;

      if (status === 'Todo') {
        updateData.status = 'Back-Log';
        needUpdate = true;
      } else if (status === 'Doing') {
        updateData.status = 'Todo';
        needUpdate = true;
      } else {
        updateData.status = 'Doing';
        needUpdate = true;
      }

      if (needUpdate === true) {
        Db.collection('Todo')
          .doc(id)
          .update(updateData)
          .then(() => {
            console.log('update data success');
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    deleteItem(id) {
      console.log(id, 'ini id nya bosssssssss');
      Db.collection('Todo')
        .doc(id)
        .delete()
        .then((deleted) => {
          console.log('delete data success');
        });
    },
  },
};
</script>

<style scoped>
p {
  font-size: 1.2rem;
}
</style>
