<template>
  <div class="card">
    <div class="card-header">
      <div class="card-header-title">{{title}}</div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Cards',
  props: ['title'],
};
</script>

<style scoped lang="scss">
  .card {
    margin-bottom: 20px;

    .card-header {

    }
  }
</style>
