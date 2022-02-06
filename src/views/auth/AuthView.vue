<script lang="ts" setup>
import { useAuthProviders } from "@/composables/useAuthProviders";
import { Provider } from "@supabase/supabase-js";

interface ProviderConfig {
  provider: Provider;
  color: string;
  icon: string;
}

const providers: ProviderConfig[] = [
  { provider: "github", color: "bg-black", icon: "mdi-github" },
  { provider: "google", color: "bg-[#EA4335]", icon: "mdi-google" },
  { provider: "twitter", color: "bg-[#1DA1F2]", icon: "mdi-twitter" },
  { provider: "facebook", color: "bg-[#425F9C]", icon: "mdi-facebook" },
];

const { authFunctions, loading } = useAuthProviders(providers);
</script>
<template>
  <h2 class="mb- text-2xl font-bold">Hey there</h2>
  <p class="mb-4 text-sm font-medium text-slate-500 dark:text-accent">
    Let's get chirping
  </p>

  <div class="flex space-x-4">
    <VButton
      v-for="{ provider, color, icon } in providers"
      :loading="loading"
      :disabled="loading"
      type="button"
      class="flex h-10 w-10 items-center justify-center rounded-full"
      :class="color"
      @click="authFunctions[provider]"
    >
      <span class="iconify block h-5 w-5" :data-icon="icon"></span>
    </VButton>
  </div>
</template>
