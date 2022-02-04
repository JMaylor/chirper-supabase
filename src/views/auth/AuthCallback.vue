<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const { supabase, fetchProfile } = useAuthStore();

onMounted(async () => {
  if (supabase.auth.user()) {
    console.log(
      "arrived on callback page with an existing user. should fetch their profile"
    );
    await fetchProfile();
    setTimeout(() => {
      router.push("/");
    }, 0);
  }
});
</script>
<template>
  <LoadingIcon class="mx-auto w-16" />
</template>
