<script setup lang="ts">
import mapboxgl, { AnyLayer } from 'mapbox-gl';
import { defineProps, ref, watch } from 'vue';
import MapEditModal from './map-edit-modal.vue';

const props = defineProps<{
  map?: mapboxgl.Map,
}>();
const emit = defineEmits(['dataUpdate']);


const layers = ref<mapboxgl.AnyLayer[]>([]);
const deleteLayerLayersId = ref<string[]>([]);
watch(() => props.map, () => {
  const map = props.map;
  if (!map) return;
  const style = map.getStyle();
  layers.value = style.layers;
  emit('dataUpdate');
});

const onLayerItem = (layer: AnyLayer) => {
  selectLayerData.value = {...layer};
};

const onDisplayLayer = (layer: AnyLayer) => {
  const map = props.map!;
  if (isVisible(layer.id)) {
    map.setLayoutProperty(layer.id, 'visibility', 'none');
  } else {
    map.setLayoutProperty(layer.id, 'visibility', 'visible');
  }
};

const onDeleteLayer = (layer: AnyLayer) => {
  if (deleteLayerLayersId.value.includes(layer.id)) {
    deleteLayerLayersId.value = deleteLayerLayersId.value.filter(id => id !== layer.id);
  } else {
    deleteLayerLayersId.value.push(layer.id);
  }
};

const refreshLayer = () => {
  const map = props.map!;
  const style = map.getStyle();
  style.layers = style.layers.map((layer) => {
    return layer;
  });
  map.setStyle(style);
};

const isVisible = (id: string) => {
  const map = props.map!;
  const visible = map.getLayoutProperty(id, 'visibility');
  return visible === 'visible' || visible === undefined;
};

const displayName = (id: string) => {
  return isVisible(id) ? '隐藏' : '显示';
};

const selectLayerData = ref();

const onClose = () => {
  selectLayerData.value = null;
};

const onFieldUpdate = ({field, value}: { field: string, value: any }) => {
  selectLayerData.value[field] = value;
};

</script>

<template>
  <div class="map-edit">
    <div
      class="layer-item"
      :class="{'un-active': !isVisible(layer.id) }"
      @click="onLayerItem(layer)"
      v-for="layer in layers"
    >
      <span class="name">{{ layer.id }}</span>
      <button @click.stop="onDisplayLayer(layer)">{{ displayName(layer.id) }}</button>
      <button @click.stop="onDeleteLayer">删除</button>
    </div>
  </div>
  <MapEditModal v-if="!!selectLayerData" :data="selectLayerData" @onClose="onClose" @onFieldUpdate="onFieldUpdate" />
</template>

<style scoped lang="scss">
.map-edit {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  overflow: auto;
  > .layer-item {
    padding: 4px 10px;
    display: flex;
    cursor: pointer;
    background: azure;
    &:hover {
      background: aqua;
    }
    &.un-active {
      background: antiquewhite;
      > .name {
        text-decoration: line-through;
      }
    }
    > .name {
      flex-grow: 1;
    }
  }
}
</style>
