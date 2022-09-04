<script setup lang="ts">
import { systemLog } from "@/utils";
import mapboxgl, { AnyLayer, Layer } from "mapbox-gl";
import { defineProps, ref, watch } from "vue";
import MapEditModal from "./map-edit-modal";

const props = defineProps<{ map?: mapboxgl.Map }>();
const emit = defineEmits(["dataUpdate"]);

const sources = ref<mapboxgl.Sources>({});
const layers = ref<Layer[]>([]);
const deleteLayerLayersId = ref<string[]>([]);

watch(
  () => props.map,
  () => {
    init();
    emit("dataUpdate");
  }
);

const sourceIdToLayerGroupMap = ref<Map<string, Layer[]>>(new Map());

const clearData = () => {
  sourceIdToLayerGroupMap.value.clear();
};

const initSourceIdToLayerGroupMap = (map: mapboxgl.Map) => {
  clearData();
  const { layers } = map.getStyle();
  for (const layer of layers as Layer[]) {
    const sourceId = layer.source as string;
    const group = sourceIdToLayerGroupMap.value.get(sourceId);
    if (group) {
      group.push(layer);
    } else {
      const _group = [] as Layer[];
      _group.push(layer);
      sourceIdToLayerGroupMap.value.set(sourceId, _group);
    }
  }
  systemLog("sourceIdToLayerGroupMap init", sourceIdToLayerGroupMap.value);
};

const init = () => {
  const map = props.map;
  if (!map) return;
  initSourceIdToLayerGroupMap(map);
  initLayersAndSources(map);
};

const initLayersAndSources = (map: mapboxgl.Map) => {
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

const _refreshLayer = (overflow = false) => {
  const map = props.map!;
  const style = map.getStyle();
  style.layers = style.layers.map((layer) => {
    return layer;
  });
  if (overflow) {
    style.layers = layers.value as any;
  }
  map.setStyle(style);
};

const refreshLayer = () => {
  _refreshLayer();
};

const refreshLayerByLayers = () => {
  _refreshLayer(true);
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

const moveLayer = (layer: Layer, action = MoveLayerAction.UP) => {
  const index = layers.value.findIndex((l) => l.id === layer.id);
  const temp = layers.value[index];
  switch (action) {
    case MoveLayerAction.UP:
      if (index === 0) return;
      layers.value[index] = layers.value[index - 1];
      layers.value[index - 1] = temp;
      break;
    case MoveLayerAction.DOWN:
      if (index === layers.value.length - 1) return;
      layers.value[index] = layers.value[index + 1];
      layers.value[index + 1] = temp;
      break;
    default:
      console.error("MoveLayerAction unknown action");
  }
  refreshLayerByLayers();
};

const onLayerToUp = (layer: Layer) => {
  moveLayer(layer, MoveLayerAction.UP);
};

const onLayerToDown = (layer: Layer) => {
  moveLayer(layer, MoveLayerAction.DOWN);
};

enum MoveLayerAction {
  UP,
  DOWN,
}
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
        <button @click.stop="onLayerToUp(layer)">向上</button>
        <button @click.stop="onLayerToDown(layer)">向下</button>
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
