<template>
  <div>
    <div class="header-logo">
      <div class="logo">
        <div class="logo__design" @click="navigateCompanies()">C</div>
      </div>
    </div>
    <v-divider></v-divider>
    <v-list dense class="mt-10">
      <v-list-item @click="navigateDashboard">
        <v-list-item-icon>
          <v-icon color="#c8cde2"> {{ dashboardNavigation.icon }} </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="item-color">
            <span class="text-decor">{{ dashboardNavigation.title }}</span>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        v-show="companies.length > 0"
        v-for="item in navigation"
        :key="item.title"
        @click="navigate(item)"
      >
        <v-list-item-icon>
          <v-icon color="#c8cde2">{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="item-color">
            <span class="text-decor">{{ item.title }}</span>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {
      dashboardNavigation: {
        icon: "mdi-view-dashboard",
        title: "Dashboard",
      },
      navigation: [
        {
          to: "sales",
          icon: "mdi-currency-usd",
          title: "Sales",
        },
        {
          to: "contacts",
          icon: "mdi-domain",
          title: "Contacts",
        },
        {
          to: "products",
          icon: "mdi-cube-outline",
          title: "Products",
        },
        {
          to: "fees",
          icon: "mdi-calculator-variant-outline",
          title: "Fees",
        },
        {
          to: "employees",
          icon: "mdi-account-supervisor",
          title: "Employees",
        },
        {
          to: "setting",
          icon: "mdi-cog",
          title: "Company setting",
        },
      ],
    };
  },
  methods: {
    navigate(item) {
      const companyId = this.selectCompanyId;
      this.$router.push({
        path: `/companies/${companyId}/${item.to}`,
      });
    },
    navigateDashboard() {
      this.$router.push({
        path: `/dashboard`,
      });
    },
    navigateCompanies() {
      this.$store.dispatch("companies/getCompanies",{
        pageNumber: this.currentPage,
        pageSize: this.currentRowsPerPage,
      }).then(() => {
        this.$router.push({ path: `/companies` });
      });
    },
  },
  computed: {
    ...mapGetters({
      companies: "companies/selectAllCompanies",
      selectCompanyId: "companies/selectSelectedCompanyId",
    }),
  },
};
</script>
<style scoped>
.item-color {
  color: #c8cde2;
}

.header-logo {
  color: white;
  height: 64px;
}

.logo {
  padding: 14px 20px;
}

.logo__design {
  height: 36px;
  width: 40px;
  background: #f2b334;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
}
.text-decor {
  font-size: 20px;
  font-weight: normal;
}
.icon-decor {
  font-size: 35px;
}
.v-list-item {
  padding: 15px 0px 15px 20px;
}
</style>
