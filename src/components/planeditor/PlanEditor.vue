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
                  <div v-if="day.shiftOne">
                    {{ day.shiftOne.workerId }}
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div v-if="day.shiftTwo">
                    {{ day.shiftTwo.workerId }}
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div v-if="day.shiftThree">
                    {{ day.shiftThree.workerId }}
                   </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div v-if="day.shiftFour">
                    {{ day.shiftFour.workerId }}
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
      monthContainer: {
        monthEntity: {
          id: 1,
          name: 'luty',
          timestamp: 3,
          startingDay: 0,
          days: 31
        },
        dayEntities: [
          {
            number: 1
          },
          {
            number: 2,
            shiftOne: {
              id: 3,
              workerId: 8,
              monthId: 1,
              day: 2,
              whichTime: 1,
              minutes: 720
            },
            shiftTwo: null,
            shiftThree: null,
            shiftFour: null,
            special: true
          },
          {
            number: 3,
            shiftOne: {
              id: 2,
              workerId: 3,
              workerShortname: 'Dzan',
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
              whichTime: 3,
              minutes: 720
            },
            shiftFour: {
              id: 4,
              workerId: '1',
              workerShortname: 'pizda',
              monthId: 1,
              day: 4,
              whichTime: 4,
              minutes: 720
            }
          }
        ]
      }
    }
  },
  beforeMount () {
    this.$http.get('http://localhost:8069/months/1')
      .then(response => (this.monthContainer = response))
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
