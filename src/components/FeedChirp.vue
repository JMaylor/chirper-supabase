<script lang="ts" setup>
import { ChirpWithAuthor } from "@/types";

const props = defineProps<{
  chirp: ChirpWithAuthor;
}>();

const timeAgo = useTimeAgo(new Date(props.chirp.created_at));
</script>
<template>
  <div class="flex gap-3 p-3">
    <img class="h-12 w-12 rounded-full" :src="chirp.author.picture" />
    <div class="flex-grow overflow-x-auto">
      <div class="mb-1">
        <span class="font-bold">{{ chirp.author.user_name }}</span> ~
        <span>@{{ chirp.author.handle }}</span> ~ <span>{{ timeAgo }}</span>
      </div>
      <div class="mb-3 break-words">{{ chirp.body }}</div>
      <ChirpActions :chirp="chirp" />
    </div>
  </div>
</template>
