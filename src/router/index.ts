import { createRouter, createWebHistory } from "vue-router"
import HomeView from "@/views/HomePage.vue"

const routes = [
    {
      path: "/",
      name: "home",
      component: HomeView,
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    routes
})

export default router
