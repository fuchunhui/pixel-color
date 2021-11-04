<script setup lang="ts">
import {ref, onMounted, toRefs, watch, computed, nextTick} from 'vue';

const props = defineProps<{
  uint8: Uint8ClampedArray,
  width: number,
  height: number
}>();

const emit = defineEmits(['click']);

const {uint8, width, height} = toRefs(props);

onMounted(() => {
  console.log('data: ', props.uint8);
});

const SCALE = 2;

// const width = ref(400);
// const height = ref(200);

let list = new Array(width.value * height.value);
list = list.fill('').map(item => '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16));

console.log(list)
</script>

<template>
  <div
    class="pixel"
    :style="{
      width: `${width * SCALE}px`,
      height: `${height * SCALE}px`
    }">
    <!-- <div
      v-for="(item, index) in list"
      :key="index"
      class="pixel-cell"
      :style="{
        backgroundColor: item
      }"
    /> -->
  </div>
</template>

<style lang="less">
.pixel {
  display: flex;
  flex-wrap: wrap;
  &-cell {
    display: block;
    width: 2px;
    height: 2px;
  }
}
</style>