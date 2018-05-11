import Vue from 'vue'
import Router from 'vue-router';
import Home from './Home.vue';
import MainArea from './MainArea.vue';




Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/MainArea',
      name: 'MainArea',
      component: MainArea
    }
  ]
})
