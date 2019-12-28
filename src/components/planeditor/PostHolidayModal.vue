<template>
<div>
  <b-btn v-b-modal.postHolidayModal>Dodaj urlop</b-btn>
  <b-modal
    id="postHolidayModal"
    ref="postHolidayModal"
    title="Dodaj urlop"
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
    },
    monthId: {
      type: Number,
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
        monthId: this.monthId,
        workerId: this.form.workerId,
        days: this.form.days,
        firstDay: this.form.firstDay,
        lastDay: this.form.lastDay
      }
      console.log(holidayEntity.monthId)
      var responseHoliday = await Months.postHoliday(this.monthId, holidayEntity)
        .then(resp => resp.data)
      if (!responseHoliday) {
        console.log('ff null')
      }
      this.$emit('postHoliday', this.formDefault)
      this.$refs.postHolidayModal.hide()
    },
    handleHidden () {
      this.form = { ...formDefault }
    }
  }
}
</script>
