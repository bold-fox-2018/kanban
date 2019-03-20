<template>
  <section class="container">
    <div class="columns is-multiline">
      <div class="column">
        <Cards :title="'Backlog'">
          <div class="card-content">
            <Cards v-for="item in $parent.backlog" :title="item.title" :key="item.id">
              <div class="card-content">
                {{item.description}}
              </div>
              <div class="card-footer">
                <a class="card-footer-item"></a>
                <a @click="$parent.taskUpdateForm(item.id)" class="card-footer-item">Detail</a>
                <a @click="$parent.moveNextTask(item.id)" class="card-footer-item">Todo</a>
              </div>
            </Cards>
          </div>
        </Cards>
      </div>
      <div class="column">
        <Cards :title="'Todo'">
          <div class="card-content">
            <Cards v-for="item in $parent.todo" :title="item.title" :key="item.id">
              <div class="card-content">
                {{item.description}}
              </div>
              <div class="card-footer">
                <a @click="$parent.movePrevTask(item.id)" class="card-footer-item">Backlog</a>
                <a @click="$parent.taskUpdateForm(item.id)" class="card-footer-item">Detail</a>
                <a @click="$parent.moveNextTask(item.id)" class="card-footer-item">Doing</a>
              </div>
            </Cards>
          </div>
        </Cards>
      </div>
      <div class="column">
        <Cards :title="'Doing'">
          <div class="card-content">
            <Cards v-for="item in $parent.doing" :title="item.title" :key="item.id">
              <div class="card-content">
                {{item.description}}
              </div>
              <div class="card-footer">
                <a @click="$parent.movePrevTask(item.id)" class="card-footer-item">Todo</a>
                <a @click="$parent.taskUpdateForm(item.id)" class="card-footer-item">Detail</a>
                <a @click="$parent.moveNextTask(item.id)" href="#" class="card-footer-item">Done</a>
              </div>
            </Cards>
          </div>
        </Cards>
      </div>
      <div class="column">
        <Cards :title="'Done'">
          <div class="card-content">
            <Cards v-for="item in $parent.done" :title="item.title" :key="item.id">
              <div class="card-content">
                {{item.description}}
              </div>
              <div class="card-footer">
                <a @click="$parent.movePrevTask(item.id)" class="card-footer-item">Doing</a>
                <a @click="$parent.taskUpdateForm(item.id)" class="card-footer-item">Detail</a>
                <a href="#" class="card-footer-item"></a>
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
