<template>
<div>
  <div id="cesiumContainer" style="height: 500px">
  </div>
  <p>经度:{{lng}}</p>
  <p>纬度:{{lat}}</p>
  <p>高度:{{height}}</p>
</div>
</template>
<script>
import Cesium from 'cesium/Cesium'
import 'cesium/Widgets/widgets.css'

export default {
  data () {
    return {
      CesiumOption: {
        // 需要进行可视化的数据源的集合
        animation: false, // 是否显示动画控件
        homeButton: false, // 是否显示Home按钮
        fullscreenButton: false, // 是否显示全屏按钮
        baseLayerPicker: true, // 是否显示图层选择控件
        geocoder: false, // 是否显示地名查找控件
        timeline: false, // 是否显示时间线控件
        sceneModePicker: false, // 是否显示投影方式控件
        navigationHelpButton: false, // 是否显示帮助信息控件
        infoBox: false // 是否显示点击要素之后显示的信息
        // imageryProvider: ''
      },
      viewer: '',
      lat: '',
      lng: '',
      height: ''
    }
  },
  methods: {
    initCesium () {
    /* eslint-disable no-new */
      this.viewer = new Cesium.Viewer('cesiumContainer', this.CesiumOption)
    },
    // 获得二维坐标
    getAddress () {
      let _this = this
      var canvas = this.viewer.scene.canvas
      var ellipsoid = this.viewer.scene.globe.ellipsoid
      var handler = new Cesium.ScreenSpaceEventHandler(canvas)
      handler.setInputAction(function (movement) {
        // 捕获椭球体，将笛卡尔二维平面坐标转为椭球体的笛卡尔三维坐标，返回球体表面的点
        var cartesian = _this.viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid)
        if (cartesian) {
          // 将笛卡尔三维坐标转为地图坐标（弧度）
          var cartographic = _this.viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian)
          // 将地图坐标（弧度）转为十进制的度数
          _this.lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(4)
          _this.lng = Cesium.Math.toDegrees(cartographic.longitude).toFixed(4)
          _this.height = (_this.viewer.camera.positionCartographic.height / 1000).toFixed(2)
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
      handler.setInputAction(function (wheelment) {
        _this.height = Math.ceil(_this.viewer.camera.positionCartographic.height)
      }, Cesium.ScreenSpaceEventType.WHEEL)
    }
  },
  mounted () {
    this.initCesium()
    this.getAddress()
    // this.imageryProvider = new Cesium.ArcGisMapServerImageryProvider({
    //   // url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
    // })
  }
}
</script>
<style>
#cesiumContainer .cesium-viewer-bottom{
  display: none  !important
}
</style>
