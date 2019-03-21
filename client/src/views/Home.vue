<template>
  <section class="container">
    <div class="columns is-multiline">
      <div class="column" v-for="label in $parent.listLabel">
        <Cards :title="label.title">
          <div class="card-content">
            <Cards v-for="item in $parent[label.slug]" :title="item.title" :key="item.id">
              <div class="card-content">
                {{item.description}}
              </div>
              <div class="card-footer">
                <a class="card-footer-item"></a>
                <a @click="$parent.taskUpdateForm(item.id)" class="card-footer-item">Detail</a>
                <a @click="$parent.moveNextTask(item.id)" class="card-footer-item" @>Todo</a>
              </div>
            </Cards>
          </div>
        </Cards>
      </div>

    </div>
  </section>
</template>

<script>
  import Cards from '../components/Cards.vue';

  export default {
    name: 'home',
    components: {
      Cards,
    },
  };
</script>
