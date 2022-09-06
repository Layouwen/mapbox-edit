<script setup lang="ts">
import Map from "@/components/map";
import LayerItem from "@/components/map/layer-item.vue";
import { ref } from "vue";
import { DndProvider } from "vue3-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const layers = ref([
  {
    id: "1",
    source: "s-1",
  },
  {
    id: "2",
    source: "s-2",
  },
  {
    id: "3",
    source: "s-3",
  },
  {
    id: "4",
    source: "s-4",
  },
  {
    id: "5",
    source: "s-5",
  },
]);

const move = (start: number | undefined, end: number) => {
  if (start === undefined) return;
  const item = layers.value[start];
  layers.value.splice(start, 1);
  layers.value.splice(end, 0, item);
};
</script>

<template>
  <!--  <Map />-->
  <DndProvider :backend="HTML5Backend">
    <LayerItem
      v-for="(layer, index) in layers"
      :data="layer"
      :key="layer.id"
      :index="index"
      :move="move"
    />
  </DndProvider>
</template>

<style scoped></style>
