<template>
  <v-flex mr-2 xs3>
    <v-card hover :color="data.color">
      <v-container >
        <v-toolbar color="white">
          <v-toolbar-title class="text-uppercase"><b>{{data.name}}</b></v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-container >
      <v-card-actions>
          <v-layout column justify-space-between wrap elevation-15>
        <draggable v-model="data.tasks" @start="drag=true" @end="drag=false" :options="{group:'task'}">
            <ContentCard style="max-width:100%" v-for="item in data.tasks" :key="item.id" :item="item" :name="data.name" :color="data.color"></ContentCard>
        </draggable>
          </v-layout>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
import ContentCard from '@/components/ContentCard.vue'
import draggable from 'vuedraggable'
export default {
  name: 'KanbanCard',
  components: {
    ContentCard,
    draggable
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
