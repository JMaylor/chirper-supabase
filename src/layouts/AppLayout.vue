<script lang="ts" setup></script>

<template>
  <div
    class="mx-auto flex h-full max-h-full w-full flex-col justify-center sm:flex-row-reverse"
  >
    <div
      class="max-w-screen-sm flex-grow overflow-y-scroll border sm:overflow-y-auto"
    >
      <div class="sticky top-0 border-b"><AppHeader /></div>
      <div class="overflow-x-auto">
        <router-view />
      </div>
    </div>
    <div class="flex-shrink-0"><AppDrawer /></div>
  </div>
</template>
