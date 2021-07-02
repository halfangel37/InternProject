import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/auth",
    name: "AuthPage",
    component: () => import("../views/AuthPage.vue"),
    children: [
      {
        path: "signup",
        name: "Signup",
        component: () => import("../register/views/RegisterPage.vue"),
      },
      {
        path: "signin",
        name: "Signin",
        component: () => import("../signin/views/Signin.vue"),
      },
      {
        path: "forgot-password",
        name: "ForgotPassword",
        component: () => import("../forgotPassword/views/ForgotPassword.vue"),
      },
      {
        path: "reset-password/:key",
        props: true,
        name: "ResetPassword",
        component: () => import("../resetPassword/views/ResetPassword.vue"),
      },
    ],
  },
  {
    path: "/companies",
    component: () => import("../views/Dashboard.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "contacts",
        component: () => import("../views/Contacts.vue"),
      },
      {
        path: "/dashboard",
        component: () => import("../views/WelcomeDashboard.vue"),
      },
      {
        path: "/profile",
        component: () => import("../profile/views/Profile.vue"),
      },
      {
        path: "products",
        component: () => import("../views/Products.vue"),
      },
      {
        path: "sales",
        component: () => import("../views/Sales.vue"),
      },
      {
        path: "fees",
        component: () => import("../views/Fees.vue"),
      },
      {
        path: "employees",
        component: () => import("../views/Employees.vue"),
      },
      {
        path: "setting",
        component: () => import("../views/Setting.vue"),
      },
      {
        path: "create",
        component: () => import("../companies/views/RegisterCompany.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((routeTo, routeFrom, next) => {
  const userToken = localStorage.getItem("token");
  if (
    routeTo.matched.some((record) => record.meta.requiresAuth) &&
    !userToken
  ) {
    next({ path: "/auth/signin" });
  } else {
    next();
  }
});
export default router;
