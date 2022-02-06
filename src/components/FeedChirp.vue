<script lang="ts" setup>
import { ChirpWithAuthor } from "@/types";

defineProps<{
  chirp: ChirpWithAuthor;
}>();
</script>
<template>
  <div class="flex gap-3 px-3">
    <img class="h-12 w-12 rounded-full" :src="chirp.author.picture" />
    <div class="flex-grow">
      <span class="font-medium">{{ chirp.author.user_name }}</span> ~
      <span>@{{ chirp.author.handle }}</span>
    </div>
  </div>
</template>
