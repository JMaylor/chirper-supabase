<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { getUnixTime } from "date-fns";
const authStore = useAuthStore();

const image = computed(() => {
  if (authStore.profile?.picture) return authStore.profile?.picture;
  return authStore.supabase.auth.user()?.user_metadata.avatar_url;
});

const fileInput = ref();

async function onFileChange() {
  // check file size and type
  const file = fileInput.value.files[0];
  if (!file.type.startsWith("image"))
    return alert("please choose an image file");
  if (file.size > 2097152) return alert("avatar cannot be larger than 2MB.");

  // upload new avatar
  const timestamp = getUnixTime(new Date());
  const { data: upload, error: uploadError } = await authStore.supabase.storage
    .from("avatars")
    .upload(
      `public/${authStore.supabase.auth.user()?.id}/avatar-${timestamp}`,
      fileInput.value.files[0],
      {
        cacheControl: "3600",
        upsert: true,
      }
    );

  if (uploadError) return alert(uploadError);

  // delete old avatar
  const oldAvatarTimestamp = authStore.profile?.picture?.split("-").pop();
  const { error: deletionError } = await authStore.supabase.storage
    .from("avatars")
    .remove([
      `public/${
        authStore.supabase.auth.user()?.id
      }/avatar-${oldAvatarTimestamp}`,
    ]);

  if (deletionError) return alert(deletionError);

  await authStore.supabase
    .from("profiles")
    .update({
      picture: `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${
        upload?.Key
      }`,
    })
    .eq("id", authStore.supabase.auth.user()?.id);

  await authStore.fetchProfile();
  alert("avatar changed!");
}
</script>

<template>
  <h1 class="mb-2 text-3xl font-medium">Profile</h1>
  <img :src="image" alt="" srcset="" class="h-32 w-32" />
  <input @change="onFileChange" type="file" ref="fileInput" />
  <!-- <pre>{{ supabase.auth.user() }}</pre> -->
</template>
