<script lang="ts" setup>
import { Ref } from "vue";
import { isDarkKey } from "@/symbols";
const route = useRoute();

const isDark = inject(isDarkKey) as Ref<boolean>;
const toggleDark = useToggle(isDark);
</script>
<template>
  <div class="flex items-center justify-between p-3 backdrop-blur">
    <h1 class="text-2xl capitalize">{{ route.name }}</h1>
    <v-icon-button @click="toggleDark()">
      <i-carbon-sun class="h-6 w-6 dark:hidden" />
      <i-carbon-moon class="hidden h-6 w-6 dark:block" />
    </v-icon-button>
  </div>
</template>
