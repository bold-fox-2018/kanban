<template>
  <div>
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">{{task.title}}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Point: {{task.point}}</h6>
        <h6 class="card-subtitle mb-2 text-muted">Assigned To: {{task.assignedTo}}</h6>
        <a
          href="#"
          @click.prevent="$emit('detail-task',task)"
          class="btn btn-info"
          data-toggle="modal"
          data-target="#detailTask"
        >Show Detail</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Card',
  props: ['task'],
};
</script>
<style>
.card {
  color: #373c42;
  margin: 0px 10px;
  margin-bottom: 10px;
}
.card .card-title {
  /* background-color: red; */
  font-weight: bold;
  border-bottom: 1px solid #373c42;
  margin-bottom: 20px;
}
.card .card-subtitle {
  font-size: 18px;
}
.card:hover {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.01) inset, 0 0 8px rgba(0, 0, 0, 0.3);
}
</style>
