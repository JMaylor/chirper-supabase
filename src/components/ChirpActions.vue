<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { ChirpWithAuthor } from "@/types";

const props = defineProps<{
  chirp: ChirpWithAuthor;
}>();

const likes = ref([] as string[]);

const isLikedByCurrentUser = computed(() => {
  const { supabase } = useAuthStore();
  return likes.value?.includes(supabase.auth.user()?.id as string);
});

async function likeChirp() {
  const { supabase } = useAuthStore();
  const { error } = await supabase
    .from("likes")
    .insert([{ chirp: props.chirp.id }]);
  if (error) alert(error.message);
}

async function unLikeChirp() {
  const { supabase } = useAuthStore();
  const { error } = await supabase.from("likes").delete().match({
    chirp: props.chirp.id,
    liker: supabase.auth.user()?.id,
  });
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
const { supabase } = useAuthStore();
supabase
  .from(`likes:chirp=eq.${props.chirp.id}`)
  .on("*", (payload: any) => {
    if (payload.eventType == "INSERT") likes.value.push(payload.new.liker);
    if (payload.eventType == "DELETE")
      likes.value.splice(likes.value.indexOf(payload.old.liker), 1);
  })
  .subscribe();
</script>
<template>
  <div class="grid w-full grid-cols-4">
    <button
      class="flex items-center space-x-3"
      @click="isLikedByCurrentUser ? unLikeChirp() : likeChirp()"
    >
      <i-heroicons-solid:heart v-if="isLikedByCurrentUser" />
      <i-heroicons-outline:heart v-else />
      <span>{{ likes.length }}</span>
    </button>
  </div>
</template>
