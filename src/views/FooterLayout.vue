<template>
  <div class="bg-main">
    <footer>
      <div class="d-flex j-center pt-10">
        <span>
          <router-link to="/contact" class="contact"
            ><span class="fs-16">Contact Us</span></router-link
          >
        </span>
        <span class="fs-16 white--text ml-1">If you need help</span>
      </div>
      <v-divider></v-divider>
      <div class="bg-footer pt-3 pb-3">
        <nav>
          <ul class="d-flex j-center c-footer">
            <li class="mr-3">Accountia</li>
            <li class="pl-3 pr-3 border-left border-right">
              All right reserved
            </li>
            <li class="ml-3">{{ new Date().getFullYear() }}</li>
          </ul>
        </nav>
      </div>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.d-flex {
  display: flex !important;
}
.j-center {
  justify-content: center !important;
}
.bg-footer {
  background: #613b75;
}
.fs-16 {
  font-size: 16px;
}
.ml-1 {
  margin-left: 1px;
}
.bg-main {
  background: #4f2566;
}
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.c-footer {
  color: #91789e;
}
.border-right {
  border-right: 1px solid #91789e;
}
.border-left {
  border-left: 1px solid #91789e;
}
.contact {
  text-decoration: none;
}
.contact:hover {
  text-decoration: underline;
}
</style>
