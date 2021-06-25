<template>
  <v-navigation-drawer
    color="rgb(79,37,102)"
    floating
    persistent
    mobile-breakpoint="991"
    width="210"
    absolute
  >
    <v-img :src="image" height="100%">
      <v-layout class="fill-height" tag="v-list" column>
        <v-btn
          style="margin: 17px auto"
          dark
          color="rgb(242, 179, 52)"
          class="d-flex justify-center"
        >
          <h5 style="color: white; font-size: 20px">C</h5>
        </v-btn>
        <v-divider />
        <div class="mt-16"></div>
        <v-btn color="rgb(242, 179, 52)" fab dark small class="move-btn">
          <v-icon @click.stop="sidebarMenu = !sidebarMenu"
            >mdi-chevron-left</v-icon
          >
        </v-btn>
        <router-link
          v-for="(link, i) in links"
          :key="i"
          :to="link.to"
          class="list-item"
          style="color: #c8cde2; font-weight: 300; font-size: 18px"
        >
          <v-list-title class="hover-lt">
            <v-list-title-action>
              <v-icon
                style="color: #c8cde2; font-size: 35px; padding-right: 12px"
                >{{ link.icon }}</v-icon
              >
            </v-list-title-action>
            <v-list-title-title v-text="link.text" />
          </v-list-title>
        </router-link>
      </v-layout>
    </v-img>
  </v-navigation-drawer>
</template>
<script>
export default {
  data: () => ({
    links: [
      {
        to: "/dashboard",
        icon: "mdi-view-dashboard",
        text: "Dashboard",
      },
      {
        to: "",
        icon: "mdi-currency-usd",
        text: "Sales",
      },
      {
        to: "/dashboard/contacts",
        icon: "mdi-domain",
        text: "Contacts",
      },
      {
        to: "/dashboard/products",
        icon: "mdi-cube-outline",
        text: "Products",
      },
      {
        to: "",
        icon: "mdi-calculator-variant-outline",
        text: "Fees",
      },
      {
        to: "",
        icon: "mdi-account-supervisor",
        text: "Employees",
      },
      {
        to: "",
        icon: "mdi-cog",
        text: "Company setting",
      },
    ],
  }),
};
</script>
<style>
.hover-lt :hover {
  color: #e7ac28;
}
.list-item {
  align-items: center;
  display: flex;
  padding: 10px 10px;
  position: relative;
  text-decoration: none;
}
.move-btn {
  position: absolute;
  top: 100px;
  right: -20px;
}
.v-navigation-drawer {
  overflow: unset !important;
}
.v-responsive {
  overflow: unset !important;
}
.v-navigation-drawer__content {
  overflow-y: unset !important;
  overflow-x: unset !important;
}
</style>
