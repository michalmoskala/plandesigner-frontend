import Vue from 'vue'
import Router from 'vue-router'

import MonthSelect from '@/components/monthselect/MonthSelect'
import PlanEditor from '@/components/planeditor/PlanEditor'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: MonthSelect
    },
    {
      name: 'planeditor',
      path: '/planeditor/:id',
      component: PlanEditor,
      props: true
    }
  ]
})
