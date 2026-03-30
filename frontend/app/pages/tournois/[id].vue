<template>
  <div>
    <UButton
      variant="ghost"
      icon="i-lucide-arrow-left"
      label="Retour"
      size="sm"
      class="mb-4"
      @click="navigateTo('/')"
    />

    <div v-if="pending" class="flex justify-center py-20">
      <UIcon name="i-lucide-loader" class="animate-spin text-3xl text-gray-400" />
    </div>

    <template v-else-if="tournoi">
      <div class="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <div class="flex items-center gap-3">
            <h1 class="text-2xl font-bold">{{ tournoi.nom }}</h1>
          </div>
          <div class="flex items-center gap-4 text-sm text-gray-500 mt-1">
            <span class="flex items-center gap-1">
              <UIcon name="i-lucide-calendar" />
              {{ formatDate(tournoi.date) }}
            </span>
            <span class="flex items-center gap-1">
              <UIcon name="i-lucide-users" />
              {{ tournoi.equipes?.length ?? 0 }} équipes
            </span>
          </div>
          <p v-if="tournoi.description" class="text-gray-400 text-sm mt-2">
            {{ tournoi.description }}
          </p>
        </div>

        <div v-if="isLoggedIn && isAdmin" class="flex gap-2">
          <UButton
            v-if="!tournoi.hasMatch"
            label="Générer les matchs"
            icon="i-lucide-shuffle"
            :loading="generating"
            :disabled="!hasEquipes"
            @click="handleGenerate"
          />
          <UButton
            v-else
            label="Réinitialiser les matchs"
            icon="i-lucide-trash-2"
            variant="outline"
            color="error"
            :loading="resetting"
            @click="handleReset"
          />
        </div>
      </div>

      <UTabs :items="tabs" :default-value="tabs[0]!.value" @update:model-value="onTabChange">
        <template #equipes>
          <EquipeTab
            :equipes="tournoi.equipes ?? []"
            :has-matchs="tournoi.hasMatch"
            @added="() => refresh()"
            @remove="handleRemoveEquipe"
          />
        </template>

        <template #matchs>
          <MatchTab
            :matches="matches"
            :loading="loadingMatches"
            :has-equipes="hasEquipes"
            @edit-score="openScoreModal"
          />
        </template>

        <template #classements>
          <ClassementTab :classements="classements ?? []" />
        </template>
      </UTabs>
    </template>

    <ScoreModal v-model:open="showScoreModal" :match="selectedMatch" @saved="onScoreSaved" />
  </div>
</template>

<script setup lang="ts">
import type { TournoiDetail, Match, Classement } from '~/types';

import ClassementTab from '~/components/tournoi/ClassementTab.vue';
import ScoreModal from '~/components/tournoi/ScoreModal.vue';
import EquipeTab from '~/components/tournoi/EquipeTab.vue';
import MatchTab from '~/components/tournoi/MatchTab.vue';

const route = useRoute();
const api = useApi();
const { isLoggedIn, isAdmin } = useAuth();
const toast = useToast();

const tournoiId = Number(route.params.id);

const tabs = [
  { label: 'Équipes', value: 'equipes', slot: 'equipes' as const, icon: 'i-lucide-users' },
  { label: 'Matchs', value: 'matchs', slot: 'matchs' as const, icon: 'i-lucide-calendar' },
  { label: 'Classement', value: 'classements', slot: 'classements' as const, icon: 'i-lucide-bar-chart-2' },
];

async function onTabChange(value: string | number) {
  const tab = String(value);
  if (tab === 'matchs') await loadMatches();
  if (tab === 'classements') await refreshClassement();
}

const {
  data: tournoi,
  pending,
  refresh,
} = await useAsyncData(`tournoi-${tournoiId}`, () => api<TournoiDetail>(`/tournois/${tournoiId}`));

const hasEquipes = computed(() => (tournoi.value?.equipes?.length ?? 0) >= 2);

const matches = ref<Match[]>([]);
const loadingMatches = ref(false);
const matchesLoaded = ref(false);

async function loadMatches() {
  if (matchesLoaded.value) return;
  loadingMatches.value = true;
  try {
    matches.value = await api<Match[]>(`/tournois/${tournoiId}/matchs`);
    matchesLoaded.value = true;
  } catch {
    toast.add({ title: 'Erreur lors du chargement des matchs', color: 'error', icon: 'i-lucide-x' });
  } finally {
    loadingMatches.value = false;
  }
}

async function reloadMatches() {
  matchesLoaded.value = false;
  await loadMatches();
}

const { data: classements, refresh: refreshClassement } = await useAsyncData<Classement[]>(
  `classement-${tournoiId}`,
  () => api<Classement[]>(`/tournois/${tournoiId}/classements`),
  { default: (): Classement[] => [], immediate: false }
);

async function handleRemoveEquipe(equipeId: number) {
  try {
    await api(`/tournois/${tournoiId}/equipes/${equipeId}`, { method: 'DELETE' });
    await refresh();
    toast.add({ title: 'Équipe supprimée', color: 'success', icon: 'i-lucide-check' });
  } catch {
    toast.add({ title: 'Erreur lors de la suppression', color: 'error', icon: 'i-lucide-x' });
  }
}

const generating = ref(false);
const resetting = ref(false);

async function handleGenerate() {
  generating.value = true;
  try {
    await api(`/tournois/${tournoiId}/matchs/generate`, { method: 'POST' });
    await Promise.all([refresh(), reloadMatches(), refreshClassement()]);
    toast.add({ title: 'Matchs générés !', color: 'success', icon: 'i-lucide-check' });
  } catch (e: any) {
    toast.add({
      title: e?.data?.message ?? 'Erreur lors de la génération',
      color: 'error',
      icon: 'i-lucide-x',
    });
  } finally {
    generating.value = false;
  }
}

async function handleReset() {
  resetting.value = true;
  try {
    await api(`/tournois/${tournoiId}/matchs`, { method: 'DELETE' });
    await Promise.all([refresh(), reloadMatches(), refreshClassement()]);
    toast.add({ title: 'Matchs supprimés', color: 'success', icon: 'i-lucide-check' });
  } catch {
    toast.add({ title: 'Erreur lors de la suppression', color: 'error', icon: 'i-lucide-x' });
  } finally {
    resetting.value = false;
  }
}

const showScoreModal = ref(false);
const selectedMatch = ref<Match | null>(null);

function openScoreModal(match: Match) {
  selectedMatch.value = match;
  showScoreModal.value = true;
}

async function onScoreSaved() {
  await Promise.all([reloadMatches(), refreshClassement()]);
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' }).format(new Date(date));
}
</script>
