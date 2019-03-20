<template>
  <v-flex mr-2 xs3>
    <v-card hover :color="data.color">
      <v-card-title primary-title bold>
          <p class="text-xs-center">{{data.name}}</p>

      </v-card-title>
      <v-card-actions>
          <v-layout column justify-space-between wrap >
            <ContentCard v-for="item in data.tasks" :key="item.id" :item="item" :name="data.name"></ContentCard>
          </v-layout>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
import ContentCard from '@/components/ContentCard.vue'
export default {
  name: 'KanbanCard',
  components: {
    ContentCard
  },
  props: ['data', 'color'],
  created () {
    this.cardTitle = this.title
  },
  data () {
    return {}
  }
}
</script>
