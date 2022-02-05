<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

const { profile, supabase } = useAuthStore();

const image = computed(() => {
  if (profile?.picture) return profile?.picture;
  return supabase.auth.user()?.user_metadata.avatar_url;
});
</script>

<template>
  <h1 class="mb-2 text-3xl font-medium">Profile</h1>
  <img :src="image" alt="" srcset="" class="h-32 w-32" />
  <pre>{{supabase.auth.user()}}</pre>
</template>
