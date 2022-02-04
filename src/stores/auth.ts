import { supabase } from "@/services/supabase";

type MaybeString = string | null;

interface Profile {
  bio: MaybeString;
  handle: MaybeString;
  user_name: MaybeString;
  picture: MaybeString;
}

const profile = {} as Profile;

export const useAuthStore = defineStore("auth", {
  state: () => {
    return { supabase, profile };
  },
  getters: {
    hasValidProfile: ({ profile }) => !!profile.handle && !profile.user_name,
  },
  actions: {
    async fetchProfile() {
      const { data: profiles, error } = await supabase
        .from("profiles")
        .select("*");

      if (error) return alert(error);
      this.profile = profiles?.[0];
    },
  },
});

supabase.auth.onAuthStateChange(async (event) => {
  if (event == "SIGNED_IN" || event == "USER_UPDATED")
    await useAuthStore().fetchProfile();
});
