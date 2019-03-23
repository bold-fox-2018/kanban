<template>
  <div>
    <button
      type="button"
      :style="putStyle"
      :class="custome.bootstrap"
      @mouseover="setHover"
      @mouseleave="setStyle"
      @click.prevent="$emit(customeEvent, trigger)">
      {{ custome.name }}
      <i :class="custome.FA"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'custome-button',
  props: ['customeProps', 'customeEvent', 'trigger'],
  data () {
    return {
      custome: {
        'name': '',
        'css': {},
        'hover': {},
        'bootstrap': '',
        'FA': ''
      },
      css: {},
      hover: {},
      putStyle: ''
    }
  },
  created () {
    this.createByTemplate()
  },
  methods: {
    setStyle () {
      this.putStyle = ''
      for (let key in this.custome.css) {
        if (this.custome.css[key]) this.putStyle += `${key}: ${this.custome.css[key]} !important;`
      }
    },
    setHover () {
      this.putStyle = ''
      for (let key in this.custome.hover) {
        if (this.custome.hover[key]) this.putStyle += `${key}: ${this.custome.hover[key]} !important;`
      }
    },
    createByTemplate () {
      this.custome = { ...this.custome, ...this.customeProps }
      this.setStyle()
    }
  }
}
</script>

<style scoped>

</style>
