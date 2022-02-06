<script lang="ts" setup>
import autosize from "autosize";
import { Chirp } from "@/types";
import { useAuthStore } from "@/stores/auth";
import { supabase } from "@/services/supabase";
const authStore = useAuthStore();

const chirp = ref("");
const chirpInput = ref();
watch(chirp, () => {
  autosize(chirpInput.value);
});

const emit = defineEmits<{
  (e: "newChirp", chirp: Chirp): void;
}>();
async function postChirp() {
  const { data, error } = await supabase
    .from("chirps")
    .insert([{ body: chirp.value }]);
  if (data) emit("newChirp", data[0]);
  if (error) alert(error);
}
</script>
<template>
  <div class="flex gap-3 p-3">
    <img
      class="h-12 w-12 rounded-full"
      v-if="authStore.profile?.picture"
      :src="authStore.profile?.picture"
    />
    <form class="flex-grow" @submit.prevent="postChirp">
      <textarea
        ref="chirpInput"
        class="w-full resize-none bg-transparent px-3 py-2 text-lg"
        v-model="chirp"
        placeholder="What's happening?"
        required
        maxlength="280"
      ></textarea>
      {{ chirp.length }} / 280
      <button>Submit</button>
    </form>
  </div>
</template>
