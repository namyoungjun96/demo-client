import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../Tyest.vue"),
  },
  {
    path: "/login",
    component: () => import("../Login.vue"),
  },
  {
    path: "/tcomp",
    component: () => import("../Tcomp.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
