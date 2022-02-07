import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "./stores/auth";
import { pinia } from "./stores";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/auth",
      component: () => import("@/layouts/AuthLayout.vue"),
      children: [
        {
          path: "/auth",
          name: "auth",
          meta: {
            requiresNoAuth: true,
          },
          component: () => import("@/views/auth/AuthView.vue"),
        },
        {
          path: "/callback",
          name: "callback",
          component: () => import("@/views/auth/AuthCallback.vue"),
          beforeEnter: (to) => {
            /* Parse the route hash into a dictionary */
            const hashDictionary = {} as any;
            // first remove the actual '#' character
            const hash = to.hash.replace("#", "");
            // split hash into key-value pairs
            hash.split("&").forEach((item) => {
              // split 'key=value' into [key, value]
              const [key, value] = item.split("=");
              // add to results
              hashDictionary[key] = value;
            });

            if (
              [
                "access_token",
                "expires_in",
                "provider_token",
                "refresh_token",
                "token_type",
              ].some((key) => !(key in hashDictionary))
            )
              return "/";
          },
        },
        {
          path: "/:pathMatch(.*)*",
          name: "NotFound",
          component: () => import("@/views/NotFound.vue"),
        },
      ],
    },

    {
      path: "/",
      component: () => import("@/layouts/AppLayout.vue"),
      meta: {
        requiresAuth: true,
        requiresProfile: true,
      },
      children: [
        {
          path: "/",
          name: "home",
          component: () => import("@/views/HomeView.vue"),
        },
      ],
    },

    {
      path: "/",
      component: () => import("@/layouts/AppLayout.vue"),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "/profile",
          name: "profile",
          component: () => import("@/views/ProfileView.vue"),
        },
      ],
    },
  ],
});

const { supabase, fetchProfile } = useAuthStore(pinia);
supabase.auth.onAuthStateChange(async (event, data) => {
  if (event === "USER_UPDATED") await useAuthStore().fetchProfile();
  if (event === "SIGNED_OUT") router.push("/auth");
  if (event === "SIGNED_IN") {
    const routeName = router.currentRoute.value.name;
    if (routeName == "callback") {
      await fetchProfile();
      setTimeout(() => {
        router.push({ name: "home" });
      }, 0);
    }
  }
});

router.beforeEach(async (to) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.supabase.auth.user()) {
    return {
      path: "/auth",
    };
  }
  if (to.meta.requiresNoAuth && authStore.supabase.auth.user()) {
    return {
      path: "/",
    };
  }
  if (!authStore.profile) await authStore.fetchProfile();
  if (to.meta.requiresProfile) {
    if (!authStore.hasValidProfile)
      return {
        path: "/profile",
      };
  }
});

export default router;
