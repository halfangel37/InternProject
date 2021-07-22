<template>
  <v-dialog v-model="isDialog" persistent max-width="320">
    <v-card>
      <v-card-title class="text-h5">{{ title }} </v-card-title>
      <v-card-text>{{ content }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="notChange" style="color: #4f2566"
          >{{ btnNotAccept }}
        </v-btn>
        <v-btn color="purple darken-4" @click="isChange" style="color: white">
          {{ btnAccept }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    isDialog: Boolean,
    title: String,
    content: String,
    btnAccept: String,
    btnNotAccept: String,
  },
  methods: {
    notChange() {
      this.$emit("on-close");
    },
    isChange() {
      this.$emit("on-close");
      this.$emit("on-confirm");
    },
  },
};
</script>

<style lang="scss" scoped></style>
