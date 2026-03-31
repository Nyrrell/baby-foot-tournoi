<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold">Tournois</h1>
        <p class="text-sm text-gray-500 mt-1">{{ tournois?.length ?? 0 }} tournoi(s) enregistré(s)</p>
      </div>
      <UButton v-if="isLoggedIn && isAdmin" label="Créer un tournoi" icon="i-lucide-plus" @click="showCreate = true" />
    </div>

    <div v-if="pending" class="flex justify-center py-20">
      <UIcon name="i-lucide-loader" class="animate-spin text-3xl text-gray-400" />
    </div>

    <div v-else-if="tournois?.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <TournoiCard v-for="t in tournois" :key="t.id" :tournoi="t" />
    </div>

    <div v-else class="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
      <UIcon name="i-lucide-trophy" class="text-5xl" />
      <p class="text-lg">Aucun tournoi pour l'instant</p>
      <UButton
        v-if="isLoggedIn && isAdmin"
        label="Créer le premier tournoi"
        icon="i-lucide-plus"
        variant="outline"
        @click="showCreate = true"
      />
    </div>

    <TournoiModal v-model:open="showCreate" @created="onTournoiCreated" />
  </div>
</template>

<script setup lang="ts">
import TournoiModal from '~/components/tournoi/TournoiModal.vue';
import TournoiCard from '~/components/tournoi/TournoiCard.vue';
import type { Tournoi } from '~/types/tournoi';

const api = useApi();
const { isLoggedIn, isAdmin } = useAuth();

const {
  data: tournois,
  pending,
  refresh,
} = await useAsyncData('tournois', () => api<Tournoi[]>('/tournois'), { default: () => [] });

const showCreate = ref(false);

function onTournoiCreated() {
  refresh();
}
</script>
