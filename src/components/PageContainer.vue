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
  color: #36373d;
  font-style: normal;
  font-family: sans-serif;
}
.page-container {
  margin-left: 120px;
  margin-right: unset;
  transition: all 300ms;
}
//query pagecontainer
@media (min-width:1024px) and (max-width:1500px) { //pc
  .page-container {
    max-width: 1040px;
    margin-left: 40px;
  }
}

@media (min-width:1500px) { //pc
  .page-container {
    max-width: 1040px;
    margin-left: 160px;
  }
}

@media  (min-width:740px)  and (max-width:1023px) { //tablet
  .page-container {
    margin-left: 0px;
  }
}

@media (max-width:739px) { //mobile
  .page-container {
    margin-left:0;
  }
}

</style>
