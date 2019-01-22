import Vue from 'vue'
import App from './App'
import router from './router'
// import Cesium from 'cesium/Cesium'
// import 'cesium/Widgets/widgets.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>',
  mounted () {
    // var viewer = new Cesium.CesiumWidget('cesiumContainer')
    // new Cesium.Viewer('cesiumContainer')
  }
})
