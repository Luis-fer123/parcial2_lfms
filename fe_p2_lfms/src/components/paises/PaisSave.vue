<script setup lang="ts">
import type { Paises } from '@/models/paises'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'paises'

const props = defineProps({
  mostrar: Boolean,
  pais: {
    type: Object as () => Paises,
    default: () => ({}) as Paises,
  },
  modoEdicion: Boolean,
})

const emit = defineEmits(['guardar', 'close'])

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

const idpais = ref<Paises>({ ...props.pais })

watch(
  () => props.pais,
  (newVal) => {
    idpais.value = { ...newVal }
  },
)

async function handleSave() {
  try {
    const body = {
      descripcion: idpais.value.descripcion,
    }

    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${idpais.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }

    emit('guardar')
    idpais.value = {} as Paises
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message || 'Error al guardar')
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar país' : 'Crear país'"
      style="width: 30rem"
      modal
    >
      <div class="flex flex-col gap-3 mb-3">
        <label class="font-semibold">Descripción</label>
        <InputText v-model="idpais.descripcion" />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          @click="dialogVisible = false"
        />
        <Button
          type="button"
          label="Guardar"
          icon="pi pi-save"
          @click="handleSave"
        />
      </div>
    </Dialog>
  </div>
</template>


<style scoped></style>
