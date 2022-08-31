<script setup lang="ts">
import mapboxgl, { AnyLayer, Layer } from "mapbox-gl";
import { defineProps, ref, watch } from "vue";
import MapEditModal from "./map-edit-modal.vue";

const props = defineProps<{ map?: mapboxgl.Map }>();
const emit = defineEmits(["dataUpdate"]);

const sources = ref<mapboxgl.Sources>({});
const layers = ref<Layer[]>([]);
const deleteLayerLayersId = ref<string[]>([]);

watch(
  () => props.map,
  () => {
    updateLayersAndSources();
    emit("dataUpdate");
  }
);

const updateLayersAndSources = () => {
  const map = props.map;
  if (!map) return;
  const style = map.getStyle();
  layers.value = style.layers;
  sources.value = style.sources;
};

const onLayerItem = (layer: Layer) => {
  selectLayerData.value = { ...layer };
};

const onDisplayLayer = (layer: Layer) => {
  const map = props.map!;
  if (isVisible(layer.id)) {
    map.setLayoutProperty(layer.id, "visibility", "none");
  } else {
    map.setLayoutProperty(layer.id, "visibility", "visible");
  }
};

const onDeleteLayer = (layer: AnyLayer) => {
  if (deleteLayerLayersId.value.includes(layer.id)) {
    deleteLayerLayersId.value = deleteLayerLayersId.value.filter(
      (id) => id !== layer.id
    );
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
  const visible = map.getLayoutProperty(id, "visibility");
  return visible === "visible" || visible === undefined;
};

const displayName = (id: string) => {
  return isVisible(id) ? "隐藏" : "显示";
};

const selectLayerData = ref();

const onSave = () => {
  const map = props.map!;
  const style = map.getStyle();
  const index = style.layers.findIndex(
    (l) => l.id === selectLayerData.value.id
  );
  style.layers[index] = selectLayerData.value;
  map.setStyle(style);
};

const onClose = () => {
  selectLayerData.value = null;
};

const onFieldUpdate = ({ field, value }: { field: string; value: any }) => {
  selectLayerData.value[field] = value;
};

const onDisplaySource = (sourceName: string) => {
  const map = props.map!;
  const value = isAllVisible(sourceName) ? "none" : "visible";
  layers.value.forEach((layer) => {
    if (layer.source === sourceName) {
      map.setLayoutProperty(layer.id, "visibility", value);
    }
  });
};

const isAllVisible = (sourceName: string) => {
  return layers.value
    .filter((layer) => layer.source === sourceName)
    .every((layer) => isVisible(layer.id));
};

const sourceDisplayText = (sourceName: string) => {
  return isAllVisible(sourceName) ? "隐藏" : "显示";
};
</script>

<template>
  <div class="map-edit">
    <div>source</div>
    <div class="source-item-wrapper">
      <div v-for="source in Object.keys(sources)" :key="source">
        <span>{{ source }}</span>
        <button @click="onDisplaySource(source)">
          {{ sourceDisplayText(source) }}
        </button>
      </div>
    </div>
    <div>layers</div>
    <div class="layer-item-wrapper">
      <div
        class="layer-item"
        :class="{ 'un-active': !isVisible(layer.id) }"
        @click="onLayerItem(layer)"
        v-for="layer in layers"
      >
        <span class="name">{{ layer.id }}</span>
        <button @click.stop="onDisplayLayer(layer)">
          {{ displayName(layer.id) }}
        </button>
        <button @click.stop="onDeleteLayer">删除</button>
      </div>
    </div>
    <MapEditModal
      v-if="!!selectLayerData"
      :data="selectLayerData"
      @onSave="onSave"
      @onClose="onClose"
      @onFieldUpdate="onFieldUpdate"
    />
  </div>
</template>

<style scoped lang="scss">
.map-edit {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  > .layer-item-wrapper {
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
}
</style>
