import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductCreate from "@/views/ProductCreate.vue";
import NewStock from "@/views/NewStock.vue";
import Transaktion from "@/views/Transaktion.vue";
import Sidebar from "@/components/Sidebar.vue";
import Rapport from "@/views/Rapport.vue";
import Signup from "../views/auth/Signup.vue";
import login from "@/views/auth/Signin.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: "/createProduct",
      name: "createProduct",
      component: ProductCreate,
      meta: { requiresAuth: true },
    },
    {
      path: "/newStock",
      name: "newStock",
      component: NewStock,
      meta: { requiresAuth: true },
    },
    {
      path: "/transaktion",
      name: "transaktion",
      component: Transaktion,
      meta: { requiresAuth: true },
    },
    {
      path: "/rapport",
      name: "rapport",
      component: Rapport,
      meta: { requiresAuth: true },
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup,
    },
    {
      path: "/login",
      name: "login",
      component: login,
    },
    {
      path: "/sidebar",
      name: "sidebar",
      component: Sidebar,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const token = localStorage.getItem("token");

    if (token) {
      next();
    } else {
      next({ path: "login" });
    }
  } else {
    next();
  }
});

export default router;
