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
    props: true,
    children: [
      {
        path: ":companyId/contacts",
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
        path: ":companyId/products",
        component: () => import("../views/Products.vue"),
      },
      {
        path: ":companyId/products/create",
        component: () => import("../product/views/CreateProduct.vue"),
      },
      {
        path: ":companyId/sales",
        component: () => import("../views/Sales.vue"),
      },
      {
        path: ":companyId/fees",
        component: () => import("../views/Fees.vue"),
      },
      {
        path: ":companyId/employees",
        component: () => import("../employees/views/EmployeesDashboard.vue"),
      },
      {
        path: "setting",
        component: () => import("../views/Setting.vue"),
      },
      {
        path: "create",
        component: () => import("../companies/views/RegisterCompany.vue"),
      },
      {
        path: ":companyId/employees/create",
        component: () => import("../employees/views/CreateEmployee.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("../views/Dashboard.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/**",
    component: () => import("../views/NotFound.vue"),
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
