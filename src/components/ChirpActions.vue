<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { ChirpWithAuthor } from "@/types";

const props = defineProps<{
  chirp: ChirpWithAuthor;
}>();

const likes = ref(null as string[] | null);

const isLikedByCurrentUser = computed(() => {
  const { supabase } = useAuthStore();
  return likes.value?.includes(supabase.auth.user()?.id as string);
});

async function likeChirp() {
  const { supabase } = useAuthStore();
  const { data, error } = await supabase
    .from("likes")
    .insert([{ chirp: props.chirp.id }]);

  if (data) alert("liked");
  if (error) alert(error.message);
}

async function unLikeChirp() {
  const { supabase } = useAuthStore();
  const { data, error } = await supabase.from("likes").delete().match({
    chirp: props.chirp.id,
    liker: supabase.auth.user()?.id,
  });

  if (data) alert("unliked");
  if (error) alert(error.message);
}

async function fetchLikes() {
  const { supabase } = useAuthStore();
  const { data, error } = await supabase
    .from("likes")
    .select("liker")
    .eq("chirp", props.chirp.id);

  if (data) likes.value = data.map(({ liker }) => liker);
  if (error) alert(error.message);
}

fetchLikes();
</script>
<template>
  <div class="grid w-full grid-cols-4">
    <button
      class="flex items-center space-x-3"
      @click="isLikedByCurrentUser ? unLikeChirp() : likeChirp()"
    >
      <i-heroicons-solid:heart v-if="isLikedByCurrentUser" />
      <i-heroicons-outline:heart v-else />
      <span>{{ likes?.length }}</span>
    </button>
  </div>
</template>
