<template>
  <div  class="card border-success my-5 container mx-auto" :style="detail.borderColor">
    <div class="card-header bg-transparent border-success container">
        <div class="row">
            <div id="outerCards" class="col">
                {{ detail. title }}
            </div>
        </div>
    </div>
    <div class="card-body text-success">
      <h5 class="card-title"></h5>
      <TodoContent :todos="detail.todos"></TodoContent>
      <!-- {{detail.todos}} -->
    </div>
  </div>
</template>

<script>
import TodoContent from '@/components/todo-content.vue'
import db from '@/Firebase/config.js'

export default {
  data () {
    return {
      todo: '',
      description: '',
      date: '',
      status: this.pos,
      point: null,
      assigned_to: ''
    }
  },
  components: {
    TodoContent
  },
  props: ['detail', 'pos'],
}
</script>

<style>
    #modal-button {
        background-color: #7F782A;
    }
    #outerCards {
        font-size: 1.5em;
    }
    .btn-primary {
        background-color: #fff;
    }
    .btn.btn-primary:hover {
        border-color: #000;
    }
</style>
