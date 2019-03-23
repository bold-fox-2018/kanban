<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light shadow mb-3">
    <div class="container">
      <div class="navbar-brand" style="cursor: default;">Drag & Drop</div>
      <custome-button
        :customeProps="createTodoButton"
        :customeEvent="'show-modal'"
        :trigger="'create'"
        @show-modal="$emit('show-modal', $event)
        ">
      </custome-button>
    </div>
  </nav>
</template>

<script>
import CustomeButton from '@/components/custome-button.vue'

export default {
  name: 'navbar',
  components: {
    CustomeButton
  },
  data () {
    return {
      createTodoButton: {
        name: 'Create',
        bootstrap: 'btn btn-success',
        FA: 'fa fa-plus-square',
        css: {
          'background-color': 'black',
          'color': 'white',
          'border-color': 'white'
        },
        hover: {
          'background-color': 'white',
          'color': 'black',
          'border-color': 'black'
        }
      }
    }
  }
}
</script>
