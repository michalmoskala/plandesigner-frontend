<template>
  <div>
    <!-- <h5>Edycja planu</h5> -->
    <h5>{{ monthContainer.monthEntity.name }}</h5>
    <!-- <put-holiday-modal @putHoliday="putHoliday" :workers="this.workers" :monthId="this.id" /> -->
    <put-offset-modal @putOffset="putOffset" :workers="this.workers" :monthId="this.id" />
    <post-holiday-modal @postHoliday="postHoliday" :workers="this.workers" :monthId="this.id" />
    <delete-holiday-modal @deleteHoliday="deleteHoliday" :holidays="this.holidays" :monthId="this.id" />
    <div class="plan-tables-container">
      <table>
        <tr>
          <td v-for="day in monthContainer.dayEntities" :key="day.number">
            <table class="day-table">
              <tr @click="putSpecialDay(day.number)">
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
                    <b-dropdown-item @click="removeShift(day, 1)">
                      USUN</b-dropdown-item>
                    <b-dropdown-item @click="exclude(day, 1)">
                      X
                    </b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item
                      v-for="worker in workers"
                      :key="worker.id"
                      @click="replaceShift(worker.id, day.number, 1, 455)">
                      {{ worker.shortname }}
                    </b-dropdown-item>
                  </b-dropdown>
                </td>
              </tr>
              <tr>
                <td :class="{'special-color': day.shiftTwo && day.shiftTwo.specialColor}">
                  <b-dropdown variant="link" no-caret>
                    <template slot="button-content">
                      <template v-if="day.shiftTwo">
                        {{ day.shiftTwo.workerShortName }}
                      </template>
                      <template v-else>
                        &nbsp;
                      </template>
                    </template>
                    <b-dropdown-item @click="putSpecialColor(day.shiftTwo.id)">
                      Zmień dlugość</b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item @click="removeShift(day, 2)">
                      Usuń</b-dropdown-item>
                    <b-dropdown-item @click="exclude(day, 2)">
                      X
                    </b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item
                      v-for="worker in workers"
                      :key="worker.id"
                      @click="replaceShift(worker.id, day.number, 2, 720)"
                      href="#">
                      {{ worker.shortname }}
                    </b-dropdown-item>
                  </b-dropdown>
                </td>
              </tr>
              <tr>
                <td :class="{'special-color': day.shiftThree && day.shiftThree.specialColor}">
                  <b-dropdown variant="link" no-caret>
                    <template slot="button-content">
                      <template v-if="day.shiftThree">
                        {{ day.shiftThree.workerShortName }}
                      </template>
                      <template v-else>
                        &nbsp;
                      </template>
                    </template>
                    <b-dropdown-item @click="putSpecialColor(day.shiftThree.id)">
                      Zmień dlugość</b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item @click="removeShift(day, 3)">
                      Usuń</b-dropdown-item>
                    <b-dropdown-item @click="exclude(day, 3)">
                      X
                    </b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item
                      v-for="worker in workers"
                      :key="worker.id"
                      @click="replaceShift(worker.id, day.number, 3, 720)"
                      href="#">
                      {{ worker.shortname }}
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
                    <b-dropdown-item @click="removeShift(day, 4)">
                      USUN</b-dropdown-item>
                    <b-dropdown-item @click="exclude(day, 4)">
                      X
                    </b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item
                      v-for="worker in workers"
                      :key="worker.id"
                      @click="replaceShift(worker.id, day.number, 4, 720)"
                      href="#">
                      {{ worker.shortname }}
                    </b-dropdown-item>
                  </b-dropdown>
                </td>
              </tr>
              <tr>
                <td style="white-space: nowrap">{{ day.workersOnHoliday }}</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <h1></h1>
        <div class="worker-list-container">
          <ul class="worker-list">
            <worker-item v-for="item in workerList" :key="item.id" :worker="item" />
          </ul>
        </div>
    </div>
    <button @click="doCalc()">Uzupełnij miesiąc</button>
  </div>
</template>

<script>
import { Shifts, Workers, Months, Blocks } from '@/services'
import WorkerItem from './WorkerItem'
import PutHolidayModal from './PutHolidayModal'
import PostHolidayModal from './PostHolidayModal'
import PutOffsetModal from './PutOffsetModal'
import DeleteHolidayModal from './DeleteHolidayModal'

export default {
  components: {
    WorkerItem,
    PutHolidayModal,
    PostHolidayModal,
    PutOffsetModal,
    DeleteHolidayModal
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
      workerList: [],
      holidays: []
    }
  },
  methods: {
    async doCalc () {
      var responseAlgo = await Months.getAlgo(this.id)
        .then(resp => resp.data)
      if (!responseAlgo) {
        alert('Błąd algorytmu. Skontaktuj się z administratorem.')
        return
      }
      await Months.getMonth(this.id)
        .then(response => (this.monthContainer = response.data))
      this.importWorkers()
    },
    async putHoliday () {
      const workerList = await Months.getWorkersForMonth(this.id)
        .then(resp => resp.data)

      if (!workerList) return

      this.workerList = workerList

      await Months.getMonth(this.id)
        .then(response => (this.monthContainer = response.data))
      this.importWorkers()
    },
    async postHoliday () {
      await Months.getMonth(this.id)
        .then(response => (this.monthContainer = response.data))
      this.importWorkers()
      // const workerList = await Months.getWorkersForMonth(this.id)
      //   .then(resp => resp.data)

      // if (!workerList) return

      // this.workerList = workerList
    },
    async deleteHoliday () {
      await Months.getMonth(this.id)
        .then(response => (this.monthContainer = response.data))
      this.importWorkers()
      // const workerList = await Months.getWorkersForMonth(this.id)
      //   .then(resp => resp.data)

      // if (!workerList) return

      // this.workerList = workerList
    },
    async putOffset () {
      const workerList = await Months.getWorkersForMonth(this.id)
        .then(resp => resp.data)

      if (!workerList) return

      this.workerList = workerList
    },
    async exclude (day, whichTime) {
      const block = {
        day: day.number,
        whichTime: whichTime,
        monthId: this.id
      }
      var responseBlock = await Blocks.postBlock(block)
        .then(resp => resp.data)
      if (!responseBlock) {
        console.log('day null')
        return
      }
      if (responseBlock.whichTime === 1) {
        day.shiftOne = responseBlock
      }
      if (responseBlock.whichTime === 2) {
        day.shiftTwo = responseBlock
      }
      if (responseBlock.whichTime === 3) {
        day.shiftThree = responseBlock
      }
      if (responseBlock.whichTime === 4) {
        day.shiftFour = responseBlock
      }
      const workerList = await Months.getWorkersForMonth(this.id)
        .then(resp => resp.data)

      if (!workerList) return

      this.workerList = workerList
    },
    async removeShift (day, whichTime) {
      const shift = {
        day: day.number,
        whichTime: whichTime,
        monthId: this.id
      }
      var responseShifts = await Shifts.removeShift(shift)
        .then(resp => resp.data)
      if (!responseShifts) {
        console.log('day null')
        return
      }
      if (whichTime === 1) {
        day.shiftOne = null
      }
      if (whichTime === 2) {
        day.shiftTwo = null
      }
      if (whichTime === 3) {
        day.shiftThree = null
      }
      if (whichTime === 4) {
        day.shiftFour = null
      }
      const workerList = await Months.getWorkersForMonth(this.id)
        .then(resp => resp.data)

      if (!workerList) return

      this.workerList = workerList
    },
    async replaceShift (workerId, day, whichTime, minutes) {
      const worker = {
        workerId,
        day,
        whichTime,
        monthId: this.id,
        minutes
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

      const holidays = await Months.getHolidaysForMonth(this.id)
        .then(resp => resp.data)

      if (!holidays) return

      this.holidays = holidays
    },
    async putSpecialDay (day) {
      const todo1 = {
        day
      }
      await Months.putSpecialDay(this.id, todo1)
        .then(resp => resp.data)

      this.monthContainer.dayEntities[day - 1].special = !this.monthContainer.dayEntities[day - 1].special

      const workerList = await Months.getWorkersForMonth(this.id)
        .then(resp => resp.data)

      if (!workerList) return

      this.workerList = workerList
    },
    async putSpecialColor (shiftId) {
      var responseColor = await Shifts.putSpecialColor(shiftId)
        .then(resp => resp.data)
      if (!responseColor) {
        return
      }
      if (responseColor.whichTime === 2) {
        this.monthContainer.dayEntities[responseColor.day - 1].shiftTwo.specialColor = !this.monthContainer.dayEntities[responseColor.day - 1].shiftTwo.specialColor
      }
      if (responseColor.whichTime === 3) {
        this.monthContainer.dayEntities[responseColor.day - 1].shiftThree.specialColor = !this.monthContainer.dayEntities[responseColor.day - 1].shiftThree.specialColor
      }
      const workerList = await Months.getWorkersForMonth(this.id)
        .then(resp => resp.data)

      if (!workerList) return

      this.workerList = workerList
    }
  },
  async beforeMount () {
    await Months.getMonth(this.id)
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

.special-color{
  background: lightblue
}
</style>
