<template>
  <PageContainer>
    <template #page-title>Create new contact</template>
    <template #page-content>
      <ContactForm
        class="mt-40"
        :contact="contact"
        @on-submit="createContact"
        @on-cancel="navigateContacts"
        :isButtonDisable="isButtonDisable"
      ></ContactForm>
    </template>
  </PageContainer>
</template>

<script>
import ContactForm from "@/contacts/components/ContactForm.vue";
import PageContainer from "@/components/PageContainer.vue";
import "@/shared/style/style.css";
import { ENABLE_STATUS } from "@/shared/variables";
export default {
  components: {
    ContactForm,
    PageContainer,
  },
  props: {
    companyId: String,
  },
  data() {
    return {
      isButtonDisable: false,
      contact: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        contactType: 2,
        customerStatus: ENABLE_STATUS,
        supplierStatus: ENABLE_STATUS,
      },
    };
  },
  methods: {
    createContact() {
      this.isButtonDisable = true;
      this.$store.dispatch("contacts/createContact", {
        companyId: this.companyId,
        contact: this.contact,
      });
      this.isButtonDisable = false;
    },
    navigateContacts() {
      this.$router.push({ name: "ContactDasboard" });
    },
  },
};
</script>
<style lang="scss" scoped></style>
