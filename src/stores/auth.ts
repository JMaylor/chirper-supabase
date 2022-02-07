import { supabase } from "@/services/supabase";
import { UserProfile } from "@/types";

const profile = null as UserProfile | null;

export const useAuthStore = defineStore("auth", {
  state: () => {
    return { supabase, profile };
  },
  getters: {
    hasValidProfile: ({ profile }) =>
      !!profile?.handle && !!profile?.user_name && !!profile?.picture,
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
