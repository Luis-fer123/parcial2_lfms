<script setup lang="ts">
import PaisList from '@/components/paises/PaisList.vue'
import PaisSave from '@/components/paises/PaisSave.vue'
import Button from 'primevue/button'
import { ref } from 'vue'

const mostrarDialog = ref(false)
const paisListRef = ref<InstanceType<typeof PaisList> | null>(null)
const paisEdit = ref<any>(null)

function handleCrearPais() {
  paisEdit.value = null
  mostrarDialog.value = true
}

function handleEditarPais(pais: any) {
  paisEdit.value = pais
  mostrarDialog.value = true
}

function handleCerrarDialogo() {
  mostrarDialog.value = false
}

function handlePaisGuardado() {
  paisListRef.value?.obtenerLista()
}
</script>

<template>
  <div>
    <h2>Gestión de Países</h2>
    <Button label="Crear Nuevo País" icon="pi pi-plus" @click="handleCrearPais" />

    <PaisList ref="paisListRef" @edit="handleEditarPais" />

    <PaisSave
      :mostrar="mostrarDialog"
      :pais="paisEdit"
      :modoEdicion="!!paisEdit"
      @guardar="handlePaisGuardado"
      @close="handleCerrarDialogo"
    />
  </div>
</template>

<style scoped></style>
