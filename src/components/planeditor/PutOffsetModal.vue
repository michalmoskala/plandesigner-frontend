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
        <b-form-select v-model="form.workerId" :options="workers.name" />
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
// import { Workers } from '@/services'

const formDefault = {
  workerId: null,
  hours: null,
  minutes: null,
  negative: null
}

export default {
  data () {
    return {
      workers: [],
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
    async twojstary () {
      alert('bulwary')
    },
    async submit () {
      this.$emit('putOffset', this.formDefault)
    },
    handleHidden () {
      this.form = { ...formDefault }
    }
  }
}
</script>
