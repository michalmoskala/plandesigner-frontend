<template>
  <li>
    <h5>{{ worker.name, worker.minutes }}</h5>
    <h5>{{ worker.minutes}} </h5>
  </li>
</template>

<script>
export default {
  props: {
    worker: {
      type: Object,
      required: true
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
