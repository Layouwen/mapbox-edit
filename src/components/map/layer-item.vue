<script setup lang="ts">
import { Identifier, XYCoord } from "dnd-core";
import { defineProps, ref } from "vue";
import { useDrag, useDrop } from "vue3-dnd";

const props = defineProps<{
  data: any;
  index: number;
  move: (start: number, end: number) => void;
}>();

const card = ref<HTMLDivElement>();

const ItemTypes = {
  CARD: "card",
};

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const [dropCollect, drop] = useDrop<
  DragItem,
  void,
  { handlerId: Identifier | null }
>({
  accept: ItemTypes.CARD,
  collect(monitor: any) {
    return {
      handlerId: monitor.getHandlerId(),
    };
  },
  hover(item: DragItem, monitor: any) {
    if (!card.value) {
      return;
    }
    const dragIndex = item.index;
    const hoverIndex = props.index;
    if (dragIndex === hoverIndex) {
      return;
    }

    const hoverBoundingRect = card.value?.getBoundingClientRect();

    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    const clientOffset = monitor.getClientOffset();

    const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    props.move(dragIndex, hoverIndex);

    item.index = hoverIndex;
  },
});

const [, drag] = useDrag({
  type: ItemTypes.CARD,
  item: { ...props.data, index: props.index },
  collect: (monitor: any) => ({ isDragging: monitor.isDragging() }),
});

const setRef = (el: HTMLDivElement) => {
  card.value = drag(drop(el)) as HTMLDivElement;
};
</script>

<template>
  <div
    class="layer-item"
    :ref="setRef"
    :data-handler-id="dropCollect.handlerId"
  >
    <span class="name">{{ data.id }}</span>
    <slot name="btn"></slot>
  </div>
</template>

<style lang="scss" scoped>
.layer-item {
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
</style>
