<script setup>
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()

function showMessageBox() {
  window.electron.ipcRenderer.send('showMessageBox', 'Hello World')
}
</script>

<template>
  <h1>Electron Template</h1>
  <img alt="Vue logo" src="@/assets/images/logo.svg" width="200" />
  <p>count: {{ counterStore.count }}</p>
  <button @click="counterStore.increment">add</button>
  <p>window.electron</p>
  <button @click="showMessageBox">showMessageBox</button>
</template>
