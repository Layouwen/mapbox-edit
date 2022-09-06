<script setup lang="ts">
import mapboxgl from "mapbox-gl";
import { defineProps, ref, watch } from "vue";

const props = defineProps<{ map?: mapboxgl.Map }>();

const lngLat = ref<mapboxgl.LngLat>();
const isGetLngLat = ref(false);

watch(
  () => props.map,
  () => {
    const map = props.map;
    if (!map) return;
    map.on("mousemove", (e) => {
      if (isGetLngLat.value) {
        lngLat.value = e.lngLat;
      }
    });
    map.on("mousedown", (e) => {
      if (isGetLngLat.value) {
        isGetLngLat.value = false;
      }
    });
  }
);

const getLngLat = () => {
  isGetLngLat.value = true;
};
</script>
<template>
  <div class="h-full flex items-center">
    <t-button @click="getLngLat"
      >{{ isGetLngLat ? "获取中" : "获取坐标" }}
    </t-button>
    <div>
      <div>lng：{{ lngLat?.lat || 0 }}</div>
      <div>lat：{{ lngLat?.lng || 0 }}</div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
