<template>
<div>
  <b-btn v-b-modal.putMonthModal>Zmień nazwę miesiąca</b-btn>
  <b-modal
    id="putMonthModal"
    ref="putMonthModal"
    title="Bootstrap-Vue"
    @ok="handleOk"
    @hidden="handleHidden"
  >
    <form @submit.prevent="submit">

      <b-form-group label="Nazwa miesiąca">
        <b-form-input id="month-name-input" type="text" v-model="month.name"></b-form-input>
      </b-form-group>

    </form>
  </b-modal>
</div>
</template>

<script>
import { Months } from '@/services'

const formDefault = {
  name: '',
  startingDay: null,
  days: null
}

export default {
  props: {
    month: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      // DAY_OPTIONS,
      // LENGTH_OPTIONS,
      // form: { ...formDefault }
    }
  },
  methods: {
    handleOk (evt) {
      evt.preventDefault()
      this.submit()
    },
    async submit () {
      const result = await Months.put(this.month).then(resp => resp.data)
      if (result) {
        this.$emit('putMonth', result)
        this.$refs.newMonthModal.hide()
      }
    },
    handleHidden () {
      this.form = { ...formDefault }
    }
  }
}
</script>
