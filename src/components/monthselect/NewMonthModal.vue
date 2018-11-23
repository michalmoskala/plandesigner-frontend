<template>
<div>
  <b-btn v-b-modal.newMonthModal>Dodaj miesiac</b-btn>
  <b-modal
    id="newMonthModal"
    ref="newMonthModal"
    title="Bootstrap-Vue"
    @ok="handleOk"
    @hidden="handleHidden"
  >
    <form @submit.prevent="submit">

      <b-form-group label="Nazwa miesiąca">
        <b-form-input id="month-name-input" type="text" v-model="form.name"></b-form-input>
      </b-form-group>

      <b-form-group label="Dzień rozpoczynający">
        <b-form-select v-model="form.startingDay" :options="DAY_OPTIONS" />
      </b-form-group>

       <b-form-group label="Ile dni">
        <b-form-select v-model="form.days" :options="LENGTH_OPTIONS" />
      </b-form-group>

    </form>
  </b-modal>
</div>
</template>

<script>
import { DAY_OPTIONS, LENGTH_OPTIONS } from '@/constants'
import { Months } from '@/services'

const formDefault = {
  name: '',
  startingDay: null,
  days: null
}

export default {
  data () {
    return {
      DAY_OPTIONS,
      LENGTH_OPTIONS,
      form: { ...formDefault }
    }
  },
  methods: {
    handleOk (evt) {
      evt.preventDefault()
      this.submit()
    },
    async submit () {
      const result = await Months.postMonth(this.form).then(resp => resp.data)
      if (result) {
        this.$emit('addMonth', result)
        this.$refs.newMonthModal.hide()
      }
    },
    handleHidden () {
      this.form = { ...formDefault }
    }
  }
}
</script>
