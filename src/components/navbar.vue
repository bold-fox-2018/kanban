<template>
  <div class="container">
    <div class="row">
      <div class="col s12">
        <h1>KaNban</h1>
      </div>

      <div class="col s12">
      <hr>
      <br>
        <a
          id="add-todo-button"
          href="#modal1"
          class="btn modal-trigger waves-effect black"
        >add new todo</a>
      </div>
    </div>
    <div id="modal1" class="modal bottom-sheet">
      <div class="modal-content">
        <div id="form" class="container center">
          <div class="row">
            <form class="col s6 offset-s3" @submit.prevent="addTodo()">
              <h4 class>Add new todo</h4>
              <div class="row">
                <div class="input-field col s4 offset-s2">
                  <input id="input" type="text" class="validate" v-model="name">
                  <label for="name">name</label>
                </div>
                <div class="input-field col s4 offset-s1">
                  <input id="input" type="text" class="validate" v-model="description">
                  <label for="description">description</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s4 offset-s2">
                  <input id="input" type="text" class="validate" v-model="assignTo">
                  <label for="assign-to">assign to</label>
                </div>
                <div class="input-field col s4 offset-s1">
                  <input id="input" type="text" class="validate" v-model="points">
                  <label for="points">points</label>
                </div>
              </div>
              <div class="row">
                <a @click="addTodo" type="submit" class="waves-effect waves-light black btn modal-close">
                  <span>add</span>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Db from '@/api/firebase.js';

export default {
  data() {
    return {
      name: '',
      description: '',
      assignTo: '',
      points: '',
    };
  },
  mounted() {},
  methods: {
    addTodo() {
      Db.collection('Todo').add({
        name: this.name,
        description: this.description,
        assignTo: this.assignTo,
        points: this.points,
        status: 'Back-Log',
        createdAt: new Date(),
      });
      this.name = '';
      this.description = '';
      this.assignTo = '';
      this.points = '';
      console.log('added new todo');
    },
  },
};
</script>

<style>
h1 {
  font-family: "Major Mono Display", monospace;
  font-weight: 100;
}

#add-todo-button {
  width: 15rem;
}

#add-todo-button:hover {
  width: 20rem;
}

#input:focus {
    border-bottom: 1px solid #000000;
    box-shadow: 0 1px 0 0 #000000;
}

#input:focus + label {
    color: #000000;
}
</style>
