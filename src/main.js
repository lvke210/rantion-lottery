import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import "./styles/index.css";
import "ant-design-vue/dist/antd.css";
import router from "./router";
import Antd from "ant-design-vue";
Vue.use(VueRouter);
Vue.use(Antd);
Vue.config.productionTip = false;

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");
