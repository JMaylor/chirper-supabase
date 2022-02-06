<script lang="ts" setup>
import PostChirpWidget from "@/components/PostChirpWidget.vue";
</script>

<template>
  <!-- <div class="h-full w-full">
    <div class="relative mx-auto h-full max-w-2xl">
      <AppDrawer />

      <div
        class="flex h-full max-h-full w-full flex-col pb-16 sm:pb-0 sm:pl-16"
      >
        <AppHeader />
        <div class="flex-grow overflow-y-scroll">
          <PostChirpWidget />
          <router-view />
        </div>
      </div>
    </div>
  </div> -->

  <div
    class="mx-auto flex h-full max-h-full w-full flex-col justify-center sm:flex-row-reverse"
  >
    <div class="max-w-screen-sm flex-grow overflow-y-scroll sm:overflow-y-auto border">
      <div class="sticky top-0 border-b"><AppHeader /></div>
      <div class="overflow-x-auto">
        <PostChirpWidget class="border-b"/>
        <router-view />
      </div>
    </div>
    <div class="flex-shrink-0"><AppDrawer /></div>
  </div>
</template>
