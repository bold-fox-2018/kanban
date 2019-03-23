<template>
  <section class="container">
    <div class="columns is-multiline">
      <div class="column" v-for="(label,i) in $parent.listLabel" :key="i">
        <Cards
          :title="label.title"
          :customClass="'item'"
        >
          <Draggable
            class="card-content"
            :data-status="[label.slug]"
            @end="dragEnd"
            v-bind="dragOptions"
            v-model="$parent[label.slug]"
          >
            <Cards
              v-for="item in $parent[label.slug]"
              :title="item.title"
              :key="item.id"
              :id="item.id"
              :status="item.status"
              class="c-pointer"
              @click.native="$parent.taskUpdateForm(item.id)"
            />
          </Draggable>
        </Cards>
      </div>
    </div>
  </section>
</template>

<script>
import Draggable from 'vuedraggable';
import Cards from '../components/Cards.vue';

export default {
  name: 'home',
  components: {
    Cards,
    Draggable,
  },
  methods: {
    dragEnd({ item, to }) {
      let value = 0;
      const slug = to.attributes['data-status'].value;
      this.$parent.listLabel.forEach((label, i) => {
        if (label.slug === slug) {
          value = i;
        }
      });
      this.$parent.moveTaskStatus(item.id, value);
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: 'tasks',
        ghostClass: 'ghost',
      };
    },
  },
};
</script>

<style scoped lang="scss">
  .c-pointer {
    cursor: pointer;
  }

  .ghost {
    opacity: 0.5;
  }
</style>
