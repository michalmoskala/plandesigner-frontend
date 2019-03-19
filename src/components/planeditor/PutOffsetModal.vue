<template>
<div>
  <b-btn v-b-modal.putOffsetModal>Dodaj offset</b-btn>
  <b-modal
    id="putOffsetModal"
    ref="putOffsetModal"
    title="Bootstrap-Vue"
    @ok="handleOk"
    @hidden="handleHidden"
  >
    <form @submit.prevent="submit">

      <b-form-group label="Kto">
        <b-form-select value-field="id" text-field="name" v-model="form.workerId"  :options="workers" />
      </b-form-group>

       <b-form-group label="Ile godzin">
        <b-form-select v-model="form.hours" :options="HOURS_OPTIONS" />
      </b-form-group>

      <b-form-group label="Ile minut">
        <b-form-select v-model="form.minutes" :options="MINUTES_OPTIONS" />
      </b-form-group>

      <b-form-group label="Czy ujemne">
        <b-form-checkbox v-model="form.negative" value=-1 unchecked-value=1 />
      </b-form-group>

    </form>
  </b-modal>
</div>
</template>

<script>
import { HOURS_OPTIONS, MINUTES_OPTIONS } from '@/constants'
import { Months, Workers } from '@/services'

const formDefault = {
  workerId: null,
  hours: null,
  minutes: null,
  negative: null
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
      MINUTES_OPTIONS,
      HOURS_OPTIONS,
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
      const offsetEntity = {
        monthId: this.monthId,
        workerId: this.form.workerId,
        minutes: (this.form.hours * 60 + this.form.minutes) * this.form.negative
      }
      console.log(offsetEntity.monthId)
      var responseOffset = await Months.putOffset(this.monthId, offsetEntity)
        .then(resp => resp.data)
      if (!responseOffset) {
        console.log('ff null')
        return
      }
      this.$emit('putOffset', this.formDefault)
      this.$refs.putOffsetModal.hide()
    },
    handleHidden () {
      this.form = { ...formDefault }
    }
  }
}
</script>
