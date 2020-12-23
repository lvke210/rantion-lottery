import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "Home",
            component: () => import("../view/home"),
        },
        {
            path: "/signIn",
            name: "SignIn",
            component: () => import("../view/signIn/signIn.vue"),
        },
        {
            path: "/tagcloud",
            name: "tagcloud",
            component: () => import("../view/home/components/tagcloud.vue"),
        },
    ],
});
