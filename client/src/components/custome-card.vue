<template>
  <div class="card">
    <div
      :style="setStyle('fullCards')"
      :class="custome.fullCards.bootstrap"
      @mouseover="setHover('fullCards')"
      @mouseleave="setStyle('fullCards')">
      <div v-if="custome.headers.needed" class="card-header">
        <div
          :style="setStyle('headers')"
          :class="custome.headers.bootstrap"
          @mouseover="setHover('headers')"
          @mouseleave="setStyle('headers')">
          {{ custome.headers.text }}
        </div>
        <img v-if="custome.headers.image" :src="custome.headers.image">
      </div>
      <div v-if="custome.body.needed" class="card-body">
        <div
          :style="setStyle('body')"
          :class="custome.body.bootstrap"
          @mouseover="setHover('body')"
          @mouseleave="setStyle('body')">
          <span v-if="custome.body.text">
            {{ custome.body.text }} <br>
          </span>
          <span v-if="custome.body.text1">
            {{ custome.body.text1 }} <br>
          </span>
          <span v-if="custome.body.text2">
            {{ custome.body.text2 }} <br>
          </span>
          <span v-if="custome.body.text3">
            {{ custome.body.text3 }} <br>
          </span>
        </div>
        <img v-if="custome.body.image" :src="custome.body.image">
      </div>
      <div v-if="custome.footers.needed" class="card-footer">
        <div
          :style="setStyle('footers')"
          :class="custome.footers.bootstrap"
          @mouseover="setHover('footers')"
          @mouseleave="setStyle('footers')">
          <small>{{ custome.footers.text }}</small>
        </div>
        <img v-if="custome.footers.image" :src="custome.footers.image">
      </div>
    </div>
    <draggable :class="customeProps.body.text" group="datas" v-model="customeProps.contents" :move="checkMove" @end="drop">
      <div
        v-for="content in customeProps.contents"
        class="clickable"
        :content="content"
        :key="content.id"
        @click="$emit('show-detail', content)">
        <custome-card
          v-if="content.data.status === custome.body.text"
          class="shadow mb-3"
          :customeProps="{
            body: {
              text1: 'Title: ' + content.data.title,
              text2: 'Point: ' + content.data.point,
              text3: 'Assigned To: ' +  content.data.assigned_to,
              needed: true,
              css: {
                'font-size': '13px'
              }
            },
            content: content
          }">
        </custome-card>
      </div>
    </draggable>
  </div>

</template>

<script>

import db from '@/api/firebase'
import CustomeCard from '@/components/custome-card.vue'
import draggable from 'vuedraggable'

export default {
  name: 'CustomeCard',
  props: ['customeProps', 'fetchStatus', 'lastData', 'allDatas'],
  components: {
    CustomeCard,
    draggable
  },
  data () {
    return {
      custome: {
        fullCards: {
          css: {},
          hover: {},
          bootsrap: '',
          image: [],
          putStyle: ''
        },
        headers: {
          text: '',
          css: {},
          hover: {},
          bootsrap: '',
          image: [],
          needed: false,
          putStyle: ''
        },
        body: {
          text: '',
          css: {},
          hover: {},
          bootsrap: '',
          image: [],
          needed: false,
          putStyle: ''
        },
        footers: {
          text: '',
          css: {},
          hover: {},
          bootsrap: '',
          image: [],
          needed: false,
          putStyle: ''
        },
        drag: true,
        modelMovement: {}
      }
    }
  },
  watch: {
    customeProps (values) {
      this.createByTemplate()
    },
    fetchStatus (values) {
      if (values) {
        this.createByTemplate()
      }
    }
  },
  mounted () {
    this.createByTemplate()
  },
  methods: {
    createByTemplate () {
      this.custome = { ...this.custome, ...this.customeProps }
      this.$emit('change-fetchstatus')
    },
    setStyle (part) {
      this.custome[part].putStyle = ''
      for (let key in this.custome[part].css) {
        if (this.custome[part].css[key]) this.custome[part].putStyle += `${key}: ${this.custome[part].css[key]} !important;`
      }
      return this.custome[part].putStyle
    },
    setHover (part) {
      for (let key in this.custome[part].hover) {
        if (this.custome[part].hover[key]) this.custome[part].putStyle += `${key}: ${this.custome[part].hover[key]} !important;`
      }
    },
    showDetail (content) {
      this.detail = content
      this.$emit('show-detail', content)
    },
    checkMove: function (evt) {
      let id = evt.draggedContext.element.id
      // let statusTarget = evt.relatedContext.list[0]
      this.modelMovement = {
        id: id
      }
    },
    drop (evt) {
      let status = evt.to.className.toString()
      db
        .collection('activities')
        .doc(this.modelMovement.id)
        .update({
          status: status
        })
        .then(() => {
          this.createByTemplate()
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>

.clickable:hover {
  cursor: pointer;
}

</style>
