<script setup lang="ts">
import {toRefs, Ref, ref, onMounted, watch, computed, provide} from 'vue';
import Property from './Property.vue';
import {ColorButton, ColorFileUpload} from './common';
import {PropertyValue, BaseFile} from '../types';

const fileChange = ({name, base64}: BaseFile) => {
  console.log(name, base64);
};

const reset = () => {
  console.log('reset..');
}

const localTitle = ref('0');

</script>

<template>
  <div class="container">
    <div class="container-header">
      <div class="container-title">
        {{ localTitle }}
      </div>
    </div>
    <div class="container-wall" v-if="true">
      <color-file-upload @change="fileChange"/>
    </div>
    <template v-else>
      <div class="container-wraper">
        <canvas class="container-canvas" ref="canvasRef"/>
      </div>
      <property color="#123456"/>
    </template>
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
    height: 46px;
    margin: 0 -1px 6px;
    padding-right: 10px;
    background-color: #fff;
    border: 1px solid #dddee4;
    border-radius: 4px;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%);
    .color-button {
      width: 80px;
      min-width: 80px;
      margin-left: 10px;
    }
  }
  &-title {
    width: calc(100% - 90px);
    padding-left: 10px;
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
  &-area {
    position: absolute;
    top: 10px;
  }
  &-drag {
    position: absolute;
    top: 0;
    width: 100px;
    height: 32px;
    user-select: none;
    cursor: move;
  }
  &-footer {
    height: 64px;
    .flex-center();

    .color-button {
      width: 130px;
    }
  }
  .property {
    height: 50px;
    flex-shrink: 0;
    background: #FFFFFF;
    border-top: 1px solid #DDDEE4;
  }
}
</style>
