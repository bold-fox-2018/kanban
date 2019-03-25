<template>
  <div class="add">
    <h2>Add Todo</h2>
    <form v-on:submit.prevent="addTodo">
      <input v-model="name" placeholder="Name" class="form-control">
      <br>
      <input v-model="detail" placeholder="Detail" class="form-control">
      <br>
      <input v-model="assign" placeholder="Assign To" class="form-control">
      <br>
      <br>
      <input type="submit" value="Submit">
    </form>
  </div>
</template>

<style scoped>
.add form {
  width: 100%;
  height: 100%;
}

.form-group {
  max-width: 80%;
}
</style>



