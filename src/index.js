import Vue from "vue";
import App from "./components/App.vue";
import "whatwg-fetch";
import VueAnalytics from 'vue-analytics'

Vue.config.productionTip = false;

Vue.use(VueAnalytics, {
  id: 'UA-121679258-1'
})


new Vue({
  el: "#app",
  render: function(h) {
    return h(App);
  }
});

