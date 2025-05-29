<script setup lang="ts">
import SerieList from '@/components/series/SerieList.vue'
import SerieSave from '@/components/series/SerieSave.vue'
import Button from 'primevue/button'
import { ref } from 'vue'

const mostrarDialog = ref(false)
const serieListRef = ref<InstanceType<typeof SerieList> | null>(null)
const serieEdit = ref<any>(null)

function handleCrearSerie() {
  serieEdit.value = null
  mostrarDialog.value = true
}

function handleEditarSerie(serie: any) {
  serieEdit.value = serie
  mostrarDialog.value = true
}

function handleCerrarDialogo() {
  mostrarDialog.value = false
}

function handleSerieGuardada() {
  serieListRef.value?.obtenerLista()
}
</script>

<template>
  <div>
    <h2>Gestión de Series</h2>
    <Button label="Crear Nueva Serie" icon="pi pi-plus" @click="handleCrearSerie" />

    <SerieList ref="serieListRef" @edit="handleEditarSerie" />

    <SerieSave
      :mostrar="mostrarDialog"
      :serie="serieEdit"
      :modoEdicion="!!serieEdit"
      @guardar="handleSerieGuardada"
      @close="handleCerrarDialogo"
    />
  </div>
</template>

<style scoped></style>
