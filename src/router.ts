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
      component: () => import("@/layouts/DashboardLayout.vue"),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "/",
          name: "home",
          component: () => import("@/views/HomeView.vue"),
        },
        {
          path: "/profile",
          name: "profile",
          component: () => import("@/views/ProfileView.vue"),
        },
        {
          path: "/news",
          name: "news",
          component: () => import("@/views/NewsView.vue"),
        },
      ],
    },
  ],
});

const { supabase } = useAuthStore(pinia);
supabase.auth.onAuthStateChange((event) => {
  console.log(event);
  if (event == "SIGNED_OUT") return router.push("/signin");
  if (event == "SIGNED_IN") {
    const routeName = router.currentRoute.value.name;
    console.log("routeName", routeName);

    if (routeName == "callback") {
      setTimeout(() => {
        return router.push({ name: "home" });
      }, 0);
    }
  }
});

router.beforeEach((to) => {
  const { supabase } = useAuthStore();

  if (to.meta.requiresAuth && !supabase.auth.user()) {
    return {
      path: "/signin",
    };
  }
  if (to.meta.requiresNoAuth && supabase.auth.user()) {
    return {
      path: "/",
    };
  }
});

export default router;
