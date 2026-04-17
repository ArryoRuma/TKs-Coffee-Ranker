<script setup lang="ts">
definePageMeta({ layout: "landing" });

const supabaseClient = useSupabaseClient();

type SignInContent = {
  title: string;
  description: string;
  primary: { label: string };
  secondary: { prefix: string; label: string; to: string };
};

const fallbackContent: SignInContent = {
  title: "Welcome to Sippd",
  description: "Sign in to start logging your coffee journey.",
  primary: { label: "Continue with GitHub" },
  secondary: {
    prefix: "Just exploring?",
    label: "Continue in demo mode",
    to: "/dashboard",
  },
};

const { data: signInData } = await useAsyncData("sign-in-content", () =>
  queryCollection("content").path("/auth/sign-in").first()
);

const content = computed(() => (signInData.value as SignInContent | null) ?? fallbackContent);

async function signInWithGitHub() {
  await supabaseClient.auth.signInWithOAuth({
    provider: "github",
    options: { redirectTo: `${window.location.origin}/dashboard` },
  });
}
</script>

<template>
  <main class="mx-auto w-full max-w-xl px-5 py-10">
    <AuthSignInCard
      :title="content.title"
      :description="content.description"
      :primary-label="content.primary.label"
      :secondary-prefix="content.secondary.prefix"
      :secondary-label="content.secondary.label"
      :secondary-to="content.secondary.to"
      @github="signInWithGitHub"
    />
  </main>
</template>
