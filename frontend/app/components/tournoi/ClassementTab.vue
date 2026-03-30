<template>
  <div class="mt-4">
    <div v-if="!classements?.length" class="text-center py-12 text-gray-400">
      <UIcon name="i-lucide-bar-chart-2" class="text-3xl mb-2" />
      <p>Aucune donnée de classement disponible</p>
      <p class="text-sm mt-1">Les scores doivent être saisis pour afficher le classement</p>
    </div>

    <UTable v-else :data="classements" :columns="columns">
      <template #rank-cell="{ row }">
        <span class="font-bold" :class="rankColor(row.index + 1)">
          {{ row.index + 1 }}
        </span>
      </template>
    </UTable>
  </div>
</template>

<script setup lang="ts">
import type { Classement } from '~/types';

const props = defineProps<{
  classements: Classement[];
}>();

const columns = [
  { id: 'rank', header: '#' },
  { accessorKey: 'equipeNom', header: 'Équipe' },
  { accessorKey: 'victoire', header: 'Victoires' },
  { accessorKey: 'defaite', header: 'Défaites' },
  { accessorKey: 'aJouer', header: 'Match à jouer' },
];

function rankColor(rank: number) {
  if (rank === 1) return 'text-yellow-500';
  if (rank === 2) return 'text-gray-400';
  if (rank === 3) return 'text-amber-600';
  return 'text-gray-500';
}
</script>
