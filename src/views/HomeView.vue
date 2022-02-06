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
      id,
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

fetchChirps().then(() => {
  const { supabase } = useAuthStore();
  supabase
    .from("chirps")
    .on("*", async (payload: any) => {
      if (payload.eventType == "INSERT") {
        const { data, error } = await supabase
          .from("chirps")
          .select(
            `
              id,
              body,
              created_at,
              author (
                handle,
                user_name,
                picture
              )
            `
          )
          .eq("id", payload.new.id);
        if (error) alert(error);
        if (data) chirps.value.unshift(...data);
      }
    })
    .subscribe();
});
</script>

<template>
  <div class="flex flex-col divide-y border-b">
    <FeedChirp v-for="chirp in chirps" :chirp="chirp"></FeedChirp>
  </div>
</template>
