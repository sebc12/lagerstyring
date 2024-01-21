import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductCreate from "@/views/ProductCreate.vue";
import NewStock from "@/views/NewStock.vue";
import Transaktion from "@/views/Transaktion.vue";
import Sidebar from "@/components/Sidebar.vue";
import Rapport from "@/views/Rapport.vue";
import Signup from "@/views/Signup.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/createProduct",
      name: "createProduct",
      component: ProductCreate,
    },
    {
      path: "/newStock",
      name: "newStock",
      component: NewStock,
    },
    {
      path: "/transaktion",
      name: "transaktion",
      component: Transaktion,
    },
    {
      path: "/rapport",
      name: "rapport",
      component: Rapport,
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup,
    },
    {
      path: "/sidebar",
      name: "sidebar",
      component: Sidebar,
    },
  ],
});

export default router;
