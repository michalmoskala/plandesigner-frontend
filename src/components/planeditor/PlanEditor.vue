<template>
  <div>
    <h1>Edycja planu</h1>
    <h2>{{ monthEntity.name }}</h2>
    <div class="plan-tables-container">
      <table>
        <tr>
          <td v-for="day in monthEntity.days" :key="day.number">
            <table class="day-table">
              <tr>
                <th :class="{'special-day': day.isSpecial}" >{{ day.number }}</th>
              </tr>
              <tr>
                <td>
                  <div v-if="day.shiftOne">
                    {{ day.shiftOne.workerShortname }}
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div v-if="day.shiftTwo">
                    {{ day.shiftTwo.workerShortname }}
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div v-if="day.shiftThree">
                    {{ day.shiftThree.workerShortname }}
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      monthEntity: {
        id: 1,
        name: 'luty',
        timestamp: 3,
        startingDay: 0,
        days: [
          {
            number: 1
          },
          {
            number: 2,
            isSpecial: true
          },
          {
            number: 3,
            shiftOne: {
              id: 2,
              workerId: 3,
              workerShortname: 'Dzban',
              monthId: 1,
              day: 1,
              whichTime: 1,
              minutes: 720
            },
            shiftThree: {
              id: 3,
              workerId: 8,
              monthId: 1,
              workerShortname: 'Janurz',
              day: 2,
              whichTime: 1,
              minutes: 720
            }
          }
        ]
      }
    }
  },
  mounted () {
    alert('Oł yeahs')
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
