<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="isShowDialog" persistent max-width="320">
        <v-card>
          <v-card-title class="text-h5">{{ title }} </v-card-title>
          <v-card-text>{{ content }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="notChange" style="color: #4f2566"
              >{{ btnNotAccept }}
            </v-btn>
            <v-btn
              color="purple darken-4"
              @click="isChange"
              style="color: white"
            >
              {{ btnAccept }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    isShowDialog: Boolean,
    title: String,
    content: String,
    btnAccept: String,
    btnNotAccept: String,
  },
  methods: {
    notChange() {
      this.$emit("setShowDialog", false);
    },
    isChange() {
      this.$emit("setShowDialog", false);
      this.$emit("confirmChange");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>