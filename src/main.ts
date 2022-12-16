import { createApp } from "vue"
// import './style.css'
import App from "./App.vue"
import "./index.css"
import router from "./router"
import  { createPinia } from "pinia"
import VueGtag from "vue-gtag"

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(VueGtag, {
    config: { id: "G-98J4JFP2SL" }
})

app.mount("#app")

