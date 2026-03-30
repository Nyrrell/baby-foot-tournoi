<template>
  <UModal v-model:open="isOpen" title="Connexion">
    <template #body>
      <UForm :state="state" :validate="validateLoginForm" class="space-y-4" @submit="handleLogin">
        <UFormField label="Nom d'utilisateur" name="username">
          <UInput v-model="state.username" placeholder="utilisateur" icon="i-lucide-user" class="w-full" autofocus />
        </UFormField>

        <UFormField label="Mot de passe" name="password">
          <UInput
            v-model="state.password"
            type="password"
            placeholder="mon super mot de passe"
            icon="i-lucide-lock"
            class="w-full"
          />
        </UFormField>

        <UButton type="submit" label="Se connecter" icon="i-lucide-log-in" :loading="loading" block />
      </UForm>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { validateLoginForm } from '~/validators/login.validator';

const isOpen = defineModel<boolean>('open', { default: false });

const { login } = useAuth();
const toast = useToast();

const loading = ref(false);
const state = reactive({
  username: '',
  password: '',
});

async function handleLogin() {
  loading.value = true;
  try {
    await login(state.username, state.password);
    isOpen.value = false;
    state.username = '';
    state.password = '';
    toast.add({ title: 'Connecté !', color: 'success', icon: 'i-lucide-check' });
  } catch (err) {
    toast.add({ title: 'Identifiants invalides', color: 'error', icon: 'i-lucide-x' });
  } finally {
    loading.value = false;
  }
}
</script>
