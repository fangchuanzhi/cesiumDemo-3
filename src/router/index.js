import Vue from 'vue'
import Router from 'vue-router'
import cesiumViewer from '@/components/cesiumViewer'
import Cesium from '@/page/Cesium'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/cesiumViewer',
      name: 'cesiumViewer',
      component: cesiumViewer
    },
    {
      path: '/',
      name: 'Cesium',
      component: Cesium
    }
  ]
})
