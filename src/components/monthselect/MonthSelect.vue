<template>
  <div>
    <h1>Wybierz miesiąc</h1>
    <div class="month-list-container">
      <ul class="month-list">
        <month-item v-for="item in monthList" :key="item.id" :month="item" />
      </ul>
    </div>
  </div>
</template>

<script>
import MonthItem from './MonthItem'

export default {
  components: {
    MonthItem
  },
  data () {
    return {
      monthList: [
        {
          id: 1,
          name: 'CIPSKO',
          timestamp: 1243
        },
        {
          id: 4,
          name: 'WYLIZANE',
          timestamp: 1243
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
