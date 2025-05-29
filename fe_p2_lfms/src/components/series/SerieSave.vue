<script setup lang="ts">
import type { Serie } from '@/models/serie'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Calendar from 'primevue/calendar'
import InputNumber from 'primevue/inputnumber'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'series'
const props = defineProps({
  mostrar: Boolean,
  serie: {
    type: Object as () => Serie,
    default: () => ({}) as Serie,
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

const serie = ref<Serie>({ ...props.serie })

watch(
  () => props.serie,
  (newVal) => {
    serie.value = { ...newVal }
  },
)

async function handleSave() {
  try {
    const body = {
      idpais: serie.value.idpais,
      titulo: serie.value.titulo,
      sinopsis: serie.value.sinopsis,
      director: serie.value.director,
      temporadas: serie.value.temporadas,
      fechaEstreno: serie.value.fechaEstreno,
    }

    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${serie.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    serie.value = {} as Serie
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
      :header="props.modoEdicion ? 'Editar Serie' : 'Crear Serie'"
      style="width: 30rem"
    >
      <div class="flex flex-col gap-3 mb-3">
        <label class="font-semibold">id País</label>
        <InputNumber v-model="serie.idpais" :useGrouping="false" />
      </div>

      <div class="flex flex-col gap-3 mb-3">
        <label class="font-semibold">Título</label>
        <InputText v-model="serie.titulo" autocomplete="off" autofocus />
      </div>

      <div class="flex flex-col gap-3 mb-3">
        <label class="font-semibold">Sinopsis</label>
        <InputText v-model="serie.sinopsis" />
      </div>

      <div class="flex flex-col gap-3 mb-3">
        <label class="font-semibold">Director</label>
        <InputText v-model="serie.director" />
      </div>

      <div class="flex flex-col gap-3 mb-3">
        <label class="font-semibold">Temporadas</label>
        <InputNumber v-model="serie.temporadas" :useGrouping="false" />
      </div>

      <div class="flex flex-col gap-3 mb-4">
        <label class="font-semibold">Fecha de Estreno</label>
        <Calendar v-model="serie.fechaEstreno" date-format="yy-mm-dd" show-icon />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          @click="dialogVisible = false"
        ></Button>
        <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
