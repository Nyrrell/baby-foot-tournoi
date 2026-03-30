<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <UHeader>
      <template #title>
        <NuxtLink to="/" class="flex items-center">
          <span class="text-green-400">B</span>aby-
          <UIcon name="i-game-icons-babyfoot-players" class="size-6 text-green-400" />
          -<span class="text-green-400">F</span>oot
        </NuxtLink>
      </template>

      <template #default>
        <UNavigationMenu :items="navItems" />
      </template>

      <template #right>
        <div class="flex items-center gap-3">
          <template v-if="isLoggedIn">
            <UBadge :label="user?.username" variant="subtle" icon="i-lucide-user" />
            <UButton variant="ghost" icon="i-lucide-log-out" size="sm" @click="logout" />
          </template>
          <UButton v-else label="Connexion" size="sm" icon="i-lucide-log-in" @click="showLogin = true" />
        </div>
      </template>
    </UHeader>

    <main class="container mx-auto px-4 py-8">
      <NuxtPage />
    </main>

    <LoginForm v-model:open="showLogin" />
  </div>
</template>

<script setup lang="ts">
const { isLoggedIn, user, logout } = useAuth();
const showLogin = ref(false);

const navItems = [{ label: 'Tournois', to: '/', icon: 'i-lucide-trophy' }];
</script>
