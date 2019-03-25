<template>
  <div>
    <nav class="navbar fixed-top navbar-dark bg-dark">
      <a class="navbar-brand" href="#">Hore Kanban</a>

      <a href="#" data-toggle="modal" data-target="#new-task">
        <i class="fas fa-tasks"></i>
      </a>
    </nav>
    <InputNewTask/>
  </div>
</template>

<script>
import InputNewTask from '@/components/InputNewTask.vue';

export default {
  name: 'Navbar',
  components: {
    InputNewTask,
  },
};
</script>

<style>
a {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
.navbar .fa-tasks {
  font-size: 25px;
  color: white;
}
.navbar-brand{
  font-size: 30px;
}
</style>
