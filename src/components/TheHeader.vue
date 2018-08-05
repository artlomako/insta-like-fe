<template>
  <div class="header" @click="onClick">
    <img class="header__logo" src="logo.svg">
    <h1 class="header__title">{{text}}</h1>
  </div>
</template>

<script>
  export default {
    name: "TheHeader",
    computed: {
      isAdminRoute() {
        return this.$route.path.includes("/admin");
      },
      text() {
        let text = "InstaLike";
        if (this.isAdminRoute) {
          text += " Admin";
        }
        return text;
      }
    },
    methods: {
      onClick() {
        if (this.isAdminRoute) {
          this.$router.push("/");
        }
      }
    }
  };
</script>

<style>
  .header {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #006d8e;
    box-shadow: 0 3px 4px 2px #006d8e;
    cursor: pointer;
  }

  .header__logo {
    height: 5rem;
  }

  @media only screen
  and (min-device-width: 320px)
  and (max-device-width: 568px)
  and (-webkit-min-device-pixel-ratio: 2) {
    .header__logo {
      display: none;
    }
  }

  .header__title {
    color: #e6e8d3;
    margin: 0.5rem;
  }
</style>
