<script setup lang="ts">
import {toRefs, Ref, ref, onMounted, watch, computed, provide} from 'vue';
import {ColorButton, ColorFileUpload} from './common';
import {PropertyValue, BaseFile} from '../types';

const fileChange = ({name, base64}: BaseFile) => {
  console.log(name, base64);
};

const reset = () => {
  console.log('reset..');
}

const localTitle = ref('0'); // width height color 占比

</script>

<template>
  <div class="container">
    <div class="container-header">
      {{ localTitle }}
    </div>
    <div class="container-wall" v-if="true">
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
