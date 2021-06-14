<template>
  <v-app>
    <v-app-bar app color="primary" dark> </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { HTTP } from "./http-common";
export default {
  data() {
    return {
      posts: [],
      errors: [],
    };
  },
  created() {
    HTTP.get(`todos`)
      .then((response) => {
        this.posts = response.data;
        console.log("Kích hoạt Axios thành công");
      })
      .catch((e) => {
        console.log("Có lỗi khi load dữ liệu", e);
      });
  },
};
</script>
