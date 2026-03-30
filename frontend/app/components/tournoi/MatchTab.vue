<template>
  <div class="mt-4 space-y-2">
    <div v-if="loading" class="flex justify-center py-12">
      <UIcon name="i-lucide-loader" class="animate-spin text-2xl text-gray-400" />
    </div>

    <template v-else>
      <div v-if="!matches.length" class="text-center py-12 text-gray-400">
        <UIcon name="i-lucide-calendar-x" class="text-3xl mb-2" />
        <p>Aucun match généré</p>
        <p v-if="!hasEquipes" class="text-sm mt-1">Ajoutez au moins 2 équipes pour générer les matchs</p>
      </div>

      <UCard v-for="match in matches" :key="match.id">
        <div class="flex items-center gap-4">
          <span class="flex-1 text-center font-medium">{{ match.equipe1Detail.nom }}</span>

          <div class="flex items-center gap-2 min-w-35 justify-center">
            <template v-if="match.matchJouer">
              <span class="text-xl font-bold"> {{ match.equipe1Score }} - {{ match.equipe2Score }} </span>
              <UButton
                v-if="isLoggedIn && isAdmin"
                icon="i-lucide-pencil"
                variant="ghost"
                size="xs"
                @click="emit('edit-score', match)"
              />
            </template>
            <template v-else-if="isLoggedIn && isAdmin">
              <UButton
                label="Saisir score"
                size="xs"
                variant="outline"
                icon="i-lucide-pencil"
                @click="emit('edit-score', match)"
              />
            </template>
          </div>

          <span class="flex-1 text-center font-medium">{{ match.equipe2Detail.nom }}</span>
        </div>
      </UCard>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Match } from '~/types';

const { isLoggedIn, isAdmin } = useAuth();

defineProps<{
  matches: Match[];
  loading: boolean;
  hasEquipes: boolean;
}>();

const emit = defineEmits<{ 'edit-score': [match: Match] }>();
</script>
