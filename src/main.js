import { createApp } from "vue";
import App from "./App.vue";
import { Keyboard, Modal, Results } from "@/components";

createApp(App)
  .component("Keyboard", Keyboard)
  .component("Modal", Modal)
  .component("Results", Results)
  .mount("#app");
