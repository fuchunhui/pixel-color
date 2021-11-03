<script setup lang="ts">
import {computed, toRefs, inject} from 'vue';

const props = defineProps<{
  color: string
}>();

const emit = defineEmits(['change']);

</script>

<template>
  <div class="property">
    123
  </div>
</template>

<style lang="less">
.property {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 10px;

  &-max,
  &-size,
  &-color,
  &-text {
    width: 100px;
    height: 30px;
    background: #FFFFFF;
    border: 1px solid #DDDEE4;
    margin-right: 10px;
  }
  &-text {
    width: 120px;
  }
  .meme-radio {
    margin-right: 8px;
  }
  .property-color {
    margin-right: 2px;
  }
  .meme-button {
    margin-right: 10px;
  }
}
</style>
