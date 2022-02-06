<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { ChirpWithAuthor } from "@/types";

const chirps = ref([] as ChirpWithAuthor[]);
async function fetchChirps() {
  const { supabase } = useAuthStore();

  const { data, error } = await supabase
    .from("chirps")
    .select(
      `
      body,
      created_at,
      author (
        handle,
        user_name,
        picture
      )
    `
    )
    .order("created_at", { ascending: false });
  if (error) alert(error);
  if (data) chirps.value = data;
}

fetchChirps();
</script>

<template>
  <div class="flex flex-col border-b divide-y">
    <FeedChirp v-for="chirp in chirps" :chirp="chirp"></FeedChirp>
  </div>
</template>
