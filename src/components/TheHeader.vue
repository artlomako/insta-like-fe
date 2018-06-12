<template>
  <div class="header header--gradient">
    <img class="header__logo" src="logo.svg">
  </div>
</template>

<script>
export default {
  name: "TheHeader"
};
</script>

<style scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: center;
}

.header--gradient {
  /* background-image: linear-gradient(to top right, #2c2c54, #34ace0); */
  background-color: #006d8e;
  box-shadow: 0 3px 4px 2px #006d8e;
}

.header__logo {
  height: 5rem;
  margin: 1rem 0 1rem 0;
}
</style>
