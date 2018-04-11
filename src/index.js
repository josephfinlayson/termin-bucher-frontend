import Vue from "vue";
import App from "./components/App.vue";
import "whatwg-fetch";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  render: function(h) {
    return h(App);
  }
});
