<script setup lang="ts">
import { ChirpWithAuthor, Chirp } from "@/types";
import { supabase } from "@/services/supabase";
import { useAuthStore } from "@/stores/auth";

const chirps = ref([] as ChirpWithAuthor[]);
async function fetchChirps() {
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

const pendingChirps = ref([] as Chirp[]);
fetchChirps().then(() => {
  supabase
    .from("chirps")
    .on("*", async (payload: any) => {
      if (payload.eventType == "INSERT") {
        if (chirps.value.findIndex((chirp) => chirp.id == payload.new.id) == -1)
          pendingChirps.value.unshift(payload.new);
      }
    })
    .subscribe();
});

async function loadPendingChirps() {
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
    .in(
      "id",
      pendingChirps.value.map(({ id }) => id)
    )
    .order("created_at", { ascending: false });
  if (error) alert(error);
  if (data) {
    console.log(data);

    chirps.value.unshift(...data);
    pendingChirps.value = [];
  }
}

function onNewChirp(chirp: Chirp) {
  const { profile } = useAuthStore();
  if (profile) {
    chirps.value.unshift({
      ...chirp,
      author: profile,
    });
  }
}
</script>

<template>
  <div class="flex flex-col divide-y border-b">
    <PostChirpWidget @new-chirp="onNewChirp" />
    <transition
      enter-from-class="max-h-0"
      enter-to-class="max-h-12"
      leave-from-class="max-h-12"
      leave-to-class="max-h-0"
    >
      <div
        v-if="pendingChirps.length > 0"
        class="flex items-center justify-center overflow-hidden transition-all"
      >
        <button
          @click="loadPendingChirps"
          class="flex h-full w-full items-center justify-center py-3"
        >
          {{ pendingChirps.length }} Pending Chirp{{
            pendingChirps.length > 1 ? "s" : ""
          }}
        </button>
      </div>
    </transition>
    <FeedChirp
      v-for="chirp in chirps"
      :chirp="chirp"
      :key="chirp.id"
    ></FeedChirp>
  </div>
</template>
