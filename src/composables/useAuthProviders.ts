import { ref, Ref } from "vue";
import { Provider } from "@supabase/supabase-js";
import { useAuthStore } from "@/stores/auth";

type AuthFunctions = {
  [key in Provider]?: () => void;
};

export function useAuthProviders(providers: Provider[]): {
  authFunctions: AuthFunctions;
  loading: Ref<boolean>;
} {
  const router = useRouter();
  const loading = ref(false);
  const authFunctions: AuthFunctions = {};
  for (const provider of providers) {
    authFunctions[provider] = async () => {
      loading.value = true;
      const { supabase } = useAuthStore();
      const { user, error } = await supabase.auth.signIn(
        { provider },
        {
          redirectTo: `${window.location.origin}/callback`,
        }
      );
      if (user) router.push("/");
      else if (error) {
        alert(error.message);
        loading.value = false;
      }
    };
  }

  return {
    authFunctions,
    loading,
  };
}
