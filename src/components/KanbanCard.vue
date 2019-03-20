<template>
  <v-flex mr-2 xs3>
    <v-card>
      <v-card-title primary-title outline>
        {{data.name}}
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
  props: ['data'],
  created () {
    this.cardTitle = this.title
  },
  data () {
    return {}
  }
}
</script>
