<script setup lang="ts">
import mapboxgl from 'mapbox-gl'
import { defineEmits, defineExpose, onMounted, ref } from 'vue'
import test1 from '../../assets/mapbox/style/test1'
import tileStyle from '../../assets/mapbox/style/tileStyle'
import darkDemo from '../../assets/mapbox/style/darkDemo'
import dark from '../../assets/mapbox/style/dark.json'
import epathMapEdit from '../../assets/mapbox/style/epath-map-edit.json'
import sanl from '../../assets/mapbox/style/sanl.json'

window.mapboxgl.accessToken =
  'pk.eyJ1IjoibGF5b3V3ZW4iLCJhIjoiY2t1bmR0b3M4MmliNjMxdDQweW9yaDJjNyJ9.HuBR7pZ_hqagzwEGOuBROg'

const mapWrapperEl = ref()
const mapEl = ref<HTMLDivElement>()
const map = ref<mapboxgl.Map>()

const resize = () => {
  if (!mapEl.value) return
  const mapCanvas = document.querySelector('#map')?.querySelector('.mapboxgl-canvas')
  if (mapCanvas) {
    const _mapCanvas = mapCanvas as unknown as HTMLCanvasElement
    _mapCanvas.style.width = 0 + 'px'
    _mapCanvas.style.height = 0 + 'px'
    mapEl.value.style.width = 0 + 'px'
    mapEl.value.style.height = 0 + 'px'

    const { clientWidth, clientHeight } = mapWrapperEl.value
    mapEl.value.style.width = clientWidth - 10 + 'px'
    mapEl.value.style.height = clientHeight - 10 + 'px'
    map.value?.resize()
  }
}

const emit = defineEmits(['onLoad'])

const initMap = () => {
  const instance = new window.mapboxgl.Map({
    center: [117.28623176722033, 31.809284302028345],
    zoom: 18,
    container: 'map',
    // style: darkDemo as any,
    // style: dark as any,
    // style: test1 as any,
    // style: epathMapEdit as any,
    style: sanl as any,
    // style: tileStyle as any,
  })
  // @ts-ignore
  window.map = instance
  map.value = instance
  instance.on('load', () => {
    document.querySelector('.mapboxgl-control-container')?.remove()
    emit('onLoad', instance)
  })
}

onMounted(() => {
  resize()
  initMap()
})

defineExpose({
  resize,
})
</script>

<template>
  <div class="map-wrapper" ref="mapWrapperEl">
    <div ref="mapEl" id="map"></div>
  </div>
</template>

<style scoped>
.map-wrapper {
  height: 100%;
  width: 100%;
}
</style>
