<template>
  <div>
    <h1>Edycja planu</h1>
    <h2>{{ monthContainer.monthEntity.name }}</h2>
    <div class="plan-tables-container">
      <table>
        <tr>
          <td v-for="day in monthContainer.dayEntities" :key="day.number">
            <table class="day-table">
              <tr>
                <th :class="{'special-day': day.special}" >{{ day.number }}</th>
              </tr>
              <tr>
                <td>
                  <b-dropdown variant="link" no-caret>
                    <template slot="button-content">
                      <template v-if="day.shiftOne">
                        {{ day.shiftOne.workerShortName }}
                      </template>
                      <template v-else>
                        &nbsp;
                      </template>
                    </template>
                    <b-dropdown-item
                      v-for="worker in workers"
                      :key="worker.id"
                      @click="huj(worker.id, day.number, 1)"
                      href="#">
                      {{ worker.name }}
                    </b-dropdown-item>
                  </b-dropdown>
                </td>
              </tr>
              <tr>
                <td>
                  <b-dropdown variant="link" no-caret>
                    <template slot="button-content">
                      <template v-if="day.shiftTwo">
                        {{ day.shiftTwo.workerShortName }}
                      </template>
                      <template v-else>
                        &nbsp;
                      </template>
                    </template>
                    <b-dropdown-item
                      v-for="worker in workers"
                      :key="worker.id"
                      @click="huj(worker.id, day.number, 2)"
                      href="#">
                      {{ worker.name }}
                    </b-dropdown-item>
                  </b-dropdown>
                </td>
              </tr>
              <tr>
                <td>
                  <b-dropdown variant="link" no-caret>
                    <template slot="button-content">
                      <template v-if="day.shiftThree">
                        {{ day.shiftThree.workerShortName }}
                      </template>
                      <template v-else>
                        &nbsp;
                      </template>
                    </template>
                    <b-dropdown-item
                      v-for="worker in workers"
                      :key="worker.id"
                      @click="huj(worker.id, day.number, 3)"
                      href="#">
                      {{ worker.name }}
                    </b-dropdown-item>
                  </b-dropdown>
                </td>
              </tr>
              <tr>
                <td>
                  <b-dropdown variant="link" no-caret>
                    <template slot="button-content">
                      <template v-if="day.shiftFour">
                        {{ day.shiftFour.workerShortName }}
                      </template>
                      <template v-else>
                        &nbsp;
                      </template>
                    </template>
                    <b-dropdown-item
                      v-for="worker in workers"
                      :key="worker.id"
                      @click="huj(worker.id, day.number, 4)"
                      href="#">
                      {{ worker.name }}
                    </b-dropdown-item>
                  </b-dropdown>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <h1>pracownicy</h1>
        <div class="worker-list-container">
          <ul class="worker-list">
            <worker-item v-for="item in workerList" :key="item.id" :worker="item" />
          </ul>
        </div>
    </div>
  </div>
</template>

<script>
import { Shifts, Workers, Months } from '@/services'
import WorkerItem from './WorkerItem'

export default {
  components: {
    WorkerItem
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      monthContainer: {},
      workers: [],
      workerList: []
    }
  },
  methods: {
    async huj (workerId, day, whichTime) {
      const worker = {
        workerId,
        day,
        whichTime,
        monthId: this.id,
        minutes: 720
      }
      var responseWorker = await Shifts.postShift(worker)
        .then(resp => resp.data)
      const dayElo = this.monthContainer.dayEntities.find(d => d.number === day)
      if (!dayElo) {
        console.log('day null')
        return
      }
      if (responseWorker.whichTime === 1) {
        dayElo.shiftOne = responseWorker
      }
      if (responseWorker.whichTime === 2) {
        dayElo.shiftTwo = responseWorker
      }
      if (responseWorker.whichTime === 3) {
        dayElo.shiftThree = responseWorker
      }
      if (responseWorker.whichTime === 4) {
        dayElo.shiftFour = responseWorker
      }
      const workerList = await Months.getWorkersForMonth(this.id)
        .then(resp => resp.data)

      if (!workerList) return

      this.workerList = workerList
    },
    async importWorkers () {
      const workers = await Workers.getWorkers()
        .then(resp => resp.data)

      if (!workers) return

      this.workers = workers

      const workerList = await Months.getWorkersForMonth(this.id)
        .then(resp => resp.data)

      if (!workerList) return

      this.workerList = workerList
    }
  },
  beforeMount () {
    this.$http.get('http://localhost:8069/months/1')
      .then(response => (this.monthContainer = response.data))
    this.importWorkers()
  }
}
</script>

<style lang="scss" scoped>
.day-table {
  td {
    width: 32px;
    height: 32px;
    border: 1px solid gray;
  }
}

.special-day {
  background: red
}
</style>
