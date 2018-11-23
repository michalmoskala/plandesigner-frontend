<template>
  <li>
    <h2 @click="navigateToPlanEditor(month.id)">{{ month.name }}</h2>
    <button @click="removeMonth(month.id)">Usuń miesiąc</button>
    <put-month-modal @putMonth="putMonth" />
  </li>
</template>

<script>
import { Months } from '@/services'
import PutMonthModal from './PutMonthModal'
export default {
  components: {
    PutMonthModal
  },
  props: {
    month: {
      type: Object,
      required: true
    }
  },
  methods: {
    navigateToPlanEditor (id) {
      this.$router.push({ name: 'planeditor', params: { id } })
    },
    async removeMonth (id) {
      const result = await Months.removeMonth(id)
      if (result) {
        this.$emit('removeMonth', id)
      }
    },
    async putMonth (result) {
      alert(result)
      this.month.name = result.name
    }
  }
}
</script>

<style lang="scss" scoped>
li {
  background: gray;
  margin: 8px;
  padding: 8px;
}
</style>
