<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
const navLinks = [
  {
    to: "/",
    icon: "noto:bird",
    disableActiveClass: true,
  },
  {
    to: "/",
    icon: "mdi:home",
    text: "Home",
  },
  {
    to: "/profile",
    icon: "heroicons-outline:user",
    text: "Profile",
  },
];

async function signOut() {
  const { supabase } = useAuthStore();
  const { error } = await supabase.auth.signOut();
  if (error) alert(error.message);
}
</script>
<template>
  <nav
    class="flex w-full items-center justify-around gap-3 p-3 sm:flex-col sm:justify-start md:items-start md:px-6"
  >
    <router-link
      v-for="{ to, icon, text, disableActiveClass } in navLinks"
      v-wave
      class="flex items-center justify-center gap-3 rounded-full p-3 md:pr-4 md:justify-start"
      :exact-active-class="
        !disableActiveClass ? 'text-secondary font-bold bg-primary/30' : ''
      "
      :to="to"
    >
      <span class="iconify aspect-square h-7 w-7" :data-icon="icon"></span>
      <span class="hidden text-xl md:inline" v-if="text">{{ text }}</span>
    </router-link>
    <button
      v-wave
      class="flex items-center justify-center gap-3 rounded-full p-3 md:justify-start"
      @click="signOut"
    >
      <span class="iconify aspect-square h-7 w-7" data-icon="mdi:logout"></span>
      <span class="hidden text-xl md:inline">Sign Out</span>
    </button>
  </nav>
</template>
