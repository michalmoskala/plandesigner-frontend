<template>
  <div>
    <h1>Wybierz miesiąc</h1>
    <new-month-modal @addMonth="addMonth" />
    <new-worker-modal @addWorker="addWorker" />
    <div class="month-list-container">
      <ul class="month-list">
        <month-item @removeMonth="removeMonth" v-for="item in monthList" :key="item.id" :month="item" />
      </ul>
    </div>
  </div>
</template>

<script>
import NewMonthModal from './NewMonthModal'
import NewWorkerModal from './NewWorkerModal'
import MonthItem from './MonthItem'
import { Months } from '@/services'

export default {
  components: {
    MonthItem,
    NewMonthModal,
    NewWorkerModal
  },
  data () {
    return {
      monthList: []
    }
  },
  async beforeMount () {
    await Months.getAllMonths()
      .then(response => (this.monthList = response.data))
    this.importWorkers()
  },
  methods: {
    addMonth (month) {
      this.monthList.unshift(month)
    },
    removeMonth (id) {
      this.monthList = this.monthList.filter(item => item.id !== id)
    },
    addWorker () {
      console.log('aaa')
    },
    removeMonthFromList (id) {
      // this.monthList.splice("id")
      console.log(id)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
