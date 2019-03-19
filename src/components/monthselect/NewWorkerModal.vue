<template>
<div>
  <b-btn v-b-modal.newWorkerModal>Dodaj Pracownika</b-btn>
  <b-modal
    id="newWorkerModal"
    ref="newWorkerModal"
    title="Dodaj pracownika"
    @ok="handleOk"
    @hidden="handleHidden"
  >
    <form @submit.prevent="submit">

      <b-form-group label="Nazwisko pracownika">
        <b-form-input id="worker-name-input" type="text" v-model="form.name"></b-form-input>
      </b-form-group>

      <b-form-group label="Skrócony pseudonim pracownika">
        <b-form-input id="worker-shortname-input" type="text" v-model="form.shortname"></b-form-input>
      </b-form-group>

    </form>
  </b-modal>
</div>
</template>

<script>
import { Workers } from '@/services'

const formDefault = {
  name: '',
  shortname: ''
}

export default {
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
    async submit () {
      const result = await Workers.postWorker(this.form).then(resp => resp.data)
      if (result) {
        this.$emit('addWorker', result)
        this.$refs.newWorkerModal.hide()
      }
    },
    handleHidden () {
      this.form = { ...formDefault }
    }
  }
}
</script>
