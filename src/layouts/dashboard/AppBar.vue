<template>
  <v-row>
    <v-col class="justify-start">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="#f5f5f5"
            dark
            v-bind="attrs"
            v-on="on"
            class="logo-company"
          >
            <v-btn color="rgb(242, 179, 52)" style="box-shadow: none">
              <h4 style="color: white">C</h4>
            </v-btn>
            <div class="mr-2"></div>
            <span
              style="color: #616e7c; font-size: 15px"
              class="font-res"
              v-if="selectedCompany"
            >
              {{ selectedCompany.name }}
            </span>
            <v-icon color="#616e7c">{{ icons.mdiChevronDown }}</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="company in companies"
            :key="company.id"
            @click="selectCompany(company.id)"
          >
            <v-list-item-title>{{ company.name }}</v-list-item-title>
          </v-list-item>
           <v-divider ></v-divider>
           <div @click="navigateToCompanieListPage()" class="style-company">Company list</div>
        </v-list>
      </v-menu>
    </v-col>
    <v-col class="d-flex align-center justify-end">
      <a class="contact-us">Contact Us</a>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" color="#f5f5f5" id="hide-option">
            <h5 style="color: #1f2933; font-size: 15px; font-weight: 400">
              {{ user.firstName }} {{ user.lastName }}
            </h5>
            <div class="px-1"></div>
            <v-icon color="#DDE2E9">{{ icons.mdiAccount }}</v-icon>
            <div class="px-1"></div>
            <v-icon color="#1F2939">{{ icons.mdiChevronDown }}</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="item in listMenu"
            :key="item.name"
            @click="$router.push({ path: item.route })"
          >
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn @click="signout" id="hide-option" color="#f5f5f5">
        <v-icon color="#f2b334">{{ icons.mdiLogoutVariant }}</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
import {
  mdiAccount,
  mdiChevronDown,
  mdiLogoutVariant,
  mdiMenu,
  mdiDotsHorizontal,
} from "@mdi/js";
import { mapGetters } from "vuex";

export default {
  data: () => ({
    icons: {
      mdiAccount,
      mdiLogoutVariant,
      mdiMenu,
      mdiDotsHorizontal,
      mdiChevronDown,
    },
    listMenu: [
      { name: "Profile", route: "/profile" },
      { name: "Event log", route: "/dashboard" },
    ],
  }),
  computed: {
    ...mapGetters({
      companies: "companies/selectAllCompanies",
      selectedCompany: "companies/selectSelectedCompany",
      user: "profile/userGetter",
    }),
  },
  methods: {
    selectCompany(companyId) {
      this.$store.dispatch("companies/selectCompany", companyId).then(() => {
        this.$router.push({ path: `/companies/${companyId}/setting` });
      });
    },
    signout() {
      this.$store.dispatch("signout/signoutAccount").then(() => {
        this.$route.push({ path: "/auth/signin" });
      });
    },
      navigateToCompanieListPage() {
      this.$router.push({
        path: `/companies`,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.style-company{
    cursor: pointer;
    color: #2d9cdb;
    text-align: center;
    font-weight:600;
    padding:10px 0px;
}
.style-company:hover{
  background: #f5f5f5;
}
.v-btn:not(.v-btn--round).v-size--default {
  min-width: 40px !important;
}
.logo-company {
  box-shadow: none !important;
}
.v-breadcrumbs__item {
  font-weight: 500;
  color: #1f2933 !important;
  font-size: 1rem;
}
.v-breadcrumbs__divider {
  font-weight: 500;
  color: #1f2933 !important;
}
.flag {
  width: 45px;
  height: auto;
}
.contact-us {
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 400;
}
#hide-option:hover {
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
}
#hide-option {
  box-shadow: none;
}
#hide-menu {
  display: none;
}
#appear-option {
  display: none;
}
#non-box-shadow {
  box-shadow: none;
}
</style>
