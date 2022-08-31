<script setup lang="ts">
import { onMounted, defineProps, defineEmits, ref } from "vue";
import prettier from "https://unpkg.com/prettier@2.6.0/esm/standalone.mjs";
import plugin from "https://unpkg.com/prettier@2.6.0/esm/parser-yaml.mjs";

const props = defineProps<{
  data: {};
}>();
const emit = defineEmits(["onClose", "onSave", "onFieldUpdate"]);

const keepField = ref<string[]>([]);
const showField = ref<string[]>([]);

onMounted(() => {
  const data = props.data;
  keepField.value = ["id"];
  showField.value = Object.keys(data).filter(
    (key) => !keepField.value.includes(key)
  );
});

const onSave = () => {
  emit("onSave");
};

const onClose = () => {
  emit("onClose");
};

const onInputFieldObject = (e: InputEvent, field: string) => {
  const t = e.target as HTMLTextAreaElement;
  try {
    console.log(t.value);
    const value = JSON.parse(t.value);
    emit("onFieldUpdate", { field, value });
  } catch (e) {
    console.log(2);
  }
};

const formatJSON = (s: string) => {
  return prettier.format(s, {
    parser: "yaml",
    plugins: [plugin],
  });
};
</script>

<template>
  <div class="map-edit-modal-wrapper" @click="onClose">
    <div class="map-edit-modal" @click.stop>
      <div>
        <div class="field-item" v-for="field in keepField">
          <div class="key-name">{{ field }}:</div>
          <div>{{ data[field] }}</div>
        </div>
        <div class="field-item" v-for="field in showField">
          <div class="key-name">{{ field }}:</div>
          <input v-if="typeof data[field] === 'string'" v-model="data[field]" />
          <input v-if="typeof data[field] === 'number'" v-model="data[field]" />
          <div class="field-item-object" v-if="typeof data[field] === 'object'">
            <div v-for="(val, key) of data[field]">
              <span>{{ key }}</span>
              <input type="text" v-model="data[field][key]" />
            </div>
          </div>
        </div>
      </div>
      <div class="btn-con">
        <button @click="onSave">保存</button>
        <button @click="onClose">关闭</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.map-edit-modal-wrapper {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  .map-edit-modal {
    min-width: 300px;
    min-height: 600px;
    background: #fff;
    position: absolute;
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
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>
