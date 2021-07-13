<template>
  <v-main>
    <h1>Profile</h1>

    <v-tabs
      v-model="tab"
      class="tabs"
      color="#4f2566"
      slider-color="#E7AC28"
      slider-size="3"
    >
      <v-tab v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item">
        <v-container class="form-container" :class="{ active: tab === 2 }">
          <v-row>
            <v-col cols="12" xs="12" sm="12" md="8" lg="8">
              <ChangePasswordForm
                @change-password="changePassword"
                :isButtonDisabled="isButtonDisabled"
              />
            </v-col>
          </v-row>
        </v-container>
        <v-container class="form-container" :class="{ active: tab === 0 }">
          <v-row>
            <v-col cols="12" sm="6" md="4" lg="4">
              <UserProfileForm
                :user="user"
                @update-profile="updateProfile"
                @update-avatar="updateAvatar"
                :isButtonDisabled="isButtonDisabled"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs-items>
  </v-main>
</template>

<script>
import ChangePasswordForm from "../components/ChangePasswordForm.vue";
import UserProfileForm from "../components/UserProfileForm.vue";
import { mapGetters } from "vuex";

export default {
  components: { ChangePasswordForm, UserProfileForm },
  data: () => ({
    tab: null,
    items: ["Profile", "Account", "Password", "Devices"],
    isButtonDisabled: false,
  }),

  methods: {
    changePassword({ oldPassword, newPassword }) {
      this.isButtonDisabled = true;
      this.$store
        .dispatch("profile/changePassword", {
          oldPassword,
          newPassword,
        })
        .then(() => {
          this.isButtonDisabled = false;
        });
    },
    updateProfile(user) {
      this.isButtonDisabled = true;
      this.$store
        .dispatch("profile/updateUserProfile", {
          firstName: user.firstName,
          lastName: user.lastName,
        })
        .then(() => {
          this.isButtonDisabled = false;
        });
    },
    updateAvatar(formData) {
      this.$store.dispatch("profile/updateUserAvatar", formData);
    },
  },
  computed: {
    ...mapGetters({
      user: "profile/userGetter",
    }),
  },
};
</script>

<style lang="scss" scoped>
h1 {
  color: #4f2566;
}
.tabs {
  margin-bottom: 30px;
}
.form-container {
  padding: 0;
  display: none;
}
.active {
  display: flex;
}
.row-form {
  border: 1px solid;
  padding: 10px;
  box-shadow: 5px 10px #888888;
}
</style>
