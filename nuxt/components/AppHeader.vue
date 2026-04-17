<script setup lang="ts">
const route = useRoute();
const { displayName, isAuthenticated, demoMode } = useAuth();
const supabaseClient = useSupabaseClient();

const navItems = [
  { to: "/dashboard", label: "Home" },
  { to: "/entries/new", label: "Log a Sip" },
  { to: "/diary", label: "Sip Log" },
  { to: "/top-sips", label: "Top Sips" },
  { to: "/saved-sips", label: "Saved Sips" },
  { to: "/wanna-sip", label: "Wanna Sip" },
  { to: "/profile", label: "Profile" },
];

async function signOut() {
  if (!demoMode) {
    await supabaseClient.auth.signOut();
  }
  await navigateTo("/");
}
</script>

<template>
  <header class="relative border-b border-stone-200 bg-stone-50/90 backdrop-blur">
    <div class="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4">
      <NuxtLink to="/" class="flex items-center">
        <img src="/logo-horiz.svg" alt="Sippd logo" class="h-12 w-auto" />
      </NuxtLink>

      <nav class="hidden gap-4 md:flex">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="text-sm font-medium text-stone-600 transition hover:text-stone-900"
          :class="{ 'text-stone-900': route.path === item.to }"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-3">
        <template v-if="isAuthenticated && !demoMode">
          <button
            class="hidden text-sm text-stone-600 hover:text-stone-900 md:block"
            @click="signOut"
          >
            Sign out
          </button>
        </template>
        <template v-else>
          <NuxtLink
            to="/auth/sign-in"
            class="hidden text-sm text-stone-600 hover:text-stone-900 md:block"
          >
            {{ displayName ?? "Sign in" }}
          </NuxtLink>
        </template>
        <MobileNav />
      </div>
    </div>
  </header>
</template>
