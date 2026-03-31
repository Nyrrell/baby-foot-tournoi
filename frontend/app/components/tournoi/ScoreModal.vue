<template>
  <UModal v-model:open="open" title="Saisir le score">
    <template #body>
      <div v-if="match" class="space-y-4">
        <p class="flex justify-evenly text-center font-medium text-gray-400">
          {{ match.equipe1Detail.nom }}
          <span class="font-bold text-green-400 uppercase">vs</span>
          {{ match.equipe2Detail.nom }}
        </p>
        <UForm :state="scoreForm" :validate="validateScoreForm" class="space-y-4" @submit="handleSubmit">
          <div class="grid grid-cols-2 gap-4">
            <UFormField name="equipe1Score">
              <UInput v-model="scoreForm.equipe1Score" type="number" min="0" class="w-full text-center" />
            </UFormField>
            <UFormField name="equipe2Score">
              <UInput v-model="scoreForm.equipe2Score" type="number" min="0" class="w-full text-center" />
            </UFormField>
          </div>
          <div class="flex justify-end gap-2">
            <UButton label="Annuler" variant="ghost" @click="open = false" />
            <UButton type="submit" label="Enregistrer" icon="i-lucide-check" :loading="saving" />
          </div>
        </UForm>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { validateScoreForm } from '~/validators/score.validator';
import type { Match } from '~/types';

const props = defineProps<{ match: Match | null }>();
const emit = defineEmits<{ saved: [] }>();

const open = defineModel<boolean>('open', { default: false });

const api = useApi();
const toast = useToast();

const saving = ref(false);
const scoreForm = reactive({ equipe1Score: '', equipe2Score: '' });

watch(
  () => props.match,
  (match) => {
    if (!match) return;
    scoreForm.equipe1Score = match.equipe1Score !== null ? String(match.equipe1Score) : '';
    scoreForm.equipe2Score = match.equipe2Score !== null ? String(match.equipe2Score) : '';
  }
);

async function handleSubmit() {
  if (!props.match) return;
  saving.value = true;
  try {
    await api(`/matchs/${props.match.id}/score`, {
      method: 'PATCH',
      body: {
        equipe1Score: Number(scoreForm.equipe1Score),
        equipe2Score: Number(scoreForm.equipe2Score),
      },
    });
    open.value = false;
    emit('saved');
    toast.add({ title: 'Score enregistré !', color: 'success', icon: 'i-lucide-check' });
  } catch {
    toast.add({ title: "Erreur lors de l'enregistrement", color: 'error', icon: 'i-lucide-x' });
  } finally {
    saving.value = false;
  }
}
</script>
