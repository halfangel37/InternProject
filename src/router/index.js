import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
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
      {
        path: "forgot-password",
        name: "ForgotPassword",
        component: () =>
          import ("../forgotPassword/views/ForgotPassword.vue"),
      },
      {
        path: "reset-password/:key",
        props: true,
        name: "ResetPassword",
        component: () =>
          import ("../resetPassword/views/ResetPassword.vue"),
      },
    ],
  },
  {
    path: "/companies",
    component: () =>
      import ("../views/Dashboard.vue"),
    meta: { requiresAuth: true },
    props: true,
    children: [{
        path: "",
        component: () =>
          import ("../companies/views/CompaniesDashboard.vue"),
        beforeEnter(routeTo, routeFrom, next) {
          store
            .dispatch("companies/getCompanyById",
              routeTo.params.companyId,
            )
          store
            .dispatch("companies/getCompanies", {
              PageNumber: 1,
              PageSize: 10,
            })
            .then(() => {
              next();
            })
            .catch((error) => {
              console.log(error);
            });
        },
      },
      //============================================
      {
        path: "/profile",
        component: () =>
          import ("../profile/views/Profile.vue"),
      },
      {
        path: ":companyId/contacts",
        component: () =>
          import ("../views/Contacts.vue"),
        beforeEnter(routeTo, routeFrom, next) {
          store
            .dispatch("companies/getCompanyById",
              routeTo.params.companyId,
            )
            .then(() => next());
        }
      },
      {
        path: ":companyId/products",
        component: () =>
          import ("../views/Products.vue"),
        beforeEnter(routeTo, routeFrom, next) {
          store
            .dispatch("companies/getCompanyById",
              routeTo.params.companyId,
            )
            .then(() => next());
        }
      },
      {
        path: ":companyId/products/create",
        component: () =>
          import ("../product/views/CreateProduct.vue"),
      },
      {
        path: ":companyId/sales",
        component: () =>
          import ("../views/Sales.vue"),
        beforeEnter(routeTo, routeFrom, next) {
          store
            .dispatch("companies/getCompanyById",
              routeTo.params.companyId,
            )
            .then(() => next());
        }
      },
      {
        path: ":companyId/fees",
        component: () =>
          import ("../views/Fees.vue"),
        beforeEnter(routeTo, routeFrom, next) {
          store
            .dispatch("companies/getCompanyById",
              routeTo.params.companyId,
            )
            .then(() => next());
        }
      },
      {
        path: ":companyId/employees",
        component: () =>
          import ("../employees/views/EmployeesDashboard.vue"),
        props: true,
        children: [{
          path: "",
          props: true,
          component: () =>
            import ("../employees/views/EmployeesDashboard.vue"),
          beforeEnter(routeTo, routeFrom, next) {
            store
              .dispatch("companies/getCompanyById",
                routeTo.params.companyId,
              ).then(() => next());
            store
              .dispatch("employees/getEmployees", {
                PageNumber: 1,
                PageSize: 10,
                companyId: routeTo.params.companyId,
              }).then(() => next());
          }
        }]
      },
      {
        path: ":companyId/setting",
        component: () =>
          import ("../views/Setting.vue"),
        beforeEnter(routeTo, routeFrom, next) {
          store
            .dispatch("companies/getCompanyById",
              routeTo.params.companyId,
            )
            .then(() => next());
        }
      },
      {
        path: "create",
        component: () =>
          import ("../companies/views/RegisterCompany.vue"),
      },
      {
        path: ":companyId/employees/create",
        component: () =>
          import ("../employees/views/CreateEmployee.vue"),
      },
      {
        path: "/:companies/:companyId/dashboard",
        component: () =>
          import ("../views/WelcomeDashboard.vue"),
      },
    ]
  },
  {
    path: "/",
    component: () =>
      import ("../views/Dashboard.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/**",
    component: () =>
      import ("../views/NotFound.vue"),
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