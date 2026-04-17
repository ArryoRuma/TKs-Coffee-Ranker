import { users, demoUserId } from "~/composables/useMockData";

export function useAuth() {
  const supabaseUser = useSupabaseUser();
  const runtimeConfig = useRuntimeConfig();
  const demoMode = runtimeConfig.public.demoMode as boolean;

  const isAuthenticated = computed(() => {
    if (demoMode) return true;
    return !!supabaseUser.value;
  });

  const currentUser = computed(() => {
    if (demoMode || !supabaseUser.value) {
      return users.find((u) => u.id === demoUserId) ?? null;
    }
    // When real auth is active, map Supabase user to AppUser
    // For now, fall back to demo user
    return users.find((u) => u.id === demoUserId) ?? null;
  });

  const displayName = computed(() => {
    return currentUser.value?.name ?? supabaseUser.value?.email ?? null;
  });

  return {
    isAuthenticated,
    currentUser,
    displayName,
    supabaseUser,
    demoMode,
  };
}
