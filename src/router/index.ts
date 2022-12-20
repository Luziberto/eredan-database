import { createRouter, createWebHistory } from "vue-router"
import HomeView from "@/views/HomePage.vue"
import Print from "@/views/DeckPrint.vue"

const routes = [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/print",
      name: "print",
      component: Print,
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    routes
})

export default router
