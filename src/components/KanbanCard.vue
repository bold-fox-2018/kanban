<template>
  <v-flex mr-2 xs3>
    <v-card hover :color="data.color">
      <v-container>
        <v-toolbar color="white">
          <v-toolbar-title class="text-uppercase">
            <b><i :class="data.class"></i>{{data.name}}</b>
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-container>
      <v-card-actions>
        <v-layout column justify-space-between wrap elevation-15>
          <draggable 
            :list="data.tasks"
            :move="checkMove"
            @end="dragEnd"
            
            :options="{group:'task'}"
          >
            <ContentCard :class="data.name"
              style="max-width:100%"
              v-for="item in data.tasks"
              :key="item.id"
              :item="item"
              :name="data.name"
              :color="data.color"
            ></ContentCard>
          </draggable>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
import ContentCard from "@/components/ContentCard.vue";
import draggable from "vuedraggable";
import database from "@/assets/config";
export default {
  name: "KanbanCard",
  components: {
    ContentCard,
    draggable
  },
  props: ["data", "color"],
  created() {
    this.cardTitle = this.title;
  },
  data() {
    return {
      id: '',
      from: '',
      to:'',
    };
  },
  methods: {
    checkMove(event) {
      console.log('start id',event.draggedContext.element.id)
      this.id = event.draggedContext.element.id
    },
    dragEnd(event) {
      this.to = String(event.to.firstChild.className).slice(10)
      database
      .collection("Tasks")
      .doc(this.id)
      .update({
        status: this.to
      });
    }
  }
};
</script>
