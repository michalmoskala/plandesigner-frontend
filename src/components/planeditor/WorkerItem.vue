<template>
  <li>
    <h6>{{ worker.name + " " + worker.shortname + '-----' +
     'W sumie: ' + ~~(worker.minutes/60) + ':' + worker.minutes%60 +' | '+
     'Czas pracy: ' + ~~((worker.workedMinutes+worker.daysOnHoliday*455)/60) + ':' + (worker.workedMinutes+worker.daysOnHoliday*455)%60 +' | '+
     'W dniach specjalnych: ' + ~~(worker.weekendMinutes/60) + ':' + worker.weekendMinutes%60 +' | ' +
      'Offset: ' + ~~(worker.offsetMinutes/60) + ':' + worker.offsetMinutes%60 +' | '+
       'Dni na urlopie: ' + worker.daysOnHoliday + " ("+ 'W godzinach:' + ~~((worker.daysOnHoliday*455)/60) + ':' + ((worker.daysOnHoliday*455)%60) + ")" }} </h6>
  </li>
</template>

<script>
export default {
  props: {
    worker: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
li {
  background: #FFE5B4;
  margin: 8px;
  padding: 8px;
}
</style>
