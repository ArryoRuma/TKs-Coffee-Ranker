export default defineNuxtConfig({
  compatibilityDate: "2025-01-15",
  srcDir: "app",
  serverDir: "server",
  devtools: { enabled: true },
  modules: ["@nuxt/content", "@nuxt/ui", "@nuxtjs/supabase", "@vueuse/nuxt", "motion-v/nuxt"],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: {
      demoMode: !process.env.SUPABASE_URL || process.env.DEMO_USER_MODE === "true",
    },
  },
  supabase: {
    url: process.env.SUPABASE_URL || "http://127.0.0.1:54321",
    key: process.env.SUPABASE_ANON_KEY || "demo-anon-key",
    redirect: false,
  },
});
