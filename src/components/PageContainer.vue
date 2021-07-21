<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">
        <slot name="page-title"></slot>
      </h1>
    </div>
    <div class="page-content">
      <slot name="page-content"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.page-header {
  padding: 3rem 0;
}
.page-title {
  font-size: 40px;
  font-weight: 600;
  margin: 0;
}
.page-container {
  margin-left: 140px;
  margin-right: unset;
}

@media (min-width: 1200px) {
  .app-container {
    max-width: 1140px;
  }
}
</style>
