<script setup lang="ts">
import {ref, onMounted, watch, computed, nextTick} from 'vue';
import {ColorButton, ColorFileUpload} from './common';
import PixelImage from './PixelImage.vue';
import {BaseFile} from '../types';

const noImage = ref(true);
const width = ref(0);
const height = ref(0);
const title = ref('');
const img = new Image();
const canvasRef = ref<HTMLCanvasElement | null>(null);

const createImage = () => {
  img.onload = async () => {
    const canvas = canvasRef.value as HTMLCanvasElement;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    width.value = img.naturalWidth;
    height.value = img.naturalHeight;

    renderImage();
  };

  img.onerror = err => {
    console.error(err);
  };
};

const renderImage = () => {
  const canvas = canvasRef.value as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.drawImage(img, 0, 0);
};

const convert = (imageData: ImageData) => {
  const {data} = imageData;
  const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
  return rgba;
};

const computedData = (x: number, y: number) => {
  const canvas = canvasRef.value as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const imageData = ctx.getImageData(x, y, 1, 1);
  return convert(imageData);
};

const mousemove = (event: MouseEvent) => {
//   const {clientX, clientY, offsetX, offsetY} = event;
//   console.log(clientX, clientY, offsetX, offsetY);

  // 添加浮层

  const color = pickColor(event);
  console.log('mousemove: ', color);
};

const click = (event: MouseEvent) => {
  const color = pickColor(event);
  console.log('click: ', color);
};

const pickColor = (event: MouseEvent) => {
  const {offsetX, offsetY} = event;
  if (offsetX < 0 || offsetY < 0) {
    return;
  }
  return computedData(offsetX, offsetY);
};

const fileChange = ({name, base64}: BaseFile) => {
  noImage.value = false;
  title.value = name;
  img.src = base64;
};

const reset = async () => {
  await nextTick(); // TODO check 是否移除
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
      <canvas
        ref="canvasRef"
        @mousemove="mousemove"
        @click="click"
      />
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
    flex: 1;
    position: relative;
    height: 100%;
    padding: 10px;
    background-color: #fff;
    border-radius: 3px;
    overflow: hidden;
  }
  &-wraper {
    overflow: auto;
  }
  &-footer {
    height: 64px;
    flex-shrink: 0;
    .flex-center();

    .color-button {
      width: 130px;
    }
  }
}
</style>
