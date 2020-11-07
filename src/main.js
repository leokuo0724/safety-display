import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import NoSleep from "nosleep.js";

Vue.config.productionTip = false;

const noSleep = new NoSleep();
// 設定螢幕持續亮
document.addEventListener(
  "click",
  function enableNoSleep() {
    console.log("init screen setting");
    document.removeEventListener("click", enableNoSleep, false);
    noSleep.enable();
  },
  false
);

// 處理返回導向
window.history.pushState(null, null, "#");
window.addEventListener("popstate", function() {
  window.location.href = "/";
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
