<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand">KamVan Board</a>
        <button
          type="button"
          class="btn btn-primary my-2 my-sm-0"
          data-toggle="modal"
          data-target="#add-task"
        >New Task</button>
      </div>
    </nav>
    <AddTaskModal 
    v-bind:class="{ in: modalShown }"
    v-on:close-modal="toggleModal" />
  </div>
</template>

<script>
import AddTaskModal from "@/components/AddTaskModal.vue";
export default {
  name: "Navbar",
  components: {
    AddTaskModal
  },
  data() {
    return {
      modalShown: false
    };
  },
  methods: {
    toggleModal() {
      this.modalShown = !this.modalShown;
    }
  }
};
</script>

