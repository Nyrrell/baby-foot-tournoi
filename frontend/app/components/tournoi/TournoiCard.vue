<template>
  <UCard class="cursor-pointer flex justify-between flex-col" @click="navigateTo(`/tournois/${tournoi.id}`)">
    <template #header>
      <h2 class="font-semibold text-lg leading-tight">{{ tournoi.nom }}</h2>
    </template>

    <div class="space-y-2 text-sm text-gray-500">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-users" />
          <span>{{ tournoi.nombreEquipe }} équipe(s)</span>
        </div>
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-calendar" />
          <span>{{ formatDate(tournoi.date) }}</span>
        </div>
      </div>
      <p v-if="tournoi.description" class="text-gray-400 line-clamp-2 pt-1">
        {{ tournoi.description }}
      </p>
    </div>

    <template #footer>
      <div class="flex justify-end">
        <UButton variant="ghost" size="sm" label="Voir le tournoi" icon="i-lucide-arrow-right" trailing />
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import type { Tournoi } from '~/types/tournoi';

defineProps<{ tournoi: Tournoi }>();

function formatDate(date: string) {
  return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' }).format(new Date(date));
}
</script>
