<script lang="ts" setup>
import PostChirpWidget from "@/components/PostChirpWidget.vue";
</script>

<template>
  <div
    class="mx-auto flex h-full max-h-full w-full flex-col justify-center sm:flex-row-reverse"
  >
    <div
      class="max-w-screen-sm flex-grow overflow-y-scroll border sm:overflow-y-auto"
    >
      <div class="sticky top-0 border-b"><AppHeader /></div>
      <div class="overflow-x-auto">
        <PostChirpWidget class="border-b" />
        <router-view />
      </div>
    </div>
    <div class="flex-shrink-0"><AppDrawer /></div>
  </div>
</template>
