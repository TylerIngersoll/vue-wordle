import { createApp } from "vue";
import App from "./App.vue";
import mediaQueryPlugin from "./plugins/mediaQuery";
import { Keyboard, Modal, Results } from "@/components";

createApp(App)
  .use(mediaQueryPlugin)
  .component("Keyboard", Keyboard)
  .component("Modal", Modal)
  .component("Results", Results)
  .mount("#app");
