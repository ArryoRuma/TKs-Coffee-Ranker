export default defineNuxtConfig({
  compatibilityDate: "2025-01-15",
  srcDir: "nuxt",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/supabase"],
  runtimeConfig: {
    public: {
      demoMode: process.env.DEMO_MODE !== "false",
      supabaseUrl: process.env.SUPABASE_URL ?? "",
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY ?? "",
    },
  },
  supabase: {
    url: process.env.SUPABASE_URL || "http://127.0.0.1:54321",
    key: process.env.SUPABASE_ANON_KEY || "demo-anon-key",
    redirect: false,
  },
});
