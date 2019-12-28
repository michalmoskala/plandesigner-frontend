<template>
<div>
  <b-btn v-b-modal.deleteHolidayModal>Usuń urlop</b-btn>
  <b-modal
    id="deleteHolidayModal"
    ref="deleteHolidayModal"
    title="Usuń urlop"
    @ok="handleOk"
    @hidden="handleHidden"
  >
    <form @submit.prevent="submit">

      <b-form-group label="Który?">
        <b-form-select value-field="id" text-field="name"  v-model="form.holidayId"  :options="holidays" />
      </b-form-group>

    </form>
  </b-modal>
</div>
</template>

<script>
import { Months, Holidays } from '@/services'

const formDefault = {
  holidayId: null
}

export default {
  props: {
    holidays: {
      type: Array,
      required: true
    },
    monthId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      form: { ...formDefault }
    }
  },
  methods: {
    handleOk (evt) {
      evt.preventDefault()
      this.submit()
    },
    async beforeMount () {
      alert('bulwary')
      await Months.getHolidaysForMonth(this.monthId)
        .then(response => (this.holidays = response.data))
    },
    async submit () {
      // var responseHoliday = await Holidays.deleteHoliday(this.form.holidayId)
      //   .then(resp => resp.data)
      // if (!responseHoliday) {
      //   console.log('ff null')
      //   return
      // }
      await Holidays.deleteHoliday(this.form.holidayId)
      this.$emit('deleteHoliday', this.formDefault)
      this.$refs.deleteHolidayModal.hide()
    },
    handleHidden () {
      this.form = { ...formDefault }
    }
  }
}
</script>
