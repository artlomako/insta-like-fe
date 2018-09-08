<template>
  <div class="header">
    <div class="header__item" @click="goPath('/')">
      <img class="header__image" src="logo.svg">
      <h2 class="header__title">{{text}}</h2>
    </div>
    <div class="header__item" @click="goPath('/how-to')">
      <img class="header__image" src="question.svg">
      <h2 class="header__title">Jak to działa?</h2>
    </div>
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
      goPath(path) {
        this.$router.push(path);
      }
    }
  };
</script>

<style>
  .header {
    width: 100%;
    display: flex;
    background-color: #006d8e;
    box-shadow: 0 3px 4px 2px #006d8e;
    justify-content: space-around;
    padding-top: 1rem;
  }

  .header__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }

  .header__title {
    color: #e6e8d3;
    margin: 0.5rem;
  }

  .header__image {
    height: 3rem;
  }

  @media only screen
  and (min-device-width: 320px)
  and (max-device-width: 568px)
  and (-webkit-min-device-pixel-ratio: 2) {
    .header__image {
      display: none;
    }

    .header {
      padding-top: 0.2rem;
    }
  }

</style>
