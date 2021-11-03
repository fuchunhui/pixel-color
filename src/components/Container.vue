<script setup lang="ts">
import {ref, onMounted, watch, computed, nextTick} from 'vue';
import {ColorButton, ColorFileUpload} from './common';
import {BaseFile} from '../types';

const noImage = ref(true);
const width = ref(0);
const height = ref(0);
const title = ref('');
const img = new Image();
const canvas = document.createElement('canvas');
const uint8 = ref<Uint8ClampedArray | null>();

const createImage = () => {
  img.onload = async () => {
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    width.value = canvas.width;
    height.value = canvas.height;

    computedData();
  };

  img.onerror = err => {
    console.error(err);
  };
};

const computedData = () => {
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.drawImage(img, 0, 0);
  const rgba = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight).data;
  uint8.value = rgba;
};

const fileChange = ({name, base64}: BaseFile) => {
  title.value = name;
  img.src = base64;
};

watch(uint8, (nv) => {
  if (noImage.value) {
    noImage.value = false;
    console.log(uint8.value);
  }
});

const reset = async () => {
  uint8.value = new Uint8ClampedArray();
  await nextTick();
  noImage.value = true;
  title.value = '';
  width.value = 0;
  height.value = 0;
};

const localTitle = computed(() => {
  return noImage.value
    ? '整一张图片上来吧'
    : `${title.value} ${width.value} * ${height.value}`;  // width height color 占比
});

onMounted(() => {
  createImage();
});

</script>

<template>
  <div class="container">
    <div class="container-header">
      {{ localTitle }}
    </div>
    <div class="container-wall" v-if="noImage">
      <color-file-upload @change="fileChange"/>
    </div>
    <div class="container-wraper" v-else>
      <canvas class="container-canvas" ref="canvasRef"/>
    </div>
    <footer class="container-footer">
      <color-button label="重置" u="primary" @click="reset"/>
    </footer>
  </div>
</template>

<style lang="less">
@import url('src/assets/css/mixins.less');

.container {
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  &-header {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    width: 100%;
    height: 46px;
    padding-left: 10px;
    margin: 0 -1px 6px;
    background-color: #fff;
    border: 1px solid #dddee4;
    border-radius: 4px;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%);
    font-size: 16px;
    color: #3f3f3f;
    font-weight: 500;
  }
  &-wraper,
  &-wall {
    position: relative;
    height: 100%;
    padding: 10px;
    background-color: #fff;
    border-radius: 3px;
    overflow: hidden;
  }
  &-footer {
    height: 64px;
    .flex-center();

    .color-button {
      width: 130px;
    }
  }
}
</style>
