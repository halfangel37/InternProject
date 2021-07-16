<template>
  <div>
    <v-app-bar
      color="#f5f5f5"
      dense
      dark
      style="height: 70px; padding: 10px 0px; box-shadow: none"
    >
      <v-btn color="#f5f5f5" id="hide-menu">
        <v-icon color="#1F2939">{{ icons.mdiMenu }}</v-icon>
      </v-btn>
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
            <span style="color: #616e7c; font-size: 15px" class="font-res">
              {{ company.name }}
            </span>
            <v-icon color="#616e7c">{{ icons.mdiChevronDown }}</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            @click="selectCompany(company.id)"
            v-for="company in companies"
            :key="company.id"
            @change="changeCompany(company)"
          >
            <v-list-item-title>{{ company.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-spacer></v-spacer>
      <v-btn color="#f5f5f5" id="appear-option">
        <v-icon color="#1F2939">{{ icons.mdiDotsHorizontal }}</v-icon>
      </v-btn>
      <a href="" class="contact-us">Contact Us</a>
      <div class="mx-2"></div>
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-btn
            v-bind="attrs"
            v-on="on"
            color="#f5f5f5"
            id="hide-option"
          >
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
            v-for="list in listMenu"
            :key="list"
            link
            @click="$router.push({ path: list.route })"
          >
            <v-list-item-title>{{ list.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn @click="signout" id="hide-option" color="#f5f5f5"
        ><v-icon color="#f2b334">{{ icons.mdiLogoutVariant }}</v-icon></v-btn
      >
    </v-app-bar>
  </div>
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
    listMenu: [
      { name: "Profile", route: "/profile" },
      { name: "Event log", route: "/dashboard" },
    ],
    icons: {
      mdiAccount,
      mdiLogoutVariant,
      mdiMenu,
      mdiDotsHorizontal,
      mdiChevronDown,
    },
    items: [
      {
        text: "Dashboard",
        disabled: false,
        href: "breadcrumbs_dashboard",
      },
      {
        text: "Link 1",
        disabled: false,
        href: "breadcrumbs_link_1",
      },
      {
        text: "Link 2",
        disabled: true,
        href: "breadcrumbs_link_2",
      },
    ],
  }),
  methods: {
    selectCompany(companyId) {
      this.$store.dispatch("companies/selectCompany", companyId);
      this.$router.push({ path: `/companies/${companyId}/setting` });
    },
    signout() {
      this.$store
        .dispatch("signout/signoutAccount")
        .then(this.$route.push({ path: "/auth/signin" }));
    },
    getCompanies() {
      this.$store.dispatch("companies/getCompanies");
    },
    changeCompany(company) {
      this.$store.dispatch("companies/changeCompany", company);
    },
  },
  computed: {
    ...mapGetters({
      companies: "companies/allCompanies",
      selectedCompany: "companies/selectedCompany",
      user: "profile/userGetter",
      company: "companies/getCompanyGetter",
    }),
  },
};
</script>
<style>
.v-btn:not(.v-btn--round).v-size--default {
  min-width: 40px !important;
}
.logo-company {
  margin-left: 220px;
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
@media only screen and (max-width: 739px) {
  #hide-menu {
    display: block;
    box-shadow: none;
  }
  #hide-option {
    display: none;
  }
  #appear-option {
    box-shadow: none;
    display: block;
    margin-left: 24px;
  }
  .contact-us {
    display: none;
  }
  .v-btn {
    min-width: 0px !important;
  }
  .logo-company {
    margin: 0px;
  }
  .font-res {
    font-size: 13px !important;
  }
}
@media only screen and (min-width: 740px) and (max-width: 1023px) {
  #hide-menu {
    display: block;
    box-shadow: none;
  }
  #hide-option {
    display: none;
  }
  #appear-option {
    box-shadow: none;
    display: block;
    margin-left: 24px;
  }
  .contact-us {
    display: none;
  }
  .v-btn {
    min-width: 0px !important;
  }
  .logo-company {
    margin: 0;
  }
  .font-res {
    font-size: 13px !important;
  }
}
</style>
