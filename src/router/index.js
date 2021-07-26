import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

import Content from "../layouts/Content.vue";

Vue.use(VueRouter);

// TODO separate the routers to individual module

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
    path: "/",
    component: () => import("../layouts/dashboard/DashboardLayout.vue"),
    meta: { requiresAuth: true },
    beforeEnter(routeTo, routeFrom, next) {
      store
        .dispatch("profile/getUserProfile", routeTo.params.companyId)
        // TODO handle error
        .then(() => next());
    },
    children: [
      {
        path: "dashboard",
        component: () => import("../Dashboard/views/DashboardPage.vue"),
      },
      {
        path: "profile",
        component: () => import("../profile/views/Profile.vue"),
      },
      {
        path: "companies",
        component: Content,
        props: true,
        beforeEnter(routeTo, routeFrom, next) {
          store
            .dispatch("companies/getCompanies")
            // TODO handle error
            .then(() => next());
        },
        children: [
          {
            path: "",
            component: () => import("../companies/views/ListCompaniesPage.vue"),
          },
          {
            path: "create",
            name: "RegisterCompany",
            component: () =>
              import("../companies/views/RegisterCompanyPage.vue"),
          },
          {
            path: ":companyId",
            component: Content,
            props: true,
            beforeEnter(routeTo, routeFrom, next) {
              store.dispatch(
                "companies/selectCompany",
                routeTo.params.companyId
              );

              store
                .dispatch("companies/getCompanyById", routeTo.params.companyId)
                // TODO handle error
                .then(() => next());
            },
            children: [
              {
                path: "setting",
                component: () => import("../views/Setting.vue"),
              },
              {
                path: "contacts",
                component: () => import("../views/Contacts.vue"),
                children: [
                  {
                    path: "",
                    component: () => import("../contacts/views/Contacts.vue"),
                    props: true,
                    beforeEnter(routeTo, routeFrom, next) {
                      store
                        .dispatch("contacts/getContacts", {
                          id: routeTo.params.companyId,
                        })
                        .then(() => {
                          next();
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    },
                  },
                ],
              },
              {
                path: "products",
                name: "products",
                component: () => import("../views/Products.vue"),
                children: [
                  {
                    path: "",
                    props: true,
                    component: () =>
                      import("../products/views/ProductsDashboard.vue"),
                    beforeEnter(routeTo, routeFrom, next) {
                      store
                        .dispatch("products/getProducts", {
                          PageNumber: 1,
                          PageSize: 10,
                          id: routeTo.params.companyId,
                        })
                        .then(() => {
                          next();
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    },
                  },
                  {
                    path: "create",
                    name: "createProduct",
                    component: () =>
                      import("../products/views/CreateProduct.vue"),
                  },
                  {
                    path: ":productId",
                    name: "ProductDetail",
                    props: true,
                    component: () =>
                      import("../products/views/UpdateProduct.vue"),
                  },
                ],
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
                name: "EmployeeList",
                component: () =>
                  import("../employees/views/EmployeesDashboard.vue"),
                props: true,
                children: [
                  {
                    path: "",
                    props: true,
                    component: () =>
                      import("../employees/views/EmployeesDashboard.vue"),
                    beforeEnter(routeTo, routeFrom, next) {
                      store
                        .dispatch("employees/getEmployees", {
                          PageNumber: 1,
                          PageSize: 10,
                          companyId: routeTo.params.companyId,
                        })
                        // TODO: handle error
                        .then(() => next());
                    },
                  },
                ],
              },
              {
                path: "employees/create",
                name: "CreateEmployee",
                component: () =>
                  import("../employees/views/CreateEmployee.vue"),
              },
            ],
          },
        ],
      },
    ],
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
