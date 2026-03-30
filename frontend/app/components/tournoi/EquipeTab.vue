<template>
  <div class="mt-4 space-y-4">
    <div v-if="isLoggedIn && isAdmin && !hasMatchs" class="flex gap-2">
      <UInput v-model="newNomEquipe" placeholder="Nom de l'équipe" class="max-w-xs" @keyup.enter="handleAddEquipe" />
      <UButton
        label="Ajouter"
        icon="i-lucide-plus"
        :loading="addingEquipe"
        :disabled="!newNomEquipe.trim()"
        @click="handleAddEquipe"
      />
    </div>

    <div v-if="equipes?.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <UCard v-for="equipe in equipes" :key="equipe.id">
        <div class="flex items-center justify-between gap-2">
          <span class="font-medium">{{ equipe.nom }}</span>
          <div class="flex items-center gap-2">
            <UButton
              v-if="isLoggedIn && isAdmin && !hasMatchs"
              icon="i-lucide-trash-2"
              variant="ghost"
              color="error"
              size="xs"
              @click="emit('remove', equipe.id)"
            />
          </div>
        </div>
      </UCard>
    </div>

    <div v-else class="text-center py-12 text-gray-400">
      <UIcon name="i-lucide-users" class="text-3xl mb-2" />
      <p>Aucune équipe inscrite</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Equipe } from '~/types';

const props = defineProps<{
  equipes: Equipe[];
  hasMatchs: boolean;
}>();

const emit = defineEmits<{
  added: [nom: string];
  remove: [id: number];
}>();

const { isLoggedIn, isAdmin } = useAuth();
const toast = useToast();
const api = useApi();
const route = useRoute();

const tournoiId = Number(route.params.id);
const newNomEquipe = ref('');
const addingEquipe = ref(false);

async function handleAddEquipe() {
  if (!newNomEquipe.value.trim()) return;
  addingEquipe.value = true;
  try {
    await api(`/tournois/${tournoiId}/equipes`, {
      method: 'POST',
      body: { nom: newNomEquipe.value.trim() },
    });
    toast.add({ title: 'Équipe ajoutée !', color: 'success', icon: 'i-lucide-check' });
    newNomEquipe.value = '';
    emit('added', newNomEquipe.value);
  } catch {
    toast.add({ title: "Erreur lors de l'ajout", color: 'error', icon: 'i-lucide-x' });
  } finally {
    addingEquipe.value = false;
  }
}
</script>
