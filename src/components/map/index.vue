<script setup lang="ts">
import MapHead from "@/components/map/map-head.vue";
import mapboxgl from "mapbox-gl";
import { ref } from "vue";
import Map from "./map.vue";
import MapEdit from "./map-edit.vue";

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
  <t-layout class="container">
    <t-header>
      <MapHead />
    </t-header>
    <t-layout>
      <t-content>
        <Map ref="mapRef" @onLoad="onMapLoad" />
      </t-content>
      <t-aside class="aside">
        <MapEdit :map="mapInstance" @dataUpdate="dataUpdate" />
      </t-aside>
    </t-layout>
  </t-layout>
</template>

<style scoped lang="scss">
.container {
  height: 100vh;
  .aside {
    height: calc(100vh - 64px);
    width: unset;
    overflow: auto;
  }
}
</style>
