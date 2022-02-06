<script lang="ts" setup></script>

<template>
  <router-view />
</template>

<style>
html,
body,
#app {
  @apply h-full bg-slate-50 dark:bg-slate-900 text-black dark:text-white;
}

::-webkit-scrollbar-track {
  @apply bg-slate-500;
}

::-webkit-scrollbar {
  @apply w-1 bg-slate-500;
}

::-webkit-scrollbar-thumb {
  @apply rounded-full bg-primary;
}
</style>
