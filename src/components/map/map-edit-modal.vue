<script setup lang="ts">
import { onMounted, defineProps, defineEmits, ref } from 'vue';
import prettier from 'https://unpkg.com/prettier@2.6.0/esm/standalone.mjs';
import plugin from 'https://unpkg.com/prettier@2.6.0/esm/parser-yaml.mjs';

const props = defineProps<{
  data: {}
}>();
const emit = defineEmits(['onClose', 'onFieldUpdate']);

const keepField = ref<string[]>([]);
const showField = ref<string[]>([]);

onMounted(() => {
  const data = props.data;
  keepField.value = ['id'];
  showField.value = Object.keys(data).filter(key => !keepField.value.includes(key));
});

const onClose = () => {
  emit('onClose');
};

const onInputFieldObject = (e: InputEvent, field) => {
  const t = e.target as HTMLTextAreaElement;
  try {
    console.log(t.value);
    const value = JSON.parse(t.value);
    console.log('1', value);
    emit('onFieldUpdate', {field, value});
  } catch (e) {
    console.log(2);
  }
};

const formatJSON = (s: string) => {
  return prettier.format(s, {
    parser: 'yaml',
    plugins: [plugin],
  });
};
</script>

<template>
  <div class="map-edit-modal">
    <div>
      <div class="field-item" v-for="field in keepField">
        <div class="key-name">{{ field }}:</div>
        <div>{{ data[field] }}</div>
      </div>
      <div class="field-item" v-for="field in showField">
        <div class="key-name">{{ field }}:</div>
        <input v-if="typeof data[field] === 'string'" v-model="data[field]" />
        <input v-if="typeof data[field] === 'number'" v-model="data[field]" />
        <textarea
          class="field-item-object"
          v-if="typeof data[field] === 'object'"
          :value="formatJSON(JSON.stringify(data[field]))"
          @input="(e)=>onInputFieldObject(e, field)"
        />
      </div>
    </div>
    <div class="btn-con">
      <button>保存</button>
      <button @click="onClose">关闭</button>
    </div>
  </div>
</template>

<style lang="scss">
.map-edit-modal {
  min-width: 300px;
  min-height: 600px;
  background: #fff;
  position: fixed;
  right: 10%;
  top: 50%;
  transform: translateY(-50%);
  .field-item {
    display: flex;
    padding: 5px 10px;
    > .key-name {
      min-width: 100px;
      margin-right: 1em;
    }
    .field-item-object {
      height: 200px;
    }
  }
}
</style>
