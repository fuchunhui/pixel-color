<script setup lang="ts">
import {ref, onMounted, computed, watch} from 'vue';
import {ColorButton, ColorFileUpload} from './common';
import {BaseFile} from '../types';

const noImage = ref(true);
const width = ref(0);
const height = ref(0);
const title = ref('');
const img = new Image();
const canvasRef = ref<HTMLCanvasElement | null>(null);
const showLayer = ref(false);
const layerRef = ref<HTMLCanvasElement | null>(null);
const hoverColor = ref('#3F3F3F');
const activeColor = ref('#3F3F3F');
const showHEX = ref(false);

const DW = 100;
const DH = 100;
const OFFSET = 5;

const createImage = () => {
  img.onload = () => {
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
  const {0: r, 1: g, 2: b, 3: a} = imageData.data;
  return `rgba(${r}, ${g}, ${b}, ${a / 255})`;
};

const hexConvert = (imageData: ImageData) => {
  const hex = (num: number) => num.toString(16);
  const {0: r, 1: g, 2: b, 3: a} = imageData.data;
  return `#${hex(r)}${hex(g)}${hex(b)}${hex(a)}`.toUpperCase();
};

const mousemove = async (event: MouseEvent) => {
  const {offsetX, offsetY} = event;
  if (offsetX < 0 || offsetY < 0) {
    return;
  }

  showLayer.value = true;
  drawLayer(offsetX, offsetY);

  const color = computedData(offsetX, offsetY);
  hoverColor.value = color;
};

const drawLayer = (x: number, y: number) => {
  const canvas = canvasRef.value as HTMLCanvasElement;
  const targetCanvas = layerRef.value as HTMLCanvasElement;
  targetCanvas.style.left = `${x + OFFSET}px`;
  targetCanvas.style.top = `${y + OFFSET}px`;

  const ctx = targetCanvas.getContext('2d') as CanvasRenderingContext2D;
  const sx = Math.min(Math.max(0, x - 5), canvas.width - 10);
  const sy = Math.min(Math.max(0, y - 5), canvas.height - 10);
  ctx.drawImage(canvas, sx, sy, 10, 10, 0, 0, DW, DH);
};

const mouseleave = () => {
  showLayer.value = false;
  hoverColor.value = '#3F3F3F';
};

const click = (event: MouseEvent) => {
  const {offsetX, offsetY} = event;
  if (offsetX < 0 || offsetY < 0) {
    return;
  }

  const color = computedData(offsetX, offsetY);
  activeColor.value = color;
};

const computedData = (x: number, y: number) => {
  const canvas = canvasRef.value as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const imageData = ctx.getImageData(x, y, 1, 1);
  return showHEX.value ? hexConvert(imageData) : convert(imageData);
};

const copy = (color: string) => {
  navigator.clipboard.writeText(color).then(res => {
    console.log(`${color} 复制成功`);
  }).catch(error => {
    console.error(error);
  });
};

watch(activeColor, nv => {
  copy(nv);
});

const fileChange = ({name, base64}: BaseFile) => {
  noImage.value = false;
  title.value = name;
  img.src = base64;
};

const reset = () => {
  noImage.value = true;
  showLayer.value = false;
  title.value = '';
  width.value = 0;
  height.value = 0;
  hoverColor.value = '#3F3F3F';
  activeColor.value = '#3F3F3F';
};

const localTitle = computed(() => {
  return noImage.value
    ? '整一张图片上来吧'
    : `${title.value} ${width.value} * ${height.value}`;
});

onMounted(() => {
  createImage();
});

</script>

<template>
  <div class="container">
    <div
      class="container-header"
      :style="{
        color: hoverColor
      }"
    >
      <p>{{ localTitle }}</p>
      <div
        class="container-active"
        :style="{
          backgroundColor: activeColor
        }"
      />
    </div>
    <div class="container-wall" v-if="noImage">
      <color-file-upload @change="fileChange"/>
    </div>
    <div class="container-wraper" v-else>
      <div class="container-area">
        <canvas
          ref="canvasRef"
          @mousemove="mousemove"
          @mouseleave="mouseleave"
          @click="click"
        />
        <canvas
          v-show="showLayer"
          ref="layerRef"
          class="container-layer"
          :width="DW"
          :height="DH"
        />
      </div>
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
    color: #3F3F3F;
    font-weight: 500;
  }
  &-active {
    width: 64px;
    height: 22px;
    margin-left: 10px;
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
  &-area {
    position: relative;
  }
  &-layer {
    position: absolute;
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
