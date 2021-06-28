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
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((routeTo, routeFrom, next) => {
  const userToken = localStorage.getItem("user");
  if (routeTo.matched.some((record) => record.meta.requiresAuth)) {
    if (!userToken) {
      next({
        path: "/signin",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
