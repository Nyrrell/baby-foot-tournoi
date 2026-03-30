<template>
  <UModal v-model:open="open" title="Créer un tournoi">
    <template #body>
      <UForm :state="form" :validate="validateTournoiForm" class="space-y-4" @submit="handleCreate">
        <UFormField label="Nom du tournoi" name="nom" required>
          <UInput v-model="form.nom" placeholder="Ex: Tournoi amical" class="w-full" />
        </UFormField>
        <UFormField label="Date" name="date" required>
          <UInput v-model="form.date" type="date" class="w-full" />
        </UFormField>
        <UFormField label="Description" name="description">
          <UTextarea v-model="form.description" placeholder="Optionnelle" :rows="3" class="w-full" />
        </UFormField>
        <div class="flex justify-end gap-2 pt-2">
          <UButton label="Annuler" variant="ghost" @click="open = false" />
          <UButton type="submit" label="Créer" icon="i-lucide-plus" :loading="creating" />
        </div>
      </UForm>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { validateTournoiForm } from '~/validators/tournoi.validator';
import type { TournoiForm } from '~/types/tournoi';

const emit = defineEmits<{ created: [] }>();

const open = defineModel<boolean>('open', { default: false });

const api = useApi();
const toast = useToast();

const creating = ref(false);
const initialForm = (): TournoiForm => ({ nom: '', date: '', description: '' });
const form = reactive<TournoiForm>(initialForm());

async function handleCreate() {
  creating.value = true;
  try {
    await api('/tournois', { method: 'POST', body: form });
    toast.add({ title: 'Tournoi créé !', color: 'success', icon: 'i-lucide-check' });
    open.value = false;
    Object.assign(form, initialForm());
    emit('created');
  } catch {
    toast.add({ title: 'Erreur lors de la création', color: 'error', icon: 'i-lucide-x' });
  } finally {
    creating.value = false;
  }
}
</script>
