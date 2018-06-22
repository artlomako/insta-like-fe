<template>
  <div>
    <p v-if="error">Użytkownik który udostępnił zdjęcie nie ma dostepu do serwisu.</p>
  </div>
</template>

<script>
  import {mapState} from "vuex";

  export default {
    name: "StatePanel",
    computed: {
      ...mapState(["error"])
    }
  }
</script>

<style scoped>

</style>