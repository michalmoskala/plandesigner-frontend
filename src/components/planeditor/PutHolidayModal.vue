<template>
<div>
  <b-btn v-b-modal.putHolidayModal>Dodaj urlop</b-btn>
  <b-modal
    id="putHolidayModal"
    ref="putHolidayModal"
    title="Bootstrap-Vue"
    @ok="handleOk"
    @hidden="handleHidden"
  >
    <form @submit.prevent="submit">

      <b-form-group label="Kto">
        <b-form-select value-field="id" text-field="name" v-model="form.workerId"  :options="workers" />
      </b-form-group>

       <b-form-group label="Ile dni">
        <b-form-select v-model="form.days" :options="DAY_0_31_OPTIONS" />
      </b-form-group>

      <b-form-group label="Dzień rozpoczynający">
        <b-form-select v-model="form.firstDay" :options="DAY_31_OPTIONS" />
      </b-form-group>

      <b-form-group label="Dzień ostatni">
        <b-form-select v-model="form.lastDay" :options="DAY_31_OPTIONS" />
      </b-form-group>

    </form>
  </b-modal>
</div>
</template>

<script>
import { DAY_0_31_OPTIONS, DAY_31_OPTIONS } from '@/constants'
import { Months, Workers } from '@/services'

const formDefault = {
  workerId: null,
  days: null,
  firstDay: null,
  lastDay: null
}

export default {
  props: {
    workers: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      DAY_0_31_OPTIONS,
      DAY_31_OPTIONS,
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
      await Workers.getWorkers()
        .then(response => (this.workers = response.data))
    },
    async submit () {
      const holidayEntity = {
        monthId: 4,
        workerId: this.form.workerId,
        days: this.form.days,
        firstDay: this.form.firstDay,
        lastDay: this.form.lastDay
      }
      var responseHoliday = await Months.putHoliday(holidayEntity)
        .then(resp => resp.data)
      if (!responseHoliday) {
        console.log('ff null')
        return
      }
      this.$emit('putHoliday', this.formDefault)
    },
    handleHidden () {
      this.form = { ...formDefault }
    }
  }
}
</script>
