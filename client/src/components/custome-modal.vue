<template>
  <div>
    <div class="modal fade" id="my-modal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div v-if="typeModal" class="modal-header">
            <h1>{{ typeModal[0].toUpperCase() + typeModal.slice(1) }} Task</h1>
          </div>
          <div class="modal-body">
            <form @submit="createOrUpdateTask">
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Enter title..." v-model="myForm.title">
              </div>
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Enter decription..." v-model="myForm.description">
              </div>
              <div class="form-group">
                <input type="number" class="form-control" placeholder="Enter points..." v-model="myForm.point">
              </div>
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Assigned to..." v-model="myForm.assigned_to">
              </div>
              <div class="form-group">
                <input type="number" class="form-control" placeholder="Priority..." v-model="myForm.priority">
              </div>
            </form>
          </div>
          <div v-if="typeModal === 'create'">
            <div class="modal-footer">
              <custome-button
                :customeProps="{ FA: 'fa fa-times', bootstrap: 'btn btn-danger' }"
                :customeEvent="'close-modal'"
                @close-modal="clearForm"></custome-button>
              <custome-button
                :customeProps="{ FA: 'fa fa-check', bootstrap: 'btn btn-success' }"
                :customeEvent="'create-task'"
                @create-task="createTask"></custome-button>
            </div>
          </div>
          <div v-else-if="typeModal === 'detail'" class="container">
            <div class="modal-footer">
              <custome-button
                v-show="selectAbleStatus.indexOf(myForm.status) !== 0"
                :customeProps="{ FA: 'fa fa-arrow-left', bootstrap: 'btn btn-primary' }"
                :customeEvent="'update-task'"
                @update-task="updateStatus(-1)">
              </custome-button>
              <custome-button
                :customeProps="{ FA: 'fa fa-trash', bootstrap: 'btn btn-danger' }"
                :customeEvent="'delete-task'"
                @delete-task="deleteTask">
              </custome-button>
              <custome-button
                :customeProps="{ FA: 'fa fa-pencil', bootstrap: 'btn btn-success' }"
                :customeEvent="'update-task'"
                @update-task="updateTask">
              </custome-button>
              <custome-button
                v-show="selectAbleStatus.indexOf(myForm.status) !== selectAbleStatus.length - 1"
                :customeProps="{ FA: 'fa fa-arrow-right', bootstrap: 'btn btn-primary' }"
                :customeEvent="'update-task'"
                @update-task="updateStatus(1)">
              </custome-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomeButton from '@/components/custome-button.vue'
import db from '@/api/firebase'
import Swal from 'sweetalert2'

export default {
  props: ['typeModal', 'detail', 'selectAbleStatus'],
  components: {
    CustomeButton
  },
  watch: {
    detail (value) {
      if (value) {
        this.myForm = {
          title: this.detail.data.title,
          description: this.detail.data.description,
          point: this.detail.data.point,
          status: this.detail.data.status,
          assigned_to: this.detail.data.assigned_to,
          created_at: this.detail.data.created_at,
          priority: this.detail.data.priority
        }
      }
    },
    typeModal (value) {
      if (value === 'create') {
        this.clearForm()
      }
    }
  },
  data () {
    return {
      myForm: {
        title: '',
        description: '',
        point: '',
        status: '',
        assigned_to: '',
        created_at: null,
        priority: ''
      }
    }
  },
  methods: {
    clearForm () {
      this.myForm = {
        title: '',
        description: '',
        point: '',
        status: '',
        assigned_to: '',
        priority: ''
      }
      $('#my-modal').modal('toggle')
      //harus ada untuk nutup modal
    },
    loadForm () {
      this.myForm = {
        title: this.details.title,
        description: this.details.description,
        point: this.details.point,
        status: this.details.status,
        assigned_to: this.details.assigned_to,
        created_at: this.details.created_at,
        priority: this.details.priority
      }
    },

    createOrUpdateTask () {
      if (this.typeModal === 'create') {
        this.createTask()
      } else if (this.typeModal === 'detail') {
        this.updateTask()
      }
    },

    createTask () {
      let newTask = {
        title: this.myForm.title,
        description: this.myForm.description,
        point: this.myForm.point,
        status: this.selectAbleStatus[0],
        assigned_to: this.myForm.assigned_to,
        created_at: new Date(),
        priority: this.myForm.priority
      }
      db
        .collection('activities')
        .add(newTask)
        .then(() => {
          this.SWAL('success', 'add a new task')
          this.clearForm()
        })
        .catch((error) => {
          this.SWAL('error', error)
        })
    },
    updateStatus (number) {
      this.myForm.status = this.selectAbleStatus[this.selectAbleStatus.indexOf(this.myForm.status) + number]
      this.updateTask()
    },
    updateTask () {
      this.myForm.created_at = new Date()
      db
        .collection('activities')
        .doc(this.detail.id)
        .update(this.myForm)
        .then(() => {
          this.SWAL('success', 'updated a new task')
          this.clearForm()
        })
        .catch((error) => {
          this.SWAL('error', error)
        })
    },
    SWAL (type, message) {
      Swal.fire({
        position: 'center',
        type: type,
        title: message,
        showConfirmButton: false,
        timer: 1500
      })
    },
    deleteTask () {
      db
        .collection('activities')
        .doc(this.detail.id)
        .delete()
        .then(() => {
          this.SWAL('success', 'delete a task')
          this.clearForm()
        })
        .catch((error) => {
          this.SWAL('error', error)
        })
    }
  }
}
</script>
