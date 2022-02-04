<script lang="ts" setup>
import { useAuthProviders } from "@/composables/useAuthProviders";
import { Provider } from "@supabase/supabase-js";

interface ProviderConfig {
  name: Provider;
  color: string;
  icon: string;
}

const providers: ProviderConfig[] = [
  { name: "github", color: "bg-black", icon: "mdi-github" },
  { name: "google", color: "bg-[#EA4335]", icon: "mdi-google" },
  { name: "twitter", color: "bg-[#1DA1F2]", icon: "mdi-twitter" },
  { name: "facebook", color: "bg-[#425F9C]", icon: "mdi-facebook" },
];

const { authFunctions, loading } = useAuthProviders(
  providers.map(({ name }) => name)
);
</script>
<template>
  <h2 class="mb- text-2xl font-bold">Hey there</h2>
  <p class="mb-4 text-sm text-slate-500">Let's get chirping</p>

  <div class="flex space-x-4">
    <VButton
      v-for="{ name, color, icon } in providers"
      :loading="loading"
      :disabled="loading"
      type="button"
      class="flex h-10 w-10 items-center justify-center rounded-full"
      :class="color"
      @click="authFunctions[name]"
    >
      <span class="iconify block h-5 w-5" :data-icon="icon"></span>
    </VButton>
  </div>
</template>
