import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [{
  path: "/auth",
  name: "AuthPage",
  component: () =>
    import ("../views/AuthPage.vue"),
  children: [{
      path: "signup",
      name: "Signup",
      component: () =>
        import ("../register/views/RegisterPage.vue"),
    },
    {
      path: "signin",
      name: "Signin",
      component: () =>
        import ("../signin/views/Signin.vue"),
    },
  ],
}, ];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;