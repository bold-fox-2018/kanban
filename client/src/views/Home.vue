<template>
  <div class="home">
    <custome-navbar
      @show-modal="showModal($event)">
    </custome-navbar>
    <div class="container">
      <div class="row">
        <custome-card
          v-for="data in datas"
          class="col-3 shadow mb-3"
          :customeProps="data"
          :key="data.id"
          :style="'background-color: ' + data.bkcolor +'; color: black; display: block; overflow: auto; height: 100%'"
          :fetch-status="fetchStatus"
          :drags="true"
          :lastData="lastData"
          :allDatas="datas"
          @change-fetchstatus="fetchStatus = false"
          @show-detail="showDetail($event)">
        </custome-card>
      </div>
    </div>
    <custome-modal
      :typeModal="typeModal"
      :detail="detail"
      :selectAbleStatus="selectAbleStatus">
    </custome-modal>
  </div>
</template>

<script>
import db from '@/api/firebase'
import $ from 'jquery/dist/jquery'
import CustomeCard from '@/components/custome-card.vue'
import CustomeNavbar from '@/components/custome-navbar.vue'
import CustomeModal from '@/components/custome-modal.vue'

export default {
  name: 'home',
  components: {
    CustomeCard,
    CustomeNavbar,
    CustomeModal
  },
  data () {
    return {
      datas:
      [{
        id: 1,
        bkcolor: 'pink',
        body: {
          text: 'Back Log',
          needed: true
        },
        contents: []
      }, {
        id: 2,
        bkcolor: 'orange',
        body: {
          text: 'To Do',
          needed: true
        },
        contents: []
      }, {
        id: 3,
        bkcolor: 'lightgreen',
        body: {
          text: 'On Going',
          needed: true
        },
        contents: []
      }, {
        id: 4,
        bkcolor: 'skyblue',
        body: {
          text: 'Completed',
          needed: true
        },
        contents: []
      }],
      detail: {},
      typeModal: null,
      selectAbleStatus: ['Back Log', 'To Do', 'On Going', 'Completed'],
      fetchStatus: false,
      lastData: ''
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      db
        .collection('activities')
        .orderBy('priority', 'desc')
        .onSnapshot((snapshots) => {
          for (let i = 0; i < this.datas.length; i++) {
            this.datas[i].contents = []
          }
          snapshots
            .forEach(doc => {
              let index = this.selectAbleStatus.indexOf(doc.data().status)
              this.datas[index].contents.push({
                id: doc.id,
                data: doc.data()
              })
              this.lastData = doc.id
              this.fetchStatus = true
            }
            )
        })
    },
    showModal (type) {
      this.typeModal = type
      $('#my-modal').modal('toggle')
    },
    showDetail (content) {
      this.typeModal = 'detail'
      this.detail = content
      $('#my-modal').modal('toggle')
    }
  }
}
</script>
