<template>
  <div id="notfound">
    <div class="notfound">
      <div class="notfound-404">
        <h1>4<span>0</span>4</h1>
      </div>
      <p class="mt-10">
        The page you are looking for might have been removed had its name
        changed or is temporarily unavailable.
      </p>
      <a href="/companies">Home page</a>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#notfound {
  position: relative;
  height: 100vh;
  background-color: #222;
}
#notfound .notfound {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.notfound {
  max-width: 460px;
  width: 100%;
  text-align: center;
  line-height: 1.4;
}
.notfound .notfound-404 h1 {
  font-family: josefin sans, sans-serif;
  color: #222;
  font-size: 220px;
  letter-spacing: 10px;
  margin: 0;
  font-weight: 700;
  text-shadow: 2px 2px 0 #c9c9c9, -2px -2px 0 #c9c9c9;
}
.notfound .notfound-404 {
  height: 158px;
  line-height: 153px;
}
.notfound .notfound-404 h1 > span {
  text-shadow: 2px 2px 0 #ffab00, -2px -2px 0 #ffab00, 0 0 8px #ff8700;
}
.notfound .notfound-404 h1 {
  font-family: josefin sans, sans-serif;
  color: #222;
  font-size: 220px;
  letter-spacing: 10px;
  margin: 0;
  font-weight: 700;
}
.notfound p {
  font-family: josefin sans, sans-serif;
  color: #c9c9c9;
  font-size: 16px;
  font-weight: 400;
  margin-top: 0;
  margin-bottom: 15px;
}
</style>
