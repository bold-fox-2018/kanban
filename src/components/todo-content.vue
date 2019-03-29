<template>
    <div>
        <!-- <p style="color: black;">{{todos}}</templpate> -->
        <div class="card mb-1" v-for="td in todos" :key="td.id">
            <!-- {{td}} -->
            <div class="card-body" data-toggle="modal" :data-target="`#editTodo${td.id}`">
                <!-- {{td.status}} -->
                <p class="content-font">{{td.todo}}</p>
                <p class="content-font">Point: {{td.point}}</p>
                <p class="content-font">Assigned To: {{td.assigned_to}}</p>
            </div>
            <div>
                <button id="modal-button" type="button" class="btn btn-primary another-button" v-if="td.status !== 0" @click="previousState(td.id, td.status)">{{ td.previous }}</button>
            </div>
            <div>
                <button id="modal-button" type="button" class="btn btn-primary delete-button" @click="remove(td.id)">Delete</button>
            </div>
            <div>
                <button id="modal-button" type="button" class="btn btn-primary another-button" v-if="td.status !== 3" @click="nextState(td.id, td.status)">{{ td.next }}</button>
            </div>
        </div>
    </div>
</template>

<script>
import db from '@/Firebase/config.js'
export default {
  props: ['todos'],
  created () {

  },
  data () {
    return {
      todo: '',
      description: '',
      status: 0,
      previous: '',
      next: '',
      point: null,
      assigned_to: '',
      modalHide: true,
      modalShow: false
    }
  },
  methods: {
    remove (id) {
      db.collection('todos')
        .doc(id)
        .delete()
        .then(function () {
          //
        })
        .catch(function (error) {
          console.error('Error removing document: ', error)
        })
    },
    previousState (id, state) {
      if (state === 0) {

      } else {
        let newStatus = state - 1
        db.collection('todos')
          .doc(id)
          .update({
            status: newStatus
          })
          .then(function () {
            //
          })
          .catch(function (error) {
            // The document probably doesn't exist.
            console.error('Error updating document: ', error)
          })
      }
    },
    nextState (id, state) {
      if (this.status === 3) {

      } else {
        let newStatus = state + 1
        db.collection('todos')
          .doc(id)
          .update({
            status: newStatus
          })
          .then(function () {
            // console.log("Document successfully updated!");
          })
          .catch(function (error) {
            console.error('Error updating document: ', error)
          })
      }
    }
  }
}
</script>

<style>
    .delete-button {
        background-color: #c60d26 !important;
        color: white;
    }
    .another-button {
        background-color: #749de0 !important;
        color: white;
    }
    .content-font {
        color: #000;
        font-weight: 300;
    }
</style>
