import { supabase } from "@/services/supabase";

type MaybeString = string | null;

interface Profile {
  bio: MaybeString;
  handle: MaybeString;
  user_name: MaybeString;
  picture: MaybeString;
}

const profile = null as Profile | null;

export const useAuthStore = defineStore("auth", {
  state: () => {
    return { supabase, profile };
  },
  getters: {
    hasValidProfile: ({ profile }) => !!profile?.handle && !!profile?.user_name,
  },
  actions: {
    async fetchProfile() {
      const user = this.supabase.auth.user();
      if (user) {
        const { data: profiles, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id);

        if (error) return alert(error);
        this.profile = profiles?.[0];
      }
    },
  },
});
