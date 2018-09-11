<template>
  <li @click="navigateToPlanEditor(month.id)">
    <h2>{{ month.name }}</h2>
    <h5>{{ month.timestamp }}</h5>
  </li>
</template>

<script>
export default {
  props: {
    month: {
      type: Object,
      required: true
    }
  },
  methods: {
    navigateToPlanEditor (id) {
      this.$router.push({ name: 'planeditor', params: { id } })
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
