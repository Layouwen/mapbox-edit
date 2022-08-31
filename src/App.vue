<script setup lang="ts">
import mapboxgl from 'mapbox-gl';
import { ref } from 'vue';
import Map from './components/map/index.vue';
import MapEdit from './components/map/map-edit.vue';

const mapInstance = ref<mapboxgl.Map>();
const mapRef = ref();
const onMapLoad = (map: mapboxgl.Map) => {
  mapInstance.value = map;
};

const dataUpdate = () => {
  setTimeout(() => {
    mapRef.value.resize();
  });
};


</script>

<template>
  <div class="container">
    <Map ref="mapRef" @onLoad="onMapLoad" />
    <MapEdit :map="mapInstance" @dataUpdate="dataUpdate" />
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
}
</style>
